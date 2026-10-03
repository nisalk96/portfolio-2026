"use client";

import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { PageBackground } from "@/components/layout/PageBackground";
import { Footer } from "@/components/portfolio/Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <PageBackground />

      <Header />
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-10 md:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
