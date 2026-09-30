"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { transitionTypes } from "@/components/motion/PageTransition";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Section } from "@/components/layout/Section";
import { usePortfolioCms } from "@/components/providers/PortfolioCmsProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const { projects } = usePortfolioCms();
  const featured = projects.filter((project) => project.featured);
  const items = (featured.length > 0 ? featured : projects).slice(0, 3);

  return (
    <Section
      id="work"
      eyebrow="Featured projects"
      title="Selected Work"
      action={
        <Link
          href="/projects"
          transitionTypes={transitionTypes.forward}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "bg-white/70 dark:bg-white/5",
          )}
        >
          View All Projects
          <IconArrowUpRight />
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            compact
          />
        ))}
      </div>
    </Section>
  );
}
