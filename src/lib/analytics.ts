"use client";

import { track as vercelTrack } from "@vercel/analytics";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
    google_tag_manager?: unknown;
  }
}

import { CONSENT_KEY } from "./consent";

export { CONSENT_KEY };
/** Fired on window whenever the stored cookie choice changes. */
export const CONSENT_EVENT = "abhivorn-consent-change";
export type ConsentValue = "granted" | "denied";

export function getConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Send one event to every analytics tool that is switched on.
 * - Vercel Web Analytics: cookieless, always on
 * - Google Tag Manager: a dataLayer event (Consent Mode keeps Google tags cookieless until the visitor accepts)
 * - Google Analytics 4 / Google Ads set directly by ID: only after the visitor accepts cookies
 * - Microsoft Clarity: tags the session so recordings can be filtered by event
 */
export function trackEvent(name: string, params: Params = {}) {
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)) as Record<
    string,
    string | number | boolean
  >;
  try {
    vercelTrack(name, clean);
  } catch {
    /* analytics must never break the page */
  }
  try {
    window.gtag?.("event", name, clean);
  } catch {
    /* ignore */
  }
  try {
    // Google Tag Manager: queued even if GTM is still loading. Consent Mode decides what Google tags may store.
    (window.dataLayer ||= []).push({ event: name, ...clean });
  } catch {
    /* ignore */
  }
  try {
    window.clarity?.("event", name);
  } catch {
    /* ignore */
  }
}

/* ---------- First-touch attribution (where a lead came from) ---------- */

const ATTR_KEY = "abhivorn-attribution";

export type Attribution = {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm?: string;
  /** Google Ads click ID, present when the visitor came from an ad */
  gclid?: string;
  firstVisit: string;
};

/** Saves where the visitor first arrived from, once per browser session. */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(ATTR_KEY)) return;
    const url = new URL(window.location.href);
    const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
    const data: Attribution = {
      landingPage: url.pathname,
      referrer: ref || "Direct",
      utmSource: url.searchParams.get("utm_source") || "",
      utmMedium: url.searchParams.get("utm_medium") || "",
      utmCampaign: url.searchParams.get("utm_campaign") || "",
      utmTerm: url.searchParams.get("utm_term") || "",
      gclid: url.searchParams.get("gclid") || "",
      firstVisit: new Date().toISOString(),
    };
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(data));
  } catch {
    /* storage can be blocked — that's fine */
  }
}

export function getAttribution(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(ATTR_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
