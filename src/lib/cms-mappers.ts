import type {
  HygraphExperience,
  HygraphProject,
  HygraphProjectType,
} from "@/types/hygraph";
import type { HygraphAppPortfolio } from "@/types/hygraph-apps";
import type { Experience, Project, ProjectType } from "@/types/portfolio";

const IMAGE_GRADIENTS = [
  "from-slate-800 via-slate-700 to-blue-900",
  "from-indigo-900 via-slate-800 to-cyan-900",
  "from-rose-900 via-slate-800 to-slate-900",
  "from-violet-900 via-slate-800 to-fuchsia-900",
  "from-emerald-900 via-slate-800 to-slate-900",
  "from-amber-900 via-slate-800 to-orange-950",
  "from-sky-900 via-slate-800 to-slate-950",
] as const;

const PROJECT_TYPE_LABELS: Record<HygraphProjectType, string> = {
  website: "Website",
  mobileApp: "Mobile App",
  webExtension: "Web Extension",
  videoGamePc: "Game Dev",
  videoGameMobile: "Mobile Game",
};

const HOBBY_PROJECT_TYPES = new Set<HygraphProjectType>([
  "mobileApp",
  "webExtension",
  "videoGamePc",
  "videoGameMobile",
]);

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

function normalizeProjectTypes(
  types: HygraphProjectType[] | undefined,
): ProjectType[] {
  return (types ?? []).filter((type): type is ProjectType =>
    type in PROJECT_TYPE_LABELS,
  );
}

export function isHobbyProjectType(types: ProjectType[] | undefined): boolean {
  return (types ?? []).some((type) => HOBBY_PROJECT_TYPES.has(type));
}

function categoryFromProject(
  types: ProjectType[],
  tags: string[],
): string {
  const hobbyType = types.find((type) => HOBBY_PROJECT_TYPES.has(type));
  if (hobbyType) return PROJECT_TYPE_LABELS[hobbyType];
  if (types[0]) return PROJECT_TYPE_LABELS[types[0]];
  return tags[0] ?? "Project";
}

export function mapHygraphProject(project: HygraphProject, index = 0): Project {
  const year = project.year?.trim() || "—";
  const tech = project.tags ?? [];
  const imageUrl = project.images?.[0]?.url;
  const projectTypes = normalizeProjectTypes(project.projectType);
  const hobby = isHobbyProjectType(projectTypes);

  return {
    id: project.slug || project.id,
    slug: project.slug || project.id,
    name: project.title,
    category: categoryFromProject(projectTypes, tech),
    description: project.description ?? "",
    longDescription: project.description ?? "",
    tech,
    year,
    imageGradient: gradientForSlug(project.slug || project.id),
    imageUrl,
    href: project.link ?? undefined,
    projectTypes,
    hobby,
    featured: !hobby && (index < 6 || Boolean(imageUrl && project.link)),
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

function isUsableHttpUrl(value: string | null | undefined): value is string {
  if (!value?.trim()) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function projectTypesFromApp(app: HygraphAppPortfolio): ProjectType[] {
  const tags = (app.tags ?? []).join(" ").toLowerCase();
  const platforms = app.supportPlatforms ?? [];

  if (/chrome|extension|browser/.test(tags) || /extension/i.test(app.name)) {
    return ["webExtension"];
  }
  if (/game/.test(tags)) {
    return platforms.includes("android") || platforms.includes("ios")
      ? ["videoGameMobile"]
      : ["videoGamePc"];
  }
  return ["mobileApp"];
}

function shortAppName(name: string): string {
  return name.split(/[–—-]/)[0]?.trim() || name;
}

export function mapAppPortfolioToProject(app: HygraphAppPortfolio): Project {
  const projectTypes = projectTypesFromApp(app);
  const tech = (app.tags ?? []).filter(Boolean);
  const imageUrl = app.screens?.[0]?.url ?? app.appIcon?.url;
  const storeLink =
    [app.playstoreLink, app.appstoreLink].find(isUsableHttpUrl) ?? undefined;
  const cardHref =
    storeLink ??
    (app.privacyPolicy?.trim()
      ? `/extensions/${app.slug}/privacy`
      : undefined);

  return {
    id: `app-${app.slug || app.id}`,
    slug: app.slug || app.id,
    name: shortAppName(app.name),
    category: categoryFromProject(projectTypes, tech),
    description: app.description?.trim() ?? "",
    longDescription: app.description?.trim() ?? "",
    tech,
    year: app.updatedAt
      ? String(new Date(app.updatedAt).getFullYear())
      : "—",
    imageGradient: gradientForSlug(app.slug || app.id),
    imageUrl,
    href: storeLink,
    cardHref,
    projectTypes,
    hobby: true,
    featured: false,
  };
}

export function mapAppPortfoliosToProjects(
  apps: HygraphAppPortfolio[],
): Project[] {
  return apps.map(mapAppPortfolioToProject);
}

/** Merge portfolio projects with AppPortfolio hobby apps (CMS-only). */
export function mergePortfolioAndHobbyProjects(
  portfolioProjects: Project[],
  hobbyApps: Project[],
): Project[] {
  const slugs = new Set(portfolioProjects.map((project) => project.slug));
  const extras = hobbyApps.filter((app) => !slugs.has(app.slug));
  return [...portfolioProjects, ...extras];
}
