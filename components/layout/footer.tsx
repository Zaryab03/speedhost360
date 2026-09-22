"use client";

import Link from "next/link";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { serviceLinks, footerLegalLinks } from "@/lib/data/nav";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-mono text-sm font-semibold tracking-[0.04em] text-ink">
              SPEEDHOST360
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.description}
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.06em] text-signal">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
              Services
            </p>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="focus-ring text-sm text-ink hover:text-signal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="focus-ring text-sm text-ink hover:text-signal">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="focus-ring text-sm text-ink hover:text-signal">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="focus-ring text-sm text-ink hover:text-signal">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink">
              <li>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { location: "footer" })}
                  className="focus-ring flex items-center gap-2 hover:text-signal"
                >
                  <MessageCircle size={15} /> {siteConfig.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneNumber}`}
                  onClick={() => trackEvent("phone_click", { location: "footer" })}
                  className="focus-ring flex items-center gap-2 hover:text-signal"
                >
                  <Phone size={15} /> {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="focus-ring flex items-center gap-2 hover:text-signal"
                >
                  <Mail size={15} /> {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-ink-muted">
                <Clock size={15} className="mt-0.5 shrink-0" />
                <span>
                  {siteConfig.hours.days}
                  <br />
                  {siteConfig.hours.time} ({siteConfig.hours.timezone})
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-5">
            {footerLegalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="focus-ring hover:text-signal">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
