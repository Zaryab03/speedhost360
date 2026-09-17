"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getStoredConsent, setStoredConsent, subscribeToConsent } from "@/lib/consent";

export function CookieConsent() {
  const hasChosen = useSyncExternalStore(
    subscribeToConsent,
    () => getStoredConsent() !== null,
    () => true // server/first paint: assume chosen so the banner never flashes in SSR
  );

  if (hasChosen) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+3.25rem)] z-50 mx-auto max-w-lg border border-line-strong bg-paper-raised p-4 shadow-[var(--shadow-card)] sm:bottom-6 sm:left-6 sm:right-auto sm:mx-0"
    >
      <p className="text-sm leading-relaxed text-ink">
        We use cookies for essential site function and, with your consent, analytics to
        understand how the site is used.{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-signal">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="md" onClick={() => setStoredConsent("accepted")}>
          Accept
        </Button>
        <Button variant="secondary" size="md" onClick={() => setStoredConsent("rejected")}>
          Necessary Only
        </Button>
      </div>
    </div>
  );
}
