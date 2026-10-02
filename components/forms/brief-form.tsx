"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { briefFormSchema, type BriefFormValues } from "@/lib/validation";
import { budgetOptions, serviceOptions, timelineOptions } from "@/lib/data/forms";
import { trackEvent } from "@/lib/analytics";
import { getStoredUtm } from "@/lib/utm";
import { siteConfig } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { Field, Honeypot, inputClass } from "@/components/forms/fields";

type FieldErrors = Partial<Record<keyof BriefFormValues, string[]>>;

/** Minimal plan info for the plan dropdown (passed from the server). */
export type BriefPlanOption = { slug: string; name: string; service: string; priceLabel: string };
type Service = BriefFormValues["service"];

const hostingServices: Service[] = ["web-hosting", "managed-hosting"];

function initialService(
  plans: BriefPlanOption[],
  param: string | null,
  planParam: string | null
): Service {
  const plan = plans.find((p) => p.slug === planParam);
  if (plan && serviceOptions.some((o) => o.value === plan.service)) return plan.service as Service;
  return serviceOptions.some((o) => o.value === param) ? (param as Service) : "other";
}

// Short project brief: service, budget range, timeline, message, plus how
// to reach you. ?service= and ?plan= preselect the matching options.
export function BriefForm({ plans }: { plans: BriefPlanOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isQuote = searchParams.get("intent") === "quote";
  const planParam = searchParams.get("plan");

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService(plans, searchParams.get("service"), planParam),
    plan: plans.some((p) => p.slug === planParam) ? (planParam as string) : "",
    budget: "",
    timeline: "",
    message: "",
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

  const showPlan = hostingServices.includes(values.service);
  const plansForService = plans.filter((p) => p.service === values.service);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    trackEvent("form_submit", { form: "brief" });

    const parsed = briefFormSchema.safeParse({
      ...values,
      plan: showPlan ? values.plan : "",
      utm: getStoredUtm(),
    });
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

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="What do you need?" htmlFor="service" required error={err("service")}>
          <select
            id="service"
            name="service"
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

        {showPlan ? (
          <Field label="Plan" htmlFor="plan" error={err("plan")}>
            <select
              id="plan"
              name="plan"
              value={values.plan}
              onChange={(e) => updateField("plan", e.target.value)}
              className={inputClass(!!err("plan"))}
            >
              <option value="">Not sure yet, help me choose</option>
              {plansForService.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} ({p.priceLabel})
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <div className="hidden sm:block" />
        )}

        <Field label="Budget range" htmlFor="budget" required error={err("budget")}>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => updateField("budget", e.target.value)}
            aria-invalid={!!err("budget")}
            aria-describedby={described("budget")}
            className={inputClass(!!err("budget"))}
          >
            <option value="" disabled>
              Choose a range
            </option>
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Timeline" htmlFor="timeline" required error={err("timeline")}>
          <select
            id="timeline"
            name="timeline"
            value={values.timeline}
            onChange={(e) => updateField("timeline", e.target.value)}
            aria-invalid={!!err("timeline")}
            aria-describedby={described("timeline")}
            className={inputClass(!!err("timeline"))}
          >
            <option value="" disabled>
              When do you want to start?
            </option>
            {timelineOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

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
