"use client";

import { MAIN_SITE_URL } from "@/lib/site";
import { motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONSENT_KEY, type ConsentValue } from "@/lib/analytics";

export default function ConsentBanner({ onChoice }: { onChoice: (v: ConsentValue) => void }) {
  const choose = (v: ConsentValue) => {
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {
      /* ignore */
    }
    onChoice(v);
  };

  return (
    <motion.div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
      className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:left-4 sm:max-w-md"
    >
      <div className="rounded-lg border border-border bg-background/95 p-5 backdrop-blur-md">
        <div className="flex gap-3">
          <Cookie className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden />
          <p className="text-sm text-muted-foreground">
            We use cookies to understand how visitors use our site and to improve it. You can accept or decline
            analytics cookies. Read our{" "}
            <a href={`${MAIN_SITE_URL}/privacy`} className="font-medium text-primary underline underline-offset-2">
              privacy policy
            </a>
            .
          </p>
        </div>
        <div className="mt-4 flex gap-3">
          <Button size="sm" variant="hero" className="flex-1" onClick={() => choose("granted")}>
            Accept
          </Button>
          <Button size="sm" variant="heroOutline" className="flex-1" onClick={() => choose("denied")}>
            Decline
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
