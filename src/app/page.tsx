import type { Metadata } from "next";
import { connection } from "next/server";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
import { PortfolioCmsProvider } from "@/components/providers/PortfolioCmsProvider";
import { experience as fallbackExperience } from "@/data/experience";
import { projects as fallbackProjects } from "@/data/projects";
import { mapHygraphExperiences, mapHygraphProjects } from "@/lib/cms-mappers";
import { getAllExperiences, getLatestProjects } from "@/server/hygraph";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  // Render per request so newly published CMS projects show up immediately.
  await connection();

  const projects = getLatestProjects()
    .then((cmsProjects) =>
      cmsProjects.length > 0 ? mapHygraphProjects(cmsProjects) : fallbackProjects,
    )
    .catch(() => fallbackProjects);

  const cmsExperiences = await getAllExperiences().catch(() => null);
  const experience =
    cmsExperiences && cmsExperiences.length > 0
      ? mapHygraphExperiences(cmsExperiences)
      : fallbackExperience;

  return (
    <PortfolioCmsProvider value={{ projects, experience }}>
      <h1 className="sr-only">
        Full-Stack Web Developer in Sri Lanka | React, Next.js, TypeScript,
        GraphQL Specialist | nisalk.dev
      </h1>
      <PortfolioPage />
    </PortfolioCmsProvider>
  );
}
