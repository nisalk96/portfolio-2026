"use client";

import { useMemo } from "react";
import type { ContributionDay } from "@/types/github-contributions";
import { cn } from "@/lib/utils";

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;

const LEVEL_CLASS: Record<ContributionDay["level"], string> = {
  0: "bg-foreground/10 dark:bg-white/10",
  1: "bg-brand-soft/80 dark:bg-tint-violet",
  2: "bg-brand-soft dark:bg-[#6E64C8]",
  3: "bg-[#FF7A21] dark:bg-brand",
  4: "bg-brand dark:bg-[#A898F5]",
};

type Week = ContributionDay[];

function buildWeeks(days: ContributionDay[]): Week[] {
  const weeks: Week[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function monthLabel(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleString("en-US", { month: "short" });
}

function formatDayTitle(day: ContributionDay): string {
  const date = new Date(`${day.date}T00:00:00`);
  const when = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (day.count === 0) return `No contributions on ${when}`;
  if (day.count === 1) return `1 contribution on ${when}`;
  return `${day.count} contributions on ${when}`;
}

type ContributionGraphProps = {
  contributions: ContributionDay[];
  className?: string;
};

export function ContributionGraph({
  contributions,
  className,
}: ContributionGraphProps) {
  const weeks = useMemo(() => buildWeeks(contributions), [contributions]);

  const monthMarks = useMemo(() => {
    const marks: { index: number; label: string }[] = [];
    let prev = "";
    weeks.forEach((week, index) => {
      const first = week[0];
      if (!first) return;
      const label = monthLabel(first.date);
      if (label !== prev) {
        marks.push({ index, label });
        prev = label;
      }
    });
    return marks;
  }, [weeks]);

  return (
    <div
      className={cn("w-full overflow-x-auto overscroll-x-contain", className)}
    >
      <div className="inline-block min-w-full">
        <div
          className="mb-1.5 grid gap-[3px]"
          style={{
            gridTemplateColumns: `28px repeat(${weeks.length}, minmax(0, 1fr))`,
          }}
        >
          <span />
          {weeks.map((_, index) => {
            const mark = monthMarks.find((item) => item.index === index);
            return (
              <span
                key={`m-${index}`}
                className="h-4 text-[10px] leading-none text-subtle"
              >
                {mark?.label ?? ""}
              </span>
            );
          })}
        </div>

        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `28px repeat(${weeks.length}, minmax(0, 1fr))`,
          }}
        >
          {DAY_LABELS.map((label, row) => (
            <div key={`row-${row}`} className="contents">
              <span className="flex h-[11px] items-center text-[10px] leading-none text-subtle">
                {label}
              </span>
              {weeks.map((week, weekIndex) => {
                const day = week[row];
                if (!day) {
                  return (
                    <span
                      key={`e-${weekIndex}-${row}`}
                      className="size-[11px]"
                    />
                  );
                }
                return (
                  <span
                    key={day.date}
                    title={formatDayTitle(day)}
                    aria-label={formatDayTitle(day)}
                    className={cn(
                      "size-[11px] rounded-[2px] transition-colors",
                      LEVEL_CLASS[day.level],
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-subtle">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span
              key={level}
              className={cn("size-[11px] rounded-[2px]", LEVEL_CLASS[level])}
              aria-hidden
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
