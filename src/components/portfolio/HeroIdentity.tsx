"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileText,
  IconMapPin,
} from "@tabler/icons-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const meta = [
  profile.location,
  profile.experienceYears,
  profile.focus,
  profile.availability,
];

export function HeroIdentity() {
  return (
    <RevealGroup
      trigger="mount"
      delay={0.1}
      className="flex h-full flex-col justify-center"
    >
      <RevealItem className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-emerald-700 uppercase dark:text-emerald-300">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
          <span className="relative size-1.5 rounded-full bg-emerald-500" />
        </span>
        Available for opportunities
      </RevealItem>

      <RevealItem>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Hi, I&apos;m {profile.shortName}.
        </h1>
      </RevealItem>
      <RevealItem as="p" className="mt-1 text-lg text-muted-foreground md:text-xl">
        {profile.title}
      </RevealItem>

      <RevealItem
        as="p"
        className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-[15px]"
      >
        {profile.intro}
      </RevealItem>

      <RevealItem className="mt-5 flex flex-wrap gap-2">
        {meta.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/80 px-2.5 py-1 text-[12px] text-muted-foreground"
          >
            {item === profile.location ? (
              <IconMapPin className="size-3.5" />
            ) : null}
            {item}
          </span>
        ))}
      </RevealItem>

      <RevealItem className="mt-6 flex flex-wrap gap-2">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants())}
        >
          <IconFileText className="size-4" />
          View Resume
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <IconBrandGithub className="size-4" />
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <IconBrandLinkedin className="size-4" />
          LinkedIn
        </a>
      </RevealItem>
    </RevealGroup>
  );
}
