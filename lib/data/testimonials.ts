export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  isPlaceholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "SpeedHost360's hosting is genuinely a level above everyone else we've tried, with faster load times, near zero downtime, and a support team that actually responds when it matters.",
    name: "Muhammad Obaid",
    role: "WordPress Developer, Konpal Child Abuse Prevention Society",
  },
  {
    quote:
      "Working with SpeedHost360 has been a smooth, reliable experience from day one, with professional communication, dependable service, and a team we trust to keep our site running.",
    name: "Farhan",
    role: "Admin Manager, Shima Japan Trading",
  },
];
