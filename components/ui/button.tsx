"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

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
  /** Adds a looping glow + hover-scale to draw the eye to key CTAs. */
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

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className, children, pulse } = props;
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    pulse && "animate-cta-pulse transition-transform hover:scale-105 hover:[animation-play-state:paused]",
    className
  );

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
      >
        {children}
      </Link>
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
      {children}
    </button>
  );
}
