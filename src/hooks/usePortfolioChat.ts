"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { usePortfolioCms } from "@/components/providers/PortfolioCmsProvider";
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
  const welcomeMessage = useMemo<ChatMessage>(
    () => ({
      id: "welcome",
      role: "assistant",
      kind: "welcome",
      text: getAnswerIntro("welcome", projects),
    }),
    [projects],
  );
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [activeChips, setActiveChips] = useState<PromptChip[]>(initialPrompts);
  const [showInitialChips, setShowInitialChips] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState("Thinking...");
  const [status, setStatus] = useState<"ready" | "generating">("ready");
  const [input, setInput] = useState("");
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timers.current.push(id);
    return id;
  }, []);

  const runPrompt = useCallback(
    (promptId: PromptId, label: string) => {
      clearTimers();
      const kind = promptToAnswerKind[promptId];
      const statuses = thinkingStatuses[kind];

      setShowInitialChips(false);
      setStatus("generating");
      setIsThinking(false);
      setActiveChips([]);

      const userMessage: ChatMessage = {
        id: createId(),
        role: "user",
        kind: "text",
        text: label,
      };

      setMessages((prev) => [...prev, userMessage]);

      schedule(() => {
        setIsThinking(true);
        setThinkingLabel(statuses[0] ?? "Thinking...");
      }, 300);

      statuses.slice(1).forEach((labelText, index) => {
        schedule(() => setThinkingLabel(labelText), 300 + (index + 1) * 450);
      });

      const answerDelay = 900 + Math.floor(Math.random() * 500);

      schedule(() => {
        setIsThinking(false);
        const assistantMessage: ChatMessage = {
          id: createId(),
          role: "assistant",
          kind,
          text: getAnswerIntro(kind, projects),
          isTyping: true,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setActiveChips(followUps[kind] ?? initialPrompts.slice(0, 4));
        setStatus("ready");

        schedule(() => {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessage.id
                ? { ...message, isTyping: false }
                : message,
            ),
          );
        }, 700);
      }, answerDelay);
    },
    [clearTimers, projects, schedule],
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

    clearTimers();
    setShowInitialChips(false);
    setStatus("generating");
    setActiveChips([]);

    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: "user",
        kind: "text",
        text: value,
      },
    ]);

    schedule(() => {
      setIsThinking(true);
      setThinkingLabel("Preparing response...");
    }, 300);

    schedule(() => {
      setIsThinking(false);
      const kind: AnswerKind = "text";
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          kind,
          text: getAnswerIntro(kind, projects),
          isTyping: true,
        },
      ]);
      setActiveChips(followUps.text);
      setStatus("ready");
    }, 1000);
  }, [clearTimers, input, projects, runPrompt, schedule, status]);

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
    }),
    [
      activeChips,
      askById,
      askFreeform,
      askPrompt,
      input,
      isThinking,
      messages,
      showInitialChips,
      status,
      thinkingLabel,
    ],
  );
}
