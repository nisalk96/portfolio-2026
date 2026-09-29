"use client";

import {
  IconBriefcase,
  IconCode,
  IconDatabase,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const statusIcons = [IconSearch, IconSparkles, IconCode, IconBriefcase, IconDatabase];

interface ChatThinkingProps {
  label: string;
}

export function ChatThinking({ label }: ChatThinkingProps) {
  const reducedMotion = useReducedMotion();
  const Icon = statusIcons[label.length % statusIcons.length];
  const animate = reducedMotion === false;

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={animate ? { opacity: 0, y: -4, transition: { duration: 0.25 } } : undefined}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-2.5"
      role="status"
      aria-live="polite"
    >
      <div className="relative mt-0.5 flex size-7 items-center justify-center rounded-lg border border-border/70 bg-background text-sky-600 shadow-sm dark:text-sky-400">
        {animate ? (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-lg ring-2 ring-sky-400/30"
            animate={{ opacity: [0, 0.8, 0], scale: [0.9, 1.15, 1.25] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            className="flex"
            initial={animate ? { opacity: 0, scale: 0.6, rotate: -30 } : false}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={animate ? { opacity: 0, scale: 0.6, rotate: 30 } : undefined}
            transition={{ duration: 0.35 }}
          >
            <Icon className="size-3.5" />
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="rounded-2xl rounded-tl-md border border-border/60 bg-white/70 px-3 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-sm dark:bg-card/70">
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={label}
              initial={animate ? { opacity: 0, y: 6, filter: "blur(2px)" } : false}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={animate ? { opacity: 0, y: -6, filter: "blur(2px)" } : undefined}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="font-mono text-[12px]"
            >
              {animate ? (
                <motion.span
                  className="bg-[linear-gradient(90deg,var(--muted-foreground)_0%,var(--muted-foreground)_40%,var(--foreground)_50%,var(--muted-foreground)_60%,var(--muted-foreground)_100%)] bg-[length:250%_100%] bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["100% 0%", "0% 0%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                >
                  {label}
                </motion.span>
              ) : (
                label
              )}
            </motion.span>
          </AnimatePresence>
          <span className="inline-flex items-center gap-1" aria-hidden>
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="size-1 rounded-full bg-foreground/40"
                animate={
                  animate ? { opacity: [0.25, 1, 0.25], y: [0, -2, 0] } : undefined
                }
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: dot * 0.22,
                  ease: "easeInOut",
                }}
              />
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
