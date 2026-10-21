import type { Metadata } from "next";
import type { Variant } from "./content";
import { SITE_URL } from "./site";

export function variantMetadata(v: Variant): Metadata {
  const url = `${SITE_URL}/${v.slug}`.replace(/\/$/, "");
  return {
    title: { absolute: v.metaTitle },
    description: v.metaDescription,
    alternates: { canonical: url || SITE_URL },
    openGraph: { title: v.metaTitle, description: v.metaDescription, url: url || SITE_URL },
  };
}
