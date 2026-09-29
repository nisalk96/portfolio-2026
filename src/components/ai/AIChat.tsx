"use client";

import { IconArrowUp, IconSparkles } from "@tabler/icons-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ai/ChatMessage";
import { ChatThinking } from "@/components/ai/ChatThinking";
import { PromptChip } from "@/components/ai/PromptChip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { animation } from "@/constants/animation";
import type { usePortfolioChat } from "@/hooks/usePortfolioChat";
import { cn } from "@/lib/utils";

type ChatApi = ReturnType<typeof usePortfolioChat>;

interface AIChatProps {
  chat: ChatApi;
}

export function AIChat({ chat }: AIChatProps) {
  const reducedMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);
  const {
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
    finishTyping,
  } = chat;

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    stickToBottom.current = true;
    node.scrollTo({
      top: node.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [messages.length, isThinking, activeChips, reducedMotion]);

  useEffect(() => {
    const node = scrollerRef.current;
    const content = contentRef.current;
    if (!node || !content) return;
    const observer = new ResizeObserver(() => {
      if (stickToBottom.current) node.scrollTop = node.scrollHeight;
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="assistant"
      className="flex h-[var(--chat-height)] min-h-[var(--chat-min-height)] flex-col overflow-hidden rounded-2xl border border-border/80 bg-white/80 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:bg-card/70"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border/70 px-4 py-3 md:px-5">
        <div className="flex items-center gap-3">
          <div className="relative flex size-9 items-center justify-center rounded-xl border border-border/70 bg-muted/40 text-sky-600 dark:text-sky-400">
            <IconSparkles className="size-4" />
            <m.span
              className="absolute inset-0 rounded-xl bg-sky-400/10"
              animate={
                reducedMotion || status !== "generating"
                  ? undefined
                  : { opacity: [0.15, 0.45, 0.15] }
              }
              transition={{ duration: animation.ambient, repeat: Infinity }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                Nisal AI
              </h2>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 font-mono text-[10px]",
                  status === "generating"
                    ? "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                    : "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    status === "generating" ? "bg-amber-500" : "bg-emerald-500",
                  )}
                />
                {status === "generating" ? "Generating" : "Online"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Portfolio Assistant · Ask about work, experience or stack
            </p>
          </div>
        </div>
        <p className="hidden font-mono text-[10px] text-muted-foreground sm:block">
          Portfolio knowledge · Updated 2026
        </p>
      </header>

      <div
        ref={scrollerRef}
        data-lenis-prevent
        onScroll={(event) => {
          const node = event.currentTarget;
          stickToBottom.current =
            node.scrollHeight - node.scrollTop - node.clientHeight < 80;
        }}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-5"
      >
        <div ref={contentRef} className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              generating={Boolean(message.isTyping)}
              onTypingDone={finishTyping}
            />
          ))}

          <AnimatePresence>
            {isThinking ? (
              <ChatThinking key="thinking" label={thinkingLabel} />
            ) : null}
          </AnimatePresence>

          {(showInitialChips || activeChips.length > 0) && !isThinking ? (
            <div
              key={showInitialChips ? "initial-chips" : "follow-up-chips"}
              className="flex flex-wrap gap-2 pt-1"
            >
              {activeChips.map((chip, index) => (
                <PromptChip
                  key={`${chip.id}-${chip.label}`}
                  chip={chip}
                  index={index}
                  disabled={status === "generating"}
                  onSelect={askPrompt}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <form
        className="shrink-0 border-t border-border/70 p-3 md:p-4"
        onSubmit={(event) => {
          event.preventDefault();
          askFreeform();
        }}
      >
        <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-muted/30 p-1.5 pl-3">
          <Input
            value={input}
            onValueChange={setInput}
            placeholder="Ask about Nisal..."
            className="h-8 border-0 bg-transparent shadow-none focus-visible:ring-0"
            aria-label="Ask about Nisal"
          />
          <Button
            type="submit"
            size="icon-sm"
            disabled={!input.trim() || status === "generating"}
            aria-label="Send message"
          >
            <IconArrowUp className="size-4" />
          </Button>
        </div>
        <p className="mt-2 px-1 font-mono text-[10px] text-muted-foreground">
          Ask about projects, experience, stack, or how to get in touch.
        </p>
      </form>
    </section>
  );
}
