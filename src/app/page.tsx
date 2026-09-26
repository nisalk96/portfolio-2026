import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
import { PortfolioCmsProvider } from "@/components/providers/PortfolioCmsProvider";
import { experience as fallbackExperience } from "@/data/experience";
import { projects as fallbackProjects } from "@/data/projects";
import {
  mapHygraphExperiences,
  mapHygraphProjects,
} from "@/lib/cms-mappers";
import { getAllExperiences, getAllProjects } from "@/server/hygraph";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [cmsProjects, cmsExperiences] = await Promise.all([
    getAllProjects().catch(() => null),
    getAllExperiences().catch(() => null),
  ]);

  const projects =
    cmsProjects && cmsProjects.length > 0
      ? mapHygraphProjects(cmsProjects)
      : fallbackProjects;
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
