"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { animation } from "@/constants/animation";
import { motionTransitions } from "@/lib/motion";

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

type RevealTrigger = "inView" | "mount";

/**
 * Always starts hidden so server and client markup match; reduced-motion users
 * get a plain fade because MotionProvider sets `reducedMotion="user"`.
 */
function getRevealProps(trigger: RevealTrigger, amount: number) {
  if (trigger === "mount") {
    return { initial: "hidden", animate: "visible" } as const;
  }
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount },
  } as const;
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
  const revealProps = getRevealProps(trigger, amount);
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={revealVariants}
      custom={delay}
      {...revealProps}
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
  const revealProps = getRevealProps(trigger, amount);
  const Component = motion[as];

  return (
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
      {...revealProps}
    >
      {children}
    </Component>
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
  const Component = motion[as];

  return (
    <Component className={className} variants={revealVariants}>
      {children}
    </Component>
  );
}
