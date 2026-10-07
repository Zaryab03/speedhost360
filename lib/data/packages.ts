import { formatPkr, TODO_CONFIRM, type Spec } from "./plans";

// Complete packages: domain, hosting, a website and business email (plus
// digital marketing on the top tier) sold together at one price. Prices are
// owner-confirmed; anything not yet confirmed is TODO_CONFIRM.

export type CompletePackage = {
  /** Distinct from hosting plan slugs, since both feed the brief form's ?plan=. */
  slug: string;
  name: string;
  price: number;
  tagline: string;
  includes: string[];
  /** Factual badge only, e.g. what's included. Never "most popular" without data. */
  badge?: string;
  highlighted?: boolean;
};

/** The brief form's service value for package enquiries (see serviceOptions). */
export const PACKAGE_SERVICE = "complete-package";

/** Renewal price for domain, hosting and email after the first year. */
export const packageRenewal: Spec = TODO_CONFIRM;

export const completePackages: CompletePackage[] = [
  {
    slug: "starter-package",
    name: "Starter Package",
    price: 40_000,
    tagline: "Get a simple business website online",
    includes: ["Domain registration", "Web hosting", "Basic static website", "1 business email account"],
  },
  {
    slug: "business-package",
    name: "Business Package",
    price: 80_000,
    tagline: "A dynamic website you can grow",
    includes: ["Domain registration", "Web hosting", "Dynamic website", "2 business email accounts"],
    highlighted: true,
  },
  {
    slug: "growth-package",
    name: "Growth Package",
    price: 120_000,
    tagline: "Launch and start bringing in customers",
    includes: [
      "Domain registration",
      "Web hosting",
      "Static or dynamic website, your choice",
      "5 business email accounts",
      "Digital marketing",
    ],
    badge: "Includes marketing",
  },
];

export function packagePriceLabel(pkg: CompletePackage) {
  return formatPkr(pkg.price);
}
