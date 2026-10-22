import "server-only";

import { profile } from "@/data/profile";
import type {
  ContributionDay,
  GithubContributions,
} from "@/types/github-contributions";

export type { ContributionDay, GithubContributions };

const API = "https://github-contributions-api.jogruber.de/v4";

function githubUsername(): string {
  try {
    return new URL(profile.github).pathname.replace(/^\//, "").split("/")[0]!;
  } catch {
    return "nisalk96";
  }
}

function clampLevel(level: number): ContributionDay["level"] {
  if (level <= 0) return 0;
  if (level >= 4) return 4;
  return level as ContributionDay["level"];
}

export async function getGithubContributions(): Promise<GithubContributions | null> {
  const username = githubUsername();

  try {
    const res = await fetch(`${API}/${username}?y=last`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      total?: { lastYear?: number };
      contributions?: Array<{ date: string; count: number; level: number }>;
    };

    const contributions = (data.contributions ?? []).map((day) => ({
      date: day.date,
      count: day.count,
      level: clampLevel(day.level),
    }));

    if (contributions.length === 0) return null;

    return {
      username,
      total:
        data.total?.lastYear ??
        contributions.reduce((n, d) => n + d.count, 0),
      contributions,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return null;
  }
}
