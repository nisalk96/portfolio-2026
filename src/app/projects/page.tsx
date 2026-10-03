import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { transitionTypes } from "@/components/motion/PageTransition";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectGridSkeleton } from "@/components/portfolio/ProjectCardSkeleton";
import { projects as fallbackProjects } from "@/data/projects";
import { mapHygraphProjects } from "@/lib/cms-mappers";
import { jsonLdScript, pageMetadata } from "@/lib/seo";
import { getLatestProjects } from "@/server/hygraph";

const GRID_CLASS = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3";

export const metadata: Metadata = pageMetadata(
  "Software Development Projects",
  "Explore software development projects by Nisal Keerthisinghe, a software engineer in Sri Lanka working with Next.js, TypeScript, Node.js and GraphQL.",
  "/projects",
);

async function ProjectsGrid() {
  // Render per request so newly published CMS projects show up immediately.
  await connection();

  const cmsProjects = await getLatestProjects().catch(() => null);
  const projects =
    cmsProjects && cmsProjects.length > 0
      ? mapHygraphProjects(cmsProjects)
      : fallbackProjects;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://nisalk.dev/projects#collection",
            url: "https://nisalk.dev/projects",
            name: "Software Development Projects",
            isPartOf: { "@id": "https://nisalk.dev/#website" },
            about: { "@id": "https://nisalk.dev/#person" },
            hasPart: projects.map((project) => ({
              "@type": "CreativeWork",
              name: project.name,
              url: `https://nisalk.dev/projects/${project.slug}`,
              description: project.description,
            })),
          }),
        }}
      />

      <div className={GRID_CLASS}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            preload={index < 3}
          />
        ))}
      </div>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <SiteChrome>
      <div className="py-10 md:py-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 font-mono text-xs text-muted-foreground"
        >
          <Link
            href="/"
            transitionTypes={transitionTypes.back}
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Home
          </Link>
          {" / "}
          <span aria-current="page" className="text-foreground">
            Projects
          </span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="mb-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Selected work
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            Applications, products and experiments — open any project for
            screenshots, stack details and links.
          </p>
        </div>

        <Suspense
          fallback={<ProjectGridSkeleton count={6} className={GRID_CLASS} />}
        >
          <ProjectsGrid />
        </Suspense>
      </div>
    </SiteChrome>
  );
}
