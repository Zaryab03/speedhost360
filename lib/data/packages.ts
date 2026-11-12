import { formatPkr, type Spec } from "./plans";

// Complete packages: domain, hosting, a website and business email (plus
// digital marketing on the top tier) sold together at one price. Prices are
// owner-confirmed; anything not yet confirmed is TODO_CONFIRM.

export type CompletePackage = {
  /** Distinct from hosting plan slugs, since both feed the brief form's ?plan=. */
  slug: string;
  name: string;
  price: number;
  tagline: string;
  /** Short summary used by llms.txt and the FAQ. */
  includes: string[];
  /** Full feature list shown on the card, grouped by area. */
  groups: { title: string; items: string[] }[];
  /** Factual badge only, e.g. what's included. Never "most popular" without data. */
  badge?: string;
  highlighted?: boolean;
};

/** The brief form's service value for package enquiries (see serviceOptions). */
export const PACKAGE_SERVICE = "complete-package";

/** Renewal price for domain, hosting and email after the first year. */
export const packageRenewal: Spec = "Same price every year, no increase";

export const completePackages: CompletePackage[] = [
  {
    slug: "starter-package",
    name: "Starter Package",
    price: 40_000,
    tagline: "Get a simple business website online",
    includes: ["Domain registration", "Web hosting", "Responsive website", "3 business email accounts"],
    groups: [
      {
        title: "Website development",
        items: [
          "Static or dynamic website (limited functionality)",
          "Mobile-responsive design",
          "Contact and enquiry forms",
          "WhatsApp integration",
          "Blog with admin panel",
          "Google Maps integration",
        ],
      },
      {
        title: "Domain, hosting & email",
        items: [
          "Domain registration (first year)",
          "Managed web hosting (first year)",
          "DNS management",
          "Free SSL certificate",
          "3 business email accounts",
        ],
      },
      {
        title: "SEO & analytics",
        items: [
          "Google Search Console",
          "Google Analytics 4",
          "Google Business Profile setup",
          "Microsoft Clarity",
          "Sitemap and robots.txt",
          "Basic on-page SEO",
        ],
      },
      {
        title: "Digital marketing launch",
        items: [
          "Facebook and Instagram business page setup and optimisation",
          "Social media branding setup",
          "WhatsApp Business setup",
        ],
      },
      {
        title: "After-launch services",
        items: ["Website backup", "30 days technical support", "Website handover and guidance"],
      },
    ],
  },
  {
    slug: "growth-package",
    name: "Growth Package",
    price: 80_000,
    tagline: "Launch and start bringing in customers",
    includes: [
      "Domain registration",
      "Web hosting",
      "Static or dynamic website, your choice",
      "5 business email accounts",
      "Digital marketing",
    ],
    badge: "Includes marketing",
    highlighted: true,
    groups: [
      {
        title: "Website development",
        items: [
          "Up to 8 professionally designed pages",
          "Static or dynamic website",
          "Mobile-responsive design",
          "Contact and enquiry forms",
          "WhatsApp integration",
          "Blog with admin panel",
          "Google Maps integration",
        ],
      },
      {
        title: "Domain, hosting & email",
        items: [
          "Domain registration (first year)",
          "Managed web hosting (first year)",
          "DNS management",
          "Free SSL certificate",
          "5 business email accounts",
        ],
      },
      {
        title: "SEO & analytics",
        items: [
          "Google Search Console",
          "Google Analytics 4",
          "Google Business Profile setup",
          "Microsoft Clarity",
          "Sitemap and robots.txt",
          "Basic on-page SEO",
          "Keyword research for target pages",
        ],
      },
      {
        title: "Digital marketing launch",
        items: [
          "Facebook and Instagram business page setup and optimisation",
          "Social media branding setup",
          "8 professionally designed social media posts",
          "Basic monthly content calendar",
          "WhatsApp Business setup",
          "Initial digital marketing strategy",
        ],
      },
      {
        title: "After-launch services",
        items: [
          "Website backup",
          "2 rounds of revisions",
          "30 days technical support",
          "Website handover and guidance",
        ],
      },
    ],
  },
];

export function packagePriceLabel(pkg: CompletePackage) {
  return formatPkr(pkg.price);
}
