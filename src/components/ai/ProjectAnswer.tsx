"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import { animation } from "@/constants/animation";
import { usePortfolioCms } from "@/components/providers/PortfolioCmsProvider";
import { cn } from "@/lib/utils";

interface ProjectAnswerProps {
  mode?: "featured" | "recent" | "cardchat";
}

export function ProjectAnswer({ mode = "featured" }: ProjectAnswerProps) {
  const reducedMotion = useReducedMotion();
  const { projects } = usePortfolioCms();
  const featuredProjects = projects.filter((project) => project.featured);

  const items =
    mode === "cardchat"
      ? projects.filter((project) =>
          /cardchat|card.?chat/i.test(`${project.id} ${project.name}`),
        )
      : mode === "recent"
        ? [...projects]
            .sort((a, b) => Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10))
            .slice(0, 3)
        : featuredProjects.length > 0
          ? featuredProjects
          : projects.slice(0, 4);

  const list = items.length > 0 ? items : projects.slice(0, 3);

  return (
    <div className="mt-3 space-y-2.5">
      {list.map((project, index) => (
        <motion.article
          key={project.id}
          initial={reducedMotion === false ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * animation.chat.richStagger,
            duration: animation.chat.richDuration,
            ease: animation.ease.out,
          }}
          className="rounded-xl border border-border/70 bg-background/80 p-3.5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                {project.name}
              </h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {project.category}
              </p>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              {project.year}
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border/70 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </motion.article>
      ))}

      {mode !== "cardchat" ? (
        <a
          href="/projects"
          className={cn(
            "group inline-flex items-center gap-1 pt-1 text-[13px] font-medium text-foreground",
            "underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground/40",
          )}
        >
          View all projects
          <IconArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : null}
    </div>
  );
}
