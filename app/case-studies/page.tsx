import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/data/case-studies";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { RevealOnScroll } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Real SpeedHost360 projects — the challenge, the solution, and what was actually built. No fabricated results.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Case Studies", path: "/case-studies" }]} />
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
              Case Studies
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Real projects, honestly documented.
            </h1>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <RevealOnScroll key={study.slug} delay={index * 0.05}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="focus-ring group relative block h-full border border-line p-6 hover:border-line-strong"
                >
                  <PlaceholderTag />
                  <div className="flex flex-wrap gap-2">
                    {study.services.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-ink">{study.projectName}</h2>
                  <p className="mt-2 text-sm text-ink-muted">{study.industry}</p>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-signal">
                    Read case study
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
