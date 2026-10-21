import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAIN_SITE_URL, site } from "@/lib/site";

export const metadata = { title: "Thank you | Abhivorn Technologies" };

/** Shown after a lead is sent. Can also be used as a URL-based conversion goal in Google Ads (go.abhivorn.com/thank-you). */
export default function ThankYouPage() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="container-custom py-20 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" aria-hidden />
        <h1 className="mt-6 text-balance text-4xl font-medium text-foreground sm:text-5xl">Thank you, we&rsquo;ve got your details</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Our team will get back to you within one business day ({site.hours}). For anything urgent, email {site.email}.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={`${MAIN_SITE_URL}/projects`}>See more of our work</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={MAIN_SITE_URL}>Visit abhivorn.com</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
