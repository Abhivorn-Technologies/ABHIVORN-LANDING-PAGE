"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CONSENT_EVENT, captureAttribution, getConsent, type ConsentValue } from "@/lib/analytics";
import { GA_ID } from "@/lib/tags";
import ConsentBanner from "./ConsentBanner";

const subscribe = (cb: () => void) => {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
// "pending" on the server and before hydration, so the banner never flashes for people who already chose.
const readConsent = (): ConsentValue | "unset" => getConsent() ?? "unset";
const serverConsent = (): "pending" => "pending";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// A visitor who accepted and now declines gets a reload, so consent starts again from "denied".
const loadedTrackers = () =>
  Boolean(window.clarity || window.dataLayer?.some((e) => (e as { event?: string })?.event === "consent_granted"));

/**
 * Visitor analytics.
 * - Vercel Web Analytics (visitors, pages, referrers, countries, devices) and Speed Insights
 *   (real-user loading experience) are cookieless, so they always run.
 * - Google Tag Manager is loaded in the root layout with Consent Mode v2 defaulting to "denied"; this component
 *   sends the consent "update" when the visitor clicks Accept, so Google tags inside GTM only set cookies then.
 * - The Google tag (GA4 / Google Ads) is loaded the same way, under the same Consent Mode defaults.
 * - Microsoft Clarity (heatmaps + session recordings) loads only after the visitor clicks "Accept".
 */
export default function Analytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribe, readConsent, serverConsent);

  useEffect(() => {
    captureAttribution();
  }, []);

  // Page views on client-side navigation (the first page view is sent by the tags themselves on load)
  const firstPath = useRef(pathname);
  useEffect(() => {
    if (pathname === firstPath.current) return;
    firstPath.current = "";
    if (GA_ID && window.gtag) window.gtag("event", "page_view", { page_path: pathname, page_location: window.location.href });
  }, [pathname]);

  // GTM: page views on client-side navigation (Consent Mode decides what Google tags may store)
  const firstGtmPath = useRef(pathname);
  useEffect(() => {
    if (pathname === firstGtmPath.current) return;
    firstGtmPath.current = "";
    (window.dataLayer ||= []).push({ event: "virtual_page_view", page_path: pathname, page_location: window.location.href });
  }, [pathname]);

  // GTM Consent Mode: tell Google tags once the visitor accepts
  useEffect(() => {
    if (consent !== "granted") return;
    const dl = (window.dataLayer ||= []);
    (function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      dl.push(arguments);
    })("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
    dl.push({ event: "consent_granted" });
  }, [consent]);

  const granted = consent === "granted";

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />

      {granted && CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}

      {consent === "unset" && (
        <ConsentBanner
          onChoice={(v) => {
            // Scripts that already loaded can't be unloaded, so a switch from Accept to Decline reloads the page without them.
            if (v === "denied" && loadedTrackers()) window.location.reload();
            else window.dispatchEvent(new Event(CONSENT_EVENT));
          }}
        />
      )}
    </>
  );
}
