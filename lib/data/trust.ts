// Reliability facts and payment terms shown as trust signals across the
// site. Kept in one place so a real change (a new backup cadence, a new
// payment method) only needs updating here.

export const reliabilityStats: { value: string; label: string }[] = [
  { value: "99.9%", label: "Uptime commitment" },
  { value: "Daily", label: "Automated backups" },
  { value: "US/EU", label: "Cloud infrastructure" },
  { value: "Free", label: "SSL on every plan" },
];

// Payment is by bank transfer; account details are sent to the client by email.
export const paymentNote =
  "Payments accepted by bank transfer. We’ll email you our bank account details.";

export const yearsInBusiness = "6+ years in business";
