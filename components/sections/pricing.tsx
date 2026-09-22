import Link from "next/link";
import { Check } from "lucide-react";
import { services } from "@/lib/data/services";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/motion/reveal";

const hostingPlans = services["web-hosting"].pricing ?? [];
const managedPlan = services["managed-hosting"].pricing?.[0];
const plans = managedPlan ? [...hostingPlans, managedPlan] : hostingPlans;

export function Pricing() {
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

        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          Pricing shown in PKR. See full plan details on the{" "}
          <Link href="/services/web-hosting" className="underline underline-offset-2 hover:text-signal">
            Web Hosting
          </Link>{" "}
          and{" "}
          <Link href="/services/managed-hosting" className="underline underline-offset-2 hover:text-signal">
            Managed Hosting
          </Link>{" "}
          pages, or{" "}
          <Link href="/contact" className="underline underline-offset-2 hover:text-signal">
            contact us
          </Link>{" "}
          to confirm the current billing cycle for your project.
        </p>
      </div>
    </section>
  );
}
