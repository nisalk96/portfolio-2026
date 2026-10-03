"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { usePortfolioCms } from "@/components/providers/PortfolioCmsProvider";
import { animation } from "@/constants/animation";
import {
  followUps,
  initialPrompts,
  promptToAnswerKind,
  resolvePromptFromInput,
  thinkingStatuses,
} from "@/data/prompts";
import { getAnswerIntro } from "@/lib/chat-responses";
import type {
  AnswerKind,
  ChatMessage,
  PromptChip,
  PromptId,
} from "@/types/portfolio";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function usePortfolioChat() {
  const { projects } = usePortfolioCms();
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      kind: "welcome",
      text: getAnswerIntro("welcome"),
    },
  ]);
  const [activeChips, setActiveChips] = useState<PromptChip[]>(initialPrompts);
  const [showInitialChips, setShowInitialChips] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState("Thinking...");
  const [status, setStatus] = useState<"ready" | "generating">("ready");
  const [input, setInput] = useState("");
  const timers = useRef<number[]>([]);
  const pendingChips = useRef<PromptChip[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timers.current.push(id);
    return id;
  }, []);

  const runAnswer = useCallback(
    (kind: AnswerKind, label: string) => {
      clearTimers();
      const statuses = thinkingStatuses[kind];
      const { thinkingStartMs, thinkingStepMs, thinkingJitterMs } =
        animation.chat;

      setShowInitialChips(false);
      setStatus("generating");
      setIsThinking(false);
      setActiveChips([]);

      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "user", kind: "text", text: label },
      ]);

      schedule(() => {
        setIsThinking(true);
        setThinkingLabel(statuses[0] ?? "Thinking...");
      }, thinkingStartMs);

      statuses.slice(1).forEach((labelText, index) => {
        schedule(
          () => setThinkingLabel(labelText),
          thinkingStartMs + (index + 1) * thinkingStepMs,
        );
      });

      const answerDelay =
        thinkingStartMs +
        Math.max(statuses.length, 1) * thinkingStepMs +
        Math.floor(Math.random() * thinkingJitterMs);

      schedule(() => {
        void projects.then((list) => {
          setIsThinking(false);
          pendingChips.current = followUps[kind] ?? initialPrompts.slice(0, 4);
          setMessages((prev) => [
            ...prev,
            {
              id: createId(),
              role: "assistant",
              kind,
              text: getAnswerIntro(kind, list),
              isTyping: true,
            },
          ]);
        });
      }, answerDelay);
    },
    [clearTimers, projects, schedule],
  );

  const finishTyping = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId && message.isTyping
          ? { ...message, isTyping: false }
          : message,
      ),
    );
    setActiveChips(pendingChips.current);
    setStatus("ready");
  }, []);

  const runPrompt = useCallback(
    (promptId: PromptId, label: string) => {
      runAnswer(promptToAnswerKind[promptId], label);
    },
    [runAnswer],
  );

  const askPrompt = useCallback(
    (chip: PromptChip) => {
      if (status === "generating") return;
      runPrompt(chip.id, chip.label);
    },
    [runPrompt, status],
  );

  const askFreeform = useCallback(() => {
    const value = input.trim();
    if (!value || status === "generating") return;

    const resolved = resolvePromptFromInput(value);
    setInput("");

    if (resolved) {
      runPrompt(resolved, value);
      return;
    }

    runAnswer("text", value);
  }, [input, runAnswer, runPrompt, status]);

  const askById = useCallback(
    (promptId: PromptId) => {
      const chip =
        initialPrompts.find((item) => item.id === promptId) ??
        Object.values(followUps)
          .flat()
          .find((item) => item.id === promptId);

      askPrompt({
        id: promptId,
        label: chip?.label ?? promptId,
        icon: chip?.icon ?? "sparkles",
        emphasize: chip?.emphasize,
      });
    },
    [askPrompt],
  );

  return useMemo(
    () => ({
      messages,
      activeChips,
      showInitialChips,
      isThinking,
      thinkingLabel,
      status,
      input,
      setInput,
      askPrompt,
      askFreeform,
      askById,
      finishTyping,
    }),
    [
      activeChips,
      askById,
      askFreeform,
      askPrompt,
      finishTyping,
      input,
      isThinking,
      messages,
      showInitialChips,
      status,
      thinkingLabel,
    ],
  );
}
