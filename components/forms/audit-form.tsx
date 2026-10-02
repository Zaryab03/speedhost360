"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { auditFormSchema, type AuditFormValues } from "@/lib/validation";
import { auditFocusOptions } from "@/lib/data/forms";
import { trackEvent } from "@/lib/analytics";
import { getStoredUtm } from "@/lib/utm";
import { Button } from "@/components/ui/button";
import { Field, Honeypot, inputClass } from "@/components/forms/fields";

type FieldErrors = Partial<Record<keyof AuditFormValues, string[]>>;
type Focus = AuditFormValues["focusAreas"][number];

export function AuditForm({ location }: { location: string }) {
  const [values, setValues] = useState({
    websiteUrl: "",
    email: "",
    focusAreas: [] as Focus[],
    notes: "",
    company_website: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "done">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function toggleFocus(value: Focus) {
    setValues((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(value)
        ? prev.focusAreas.filter((v) => v !== value)
        : [...prev.focusAreas, value],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    trackEvent("form_submit", { form: "audit", location });

    const parsed = auditFormSchema.safeParse({ ...values, utm: getStoredUtm() });
    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      setFormError("Please check the highlighted fields and try again.");
      setStatus("error");
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFieldErrors(data.fieldErrors ?? {});
        setFormError(data.error ?? "We couldn't submit your request right now. Please try again.");
        setStatus("error");
        trackEvent("form_error", { form: "audit", location });
        return;
      }
      trackEvent("form_success", { form: "audit", location });
      setStatus("done");
    } catch {
      setFormError("We couldn't submit your request right now. Please try again.");
      setStatus("error");
      trackEvent("form_error", { form: "audit", location });
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="flex items-start gap-3 border border-line-strong p-6">
        <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-signal" aria-hidden />
        <div>
          <p className="text-base font-semibold text-ink">Audit request received.</p>
          <p className="mt-1 text-sm text-ink-muted">
            We&rsquo;ll review your site and email you what we&rsquo;d fix first.
          </p>
        </div>
      </div>
    );
  }

  const err = (key: keyof AuditFormValues) => fieldErrors[key]?.[0];

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Free website audit">
      {formError && (
        <p role="alert" className="border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {formError}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Website address" htmlFor={`${location}-websiteUrl`} required error={err("websiteUrl")}>
          <input
            id={`${location}-websiteUrl`}
            name="websiteUrl"
            inputMode="url"
            placeholder="yourbusiness.com"
            value={values.websiteUrl}
            onChange={(e) => setValues((p) => ({ ...p, websiteUrl: e.target.value }))}
            aria-invalid={!!err("websiteUrl")}
            className={inputClass(!!err("websiteUrl"))}
            autoComplete="url"
          />
        </Field>
        <Field label="Email" htmlFor={`${location}-email`} required error={err("email")}>
          <input
            id={`${location}-email`}
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))}
            aria-invalid={!!err("email")}
            className={inputClass(!!err("email"))}
            autoComplete="email"
          />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 text-xs font-medium text-ink">
          What would you like to improve?<span className="text-signal"> *</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {auditFocusOptions.map((opt) => {
            const id = `${location}-focus-${opt.value}`;
            return (
              <label
                key={opt.value}
                htmlFor={id}
                className="flex cursor-pointer items-center gap-2.5 border border-line px-3 py-2 text-sm text-ink has-[:checked]:border-signal"
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={values.focusAreas.includes(opt.value)}
                  onChange={() => toggleFocus(opt.value)}
                  className="focus-ring size-4 accent-[var(--signal)]"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
        {err("focusAreas") && (
          <p role="alert" className="mt-1.5 text-xs text-danger">
            {err("focusAreas")}
          </p>
        )}
      </fieldset>

      <Field label="Anything else? (optional)" htmlFor={`${location}-notes`} error={err("notes")}>
        <textarea
          id={`${location}-notes`}
          name="notes"
          rows={3}
          value={values.notes}
          onChange={(e) => setValues((p) => ({ ...p, notes: e.target.value }))}
          className={inputClass(!!err("notes"))}
        />
      </Field>

      <Honeypot
        value={values.company_website}
        onChange={(v) => setValues((p) => ({ ...p, company_website: v }))}
      />

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request My Free Audit"}
      </Button>
    </form>
  );
}
