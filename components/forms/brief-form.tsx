"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { briefFormSchema, type BriefFormValues } from "@/lib/validation";
import { serviceOptions } from "@/lib/data/forms";
import { trackEvent } from "@/lib/analytics";
import { getStoredUtm } from "@/lib/utm";
import { siteConfig } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { Field, Honeypot, inputClass } from "@/components/forms/fields";

type FieldErrors = Partial<Record<keyof BriefFormValues, string[]>>;

/** Minimal plan info, used when ?plan= preselects a hosting plan. */
export type BriefPlanOption = { slug: string; name: string; service: string; priceLabel: string };
type Service = BriefFormValues["service"];

function initialService(
  plans: BriefPlanOption[],
  param: string | null,
  planParam: string | null
): Service {
  const plan = plans.find((p) => p.slug === planParam);
  if (plan && serviceOptions.some((o) => o.value === plan.service)) return plan.service as Service;
  return serviceOptions.some((o) => o.value === param) ? (param as Service) : "other";
}

// Short project brief: what you need, about your project, and how to reach
// you. ?service= preselects the service; ?plan= (from a plan's CTA) is
// saved with the lead and pre-fills the project message.
export function BriefForm({ plans }: { plans: BriefPlanOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isQuote = searchParams.get("intent") === "quote";
  const planParam = searchParams.get("plan");
  const chosenPlan = plans.find((p) => p.slug === planParam);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService(plans, searchParams.get("service"), planParam),
    plan: chosenPlan?.slug ?? "",
    message: chosenPlan
      ? `I'm interested in the ${chosenPlan.name} plan (${chosenPlan.priceLabel}).`
      : "",
    company_website: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  function updateField<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    if (!started) {
      setStarted(true);
      trackEvent("form_start", { form: "brief" });
    }
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    trackEvent("form_submit", { form: "brief" });

    // Keep the preselected plan only if it still matches the chosen service.
    const plan = plans.find((p) => p.slug === values.plan)?.service === values.service ? values.plan : "";
    const parsed = briefFormSchema.safeParse({ ...values, plan, utm: getStoredUtm() });
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
        trackEvent("form_error", { form: "brief" });
        return;
      }

      trackEvent("form_success", { form: "brief", service: parsed.data.service });
      router.push("/thank-you");
    } catch {
      setFormError(
        "We couldn't submit your request right now. Please try again or contact us directly on WhatsApp."
      );
      setStatus("error");
      trackEvent("form_error", { form: "brief" });
    }
  }

  const err = (key: keyof BriefFormValues) => fieldErrors[key]?.[0];
  const described = (key: keyof BriefFormValues) => (err(key) ? `${key}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Project brief">
      {formError && (
        <div role="alert" className="border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
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

      <Field label="What do you need?" htmlFor="service" required error={err("service")}>
        <select
          id="service"
          name="service"
          required
          value={values.service}
          onChange={(e) => updateField("service", e.target.value as Service)}
          aria-invalid={!!err("service")}
          aria-describedby={described("service")}
          className={inputClass(!!err("service"))}
        >
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="About your project" htmlFor="message" required error={err("message")}>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={!!err("message")}
          aria-describedby={described("message")}
          className={inputClass(!!err("message"))}
          placeholder={
            isQuote
              ? "What do you need a quote for? Rough scope is enough."
              : "What are you trying to achieve? Link your current site if you have one."
          }
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Name" htmlFor="name" required error={err("name")}>
          <input
            id="name"
            name="name"
            required
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={!!err("name")}
            aria-describedby={described("name")}
            className={inputClass(!!err("name"))}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={err("email")}>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={!!err("email")}
            aria-describedby={described("email")}
            className={inputClass(!!err("email"))}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone / WhatsApp" htmlFor="phone" required error={err("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            aria-invalid={!!err("phone")}
            aria-describedby={described("phone")}
            className={inputClass(!!err("phone"))}
            autoComplete="tel"
          />
        </Field>
      </div>

      <Honeypot value={values.company_website} onChange={(v) => updateField("company_website", v)} />

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send My Brief"}
      </Button>
    </form>
  );
}
