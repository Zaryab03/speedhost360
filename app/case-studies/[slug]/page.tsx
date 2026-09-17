import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/data/case-studies";
import { services } from "@/lib/data/services";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

function getStudy(slug: string) {
  return caseStudies.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return buildMetadata({ title: "Case Study", description: "", path: `/case-studies/${slug}`, noIndex: true });

  return buildMetadata({
    title: study.projectName,
    description: `${study.projectName} — ${study.industry}. ${study.challenge}`.slice(0, 155),
    path: `/case-studies/${slug}`,
    // Placeholder projects are not indexed until real content replaces them.
    noIndex: study.isPlaceholder,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Case Studies", path: "/case-studies" },
          { name: study.projectName, path: `/case-studies/${slug}` },
        ]}
      />

      <section className="border-b border-line">
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <PlaceholderTag />
          <div className="flex flex-wrap gap-2">
            {study.services.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {study.projectName}
          </h1>
          <p className="mt-2 text-sm text-ink-muted">{study.industry}</p>

          <div className="mt-10 aspect-video border border-line bg-paper-raised" />
          <p className="mt-2 text-xs text-ink-muted">{study.gallery[0]?.alt}</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
                Challenge
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{study.challenge}</p>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
                Solution
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{study.solution}</p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
              Technology
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {study.technology.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-10 border border-line-strong bg-paper-raised p-5 text-sm text-ink-muted">
            {study.resultsNote}
          </div>

          <div className="mt-12">
            <Button href="/contact">Start a Project Like This</Button>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
            Related services
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            {study.services
              .map((label) => Object.values(services).find((s) => s.title === label || s.navLabel === label))
              .filter((s): s is (typeof services)[keyof typeof services] => Boolean(s))
              .map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="focus-ring border border-line-strong px-4 py-2 text-sm text-ink hover:border-signal hover:text-signal"
                >
                  {service.navLabel} →
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
