import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceList } from "@/lib/data/services";
import { RevealOnScroll } from "@/components/motion/reveal";

export function ServiceGrid() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Services</p>
          <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Four services. One accountable team.
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {serviceList.map((service, index) => (
            <RevealOnScroll key={service.slug} delay={index * 0.05} className="bg-paper">
              <Link
                href={`/services/${service.slug}`}
                className="focus-ring group flex h-full flex-col justify-between p-8 transition-colors hover:bg-paper-raised"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                    {service.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {service.subheadline}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-signal">
                  Learn more
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
