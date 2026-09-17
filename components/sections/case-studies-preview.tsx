import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data/case-studies";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { Badge } from "@/components/ui/badge";
import { RevealOnScroll } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function CaseStudiesPreview() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
              Case Studies
            </p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Real projects, honestly documented.
            </h2>
          </div>
          <Button href="/case-studies" variant="secondary">
            View All Case Studies
          </Button>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {caseStudies.slice(0, 3).map((study, index) => (
            <RevealOnScroll key={study.slug} delay={index * 0.06}>
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
                <h3 className="mt-4 text-lg font-semibold text-ink">{study.projectName}</h3>
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
  );
}
