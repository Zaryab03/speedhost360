// Reliability facts and payment methods shown as trust signals across the
// site. Kept in one place so a real change (a new backup cadence, a new
// payment method) only needs updating here.

export const reliabilityStats: { value: string; label: string }[] = [
  { value: "99.9%", label: "Uptime commitment" },
  { value: "Daily", label: "Automated backups" },
  { value: "US/EU", label: "Cloud infrastructure" },
  { value: "Free", label: "SSL on every plan" },
];

export type PaymentMethod = {
  name: string;
  /** Path under /public to the brand's logo. Omitted for generic (non-branded) methods. */
  logo?: string;
};

export const paymentMethods: PaymentMethod[] = [
  { name: "Bank transfer" },
  { name: "JazzCash", logo: "/payments/jazzcash-icon.png" },
  { name: "EasyPaisa", logo: "/payments/easypaisa.png" },
  { name: "Visa", logo: "/payments/visa.svg" },
  { name: "Mastercard", logo: "/payments/mastercard.svg" },
];

export const yearsInBusiness = "6+ years in business";
