"use client";

import { useEffect, useState, type RefObject } from "react";

/** Flips to true (once) when the element comes within `rootMargin` of the viewport. */
export function useNearViewport<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "400px",
) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || near) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin, near]);

  return near;
}
