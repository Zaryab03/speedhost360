import Link from "next/link";
import { Check } from "lucide-react";
import { planFeatureLines, planPriceAmount, planPriceLabel, pricePeriod, type HostingPlan } from "@/lib/data/plans";
import { PlanCtas } from "@/components/sections/plan-ctas";
import { RevealOnScroll } from "@/components/motion/reveal";

export function Pricing({ plans }: { plans: HostingPlan[] }) {
  return (
    <section id="pricing" className="border-b border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Web Hosting Plans</h2>
          <h3 className="mt-3 max-w-2xl text-lg font-medium text-signal sm:text-xl">
            Reliable hosting for your website. Simple, transparent pricing.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            From personal websites and small businesses to growing companies, find a hosting plan that
            fits your needs. Get dependable server resources, SSL security, website backups and reliable
            performance, with clear pricing in PKR.
          </p>
          <p className="mt-3 max-w-2xl text-sm font-medium text-ink">
            No hidden charges. No confusing plans. Just hosting you can count on.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <RevealOnScroll
              key={plan.slug}
              delay={index * 0.05}
              className={`relative flex h-full flex-col border p-6 ${
                plan.mostPopular ? "border-signal bg-signal-soft/30 shadow-[0_0_0_1px_var(--signal),0_24px_48px_-28px_color-mix(in_srgb,var(--signal)_60%,transparent)]" : "border-line"
              }`}
            >
              {plan.mostPopular && (
                <span className="absolute -top-3 left-6 bg-signal px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-signal-ink">
                  Recommended
                </span>
              )}
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                {plan.name}
              </p>
              <p className="mt-3 text-2xl font-semibold text-ink">
                {planPriceAmount(plan)}
                <span className="ml-1 text-sm font-normal text-ink-muted">{pricePeriod}</span>
              </p>
              <p className="mt-2 text-sm text-ink-muted">{plan.bestFor}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {planFeatureLines(plan).map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-signal" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
              <PlanCtas
                className="mt-6"
                primary={plan.mostPopular}
                location="home_pricing"
                plan={{
                  slug: plan.slug,
                  name: plan.name,
                  service: plan.service,
                  priceLabel: planPriceLabel(plan),
                }}
              />
            </RevealOnScroll>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          Pricing shown in PKR. Compare every spec side by side on the{" "}
          <Link href="/services/web-hosting#compare-plans" className="underline underline-offset-2 hover:text-signal">
            Web Hosting
          </Link>{" "}
          page, or see{" "}
          <Link href="/services/managed-hosting" className="underline underline-offset-2 hover:text-signal">
            Managed Hosting
          </Link>{" "}
          for custom servers.
        </p>
      </div>
    </section>
  );
}
