import { notFound } from "next/navigation";
import LandingPage from "@/components/landing/LandingPage";
import { getVariant, variants } from "@/lib/content";
import { variantMetadata } from "@/lib/seo";

// Only the listed service pages exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return variants.filter((v) => v.slug).map((v) => ({ service: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const variant = getVariant((await params).service);
  return variant ? variantMetadata(variant) : {};
}

export default async function ServiceLandingPage({ params }: { params: Promise<{ service: string }> }) {
  const variant = getVariant((await params).service);
  if (!variant) notFound();
  return <LandingPage variant={variant} />;
}
