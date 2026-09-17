import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center sm:px-6">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-line-strong text-signal">
          <Compass size={22} />
        </span>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.08em] text-signal">404</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Looks like this route took a wrong turn.
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/services" variant="secondary">
            Explore Services
          </Button>
          <Button href="/contact" variant="ghost">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
