"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type AnalyticsEvent =
  | "cta_click"
  | "whatsapp_click"
  | "phone_click"
  | "form_start"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "thank_you_view"
  | "case_study_view"
  | "hosting_cta_click"
  | "service_cta_click";

// Only ever passes non-identifying, structural data (label/location) — never
// form field values or anything that could contain PII.
export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", event, params);
}
