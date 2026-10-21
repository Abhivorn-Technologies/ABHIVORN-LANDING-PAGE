"use client";

import emailjs from "@emailjs/browser";
import { getAttribution } from "./analytics";

const config = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  contactTemplateId: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
};

export const isEmailConfigured = () => Boolean(config.serviceId && config.contactTemplateId && config.publicKey);

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
};

/**
 * Sends the enquiry to the team inbox. Lead-source details (landing page, referrer, UTM campaign)
 * are attached automatically so every lead shows where it came from.
 * Note: add {{lead_source}} and {{landing_page}} to the EmailJS template to see them.
 */
export async function sendContactEmail(data: ContactPayload) {
  const a = getAttribution();
  const source = a
    ? [
        a.gclid && "Google Ads",
        a.utmSource && `${a.utmSource}${a.utmMedium ? ` / ${a.utmMedium}` : ""}`,
        a.utmCampaign && `campaign: ${a.utmCampaign}`,
        a.utmTerm && `keyword: ${a.utmTerm}`,
        a.referrer,
      ]
        .filter(Boolean)
        .join(" · ")
    : "Unknown";

  return emailjs.send(
    config.serviceId,
    config.contactTemplateId,
    {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "Not provided",
      inquiry_type: data.inquiryType,
      message: data.message,
      to_name: "Abhivorn Technologies",
      lead_source: source,
      landing_page: a?.landingPage || "Unknown",
      submitted_from: typeof window !== "undefined" ? `${window.location.host}${window.location.pathname}` : "",
    },
    { publicKey: config.publicKey },
  );
}
