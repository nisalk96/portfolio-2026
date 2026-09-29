import type { Metadata } from "next";
import Link from "next/link";
import { transitionTypes } from "@/components/motion/PageTransition";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projects as fallbackProjects } from "@/data/projects";
import { mapHygraphProjects } from "@/lib/cms-mappers";
import { jsonLdScript, pageMetadata } from "@/lib/seo";
import { getAllProjects } from "@/server/hygraph";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata(
  "Software Development Projects",
  "Explore software development projects by Nisal Keerthisinghe, a software engineer in Sri Lanka working with Next.js, TypeScript, Node.js and GraphQL.",
  "/projects",
);

export default async function ProjectsPage() {
  const cmsProjects = await getAllProjects().catch(() => null);
  const projects =
    cmsProjects && cmsProjects.length > 0
      ? mapHygraphProjects(cmsProjects)
      : fallbackProjects;

  return (
    <SiteChrome>
      <div className="py-10 md:py-14">
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

        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted-foreground">
          <Link
            href="/"
            transitionTypes={transitionTypes.back}
            className="underline-offset-4 hover:text-foreground hover:underline">
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

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </SiteChrome>
  );
}
