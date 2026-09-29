"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileText,
  IconMail,
} from "@tabler/icons-react";
import { m, useReducedMotion } from "framer-motion";
import { contact } from "@/constants/contact";
import { animation } from "@/constants/animation";
import { profile } from "@/data/profile";

const iconMap = {
  email: IconMail,
  linkedin: IconBrandLinkedin,
  github: IconBrandGithub,
  resume: IconFileText,
} as const;

export function ContactAnswer() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {contact.channels.map((channel, index) => {
        const Icon = iconMap[channel.id as keyof typeof iconMap] ?? IconMail;
        const label =
          channel.id === "email" ? `Email ${profile.shortName}` : channel.label;

        return (
          <m.a
            key={channel.id}
            href={channel.href}
            target={channel.external ? "_blank" : undefined}
            rel={channel.external ? "noreferrer" : undefined}
            initial={reducedMotion === false ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * animation.chat.richStagger,
              duration: animation.chat.richDuration,
              ease: animation.ease.out,
            }}
            whileHover={reducedMotion ? undefined : { y: -2 }}
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background px-3 py-2 text-[13px] font-medium text-foreground shadow-sm transition-colors hover:border-foreground/15"
          >
            <Icon className="size-3.5 text-sky-600 dark:text-sky-400" />
            {label}
          </m.a>
        );
      })}
    </div>
  );
}
