"use client";

import { AIChat } from "@/components/ai/AIChat";
import type { usePortfolioChat } from "@/hooks/usePortfolioChat";

interface HeroAssistantProps {
  chat: ReturnType<typeof usePortfolioChat>;
}

export function HeroAssistant({ chat }: HeroAssistantProps) {
  return (
    <div className="lg:py-8">
      <AIChat chat={chat} />
    </div>
  );
}
