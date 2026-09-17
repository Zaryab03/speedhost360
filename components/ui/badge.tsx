import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] border border-line-strong px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
