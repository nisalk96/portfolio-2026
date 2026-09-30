"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, select, [data-cursor="interactive"]';
const TEXT_SELECTOR = 'input, textarea, [contenteditable="true"]';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;

    root.classList.add("has-custom-cursor");

    const render = () => {
      ringX += (pointerX - ringX) * 0.22;
      ringY += (pointerY - ringY) * 0.22;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };

    const setCursorState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;

      const overText = Boolean(target.closest(TEXT_SELECTOR));
      const overInteractive = Boolean(target.closest(INTERACTIVE_SELECTOR));

      root.dataset.cursorHidden = String(overText);
      root.dataset.cursorInteractive = String(overInteractive && !overText);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      root.dataset.cursorVisible = "true";
      setCursorState(event.target);
    };

    const handlePointerLeave = () => {
      root.dataset.cursorVisible = "false";
    };

    const handlePointerEnter = () => {
      root.dataset.cursorVisible = "true";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerenter", handlePointerEnter);
    frame = window.requestAnimationFrame(render);

    return () => {
      root.classList.remove("has-custom-cursor");
      delete root.dataset.cursorVisible;
      delete root.dataset.cursorHidden;
      delete root.dataset.cursorInteractive;
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerenter", handlePointerEnter);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="custom-cursor" data-custom-cursor>
      <div ref={ringRef} className="custom-cursor__ring" />
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
