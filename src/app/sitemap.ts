import type { MetadataRoute } from "next";
import { projects as fallbackProjects } from "@/data/projects";
import { seo } from "@/constants/seo";
import { getAllProjects } from "@/server/hygraph";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seo.siteUrl;

  let projectSlugs: string[] = fallbackProjects.map((project) => project.slug);
  try {
    const projects = await getAllProjects();
    if (projects.length > 0) {
      projectSlugs = projects.map((project) => project.slug).filter(Boolean);
    }
  } catch {
    // Keep local fallbacks when CMS is unavailable at build time.
  }

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...projectSlugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
