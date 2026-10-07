import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostCover } from "@/components/blog/post-cover";
import { cn } from "@/lib/utils";

export type PostCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  featuredImageUrl: string | null;
  publishedAt: Date | null;
};

export function formatPostDate(date: Date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function PostCard({ post, featured }: { post: PostCardData; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "focus-ring group flex h-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper-raised transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-signal/60 hover:shadow-[var(--shadow-card)]",
        featured ? "flex-col lg:flex-row" : "flex-col",
      )}
    >
      <PostCover
        slug={post.slug}
        title={post.title}
        category={post.category}
        imageUrl={post.featuredImageUrl}
        sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : undefined}
        priority={featured}
        className={cn("w-full shrink-0", featured ? "aspect-[16/9] lg:aspect-auto lg:min-h-80 lg:w-[55%]" : "aspect-[16/10]")}
      />
      <div className={cn("flex flex-1 flex-col", featured ? "p-6 sm:p-8 lg:justify-center" : "p-5")}>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink-muted">
          <span className="text-signal">{post.category || "General"}</span>
          {post.publishedAt && <> · {formatPostDate(post.publishedAt)}</>}
        </p>
        <h3
          className={cn(
            "mt-2 font-semibold leading-snug text-ink transition-colors group-hover:text-signal",
            featured ? "text-2xl sm:text-3xl" : "text-lg",
          )}
        >
          {post.title}
        </h3>
        <p className={cn("mt-3 flex-1 text-ink-muted", featured ? "text-base leading-relaxed" : "line-clamp-3 text-sm")}>
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-signal">
          Read article
          <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
