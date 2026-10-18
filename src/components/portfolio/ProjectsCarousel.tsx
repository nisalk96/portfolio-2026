"use client";

import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { useDragScroll } from "@/hooks/useDragScroll";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

/* Vertical padding leaves room for the card hover lift and offset shadow,
   which an overflow-x scroller would otherwise clip. */
const RAIL_CLASS =
  "rail-bleed scrollbar-none flex gap-4 overflow-x-auto overscroll-x-contain pt-2 pb-5";
const CARD_CLASS = "w-[78vw] max-w-[340px] shrink-0 sm:w-[340px]";

interface ProjectsCarouselProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  projects: Project[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function ProjectsCarousel({
  id,
  eyebrow,
  title,
  description,
  projects,
  viewAllHref = "/projects",
  viewAllLabel = "View all projects",
}: ProjectsCarouselProps) {
  const [rail, setRail] = useState<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  useDragScroll(rail);

  const updateEdges = useCallback(() => {
    if (!rail) return;
    setCanPrev(rail.scrollLeft > 4);
    setCanNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
  }, [rail]);

  useEffect(() => {
    if (!rail) return;
    updateEdges();
    rail.addEventListener("scroll", updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, [rail, projects, updateEdges]);

  const scrollByPage = (direction: -1 | 1) => {
    if (!rail) return;
    const page = rail.parentElement?.clientWidth ?? rail.clientWidth;
    rail.scrollBy({
      left: direction * page,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  if (projects.length === 0) return null;

  const arrowClass = cn(
    buttonVariants({ variant: "outline", size: "icon-sm" }),
    "hidden rounded-full bg-white/70 sm:inline-flex dark:bg-white/5",
  );

  return (
    <Section
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      action={
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label={`Previous ${title} projects`}
          >
            <IconArrowLeft />
          </button>
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label={`Next ${title} projects`}
          >
            <IconArrowRight />
          </button>
          <Link
            href={viewAllHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "bg-white/70 dark:bg-white/5",
            )}
          >
            {viewAllLabel}
            <IconArrowUpRight />
          </Link>
        </div>
      }
    >
      <div className="@container">
        <div
          ref={setRail}
          tabIndex={0}
          role="region"
          aria-label={`${title} project carousel`}
          data-drag-scroll
          className={cn(
            RAIL_CLASS,
            "relative touch-pan-y [-webkit-touch-callout:none]",
          )}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              compact
              className={CARD_CLASS}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

export { RAIL_CLASS, CARD_CLASS };
