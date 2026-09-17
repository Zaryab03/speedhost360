import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { articleJsonLd } from "@/lib/seo/json-ld";

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
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
            {post.category ?? "General"}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-ink-muted">
            By {post.author.name} ·{" "}
            {(post.publishedAt ?? post.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          {post.featuredImageUrl && (
            <div className="relative mt-8 aspect-video w-full overflow-hidden border border-line">
              <Image src={post.featuredImageUrl} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <div className="prose prose-neutral mt-10 max-w-none text-ink prose-headings:text-ink prose-a:text-signal">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
              {post.body}
            </ReactMarkdown>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-line-strong px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper-raised">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
              Related articles
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="focus-ring block border border-line p-5 hover:border-signal"
                >
                  <h3 className="text-sm font-semibold text-ink">{r.title}</h3>
                  <p className="mt-2 text-xs text-ink-muted">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
