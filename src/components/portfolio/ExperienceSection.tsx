"use client";

import { ExperienceItem } from "@/components/portfolio/ExperienceItem";
import { Section } from "@/components/layout/Section";
import { usePortfolioCms } from "@/components/providers/PortfolioCmsProvider";

export function ExperienceSection() {
  const { experience } = usePortfolioCms();

  return (
    <Section
      id="experience"
      eyebrow="Career"
      title="Experience"
      description="A compact look at roles focused on product engineering, frontend ownership and full-stack delivery."
    >
      <div className="rounded-2xl border border-border/70 bg-background/70 px-4 md:px-6">
        {experience.map((item, index) => (
          <ExperienceItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
