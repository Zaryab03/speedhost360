"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { MouseEvent, MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-mono text-[0.8125rem] uppercase tracking-[0.04em] transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-signal-ink hover:bg-signal/90",
  secondary:
    "border border-line-strong text-ink hover:border-signal hover:text-signal",
  ghost: "text-ink hover:text-signal",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5",
  lg: "h-12 px-6 text-sm",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler;
  "aria-label"?: string;
  /**
   * Marks this as a top-priority CTA: a periodic idle glow (not a
   * continuous loop), a hover scale + light sweep + arrow nudge, and a
   * restrained "magnetic" pull toward the cursor. All of it is transform/
   * box-shadow only (no layout shift) and backs off under
   * prefers-reduced-motion.
   */
  pulse?: boolean;
};

type LinkButtonProps = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
  type?: undefined;
  disabled?: undefined;
};

type NativeButtonProps = SharedProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const MotionLink = motion.create(Link);

// Restrained magnetic pull: the button drifts a few pixels toward the
// cursor while hovered, then springs back. Capped well below anything
// that would feel gimmicky.
const MAGNET_STRENGTH = 0.3;
const MAGNET_MAX_PX = 7;

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className, children, pulse } = props;
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    pulse && "group relative overflow-hidden animate-cta-pulse",
    className
  );

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAGNET_MAX_PX, Math.min(MAGNET_MAX_PX, relX * MAGNET_STRENGTH)));
    y.set(Math.max(-MAGNET_MAX_PX, Math.min(MAGNET_MAX_PX, relY * MAGNET_STRENGTH)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const content = pulse ? (
    <>
      {/* Diagonal light sweep, contained by overflow-hidden on the button.
          box-shadow (the idle glow) is unaffected by that clip since it's
          painted outside the element's own box. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[250%] skew-x-[-20deg] bg-white/25 transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
      />
      <span className="relative">{children}</span>
      <ArrowRight
        size={16}
        className="relative shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
      />
    </>
  ) : (
    children
  );

  const motionInteractionProps = pulse
    ? {
        style: { x: springX, y: springY },
        whileHover: shouldReduceMotion ? undefined : { scale: 1.04 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring" as const, stiffness: 400, damping: 22 },
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
      }
    : {};

  if (props.href) {
    if (pulse) {
      return (
        <MotionLink
          href={props.href}
          className={classes}
          target={props.target}
          rel={props.rel}
          onClick={props.onClick}
          aria-label={props["aria-label"]}
          {...motionInteractionProps}
        >
          {content}
        </MotionLink>
      );
    }

    return (
      <Link
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
      >
        {content}
      </Link>
    );
  }

  if (pulse) {
    return (
      <motion.button
        type={props.type ?? "button"}
        disabled={props.disabled}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        className={classes}
        {...motionInteractionProps}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      className={classes}
    >
      {content}
    </button>
  );
}
