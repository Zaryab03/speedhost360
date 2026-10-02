import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AuditForm } from "@/components/forms/audit-form";

export const metadata: Metadata = buildMetadata({
  title: "Free Website Audit",
  description:
    "Request a free website audit from SpeedHost360: speed, SEO, design, security and conversions reviewed, with a short list of what to fix first.",
  path: "/free-website-audit",
});

const checks = [
  "Speed and Core Web Vitals",
  "Search visibility and on-page SEO",
  "Mobile layout and design",
  "Contact paths and enquiry forms",
  "SSL, security headers and hosting setup",
];

export default function FreeAuditPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Free Website Audit", path: "/free-website-audit" }]} />
      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Free website audit</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Find out what to fix first.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Tell us your website and what you want to improve. We&rsquo;ll review it and email
              you a short, prioritised list. No cost and no obligation to work with us.
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
              What we look at
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink">
              {checks.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="border border-line p-6">
            <AuditForm location="audit_page" />
          </div>
        </div>
      </section>
    </>
  );
}
