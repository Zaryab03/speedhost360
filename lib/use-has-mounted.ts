import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Returns false during SSR and the first client render, true afterward —
// without a setState-in-effect, so components can safely read
// client-only state (localStorage, matchMedia, next-themes' resolvedTheme)
// without a hydration mismatch.
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
