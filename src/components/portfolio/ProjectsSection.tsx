"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { transitionTypes } from "@/components/motion/PageTransition";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Section } from "@/components/layout/Section";
import { usePortfolioCms } from "@/components/providers/PortfolioCmsProvider";

export function ProjectsSection() {
  const { projects } = usePortfolioCms();
  const featured = projects.filter((project) => project.featured);
  const items = featured.length > 0 ? featured : projects.slice(0, 4);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects"
      description="Production applications across products and platforms — open a project for screenshots, stack and details."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      <div className="mt-6">
        <Link
          href="/projects"
          transitionTypes={transitionTypes.forward}
          className="group inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground/40"
        >
          View all projects
          <IconArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Section>
  );
}
