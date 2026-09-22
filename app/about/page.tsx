import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RevealOnScroll } from "@/components/motion/reveal";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { Button } from "@/components/ui/button";
import { yearsInBusiness } from "@/lib/data/trust";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "SpeedHost360 builds, hosts and grows business websites under one accountable team. Here's why we exist and how we work.",
  path: "/about",
});

const values = [
  {
    title: "Own the whole stack",
    description:
      "A website, its hosting and its growth are one problem, not three vendors. We treat them that way.",
  },
  {
    title: "Say what's actually true",
    description:
      "No fabricated stats, no guaranteed rankings, no invented reviews. If we don't know, we say so.",
  },
  {
    title: "Build for the long run",
    description:
      "Fast, secure, maintainable work: the kind that's still easy to work with a year from now.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">About</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Build. Host. Grow.
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
              {yearsInBusiness}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              SpeedHost360 exists because those three things are usually handled by three
              different vendors who don&rsquo;t talk to each other: a developer who hands off
              and disappears, a host who only sells server space, and a marketer working against
              a site they didn&rsquo;t build and don&rsquo;t control. We do all three under one
              roof, so decisions in one area account for the other two.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
              How we work
            </p>
          </RevealOnScroll>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {values.map((value, index) => (
              <RevealOnScroll key={value.title} delay={index * 0.06}>
                <h3 className="text-base font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{value.description}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Team</p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              The people behind SpeedHost360.
            </h2>
          </RevealOnScroll>

          <div className="relative mt-10 flex aspect-[16/7] w-full items-center justify-center border border-line bg-paper-raised">
            <PlaceholderTag />
            <p className="max-w-sm px-6 text-center text-sm text-ink-muted">
              [Real team photo goes here, replace before launch. No AI-generated or stock
              people.]
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <RevealOnScroll>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Want to work with us?
            </h2>
            <div className="mt-6">
              <Button href="/contact" pulse>Start a Project</Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
