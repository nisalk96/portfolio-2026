"use client";

import {
  IconArrowRight,
  IconBolt,
  IconBriefcase,
  IconCode,
  IconMail,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";
import { animation } from "@/constants/animation";
import type { PromptChip as PromptChipType, PromptIcon } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const iconMap: Record<PromptIcon, typeof IconSparkles> = {
  sparkles: IconSparkles,
  bolt: IconBolt,
  code: IconCode,
  arrow: IconArrowRight,
  briefcase: IconBriefcase,
  search: IconSearch,
  mail: IconMail,
};

function emphasizeLabel(label: string, emphasize?: string) {
  if (!emphasize) return label;

  const index = label.toLowerCase().indexOf(emphasize.toLowerCase());
  if (index === -1) return label;

  const before = label.slice(0, index);
  const match = label.slice(index, index + emphasize.length);
  const after = label.slice(index + emphasize.length);

  return (
    <>
      {before}
      <span className="font-medium text-foreground">{match}</span>
      {after}
    </>
  );
}

interface PromptChipProps {
  chip: PromptChipType;
  onSelect: (chip: PromptChipType) => void;
  disabled?: boolean;
  index?: number;
}

export function PromptChip({
  chip,
  onSelect,
  disabled,
  index = 0,
}: PromptChipProps) {
  const Icon = iconMap[chip.icon];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(chip)}
      style={{
        animationDelay: `${index * animation.chat.chipStaggerMs}ms`,
        animationDuration: `${animation.chat.chipDurationMs}ms`,
      }}
      className={cn(
        "group inline-flex max-w-full animate-in fade-in slide-in-from-bottom-1 items-center gap-2 rounded-xl border border-border/80 bg-background px-3 py-2 text-left text-[13px] text-muted-foreground shadow-sm transition-all duration-200 fill-mode-both",
        "hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-background hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
      )}
    >
      <Icon className="size-3.5 shrink-0 text-sky-600 transition-transform group-hover:scale-105 dark:text-sky-400" />
      <span className="min-w-0">{emphasizeLabel(chip.label, chip.emphasize)}</span>
      <IconArrowRight className="ml-auto size-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" />
    </button>
  );
}
