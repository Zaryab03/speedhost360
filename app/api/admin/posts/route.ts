import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { postSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      updatedAt: true,
      publishedAt: true,
    },
  });

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { success } = rateLimit(`admin-post-write:${session.user.id}`, {
    limit: 30,
    windowMs: 10 * 60 * 1000,
  });
  if (!success) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid post data.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const existing = await prisma.post.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json(
      { error: "A post with this slug already exists.", fieldErrors: { slug: ["Slug already in use."] } },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const post = await prisma.post.create({
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
      authorId: session.user.id,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  if (post.status === "PUBLISHED") {
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
  }

  return NextResponse.json({ post });
}
