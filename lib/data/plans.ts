// Single source of truth for hosting plan specs. The homepage pricing block,
// /services/web-hosting and /services/managed-hosting all read from here
// (and prisma/seed.ts copies it into the HostingPlan table).
//
// Only prices and facts already published elsewhere on the site are filled
// in. Every other value is TODO_CONFIRM: never replace one with a guess.
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
  storageGb: Spec;
  bandwidth: Spec;
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

const T = TODO_CONFIRM;

export const hostingPlans: HostingPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    service: "web-hosting",
    price: 15000,
    priceIsFrom: false,
    billingPeriod: T,
    renewalPrice: T,
    websitesIncluded: "1",
    storageGb: T,
    bandwidth: T,
    ram: T,
    cpu: T,
    databases: T,
    emailAccounts: T,
    backupFrequency: "Daily",
    backupRetentionDays: T,
    monitoringLevel: T,
    supportTier: "Standard",
    supportResponseTime: T,
    migrationIncluded: "Included",
    staging: T,
    sshAccess: T,
    cdn: T,
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
    billingPeriod: T,
    renewalPrice: T,
    websitesIncluded: "Up to 5",
    storageGb: T,
    bandwidth: T,
    ram: T,
    cpu: T,
    databases: T,
    emailAccounts: T,
    backupFrequency: "Daily",
    backupRetentionDays: T,
    monitoringLevel: "Performance monitoring",
    supportTier: "Priority",
    supportResponseTime: T,
    migrationIncluded: "Included",
    staging: T,
    sshAccess: T,
    cdn: T,
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
    billingPeriod: T,
    renewalPrice: T,
    websitesIncluded: T,
    storageGb: T,
    bandwidth: T,
    ram: T,
    cpu: T,
    databases: T,
    emailAccounts: T,
    backupFrequency: "Daily",
    backupRetentionDays: T,
    monitoringLevel: "Advanced monitoring",
    supportTier: "Priority",
    supportResponseTime: T,
    migrationIncluded: "Included",
    staging: T,
    sshAccess: T,
    cdn: T,
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
    billingPeriod: T,
    renewalPrice: T,
    websitesIncluded: "Scoped to your project",
    storageGb: "Sized to your requirements",
    bandwidth: "Sized to your requirements",
    ram: "Sized to your requirements",
    cpu: "Sized to your requirements",
    databases: "Scoped to your project",
    emailAccounts: T,
    backupFrequency: "Daily, with recovery testing",
    backupRetentionDays: T,
    monitoringLevel: "Proactive server monitoring",
    supportTier: "Direct access to your server team",
    supportResponseTime: T,
    migrationIncluded: "Included",
    staging: T,
    sshAccess: T,
    cdn: T,
    region: "US/EU",
    bestFor: "Custom or dedicated servers without an in-house sysadmin",
    mostPopular: false,
  },
];

/** Rows for the comparison table, in display order. */
export const planSpecRows: { key: PlanSpecKey; label: string }[] = [
  { key: "billingPeriod", label: "Billing period" },
  { key: "renewalPrice", label: "Renewal price" },
  { key: "websitesIncluded", label: "Websites" },
  { key: "storageGb", label: "Storage (GB)" },
  { key: "bandwidth", label: "Bandwidth" },
  { key: "ram", label: "RAM" },
  { key: "cpu", label: "CPU" },
  { key: "databases", label: "Databases" },
  { key: "emailAccounts", label: "Email accounts" },
  { key: "backupFrequency", label: "Backups" },
  { key: "backupRetentionDays", label: "Backup retention (days)" },
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

/** Short spec lines for compact plan cards (homepage). */
export const planCardKeys: { key: PlanSpecKey; label: string }[] = [
  { key: "websitesIncluded", label: "Websites" },
  { key: "storageGb", label: "Storage (GB)" },
  { key: "backupFrequency", label: "Backups" },
  { key: "supportTier", label: "Support" },
];

export function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString("en-US")}`;
}

export function planPriceLabel(plan: HostingPlan) {
  return plan.priceIsFrom ? `Starting from ${formatPkr(plan.price)}` : formatPkr(plan.price);
}

export function plansForService(service: HostingPlan["service"]) {
  return hostingPlans.filter((p) => p.service === service);
}

export function getPlan(slug: string) {
  return hostingPlans.find((p) => p.slug === slug);
}

// Add-ons and SLA terms. Prices and remedies are all unconfirmed.
export const hostingAddOns: { name: string; price: Spec; unit: Spec }[] = [
  { name: "Extra storage", price: T, unit: T },
  { name: "Extra website", price: T, unit: "per site" },
  { name: "Extra mailbox", price: T, unit: "per mailbox" },
];

export const slaSummary = {
  // Published as a confirmed claim in lib/data/trust.ts.
  uptimeCommitment: "99.9%",
  uptimeRemedy: T as Spec,
  monitoringHours: T as Spec,
};
