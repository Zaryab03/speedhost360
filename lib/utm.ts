"use client";

const STORAGE_KEY = "sh360-utm";
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
export type UtmData = Partial<Record<UtmKey, string>>;

// Captures utm_* params on first landing and persists them in
// sessionStorage so a later form submission (possibly several pages later
// in the same session) can still be attributed to the original source.
export function captureUtmFromLocation() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: UtmData = {};
  for (const key of UTM_KEYS) {
    const value = params.get(`utm_${key}`);
    if (value) found[key] = value;
  }
  if (Object.keys(found).length > 0) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch {
      /* ignore storage errors (private mode etc.) */
    }
  }
}

export function getStoredUtm(): UtmData | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}
