import type { MetadataRoute } from "next";

// Pages carry a noindex tag instead of being blocked here, so Google Ads can still check them.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }] };
}
