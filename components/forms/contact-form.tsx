"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";
import { getStoredUtm } from "@/lib/utm";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";
import { MessageCircle } from "lucide-react";

const serviceOptions: { value: ContactFormValues["service"]; label: string }[] = [
  { value: "web-development", label: "Web Development" },
  { value: "web-hosting", label: "Web Hosting" },
  { value: "managed-hosting", label: "Managed Hosting" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "other", label: "Other / Not sure yet" },
];

type FieldErrors = Partial<Record<keyof ContactFormValues, string[]>>;

export function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isQuote = searchParams.get("intent") === "quote";

  const [values, setValues] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: "other" as ContactFormValues["service"],
    message: "",
    company_website: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function updateField<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    trackEvent("form_submit", { form: "contact" });

    const parsed = contactFormSchema.safeParse({ ...values, utm: getStoredUtm() });
    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      setStatus("error");
      setFormError("Please check the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFieldErrors(data.fieldErrors ?? {});
        setFormError(
          data.error ??
            "We couldn't submit your request right now. Please try again or contact us directly on WhatsApp."
        );
        setStatus("error");
        trackEvent("form_error", { form: "contact" });
        return;
      }

      trackEvent("form_success", { form: "contact" });
      router.push("/thank-you");
    } catch {
      setFormError(
        "We couldn't submit your request right now. Please try again or contact us directly on WhatsApp."
      );
      setStatus("error");
      trackEvent("form_error", { form: "contact" });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {formError && (
        <div
          role="alert"
          className="border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
        >
          <p>{formError}</p>
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 font-medium underline underline-offset-2"
          >
            <MessageCircle size={14} /> Message us on WhatsApp instead
          </a>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={fieldErrors.name?.[0]}>
          <input
            id="name"
            name="name"
            required
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={inputClass(!!fieldErrors.name)}
            autoComplete="name"
          />
        </Field>

        <Field label="Business name" htmlFor="businessName" error={fieldErrors.businessName?.[0]}>
          <input
            id="businessName"
            name="businessName"
            value={values.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
            className={inputClass(!!fieldErrors.businessName)}
            autoComplete="organization"
          />
        </Field>

        <Field label="Email" htmlFor="email" required error={fieldErrors.email?.[0]}>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClass(!!fieldErrors.email)}
            autoComplete="email"
          />
        </Field>

        <Field label="Phone / WhatsApp" htmlFor="phone" required error={fieldErrors.phone?.[0]}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClass(!!fieldErrors.phone)}
            autoComplete="tel"
          />
        </Field>

        <Field label="Service" htmlFor="service" required error={fieldErrors.service?.[0]}>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(e) =>
              updateField("service", e.target.value as ContactFormValues["service"])
            }
            className={inputClass(!!fieldErrors.service)}
          >
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Project details" htmlFor="message" required error={fieldErrors.message?.[0]}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={inputClass(!!fieldErrors.message)}
          placeholder={
            isQuote
              ? "Tell us what you need a quote for: service, rough scope, and timeline."
              : "Tell us about your project: goals, timeline, and anything else useful."
          }
        />
      </Field>

      {/* Honeypot — hidden from real visitors, screen readers, and tab order */}
      <input
        type="text"
        name="company_website"
        value={values.company_website}
        onChange={(e) => updateField("company_website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Let's Build It"}
      </Button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `focus-ring w-full border bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted ${
    hasError ? "border-danger" : "border-line-strong"
  }`;
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-ink">
        {label}
        {required && <span className="text-signal"> *</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
