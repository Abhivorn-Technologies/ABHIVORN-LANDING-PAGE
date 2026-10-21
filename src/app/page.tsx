import LandingPage from "@/components/landing/LandingPage";
import { getVariant } from "@/lib/content";
import { variantMetadata } from "@/lib/seo";

const variant = getVariant("")!;

export const metadata = variantMetadata(variant);

export default function HomePage() {
  return <LandingPage variant={variant} />;
}
