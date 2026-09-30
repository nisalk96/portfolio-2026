"use client";

import { IconSparkles } from "@tabler/icons-react";
import { m, useReducedMotion } from "framer-motion";
import { useCallback } from "react";
import { ContactAnswer } from "@/components/ai/ContactAnswer";
import { ExperienceAnswer } from "@/components/ai/ExperienceAnswer";
import { ProjectAnswer } from "@/components/ai/ProjectAnswer";
import { SkillsAnswer } from "@/components/ai/SkillsAnswer";
import { TypewriterText } from "@/components/ai/TypewriterText";
import type { ChatMessage as ChatMessageType } from "@/types/portfolio";
import { motionTransitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
  generating?: boolean;
  onTypingDone?: (messageId: string) => void;
}

export function ChatMessage({
  message,
  generating,
  onTypingDone,
}: ChatMessageProps) {
  const reducedMotion = useReducedMotion();
  const isUser = message.role === "user";
  const handleTypingDone = useCallback(
    () => onTypingDone?.(message.id),
    [message.id, onTypingDone],
  );

  return (
    <m.div
      initial={message.id === "welcome" ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionTransitions.spring}
      className={cn("flex gap-2.5", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser ? (
        <div
          className={cn(
            "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full glass text-brand",
            generating && "shadow-[0_0_0_3px_rgb(126_118_229/0.18)]",
          )}
        >
          <m.span
            className="flex"
            animate={
              reducedMotion || !message.isTyping
                ? { scale: 1, opacity: 1 }
                : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }
            }
            transition={
              message.isTyping
                ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            <IconSparkles className="size-3.5" />
          </m.span>
        </div>
      ) : null}

      <div
        className={cn(
          "max-w-[90%] md:max-w-[85%]",
          isUser
            ? "rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground shadow-sm"
            : "min-w-0 flex-1",
        )}
      >
        {isUser ? (
          message.text
        ) : (
          <div>
            <TypewriterText
              text={message.text}
              active={Boolean(message.isTyping)}
              onDone={handleTypingDone}
            />
            {renderRichAnswer(message)}
          </div>
        )}
      </div>
    </m.div>
  );
}

function renderRichAnswer(message: ChatMessageType) {
  if (message.isTyping) return null;

  switch (message.kind) {
    case "projects":
      return <ProjectAnswer mode="featured" />;
    case "recent":
      return <ProjectAnswer mode="recent" />;
    case "cardchat":
      return <ProjectAnswer mode="cardchat" />;
    case "experience":
      return <ExperienceAnswer />;
    case "stack":
      return <SkillsAnswer mode="all" />;
    case "frontend":
      return <SkillsAnswer mode="frontend" />;
    case "contact":
    case "resume":
      return <ContactAnswer />;
    default:
      return null;
  }
}
