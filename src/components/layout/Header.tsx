"use client";

import { IconArrowUpRight, IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

let hasPlayedEntrance = false;

const navItems = [
  { id: "home", href: "/#home", label: "Home" },
  { id: "about", href: "/#about", label: "About" },
  { id: "services", href: "/#services", label: "Services" },
  { id: "work", href: "/#work", label: "Work" },
  { id: "experience", href: "/#experience", label: "Experience" },
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
        "sticky top-0 z-50 px-3 pt-3 md:px-4",
        playEntrance && "reveal-down-css",
      )}
      style={{ viewTransitionName: "site-header" }}
    >
      <ScrollProgress />
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] items-center justify-between gap-3 rounded-full py-2 pr-2 pl-2.5 transition-shadow duration-300",
          scrolled ? "glass-strong" : "glass",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full pr-2 transition-opacity hover:opacity-85"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {profile.shortName.charAt(0)}
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
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
                  "rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                  isActive
                    ? "bg-white text-foreground shadow-[0_2px_10px_-4px_rgb(12_13_33/0.2)] dark:bg-white/10"
                    : "text-body hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden bg-white/70 sm:inline-flex dark:bg-white/5",
            )}
          >
            Let&apos;s Talk
            <IconArrowUpRight />
          </Link>
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconX className="size-4" /> : <IconMenu2 className="size-4" />}
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
