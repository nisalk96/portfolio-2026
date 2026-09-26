"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Experience } from "@/types/portfolio";
import { SkillBadge } from "@/components/portfolio/SkillBadge";

interface ExperienceItemProps {
  item: Experience;
  index?: number;
}

export function ExperienceItem({ item, index = 0 }: ExperienceItemProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={reducedMotion === false ? { opacity: 0, y: 14 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="relative grid gap-3 border-b border-border/70 py-6 last:border-b-0 md:grid-cols-[180px_1fr]"
    >
      <div>
        <p className="font-mono text-[12px] text-muted-foreground">
          {item.period}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">{item.role}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{item.company}</p>
        <ul className="mt-3 space-y-2">
          {item.achievements.map((achievement) => (
            <li
              key={achievement}
              className="text-sm leading-relaxed text-muted-foreground"
            >
              {achievement}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tech.map((tech) => (
            <SkillBadge key={tech} label={tech} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
