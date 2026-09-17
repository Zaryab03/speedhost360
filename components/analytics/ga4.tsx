"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/data/site";
import { getStoredConsent, subscribeToConsent } from "@/lib/consent";

export function GoogleAnalytics() {
  const enabled = useSyncExternalStore(
    subscribeToConsent,
    () => getStoredConsent() === "accepted",
    () => false
  );

  if (!enabled || !siteConfig.ga4MeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4MeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.ga4MeasurementId}', { anonymize_ip: true });
          window.gtag = gtag;
        `}
      </Script>
    </>
  );
}
