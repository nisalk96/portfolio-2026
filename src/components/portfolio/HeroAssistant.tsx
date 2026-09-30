"use client";

import { IconSparkles } from "@tabler/icons-react";
import { AIChat } from "@/components/ai/AIChat";
import { usePortfolioCms } from "@/components/providers/PortfolioCmsProvider";
import { yearsOfExperience } from "@/data/highlights";
import type { usePortfolioChat } from "@/hooks/usePortfolioChat";

interface HeroAssistantProps {
  chat: ReturnType<typeof usePortfolioChat>;
}

export function HeroAssistant({ chat }: HeroAssistantProps) {
  const { projects } = usePortfolioCms();

  return (
    <div className="relative lg:pt-8 lg:pr-12 lg:pb-[4.5rem] lg:pl-8">
      <div
        aria-hidden
        className="absolute inset-6 -z-10 hidden rounded-[2.5rem] bg-gradient-brand opacity-20 blur-3xl lg:block"
      />

      <AIChat chat={chat} />

      <div className="glass-strong animate-float-soft pointer-events-none absolute top-0 right-0 hidden w-28 rounded-2xl p-3 text-center lg:block">
        <p className="text-gradient-brand text-3xl font-semibold tracking-tight">
          {yearsOfExperience}
        </p>
        <p className="mt-0.5 text-[11px] leading-tight text-body">
          Years of
          <br />
          <span className="font-medium text-foreground">Experience</span>
        </p>
      </div>

      <div
        aria-hidden
        className="glass-strong animate-float-soft absolute top-1/3 left-0 hidden size-14 items-center justify-center rounded-full text-brand [animation-delay:-2s] lg:flex"
      >
        <span className="absolute inset-2 rounded-full bg-gradient-brand opacity-20" />
        <IconSparkles className="relative size-6" />
      </div>

      <div className="glass-strong animate-float-soft pointer-events-none absolute right-24 bottom-0 hidden w-44 rounded-2xl p-3 [animation-delay:-4s] lg:block">
        <p className="text-[11px] text-body">Projects shipped</p>
        <p className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">
          {projects.length}+
        </p>
        <svg
          viewBox="0 0 120 32"
          className="mt-1 h-7 w-full"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="hero-spark" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--gradient-from)" />
              <stop offset="100%" stopColor="var(--gradient-to)" />
            </linearGradient>
          </defs>
          <path
            d="M2 26 C 18 24, 24 18, 36 20 S 56 12, 68 14 S 90 6, 102 8 S 114 4, 118 3"
            stroke="url(#hero-spark)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
