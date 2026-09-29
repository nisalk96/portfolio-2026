"use client";

import { m, useReducedMotion } from "framer-motion";
import { animation } from "@/constants/animation";
import { frontendSkills, skillCategories } from "@/data/skills";

interface SkillsAnswerProps {
  mode?: "all" | "frontend";
}

export function SkillsAnswer({ mode = "all" }: SkillsAnswerProps) {
  const reducedMotion = useReducedMotion();
  const categories =
    mode === "frontend"
      ? [
          {
            id: "frontend",
            name: "Frontend",
            skills: frontendSkills,
          },
        ]
      : skillCategories.filter((category) => category.id !== "tools");

  return (
    <div className="mt-3 space-y-3">
      {categories.map((category, categoryIndex) => (
        <m.div
          key={category.id}
          initial={reducedMotion === false ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: categoryIndex * animation.chat.richStagger,
            duration: animation.chat.richDuration,
            ease: animation.ease.out,
          }}
        >
          <h4 className="mb-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {category.name}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill, skillIndex) => (
              <m.span
                key={skill}
                initial={reducedMotion === false ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay:
                    categoryIndex * animation.chat.richStagger +
                    skillIndex * animation.stagger.tight,
                  duration: animation.normal,
                }}
                className="rounded-lg border border-border/70 bg-background px-2 py-1 text-[12px] text-foreground/85 shadow-sm"
              >
                {skill}
              </m.span>
            ))}
          </div>
        </m.div>
      ))}
    </div>
  );
}
