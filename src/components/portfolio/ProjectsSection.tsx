import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Section } from "@/components/layout/Section";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects"
      description="Production applications across fintech, crypto, commerce and mobile — focused on polished interfaces and reliable delivery."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
