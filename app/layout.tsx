import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgressBar } from "@/components/motion/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { WhatsAppFloatingButton } from "@/components/layout/whatsapp-button";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { GoogleAnalytics } from "@/components/analytics/ga4";
import { UtmCapture } from "@/components/analytics/utm-capture";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, localBusinessJsonLd } from "@/lib/seo/json-ld";
import { siteConfig } from "@/lib/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Web Development, Hosting & Digital Marketing`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <ThemeProvider>
          <TooltipProvider>
            <JsonLd data={organizationJsonLd()} />
            <JsonLd data={localBusinessJsonLd()} />
            <ScrollProgressBar />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-ink"
            >
              Skip to main content
            </a>
            <AnnouncementBanner />
            <Navbar />
            <main id="main-content" className="flex-1 pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <BackToTop />
            <WhatsAppFloatingButton />
            <MobileStickyCta />
            <CookieConsent />
            <GoogleAnalytics />
            <UtmCapture />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
