import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectGridSkeleton } from "@/components/portfolio/ProjectCardSkeleton";
import { projects as fallbackProjects } from "@/data/projects";
import {
  mapAppPortfoliosToProjects,
  mapHygraphProjects,
  mergePortfolioAndHobbyProjects,
} from "@/lib/cms-mappers";
import { jsonLdScript, pageMetadata } from "@/lib/seo";
import { getAllAppPortfolios } from "@/server/hygraph-apps";
import { getAllProjects } from "@/server/hygraph";

const GRID_CLASS = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3";

export const metadata: Metadata = pageMetadata(
  "Software Development Projects",
  "Explore software development projects by Nisal Keerthisinghe, a software engineer in Sri Lanka working with Next.js, TypeScript, Node.js and GraphQL.",
  "/projects",
);

async function ProjectsGrid() {
  // Render per request; must run before the swallowing `.catch` below.
  await connection();

  const [cmsProjects, hobbyApps] = await Promise.all([
    getAllProjects().catch(() => null),
    getAllAppPortfolios()
      .then(mapAppPortfoliosToProjects)
      .catch(() => []),
  ]);

  const portfolioProjects =
    cmsProjects && cmsProjects.length > 0
      ? mapHygraphProjects(cmsProjects)
      : fallbackProjects;
  const projects = mergePortfolioAndHobbyProjects(
    portfolioProjects,
    hobbyApps,
  );

  const selected = projects.filter((project) => !project.hobby);
  const hobby = projects.filter((project) => project.hobby);

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
              url: project.cardHref?.startsWith("http")
                ? project.cardHref
                : `https://nisalk.dev${project.cardHref ?? `/projects/${project.slug}`}`,
              description: project.description,
            })),
          }),
        }}
      />

      <div className={GRID_CLASS}>
        {selected.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            preload={index < 3}
          />
        ))}
      </div>

      {hobby.length > 0 ? (
        <div id="hobby" className="mt-14 scroll-mt-24 md:mt-16">
          <div className="mb-6 max-w-2xl">
            <p className="mb-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              Side projects
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Hobby Works
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              Chrome extensions, Flutter apps and game experiments.
            </p>
          </div>
          <div className={GRID_CLASS}>
            {hobby.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      ) : null}
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
