import { animation } from "@/constants/animation";

/**
 * Framer's useReducedMotion() is `null` on the first client render.
 * Treating null as "motion enabled" and mounting with opacity: 0 can leave
 * content permanently invisible once reduced-motion resolves to true
 * (animations get skipped while initial styles remain).
 */
export function canAnimateMotion(reducedMotion: boolean | null) {
  return reducedMotion === false;
}

export const motionTransitions = {
  reveal: {
    duration: animation.slow,
    ease: animation.ease.out,
  },
  item: {
    duration: animation.normal,
  },
  chip: {
    duration: animation.fast,
  },
  ambient: {
    duration: animation.ambient,
    repeat: Infinity,
  },
  loop: {
    duration: animation.loop,
    repeat: Infinity,
  },
  spring: {
    type: "spring" as const,
    stiffness: animation.spring.stiffness,
    damping: animation.spring.damping,
  },
};

export function staggerDelay(
  index: number,
  density: keyof typeof animation.stagger = "normal",
) {
  return index * animation.stagger[density];
}
