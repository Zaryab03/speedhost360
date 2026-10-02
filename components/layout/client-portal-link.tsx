"use client";

import { Lock } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Variant = "button" | "link" | "menu";

const variants: Record<Variant, string> = {
  // Outline style, deliberately unlike the filled primary CTA.
  button:
    "inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] border border-line-strong px-4 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-ink transition-colors hover:border-signal hover:text-signal",
  link: "inline-flex items-center gap-2 text-sm text-ink hover:text-signal",
  menu: "flex items-center gap-2 rounded-[var(--radius-sm)] px-1 py-2.5 text-base text-ink",
};

/**
 * Entry point to the ERPNext Helpdesk. A plain same-tab link (no iframe,
 * no user data in the URL) shared by every placement so the URL, label and
 * tracking stay consistent.
 */
export function ClientPortalLink({
  location,
  variant = "link",
  label = "Client Portal",
  className,
}: {
  /** Analytics location, e.g. header, footer, contact, hosting. */
  location: string;
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={siteConfig.helpdeskUrl}
      aria-label={`${label} (opens helpdesk)`}
      onClick={() => trackEvent("client_portal_click", { location })}
      className={cn("focus-ring", variants[variant], className)}
    >
      <Lock size={variant === "link" ? 15 : 16} aria-hidden />
      {label}
    </a>
  );
}
