"use client";

import {
  IconArrowUpRight,
  IconBriefcase,
  IconFolder,
  IconStack2,
} from "@tabler/icons-react";
import Link from "next/link";
import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { transitionTypes } from "@/components/motion/PageTransition";
import { TintIcon } from "@/components/portfolio/TintIcon";
import { usePortfolioProjects } from "@/components/providers/PortfolioCmsProvider";
import { buttonVariants } from "@/components/ui/button";
import {
  aboutBio,
  aboutHeading,
  technologiesCount,
  yearsOfExperience,
} from "@/data/highlights";
import { cn } from "@/lib/utils";

function ProjectsCount() {
  const projects = usePortfolioProjects();
  return <>{projects.length}+</>;
}

export function AboutSection() {
  const stats = [
    {
      id: "years",
      value: yearsOfExperience,
      label: "Years Experience",
      icon: IconBriefcase,
      tint: "violet",
    },
    {
      id: "projects",
      value: (
        <Suspense
          fallback={
            <span
              aria-hidden
              className="skeleton-shimmer inline-block h-6 w-10 rounded-md align-middle sm:h-7"
            />
          }
        >
          <ProjectsCount />
        </Suspense>
      ),
      label: "Projects Delivered",
      icon: IconFolder,
      tint: "blue",
    },
    {
      id: "tech",
      value: technologiesCount,
      label: "Technologies",
      icon: IconStack2,
      tint: "teal",
    },
  ] as const;

  return (
    <Section
      id="about"
      eyebrow="About me"
      title={
        <>
          {aboutHeading.lineOne}
          <br />
          {aboutHeading.lineTwo}
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
        <RevealGroup className="grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map((stat) => (
            <RevealItem
              key={stat.id}
              className="glass flex flex-col gap-3 rounded-2xl p-3 sm:p-4"
            >
              <TintIcon icon={stat.icon} tint={stat.tint} size="sm" />
              <div>
                <p className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-body sm:text-xs">
                  {stat.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup>
          <RevealItem
            as="p"
            className="text-sm leading-relaxed text-body md:text-[15px]"
          >
            {aboutBio}
          </RevealItem>
          <RevealItem className="mt-5">
            <Link
              href="/resume"
              transitionTypes={transitionTypes.forward}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "bg-white/70 dark:bg-white/5",
              )}
            >
              More About Me
              <IconArrowUpRight />
            </Link>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
