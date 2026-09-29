import { ViewTransition, type ReactNode } from "react";

export const transitionTypes = {
  forward: ["nav-forward"],
  back: ["nav-back"],
};

const directional = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

/**
 * Slides page content on typed navigations. Must render inside a page (not a
 * Next layout) so enter/exit fire on every route change.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  );
}

/** Pairs elements across routes so the browser morphs one into the other. */
export function SharedElement({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}

export function projectImageTransitionName(slug: string) {
  return `project-image-${slug}`;
}
