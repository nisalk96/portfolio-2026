"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { transitionTypes } from "@/components/motion/PageTransition";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

let hasPlayedEntrance = false;

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const [playEntrance] = useState(() => !hasPlayedEntrance);

  useEffect(() => {
    hasPlayedEntrance = true;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 px-3 pt-3 md:px-4",
        playEntrance && "reveal-down-css",
      )}
      style={{ viewTransitionName: "site-header" }}
    >
      <ScrollProgress />
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] items-center justify-between gap-3 rounded-2xl border px-3 py-2 transition-all duration-300 md:px-4",
          scrolled
            ? "border-border/80 bg-background/75 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-background/40 backdrop-blur-md",
        )}
      >
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          nisalk.dev
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) =>
            item.href.includes("#") ? (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                transitionTypes={transitionTypes.forward}
                className="rounded-lg px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-0.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconBrandGithub className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconBrandLinkedin className="size-4" />
          </a>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconX className="size-4" /> : <IconMenu2 className="size-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.nav
            initial={reducedMotion === false ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 flex max-w-[1280px] flex-col gap-1 rounded-2xl border border-border/80 bg-background/95 p-2 shadow-sm backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) =>
              item.href.includes("#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  transitionTypes={transitionTypes.forward}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  {item.label}
                </Link>
              ),
            )}
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
