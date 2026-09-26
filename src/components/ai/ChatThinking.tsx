"use client";

import {
  IconBriefcase,
  IconCode,
  IconDatabase,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";

const statusIcons = [IconSearch, IconSparkles, IconCode, IconBriefcase, IconDatabase];

interface ChatThinkingProps {
  label: string;
}

export function ChatThinking({ label }: ChatThinkingProps) {
  const reducedMotion = useReducedMotion();
  const Icon = statusIcons[label.length % statusIcons.length];

  return (
    <motion.div
      initial={reducedMotion === false ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2.5"
    >
      <div className="mt-0.5 flex size-7 items-center justify-center rounded-lg border border-border/70 bg-background text-sky-600 shadow-sm dark:text-sky-400">
        <motion.span
          animate={
            reducedMotion
              ? undefined
              : { rotate: label.toLowerCase().includes("search") ? 360 : 0, opacity: [0.55, 1, 0.55] }
          }
          transition={{
            rotate: { duration: 2.4, repeat: Infinity, ease: "linear" },
            opacity: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon className="size-3.5" />
        </motion.span>
      </div>
      <div className="rounded-2xl rounded-tl-md border border-border/60 bg-white/70 px-3 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-sm dark:bg-card/70">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[12px]">{label}</span>
          <span className="inline-flex items-center gap-1" aria-hidden>
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="size-1 rounded-full bg-foreground/40"
                animate={
                  reducedMotion
                    ? undefined
                    : { opacity: [0.25, 1, 0.25], y: [0, -1.5, 0] }
                }
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: dot * 0.15,
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
