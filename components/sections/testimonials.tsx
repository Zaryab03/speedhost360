import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { RevealOnScroll } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** "Role, Company" → { role, company }. Splits on the first comma only. */
function splitRole(role: string) {
  const i = role.indexOf(",");
  return i === -1
    ? { role, company: "" }
    : { role: role.slice(0, i).trim(), company: role.slice(i + 1).trim() };
}

function Author({ testimonial, large }: { testimonial: Testimonial; large?: boolean }) {
  // The featured card is dark in both themes, so its text uses paper tones.
  const { role, company } = splitRole(testimonial.role);

  return (
    <div className={cn("mt-8 flex items-center gap-4 border-t pt-5", large ? "border-white/15" : "border-line")}>
      {testimonial.photo ? (
        <Image
          src={testimonial.photo.src}
          alt={testimonial.photo.alt}
          width={48}
          height={48}
          className={cn("shrink-0 rounded-full object-cover ring-2 ring-signal/40", large ? "size-12" : "size-10")}
        />
      ) : (
        <span
          aria-hidden
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-signal to-[color-mix(in_srgb,var(--signal)_55%,var(--ink))] font-semibold text-signal-ink ring-4 ring-signal-soft",
            large ? "size-12 text-base" : "size-10 text-sm",
          )}
        >
          {initials(testimonial.name)}
        </span>
      )}
      <div className="min-w-0">
        <p className={cn("font-semibold", large ? "text-white" : "text-ink")}>{testimonial.name}</p>
        <p className={cn("text-sm", large ? "text-white/60" : "text-ink-muted")}>
          {role}
          {company && (
            <>
              {" · "}
              <span className={large ? "text-white" : "text-ink"}>{company}</span>
            </>
          )}
        </p>
      </div>
      {testimonial.logo && (
        <Image
          src={testimonial.logo.src}
          alt={testimonial.logo.alt}
          width={96}
          height={32}
          className="ml-auto h-6 w-auto object-contain"
        />
      )}
    </div>
  );
}

function TestimonialCard({ testimonial, featured }: { testimonial: Testimonial; featured?: boolean }) {
  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-signal/60 hover:shadow-[var(--shadow-card)] sm:p-8",
        featured
          ? "border-[#1f2429] bg-[#13161a] bg-[radial-gradient(circle_at_85%_0%,color-mix(in_srgb,var(--signal)_28%,transparent),transparent_55%)] sm:p-10"
          : "border-line bg-paper-raised",
      )}
    >
      {testimonial.isPlaceholder && <PlaceholderTag />}

      {/* Accent bar that grows on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100"
      />
      {/* Oversized watermark quote */}
      <Quote
        aria-hidden
        size={featured ? 140 : 96}
        strokeWidth={0}
        fill="currentColor"
        className={cn(
          "pointer-events-none absolute -right-3 -top-4 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
          featured ? "text-signal/20" : "text-signal/[0.07]",
        )}
      />

      <span
        aria-hidden
        className={cn(
          "flex size-10 items-center justify-center rounded-full",
          featured ? "bg-signal text-signal-ink" : "bg-signal-soft text-signal",
        )}
      >
        <Quote size={18} fill="currentColor" strokeWidth={0} />
      </span>

      <blockquote
        className={cn(
          "relative mt-6 flex flex-1 leading-relaxed",
          featured
            ? "items-center text-2xl font-medium text-white sm:text-3xl sm:leading-snug"
            : "text-base text-ink sm:text-lg",
        )}
      >
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      {testimonial.result && (
        <p className="relative mt-6 inline-flex items-center gap-2 self-start rounded-full bg-signal-soft px-3 py-1 text-sm font-medium text-ink">
          <span className="size-1.5 rounded-full bg-signal" aria-hidden />
          {testimonial.result}
        </p>
      )}

      <figcaption>
        <Author testimonial={testimonial} large={featured} />
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;
  const [featured, ...rest] = testimonials;

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      {/* Soft signal glow behind the grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-signal/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <RevealOnScroll className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">In their words</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What our clients say about working with us.
          </h2>
          <p className="mt-4 text-ink-muted">
            Hosting, email and websites for businesses that need them to just work.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <RevealOnScroll className="lg:col-span-3">
            <TestimonialCard testimonial={featured} featured />
          </RevealOnScroll>

          {rest.length > 0 && (
            <div className="grid gap-6 lg:col-span-2">
              {rest.map((testimonial, index) => (
                <RevealOnScroll key={testimonial.name + index} delay={(index + 1) * 0.08}>
                  <TestimonialCard testimonial={testimonial} />
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
