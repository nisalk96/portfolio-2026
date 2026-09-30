"use client";

import {
  IconBriefcase,
  IconCode,
  IconRocket,
  IconStack2,
  type Icon,
} from "@tabler/icons-react";
import { Reveal } from "@/components/motion/Reveal";
import { TintIcon, tintOrder } from "@/components/portfolio/TintIcon";
import { staggerDelay } from "@/lib/motion";
import type { Experience } from "@/types/portfolio";

const stepIcons: Icon[] = [IconRocket, IconStack2, IconCode, IconBriefcase];

interface ExperienceItemProps {
  item: Experience;
  index: number;
  isLast: boolean;
}

export function ExperienceItem({ item, index, isLast }: ExperienceItemProps) {
  return (
    <Reveal
      as="article"
      amount={0.25}
      delay={staggerDelay(index % 4)}
      className="glass relative flex flex-col rounded-xl border-0 border-t-2 border-brand p-5 shadow-none"
    >
      <div className="flex items-start justify-between gap-3">
        <TintIcon
          icon={stepIcons[index % stepIcons.length]}
          tint={tintOrder[(index + 1) % tintOrder.length]}
          size="sm"
        />
        <span
          aria-hidden
          className="text-3xl font-semibold tracking-tight text-foreground/10"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-4 text-[15px] font-semibold text-foreground">
        {item.role}
      </h3>
      <p className="mt-0.5 text-xs font-medium text-foreground">{item.period}</p>
      <p className="mt-1 text-xs text-body">{item.company}</p>
      {item.achievements[0] ? (
        <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-body">
          {item.achievements[0]}
        </p>
      ) : null}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {item.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-white/60 px-2 py-0.5 text-[11px] text-body dark:bg-white/5"
          >
            {tech}
          </span>
        ))}
      </div>

      {isLast ? null : (
        <span
          aria-hidden
          className="absolute top-9 -right-4 hidden w-4 border-t border-dashed border-brand/50 lg:block"
        />
      )}
    </Reveal>
  );
}
