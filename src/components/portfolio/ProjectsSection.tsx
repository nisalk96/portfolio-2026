"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { Suspense } from "react";
import { transitionTypes } from "@/components/motion/PageTransition";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectGridSkeleton } from "@/components/portfolio/ProjectCardSkeleton";
import { Section } from "@/components/layout/Section";
import { usePortfolioProjects } from "@/components/providers/PortfolioCmsProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GRID_CLASS = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

function FeaturedProjects() {
  const projects = usePortfolioProjects();
  const featured = projects.filter((project) => project.featured);
  const items = (featured.length > 0 ? featured : projects).slice(0, 3);

  return (
    <div className={GRID_CLASS}>
      {items.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          compact
        />
      ))}
    </div>
  );
}

export function ProjectsSection() {
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
      <Suspense
        fallback={<ProjectGridSkeleton count={3} compact className={GRID_CLASS} />}
      >
        <FeaturedProjects />
      </Suspense>
    </Section>
  );
}
