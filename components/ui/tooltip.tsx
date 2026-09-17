"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

// Accessible on keyboard (focus) and touch (tap) by default via Radix —
// never gates content required to understand the page, only supplements it.
export function InfoTooltip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={`More information: ${label}`}
          className={cn(
            "focus-ring inline-flex size-4 items-center justify-center rounded-full border border-line-strong font-mono text-[0.625rem] text-ink-muted hover:border-signal hover:text-signal",
            className
          )}
        >
          i
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={6}
          className="z-50 max-w-64 rounded-[var(--radius-sm)] border border-line bg-paper-raised px-3 py-2 text-xs leading-relaxed text-ink shadow-[var(--shadow-card)]"
        >
          {label}
          <TooltipPrimitive.Arrow className="fill-paper-raised" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
