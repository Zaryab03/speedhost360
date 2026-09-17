import { RevealOnScroll } from "@/components/motion/reveal";

const stages = [
  {
    step: "01",
    title: "Build",
    description:
      "A business needs a digital presence — designed with intent, built to load fast, structured to be found.",
  },
  {
    step: "02",
    title: "Host",
    description:
      "That presence needs infrastructure it can rely on: SSL, backups, and a server that's actually monitored.",
  },
  {
    step: "03",
    title: "Manage",
    description:
      "Infrastructure needs upkeep — security patching, performance tuning, and someone watching it, not just renting it to you.",
  },
  {
    step: "04",
    title: "Grow",
    description:
      "Traffic on its own isn't the goal. It needs to become engagement, then leads, then customers.",
  },
];

export function BuildHostGrow() {
  return (
    <section className="border-b border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
            How it fits together
          </p>
          <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            The SpeedHost360 narrative.
          </h2>
        </RevealOnScroll>

        <div className="mt-14 divide-y divide-line border-t border-line">
          {stages.map((stage, index) => (
            <RevealOnScroll key={stage.step} delay={index * 0.06}>
              <div className="grid gap-3 py-8 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-8">
                <span className="font-mono text-sm text-signal">{stage.step}</span>
                <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-8">
                  <h3 className="text-2xl font-semibold text-ink">{stage.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                    {stage.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
