"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isEmailConfigured, sendContactEmail } from "@/lib/emailjs";
import { trackEvent } from "@/lib/analytics";
import { ADS_ID, ADS_LEAD_LABEL } from "@/lib/tags";
import { inquiryTypes } from "@/lib/content";
import { MAIN_SITE_URL, site } from "@/lib/site";
import { LIMITS, validateLead, type LeadErrors, type LeadFields } from "@/lib/validation";

// Spam protection without a CAPTCHA: a hidden honeypot field, a minimum fill time and a resend cooldown.
const MIN_FILL_MS = 3000;
const RESEND_COOLDOWN_MS = 60_000;
const LAST_SENT_KEY = "abhivorn-lead-last-sent";

const fieldOrder: (keyof LeadFields)[] = ["name", "phone", "email", "inquiryType", "message", "consent"];

const selectClass =
  "flex h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm";

/** Short enquiry form for ad visitors. On success it sends the lead by email, records the conversion and opens /thank-you. */
export default function LeadForm({ defaultInquiry = "", formId }: { defaultInquiry?: string; formId: string }) {
  const empty = { name: "", phone: "", email: "", inquiryType: defaultInquiry, message: "", consent: false, website: "" };
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<LeadErrors>({});
  const startedAt = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = (k: string) => `${formId}-${k}`;

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!startedAt.current) {
      startedAt.current = Date.now();
      trackEvent("contact_form_start", { form: formId });
    }
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
    if (errors[k as keyof LeadErrors]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const check = (k: keyof LeadFields) => () => setErrors((prev) => ({ ...prev, [k]: validateLead(form)[k] }));

  const errorProps = (k: keyof LeadFields) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${id(k)}-error` } : {});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateLead(form);
    setErrors(found);
    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${id(firstInvalid)}`)?.focus();
      return;
    }

    // Bots fill the hidden field or submit instantly. Show them the normal thank-you page and send nothing.
    const tooFast = !startedAt.current || Date.now() - startedAt.current < MIN_FILL_MS;
    if (form.website || tooFast) {
      router.push("/thank-you");
      return;
    }

    try {
      const last = Number(localStorage.getItem(LAST_SENT_KEY) || 0);
      if (Date.now() - last < RESEND_COOLDOWN_MS) {
        toast.error("We've just received your details. Please wait a minute before sending again.");
        return;
      }
    } catch {
      /* storage blocked — skip the cooldown */
    }

    if (!isEmailConfigured()) {
      toast.error(`We couldn't send your details right now. Please email us at ${site.email}.`);
      trackEvent("contact_form_error", { reason: "not_configured", form: formId });
      return;
    }

    setSubmitting(true);
    try {
      await sendContactEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        inquiryType: form.inquiryType,
        message: form.message.trim() || "No details given (landing page quick form)",
      });
      try {
        localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
      trackEvent("generate_lead", { inquiry_type: form.inquiryType, form: formId });
      // Google Ads conversion, when the conversion label is set (Consent Mode decides whether cookies are used)
      if (ADS_ID && ADS_LEAD_LABEL) window.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}` });
      router.push("/thank-you");
    } catch {
      trackEvent("contact_form_error", { reason: "send_failed", form: formId });
      toast.error(`Sorry, your details didn't go through. Please try again, or email ${site.email}.`);
      setSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="relative space-y-4" noValidate>
      {/* Honeypot: hidden from people, catches bots */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
      </div>

      <Field id={id("name")} label="Your name *" error={errors.name}>
        <Input
          id={id("name")}
          name="name"
          maxLength={LIMITS.name}
          autoComplete="name"
          className="h-11"
          value={form.name}
          onChange={set("name")}
          onBlur={check("name")}
          {...errorProps("name")}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id("phone")} label="Phone *" error={errors.phone}>
          <Input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            maxLength={LIMITS.phone}
            className="h-11"
            value={form.phone}
            onChange={set("phone")}
            onBlur={check("phone")}
            {...errorProps("phone")}
          />
        </Field>
        <Field id={id("email")} label="Email *" error={errors.email}>
          <Input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            className="h-11"
            value={form.email}
            onChange={set("email")}
            onBlur={check("email")}
            {...errorProps("email")}
          />
        </Field>
      </div>
      <Field id={id("inquiryType")} label="What do you need? *" error={errors.inquiryType}>
        <select
          id={id("inquiryType")}
          name="inquiryType"
          className={selectClass}
          value={form.inquiryType}
          onChange={set("inquiryType")}
          onBlur={check("inquiryType")}
          {...errorProps("inquiryType")}
        >
          <option value="">Select one</option>
          {inquiryTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field id={id("message")} label="Project details (optional)" error={errors.message}>
        <Textarea
          id={id("message")}
          name="message"
          rows={3}
          maxLength={LIMITS.message}
          placeholder="A line or two about what you'd like to build"
          className="text-base md:text-sm"
          value={form.message}
          onChange={set("message")}
          onBlur={check("message")}
          {...errorProps("message")}
        />
      </Field>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[hsl(var(--accent))]"
            checked={form.consent}
            onChange={set("consent")}
            {...errorProps("consent")}
          />
          <label htmlFor={id("consent")} className="text-sm text-muted-foreground">
            I agree to be contacted by {site.name} about my enquiry, as described in the{" "}
            <a href={`${MAIN_SITE_URL}/privacy`} className="font-medium text-primary underline underline-offset-2">
              privacy policy
            </a>
            .
          </label>
        </div>
        <FieldError id={id("consent")} message={errors.consent} />
      </div>

      <Button type="submit" size="xl" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            Get my free quote <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">No cost, no obligation. We reply within one business day.</p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      <FieldError id={id} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-destructive" role="alert">
      {message}
    </p>
  );
}
