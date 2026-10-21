"use client";

import { CONSENT_EVENT, CONSENT_KEY } from "@/lib/analytics";

/** Footer link that clears the saved cookie choice so the consent banner appears again. */
export default function CookieSettingsButton({ className }: { className?: string }) {
  const reopen = () => {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      /* storage blocked — the banner shows on every visit anyway */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  return (
    <button type="button" onClick={reopen} className={className}>
      Cookie settings
    </button>
  );
}
