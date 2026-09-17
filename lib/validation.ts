import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  businessName: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone or WhatsApp number.")
    .regex(/^[\d+\-\s()]+$/, "Please enter a valid phone or WhatsApp number."),
  service: z.enum([
    "web-development",
    "web-hosting",
    "managed-hosting",
    "digital-marketing",
    "other",
  ]),
  budget: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a bit more about your project."),
  // Honeypot field — must stay empty. Bots that fill every field trip this.
  company_website: z.string().max(0).optional().or(z.literal("")),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const postSchema = z.object({
  title: z.string().trim().min(3, "Title is required."),
  slug: z
    .string()
    .trim()
    .min(3, "Slug is required.")
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers and hyphens."),
  excerpt: z.string().trim().min(1, "Excerpt is required.").max(300),
  body: z.string().trim().min(1, "Body is required."),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  featuredImageUrl: z.string().trim().optional().or(z.literal("")),
  socialImageUrl: z.string().trim().optional().or(z.literal("")),
  seoTitle: z.string().trim().max(70).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(160).optional().or(z.literal("")),
  canonicalUrl: z.string().trim().optional().or(z.literal("")),
  category: z.string().trim().optional().or(z.literal("")),
  tags: z.array(z.string().trim()).default([]),
});

export type PostFormValues = z.infer<typeof postSchema>;

export const leadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"]),
});
