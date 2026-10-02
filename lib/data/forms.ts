// Option lists shared by the public forms (client), their API routes
// (server validation) and the admin views (labels).

export const serviceOptions = [
  { value: "web-development", label: "Web Development" },
  { value: "web-hosting", label: "Web Hosting" },
  { value: "managed-hosting", label: "Managed Hosting" },
  { value: "business-email", label: "Business Email" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "other", label: "Other / Not sure yet" },
] as const;

// Budget and timeline are no longer asked on the brief form; kept so the
// admin can still label older leads that have them.
export const budgetOptions = [
  { value: "under-50k", label: "Under PKR 50,000" },
  { value: "50k-100k", label: "PKR 50,000 – 100,000" },
  { value: "100k-250k", label: "PKR 100,000 – 250,000" },
  { value: "250k-plus", label: "PKR 250,000+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "within-1-month", label: "Within a month" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "flexible", label: "Flexible / just exploring" },
] as const;

export const auditFocusOptions = [
  { value: "speed", label: "Speed" },
  { value: "seo", label: "Search rankings (SEO)" },
  { value: "design", label: "Design and mobile experience" },
  { value: "conversions", label: "Getting more enquiries" },
  { value: "security", label: "Security" },
  { value: "hosting", label: "Hosting and uptime" },
] as const;

type Option = { readonly value: string; readonly label: string };

export function optionValues<T extends readonly Option[]>(options: T) {
  return options.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]];
}

export function optionLabel(options: readonly Option[], value: string | null | undefined) {
  if (!value) return null;
  return options.find((o) => o.value === value)?.label ?? value;
}
