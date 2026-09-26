"use client";

import {
  IconBrandLinkedin,
  IconFileText,
  IconMail,
} from "@tabler/icons-react";
import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/data/profile";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Want to work together?"
      description="Reach out for product engineering roles, freelance collaborations or technical conversations."
    >
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-5">
          <p className="text-sm text-muted-foreground">
            Prefer a direct channel? These usually get the fastest reply.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 px-3 py-2.5 text-sm transition-colors hover:bg-muted"
            >
              <IconMail className="size-4 text-sky-600 dark:text-sky-400" />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 px-3 py-2.5 text-sm transition-colors hover:bg-muted"
            >
              <IconBrandLinkedin className="size-4 text-sky-600 dark:text-sky-400" />
              LinkedIn
            </a>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 px-3 py-2.5 text-sm transition-colors hover:bg-muted"
            >
              <IconFileText className="size-4 text-sky-600 dark:text-sky-400" />
              Download Resume
            </a>
          </div>
        </div>

        <form
          className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-5"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const name = String(form.get("name") ?? "").trim();
            const email = String(form.get("email") ?? "").trim();
            const message = String(form.get("message") ?? "").trim();

            if (!name || !email || !message) {
              setError("Please complete all fields.");
              setSubmitted(false);
              return;
            }

            setError(null);
            setSubmitted(true);
            event.currentTarget.reset();
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm">
              <span className="text-muted-foreground">Name</span>
              <Input name="name" placeholder="Your name" autoComplete="name" />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="text-muted-foreground">Email</span>
              <Input
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </label>
          </div>
          <label className="block space-y-1.5 text-sm">
            <span className="text-muted-foreground">Message</span>
            <Textarea
              name="message"
              placeholder="Tell me about the role or project..."
              className="min-h-28"
            />
          </label>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          {submitted ? (
            <p className="text-sm text-emerald-700 dark:text-emerald-300" role="status">
              Thanks — message captured locally. Email {profile.email} for a direct reply.
            </p>
          ) : null}
          <Button type="submit">Send message</Button>
        </form>
      </div>
    </Section>
  );
}
