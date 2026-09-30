"use client";

import {
  IconBulb,
  IconCode,
  IconPencil,
  IconRocket,
  IconTrendingUp,
  type Icon,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const steps: { title: string; description: string; icon: Icon }[] = [
  { title: "Discover", description: "Clarify the problem, users, and constraints.", icon: IconBulb },
  { title: "Design", description: "Shape the flow and test the simplest solution.", icon: IconPencil },
  { title: "Develop", description: "Build accessible, typed, maintainable features.", icon: IconCode },
  { title: "Release", description: "Ship safely with checks and clear release steps.", icon: IconRocket },
  { title: "Improve", description: "Learn from use and refine what matters.", icon: IconTrendingUp },
];

export function WorkProcessSection() {
  return (
    <Section id="process" title="How I work" description="A focused path from a real problem to a reliable product.">
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" amount={0.2}>
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <RevealItem key={step.title} className="relative rounded-xl border border-border bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full bg-[#fff2e8] text-brand">
                  <StepIcon className="size-5" stroke={1.8} />
                </span>
                <span className="font-mono text-xs font-semibold text-brand">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{step.description}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
