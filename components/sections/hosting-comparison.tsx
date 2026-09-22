import { Check, Minus } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/reveal";

type Row = {
  label: string;
  us: string;
  them: string;
};

const rows: Row[] = [
  {
    label: "Pricing",
    us: "Flat PKR price, confirmed before you sign up",
    them: "Discounted intro rate requires prepaying up to 48 months; renews 3–4× higher after that",
  },
  {
    label: "Billing currency",
    us: "Local PKR, no exchange-rate risk",
    them: "Billed in USD",
  },
  {
    label: "Setup & migration",
    us: "Migration handled for you as part of onboarding",
    them: "Self-service; you run the migration tools yourself",
  },
  {
    label: "Server management",
    us: "Security hardening, monitoring and backups actively managed by our team",
    them: "Shared environment; hardening and tuning are on you",
  },
  {
    label: "Support",
    us: "Direct WhatsApp line to a team that knows your setup",
    them: "24/7 live chat routed through a general ticket queue",
  },
  {
    label: "Who builds the site",
    us: "Same team that hosts it, so build and infrastructure decisions stay connected",
    them: "Hosting only; you bring your own developer or DIY builder",
  },
];

export function HostingComparison() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
            How we compare
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            SpeedHost360 vs. a generic discount host.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            We used Hostinger&rsquo;s shared hosting plans as the reference point since
            they&rsquo;re one of the most-searched budget options. The short version: their
            sticker price looks lower until you hit the renewal, the currency conversion, or the
            first thing that needs a human to fix it.
          </p>
        </RevealOnScroll>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line-strong text-left">
                <th className="py-3 pr-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                  &nbsp;
                </th>
                <th className="py-3 pr-4 font-mono text-xs uppercase tracking-[0.06em] text-signal">
                  SpeedHost360
                </th>
                <th className="py-3 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                  Hostinger (shared hosting)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-line align-top">
                  <td className="py-4 pr-4 font-medium text-ink">{row.label}</td>
                  <td className="py-4 pr-4 text-ink-muted">
                    <span className="flex items-start gap-2">
                      <Check size={15} className="mt-0.5 shrink-0 text-signal" />
                      {row.us}
                    </span>
                  </td>
                  <td className="py-4 text-ink-muted">
                    <span className="flex items-start gap-2">
                      <Minus size={15} className="mt-0.5 shrink-0 text-ink-muted/60" />
                      {row.them}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-muted">
          Hostinger figures are from their publicly listed international plans (Premium, Unlimited
          and Cloud Startup) as published on hostinger.com, checked September 2026; Hostinger
          doesn&rsquo;t publish separate PKR pricing, and promotional rates change often, so
          confirm their current pricing directly before relying on it. This isn&rsquo;t a
          like-for-like plan match; it&rsquo;s here to show what you&rsquo;re actually paying for
          beyond the sticker price.
        </p>
      </div>
    </section>
  );
}
