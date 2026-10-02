import { z } from "zod";
import {
  auditFocusOptions,
  budgetOptions,
  optionValues,
  serviceOptions,
  timelineOptions,
} from "@/lib/data/forms";

// Honeypot: accepted here so the route can silently drop the submission
// (returning a validation error would tell the bot what tripped it).
const honeypot = z.string().max(500).optional();

const utmSchema = z
  .object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
  })
  .optional();

export const briefFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone or WhatsApp number.")
    .max(30, "Please enter a valid phone or WhatsApp number.")
    .regex(/^[\d+\-\s()]+$/, "Please enter a valid phone or WhatsApp number."),
  service: z.enum(optionValues(serviceOptions), { error: "Please choose a service." }),
  plan: z.enum(["starter", "business", "professional", "managed"]).optional().or(z.literal("")),
  budget: z.enum(optionValues(budgetOptions), { error: "Please choose a budget range." }),
  timeline: z.enum(optionValues(timelineOptions), { error: "Please choose a timeline." }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a bit more about your project.")
    .max(5000, "Please keep this under 5,000 characters."),
  company_website: honeypot,
  utm: utmSchema,
});

export type BriefFormValues = z.infer<typeof briefFormSchema>;

// Accepts "example.com" as well as full URLs; always stored with a scheme.
const websiteUrl = z
  .string()
  .trim()
  .min(1, "Please enter your website address.")
  .max(500)
  .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
  .refine(
    (v) => {
      try {
        const url = new URL(v);
        return /^https?:$/.test(url.protocol) && url.hostname.includes(".");
      } catch {
        return false;
      }
    },
    { message: "Please enter a valid website address, e.g. yourbusiness.com." }
  );

export const auditFormSchema = z.object({
  websiteUrl,
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  focusAreas: z
    .array(z.enum(optionValues(auditFocusOptions)))
    .min(1, "Pick at least one thing you'd like to improve."),
  notes: z.string().trim().max(2000, "Please keep this under 2,000 characters.").optional(),
  company_website: honeypot,
  utm: utmSchema,
});

export type AuditFormValues = z.infer<typeof auditFormSchema>;

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
