"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PipelineDiagram } from "@/components/motion/pipeline-diagram";
import { siteConfig } from "@/lib/data/site";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
        <motion.p
          {...fadeUp(0)}
          className="font-mono text-xs uppercase tracking-[0.08em] text-signal"
        >
          SpeedHost360 · Web Development, Hosting &amp; Digital Marketing
        </motion.p>

        <motion.h1
          {...fadeUp(0.08)}
          className="mt-5 text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          Build.
          <br />
          Host.
          <br />
          <span className="text-signal">Grow.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.18)}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div {...fadeUp(0.26)} className="mt-9 flex flex-wrap items-center gap-4">
          <Button
            href="/contact"
            size="lg"
            onClick={() => trackEvent("cta_click", { location: "hero_primary" })}
          >
            Start a Project
          </Button>
          <Button
            href="/services"
            variant="secondary"
            size="lg"
            onClick={() => trackEvent("cta_click", { location: "hero_secondary" })}
          >
            Explore Services
          </Button>
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: "hero" })}
            className="focus-ring flex items-center gap-2 text-sm text-ink hover:text-signal"
          >
            <MessageCircle size={17} />
            {siteConfig.whatsappDisplay}
          </a>
        </motion.div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-line px-4 sm:px-6">
        <PipelineDiagram />
      </div>
    </section>
  );
}
