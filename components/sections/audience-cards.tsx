"use client";

import Link from "next/link";
import { ArrowUpRight, Globe, Server, TrendingUp, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const audiences = [
  {
    label: "I need a website",
    description: "Business sites, online stores and custom web apps.",
    href: "/services/web-development",
    icon: Globe,
  },
  {
    label: "I need better hosting",
    description: "Compare plans, migrate for free, stop worrying about downtime.",
    href: "/services/web-hosting#compare-plans",
    icon: Server,
  },
  {
    label: "I need leads",
    description: "SEO, content and campaigns tied to real enquiries.",
    href: "/services/digital-marketing",
    icon: TrendingUp,
  },
  {
    label: "I need business email",
    description: "you@yourbusiness.com, set up within a day.",
    href: "/services/business-email",
    icon: Mail,
  },
];

export function AudienceCards() {
  return (
    <section aria-labelledby="audience-heading" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2
          id="audience-heading"
          className="font-mono text-xs uppercase tracking-[0.08em] text-signal"
        >
          Where do you want to start?
        </h2>
        <ul className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ label, description, href, icon: Icon }) => (
            <li key={href} className="bg-paper">
              <Link
                href={href}
                onClick={() => trackEvent("audience_card_click", { audience: label })}
                className="focus-ring group flex h-full flex-col p-6 transition-colors hover:bg-paper-raised"
              >
                <Icon size={20} className="text-signal" aria-hidden />
                <span className="mt-4 flex items-center justify-between gap-2 text-base font-semibold text-ink group-hover:text-signal">
                  {label}
                  <ArrowUpRight size={16} aria-hidden className="shrink-0" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
