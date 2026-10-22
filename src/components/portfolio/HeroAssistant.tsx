"use client";

import { AIChat } from "@/components/ai/AIChat";
import { VisitCounter } from "@/components/portfolio/VisitCounter";
import type { usePortfolioChat } from "@/hooks/usePortfolioChat";

interface HeroAssistantProps {
  chat: ReturnType<typeof usePortfolioChat>;
}

export function HeroAssistant({ chat }: HeroAssistantProps) {
  return (
    <div className="lg:py-8">
      <div className="mb-2.5 flex justify-end pr-1">
        <VisitCounter variant="highlight" />
      </div>
      <AIChat chat={chat} />
    </div>
  );
}
