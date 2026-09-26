"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypewriterTextProps {
  text: string;
  active?: boolean;
  onDone?: () => void;
}

export function TypewriterText({
  text,
  active = true,
  onDone,
}: TypewriterTextProps) {
  const reducedMotion = useReducedMotion();
  const words = useMemo(() => text.split(/(\s+)/), [text]);
  const shouldAnimate = active && !reducedMotion;
  const [count, setCount] = useState(shouldAnimate ? 0 : words.length);

  useEffect(() => {
    if (!shouldAnimate) {
      const frame = window.requestAnimationFrame(() => {
        setCount(words.length);
        onDone?.();
      });
      return () => window.cancelAnimationFrame(frame);
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setCount(index);
      if (index >= words.length) {
        window.clearInterval(timer);
        onDone?.();
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [onDone, shouldAnimate, text, words.length]);

  const visible = shouldAnimate
    ? words.slice(0, count).join("")
    : text;

  return (
    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-foreground/90">
      {visible}
    </p>
  );
}
