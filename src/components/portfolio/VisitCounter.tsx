"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { IconUsers } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const POLL_MS = 8_000;
const VISITOR_KEY = "nk_vid";

/** Guards React Strict Mode / multi-instance POSTs in the same tab. */
let hasPostedHomeThisLoad = false;

function getOrCreateVisitorId(): string {
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

async function fetchCount(
  method: "GET" | "POST",
  visitorId?: string,
): Promise<number | null> {
  try {
    const res = await fetch("/api/views", {
      method,
      headers: {
        Accept: "application/json",
        ...(method === "POST" ? { "Content-Type": "application/json" } : {}),
      },
      body: method === "POST" ? JSON.stringify({ visitorId }) : undefined,
      cache: "no-store",
    });
    if (!res.ok && res.status !== 202) return null;
    const data = (await res.json()) as { count?: unknown };
    return typeof data.count === "number" ? data.count : null;
  } catch {
    return null;
  }
}

type VisitCounterProps = {
  variant?: "subtle" | "highlight";
  className?: string;
};

export function VisitCounter({
  variant = "subtle",
  className,
}: VisitCounterProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [count, setCount] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const mounted = useRef(true);
  const reduceMotion = useReducedMotion();
  const highlighted = variant === "highlight";

  useEffect(() => {
    mounted.current = true;

    async function bootstrap() {
      let next: number | null = null;
      if (isHome && !hasPostedHomeThisLoad) {
        hasPostedHomeThisLoad = true;
        next = await fetchCount("POST", getOrCreateVisitorId());
      } else {
        next = await fetchCount("GET");
      }
      if (!mounted.current) return;
      setCount(next);
      setReady(true);
    }

    void bootstrap();

    const id = window.setInterval(() => {
      void fetchCount("GET").then((next) => {
        if (mounted.current && next !== null) setCount(next);
      });
    }, POLL_MS);

    return () => {
      mounted.current = false;
      window.clearInterval(id);
    };
  }, [isHome]);

  if (!ready || count === null) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 tabular-nums text-body/70",
          highlighted && "text-xs font-semibold text-brand",
          className,
        )}
        aria-hidden="true"
      >
        <IconUsers className={cn("size-3.5", highlighted && "size-4")} stroke={1.75} />
        <span>—</span>
        {highlighted ? <span>unique visitors</span> : null}
      </span>
    );
  }

  const label = `${count.toLocaleString()} unique visitors`;
  const display = count.toLocaleString();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 tabular-nums",
        highlighted && "text-sm font-semibold tracking-tight",
        className,
      )}
      aria-live="polite"
      aria-label={label}
      title={label}
    >
      {highlighted ? (
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand/50" />
          <span className="relative size-2 rounded-full bg-brand" />
        </span>
      ) : null}
      <IconUsers
        className={cn("size-3.5 text-brand", highlighted && "size-4")}
        stroke={1.75}
        aria-hidden="true"
      />
      <span
        className={cn(
          "relative inline-flex h-[1.1em] min-w-[1ch] items-center overflow-hidden font-medium text-foreground/80",
          highlighted && "font-bold text-brand",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={display}
            initial={reduceMotion ? false : { y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -8, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="inline-block"
          >
            {display}
          </m.span>
        </AnimatePresence>
      </span>
      <span className={cn(highlighted ? "text-brand/80" : "text-body")}>
        {highlighted ? "unique visitors" : "visitors"}
      </span>
    </span>
  );
}
