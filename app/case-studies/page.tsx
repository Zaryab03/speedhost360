import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/data/case-studies";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { EmptyWorkState } from "@/components/sections/empty-work-state";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "How SpeedHost360 clients solved real website, hosting and marketing problems: the problem, what we did, and verified results.",
  path: "/case-studies",
  noIndex: caseStudies.length === 0,
});

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Case Studies", path: "/case-studies" }]} />
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Case studies</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Problem, solution, results.
          </h1>

          <div className="mt-12">
            {caseStudies.length === 0 ? (
              <EmptyWorkState what="case studies" />
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2">
                {caseStudies.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="focus-ring group flex h-full flex-col border border-line hover:border-signal"
                    >
                      {c.image && (
                        <Image
                          src={c.image.src}
                          alt={c.image.alt}
                          width={1200}
                          height={675}
                          className="aspect-video w-full object-cover"
                        />
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                          {c.industry} · {c.services.join(", ")}
                        </p>
                        <h2 className="mt-2 flex items-center justify-between gap-2 text-xl font-semibold text-ink group-hover:text-signal">
                          {c.clientName}
                          <ArrowUpRight size={18} aria-hidden />
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.summary}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
