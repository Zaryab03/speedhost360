import { Clock, ShieldCheck, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/data/site";

const points = [
  {
    icon: Clock,
    title: "1 business day response",
    description: siteConfig.responseTimePromise,
  },
  {
    icon: Wrench,
    title: "One team, whole stack",
    description: "Build, hosting and marketing handled by people who talk to each other.",
  },
  {
    icon: ShieldCheck,
    title: "Straightforward pricing",
    description: "Published starting prices, no hidden setup fees sprung on you later.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-b border-line bg-paper-raised">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        {points.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex gap-4">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-line-strong text-signal">
              <Icon size={16} />
            </span>
            <div>
              <p className="text-sm font-medium text-ink">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
