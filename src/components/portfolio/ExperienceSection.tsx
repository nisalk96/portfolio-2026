"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { transitionTypes } from "@/components/motion/PageTransition";
import { ExperienceItem } from "@/components/portfolio/ExperienceItem";
import { Section } from "@/components/layout/Section";
import { usePortfolioCms } from "@/components/providers/PortfolioCmsProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const { experience } = usePortfolioCms();

  return (
    <Section
      id="experience"
      eyebrow="My journey"
      title="Experience"
      action={
        <Link
          href="/resume"
          transitionTypes={transitionTypes.forward}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "bg-white/70 dark:bg-white/5",
          )}
        >
          Full Resume
          <IconArrowUpRight />
        </Link>
      }
    >
      <div className="grid gap-4 lg:auto-cols-fr lg:grid-flow-col">
        {experience.map((item, index) => (
          <ExperienceItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === experience.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
