import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { galleryItems } from "@/lib/data/gallery";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RevealOnScroll } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "Before and after — a side-by-side look at real SpeedHost360 website projects. Drag to compare.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Gallery", path: "/gallery" }]} />
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Gallery</p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Before &amp; after.
            </h1>
            <p className="mt-4 max-w-lg text-sm text-ink-muted">
              Drag the divider (or tap and drag on mobile) to compare each project.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {galleryItems.map((item, index) => (
              <RevealOnScroll key={item.id} delay={index * 0.06} className="relative">
                <PlaceholderTag />
                <BeforeAfterSlider beforeAlt={item.beforeAlt} afterAlt={item.afterAlt} />
                <p className="mt-3 text-sm text-ink-muted">{item.projectName}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
