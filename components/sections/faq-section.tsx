import { generalFaq } from "@/lib/data/faq";
import { FaqAccordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo/json-ld";
import { RevealOnScroll } from "@/components/motion/reveal";

export function FaqSection() {
  return (
    <section className="border-b border-line bg-paper-raised">
      <JsonLd data={faqJsonLd(generalFaq)} />
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Common questions.
          </h2>
        </RevealOnScroll>
        <div className="mt-10">
          <FaqAccordion items={generalFaq} />
        </div>
      </div>
    </section>
  );
}
