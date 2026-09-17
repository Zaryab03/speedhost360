"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/data/site";
import { trackEvent } from "@/lib/analytics";

export function FinalCta() {
  return (
    <section className="border-b border-line bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
            Ready when you are
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Let&rsquo;s build something that actually works.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-paper/70 sm:text-base">
            {siteConfig.responseTimePromise}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              onClick={() => trackEvent("cta_click", { location: "final_cta_primary" })}
            >
              Start a Project
            </Button>
            <Button
              href="/contact?intent=quote"
              variant="secondary"
              size="lg"
              className="border-paper/30 text-paper hover:border-signal"
              onClick={() => trackEvent("cta_click", { location: "final_cta_quote" })}
            >
              Get a Quote
            </Button>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "final_cta" })}
              className="focus-ring flex items-center gap-2 text-sm text-paper/80 hover:text-signal"
            >
              <MessageCircle size={17} />
              Talk on WhatsApp
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
