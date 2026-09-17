import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { serviceList } from "@/lib/data/services";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RevealOnScroll } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Web development, web hosting, managed hosting and digital marketing — four services, one accountable team at SpeedHost360.",
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Services</p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Everything a website needs to work, hosted right, and marketed well.
            </h1>
          </RevealOnScroll>

          <div className="mt-14 divide-y divide-line border-y border-line">
            {serviceList.map((service, index) => (
              <RevealOnScroll key={service.slug} delay={index * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="focus-ring group grid gap-3 py-8 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-8"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                    {service.eyebrow}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-ink group-hover:text-signal">
                      {service.title}
                    </h2>
                    <p className="mt-1 max-w-xl text-sm text-ink-muted">{service.subheadline}</p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="hidden shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal sm:block"
                  />
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
