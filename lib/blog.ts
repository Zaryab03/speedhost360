import { prisma } from "@/lib/db";

// Every call here is wrapped so the public site degrades to "no posts yet"
// instead of a 500 when DATABASE_URL isn't configured (e.g. before the
// database has been provisioned) rather than failing the whole page.
export async function getPublishedPosts() {
  try {
    return await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string) {
  try {
    return await prisma.post.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return null;
  }
}

/**
 * Posts to suggest at the end of an article: same category first, then the
 * latest posts from any category, so there's always something to read next.
 */
export async function getRelatedPosts(currentId: string, category: string | null, limit = 3) {
  try {
    const sameCategory = category
      ? await prisma.post.findMany({
          where: { status: "PUBLISHED", id: { not: currentId }, category },
          orderBy: { publishedAt: "desc" },
          take: limit,
        })
      : [];
    if (sameCategory.length >= limit) return sameCategory;

    const latest = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        id: { notIn: [currentId, ...sameCategory.map((p) => p.id)] },
      },
      orderBy: { publishedAt: "desc" },
      take: limit - sameCategory.length,
    });
    return [...sameCategory, ...latest];
  } catch {
    return [];
  }
}
