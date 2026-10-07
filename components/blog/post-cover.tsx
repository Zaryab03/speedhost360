import Image from "next/image";
import { cn } from "@/lib/utils";

// Colour covers for posts without a featured image. The palette is picked
// from the post's slug, so each post keeps the same colour every render.
const palettes = [
  ["#ff5a1f", "#c2410c"],
  ["#13161a", "#3d4a46"],
  ["#1f7a4d", "#0f3d2e"],
  ["#2b4c7e", "#13233f"],
  ["#7c3aed", "#3b1a78"],
  ["#b45309", "#5c2a06"],
] as const;

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function PostCover({
  slug,
  title,
  category,
  imageUrl,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority,
}: {
  slug: string;
  title: string;
  category?: string | null;
  imageUrl?: string | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (imageUrl) {
    return (
      <div className={cn("relative overflow-hidden bg-paper-raised", className)}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const [from, to] = palettes[hash(slug) % palettes.length];

  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      {/* Soft light blob and fine grid for depth */}
      <div className="absolute -right-1/4 -top-1/3 size-3/4 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
      {/* Oversized category initial as the cover's focal point */}
      <span className="absolute -bottom-[0.18em] right-4 select-none text-[9rem] font-semibold leading-none text-white/15 transition-transform duration-700 group-hover:-translate-y-1 sm:text-[11rem]">
        {(category || title).trim().charAt(0).toUpperCase()}
      </span>
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="self-start rounded-full bg-white/15 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-white backdrop-blur">
          {category || "SpeedHost360"}
        </span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/70">
          SpeedHost360 · Blog
        </span>
      </div>
    </div>
  );
}
