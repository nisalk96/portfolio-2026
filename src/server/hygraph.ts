import "server-only";

import { cache } from "react";
import type { HygraphExperience, HygraphProject } from "@/types/hygraph";

export type { HygraphExperience, HygraphProject };

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

function getHygraphEndpoint(): string {
  // Match Vercel envs first, then server-only aliases.
  return (
    process.env.NEXT_PUBLIC_HYGRAPHCMS_URL ??
    process.env.HYGRAPHCMS_URL ??
    ""
  );
}

function getHygraphToken(): string | undefined {
  // Prefer Vercel key name; keep server-only alias as fallback.
  return (
    process.env.NEXT_PUBLIC_HYGRAPHCMS_ACCESS_TOKEN ??
    process.env.HYGRAPHCMS_ACCESS_TOKEN
  );
}

async function hygraphRequest<TData>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { revalidate?: number; tags?: string[] },
): Promise<TData> {
  const endpoint = getHygraphEndpoint();
  if (!endpoint) {
    throw new Error(
      "Missing Hygraph endpoint. Set NEXT_PUBLIC_HYGRAPHCMS_URL (or HYGRAPHCMS_URL).",
    );
  }

  const token = getHygraphToken();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: options?.revalidate ?? 3600,
      tags: options?.tags,
    },
  });

  if (!res.ok) {
    throw new Error(`Hygraph request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;
  if (json.errors?.length) {
    const message = json.errors
      .map((e) => e.message)
      .filter(Boolean)
      .join("; ");
    throw new Error(message || "Hygraph request returned GraphQL errors.");
  }
  if (!json.data) {
    throw new Error("Hygraph request returned no data.");
  }
  return json.data;
}

/** Uses the latest year in the label (ranges, "Present", etc.) as fallback when createdAt is missing. */
function experienceRecencyScore(year: string): number {
  const lower = year.toLowerCase();
  const currentYear = new Date().getFullYear();
  const years = year.match(/\d{4}/g)?.map(Number) ?? [];
  const maxFromLabel = years.length > 0 ? Math.max(...years) : 0;
  if (
    lower.includes("present") ||
    lower.includes("now") ||
    lower.includes("current")
  ) {
    return Math.max(maxFromLabel, currentYear);
  }
  return maxFromLabel;
}

function sortExperiencesNewestFirst(
  experiences: HygraphExperience[],
): HygraphExperience[] {
  return [...experiences].sort((a, b) => {
    const tb = Date.parse(b.createdAt);
    const ta = Date.parse(a.createdAt);
    if (Number.isFinite(tb) && Number.isFinite(ta) && tb !== ta) {
      return tb - ta;
    }
    return experienceRecencyScore(b.year) - experienceRecencyScore(a.year);
  });
}

const GET_ALL_PROJECTS = /* GraphQL */ `
  query getProject {
    projects {
      id
      images {
        id
        url
      }
      title
      video
      year
      description
      tags
      slug
      link
    }
  }
`;

const GET_PROJECT_BY_SLUG = /* GraphQL */ `
  query getProject($slug: String!) {
    project(where: { slug: $slug }) {
      images {
        id
        url
      }
      title
      video
      description
      link
      tags
      slug
      year
      id
    }
  }
`;

const GET_ALL_EXPERIENCES = /* GraphQL */ `
  query getAllExperiances {
    experiances(orderBy: createdAt_DESC) {
      id
      title
      position
      work
      year
      link
      createdAt
    }
  }
`;

export const getAllProjects = cache(async (): Promise<HygraphProject[]> => {
  const data = await hygraphRequest<{ projects: HygraphProject[] }>(
    GET_ALL_PROJECTS,
    undefined,
    { revalidate: 3600, tags: ["projects"] },
  );
  return data.projects;
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<HygraphProject | null> => {
    const data = await hygraphRequest<{ project: HygraphProject | null }>(
      GET_PROJECT_BY_SLUG,
      { slug },
      { revalidate: 3600, tags: ["projects", `project:${slug}`] },
    );
    return data.project;
  },
);

export const getAllExperiences = cache(
  async (): Promise<HygraphExperience[]> => {
    const data = await hygraphRequest<{ experiances: HygraphExperience[] }>(
      GET_ALL_EXPERIENCES,
      undefined,
      { revalidate: 3600, tags: ["experiences"] },
    );
    return sortExperiencesNewestFirst(data.experiances);
  },
);
