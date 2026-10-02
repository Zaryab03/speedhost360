// Central, single-source business facts. Every component/page should read
// from here instead of hardcoding contact details, hours, or the domain —
// so a real value only ever needs to change in one place.

export const siteConfig = {
  name: "SpeedHost360",
  domain: "speedhost360.com",
  url: "https://speedhost360.com",
  tagline: "Build. Host. Grow.",
  description:
    "Websites, reliable infrastructure, and digital marketing built to turn your online presence into a business asset.",

  whatsappNumber: "+923402046835",
  whatsappDisplay: "+92 340 2046835",
  get whatsappLink() {
    return `https://wa.me/${this.whatsappNumber.replace(/[^\d]/g, "")}`;
  },
  /** WhatsApp deep link with a pre-filled message. Never put user data in `text`. */
  whatsappLinkWithText(text: string) {
    return `${this.whatsappLink}?text=${encodeURIComponent(text)}`;
  },

  // PLACEHOLDER — confirm the real business phone/email/address before launch.
  phoneNumber: "+923402046835",
  phoneDisplay: "+92 340 2046835",
  email: "hello@speedhost360.com",

  hours: {
    days: "Monday – Friday",
    time: "9:00 AM – 5:00 PM",
    timezone: "Pakistan Standard Time (PKT)",
  },

  responseTimePromise: "We respond to new inquiries within 1 business day.",

  // No public status/uptime page exists yet. Set the real URL here once it
  // does; until then the link is hidden everywhere.
  statusPageUrl: "TODO_CONFIRM" as string,

  // PLACEHOLDER — set real, live profiles only. Leave an entry out entirely
  // rather than link to an account that doesn't exist.
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  },

  // PLACEHOLDER — replace with the real registered address once confirmed
  // publicly appropriate to disclose.
  address: {
    isPlaceholder: true,
    street: "",
    city: "Lahore",
    country: "Pakistan",
  },

  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_ID ?? "",

  // ERPNext Helpdesk (client portal). Configure via NEXT_PUBLIC_HELPDESK_URL;
  // components must read it from here, never hardcode it.
  helpdeskUrl: process.env.NEXT_PUBLIC_HELPDESK_URL || "https://clients.speedhost360.com",
  helpdeskHelperText: "Existing customers can raise and track support requests here.",
} as const;
