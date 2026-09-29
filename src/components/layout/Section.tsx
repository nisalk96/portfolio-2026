"use client";

import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 md:py-20", className)}>
      <RevealGroup className="mb-8 max-w-2xl" amount={0.6}>
        {eyebrow ? (
          <RevealItem
            as="p"
            className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase"
          >
            <span className="h-px w-6 bg-sky-500/60" aria-hidden />
            {eyebrow}
          </RevealItem>
        ) : null}
        <RevealItem>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]">
            {title}
          </h2>
        </RevealItem>
        {description ? (
          <RevealItem
            as="p"
            className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]"
          >
            {description}
          </RevealItem>
        ) : null}
      </RevealGroup>
      {children}
    </section>
  );
}
