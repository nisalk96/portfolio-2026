"use client";

import { IconBrandGithub, IconArrowUpRight } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { ContributionGraph } from "@/components/portfolio/ContributionGraph";
import { Reveal } from "@/components/motion/Reveal";
import type { GithubContributions } from "@/types/github-contributions";
import { profile } from "@/data/profile";

type ContributionsSectionProps = {
  data: GithubContributions | null;
};

export function ContributionsSection({ data }: ContributionsSectionProps) {
  if (!data) return null;

  return (
    <Section
      id="contributions"
      eyebrow="GitHub"
      title={
        <>
          <span className="text-brand tabular-nums">
            {data.total.toLocaleString()}
          </span>{" "}
          contributions in the last year
        </>
      }
      description="A year of commits, PRs, and reviews — rendered in the site palette."
      action={
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          <IconBrandGithub className="size-4" />
          @{data.username}
          <IconArrowUpRight className="size-3.5" />
        </a>
      }
    >
      <Reveal amount={0.15}>
        <div className="rounded-2xl border border-border bg-panel/40 px-3 py-4 md:px-5 md:py-5">
          <ContributionGraph contributions={data.contributions} />
        </div>
      </Reveal>
    </Section>
  );
}
