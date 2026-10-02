import { KeyRound, ShieldCheck, LogOut } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/reveal";

// POLICY (TODO_CONFIRM): the ownership and exit statements below are the
// standard terms we'd expect to offer, but must be confirmed by the
// business before launch. Keep them in sync with the FAQ answer in
// lib/data/faq.ts ("Who owns my website and data...").
const points = [
  {
    icon: KeyRound,
    title: "You own it",
    body: "Your domain, your content and your data belong to you, not to us.",
  },
  {
    icon: ShieldCheck,
    title: "Protected by default",
    body: "SSL, security hardening, regular patching and daily backups on every hosting plan.",
  },
  {
    icon: LogOut,
    title: "Easy to leave",
    body: "Moving on? We hand over your files, a database export and DNS details.",
  },
];

export function DataOwnership() {
  return (
    <section aria-labelledby="ownership-heading" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <RevealOnScroll>
          <h2
            id="ownership-heading"
            className="font-mono text-xs uppercase tracking-[0.08em] text-signal"
          >
            Security and data ownership
          </h2>
        </RevealOnScroll>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {points.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-line-strong text-signal">
                <Icon size={16} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
