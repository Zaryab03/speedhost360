import { testimonials } from "@/lib/data/testimonials";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { RevealOnScroll } from "@/components/motion/reveal";

export function Testimonials() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
            In their words
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <RevealOnScroll
              key={testimonial.name + index}
              delay={index * 0.06}
              className="relative border-l-2 border-signal py-2 pl-6"
            >
              {testimonial.isPlaceholder && <PlaceholderTag />}
              <p className="text-xl leading-relaxed text-ink">“{testimonial.quote}”</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                {testimonial.name}, {testimonial.role}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
