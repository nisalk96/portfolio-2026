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

  /** AI chat pacing (ms unless noted) */
  chat: {
    /** Pause after the user message before "thinking" appears */
    thinkingStartMs: 600,
    /** How long each thinking status stays on screen */
    thinkingStepMs: 1200,
    /** Random extra time on the final thinking status */
    thinkingJitterMs: 600,
    /** Pause before the first streamed character */
    typeStartMs: 250,
    /** Base delay per streamed character */
    typeCharMs: 26,
    /** Pause after sentence-ending punctuation */
    typeSentencePauseMs: 320,
    /** Pause after commas, colons and line breaks */
    typeClausePauseMs: 140,
    /** Rich answer (cards, chips) reveal, in seconds */
    richDuration: 0.55,
    richStagger: 0.14,
    /** Follow-up prompt chip stagger */
    chipStaggerMs: 110,
    chipDurationMs: 450,
  },

  /** Shared easing curves */
  ease: {
    /** Smooth decelerating reveal */
    out: [0.22, 1, 0.36, 1] as const,
    /** Snappy UI */
    snappy: [0.2, 0.8, 0.2, 1] as const,
  },

  /** Spring defaults for chat bubbles */
  spring: {
    stiffness: 170,
    damping: 24,
  },

  /** Scroll-triggered reveals */
  reveal: {
    /** Vertical travel in px */
    distance: 24,
    /** Starting blur in px */
    blur: 6,
    /** Fraction of the element visible before it reveals */
    amount: 0.2,
  },

  /** Lenis smooth scroll */
  lenis: {
    /** Lower = smoother / floatier (0–1) */
    lerp: 0.1,
    wheelMultiplier: 1,
  },
} as const;

export type AnimationConstants = typeof animation;
