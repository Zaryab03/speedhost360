// Single source of truth for hosting plan specs. The homepage pricing block,
// /services/web-hosting and /services/managed-hosting all read from here
// (and prisma/seed.ts copies it into the HostingPlan table).
//
// Starter's resource specs (storage, SSL, bandwidth, addon domains,
// emails/databases, subdomains) come from the owner; Business, Professional
// and Managed values for those fields were scaled to price and proposed on
// 2026-10-02, pending the owner's confirmation. Every other unknown value is
// TODO_CONFIRM: never replace one with a guess.
// The UI renders TODO_CONFIRM as "Ask us" in production and as a visible
// marker in development, so nothing invented ever reaches a visitor.

export const TODO_CONFIRM = "TODO_CONFIRM" as const;
export type Pending = typeof TODO_CONFIRM;

/** A spec value that is either confirmed text or still awaiting confirmation. */
export type Spec = string | Pending;

export function isPending(value: unknown): value is Pending {
  return value === TODO_CONFIRM;
}

export type PlanSlug = "starter" | "business" | "professional" | "managed";

export type HostingPlan = {
  slug: PlanSlug;
  name: string;
  service: "web-hosting" | "managed-hosting";
  /** Price in PKR. */
  price: number;
  /** True when `price` is a "starting from" figure rather than a fixed price. */
  priceIsFrom: boolean;
  billingPeriod: Spec;
  renewalPrice: Spec;
  websitesIncluded: Spec;
  /** SSD storage in GB, e.g. "3". */
  storageGb: Spec;
  /** "Yes" or "No". */
  freeSsl: Spec;
  /** Monthly bandwidth, e.g. "Unlimited". */
  bandwidth: Spec;
  /** Extra domains on top of the main one, e.g. "0". */
  addonDomains: Spec;
  subdomains: Spec;
  ram: Spec;
  cpu: Spec;
  databases: Spec;
  emailAccounts: Spec;
  backupFrequency: Spec;
  backupRetentionDays: Spec;
  monitoringLevel: Spec;
  supportTier: Spec;
  supportResponseTime: Spec;
  migrationIncluded: Spec;
  staging: Spec;
  sshAccess: Spec;
  cdn: Spec;
  region: Spec;
  bestFor: string;
  mostPopular: boolean;
};

/** Plan fields that hold display text (usable as comparison-table rows). */
export type PlanSpecKey = {
  [K in keyof HostingPlan]: HostingPlan[K] extends string ? K : never;
}[keyof HostingPlan];

export const hostingPlans: HostingPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    service: "web-hosting",
    price: 15000,
    priceIsFrom: false,
    billingPeriod: "Yearly",
    renewalPrice: "Same price every year, no increase",
    websitesIncluded: "1",
    storageGb: "3",
    freeSsl: "Yes",
    bandwidth: "Unlimited",
    addonDomains: "0",
    subdomains: "2",
    ram: "1 GB",
    cpu: "1 CPU core",
    databases: "2",
    emailAccounts: "2",
    backupFrequency: "Daily",
    backupRetentionDays: "A fresh backup every day",
    monitoringLevel: "Uptime monitoring",
    supportTier: "Standard",
    supportResponseTime: "Within 30 minutes",
    migrationIncluded: "Included",
    staging: "No",
    sshAccess: "Yes, provided",
    cdn: "Free Cloudflare CDN setup",
    region: "US/EU",
    bestFor: "A single business website",
    mostPopular: false,
  },
  {
    slug: "business",
    name: "Business",
    service: "web-hosting",
    price: 25000,
    priceIsFrom: false,
    billingPeriod: "Yearly",
    renewalPrice: "Same price every year, no increase",
    websitesIncluded: "Up to 5",
    storageGb: "10",
    freeSsl: "Yes",
    bandwidth: "Unlimited",
    addonDomains: "4",
    subdomains: "10",
    ram: "2 GB",
    cpu: "2 CPU cores",
    databases: "10",
    emailAccounts: "10",
    backupFrequency: "Daily",
    backupRetentionDays: "A fresh backup every day",
    monitoringLevel: "Performance monitoring",
    supportTier: "Priority",
    supportResponseTime: "Within 30 minutes",
    migrationIncluded: "Included",
    staging: "Yes",
    sshAccess: "Yes, provided",
    cdn: "Free Cloudflare CDN setup",
    region: "US/EU",
    bestFor: "Businesses running several sites or brands",
    mostPopular: true,
  },
  {
    slug: "professional",
    name: "Professional",
    service: "web-hosting",
    price: 40000,
    priceIsFrom: false,
    billingPeriod: "Yearly",
    renewalPrice: "Same price every year, no increase",
    websitesIncluded: "Up to 10",
    storageGb: "25",
    freeSsl: "Yes",
    bandwidth: "Unlimited",
    addonDomains: "9",
    subdomains: "25",
    ram: "4 GB",
    cpu: "4 CPU cores",
    databases: "25",
    emailAccounts: "25",
    backupFrequency: "Daily",
    backupRetentionDays: "A fresh backup every day",
    monitoringLevel: "Advanced monitoring",
    supportTier: "Priority",
    supportResponseTime: "Within 30 minutes",
    migrationIncluded: "Included",
    staging: "Yes",
    sshAccess: "Yes, provided",
    cdn: "Free Cloudflare CDN setup",
    region: "US/EU",
    bestFor: "Multiple high-traffic sites",
    mostPopular: false,
  },
  {
    slug: "managed",
    name: "Managed",
    service: "managed-hosting",
    price: 56000,
    priceIsFrom: true,
    billingPeriod: "Yearly",
    renewalPrice: "Same price every year, no increase",
    websitesIncluded: "Scoped to your project",
    storageGb: "Sized to your requirements",
    freeSsl: "Yes",
    bandwidth: "Unlimited",
    addonDomains: "Unlimited",
    subdomains: "Unlimited",
    ram: "Sized to your requirements",
    cpu: "Sized to your requirements",
    databases: "Unlimited",
    emailAccounts: "Unlimited",
    backupFrequency: "Daily, with recovery testing",
    backupRetentionDays: "A fresh backup every day",
    monitoringLevel: "Proactive server monitoring",
    supportTier: "Direct access to your server team",
    supportResponseTime: "Within 30 minutes",
    migrationIncluded: "Included",
    staging: "Yes",
    sshAccess: "Yes, provided",
    cdn: "Free Cloudflare CDN setup",
    region: "US/EU",
    bestFor: "Custom or dedicated servers without an in-house sysadmin",
    mostPopular: false,
  },
];

