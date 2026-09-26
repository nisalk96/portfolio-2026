"use client";

import { motion, useReducedMotion } from "framer-motion";
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
        <motion.div
          key={category.id}
          initial={reducedMotion === false ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.08, duration: 0.3 }}
        >
          <h4 className="mb-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {category.name}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill, skillIndex) => (
              <motion.span
                key={skill}
                initial={reducedMotion === false ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: categoryIndex * 0.08 + skillIndex * 0.03,
                  duration: 0.25,
                }}
                className="rounded-lg border border-border/70 bg-background px-2 py-1 text-[12px] text-foreground/85 shadow-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
