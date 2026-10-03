"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

let hasPlayedEntrance = false;

const navItems = [
  { id: "home", href: "/#home", label: "Home" },
  { id: "about", href: "/#about", label: "About" },
  { id: "services", href: "/#services", label: "Services" },
  { id: "work", href: "/#work", label: "Work" },
  { id: "experience", href: "/#experience", label: "Experience" },
  { id: "process", href: "/#process", label: "Process" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!enabled) return;

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const [playEntrance] = useState(() => !hasPlayedEntrance);
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");

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
        "sticky top-0 z-50 border-b border-transparent bg-background/95 px-5 md:px-8",
        playEntrance && "reveal-down-css",
      )}
    >
      <ScrollProgress />
      <div
        className={cn(
          "mx-auto flex h-20 max-w-[1180px] items-center justify-between gap-3 transition-shadow duration-300",
          scrolled ? "" : "",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full pr-2 transition-opacity hover:opacity-85"
        >
          <span className="text-2xl font-black tracking-[-0.08em] text-foreground">
            NK<span className="text-brand">.</span>
          </span>
          <span className="hidden flex-col leading-tight xl:flex">
            <span className="text-sm font-semibold text-foreground">
              {profile.name}
            </span>
            <span className="text-[11px] text-body">{profile.title}</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 rounded-full p-1 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative px-3.5 py-2 text-[13px] font-medium transition-colors after:absolute after:right-3.5 after:bottom-0 after:left-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform",
                  isActive
                    ? "text-brand after:scale-x-100"
                    : "text-foreground hover:text-brand",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <IconX className="size-4" />
            ) : (
              <IconMenu2 className="size-4" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.nav
            aria-label="Mobile"
            initial={reducedMotion === false ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-strong mx-auto mt-2 flex max-w-[1280px] flex-col gap-1 rounded-3xl p-2 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm transition-colors",
                  active === item.id
                    ? "bg-white text-foreground dark:bg-white/10"
                    : "text-foreground hover:bg-white/60 dark:hover:bg-white/5",
                )}
              >
                {item.label}
              </a>
            ))}
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
