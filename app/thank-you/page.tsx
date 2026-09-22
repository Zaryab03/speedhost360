import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { ThankYouTracking } from "@/components/analytics/thank-you-tracking";

export const metadata: Metadata = buildMetadata({
  title: "Thank You",
  description: "Your inquiry has been received. SpeedHost360 will respond within 1 business day.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <section>
      <ThankYouTracking />
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <CheckCircle2 size={40} className="mx-auto text-signal" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Thanks, your project inquiry has been received.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          We&rsquo;ll review your requirements and get back to you within 1 business day.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="secondary">
            Return Home
          </Button>
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center gap-2 text-sm text-ink hover:text-signal"
          >
            <MessageCircle size={16} /> Talk on WhatsApp
          </a>
        </div>

        <div className="mt-16 grid gap-4 border-t border-line pt-10 text-left sm:grid-cols-2">
          <Link href="/services" className="focus-ring border border-line-strong p-4 hover:border-signal">
            <p className="text-sm font-medium text-ink">Services</p>
            <p className="mt-1 text-xs text-ink-muted">Explore what we offer</p>
          </Link>
          <Link href="/blog" className="focus-ring border border-line-strong p-4 hover:border-signal">
            <p className="text-sm font-medium text-ink">Blog</p>
            <p className="mt-1 text-xs text-ink-muted">Read the latest</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
