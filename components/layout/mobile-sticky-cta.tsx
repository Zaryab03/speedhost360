"use client";

import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/data/site";
import { trackEvent } from "@/lib/analytics";

export function MobileStickyCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-paper-raised md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={siteConfig.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { location: "mobile_sticky_cta" })}
        className="focus-ring flex flex-col items-center justify-center gap-1 border-r border-line py-2.5 text-[0.6875rem] font-mono uppercase tracking-[0.04em] text-ink"
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>
      <a
        href={`tel:${siteConfig.phoneNumber}`}
        onClick={() => trackEvent("phone_click", { location: "mobile_sticky_cta" })}
        className="focus-ring flex flex-col items-center justify-center gap-1 border-r border-line py-2.5 text-[0.6875rem] font-mono uppercase tracking-[0.04em] text-ink"
      >
        <Phone size={16} />
        Call
      </a>
      <Link
        href="/contact"
        onClick={() => trackEvent("cta_click", { location: "mobile_sticky_cta" })}
        className="focus-ring flex flex-col items-center justify-center gap-1 bg-signal py-2.5 text-[0.6875rem] font-mono uppercase tracking-[0.04em] text-signal-ink"
      >
        <ArrowRight size={16} />
        Start Project
      </Link>
    </div>
  );
}
