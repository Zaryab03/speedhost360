import type { PricingPlan } from "@/lib/data/services";

// Self-hosted business email, priced per mailbox count. Sold alongside
// (not instead of) the web-hosting plans in lib/data/services.ts.
export const emailHostingPricing: PricingPlan[] = [
  {
    name: "3 Mailboxes",
    price: "PKR 15,000",
    features: [
      "3 business email accounts",
      "Custom domain email (you@yourbusiness.com)",
      "Self-hosted mail server",
      "Webmail access",
    ],
  },
  {
    name: "6 Mailboxes",
    price: "PKR 20,000",
    highlighted: true,
    features: [
      "6 business email accounts",
      "Custom domain email (you@yourbusiness.com)",
      "Self-hosted mail server",
      "Webmail access",
      "Priority support",
    ],
  },
];
