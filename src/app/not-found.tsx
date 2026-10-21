import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Page not found | Abhivorn Technologies" };

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center">
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-medium text-foreground sm:text-4xl">This page doesn&apos;t exist</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">The link may be old or mistyped.</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">Get a free quote</Link>
        </Button>
      </div>
    </section>
  );
}
