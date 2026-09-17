"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe, Server, Shield, Radio, Users, TrendingUp } from "lucide-react";

const nodes = [
  { label: "Website", icon: Globe },
  { label: "Infrastructure", icon: Shield },
  { label: "Server", icon: Server },
  { label: "Traffic", icon: Radio },
  { label: "Leads", icon: Users },
  { label: "Growth", icon: TrendingUp },
];

// The central visual of the hero: a signal traveling left-to-right across a
// pipeline of nodes, telling the Build -> Host -> Grow story rather than
// illustrating it with stock imagery or a 3D render.
export function PipelineDiagram() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-full py-8"
      role="img"
      aria-label="Diagram: a website becomes infrastructure, then a server, then traffic, then leads, then growth"
    >
      <div className="relative flex items-start">
        <div
          className="absolute left-0 right-0 top-5 h-px bg-line-strong"
          aria-hidden
        />
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden
            className="absolute top-[15px] size-2.5 rounded-full bg-signal shadow-[0_0_12px_2px_var(--signal-soft)]"
            animate={{ left: ["0%", "100%"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ marginLeft: "-5px" }}
          />
        )}

        {nodes.map(({ label, icon: Icon }, index) => (
          <motion.div
            key={label}
            className="relative z-10 flex min-w-0 flex-1 flex-col items-center gap-2.5 px-1 text-center"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-paper text-ink">
              <Icon size={16} strokeWidth={1.75} />
            </span>
            <span className="font-mono text-[0.625rem] uppercase leading-tight tracking-[0.04em] text-ink-muted sm:text-[0.6875rem]">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
