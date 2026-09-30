"use client";

import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  /** Rendered at the top-right of the section header (e.g. a "View all" pill) */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "glass-panel mt-5 scroll-mt-24 p-5 md:mt-6 md:p-8",
        className,
      )}
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-7">
        <RevealGroup className="max-w-2xl" amount={0.6}>
          {eyebrow ? (
            <RevealItem as="p" className="eyebrow mb-2">
              {eyebrow}
            </RevealItem>
          ) : null}
          <RevealItem>
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {title}
            </h2>
          </RevealItem>
          {description ? (
            <RevealItem
              as="p"
              className="mt-2 text-sm leading-relaxed text-body md:text-[15px]"
            >
              {description}
            </RevealItem>
          ) : null}
        </RevealGroup>
        {action}
      </div>
      {children}
    </section>
  );
}
