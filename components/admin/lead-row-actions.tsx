"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statusOptions = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"] as const;
type LeadStatus = (typeof statusOptions)[number];

export function LeadStatusSelect({
  id,
  status,
  endpoint = "/api/admin/leads",
}: {
  id: string;
  status: LeadStatus;
  /** Collection endpoint; leads and audit requests share the same status flow. */
  endpoint?: string;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  return (
    <select
      value={status}
      disabled={updating}
      onChange={async (e) => {
        setUpdating(true);
        await fetch(`${endpoint}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: e.target.value }),
        });
        router.refresh();
        setUpdating(false);
      }}
      className="focus-ring border border-line-strong bg-paper px-2 py-1.5 font-mono text-xs uppercase tracking-[0.04em] text-ink"
    >
      {statusOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export function DeleteLeadButton({
  id,
  name,
  endpoint = "/api/admin/leads",
}: {
  id: string;
  name: string;
  endpoint?: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs">
        <span className="text-ink-muted">Delete &ldquo;{name}&rdquo;?</span>
        <button
          type="button"
          disabled={deleting}
          onClick={async () => {
            setDeleting(true);
            await fetch(`${endpoint}/${id}`, { method: "DELETE" });
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
