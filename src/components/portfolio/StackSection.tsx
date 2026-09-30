"use client";

import {
  IconBrandAws,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandGraphql,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconDatabase,
  type Icon,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  featuredSkills,
  skillCategories,
  type FeaturedSkillIcon,
} from "@/data/skills";

const skillIcons: Record<FeaturedSkillIcon, { icon: Icon; color: string }> = {
  nextjs: { icon: IconBrandNextjs, color: "text-foreground" },
  react: { icon: IconBrandReact, color: "text-[#149ECA]" },
  typescript: { icon: IconBrandTypescript, color: "text-[#3178C6]" },
  tailwind: { icon: IconBrandTailwind, color: "text-[#0EA5E9]" },
  nodejs: { icon: IconBrandNodejs, color: "text-[#5FA04E]" },
  graphql: { icon: IconBrandGraphql, color: "text-[#E10098]" },
  aws: { icon: IconBrandAws, color: "text-[#FF9900]" },
  docker: { icon: IconBrandDocker, color: "text-[#1D63ED]" },
  postgres: { icon: IconDatabase, color: "text-[#336791] dark:text-[#7FA7D1]" },
  figma: { icon: IconBrandFigma, color: "text-[#A259FF]" },
};

export function StackSection() {
  const featuredNames = new Set(featuredSkills.map((skill) => skill.name));
  const otherSkills = skillCategories
    .flatMap((category) => category.skills)
    .filter((skill) => !featuredNames.has(skill));

  return (
    <Section id="stack" eyebrow="Tools & skills" title="Technologies I Use">
      <RevealGroup
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-5 lg:grid-cols-10 lg:gap-3"
        amount={0.2}
      >
        {featuredSkills.map((skill) => {
          const { icon: SkillIcon, color } = skillIcons[skill.icon];
          return (
            <RevealItem
              key={skill.name}
              className="glass flex items-center gap-2.5 rounded-2xl px-3 py-2.5 transition-transform duration-300 hover:-translate-y-0.5 sm:flex-col sm:gap-2 sm:px-2 sm:py-3.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-[0_2px_8px_-3px_rgb(12_13_33/0.15)] dark:bg-white/10">
                <SkillIcon className={`size-5 ${color}`} stroke={1.75} />
              </span>
              <span className="text-[12px] leading-tight text-body sm:text-center sm:text-[11px]">
                {skill.name}
              </span>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {otherSkills.length > 0 ? (
        <p className="mt-5 text-[13px] leading-relaxed text-body">
          <span className="font-medium text-foreground">Also working with: </span>
          {otherSkills.join(" · ")}
        </p>
      ) : null}
    </Section>
  );
}
