"use client";

import { siteConfig } from "@/lib/data/site";
import { trackEvent } from "@/lib/analytics";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.41 9.41 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.43 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.81.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.62l6.02-1.58a11.32 11.32 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.03" />
    </svg>
  );
}

export function WhatsAppFloatingButton() {
  return (
    <a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
      aria-label={`Chat on WhatsApp: ${siteConfig.whatsappDisplay}`}
      className="focus-ring group fixed bottom-20 right-4 z-40 flex items-center gap-3 sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none relative hidden whitespace-nowrap rounded-full border border-line bg-paper-raised px-4 py-2 text-sm font-medium text-ink shadow-[var(--shadow-card)] motion-safe:animate-wa-label sm:block">
        Chat with us on WhatsApp
        <span className="ml-2 inline-block size-2 rounded-full bg-[#25D366] align-middle" />
      </span>

      <span className="relative flex size-14 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-wa-ripple" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-wa-ripple [animation-delay:1s]" />
        <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgba(37,211,102,0.65)] transition-transform duration-200 group-hover:scale-110 motion-safe:animate-wa-nudge group-hover:[animation-play-state:paused]">
          <WhatsAppGlyph className="size-7" />
        </span>
      </span>
    </a>
  );
}
