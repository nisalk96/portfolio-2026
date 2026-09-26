"use client";

import { createContext, useContext } from "react";
import type { Experience, Project } from "@/types/portfolio";

export type PortfolioCmsData = {
  projects: Project[];
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
