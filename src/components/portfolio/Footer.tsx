import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { profile } from "@/data/profile";

function VercelMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 76 65"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1180px] px-5 pb-8 md:px-8">
      <div className="flex flex-col gap-6 border-t border-border bg-[#fff8f2] px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {profile.shortName.charAt(0)}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">
              {profile.name}
            </p>
            <p className="text-[11px] text-body">
              Designed & built by {profile.shortName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-body">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="glass inline-flex size-9 items-center justify-center rounded-full transition-colors hover:text-foreground"
          >
            <IconBrandGithub className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="glass inline-flex size-9 items-center justify-center rounded-full transition-colors hover:text-foreground"
          >
            <IconBrandLinkedin className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="glass inline-flex size-9 items-center justify-center rounded-full transition-colors hover:text-foreground"
          >
            <IconMail className="size-4" />
          </a>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2 px-5 text-[11px] text-body md:flex-row md:items-center md:justify-between">
        <p>Built with Next.js + TypeScript + Tailwind</p>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <span>Hosted on</span>
          <VercelMark className="size-3" />
          <span className="font-semibold tracking-tight text-foreground/80">
            Vercel
          </span>
          <span className="text-body/80">hosting partner</span>
        </a>
      </div>
    </footer>
  );
}
