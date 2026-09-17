export type ConsentValue = "accepted" | "rejected";

const STORAGE_KEY = "sh360-cookie-consent";
export const CONSENT_EVENT = "sh360-consent-change";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore storage errors (private mode etc.) */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

// For useSyncExternalStore: subscribes to both our in-tab consent event and
// cross-tab `storage` events so every tab reflects the same choice.
export function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
