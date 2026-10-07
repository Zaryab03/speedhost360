import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Minus } from "lucide-react";
import {
  hostingAddOns,
  isPending,
  planContactHref,
  planPriceAmount,
  planPriceLabel,
  pricePeriod,
  planSpecRows,
  slaSummary,
  TODO_CONFIRM,
  type HostingPlan,
  type Spec,
} from "@/lib/data/plans";
import { emailHostingPricing } from "@/lib/data/email-hosting";
import { siteConfig } from "@/lib/data/site";
import { SpecValue } from "@/components/ui/spec-value";
import { PlanCtas } from "@/components/sections/plan-ctas";
import { RevealOnScroll } from "@/components/motion/reveal";

function ctaPlan(plan: HostingPlan) {
  return { slug: plan.slug, name: plan.name, service: plan.service, priceLabel: planPriceLabel(plan) };
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">{children}</p>;
}

export function PlanComparisonTable({ plans, location }: { plans: HostingPlan[]; location: string }) {
  return (
    <section id="compare-plans" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <RevealOnScroll>
          <Eyebrow>Compare plans</Eyebrow>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Every plan, spec by spec.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Prices in PKR. Values marked &ldquo;Ask us&rdquo; aren&rsquo;t published yet; message
            us and we&rsquo;ll confirm them for your project before you sign up.
          </p>
        </RevealOnScroll>

        {/* Desktop / tablet: one table, horizontally scrollable if needed. */}
        <div className="mt-10 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <caption className="sr-only">Hosting plan comparison</caption>
            <thead>
              <tr className="border-b border-line-strong align-bottom">
                <th scope="col" className="sticky left-0 bg-paper py-3 pr-4 text-left">
                  <span className="sr-only">Spec</span>
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.slug}
                    id={`plan-${plan.slug}`}
                    scope="col"
                    className={`px-4 py-3 text-left align-bottom font-normal ${
                      plan.mostPopular ? "bg-signal-soft/50" : ""
                    }`}
                  >
                    {plan.mostPopular && (
                      <span className="mb-2 inline-block bg-signal px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-signal-ink">
                        Most popular
                      </span>
                    )}
                    <span className="block font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                      {plan.name}
                    </span>
                    <span className="mt-1 block text-lg font-semibold text-ink">
                      {planPriceAmount(plan)}
                    </span>
                    <span className="block text-xs text-ink-muted">{pricePeriod}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planSpecRows.map((row) => (
                <tr key={row.key} className="border-b border-line align-top">
                  <th
                    scope="row"
                    className="sticky left-0 bg-paper py-3 pr-4 text-left font-medium text-ink"
                  >
                    {row.label}
                  </th>
                  {plans.map((plan) => (
                    <td
                      key={plan.slug}
                      className={`px-4 py-3 text-ink-muted ${plan.mostPopular ? "bg-signal-soft/50" : ""}`}
                    >
                      <SpecValue value={plan[row.key]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="sticky left-0 bg-paper" />
                {plans.map((plan) => (
                  <td
                    key={plan.slug}
                    className={`px-4 py-5 ${plan.mostPopular ? "bg-signal-soft/50" : ""}`}
                  >
                    <PlanCtas plan={ctaPlan(plan)} primary={plan.mostPopular} location={location} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards, one per plan. */}
        <div className="mt-10 space-y-6 md:hidden">
          {plans.map((plan) => (
            <article
              key={plan.slug}
              aria-labelledby={`plan-card-${plan.slug}`}
              className={`border p-5 ${plan.mostPopular ? "border-signal" : "border-line"}`}
            >
              {plan.mostPopular && (
                <span className="mb-2 inline-block bg-signal px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-signal-ink">
                  Most popular
                </span>
              )}
              <h3
                id={`plan-card-${plan.slug}`}
                className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted"
              >
                {plan.name}
              </h3>
              <p className="mt-1 text-xl font-semibold text-ink">{planPriceLabel(plan)}</p>
              <dl className="mt-4 divide-y divide-line text-sm">
                {planSpecRows.map((row) => (
                  <div key={row.key} className="flex justify-between gap-4 py-2">
                    <dt className="text-ink">{row.label}</dt>
                    <dd className="text-right text-ink-muted">
                      <SpecValue value={plan[row.key]} />
                    </dd>
                  </div>
                ))}
              </dl>
              <PlanCtas
                className="mt-5"
                plan={ctaPlan(plan)}
                primary={plan.mostPopular}
                location={location}
              />
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-muted">
          Billing and renewal: each plan is billed on the period shown above and renews at the
          listed renewal price. We&rsquo;ll confirm both in writing before your first invoice.
        </p>
      </div>
    </section>
  );
}

const scenarios: { title: string; description: string; plan: HostingPlan["slug"] }[] = [
  {
    title: "“I have one business website.”",
    description: "A company site, portfolio or landing page that just needs to stay fast, secure and backed up.",
    plan: "starter",
  },
  {
    title: "“I run a few sites or brands.”",
    description: "Up to five websites under one plan, with performance monitoring and priority support.",
    plan: "business",
  },
  {
    title: "“My sites get serious traffic.”",
    description: "Multiple busy sites where slowdowns cost you sales, with advanced monitoring.",
    plan: "professional",
  },
  {
    title: "“I need a custom server, but no sysadmin.”",
    description: "A dedicated or custom setup that we provision, patch, monitor and back up for you.",
    plan: "managed",
  },
];

export function PlanScenarios({ plans }: { plans: HostingPlan[] }) {
  return (
    <section className="border-b border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <RevealOnScroll>
          <Eyebrow>Which plan is right for me?</Eyebrow>
        </RevealOnScroll>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((s) => {
            const plan = plans.find((p) => p.slug === s.plan);
            if (!plan) return null;
            return (
              <div key={s.plan} className="flex flex-col border border-line bg-paper p-5">
                <h3 className="text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{s.description}</p>
                <Link
                  href={planContactHref(plan)}
                  className="focus-ring mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal"
                >
                  {plan.name}, {planPriceLabel(plan)} <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const notIncluded: { item: string; detail: Spec }[] = [
  {
    item: "Business email",
    detail: `Sold separately, from ${emailHostingPricing[0].price} ${pricePeriod} for ${emailHostingPricing[0].name.toLowerCase()}.`,
  },
  { item: "Website design and development", detail: "A separate service, quoted per project." },
  { item: "Domain registration and renewal", detail: TODO_CONFIRM },
  { item: "Premium plugin, theme or software licences", detail: TODO_CONFIRM },
];

export function NotIncludedAndAddOns() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <Eyebrow>What&rsquo;s not included</Eyebrow>
          <ul className="mt-6 space-y-4">
            {notIncluded.map((n) => (
              <li key={n.item} className="flex items-start gap-2.5 text-sm">
                <Minus size={15} className="mt-0.5 shrink-0 text-ink-muted" />
                <span>
                  <span className="font-medium text-ink">{n.item}.</span>{" "}
                  <span className="text-ink-muted">
                    <SpecValue value={n.detail} />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow>Add-ons</Eyebrow>
          <table className="mt-6 w-full border-collapse text-sm">
            <caption className="sr-only">Hosting add-on prices</caption>
            <thead>
              <tr className="border-b border-line-strong text-left">
                <th scope="col" className="py-2 pr-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                  Add-on
                </th>
                <th scope="col" className="py-2 pr-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                  Price (PKR)
                </th>
                <th scope="col" className="py-2 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                  Unit
                </th>
              </tr>
            </thead>
            <tbody>
              {hostingAddOns.map((a) => (
                <tr key={a.name} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                    {a.name}
                  </th>
                  <td className="py-3 pr-4 text-ink-muted">
                    <SpecValue value={a.price} />
                  </td>
                  <td className="py-3 text-ink-muted">
                    <SpecValue value={a.unit} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function SlaSummary({ plans, children }: { plans: HostingPlan[]; children?: ReactNode }) {
  const statusPage = isPending(siteConfig.statusPageUrl) ? null : siteConfig.statusPageUrl;

  return (
    <section id="sla" className="scroll-mt-24 border-b border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <RevealOnScroll>
          <Eyebrow>Service level summary</Eyebrow>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            What we commit to, in writing.
          </h2>
        </RevealOnScroll>

        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="border-t border-line-strong pt-4">
            <dt className="text-sm text-ink-muted">Uptime commitment</dt>
            <dd className="mt-1 text-2xl font-semibold text-ink">{slaSummary.uptimeCommitment}</dd>
          </div>
          <div className="border-t border-line-strong pt-4">
            <dt className="text-sm text-ink-muted">Support hours</dt>
            <dd className="mt-1 text-sm text-ink">
              {siteConfig.hours.days}, {siteConfig.hours.time}
              <span className="block text-ink-muted">{siteConfig.hours.timezone}</span>
            </dd>
          </div>
          <div className="border-t border-line-strong pt-4">
            <dt className="text-sm text-ink-muted">If we miss the uptime commitment</dt>
            <dd className="mt-1 text-sm text-ink">
              <SpecValue value={slaSummary.uptimeRemedy} />
            </dd>
          </div>
        </dl>

        <table className="mt-10 w-full max-w-2xl border-collapse text-sm">
          <caption className="sr-only">Support response times per plan</caption>
          <thead>
            <tr className="border-b border-line-strong text-left">
              <th scope="col" className="py-2 pr-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                Plan
              </th>
              <th scope="col" className="py-2 pr-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                Support tier
              </th>
              <th scope="col" className="py-2 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                Response time
              </th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.slug} className="border-b border-line">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                  {plan.name}
                </th>
                <td className="py-3 pr-4 text-ink-muted">
                  <SpecValue value={plan.supportTier} />
                </td>
                <td className="py-3 text-ink-muted">
                  <SpecValue value={plan.supportResponseTime} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 space-y-3 text-sm text-ink-muted">
          {statusPage && (
            <p>
              Live uptime:{" "}
              <a href={statusPage} className="focus-ring underline underline-offset-2 hover:text-signal">
                status page
              </a>
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

const migrationNeeds = [
  "Login to your current host (control panel or SFTP)",
  "Access to your domain registrar or DNS provider",
  "A list of email accounts on the domain, if any",
  "A preferred time for the final switch-over",
];

const migrationSteps: { title: string; description: string; duration: Spec }[] = [
  { title: "Review", description: "We check your current site, databases and DNS records.", duration: TODO_CONFIRM },
  { title: "Copy", description: "Files and databases are copied to SpeedHost360.", duration: TODO_CONFIRM },
  { title: "Test", description: "You check the copied site on our servers before anything switches.", duration: TODO_CONFIRM },
  { title: "Switch DNS", description: "We point your domain at the new server to minimise downtime.", duration: TODO_CONFIRM },
  { title: "Monitor", description: "We watch the site after the move and fix anything that surfaces.", duration: TODO_CONFIRM },
];

export function MigrationChecklist() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Migration checklist</Eyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
            Moving from another host? Included on every plan.
          </h2>
          <p className="mt-6 text-sm font-medium text-ink">What we need from you</p>
          <ul className="mt-3 space-y-2.5">
            {migrationNeeds.map((n) => (
              <li key={n} className="flex items-start gap-2 text-sm text-ink-muted">
                <Check size={15} className="mt-0.5 shrink-0 text-signal" />
                {n}
              </li>
            ))}
          </ul>
        </div>
        <ol className="space-y-5 border-l border-line-strong pl-6">
          {migrationSteps.map((step, index) => (
            <li key={step.title}>
              <p className="font-mono text-xs uppercase tracking-[0.06em] text-signal">
                Step {index + 1} · <SpecValue value={step.duration} />
              </p>
              <p className="mt-1 text-base font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
