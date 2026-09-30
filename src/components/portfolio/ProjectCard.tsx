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
  /** Hide the description and tech row (home page "Selected Work" layout) */
  compact?: boolean;
}

export function ProjectCard({
  project,
  index = 0,
  preload = false,
  compact = false,
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
        className="glass block overflow-hidden rounded-2xl border border-border p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--brand)]"
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
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover"
                preload={preload}
                fetchPriority={preload ? "high" : undefined}
              />
            </SharedElement>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%)] transition-transform duration-500 group-hover:scale-105" />
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-4">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-foreground">
              {project.name}
            </h3>
            <p className="mt-0.5 truncate text-xs text-body">
              {project.category}
            </p>
          </div>
          <span className="glass inline-flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <IconArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        {compact ? null : (
          <div className="space-y-3 px-3 pb-3">
            <p className="line-clamp-3 text-sm leading-relaxed text-body">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/60 px-2 py-0.5 text-[11px] text-body dark:bg-white/5"
                >
                  {tech}
                </span>
              ))}
              <span className="ml-auto font-mono text-[11px] text-body">
                {project.year}
              </span>
            </div>
          </div>
        )}
      </Link>
    </Reveal>
  );
}
