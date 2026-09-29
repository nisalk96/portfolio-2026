"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { animation } from "@/constants/animation";
import { canAnimateMotion } from "@/lib/motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {canAnimateMotion(reducedMotion) ? (
        <ReactLenis
          root
          options={{
            lerp: animation.lenis.lerp,
            wheelMultiplier: animation.lenis.wheelMultiplier,
            anchors: true,
            stopInertiaOnNavigate: true,
          }}
        />
      ) : null}
      {children}
    </MotionConfig>
  );
}
