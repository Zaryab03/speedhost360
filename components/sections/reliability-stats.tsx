import { Activity, ShieldCheck, DatabaseBackup, Globe } from "lucide-react";
import { reliabilityStats } from "@/lib/data/trust";
import { RevealOnScroll } from "@/components/motion/reveal";

const icons = [Activity, DatabaseBackup, Globe, ShieldCheck];

export function ReliabilityStats() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {reliabilityStats.map((stat, index) => {
            const Icon = icons[index];
            return (
              <RevealOnScroll key={stat.label} delay={index * 0.05} className="flex gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-line-strong text-signal">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-ink">{stat.value}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{stat.label}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
