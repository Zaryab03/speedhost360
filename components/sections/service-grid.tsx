import Link from "next/link";
import { ArrowRight, Code2, Mail, Megaphone, Server, ServerCog, type LucideIcon } from "lucide-react";
import { serviceList, type ServiceSlug } from "@/lib/data/services";
import { RevealOnScroll } from "@/components/motion/reveal";

// Card copy lives here (not in services.ts) so the homepage summary can be
// tighter than each service page's own headline.
const cardCopy: Record<ServiceSlug, { title: string; description: string; icon: LucideIcon }> = {
  "web-development": {
    title: "Website Development",
    description:
      "Corporate websites, online stores, landing pages and custom web applications built for performance, usability and business growth.",
    icon: Code2,
  },
  "web-hosting": {
    title: "Web Hosting",
    description:
      "Reliable web hosting with SSL security, backups, server protection and performance-focused infrastructure.",
    icon: Server,
  },
  "managed-hosting": {
    title: "Managed Hosting",
    description:
      "Server administration, security updates, monitoring, backups and ongoing infrastructure management.",
    icon: ServerCog,
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description:
      "SEO, content strategy, social media management and paid advertising to help businesses reach and convert customers.",
    icon: Megaphone,
  },
  "business-email": {
    title: "Business Email Hosting",
    description:
      "Professional domain-based business email with secure access, spam protection and technical support.",
    icon: Mail,
  },
};

export function ServiceGrid() {
  return (
    <section id="services" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Services</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Everything your business needs to succeed online.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            From building your website to managing the infrastructure behind it, we provide the
            technology and ongoing support to keep your business moving.
          </p>
        </RevealOnScroll>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceList.map((service, index) => {
            const copy = cardCopy[service.slug];
            const Icon = copy.icon;
            const number = String(index + 1).padStart(2, "0");
            return (
              <li key={service.slug}>
                <RevealOnScroll delay={index * 0.05} className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="focus-ring group relative flex h-full min-h-[18rem] flex-col rounded-[var(--radius-md)] border border-line bg-paper-raised p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-[var(--shadow-card)]"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-line-strong text-ink transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-signal-ink">
                        <Icon size={20} strokeWidth={1.5} aria-hidden />
                      </span>
                      <span className="font-mono text-sm tracking-[0.08em] text-ink-muted transition-colors group-hover:text-signal">
                        {number}
                      </span>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold tracking-tight text-ink">{copy.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{copy.description}</p>

                    <span className="mt-8 flex items-center gap-2 border-t border-line pt-5 text-sm font-medium text-ink transition-colors group-hover:text-signal">
                      Explore Service
                      <ArrowRight
                        size={16}
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </RevealOnScroll>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
