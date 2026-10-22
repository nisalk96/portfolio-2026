"use client";

import { AIChat } from "@/components/ai/AIChat";
import { VisitCounter } from "@/components/portfolio/VisitCounter";
import type { usePortfolioChat } from "@/hooks/usePortfolioChat";

interface HeroAssistantProps {
  chat: ReturnType<typeof usePortfolioChat>;
}

export function HeroAssistant({ chat }: HeroAssistantProps) {
  return (
    <div className="relative pt-7 lg:py-8">
      <div className="absolute top-0 right-0 z-10 lg:top-5 lg:right-3">
        <VisitCounter variant="highlight" />
      </div>
      <AIChat chat={chat} />
    </div>
  );
}
