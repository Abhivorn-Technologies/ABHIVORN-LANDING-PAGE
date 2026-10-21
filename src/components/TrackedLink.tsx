"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = ComponentProps<"a"> & {
  href: string;
  /** Analytics event name, e.g. "cta_click", "email_click" */
  event?: string;
  eventParams?: Record<string, string>;
};

/** A link that also records a click in analytics. Uses next/link for internal URLs. */
export default function TrackedLink({ href, event = "cta_click", eventParams, onClick, children, ...rest }: Props) {
  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, { href, ...eventParams });
    onClick?.(e);
  };
  // Jump links (#quote): scroll to the section every time, even when the URL already ends in that hash,
  // then put the cursor in its first field so the visitor can start typing.
  if (href.startsWith("#")) {
    const jump = (e: React.MouseEvent<HTMLAnchorElement>) => {
      handle(e);
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      target.querySelector<HTMLElement>("input:not([tabindex='-1']), select, textarea")?.focus({ preventScroll: true });
      history.replaceState(null, "", href);
    };
    return (
      <a href={href} onClick={jump} {...rest}>
        {children}
      </a>
    );
  }
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    const isWeb = href.startsWith("http");
    return (
      <a
        href={href}
        onClick={handle}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
