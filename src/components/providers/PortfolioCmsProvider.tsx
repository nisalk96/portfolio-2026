"use client";

import { createContext, use, useContext } from "react";
import type { Experience, Project } from "@/types/portfolio";

export type PortfolioCmsData = {
  /** Streamed from the server; read with `usePortfolioProjects` inside a Suspense boundary. */
  projects: Promise<Project[]>;
  experience: Experience[];
};

const PortfolioCmsContext = createContext<PortfolioCmsData | null>(null);

export function PortfolioCmsProvider({
  value,
  children,
}: {
  value: PortfolioCmsData;
  children: React.ReactNode;
}) {
  return (
    <PortfolioCmsContext.Provider value={value}>
      {children}
    </PortfolioCmsContext.Provider>
  );
}

export function usePortfolioCms(): PortfolioCmsData {
  const value = useContext(PortfolioCmsContext);
  if (!value) {
    throw new Error("usePortfolioCms must be used within PortfolioCmsProvider");
  }
  return value;
}

/** Suspends until the CMS projects have streamed in. */
export function usePortfolioProjects(): Project[] {
  return use(usePortfolioCms().projects);
}
