import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return buildMetadata({
    title: `${study.clientName} Case Study`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Case Studies", path: "/case-studies" },
          { name: study.clientName, path: `/case-studies/${study.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
          {study.industry} · {study.services.join(", ")}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{study.clientName}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{study.summary}</p>

        {(study.location || study.stack?.length) && (
          <dl className="mt-8 grid gap-4 border-y border-line py-5 sm:grid-cols-2">
            {study.location && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">Based in</dt>
                <dd className="mt-1 text-ink">{study.location}</dd>
              </div>
            )}
            {study.stack && study.stack.length > 0 && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">Built with</dt>
                <dd className="mt-1 text-ink">{study.stack.join(", ")}</dd>
              </div>
            )}
          </dl>
        )}

        {study.image && (
          <Image
            src={study.image.src}
            alt={study.image.alt}
            width={1200}
            height={675}
            className="mt-10 w-full border border-line"
          />
        )}

        <h2 className="mt-12 text-xl font-semibold text-ink">The problem</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{study.problem}</p>

        <h2 className="mt-10 text-xl font-semibold text-ink">What we did</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{study.solution}</p>

        {study.results.length > 0 && (
          <>
            <h2 className="mt-10 text-xl font-semibold text-ink">Results</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {study.results.map((r) => (
                <div key={r.label} className="border-t border-line-strong pt-3">
                  <dt className="text-sm text-ink-muted">{r.label}</dt>
                  <dd className="mt-1 text-xl font-semibold text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-4">
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 text-sm text-ink hover:text-signal"
            >
              Visit the live site <ExternalLink size={14} aria-hidden />
            </a>
          )}
          <Button href="/contact">Start a Similar Project</Button>
        </div>
      </article>
    </>
  );
}
