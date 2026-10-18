import "server-only";

import { cache } from "react";
import type { HygraphAppPortfolio } from "@/types/hygraph-apps";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

function getAppsEndpoint(): string {
  return process.env.HYGRAPH_APPS_URL?.trim() ?? "";
}

function getAppsToken(): string | undefined {
  return process.env.HYGRAPH_APPS_TOKEN?.trim();
}

async function appsRequest<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const endpoint = getAppsEndpoint();
  if (!endpoint) {
    throw new Error(
      "Missing AppPortfolio CMS endpoint. Set HYGRAPH_APPS_URL.",
    );
  }

  const token = getAppsToken();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600, tags: ["app-portfolios"] },
  });

  if (!res.ok) {
    throw new Error(
      `AppPortfolio CMS request failed: ${res.status} ${res.statusText}`,
    );
  }

  const json = (await res.json()) as GraphQLResponse<TData>;
  if (json.errors?.length) {
    const message = json.errors
      .map((error) => error.message)
      .filter(Boolean)
      .join("; ");
    throw new Error(message || "AppPortfolio CMS returned GraphQL errors.");
  }
  if (!json.data) {
    throw new Error("AppPortfolio CMS returned no data.");
  }
  return json.data;
}

const APP_FIELDS = `
  id
  name
  slug
  description
  privacyPolicy
  termsOfUse
  playstoreLink
  appstoreLink
  tags
  supportPlatforms
  appIcon { url }
  screens { url }
  updatedAt
`;

const GET_ALL_APPS = /* GraphQL */ `
  query getAppPortfolios {
    appPortfolios {
      ${APP_FIELDS}
    }
  }
`;

const GET_APP_BY_SLUG = /* GraphQL */ `
  query getAppPortfolio($slug: String!) {
    appPortfolio(where: { slug: $slug }) {
      ${APP_FIELDS}
    }
  }
`;

export const getAllAppPortfolios = cache(
  async (): Promise<HygraphAppPortfolio[]> => {
    const data = await appsRequest<{ appPortfolios: HygraphAppPortfolio[] }>(
      GET_ALL_APPS,
    );
    return data.appPortfolios ?? [];
  },
);

export const getAppPortfolioBySlug = cache(
  async (slug: string): Promise<HygraphAppPortfolio | null> => {
    const data = await appsRequest<{
      appPortfolio: HygraphAppPortfolio | null;
    }>(GET_APP_BY_SLUG, { slug });
    return data.appPortfolio;
  },
);

export const getAppsWithPrivacyPolicy = cache(async () => {
  const apps = await getAllAppPortfolios();
  return apps.filter(
    (app) => Boolean(app.privacyPolicy?.trim()) && Boolean(app.slug),
  );
});
