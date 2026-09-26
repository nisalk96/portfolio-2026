/**
 * Animation speeds — tweak these to retune motion site-wide.
 * Durations are in seconds unless noted.
 */
export const animation = {
  /** Instant UI feedback (hover states that need JS timing) */
  instant: 0.12,
  /** Chips, badges, small fades */
  fast: 0.25,
  /** Default card / list item entrance */
  normal: 0.35,
  /** Section / hero reveals */
  slow: 0.45,
  /** Soft ambient loops (status pulse, etc.) */
  ambient: 1.4,
  /** Thinking dots / shimmer loops */
  loop: 0.9,

  /** Stagger between sibling items */
  stagger: {
    tight: 0.05,
    normal: 0.08,
    loose: 0.12,
  },

  /** Typewriter word interval (ms) */
  typewriterMs: 28,

  /** Shared easing curves */
  ease: {
    /** Smooth decelerating reveal */
    out: [0.22, 1, 0.36, 1] as const,
    /** Snappy UI */
    snappy: [0.2, 0.8, 0.2, 1] as const,
  },

  /** Spring defaults for chat bubbles */
  spring: {
    stiffness: 320,
    damping: 28,
  },
} as const;

export type AnimationConstants = typeof animation;
