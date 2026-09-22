import { emailHostingPricing } from "@/lib/data/email-hosting";

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

export type ServiceFeature = {
  title: string;
  description: string;
};

export type ServiceSlug =
  | "web-development"
  | "web-hosting"
  | "managed-hosting"
  | "digital-marketing"
  | "business-email";

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
  overview?: string[];
  benefits: { title: string; description: string }[];
  whoItsFor?: string[];
  features: ServiceFeature[];
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
    overview: [
      "Most business websites fail quietly: slow to load, awkward to update, or built around a template that doesn't match how the business actually works. We start from what the site needs to do (generate leads, take orders, build credibility) and build backward from that, instead of starting from a template and hoping it fits.",
      "Every project includes both the visible design and the engineering underneath it: information architecture, semantic markup, and a codebase that a future developer, ours or someone else's, can actually read and extend.",
    ],
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
    whoItsFor: [
      "Businesses launching their first real website",
      "Companies replacing an outdated or slow site",
      "Brands that need an online store, not just a brochure page",
      "Founders who need a custom web application, not a template",
    ],
    features: [
      {
        title: "Business & corporate websites",
        description:
          "Built around your actual services and how customers find you, not a generic template with your logo swapped in.",
      },
      {
        title: "E-commerce storefronts",
        description:
          "Product catalogs, checkout and payment integration built to handle real transactions, not a demo store.",
      },
      {
        title: "High-conversion landing pages",
        description:
          "Focused, fast-loading pages built around a single goal: a signup, a call or a purchase.",
      },
      {
        title: "Custom web applications",
        description:
          "Beyond a marketing site: internal tools, booking systems and other applications specific to how your business runs.",
      },
      {
        title: "Website redesign & migration",
        description:
          "Content and design migrated over without losing your existing search rankings or breaking inbound links.",
      },
      {
        title: "Ongoing performance optimization",
        description:
          "Speed and Core Web Vitals get checked after launch too, not just once during development.",
      },
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
    pricing: [
      {
        name: "Starter",
        price: "PKR 30,000",
        features: [
          "Up to 5 pages",
          "Responsive design (mobile & desktop)",
          "Contact form integration",
          "Basic on-page SEO setup",
          "1 round of revisions",
        ],
      },
      {
        name: "Business",
        price: "PKR 50,000",
        highlighted: true,
        features: [
          "Up to 10 to 12 pages",
          "Custom design, not a template",
          "Blog or news section",
          "Contact form & WhatsApp integration",
          "On-page SEO setup",
          "2 rounds of revisions",
        ],
      },
      {
        name: "E-commerce / Custom",
        price: "PKR 100,000",
        features: [
          "Full e-commerce storefront or custom web application",
          "Product catalog & payment integration, or custom feature build",
          "Content or product management dashboard",
          "Advanced SEO setup",
          "Performance & security hardening",
          "Priority support during the build",
        ],
      },
    ],
    pricingNote:
      "Pricing shown in PKR reflects a typical project at each tier. Final scope, page count and integrations are confirmed on a discovery call before we quote a fixed price.",
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
      {
        question: "Do you offer fixed pricing?",
        answer:
          "Yes. Once we've scoped your project on a discovery call, you get a fixed price and timeline before work starts, not an open-ended hourly estimate.",
      },
      {
        question: "Will I be able to update the website myself afterward?",
        answer:
          "For most projects, yes. We'll tell you upfront what's editable yourself versus what needs a developer, and walk you through it at handoff.",
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
    overview: [
      "A lot of hosting is sold on price alone, then leaves you to figure out backups, security and downtime on your own once something goes wrong. Every SpeedHost360 hosting plan bundles the operational basics in from the start: SSL, daily backups, security hardening and real monitoring, not add-ons you discover you needed after an incident.",
      "You get server infrastructure sized to your traffic, plus a team that answers when something needs attention, not just a control panel and a support ticket queue.",
    ],
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
    whoItsFor: [
      "Businesses that need their site to just stay up",
      "Teams that got burned by a host with no real support",
      "Sites currently on cramped shared hosting that need more headroom",
    ],
    features: [
      {
        title: "Free SSL certificate",
        description: "Every plan is served over HTTPS from day one, at no extra cost.",
      },
      {
        title: "Daily automated backups",
        description: "A bad update or deploy is a restore, not a rebuild from scratch.",
      },
      {
        title: "Security hardening & firewall rules",
        description: "Server-level configuration to reduce your exposure, not just a default install.",
      },
      {
        title: "Performance & caching configuration",
        description: "Tuned for your site's actual traffic pattern instead of one generic setting for everyone.",
      },
      {
        title: "Uptime & performance monitoring",
        description: "We get alerted to downtime and slowdowns instead of waiting for a customer to complain.",
      },
      {
        title: "Technical support",
        description: "A team that knows your setup, not a first-line agent reading from a script.",
      },
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
      {
        question: "Do you offer business email hosting?",
        answer:
          "Yes. Self-hosted business email on your own domain, priced per mailbox: PKR 15,000 for 3 mailboxes or PKR 20,000 for 6. It's sold alongside any hosting plan, not locked to one.",
      },
      {
        question: "Can I get business email without signing up for hosting?",
        answer:
          "Yes, business email is priced and sold separately from the hosting plans above. Contact us and we'll set it up on its own.",
      },
    ],
    relatedServices: ["business-email", "managed-hosting", "web-development"],
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
    overview: [
      "Standard hosting plans work well until your application outgrows shared infrastructure or needs a specific server configuration. Managed hosting is us taking direct responsibility for that server: provisioning, patching, hardening, monitoring and backups, so your team doesn't have to carry that operational load.",
      "It's built for businesses that need dedicated or custom infrastructure but don't have (or don't want to hire) an in-house systems administrator to run it.",
    ],
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
    whoItsFor: [
      "Businesses without an in-house systems administrator",
      "Teams tired of babysitting server updates themselves",
      "Companies that have already had downtime from an unmanaged server",
    ],
    features: [
      {
        title: "Server provisioning & management",
        description: "New infrastructure set up correctly, or your existing server taken over after an audit.",
      },
      {
        title: "Security hardening & patching",
        description: "Operating system and software patches applied on a schedule, not left to pile up.",
      },
      {
        title: "Proactive monitoring",
        description: "Issues get flagged to us directly instead of waiting for a visitor to report a problem.",
      },
      {
        title: "Daily backups & recovery testing",
        description: "Backups that are actually verified to restore, not just scheduled and forgotten.",
      },
      {
        title: "Performance optimization",
        description: "Server configuration tuned to your application, not a one-size-fits-all default.",
      },
      {
        title: "Ongoing technical support",
        description: "Direct access to the people who manage your server, for the life of the agreement.",
      },
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
      {
        question: "Do I need to already have a server?",
        answer:
          "No. We can provision a new one for you as part of onboarding, or take over an existing server after an infrastructure audit.",
      },
      {
        question: "How is this different from your web hosting plans?",
        answer:
          "Web hosting plans put you on infrastructure we manage at the platform level. Managed hosting means we administer your specific server directly, tailored to your application.",
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
    overview: [
      "Traffic without a plan to convert it is just a bigger number on an analytics dashboard. We treat marketing as the third leg of the same stool as your website and hosting, not a separate channel bolted on afterward, so recommendations account for what your site and infrastructure can actually support.",
      "That also means we're honest about what marketing can and can't do: no guaranteed rankings, no invented case studies, and no vanity metrics standing in for actual leads and customers.",
    ],
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
    whoItsFor: [
      "Businesses with a website but little to no traffic",
      "Companies whose only marketing so far is word of mouth",
      "Teams that tried ads once and couldn't tell if it worked",
      "Sites that rank for their brand name and nothing else",
    ],
    features: [
      {
        title: "Search engine optimization (SEO)",
        description: "Technical, on-page and content SEO aimed at the searches that actually lead to customers.",
      },
      {
        title: "Local SEO",
        description: "Visibility for the searches that matter most to a Pakistan-based business serving local or regional customers.",
      },
      {
        title: "Content strategy",
        description: "Content planned around what your customers are actually searching for, not a generic blog calendar.",
      },
      {
        title: "Social media management",
        description: "Consistent presence on the platforms your customers actually use.",
      },
      {
        title: "Paid campaign management",
        description: "Ad spend tied to tracked conversions, reviewed and adjusted rather than left to run untouched.",
      },
      {
        title: "Conversion rate optimization",
        description: "Improvements to the site itself so the traffic you already have converts at a higher rate.",
      },
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
    pricing: [
      {
        name: "SEO Foundation",
        price: "PKR 30,000",
        features: [
          "Technical SEO audit & fixes",
          "On-page SEO for core pages",
          "Local SEO / Google Business Profile setup",
          "Monthly performance report",
        ],
      },
      {
        name: "Growth",
        price: "PKR 50,000",
        highlighted: true,
        features: [
          "Everything in SEO Foundation",
          "Ongoing content strategy & publishing",
          "Social media management",
          "Conversion rate optimization",
          "Monthly strategy call",
        ],
      },
      {
        name: "Full-Service Marketing",
        price: "PKR 100,000",
        features: [
          "Everything in Growth",
          "Paid campaign management (ad spend billed separately)",
          "Combined SEO, content, social & paid strategy",
          "Dedicated marketing lead",
          "Priority support & reporting",
        ],
      },
    ],
    pricingNote:
      "Pricing shown in PKR as a monthly retainer. Contact us to confirm the current billing cycle; paid ad spend is billed separately from the retainer above.",
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
      {
        question: "Can you work alongside my existing marketing person or agency?",
        answer:
          "Yes. We can take on specific channels, like technical SEO or paid campaigns, alongside your existing team rather than replacing it entirely.",
      },
    ],
    relatedServices: ["web-development", "web-hosting"],
  },

  "business-email": {
    slug: "business-email",
    navLabel: "Business Email",
    title: "Business Email Hosting",
    metaTitle: "Business Email Hosting | SpeedHost360",
    metaDescription:
      "Self-hosted business email on your own domain, priced per mailbox from PKR 15,000. Set up alongside any hosting plan, or entirely on its own.",
    eyebrow: "05 · Email",
    headline: "Look like a real business every time you hit send.",
    subheadline:
      "Self-hosted email on your own domain (you@yourbusiness.com) instead of a free Gmail or Yahoo address, set up and running without the back and forth.",
    primaryCta: "Set Up Business Email",
    overview: [
      "A free email address is one of the fastest ways to look unfinished to a new customer. Business email puts your team on your own domain instead, without requiring you to sign up for a hosting plan or a large enterprise email suite you don't need.",
      "We run the mail server ourselves, so setup, support and billing all go through one place. Mailboxes are typically live within a day of getting your domain details.",
    ],
    benefits: [
      {
        title: "Your own domain, not a free inbox",
        description:
          "Every account sends and receives mail as you@yourbusiness.com, not a Gmail or Yahoo address.",
      },
      {
        title: "Self-hosted, not resold",
        description:
          "We run the mail server ourselves rather than reselling a third-party mailbox product, so setup and support stay in one place.",
      },
      {
        title: "Set up in a day",
        description:
          "Accounts are typically configured and running on your domain within a day, not spread across a multi-step signup.",
      },
    ],
    whoItsFor: [
      "Businesses still using a free Gmail or Yahoo address",
      "Teams that moved to a new domain and need matching email",
      "Companies that want mailboxes without committing to a large enterprise email suite",
    ],
    features: [
      {
        title: "Custom domain email",
        description: "Send and receive mail as you@yourbusiness.com instead of a free address.",
      },
      {
        title: "Self-hosted mail server",
        description: "We run the mail server ourselves rather than reselling a Google Workspace or Microsoft 365 seat.",
      },
      {
        title: "Webmail access",
        description: "Check mail from a browser on any device, no separate app required.",
      },
      {
        title: "3 or 6 mailbox plans",
        description: "Priced per mailbox count, not per feature tier, so pricing stays simple.",
      },
      {
        title: "Works with any hosting setup",
        description: "Available alongside a SpeedHost360 hosting plan or entirely on its own.",
      },
      {
        title: "Fast setup",
        description: "Mailboxes are typically configured and running on your domain within a day.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Mailbox count",
        description: "Tell us how many mailboxes you need and the domain they'll run on.",
      },
      {
        step: "02",
        title: "Setup",
        description: "We configure the mail server and the DNS records your domain needs for mail to work.",
      },
      {
        step: "03",
        title: "Go live",
        description: "Mailboxes are created and accessible through webmail or your preferred mail app.",
      },
      {
        step: "04",
        title: "Ongoing support",
        description: "Reach us directly for new mailboxes, password resets or changes, no ticket queue.",
      },
    ],
    pricing: emailHostingPricing,
    pricingNote:
      "Priced and billed per mailbox, independent of any hosting plan. Contact us to confirm the billing cycle or to price a custom mailbox count.",
    faq: [
      {
        question: "How is business email priced?",
        answer:
          "Per mailbox: PKR 15,000 for 3 mailboxes or PKR 20,000 for 6. Contact us to confirm the billing cycle for your plan.",
      },
      {
        question: "Is this Google Workspace or Microsoft 365?",
        answer:
          "No. It's a self-hosted mail server we run ourselves, not a resold Google Workspace or Microsoft 365 seat.",
      },
      {
        question: "Can I get business email without signing up for hosting?",
        answer:
          "Yes. Business email is priced and sold separately from our hosting plans, you don't need to be a SpeedHost360 hosting client to set it up.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most mailboxes are set up and running on your domain within a day once we have your details.",
      },
      {
        question: "Do I need to already own a domain?",
        answer:
          "Yes, business email is set up on a domain you already own. If you're not sure how to point DNS, we'll walk you through it.",
      },
    ],
    relatedServices: ["web-hosting", "managed-hosting"],
  },
};

export const serviceList = Object.values(services);
