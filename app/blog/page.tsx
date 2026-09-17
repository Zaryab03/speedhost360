import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RevealOnScroll } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Notes on web development, hosting, security and growth from the SpeedHost360 team.",
  path: "/blog",
});

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Blog</p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Notes on building, hosting and growing online.
            </h1>
          </RevealOnScroll>

          {posts.length === 0 ? (
            <p className="mt-12 text-sm text-ink-muted">
              Nothing published yet — check back soon.
            </p>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <RevealOnScroll key={post.id} delay={index * 0.05}>
                  <Link href={`/blog/${post.slug}`} className="focus-ring group block">
                    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-paper-raised">
                      {post.featuredImageUrl && (
                        <Image
                          src={post.featuredImageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <p className="mt-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-muted">
                      {post.category ?? "General"} ·{" "}
                      {post.publishedAt?.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-ink group-hover:text-signal">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-ink-muted">{post.excerpt}</p>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