/** Rows for the comparison table, in display order. */
export const planSpecRows: { key: PlanSpecKey; label: string }[] = [
  { key: "billingPeriod", label: "Billing period" },
  { key: "renewalPrice", label: "Renewal price" },
  { key: "storageGb", label: "SSD space (GB)" },
  { key: "freeSsl", label: "Free SSL" },
  { key: "bandwidth", label: "Monthly bandwidth" },
  { key: "websitesIncluded", label: "Websites" },
  { key: "addonDomains", label: "Addon domains" },
  { key: "emailAccounts", label: "Email accounts" },
  { key: "databases", label: "Databases" },
  { key: "subdomains", label: "Subdomains" },
  { key: "ram", label: "RAM" },
  { key: "cpu", label: "CPU" },
  { key: "backupFrequency", label: "Backups" },
  { key: "backupRetentionDays", label: "Backup retention" },
  { key: "monitoringLevel", label: "Monitoring" },
  { key: "supportTier", label: "Support tier" },
  { key: "supportResponseTime", label: "Support response time" },
  { key: "migrationIncluded", label: "Migration" },
  { key: "staging", label: "Staging site" },
  { key: "sshAccess", label: "SSH access" },
  { key: "cdn", label: "CDN" },
  { key: "region", label: "Server region" },
  { key: "bestFor", label: "Best for" },
];

const isCount = (v: Spec) => /^\d+$/.test(v);
const plural = (n: string, word: string) => `${n} ${word}${n === "1" ? "" : "s"}`;

/**
 * Feature bullets for plan cards, in the house style ("3GB SSD Space",
 * "Free SSL", ...). Unconfirmed values are left out here;
 * the comparison table shows them as "Ask us".
 */
export function planFeatureLines(plan: HostingPlan): string[] {
  const lines: (string | null)[] = [];
  const { storageGb, freeSsl, bandwidth, addonDomains, emailAccounts, databases, subdomains } = plan;

  if (!isPending(storageGb)) {
    lines.push(isCount(storageGb) ? `${storageGb}GB SSD Space` : `SSD Space ${storageGb.toLowerCase()}`);
  }
  if (!isPending(freeSsl)) lines.push(freeSsl === "Yes" ? "Free SSL" : "No Free SSL");
  if (!isPending(bandwidth)) {
    lines.push(bandwidth === "Unlimited" ? "Unlimited Monthly Bandwidth" : `${bandwidth} Monthly Bandwidth`);
  }
  if (!isPending(addonDomains)) {
    lines.push(isCount(addonDomains) ? plural(addonDomains, "Addon Domain") : `${addonDomains} Addon Domains`);
  }
  if (!isPending(emailAccounts) && emailAccounts === databases) {
    lines.push(`${emailAccounts} Emails/Databases`);
  } else {
    if (!isPending(emailAccounts)) lines.push(`${emailAccounts} Emails`);
    if (!isPending(databases)) lines.push(`${databases} Databases`);
  }
  if (!isPending(subdomains)) {
    lines.push(isCount(subdomains) ? plural(subdomains, "Subdomain") : `${subdomains} Subdomains`);
  }
  return lines.filter((l): l is string => l !== null);
}

export function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString("en-US")}`;
}

/** Every hosting and email package is billed annually. */
export const pricePeriod = "per year";

/** The price without the billing period, for cards that style the period separately. */
export function planPriceAmount(plan: HostingPlan) {
  return plan.priceIsFrom ? `Starting from ${formatPkr(plan.price)}` : formatPkr(plan.price);
}

export function planPriceLabel(plan: HostingPlan) {
  return `${planPriceAmount(plan)} ${pricePeriod}`;
}

/** Brief form with this plan preselected. */
export function planContactHref(plan: { slug: string; service: string }) {
  return `/contact?service=${plan.service}&plan=${plan.slug}`;
}

export function plansForService(service: HostingPlan["service"]) {
  return hostingPlans.filter((p) => p.service === service);
}

export function getPlan(slug: string) {
  return hostingPlans.find((p) => p.slug === slug);
}

// Add-ons and SLA terms. Add-on prices set 2026-10-25 from the owner's brief;
// SLA remedy and monitoring hours set the same day.
export const hostingAddOns: { name: string; price: Spec; unit: Spec }[] = [
  { name: "Extra storage", price: "PKR 1,000", unit: "per extra 5 GB, per year" },
  { name: "Extra website", price: "PKR 2,500", unit: "per site, per year" },
  { name: "Extra mailbox", price: "PKR 1,700", unit: "per mailbox, per year" },
];

export const slaSummary = {
  // Published as a confirmed claim in lib/data/trust.ts.
  uptimeCommitment: "99.9%",
  uptimeRemedy: "A pro-rata credit for the downtime, applied to your next renewal on request." as Spec,
  monitoringHours: "24/7 automated monitoring" as Spec,
};
