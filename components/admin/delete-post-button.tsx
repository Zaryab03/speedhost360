"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-xs">
        <span className="text-ink-muted">Delete &ldquo;{title}&rdquo;?</span>
        <button
          type="button"
          disabled={deleting}
          onClick={async () => {
            setDeleting(true);
            await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
            router.refresh();
          }}
          className="focus-ring font-medium text-danger hover:underline"
        >
          {deleting ? "Deleting…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="focus-ring text-ink-muted hover:text-ink"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="focus-ring font-mono text-xs uppercase tracking-[0.04em] text-ink-muted hover:text-danger"
    >
      Delete
    </button>
  );
}
