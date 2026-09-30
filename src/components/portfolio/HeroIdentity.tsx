"use client";

import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconDownload,
  IconMapPin,
} from "@tabler/icons-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const meta = [profile.location, profile.focus, profile.availability];

export function HeroIdentity() {
  return (
    <RevealGroup
      trigger="mount"
      delay={0.1}
      className="flex h-full flex-col justify-center py-2 lg:py-8"
    >
      <RevealItem as="p" className="eyebrow">
        Hello, I&apos;m
      </RevealItem>

      <RevealItem>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl xl:text-[3.5rem] xl:leading-[1.05]">
          {profile.name}
        </h1>
      </RevealItem>
      <RevealItem
        as="p"
        className="text-gradient-brand mt-2 w-fit text-2xl font-semibold tracking-tight md:text-3xl xl:text-[2.25rem]"
      >
        {profile.title}
      </RevealItem>

      <RevealItem
        as="p"
        className="mt-5 max-w-md text-sm leading-relaxed text-body md:text-[15px]"
      >
        {profile.intro}
      </RevealItem>

      <RevealItem className="mt-7 flex flex-wrap gap-3">
        <a href="#work" className={cn(buttonVariants({ size: "lg" }))}>
          View My Work
          <IconArrowUpRight />
        </a>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "bg-white/70 dark:bg-white/5",
          )}
        >
          Download CV
          <IconDownload />
        </a>
      </RevealItem>

      <RevealItem className="mt-9">
        <p className="text-xs text-body">Find me on</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="glass inline-flex size-9 items-center justify-center rounded-full text-body transition-colors hover:text-foreground"
          >
            <IconBrandGithub className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="glass inline-flex size-9 items-center justify-center rounded-full text-body transition-colors hover:text-foreground"
          >
            <IconBrandLinkedin className="size-4" />
          </a>
          {meta.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] text-body"
            >
              {item === profile.location ? (
                <IconMapPin className="size-3.5 text-brand" />
              ) : (
                <span className="size-1 rounded-full bg-subtle" aria-hidden />
              )}
              {item}
            </span>
          ))}
        </div>
      </RevealItem>
    </RevealGroup>
  );
}
