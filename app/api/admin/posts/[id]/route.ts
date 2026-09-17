import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { postSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

async function requireSession() {
  const session = await auth();
  if (!session?.user) return null;
  return session;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ post });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { success } = rateLimit(`admin-post-write:${session.user.id}`, {
    limit: 30,
    windowMs: 10 * 60 * 1000,
  });
  if (!success) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid post data.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.slug !== existing.slug) {
    const slugTaken = await prisma.post.findUnique({ where: { slug: data.slug } });
    if (slugTaken) {
      return NextResponse.json(
        { error: "A post with this slug already exists.", fieldErrors: { slug: ["Slug already in use."] } },
        { status: 400 }
      );
    }
  }

  const wasPublished = existing.status === "PUBLISHED";
  const isNowPublished = data.status === "PUBLISHED";

  const post = await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      body: data.body,
      status: data.status,
      featuredImageUrl: data.featuredImageUrl || null,
      socialImageUrl: data.socialImageUrl || null,
      seoTitle: data.seoTitle || null,
      metaDescription: data.metaDescription || null,
      canonicalUrl: data.canonicalUrl || null,
      category: data.category || null,
      tags: data.tags,
      // Set publishedAt the first time a post goes live; keep the original
      // date on later edits so re-saving doesn't bump its published date.
      publishedAt: !wasPublished && isNowPublished ? new Date() : existing.publishedAt,
    },
  });

  // Revalidate both the old and new slug paths — covers publish, unpublish,
  // edits to a live post, and a slug rename while published — so /blog never
  // shows stale content for up to the ISR window.
  if (wasPublished || isNowPublished) {
    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    if (post.slug !== existing.slug) revalidatePath(`/blog/${post.slug}`);
  }

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.post.delete({ where: { id } });

  if (existing.status === "PUBLISHED") {
    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
  }

  return NextResponse.json({ ok: true });
}
