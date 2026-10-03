"use client";

import { useEffect } from "react";

/** Movement before a press becomes a drag, so plain taps/clicks still open links. */
const DRAG_THRESHOLD_PX = 6;
/** Velocity is discarded if the pointer rested this long before release. */
const STALE_VELOCITY_MS = 80;
/** Per-16ms velocity retention for release momentum (closer to 1 = longer glide). */
const MOMENTUM_FRICTION = 0.95;
/** Below this speed (px/ms) momentum stops. */
const MIN_VELOCITY = 0.02;
/** Wheel easing: fraction of the remaining distance covered per 16ms frame. */
const WHEEL_EASE = 0.16;
const LINE_HEIGHT_PX = 16;

/** Lenis reads this flag and skips page smoothing for events we consumed. */
type LenisWheelEvent = WheelEvent & { lenisStopPropagation?: boolean };

/**
 * Smooth, snap-free horizontal scrolling for a rail:
 * - drag with mouse, touch or pen, with release momentum
 * - vertical wheel eases the rail sideways, handing back to the page at either end
 *
 * Expects `touch-action: pan-y` on the element so vertical swipes still scroll
 * the page natively.
 */
export function useDragScroll(element: HTMLElement | null) {
  useEffect(() => {
    if (!element) return;
    const el = element;
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let frameTime = 0;
    /** Unrounded scroll position; browsers round `scrollLeft` writes, which stalls easing. */
    let position = 0;
    let wheelTarget: number | null = null;
    let momentum = 0;

    let pointerId: number | null = null;
    let dragging = false;
    let suppressClick = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;

    const maxScroll = () => el.scrollWidth - el.clientWidth;
    const clamp = (value: number) => Math.min(maxScroll(), Math.max(0, value));

    const stopAnimation = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      wheelTarget = null;
      momentum = 0;
    };

    const tick = (now: number) => {
      const steps = Math.min(4, (now - frameTime) / 16.67);
      frameTime = now;
      let active = false;

      if (wheelTarget !== null) {
        const remaining = wheelTarget - position;
        if (Math.abs(remaining) < 0.5) {
          position = wheelTarget;
          wheelTarget = null;
        } else {
          position += remaining * (1 - (1 - WHEEL_EASE) ** steps);
          active = true;
        }
      } else if (momentum !== 0) {
        position = clamp(position - momentum * steps * 16.67);
        momentum *= MOMENTUM_FRICTION ** steps;
        const blocked = position <= 0 || position >= maxScroll();
        if (Math.abs(momentum) < MIN_VELOCITY || blocked) momentum = 0;
        else active = true;
      }
      el.scrollLeft = position;

      frame = active ? requestAnimationFrame(tick) : 0;
    };

    const startAnimation = () => {
      if (frame) return;
      position = el.scrollLeft;
      frameTime = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const endDrag = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      pointerId = null;
      if (!dragging) return;

      dragging = false;
      suppressClick = event.type === "pointerup";
      delete el.dataset.dragging;
      delete root.dataset.cursorDragging;

      const stale = event.timeStamp - lastTime > STALE_VELOCITY_MS;
      if (!stale && !reducedMotion.matches && Math.abs(velocity) > MIN_VELOCITY) {
        momentum = velocity;
        startAnimation();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const deltaX = event.clientX - startX;

      if (!dragging) {
        if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;
        dragging = true;
        el.dataset.dragging = "true";
        if (event.pointerType === "mouse") root.dataset.cursorDragging = "true";
      }

      event.preventDefault();
      el.scrollLeft = startScroll - deltaX;

      const elapsed = event.timeStamp - lastTime;
      if (elapsed > 0) {
        const instant = (event.clientX - lastX) / elapsed;
        velocity = velocity * 0.2 + instant * 0.8;
      }
      lastX = event.clientX;
      lastTime = event.timeStamp;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      stopAnimation();
      pointerId = event.pointerId;
      suppressClick = false;
      startX = lastX = event.clientX;
      startScroll = el.scrollLeft;
      lastTime = event.timeStamp;
      velocity = 0;
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);
    };

    const onWheel = (event: LenisWheelEvent) => {
      // Horizontal trackpad swipes and pinch-zoom keep native behaviour.
      if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
        return;
      }

      const delta =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * LINE_HEIGHT_PX
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? event.deltaY * el.clientWidth
            : event.deltaY;

      const from = wheelTarget ?? el.scrollLeft;
      // Hand the wheel back to the page at either end.
      if ((delta < 0 && from <= 1) || (delta > 0 && from >= maxScroll() - 1)) {
        return;
      }

      event.preventDefault();
      event.lenisStopPropagation = true;
      momentum = 0;

      if (reducedMotion.matches) {
        el.scrollLeft = clamp(from + delta);
        return;
      }
      wheelTarget = clamp(from + delta);
      startAnimation();
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    };

    // Native link/image dragging would cancel the pointer stream mid-drag.
    const onDragStart = (event: DragEvent) => event.preventDefault();

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("dragstart", onDragStart);

    return () => {
      stopAnimation();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("dragstart", onDragStart);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      delete root.dataset.cursorDragging;
    };
  }, [element]);
}
