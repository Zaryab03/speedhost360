import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { DeletePostButton } from "@/components/admin/delete-post-button";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  // Re-checked here (not just in the dashboard layout): Next can start
  // rendering this page concurrently with the layout's redirect, so without
  // this the page would still fire an authenticated-only DB query first.
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, slug: true, status: true, updatedAt: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="focus-ring bg-signal px-4 py-2 font-mono text-xs uppercase tracking-[0.04em] text-signal-ink"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-ink-muted">No posts yet.</p>
      ) : (
        <table className="mt-8 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-[0.06em] text-ink-muted">
              <th className="py-2 font-medium">Title</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Updated</th>
              <th className="py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-line">
                <td className="py-3">
                  <Link href={`/admin/posts/${post.id}`} className="focus-ring text-ink hover:text-signal">
                    {post.title}
                  </Link>
                </td>
                <td className="py-3">
                  <span
                    className={`font-mono text-xs uppercase tracking-[0.04em] ${
                      post.status === "PUBLISHED" ? "text-success" : "text-ink-muted"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="py-3 text-ink-muted">
                  {post.updatedAt.toLocaleDateString("en-GB")}
                </td>
                <td className="py-3 text-right">
                  <DeletePostButton id={post.id} title={post.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
