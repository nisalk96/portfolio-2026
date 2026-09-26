/**
 * Cloudflare Turnstile + related settings.
 * Site/secret keys live in env — only non-secret options live here.
 */
export const cloudflare = {
  turnstile: {
    /** Cloudflare siteverify endpoint */
    verifyUrl: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    /** Client widget options passed to @marsidev/react-turnstile */
    widget: {
      theme: "auto" as const,
      size: "flexible" as const,
      responseField: false,
    },
    /** Abort verification after this many ms */
    verifyTimeoutMs: 10_000,
  },

  /**
   * Optional Cloudflare Pages / edge hints.
   * Used by `public/_headers` comments and future OpenNext deploy docs.
   */
  pages: {
    securityHeaders: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    },
  },
} as const;

export type CloudflareConstants = typeof cloudflare;
