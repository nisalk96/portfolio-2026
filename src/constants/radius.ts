/**
 * Border radius scale — change `base` to retune rounded corners globally.
 * Multipliers feed CSS `--radius-*` tokens used by Tailwind / shadcn.
 */
export const radius = {
  /** Root radius token (`--radius`) */
  base: "1rem",

  /** Scale relative to `base` */
  scale: {
    sm: 0.6,
    md: 0.8,
    lg: 1,
    xl: 1.4,
    "2xl": 1.8,
    "3xl": 2.2,
    "4xl": 2.6,
  },
} as const;

export type RadiusConstants = typeof radius;
