import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { articleJsonLd } from "@/lib/seo/json-ld";
import { BlogBody } from "@/components/blog/blog-body";
import { PostCard, formatPostDate } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Post not found", description: "", path: `/blog/${slug}`, noIndex: true });

  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${slug}`,
    image: post.socialImageUrl || post.featuredImageUrl || undefined,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.id, post.category);
  const publishedAt = post.publishedAt ?? post.createdAt;
  // ~220 words a minute, never less than 1.
  const readingMinutes = Math.max(1, Math.round(post.body.split(/\s+/).filter(Boolean).length / 220));

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.metaDescription || post.excerpt,
          path: `/blog/${slug}`,
          imageUrl:
            post.socialImageUrl ||
            post.featuredImageUrl ||
            absoluteUrl(`/og?title=${encodeURIComponent(post.title)}`),
          authorName: post.author.name,
          publishedAt: (post.publishedAt ?? post.createdAt).toISOString(),
          updatedAt: post.updatedAt.toISOString(),
        })}
      />

      <article>
        <header className="border-b border-line bg-paper-raised">
          <div className="mx-auto max-w-3xl px-4 pb-12 pt-14 sm:px-6 sm:pt-16">
            <p className="inline-flex rounded-full bg-signal-soft px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-signal">
              {post.category ?? "General"}
            </p>
            <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">{post.excerpt}</p>
            )}
            <div className="mt-8 flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-full bg-signal font-semibold text-signal-ink"
              >
                {post.author.name.trim().charAt(0).toUpperCase()}
              </span>
              <div className="text-sm">
                <p className="font-medium text-ink">{post.author.name}</p>
                <p className="text-ink-muted">
                  <time dateTime={publishedAt.toISOString()}>{formatPostDate(publishedAt)}</time>
                  {" · "}
                  {readingMinutes} min read
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
          {post.featuredImageUrl && (
            <div className="relative -mt-2 mb-12 aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] border border-line">
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <BlogBody markdown={post.body} />

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <aside className="mt-12 flex flex-col gap-5 rounded-[var(--radius-lg)] border border-signal/40 bg-signal-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-lg font-semibold text-ink">Need a hand with your website?</p>
              <p className="mt-1 text-sm text-ink-muted">
                Tell us what you&rsquo;re working on and we&rsquo;ll reply within 1 business day.
              </p>
            </div>
            <Button href="/contact" className="shrink-0">
              Start a Project
            </Button>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper-raised">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Keep reading</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  More from the blog
                </h2>
              </div>
              <Link href="/blog" className="focus-ring text-sm text-ink hover:text-signal">
                All articles →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PostCard key={r.id} post={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
