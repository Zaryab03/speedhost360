import { Quote } from "lucide-react";
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

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <RevealOnScroll
              key={testimonial.name + index}
              delay={index * 0.06}
              className="group relative flex h-full flex-col border-l-2 border-signal bg-paper py-5 pl-6 pr-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              {testimonial.isPlaceholder && <PlaceholderTag />}
              <Quote
                size={28}
                className="text-signal/30 transition-transform duration-300 group-hover:scale-110 group-hover:text-signal/50"
                fill="currentColor"
                strokeWidth={0}
              />
              <p className="mt-3 flex-1 text-lg leading-relaxed text-ink">
                {testimonial.quote}
              </p>
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
