/**
 * Layout / product variables — non-color, non-radius tuning knobs.
 */
export const variables = {
  layout: {
    maxWidth: "1280px",
    headerBlurPx: 12,
    sectionScrollMargin: "6rem",
  },

  chat: {
    height: "min(70vh, 620px)",
    minHeight: "480px",
  },

  page: {
    contentPaddingX: "1rem",
    contentPaddingXMd: "1.5rem",
  },

  motionPreference: {
    /** When true, honor prefers-reduced-motion in CSS */
    respectReducedMotion: true,
  },

  /** CSS transition durations mirrored for Tailwind-friendly vars */
  cssDuration: {
    fast: "150ms",
    normal: "300ms",
    slow: "450ms",
  },
} as const;

export type VariablesConstants = typeof variables;
