"use client";

import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { SkillBadge } from "@/components/portfolio/SkillBadge";
import { skillCategories } from "@/data/skills";

export function StackSection() {
  return (
    <Section
      id="stack"
      eyebrow="Toolkit"
      title="Technical Stack"
      description="Tools used to ship modern web products — from interface systems to cloud delivery."
    >
      <RevealGroup className="grid gap-4 md:grid-cols-2" amount={0.1}>
        {skillCategories.map((category) => (
          <RevealItem
            key={category.id}
            className="rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5"
          >
            <h3 className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <SkillBadge key={skill} label={skill} />
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
