export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** A specific, client-confirmed outcome, e.g. "Mailboxes live in 1 day". */
  result?: string;
  /** Headshot under /public. Only with the person's permission. */
  photo?: { src: string; alt: string };
  /** Company logo under /public. Only with the company's permission. */
  logo?: { src: string; alt: string };
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
  {
    quote:
      "We moved our team onto SpeedHost360's business email plan and it just works. Every account was set up and running on our own domain within a day, with none of the back and forth we expected.",
    name: "Mashood Ibrahim",
    role: "Owner, Equipment Supply PK",
  },
];
