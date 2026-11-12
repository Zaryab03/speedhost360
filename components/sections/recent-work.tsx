import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/data/case-studies";
import { RevealOnScroll } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

// Preview tones for projects that have no real screenshot yet. Add
// `image: { src, alt }` to a case study in lib/data/case-studies.ts and the
// screenshot replaces the composition automatically.
const tones = [
  { surface: "bg-signal-soft", mark: "text-signal/25", text: "text-ink", chip: "border-ink/15 text-ink/70" },
  { surface: "bg-ink", mark: "text-paper/10", text: "text-paper", chip: "border-paper/20 text-paper/70" },
  { surface: "bg-line", mark: "text-ink/10", text: "text-ink", chip: "border-ink/15 text-ink/70" },
  { surface: "bg-paper-raised", mark: "text-signal/20", text: "text-ink", chip: "border-line-strong text-ink-muted" },
];

function monogram(name: string) {
  return name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function hostOf(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function Preview({ study, index }: { study: CaseStudy; index: number }) {
  if (study.image) {
    return (
      <Image
        src={study.image.src}
        alt={study.image.alt}
        fill
        sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    );
  }

  const tone = tones[index % tones.length];
  const host = hostOf(study.liveUrl);
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 flex flex-col transition-transform duration-700 ease-out group-hover:scale-105",
        tone.surface,
        tone.text,
      )}
    >
      {/* Browser chrome: the real domain only, no invented page content. */}
      <div className="flex items-center gap-1.5 px-4 pt-4">
        <span className="size-2 rounded-full bg-current opacity-20" />
        <span className="size-2 rounded-full bg-current opacity-20" />
        <span className="size-2 rounded-full bg-current opacity-20" />
        {host && (
          <span className="ml-3 truncate rounded-full border border-current/15 px-3 py-0.5 font-mono text-[0.6875rem] opacity-70">
            {host}
          </span>
        )}
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <span className={cn("select-none font-semibold leading-none tracking-tighter text-[clamp(7rem,22vw,11rem)] lg:text-[11rem]", tone.mark)}>
          {monogram(study.clientName)}
        </span>
      </div>

      {study.stack && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-4">
          {study.stack.slice(0, 3).map((s) => (
            <span key={s} className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[0.6875rem]", tone.chip)}>
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function RecentWork() {
  if (caseStudies.length === 0) return null;

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Selected work</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <h2 className="max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Digital experiences built for real businesses.
            </h2>
            <Link
              href="/case-studies"
              className="focus-ring group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal"
            >
              View All Projects
              <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            From business websites and hosting infrastructure to complete digital solutions, explore
            some of the work we&rsquo;ve delivered.
          </p>
        </RevealOnScroll>

        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {caseStudies.slice(0, 4).map((c, index) => (
            <li key={c.slug}>
              <RevealOnScroll delay={(index % 2) * 0.06} className="h-full">
                <Link href={`/case-studies/${c.slug}`} className="focus-ring group block">
                  <div className="relative aspect-video overflow-hidden rounded-[var(--radius-sm)] border border-line">
                    <Preview study={c} index={index} />
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-muted">
                        {c.industry}
                        {c.location && ` · ${c.location}`}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-signal">
                        {c.clientName}
                      </h3>
                    </div>
                    <ArrowUpRight
                      size={22}
                      aria-hidden
                      className="mt-5 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                    />
                  </div>

                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{c.summary}</p>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services delivered">
                    {c.services.map((s) => (
                      <li key={s} className="rounded-full bg-line/60 px-2.5 py-1 text-xs text-ink-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Link>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
