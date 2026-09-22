// Reliability facts and payment methods shown as trust signals across the
// site. Kept in one place so a real change (a new backup cadence, a new
// payment method) only needs updating here.

export const reliabilityStats: { value: string; label: string }[] = [
  { value: "99.9%", label: "Uptime commitment" },
  { value: "Daily", label: "Automated backups" },
  { value: "US/EU", label: "Cloud infrastructure" },
  { value: "Free", label: "SSL on every plan" },
];

export const paymentMethods: string[] = [
  "Bank transfer",
  "JazzCash",
  "EasyPaisa",
  "Card / online payment",
];

export const yearsInBusiness = "6+ years in business";
