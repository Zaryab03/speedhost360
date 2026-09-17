import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Edit Post</h1>
      <div className="mt-8">
        <PostForm
          post={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            body: post.body,
            status: post.status,
            featuredImageUrl: post.featuredImageUrl ?? "",
            socialImageUrl: post.socialImageUrl ?? "",
            seoTitle: post.seoTitle ?? "",
            metaDescription: post.metaDescription ?? "",
            canonicalUrl: post.canonicalUrl ?? "",
            category: post.category ?? "",
            tags: post.tags,
          }}
        />
      </div>
    </div>
  );
}
