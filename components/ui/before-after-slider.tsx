"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

type BeforeAfterSliderProps = {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

// Works identically for mouse drag and touch via the Pointer Events API, and
// is operable on keyboard (arrow keys) for accessibility. Renders a labeled
// placeholder panel when no real screenshot has been supplied yet.
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-[var(--radius-md)] border border-line bg-paper-raised sm:aspect-[16/10]",
        className
      )}
      onPointerDown={(e) => {
        draggingRef.current = true;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (draggingRef.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
    >
      <Panel label="After" src={afterSrc} alt={afterAlt} side="right" />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Panel label="Before" src={beforeSrc} alt={beforeAlt} side="left" />
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 3));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 3));
        }}
        className="focus-ring absolute inset-y-0 flex w-6 -translate-x-1/2 cursor-ew-resize items-center justify-center"
        style={{ left: `${position}%` }}
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper" />
        <div className="relative flex size-8 items-center justify-center rounded-full bg-paper text-ink shadow-[var(--shadow-card)]">
          <GripVertical size={14} />
        </div>
      </div>

      <span className="absolute left-3 top-3 rounded-[var(--radius-sm)] bg-ink/70 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-paper">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded-[var(--radius-sm)] bg-ink/70 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-paper">
        After
      </span>
    </div>
  );
}

function Panel({
  label,
  src,
  alt,
  side,
}: {
  label: string;
  src?: string;
  alt: string;
  side: "left" | "right";
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- comparison slider needs raw pixel-for-pixel control Next/Image's layout wrapper complicates
    return <img src={src} alt={alt} className="size-full object-cover" draggable={false} />;
  }
  return (
    <div
      className="relative size-full bg-[repeating-linear-gradient(135deg,var(--line)_0,var(--line)_1px,transparent_1px,transparent_12px)]"
      role="img"
      aria-label={alt}
    >
      {/* Anchored to this panel's own side (not centered in the full-width
          container) so the Before and After captions never overlap at the
          slider boundary, wherever it's dragged to. */}
      <div
        className={`absolute inset-y-0 flex w-1/2 flex-col items-center justify-center gap-2 px-4 text-center ${
          side === "left" ? "left-0" : "right-0"
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
          {label} — placeholder
        </span>
        <span className="text-xs text-ink-muted">{alt}</span>
      </div>
    </div>
  );
}
