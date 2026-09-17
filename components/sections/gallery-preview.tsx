import { galleryItems } from "@/lib/data/gallery";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { RevealOnScroll } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function GalleryPreview() {
  return (
    <section className="border-b border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Gallery</p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Before &amp; after.
            </h2>
          </div>
          <Button href="/gallery" variant="secondary">
            View Full Gallery
          </Button>
        </RevealOnScroll>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {galleryItems.map((item, index) => (
            <RevealOnScroll key={item.id} delay={index * 0.08} className="relative">
              <PlaceholderTag />
              <BeforeAfterSlider beforeAlt={item.beforeAlt} afterAlt={item.afterAlt} />
              <p className="mt-3 text-sm text-ink-muted">{item.projectName}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
