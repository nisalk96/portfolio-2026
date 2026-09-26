"use client";

import { usePortfolioChat } from "@/hooks/usePortfolioChat";
import { AIChat } from "@/components/ai/AIChat";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { Footer } from "@/components/portfolio/Footer";
import { HeroIdentity } from "@/components/portfolio/HeroIdentity";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { StackSection } from "@/components/portfolio/StackSection";

export function PortfolioPage() {
  const chat = usePortfolioChat();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_42%),linear-gradient(180deg,#f5f7fa_0%,#eef2f6_48%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_40%),linear-gradient(180deg,#0b1220_0%,#111827_55%,#0f172a_100%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-20" />
      </div>

      <Header />

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-10 md:px-6">
        <section className="grid items-start gap-6 py-8 md:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-8">
          <HeroIdentity />
          <AIChat chat={chat} />
        </section>

        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <StackSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
