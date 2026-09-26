"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SkillBadge } from "@/components/portfolio/SkillBadge";
import { skillCategories } from "@/data/skills";

export function StackSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section
      id="stack"
      eyebrow="Toolkit"
      title="Technical Stack"
      description="Tools used to ship modern web products — from interface systems to cloud delivery."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: categoryIndex * 0.05, duration: 0.35 }}
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
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
