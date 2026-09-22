import { Check } from "lucide-react";
import { emailHostingPricing } from "@/lib/data/email-hosting";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/motion/reveal";

export function EmailPricing() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
            Business Email
          </p>
          <h2 className="mt-3 max-w-lg text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Professional email on your own domain.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
            Self-hosted business email, priced per mailbox. Sold alongside any hosting plan, not
            locked to one.
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 sm:max-w-2xl sm:grid-cols-2">
          {emailHostingPricing.map((plan, index) => (
            <RevealOnScroll
              key={plan.name}
              delay={index * 0.05}
              className={`flex h-full flex-col border p-6 ${
                plan.highlighted ? "border-signal" : "border-line"
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                {plan.name}
              </p>
              <p className="mt-3 text-2xl font-semibold text-ink">{plan.price}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-signal" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={plan.highlighted ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                Get Started
              </Button>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
