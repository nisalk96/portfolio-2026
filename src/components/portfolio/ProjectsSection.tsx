"use client";

import {
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useState } from "react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectGridSkeleton } from "@/components/portfolio/ProjectCardSkeleton";
import { Section } from "@/components/layout/Section";
import { usePortfolioProjects } from "@/components/providers/PortfolioCmsProvider";
import { buttonVariants } from "@/components/ui/button";
import { useDragScroll } from "@/hooks/useDragScroll";
import { cn } from "@/lib/utils";

/* Vertical padding leaves room for the card hover lift and offset shadow,
   which an overflow-x scroller would otherwise clip. */
const RAIL_CLASS =
  "rail-bleed scrollbar-none flex gap-4 overflow-x-auto overscroll-x-contain pt-2 pb-5";
const CARD_CLASS = "w-[78vw] max-w-[340px] shrink-0 sm:w-[340px]";

function ProjectsRail({ railRef }: { railRef: (node: HTMLDivElement | null) => void }) {
  const projects = usePortfolioProjects();

  return (
    <div
      ref={railRef}
      className={cn(RAIL_CLASS, "relative touch-pan-y [-webkit-touch-callout:none]")}
      data-drag-scroll
      role="region"
      aria-label="Projects"
      tabIndex={0}
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
  );
}

export function ProjectsSection() {
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
    rail.addEventListener("scroll", updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, [rail, updateEdges]);

  const scrollByPage = (direction: 1 | -1) => {
    if (!rail) return;
    const page = rail.parentElement?.clientWidth ?? rail.clientWidth;
    rail.scrollBy({ left: direction * page, behavior: "smooth" });
  };

  const arrowClass = cn(
    buttonVariants({ variant: "outline", size: "icon-sm" }),
    "hidden rounded-full bg-white/70 sm:inline-flex dark:bg-white/5",
  );

  return (
    <Section
      id="work"
      eyebrow="Featured projects"
      title="Selected Work"
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label="Scroll projects left"
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label="Scroll projects right"
          >
            <IconChevronRight />
          </button>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "bg-white/70 dark:bg-white/5",
            )}
          >
            View All Projects
            <IconArrowUpRight />
          </Link>
        </div>
      }
    >
      <div className="@container">
        <Suspense
          fallback={
            <ProjectGridSkeleton
              count={4}
              compact
              className={RAIL_CLASS}
              itemClassName={CARD_CLASS}
            />
          }
        >
          <ProjectsRail railRef={setRail} />
        </Suspense>
      </div>
    </Section>
  );
}
