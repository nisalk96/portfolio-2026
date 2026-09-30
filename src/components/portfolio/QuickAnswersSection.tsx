"use client";

import { IconArrowUpRight, IconClock, IconMapPin, IconWorld } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { profile } from "@/data/profile";

const answers = [
  { question: "Where are you based?", answer: profile.location, icon: IconMapPin },
  { question: "What work fits best?", answer: "Frontend and full-stack product engineering.", icon: IconWorld },
  { question: "Are you available?", answer: profile.availability, icon: IconClock },
];

export function QuickAnswersSection() {
  return (
    <Section
      id="quick-answers"
      title="Quick answers"
      description="The essentials before we start a conversation."
      action={
        <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4">
          Start a conversation <IconArrowUpRight className="size-4" />
        </a>
      }
    >
      <RevealGroup className="grid gap-4 md:grid-cols-3" amount={0.25}>
        {answers.map((item) => {
          const AnswerIcon = item.icon;
          return (
            <RevealItem key={item.question} className="rounded-xl border border-border bg-white p-5">
              <AnswerIcon className="size-5 text-brand" stroke={1.8} />
              <h3 className="mt-4 font-semibold text-foreground">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.answer}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
