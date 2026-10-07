import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RevealOnScroll } from "@/components/motion/reveal";
import { PostCard } from "@/components/blog/post-card";

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
              Nothing published yet. Check back soon.
            </p>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <RevealOnScroll
                  key={post.id}
                  delay={Math.min(index, 5) * 0.05}
                  className={index === 0 && posts.length > 2 ? "sm:col-span-2 lg:col-span-3" : undefined}
                >
                  <PostCard post={post} featured={index === 0 && posts.length > 2} />
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
