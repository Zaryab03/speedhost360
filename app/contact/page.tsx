import type { Metadata } from "next";
import { Suspense } from "react";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/data/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a website, hosting or digital marketing project with SpeedHost360. We respond to new inquiries within 1 business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_22rem]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Contact</p>
            <h1 className="mt-3 max-w-lg text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Let&rsquo;s build it.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
              {siteConfig.responseTimePromise}
            </p>

            <div className="mt-10">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-8 lg:pt-24">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                Reach us directly
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink">
                <li>
                  <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex items-center gap-2.5 hover:text-signal"
                  >
                    <MessageCircle size={16} /> {siteConfig.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${siteConfig.phoneNumber}`}
                    className="focus-ring flex items-center gap-2.5 hover:text-signal"
                  >
                    <Phone size={16} /> {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="focus-ring flex items-center gap-2.5 hover:text-signal"
                  >
                    <Mail size={16} /> {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-line pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                Opening Hours
              </p>
              <div className="mt-4 flex items-start gap-2.5 text-sm text-ink">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <span>
                  {siteConfig.hours.days}
                  <br />
                  {siteConfig.hours.time}
                  <br />
                  <span className="text-ink-muted">{siteConfig.hours.timezone}</span>
                </span>
              </div>
            </div>

            <div className="border-t border-line pt-6 text-xs leading-relaxed text-ink-muted">
              {siteConfig.responseTimePromise}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
