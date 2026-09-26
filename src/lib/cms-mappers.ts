import type { HygraphExperience, HygraphProject } from "@/types/hygraph";
import type { Experience, Project } from "@/types/portfolio";

const IMAGE_GRADIENTS = [
  "from-slate-800 via-slate-700 to-blue-900",
  "from-indigo-900 via-slate-800 to-cyan-900",
  "from-rose-900 via-slate-800 to-slate-900",
  "from-violet-900 via-slate-800 to-fuchsia-900",
  "from-emerald-900 via-slate-800 to-slate-900",
  "from-amber-900 via-slate-800 to-orange-950",
  "from-sky-900 via-slate-800 to-slate-950",
] as const;

function projectRecencyScore(year: string | null): number {
  if (!year) return 0;
  const years = year.match(/\d{4}/g)?.map(Number) ?? [];
  return years.length > 0 ? Math.max(...years) : 0;
}

function gradientForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % IMAGE_GRADIENTS.length;
  }
  return IMAGE_GRADIENTS[hash] ?? IMAGE_GRADIENTS[0];
}

export function mapHygraphProject(project: HygraphProject, index = 0): Project {
  const year = project.year?.trim() || "—";
  const tech = project.tags ?? [];
  const imageUrl = project.images?.[0]?.url;

  return {
    id: project.slug || project.id,
    slug: project.slug || project.id,
    name: project.title,
    category: tech[0] ? tech[0] : "Project",
    description: project.description ?? "",
    longDescription: project.description ?? "",
    tech,
    year,
    imageGradient: gradientForSlug(project.slug || project.id),
    imageUrl,
    href: project.link ?? undefined,
    featured: index < 4 || Boolean(imageUrl && project.link),
  };
}

export function mapHygraphProjects(projects: HygraphProject[]): Project[] {
  return [...projects]
    .sort(
      (a, b) => projectRecencyScore(b.year) - projectRecencyScore(a.year),
    )
    .map((project, index) => mapHygraphProject(project, index));
}

export function mapHygraphExperience(item: HygraphExperience): Experience {
  return {
    id: item.id,
    company: item.title,
    role: item.position,
    period: item.year,
    location: "Remote",
    achievements: item.work ?? [],
    tech: [],
  };
}

export function mapHygraphExperiences(
  experiences: HygraphExperience[],
): Experience[] {
  return experiences.map(mapHygraphExperience);
}
