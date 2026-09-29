"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileText,
  IconMail,
} from "@tabler/icons-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cloudflare } from "@/constants/cloudflare";
import { contact } from "@/constants/contact";
import { profile } from "@/data/profile";
import {
  submitContactForm,
  type ContactFormState,
} from "@/server/contact-action";

const initialState: ContactFormState = { message: "" };

const channelIcons = {
  email: IconMail,
  linkedin: IconBrandLinkedin,
  github: IconBrandGithub,
  resume: IconFileText,
} as const;

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [widgetAttempt, setWidgetAttempt] = useState(0);
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

  const failVerification = (message: string) => {
    setTurnstileToken("");
    setVerificationError(message);
  };

  useEffect(() => {
    if (state.message) {
      setTurnstileToken("");
      turnstileRef.current?.reset();
    }
  }, [state]);

  return (
    <Section
      id="contact"
      eyebrow={contact.form.eyebrow}
      title={contact.form.title}
      description={contact.form.description}
    >
      <RevealGroup className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]" amount={0.1}>
        <RevealItem className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-5">
          <p className="text-sm text-muted-foreground">
            Prefer a direct channel? These usually get the fastest reply.
          </p>
          <div className="flex flex-col gap-2">
            {contact.channels.map((channel) => {
              const Icon =
                channelIcons[channel.id as keyof typeof channelIcons] ??
                IconMail;
              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/70 px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                >
                  <Icon className="size-4 text-sky-600 dark:text-sky-400" />
                  {channel.id === "email" ? profile.email : channel.label}
                </a>
              );
            })}
          </div>
        </RevealItem>

        <RevealItem>
          <form
            className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-5"
            action={formAction}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5 text-sm" htmlFor="contact-name">
                <span className="text-muted-foreground">Name</span>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(state.errors?.name)}
                />
                {state.errors?.name ? (
                  <p className="text-sm text-destructive">
                    {state.errors.name.join(", ")}
                  </p>
                ) : null}
              </label>
              <label className="space-y-1.5 text-sm" htmlFor="contact-email">
                <span className="text-muted-foreground">Email</span>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(state.errors?.email)}
                />
                {state.errors?.email ? (
                  <p className="text-sm text-destructive">
                    {state.errors.email.join(", ")}
                  </p>
                ) : null}
              </label>
            </div>

            <label
              className="block space-y-1.5 text-sm"
              htmlFor="contact-subject"
            >
              <span className="text-muted-foreground">Subject</span>
              <Input
                id="contact-subject"
                name="subject"
                placeholder={contact.fields.subject.defaultPlaceholder}
                required
                aria-invalid={Boolean(state.errors?.subject)}
              />
              {state.errors?.subject ? (
                <p className="text-sm text-destructive">
                  {state.errors.subject.join(", ")}
                </p>
              ) : null}
            </label>

            <label
              className="block space-y-1.5 text-sm"
              htmlFor="contact-message"
            >
              <span className="text-muted-foreground">Message</span>
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about the role or project..."
                className="min-h-28"
                required
                aria-invalid={Boolean(state.errors?.message)}
              />
              {state.errors?.message ? (
                <p className="text-sm text-destructive">
                  {state.errors.message.join(", ")}
                </p>
              ) : null}
            </label>

            <div className="space-y-2">
              {siteKey ? (
                <Turnstile
                  key={widgetAttempt}
                  ref={turnstileRef}
                  siteKey={siteKey}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setVerificationError("");
                  }}
                  onExpire={() =>
                    failVerification(
                      "Security verification expired. Please verify again.",
                    )
                  }
                  onError={() =>
                    failVerification(
                      "Security verification failed. Please retry or email me directly.",
                    )
                  }
                  onTimeout={() =>
                    failVerification(
                      "Security verification timed out. Please retry.",
                    )
                  }
                  options={cloudflare.turnstile.widget}
                />
              ) : (
                <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {contact.form.unavailableMessage}
                </p>
              )}

              {siteKey && !turnstileToken ? (
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm text-muted-foreground" role="status">
                    {verificationError ||
                      "Complete the security check to enable send."}
                  </p>
                  <button
                    type="button"
                    className="text-sm underline underline-offset-4"
                    onClick={() => {
                      setVerificationError("");
                      setTurnstileToken("");
                      setWidgetAttempt((attempt) => attempt + 1);
                    }}
                  >
                    Retry security check
                  </button>
                </div>
              ) : null}

              <input type="hidden" name="turnstileToken" value={turnstileToken} />
              {state.errors?.turnstileToken ? (
                <p className="text-sm text-destructive">
                  {state.errors.turnstileToken.join(", ")}
                </p>
              ) : null}
            </div>

              {state.success ? (
              <p
                className="text-sm text-emerald-700 dark:text-emerald-300"
                role="status"
              >
                {state.message || contact.form.successMessage}
              </p>
            ) : null}
            {!state.success && state.message && !state.errors?.turnstileToken ? (
              <p className="text-sm text-destructive" role="alert">
                {state.message}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isPending || !siteKey || !turnstileToken}
            >
              {isPending
                ? contact.form.submittingLabel
                : contact.form.submitLabel}
            </Button>
          </form>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
