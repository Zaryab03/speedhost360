import type { PricingPlan } from "@/lib/data/services";

export type EmailHostingPlan = PricingPlan & {
  /** Tier label shown on the card; `name` stays the mailbox count (used in FAQ copy). */
  tier: string;
  description: string;
};

// Self-hosted business email, priced per mailbox count. Sold alongside
// (not instead of) the web-hosting plans in lib/data/services.ts.
// No storage limits, backup frequency or delivery guarantees are published
// here on purpose: none have been confirmed.
export const emailHostingPricing: EmailHostingPlan[] = [
  {
    tier: "Essential",
    name: "3 Mailboxes",
    price: "PKR 15,000",
    description: "Ideal for startups and small businesses.",
    features: [
      "3 professional business email accounts",
      "Custom domain email addresses (you@yourbusiness.com)",
      "Self-hosted email infrastructure",
      "Webmail access",
      "IMAP, POP3 and SMTP support",
      "SSL/TLS email encryption",
      "SPF, DKIM and DMARC configuration",
      "Spam filtering and antivirus scanning",
      "Standard technical support",
    ],
  },
  {
    tier: "Business",
    name: "6 Mailboxes",
    price: "PKR 20,000",
    highlighted: true,
    description: "Ideal for growing businesses and teams.",
    features: [
      "6 professional business email accounts",
      "Custom domain email addresses",
      "Self-hosted email infrastructure",
      "Webmail access",
      "IMAP, POP3 and SMTP support",
      "SSL/TLS email encryption",
      "SPF, DKIM and DMARC configuration",
      "Spam filtering and antivirus scanning",
      "Email backup",
      "Mobile and desktop email configuration assistance",
      "Priority technical support",
    ],
  },
];
