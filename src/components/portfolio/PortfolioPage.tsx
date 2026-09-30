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

        <main className="mx-auto w-full max-w-[1180px] px-5 pb-10 md:px-8">
          <section
            id="home"
            className="glass-panel mt-8 grid min-h-[620px] scroll-mt-24 items-center gap-12 py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16"
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
