export type PricingPlan = {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  highlighted?: boolean;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServiceSlug =
  | "web-development"
  | "web-hosting"
  | "managed-hosting"
  | "digital-marketing";

export type ServiceContent = {
  slug: ServiceSlug;
  navLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  benefits: { title: string; description: string }[];
  features: string[];
  process: ProcessStep[];
  pricing?: PricingPlan[];
  pricingNote?: string;
  faq: FaqItem[];
  relatedServices: ServiceSlug[];
};

export const services: Record<ServiceSlug, ServiceContent> = {
  "web-development": {
    slug: "web-development",
    navLabel: "Web Development",
    title: "Website Development",
    metaTitle: "Website Development Services | SpeedHost360",
    metaDescription:
      "Business websites, e-commerce, landing pages and custom web applications: designed, built and optimized by SpeedHost360.",
    eyebrow: "01 · Build",
    headline: "Websites built to work, not just look good.",
    subheadline:
      "Corporate sites, online stores, landing pages and custom web applications: engineered for speed, clarity and conversion from the first commit.",
    primaryCta: "Start Your Website Project",
    benefits: [
      {
        title: "Built for performance",
        description:
          "Every project is scoped around Core Web Vitals from day one, not patched in afterward.",
      },
      {
        title: "Structured for growth",
        description:
          "Clean information architecture and semantic markup that scale as your content and traffic grow.",
      },
      {
        title: "One handoff, no gaps",
        description:
          "Development connects directly into our hosting and marketing services, so nothing falls through the cracks after launch.",
      },
    ],
    features: [
      "Business & corporate websites",
      "E-commerce storefronts",
      "High-conversion landing pages",
      "Custom web applications",
      "Website redesign & migration",
      "Ongoing performance optimization",
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description:
          "We map your goals, audience and content before any design work starts.",
      },
      {
        step: "02",
        title: "Design",
        description:
          "Wireframes and visual design reviewed with you before a single line of production code.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Development against real content, with performance and accessibility checked continuously.",
      },
      {
        step: "04",
        title: "Launch & Handoff",
        description:
          "Deployed onto SpeedHost360 hosting with monitoring in place, plus a walkthrough of what you own.",
      },
    ],
    faq: [
      {
        question: "How long does website development take?",
        answer:
          "A focused business website typically takes 3–6 weeks from signed-off content to launch; e-commerce and custom applications take longer depending on scope. You'll get a specific timeline after discovery.",
      },
      {
        question: "Can you work with an existing website?",
        answer:
          "Yes, we regularly redesign, extend or migrate existing sites rather than starting from zero, once we've reviewed what's already there.",
      },
      {
        question: "Do you provide hosting after the site is built?",
        answer:
          "Yes, hosting and managed hosting are core services; see our Web Hosting and Managed Hosting pages for details.",
      },
    ],
    relatedServices: ["web-hosting", "digital-marketing"],
  },

  "web-hosting": {
    slug: "web-hosting",
    navLabel: "Web Hosting",
    title: "Web Hosting",
    metaTitle: "Web Hosting Services | SpeedHost360",
    metaDescription:
      "Reliable web hosting with SSL, backups, security and monitoring. Plans starting at PKR 15,000 for businesses in Pakistan and beyond.",
    eyebrow: "02 · Host",
    headline: "Infrastructure your website can depend on.",
    subheadline:
      "SSL, backups, security hardening, performance tuning and real monitoring: the operational basics most hosts skip.",
    primaryCta: "Explore Hosting Plans",
    benefits: [
      {
        title: "Secured by default",
        description:
          "SSL, hardened server configuration and regular security patching on every plan.",
      },
      {
        title: "Backed up, not hoped for",
        description:
          "Daily backups so a bad deploy or update is never a full rebuild.",
      },
      {
        title: "Actually monitored",
        description:
          "We watch for downtime and performance issues instead of waiting for you to notice first.",
      },
    ],
    features: [
      "Free SSL certificate",
      "Daily automated backups",
      "Security hardening & firewall rules",
      "Performance & caching configuration",
      "Uptime & performance monitoring",
      "Technical support",
    ],
    process: [
      {
        step: "01",
        title: "Plan selection",
        description: "We match a plan to your traffic and application needs.",
      },
      {
        step: "02",
        title: "Provisioning",
        description: "Server configured, SSL issued, backups scheduled.",
      },
      {
        step: "03",
        title: "Migration (if needed)",
        description: "Existing sites moved over with minimal downtime.",
      },
      {
        step: "04",
        title: "Ongoing monitoring",
        description: "Uptime and performance tracked for the life of the plan.",
      },
    ],
    pricing: [
      {
        name: "Starter",
        price: "PKR 15,000",
        features: [
          "1 website",
          "Free SSL",
          "Daily backups",
          "Standard support",
        ],
      },
      {
        name: "Business",
        price: "PKR 25,000",
        highlighted: true,
        features: [
          "Up to 5 websites",
          "Free SSL",
          "Daily backups",
          "Performance monitoring",
          "Priority support",
        ],
      },
      {
        name: "Professional",
        price: "PKR 40,000",
        features: [
          "Multiple high-traffic sites",
          "Free SSL",
          "Daily backups",
          "Advanced monitoring",
          "Priority support",
        ],
      },
    ],
    pricingNote:
      "Pricing shown in PKR. Contact us to confirm the current billing cycle and any traffic- or storage-based adjustments for your project. Every plan is backed by a 99.9% uptime commitment and daily automated backups.",
    faq: [
      {
        question: "Can you migrate my existing website?",
        answer:
          "Yes, migration is included as part of onboarding to a hosting plan; we handle DNS, files and databases to minimize downtime.",
      },
      {
        question: "Do you provide SSL certificates?",
        answer: "Yes, every hosting plan includes a free SSL certificate.",
      },
      {
        question: "What happens if my site goes down?",
        answer:
          "Our monitoring flags downtime immediately and our support team investigates right away. Every hosting plan carries a 99.9% uptime commitment.",
      },
    ],
    relatedServices: ["managed-hosting", "web-development"],
  },

  "managed-hosting": {
    slug: "managed-hosting",
    navLabel: "Managed Hosting",
    title: "Managed Hosting",
    metaTitle: "Managed Hosting Services | SpeedHost360",
    metaDescription:
      "You run the business, we run the infrastructure: server management, security, monitoring and support from SpeedHost360, starting at PKR 56,000.",
    eyebrow: "03 · Manage",
    headline: "You run the business. We run the infrastructure.",
    subheadline:
      "Server management, security, updates, monitoring, backups and performance optimization handled by us, so your team never has to think about the server.",
    primaryCta: "Talk to Us About Managed Hosting",
    benefits: [
      {
        title: "Full operational ownership",
        description:
          "We manage the server layer end to end, not just the hosting account.",
      },
      {
        title: "Security as a standing practice",
        description:
          "Patching, hardening and monitoring happen on a schedule, not only after something breaks.",
      },
      {
        title: "A real technical support line",
        description:
          "Direct access to people who understand your specific setup, not a generic ticket queue.",
      },
    ],
    features: [
      "Server provisioning & management",
      "Security hardening & patching",
      "Proactive monitoring",
      "Daily backups & recovery testing",
      "Performance optimization",
      "Ongoing technical support",
    ],
    process: [
      {
        step: "01",
        title: "Infrastructure audit",
        description:
          "We review your current setup (or design one from scratch) against your traffic and application needs.",
      },
      {
        step: "02",
        title: "Proposal",
        description:
          "You get a concrete infrastructure plan and pricing based on your actual requirements.",
      },
      {
        step: "03",
        title: "Migration & hardening",
        description:
          "We take over server management, apply security hardening, and put monitoring and backups in place.",
      },
      {
        step: "04",
        title: "Ongoing management",
        description:
          "Updates, monitoring and support continue for as long as we manage your infrastructure.",
      },
    ],
    pricing: [
      {
        name: "Managed Hosting",
        price: "Starting from PKR 56,000",
        highlighted: true,
        features: [
          "Server management",
          "Security & monitoring",
          "Backups & recovery",
          "Performance optimization",
          "Technical support",
        ],
      },
    ],
    pricingNote:
      "Final pricing depends on your infrastructure requirements, traffic, server specification, and the number of applications we're managing. We'll scope this with you before quoting a fixed number.",
    faq: [
      {
        question: "Can you manage my existing server?",
        answer:
          "Yes, we start with an infrastructure audit of your current server before taking over management, so nothing is assumed.",
      },
      {
        question: "Is managed hosting the same as shared hosting?",
        answer:
          "No. Managed hosting means we actively administer the server (patching, monitoring, security and performance) rather than just providing an account on shared infrastructure.",
      },
      {
        question: "Do you provide ongoing support?",
        answer:
          "Yes, ongoing technical support is included for the life of a managed hosting agreement.",
      },
    ],
    relatedServices: ["web-hosting", "web-development"],
  },

  "digital-marketing": {
    slug: "digital-marketing",
    navLabel: "Digital Marketing",
    title: "Digital Marketing",
    metaTitle: "Digital Marketing Services | SpeedHost360",
    metaDescription:
      "SEO, local SEO, content strategy, social media, paid campaigns and conversion optimization: digital marketing built on top of a website that's actually fast.",
    eyebrow: "04 · Grow",
    headline: "Traffic is a start. Customers are the goal.",
    subheadline:
      "SEO, content strategy, social media, paid campaigns and conversion optimization: built on top of a website and infrastructure that can actually convert visitors.",
    primaryCta: "Get a Marketing Quote",
    benefits: [
      {
        title: "Grounded in your infrastructure",
        description:
          "Because we also build and host your site, marketing recommendations account for real technical constraints, not just channel tactics.",
      },
      {
        title: "Measured, not guessed",
        description:
          "Every campaign is tied to tracked events (CTA clicks, form submissions, WhatsApp conversations), not vanity metrics.",
      },
      {
        title: "Built for the long term",
        description:
          "SEO and content foundations compound over time instead of disappearing the moment ad spend stops.",
      },
    ],
    features: [
      "Search engine optimization (SEO)",
      "Local SEO",
      "Content strategy",
      "Social media management",
      "Paid campaign management",
      "Conversion rate optimization",
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "We review your current traffic, content and technical SEO baseline.",
      },
      {
        step: "02",
        title: "Strategy",
        description:
          "A prioritized plan across the channels that fit your business and budget.",
      },
      {
        step: "03",
        title: "Execution",
        description:
          "Content, campaigns and on-site optimization shipped on a regular cadence.",
      },
      {
        step: "04",
        title: "Review & iterate",
        description:
          "Results reviewed against tracked conversions, and the plan adjusted accordingly.",
      },
    ],
    faq: [
      {
        question: "Can you guarantee first-page rankings?",
        answer:
          "No, no legitimate agency can guarantee specific rankings, and we won't promise one. We focus on the technical, content and authority factors that are actually within our control.",
      },
      {
        question: "Do I need a new website for SEO to work?",
        answer:
          "Not necessarily, but site speed and structure matter a lot for SEO. If your current site is holding you back, we'll tell you plainly.",
      },
      {
        question: "What does 'growth' actually mean here?",
        answer:
          "Traffic that turns into engagement, engagement that turns into leads, and leads that turn into customers. Each stage is tracked, not just top-of-funnel visits.",
      },
    ],
    relatedServices: ["web-development", "web-hosting"],
  },
};

export const serviceList = Object.values(services);
