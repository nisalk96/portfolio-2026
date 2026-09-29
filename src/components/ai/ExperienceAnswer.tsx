"use client";

import { motion, useReducedMotion } from "framer-motion";
import { animation } from "@/constants/animation";
import { usePortfolioCms } from "@/components/providers/PortfolioCmsProvider";

export function ExperienceAnswer() {
  const reducedMotion = useReducedMotion();
  const { experience } = usePortfolioCms();

  return (
    <div className="relative mt-3 space-y-0 pl-3">
      <div className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />
      {experience.map((job, index) => (
        <motion.article
          key={job.id}
          initial={reducedMotion === false ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * animation.chat.richStagger,
            duration: animation.chat.richDuration,
            ease: animation.ease.out,
          }}
          className="relative pb-4 pl-5 last:pb-0"
        >
          <span className="absolute top-1.5 left-0 size-3.5 rounded-full border-2 border-background bg-sky-500 shadow-sm" />
          <div className="rounded-xl border border-border/70 bg-background/80 p-3.5 shadow-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  {job.role}
                </h4>
                <p className="text-xs text-muted-foreground">{job.company}</p>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                {job.period}
              </span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {job.achievements.slice(0, 2).map((item) => (
                <li
                  key={item}
                  className="text-[13px] leading-relaxed text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
            {job.tech.length > 0 ? (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {job.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border/70 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
