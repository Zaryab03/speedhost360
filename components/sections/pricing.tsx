import Link from "next/link";
import { Check } from "lucide-react";
import { planCardKeys, planPriceLabel, type HostingPlan } from "@/lib/data/plans";
import { SpecValue } from "@/components/ui/spec-value";
import { PlanCtas } from "@/components/sections/plan-ctas";
import { RevealOnScroll } from "@/components/motion/reveal";

export function Pricing({ plans }: { plans: HostingPlan[] }) {
  return (
    <section id="pricing" className="border-b border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Pricing</p>
          <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Published starting prices, no guessing games.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
            Hosting and managed infrastructure plans, in PKR, up front. Final pricing may adjust
            for unusual traffic or storage needs, but you&rsquo;ll never have to ask what
            something costs before we tell you.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <RevealOnScroll
              key={plan.slug}
              delay={index * 0.05}
              className={`relative flex h-full flex-col border p-6 ${
                plan.mostPopular ? "border-signal" : "border-line"
              }`}
            >
              {plan.mostPopular && (
                <span className="absolute -top-3 left-6 bg-signal px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-signal-ink">
                  Most popular
                </span>
              )}
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                {plan.name}
              </p>
              <p className="mt-3 text-2xl font-semibold text-ink">{planPriceLabel(plan)}</p>
              <p className="mt-2 text-sm text-ink-muted">{plan.bestFor}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {planCardKeys.map(({ key, label }) => (
                  <li key={key} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-signal" />
                    <span>
                      {label}: <SpecValue value={plan[key]} />
                    </span>
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
