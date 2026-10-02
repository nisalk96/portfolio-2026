"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileText,
  IconMail,
  IconMapPin,
  IconSend,
} from "@tabler/icons-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cloudflare } from "@/constants/cloudflare";
import { contact } from "@/constants/contact";
import { profile } from "@/data/profile";
import { useNearViewport } from "@/hooks/useNearViewport";
import { cn } from "@/lib/utils";
import {
  submitContactForm,
  type ContactFormState,
} from "@/server/contact-action";

const initialState: ContactFormState = { message: "" };

const fieldClass =
  "h-11 rounded-full border-glass-border bg-white/60 px-4 shadow-[inset_0_1px_2px_rgb(12_13_33/0.04)] dark:bg-white/5";

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
  const formRef = useRef<HTMLFormElement>(null);
  const loadTurnstile = useNearViewport(formRef);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [widgetAttempt, setWidgetAttempt] = useState(0);
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

  const failVerification = (message: string) => {
    setTurnstileToken("");
    setVerificationError(message);
  };

  const [handledState, setHandledState] = useState(state);
  if (handledState !== state) {
    setHandledState(state);
    if (state.message) setTurnstileToken("");
  }

  useEffect(() => {
    if (state.message) turnstileRef.current?.reset();
  }, [state]);

  return (
    <section
      id="contact"
      className="glass-panel relative mt-5 scroll-mt-24 p-5 md:mt-6 md:p-8"
    >
      <div
        aria-hidden
        className="animate-float-soft pointer-events-none absolute -right-10 -bottom-10 -z-10 hidden size-56 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(255_255_255/0.95),var(--orb-b)_45%,var(--orb-a)_80%)] opacity-70 blur-[2px] lg:block dark:opacity-50"
      />
      <RevealGroup
        className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10"
        amount={0.1}
      >
        <RevealItem className="flex flex-col">
          <p className="eyebrow">{contact.form.eyebrow}</p>
          <h2 className="mt-3 max-w-sm text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem] md:leading-tight">
            {contact.form.title}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-body">
            {contact.form.description}
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 text-sm text-foreground"
              >
                <span className="glass inline-flex size-9 items-center justify-center rounded-full text-brand">
                  <IconMail className="size-4" />
                </span>
                <span className="group-hover:underline group-hover:underline-offset-4">
                  {profile.email}
                </span>
              </a>
            </li>
            <li className="inline-flex items-center gap-3 text-sm text-foreground">
              <span className="glass inline-flex size-9 items-center justify-center rounded-full text-brand">
                <IconMapPin className="size-4" />
              </span>
              {profile.location}
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {contact.channels
              .filter((channel) => channel.id !== "email")
              .map((channel) => {
                const Icon =
                  channelIcons[channel.id as keyof typeof channelIcons] ??
                  IconMail;
                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] text-foreground transition-colors hover:bg-glass-strong"
                  >
                    <Icon className="size-4 text-brand" />
                    {channel.label}
                  </a>
                );
              })}
          </div>
        </RevealItem>

        <RevealItem>
          <form
            ref={formRef}
            className="glass space-y-3 rounded-3xl p-4 md:p-5"
            action={formAction}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5 text-sm" htmlFor="contact-name">
                <span className="sr-only">Name</span>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Your Name"
                  className={fieldClass}
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
                <span className="sr-only">Email</span>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className={fieldClass}
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
              <span className="sr-only">Subject</span>
              <Input
                id="contact-subject"
                name="subject"
                placeholder={contact.fields.subject.defaultPlaceholder}
                className={fieldClass}
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
              <span className="sr-only">Message</span>
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Your Message"
                className={cn(fieldClass, "h-auto min-h-32 rounded-2xl py-3")}
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
              {siteKey && !loadTurnstile ? (
                <div className="h-[65px] rounded-2xl border border-glass-border bg-white/40 dark:bg-white/5" />
              ) : siteKey ? (
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

              <input
                type="hidden"
                name="turnstileToken"
                value={turnstileToken}
              />
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
            {!state.success &&
            state.message &&
            !state.errors?.turnstileToken ? (
              <p className="text-sm text-destructive" role="alert">
                {state.message}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isPending || !siteKey || !turnstileToken}
            >
              {isPending
                ? contact.form.submittingLabel
                : contact.form.submitLabel}
              <IconSend />
            </Button>
          </form>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
