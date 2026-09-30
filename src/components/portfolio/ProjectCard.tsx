"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/portfolio";
import {
  projectImageTransitionName,
  SharedElement,
  transitionTypes,
} from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  /** Set for cards that render above the fold */
  preload?: boolean;
}

export function ProjectCard({
  project,
  index = 0,
  preload = false,
}: ProjectCardProps) {
  return (
    <Reveal
      as="article"
      delay={staggerDelay(index % 3)}
      amount={0.15}
      className="group"
    >
      <Link
        href={`/projects/${project.slug}`}
        transitionTypes={transitionTypes.forward}
        className={cn(
          "block overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300",
          "hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)]",
        )}
      >
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-gradient-to-br",
            project.imageGradient,
          )}
        >
          {project.imageUrl ? (
            <SharedElement name={projectImageTransitionName(project.slug)}>
              <Image
                src={project.imageUrl}
                alt={`${project.name} preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                preload={preload}
                fetchPriority={preload ? "high" : undefined}
              />
            </SharedElement>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%)] transition-transform duration-500 group-hover:scale-105" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
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
      </Link>
    </Reveal>
  );
}
