"use client";

import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/lib/motion";
import type { Experience } from "@/types/portfolio";

interface ExperienceItemProps {
  item: Experience;
  index: number;
  isLast: boolean;
}

export function ExperienceItem({ item, index }: ExperienceItemProps) {
  return (
    <Reveal
      as="article"
      amount={0.15}
      delay={staggerDelay(index % 4)}
      className="grid gap-5 border-b border-border p-5 last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8 md:p-7"
    >
      <div className="font-mono text-xs leading-relaxed text-body md:pt-1">
        <p className="text-foreground">{item.period}</p>
        <p>{item.location}</p>
      </div>

      <div>
        <h3 className="text-base font-bold text-foreground md:text-lg">{item.role}</h3>
        <p className="mt-1 font-mono text-sm text-body">{item.company}</p>
        <div className="mt-4 space-y-2.5">
          {item.achievements.map((achievement) => (
            <p key={achievement} className="text-sm leading-relaxed text-body">
              {achievement}
            </p>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
