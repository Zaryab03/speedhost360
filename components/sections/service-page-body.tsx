import Link from "next/link";
import type { ReactNode } from "react";
import { Check, MessageCircle } from "lucide-react";
import type { ServiceContent } from "@/lib/data/services";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { FaqAccordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo/json-ld";

export function ServicePageBody({
  service,
  afterPricing,
}: {
  service: ServiceContent;
  /** Optional service-specific content (e.g. a competitor comparison) rendered right after the pricing block and before the FAQ. */
  afterPricing?: ReactNode;
}) {
  return (
    <>
      <JsonLd data={faqJsonLd(service.faq)} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
            {service.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {service.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            {service.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">{service.primaryCta}</Button>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-2 text-sm text-ink hover:text-signal"
            >
              <MessageCircle size={16} /> {siteConfig.whatsappDisplay}
            </a>
          </div>
        </div>
      </section>

      {service.overview && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <RevealOnScroll>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Overview</p>
            </RevealOnScroll>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {service.overview.map((paragraph, index) => (
                <RevealOnScroll key={index} delay={index * 0.06}>
                  <p className="max-w-xl text-base leading-relaxed text-ink-muted">{paragraph}</p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <StaggerGroup className="grid gap-8 sm:grid-cols-3">
            {service.benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <h3 className="text-base font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {benefit.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
              What&rsquo;s included
            </p>
          </RevealOnScroll>
          <StaggerGroup className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {service.features.map((feature) => (
              <StaggerItem key={feature.title} className="flex items-start gap-2.5">
                <Check size={16} className="mt-1 shrink-0 text-signal" />
                <div>
                  <p className="text-sm font-semibold text-ink">{feature.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {service.whoItsFor && (
        <section className="border-b border-line bg-paper-raised">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <RevealOnScroll>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
                Who it&rsquo;s for
              </p>
            </RevealOnScroll>
            <StaggerGroup className="mt-6 flex flex-wrap gap-3">
              {service.whoItsFor.map((item) => (
                <StaggerItem
                  key={item}
                  className="rounded-full border border-line-strong px-4 py-2 text-sm text-ink"
                >
                  {item}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Process</p>
          </RevealOnScroll>
          <div className="mt-8 grid gap-6 sm:grid-cols-4">
            {service.process.map((step, index) => (
              <RevealOnScroll key={step.step} delay={index * 0.06}>
                <span className="font-mono text-sm text-signal">{step.step}</span>
                <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {service.pricing && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <RevealOnScroll>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Pricing</p>
            </RevealOnScroll>
            <div
              className={`mt-8 grid gap-6 ${
                service.pricing.length > 1 ? "sm:grid-cols-3" : "sm:max-w-md"
              }`}
            >
              {service.pricing.map((plan) => (
                <div
                  key={plan.name}
                  className={`border p-6 ${
                    plan.highlighted ? "border-signal" : "border-line"
                  }`}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                    {plan.name}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-ink">{plan.price}</p>
                  <ul className="mt-5 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink-muted">
                        <Check size={15} className="mt-0.5 shrink-0 text-signal" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant={plan.highlighted ? "primary" : "secondary"} className="mt-6 w-full">
                    {service.primaryCta}
                  </Button>
                </div>
              ))}
            </div>
            {service.pricingNote && (
              <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-muted">
                {service.pricingNote}
              </p>
            )}
          </div>
        </section>
      )}

      {afterPricing}

      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">FAQ</p>
          </RevealOnScroll>
          <div className="mt-8">
            <FaqAccordion items={service.faq} />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
            Related services
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            {service.relatedServices.map((slug) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="focus-ring border border-line-strong px-4 py-2 text-sm text-ink hover:border-signal hover:text-signal"
              >
                {services[slug].navLabel} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
