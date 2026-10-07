"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { planContactHref } from "@/lib/data/plans";

type PlanCtaPlan = { slug: string; name: string; service: string; priceLabel: string };

// Plan-specific CTAs: the brief form with this plan preselected, and a
// WhatsApp chat pre-filled with the plan name.
export function PlanCtas({
  plan,
  primary,
  location,
  className,
  noun = "hosting plan",
}: {
  plan: PlanCtaPlan;
  primary?: boolean;
  location: string;
  className?: string;
  /** How the WhatsApp message describes the plan, e.g. "complete package". */
  noun?: string;
}) {
  const whatsappText = `Hi SpeedHost360, I'm interested in the ${plan.name} ${noun} (${plan.priceLabel}).`;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Button
        href={planContactHref(plan)}
        variant={primary ? "primary" : "secondary"}
        className="w-full"
        onClick={() => trackEvent("plan_cta_click", { plan: plan.slug, channel: "form", location })}
      >
        Choose {plan.name}
      </Button>
      <a
        href={siteConfig.whatsappLinkWithText(whatsappText)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("plan_cta_click", { plan: plan.slug, channel: "whatsapp", location })}
        className="focus-ring flex items-center justify-center gap-1.5 text-xs text-ink-muted hover:text-signal"
      >
        <MessageCircle size={14} /> Ask about {plan.name} on WhatsApp
      </a>
    </div>
  );
}
