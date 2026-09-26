"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <a
        href={project.href ?? "#projects"}
        className={cn(
          "block overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300",
          "hover:-translate-y-1 hover:border-foreground/15",
        )}
      >
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-gradient-to-br",
            project.imageGradient,
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%)] transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-mono text-[11px] tracking-[0.14em] text-white/70 uppercase">
              {project.category}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {project.name}
            </h3>
          </div>
          <IconArrowUpRight className="absolute top-3 right-3 size-4 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <div className="space-y-3 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border/70 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            <span className="ml-auto font-mono text-[11px] text-muted-foreground">
              {project.year}
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
