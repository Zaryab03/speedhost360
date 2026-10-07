import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data/case-studies";
import { RevealOnScroll } from "@/components/motion/reveal";

export function RecentWork() {
  if (caseStudies.length === 0) return null;

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Recent work</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Businesses we build and host for.
            </h2>
            <Link
              href="/case-studies"
              className="focus-ring inline-flex items-center gap-1.5 text-sm text-ink hover:text-signal"
            >
              All case studies <ArrowUpRight size={16} aria-hidden />
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((c, index) => (
            <RevealOnScroll key={c.slug} delay={index * 0.06} className="h-full">
              <Link
                href={`/case-studies/${c.slug}`}
                className="focus-ring group flex h-full flex-col border border-line p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-[var(--shadow-card)]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                  {c.industry}
                  {c.location && ` · ${c.location}`}
                </p>
                <h3 className="mt-2 flex items-center justify-between gap-2 text-xl font-semibold text-ink group-hover:text-signal">
                  {c.clientName}
                  <ArrowUpRight size={18} aria-hidden />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{c.summary}</p>
                <p className="mt-4 text-xs text-ink-muted">{c.services.join(" · ")}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
