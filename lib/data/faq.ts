import type { FaqItem } from "./services";
import { services } from "./services";
import { emailHostingPricing } from "./email-hosting";
import { formatPkr, hostingPlans } from "./plans";
import { siteConfig } from "./site";

// Prices in answers are derived from the pricing data so the FAQ (and its
// FAQPage JSON-LD) can never drift from the pricing tables.
const webDev = services["web-development"].pricing ?? [];
const hostingPrices = hostingPlans
  .map((p) => `${p.name} ${p.priceIsFrom ? "from " : ""}${formatPkr(p.price)}`)
  .join(", ");
const emailPrices = emailHostingPricing.map((p) => `${p.price} for ${p.name.toLowerCase()}`).join(" or ");

export const generalFaq: FaqItem[] = [
  {
    question: "How long does website development take?",
    answer:
      "A focused business website typically takes 3–6 weeks from signed-off content to launch. E-commerce and custom web applications take longer depending on scope. You'll get a specific timeline after a discovery call.",
  },
  {
    question: "How much does a website cost?",
    answer: `Typical projects are ${webDev.map((p) => `${p.price} (${p.name})`).join(", ")}. After a short discovery call you get a fixed price and timeline before any work starts, not an open-ended hourly estimate.`,
  },
  {
    question: "How much does hosting cost?",
    answer: `Hosting plans are ${hostingPrices}. Business email is separate: ${emailPrices}. The Web Hosting page compares every plan spec by spec; contact us to confirm the billing cycle for your plan.`,
  },
  {
    question: "Can you migrate my website, and will it go down?",
    answer:
      "Migration is included with every hosting plan. We copy your files and databases, you check the site on our servers, and only then do we switch your DNS, so downtime is kept to a minimum. We need login details for your current host and access to your domain's DNS.",
  },
  {
    question: "How are backups handled?",
    answer:
      "Every hosting plan includes daily automated backups, so a bad update or deploy is a restore, not a rebuild. On managed hosting we also test that backups actually restore. Ask us how long backups are kept on your plan.",
  },
  {
    question: "What are your support hours?",
    answer: `Our team is available ${siteConfig.hours.days}, ${siteConfig.hours.time} (${siteConfig.hours.timezone}). Hosting is monitored so we're alerted to downtime rather than waiting for you to notice. ${siteConfig.responseTimePromise} Existing customers can also reach us on WhatsApp.`,
  },
  {
    question: "Do you offer business email hosting?",
    answer: `Yes. Self-hosted business email on your own domain, priced per mailbox: ${emailPrices}. It's sold alongside any hosting plan, not locked to one.`,
  },
  {
    question: "Can you manage my existing server?",
    answer:
      "Yes. We start with an infrastructure audit of your current setup before taking over management; nothing is assumed or skipped.",
  },
  {
    question: "Do you provide SEO?",
    answer:
      "Yes, SEO and broader digital marketing are core services. See the Digital Marketing page for what's included, or request a free website audit to see what we'd fix first.",
  },
  {
    question: "Who owns my website and data, and what if I want to leave?",
    answer:
      "You own your domain, your content and your data. If you decide to move elsewhere, we'll hand over your files, a database export and your DNS details so you can switch without starting from scratch.",
  },
  {
    question: "Can you work with an existing website?",
    answer:
      "Yes, redesigns, extensions and migrations of existing sites are common work for us, not an exception.",
  },
  {
    question: "What happens after I submit an inquiry?",
    answer:
      "Our team reviews your brief and replies within 1 business day with questions or a time for a short call. You then get a fixed quote and timeline before any work starts.",
  },
];
