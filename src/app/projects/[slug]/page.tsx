import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowUpRight, IconExternalLink } from "@tabler/icons-react";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { projects as fallbackProjects } from "@/data/projects";
import { mapHygraphProjects } from "@/lib/cms-mappers";
import { videoUrlToEmbed } from "@/lib/video-url";
import { getAllProjects, getProjectBySlug } from "@/server/hygraph";
import type { HygraphProject } from "@/types/hygraph";

export const revalidate = 3600;

type ProjectDetail = {
  title: string;
  description: string;
  year: string;
  slug: string;
  tags: string[];
  link: string | null;
  video: string | null;
  images: { id: string; url: string }[];
};

function fromHygraph(project: HygraphProject): ProjectDetail {
  return {
    title: project.title,
    description: project.description ?? "",
    year: project.year?.trim() || "—",
    slug: project.slug,
    tags: project.tags ?? [],
    link: project.link,
    video: project.video,
    images: project.images ?? [],
  };
}

function fromFallback(slug: string): ProjectDetail | null {
  const project = fallbackProjects.find((item) => item.slug === slug);
  if (!project) return null;
  return {
    title: project.name,
    description: project.longDescription || project.description,
    year: project.year,
    slug: project.slug,
    tags: project.tech,
    link: project.href ?? null,
    video: null,
    images: project.imageUrl
      ? [{ id: project.id, url: project.imageUrl }]
      : [],
  };
}

async function resolveProject(slug: string): Promise<ProjectDetail | null> {
  const cms = await getProjectBySlug(slug).catch(() => null);
  if (cms) return fromHygraph(cms);
  return fromFallback(slug);
}

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    if (projects.length > 0) {
      return projects
        .filter((project) => Boolean(project.slug))
        .map((project) => ({ slug: project.slug }));
    }
  } catch {
    // Fall through to local data when Hygraph isn't configured.
  }

  return fallbackProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);
  if (!project) {
    return { title: "Project — nisalk.dev" };
  }

  const image = project.images?.[0]?.url;

  return {
    title: `${project.title} — Projects · nisalk.dev`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Projects · nisalk.dev`,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await resolveProject(slug);
  if (!data) {
    notFound();
  }

  const embedUrl = data.video ? videoUrlToEmbed(data.video) : "";
  const related = await getAllProjects()
    .then(mapHygraphProjects)
    .catch(() => fallbackProjects);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: data.title,
    description: data.description,
    url: `https://nisalk.dev/projects/${data.slug}`,
    image: data.images?.map((image) => image.url) ?? [],
    dateCreated: data.year,
    author: {
      "@type": "Person",
      "@id": "https://nisalk.dev/#person",
      name: "Nisal Keerthisinghe",
      url: "https://nisalk.dev",
    },
  };

  return (
    <SiteChrome>
      <article className="py-10 md:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c"),
          }}
        />

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
          <Link
            href="/projects"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Projects
          </Link>
          {" / "}
          <span aria-current="page" className="text-foreground">
            {data.title}
          </span>
        </nav>

        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              {data.year || "Project"}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {data.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {data.description}
            </p>
          </div>

          {data.link ? (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-border/80 bg-background px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-foreground/15"
            >
              Visit live site
              <IconExternalLink className="size-3.5" />
            </a>
          ) : null}
        </header>

        <div className="grid gap-3">
          {data.images?.map((image, index) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted/30"
            >
              <Image
                src={image.url}
                alt={`${data.title} screenshot ${index + 1}`}
                width={1200}
                height={800}
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="h-auto w-full object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {embedUrl ? (
            <div className="overflow-hidden rounded-2xl border border-border/70">
              <iframe
                title={`${data.title} video`}
                allowFullScreen
                loading="lazy"
                src={embedUrl}
                aria-label={`${data.title} video`}
                className="aspect-video w-full"
              />
            </div>
          ) : null}
        </div>

        {data.tags?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border/70 bg-muted/40 px-2 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground/40"
          >
            Back to all projects
            <IconArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          {related.length > 1 ? (
            <span className="font-mono text-[11px] text-muted-foreground">
              {related.length} projects total
            </span>
          ) : null}
        </div>
      </article>
    </SiteChrome>
  );
}
