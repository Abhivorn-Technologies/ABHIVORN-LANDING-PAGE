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
