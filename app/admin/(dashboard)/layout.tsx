import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/admin/sign-out-button";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-6">
          <Link href="/admin/leads" className="font-mono text-xs uppercase tracking-[0.08em] text-ink">
            SpeedHost360 Admin
          </Link>
          <Link href="/admin/leads" className="text-sm text-ink-muted hover:text-signal">
            Leads
          </Link>
          <Link href="/admin/posts" className="text-sm text-ink-muted hover:text-signal">
            Posts
          </Link>
          <Link href="/admin/posts/new" className="text-sm text-ink-muted hover:text-signal">
            New Post
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-ink-muted">{session.user.email}</span>
          <SignOutButton />
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
