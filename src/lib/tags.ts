/** Google tag IDs. These are public: they ship in the page source of every site that uses them. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PSX78PTV";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-T85PQHQ4C6";
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18110944464";
/** Label of the Google Ads "Lead" conversion action (Google Ads › Goals › Conversions › the action › Tag setup). */
export const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

/** IDs configured through gtag.js (Google Analytics 4, Google Ads). */
export const GTAG_IDS = [GA_ID, ADS_ID].filter(Boolean) as string[];
