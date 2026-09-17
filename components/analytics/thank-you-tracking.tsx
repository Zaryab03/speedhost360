"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ThankYouTracking() {
  useEffect(() => {
    trackEvent("thank_you_view", { location: "thank_you_page" });
  }, []);
  return null;
}
