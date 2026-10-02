import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";

export function EmptyWorkState({ what }: { what: string }) {
  return (
    <div className="border border-dashed border-line-strong px-6 py-12 text-center">
      <p className="text-base font-semibold text-ink">No {what} published yet.</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
        We only publish client work and results with the client&rsquo;s written permission. Tell
        us what you&rsquo;re planning and we&rsquo;ll share examples close to it.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Button href="/contact">Tell Us About Your Project</Button>
        <a
          href={siteConfig.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex items-center gap-2 text-sm text-ink hover:text-signal"
        >
          <MessageCircle size={16} aria-hidden /> Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}
