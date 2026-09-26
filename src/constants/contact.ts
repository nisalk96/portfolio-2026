/**
 * Contact form + outbound email settings.
 * Tune copy, recipients and channels here.
 */
export const contact = {
  form: {
    title: "Want to work together?",
    eyebrow: "Contact",
    description:
      "Reach out for product engineering roles, freelance collaborations or technical conversations.",
    successMessage: "Thanks — your message was sent successfully.",
    unavailableMessage:
      "The contact form is temporarily unavailable. Please email me directly.",
    submitLabel: "Send message",
    submittingLabel: "Sending...",
  },

  email: {
    /**
     * Resend "from" — must use a verified domain in Resend.
     * Override with RESEND_FROM in Vercel if needed.
     */
    from: "Nisalk <onboarding@nisalk.dev>",
    /** Inbox that receives contact form submissions. Override with RESEND_TO. */
    to: "nirvanzentinal@gmail.com",
    subject: "NisalK.dev Contact",
    replyToField: true,
  },

  fields: {
    name: { min: 2, max: 100 },
    email: { max: 200 },
    subject: { min: 3, max: 200, defaultPlaceholder: "Project or role" },
    message: { min: 10, max: 2000 },
  },

  channels: [
    {
      id: "email",
      label: "Email",
      href: "mailto:nirvanzentinal@gmail.com",
      external: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/nisalk",
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/nisalk96",
      external: true,
    },
    {
      id: "resume",
      label: "Download Resume",
      href: "https://drive.google.com/file/d/1IjGSkxXoTz0Ep6R63NDi5nR1wQoPJzkI/view?usp=sharing",
      external: true,
    },
  ],

  social: [
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/nisalk96",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nisalk/",
    },
    {
      id: "x",
      name: "X",
      url: "https://x.com/nisalk96",
    },
    {
      id: "upwork",
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/~015795e37a9df7ca62?mp_source=share",
    },
    {
      id: "fiverr",
      name: "Fiverr",
      url: "https://www.fiverr.com/s/vv4PywA",
    },
    {
      id: "behance",
      name: "Behance",
      url: "https://www.behance.net/nirvanzentinal",
    },
  ],
} as const;

export type ContactConstants = typeof contact;
