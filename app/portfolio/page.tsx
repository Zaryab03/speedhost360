import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { portfolioItems } from "@/lib/data/portfolio";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { EmptyWorkState } from "@/components/sections/empty-work-state";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description: "Live websites built and hosted by SpeedHost360.",
  path: "/portfolio",
  noIndex: portfolioItems.length === 0,
});

export default function PortfolioPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Portfolio", path: "/portfolio" }]} />
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Portfolio</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Sites we&rsquo;ve built and host.
          </h1>

          <div className="mt-12">
            {portfolioItems.length === 0 ? (
              <EmptyWorkState what="portfolio projects" />
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item) => (
                  <li key={item.liveUrl} className="flex flex-col border border-line">
                    {item.image && (
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={1200}
                        height={750}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-lg font-semibold text-ink">{item.name}</h2>
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                        {item.services.join(", ")}
                      </p>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-ring inline-flex items-center gap-1.5 text-ink hover:text-signal"
                        >
                          Live site <ExternalLink size={14} aria-hidden />
                        </a>
                        {item.caseStudySlug && (
                          <Link
                            href={`/case-studies/${item.caseStudySlug}`}
                            className="focus-ring text-ink hover:text-signal"
                          >
                            Read the case study
                          </Link>
                        )}
                      </div>
                    </div>
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
