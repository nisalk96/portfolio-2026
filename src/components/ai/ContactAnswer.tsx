"use client";

import {
  IconBrandLinkedin,
  IconFileText,
  IconMail,
} from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";

const actions = [
  {
    label: "Email Nisal",
    href: `mailto:${profile.email}`,
    icon: IconMail,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: IconBrandLinkedin,
    external: true,
  },
  {
    label: "Download Resume",
    href: profile.resumeUrl,
    icon: IconFileText,
  },
];

export function ContactAnswer() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.a
            key={action.label}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noreferrer" : undefined}
            initial={reducedMotion === false ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.28 }}
            whileHover={reducedMotion ? undefined : { y: -2 }}
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background px-3 py-2 text-[13px] font-medium text-foreground shadow-sm transition-colors hover:border-foreground/15"
          >
            <Icon className="size-3.5 text-sky-600 dark:text-sky-400" />
            {action.label}
          </motion.a>
        );
      })}
    </div>
  );
}
