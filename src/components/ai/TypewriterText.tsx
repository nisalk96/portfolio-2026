"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { animation } from "@/constants/animation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypewriterTextProps {
  text: string;
  active?: boolean;
  onDone?: () => void;
}

function nextDelay(lastChar: string, step: number) {
  const { typeCharMs, typeSentencePauseMs, typeClausePauseMs } = animation.chat;
  if (/[.!?]/.test(lastChar)) return typeSentencePauseMs;
  if (/[,;:\n]/.test(lastChar)) return typeClausePauseMs;
  return typeCharMs * step * (0.6 + Math.random() * 0.8);
}

export function TypewriterText({
  text,
  active = true,
  onDone,
}: TypewriterTextProps) {
  const reducedMotion = useReducedMotion();
  const chars = useMemo(() => Array.from(text), [text]);
  const [count, setCount] = useState(active ? 0 : chars.length);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!active) return;

    if (reducedMotion) {
      const frame = window.requestAnimationFrame(() => {
        setCount(chars.length);
        onDoneRef.current?.();
      });
      return () => window.cancelAnimationFrame(frame);
    }

    let index = 0;
    let timer: number;

    const tick = () => {
      const step = 1 + Math.floor(Math.random() * 3);
      index = Math.min(chars.length, index + step);
      setCount(index);

      if (index >= chars.length) {
        onDoneRef.current?.();
        return;
      }

      timer = window.setTimeout(tick, nextDelay(chars[index - 1], step));
    };

    timer = window.setTimeout(tick, animation.chat.typeStartMs);
    return () => window.clearTimeout(timer);
  }, [active, chars, reducedMotion]);

  const visible = active ? chars.slice(0, count).join("") : text;

  return (
    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-foreground/90">
      {visible}
      {active ? (
        <motion.span
          aria-hidden
          className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] rounded-full bg-sky-500"
          animate={reducedMotion ? undefined : { opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            times: [0, 0.5, 0.5, 1],
          }}
        />
      ) : null}
    </p>
  );
}
