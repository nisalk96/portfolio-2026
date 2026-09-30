"use client";

import { usePortfolioChat } from "@/hooks/usePortfolioChat";
import { Header } from "@/components/layout/Header";
import { PageBackground } from "@/components/layout/PageBackground";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { Footer } from "@/components/portfolio/Footer";
import { HeroAssistant } from "@/components/portfolio/HeroAssistant";
import { HeroIdentity } from "@/components/portfolio/HeroIdentity";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { StackSection } from "@/components/portfolio/StackSection";

export function PortfolioPage() {
  const chat = usePortfolioChat();

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-x-clip">
        <PageBackground />

        <Header />

        <main className="mx-auto w-full max-w-[1280px] px-3 pb-6 md:px-4">
          <section
            id="home"
            className="glass-panel mt-5 grid scroll-mt-24 items-center gap-8 p-5 md:mt-6 md:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-6 lg:p-10"
          >
            <HeroIdentity />
            <Reveal trigger="mount" delay={0.15}>
              <HeroAssistant chat={chat} />
            </Reveal>
          </section>

          <AboutSection />
          <ServicesSection />
          <StackSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
