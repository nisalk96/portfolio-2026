/**
 * Framer's useReducedMotion() is `null` on the first client render.
 * Treating null as "motion enabled" and mounting with opacity: 0 can leave
 * content permanently invisible once reduced-motion resolves to true
 * (animations get skipped while initial styles remain).
 */
export function canAnimateMotion(reducedMotion: boolean | null) {
  return reducedMotion === false;
}
