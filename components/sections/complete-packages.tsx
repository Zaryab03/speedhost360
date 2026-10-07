import { Check, Globe, Mail, Megaphone, MonitorSmartphone, Server, type LucideIcon } from "lucide-react";
import {
  completePackages,
  packagePriceLabel,
  packageRenewal,
  PACKAGE_SERVICE,
} from "@/lib/data/packages";
import { PlanCtas } from "@/components/sections/plan-ctas";
import { SpecValue } from "@/components/ui/spec-value";
import { RevealOnScroll } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function includeIcon(line: string): LucideIcon {
  const l = line.toLowerCase();
  if (l.includes("domain")) return Globe;
  if (l.includes("hosting")) return Server;
  if (l.includes("website")) return MonitorSmartphone;
  if (l.includes("email")) return Mail;
  if (l.includes("marketing")) return Megaphone;
  return Check;
}

export function CompletePackages({ location }: { location: string }) {
  return (
    <section id="packages" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Complete packages</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Everything your business needs online, in one package.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
            Domain, hosting, website and business email set up together by one team, at one price.
            No juggling separate providers.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {completePackages.map((pkg, index) => {
            const label = pkg.highlighted ? "Recommended" : pkg.badge;
            return (
              <RevealOnScroll
                key={pkg.slug}
                delay={index * 0.06}
                className={cn(
                  "group relative flex h-full flex-col rounded-[var(--radius-lg)] border bg-paper-raised p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]",
                  pkg.highlighted
                    ? "border-signal shadow-[0_0_0_1px_var(--signal),0_24px_48px_-28px_color-mix(in_srgb,var(--signal)_60%,transparent)]"
                    : "border-line hover:border-signal/60",
                )}
              >
                {label && (
                  <span
                    className={cn(
                      "absolute -top-3 left-7 px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em]",
                      pkg.highlighted ? "bg-signal text-signal-ink" : "border border-line-strong bg-paper-raised text-ink",
                    )}
                  >
                    {label}
                  </span>
                )}

                <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{pkg.name}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{packagePriceLabel(pkg)}</p>
                <p className="mt-2 text-sm text-ink-muted">{pkg.tagline}</p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                  {pkg.includes.map((line) => {
                    const Icon = includeIcon(line);
                    return (
                      <li key={line} className="flex items-center gap-3 text-sm text-ink">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-signal-soft text-signal transition-transform duration-300 group-hover:scale-110">
                          <Icon size={15} aria-hidden />
                        </span>
                        {line}
                      </li>
                    );
                  })}
                </ul>

                <PlanCtas
                  className="mt-8"
                  primary={pkg.highlighted}
                  location={location}
                  noun="complete package"
                  plan={{
                    slug: pkg.slug,
                    name: pkg.name,
                    service: PACKAGE_SERVICE,
                    priceLabel: packagePriceLabel(pkg),
                  }}
                />
              </RevealOnScroll>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          Pricing shown in PKR. Renewal for domain, hosting and email after the first year:{" "}
          <SpecValue value={packageRenewal} />. Need something different? Choose individual services or ask
          us for a custom bundle.
        </p>
      </div>
    </section>
  );
}
