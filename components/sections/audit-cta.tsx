import { AuditForm } from "@/components/forms/audit-form";
import { RevealOnScroll } from "@/components/motion/reveal";

export function AuditCta({ location }: { location: string }) {
  return (
    <section id="free-audit" className="scroll-mt-24 border-b border-line bg-paper-raised">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Free website audit</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Not sure what&rsquo;s holding your site back?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Send us your address and what you&rsquo;d like to improve. We&rsquo;ll review the site
            and email you a short list of what we&rsquo;d fix first. No cost, no obligation.
          </p>
        </RevealOnScroll>
        <AuditForm location={location} />
      </div>
    </section>
  );
}
