"use client";

import { useSyncExternalStore } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { announcementBanner } from "@/lib/data/banner";

const storageKey = `sh360-banner-dismissed-${announcementBanner.id}`;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getIsDismissed() {
  try {
    return window.localStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
}

export function AnnouncementBanner() {
  const dismissed = useSyncExternalStore(
    subscribe,
    getIsDismissed,
    () => true // server/first paint: hide until we know the client's choice
  );

  if (!announcementBanner.enabled || dismissed) return null;

  return (
    <div className="relative flex items-center justify-center gap-3 bg-ink px-4 py-2 text-center text-xs text-paper">
      <p className="font-mono uppercase tracking-[0.04em]">
        {announcementBanner.message}{" "}
        <Link href={announcementBanner.ctaHref} className="underline underline-offset-2 hover:text-signal">
          {announcementBanner.ctaLabel}
        </Link>
      </p>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          try {
            window.localStorage.setItem(storageKey, "1");
          } catch {
            /* ignore storage errors (private mode etc.) */
          }
          window.dispatchEvent(new Event("storage"));
        }}
        className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-paper/70 hover:text-paper"
      >
        <X size={14} />
      </button>
    </div>
  );
}
