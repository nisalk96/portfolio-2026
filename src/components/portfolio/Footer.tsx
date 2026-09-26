import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border/70 py-8">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-mono text-sm font-semibold text-foreground">
            nisalk.dev
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Designed & built by {profile.shortName}.
          </p>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-1.5 transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconBrandGithub className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg p-1.5 transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconBrandLinkedin className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-lg p-1.5 transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconMail className="size-4" />
          </a>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-[1280px] px-4 font-mono text-[11px] text-muted-foreground md:px-6">
        Built with Next.js + TypeScript + Tailwind
      </p>
    </footer>
  );
}
