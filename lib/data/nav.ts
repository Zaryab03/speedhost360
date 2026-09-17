export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const serviceLinks: NavLink[] = [
  {
    label: "Web Development",
    href: "/services/web-development",
    description: "Business, e-commerce & custom web apps",
  },
  {
    label: "Web Hosting",
    href: "/services/web-hosting",
    description: "SSL, backups, monitoring, support",
  },
  {
    label: "Managed Hosting",
    href: "/services/managed-hosting",
    description: "We run your infrastructure end to end",
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    description: "SEO, content, paid & conversion",
  },
];

export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
