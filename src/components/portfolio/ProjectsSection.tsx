"use client";

import { ProjectsCarousel } from "@/components/portfolio/ProjectsCarousel";
import { usePortfolioProjects } from "@/components/providers/PortfolioCmsProvider";

export function ProjectsSection() {
  const projects = usePortfolioProjects();

  const selected = projects.filter((project) => !project.hobby);
  const hobby = projects.filter((project) => project.hobby);

  return (
    <>
      <ProjectsCarousel
        id="work"
        eyebrow="Featured projects"
        title="Selected Work"
        description="Production applications across products and platforms — open a project for screenshots, stack and details."
        projects={selected}
      />
      <ProjectsCarousel
        id="hobby"
        eyebrow="Side projects"
        title="Hobby Works"
        description="Chrome extensions, Flutter apps and game experiments built for curiosity and shipping practice."
        projects={hobby}
        viewAllHref="/projects#hobby"
        viewAllLabel="View hobby projects"
      />
    </>
  );
}
