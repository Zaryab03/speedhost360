"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
      aria-label={`Chat on WhatsApp: ${siteConfig.whatsappDisplay}`}
      className="focus-ring group fixed bottom-24 left-4 z-40 hidden size-12 items-center justify-center rounded-full bg-signal text-signal-ink shadow-[var(--shadow-card)] transition-transform hover:scale-105 sm:bottom-6 sm:left-6 md:flex"
    >
      <span className="absolute inset-0 rounded-full bg-signal opacity-40 [animation:pulse_2.4s_ease-in-out_infinite] group-hover:opacity-0" />
      <MessageCircle size={20} className="relative" />
    </a>
  );
}
