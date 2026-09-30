"use client";

import { m, type Variants } from "framer-motion";
import {
  createContext,
  useContext,
  type CSSProperties,
  type ReactNode,
} from "react";
import { animation } from "@/constants/animation";
import { motionTransitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: animation.reveal.distance,
    filter: `blur(${animation.reveal.blur}px)`,
  },
  visible: (delay?: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: delay
      ? { ...motionTransitions.reveal, delay }
      : motionTransitions.reveal,
  }),
};

/**
 * - `mount`: plays on page load via CSS (`.reveal-css` in globals.css) so
 *   above-the-fold content paints before hydration. Use for the first screen.
 * - `inView`: Framer Motion reveal when scrolled into view.
 */
type RevealTrigger = "inView" | "mount";

type RevealGroupMode = "mount" | "inView" | null;

const RevealGroupContext = createContext<RevealGroupMode>(null);

function inViewProps(amount: number) {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount },
  } as const;
}

function cssDelayStyle(delay: number, stagger?: number) {
  return {
    "--reveal-delay": `${delay}s`,
    ...(stagger !== undefined ? { "--reveal-stagger": `${stagger}s` } : {}),
  } as CSSProperties;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: RevealTrigger;
  amount?: number;
  as?: "div" | "article" | "section" | "li";
}

/** Fades, lifts and un-blurs a single block into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  trigger = "inView",
  amount = animation.reveal.amount,
  as = "div",
}: RevealProps) {
  if (trigger === "mount") {
    const Tag = as;
    return (
      <Tag className={cn("reveal-css", className)} style={cssDelayStyle(delay)}>
        {children}
      </Tag>
    );
  }

  const Component = m[as];

  return (
    <Component
      className={cn("reveal-in-view", className)}
      variants={revealVariants}
      custom={delay}
      {...inViewProps(amount)}
    >
      {children}
    </Component>
  );
}

interface RevealGroupProps extends Omit<RevealProps, "as"> {
  stagger?: keyof typeof animation.stagger;
  as?: "div" | "ul" | "section";
}

/** Reveals each direct `RevealItem` child in sequence. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  trigger = "inView",
  amount = animation.reveal.amount,
  stagger = "normal",
  as = "div",
}: RevealGroupProps) {
  if (trigger === "mount") {
    const Tag = as;
    return (
      <RevealGroupContext.Provider value="mount">
        <Tag
          className={cn("reveal-css-group", className)}
          style={cssDelayStyle(delay, animation.stagger[stagger])}
        >
          {children}
        </Tag>
      </RevealGroupContext.Provider>
    );
  }

  const Component = m[as];

  return (
    <RevealGroupContext.Provider value="inView">
      <Component
        className={className}
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: delay,
              staggerChildren: animation.stagger[stagger],
            },
          },
        }}
        {...inViewProps(amount)}
      >
        {children}
      </Component>
    </RevealGroupContext.Provider>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "p" | "span";
}

export function RevealItem({
  children,
  className,
  as = "div",
}: RevealItemProps) {
  const groupMode = useContext(RevealGroupContext);

  if (groupMode === "mount") {
    const Tag = as;
    return <Tag className={cn("reveal-css", className)}>{children}</Tag>;
  }

  const Component = m[as];

  return (
    <Component
      className={cn(groupMode === "inView" && "reveal-in-view", className)}
      variants={revealVariants}
    >
      {children}
    </Component>
  );
}
