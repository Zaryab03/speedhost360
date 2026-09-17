"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="focus-ring font-mono text-xs uppercase tracking-[0.06em] text-ink-muted hover:text-signal"
    >
      Sign Out
    </button>
  );
}
