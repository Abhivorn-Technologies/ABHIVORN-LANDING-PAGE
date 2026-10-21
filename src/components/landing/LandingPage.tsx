import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import TrackedLink from "@/components/TrackedLink";
import LeadForm from "./LeadForm";
import type { Variant } from "@/lib/content";
import { steps, work } from "@/lib/content";
import { site, stats } from "@/lib/site";

const promises = ["Free consultation and written quote", "Reply within one business day", "You own the source code"];

export default function LandingPage({ variant }: { variant: Variant }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: variant.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero with the form above the fold */}
      <section className="border-b border-border">
        <div className="container-custom grid gap-12 py-12 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
          <div className="animate-fade-in-up [animation-fill-mode:both]">
            <p className="eyebrow">{variant.eyebrow}</p>
            <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">{variant.h1}</h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{variant.intro}</p>
            <ul className="mt-8 space-y-3">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-3 text-foreground">
                  <Check className="h-5 w-5 shrink-0 text-accent" aria-hidden /> {p}
                </li>
              ))}
            </ul>
            <dl className="mt-10 hidden grid-cols-4 gap-6 border-t border-border pt-8 sm:grid">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl font-medium text-foreground">{s.value}</dd>
                  <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div id="quote" className="scroll-mt-24 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-medium text-foreground">Get a free quote</h2>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">Tell us a little about your project. It takes under a minute.</p>
            <LeadForm formId="quote" defaultInquiry={variant.inquiryType} />
          </div>
        </div>
      </section>

      {/* Stats on phones, where the hero hides them to keep the form close to the top */}
      <section className="border-b border-border sm:hidden">
        <dl className="container-custom grid grid-cols-2 gap-6 py-10">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-medium text-foreground">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* What we build */}
      <section className="section-padding">
        <div className="container-custom">
          <Heading eyebrow="What we build" title="Everything your business needs online, from one team" />
          <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {variant.offerings.map((o) => (
              <li key={o.title} className="border-b border-border py-6 sm:pr-10">
                <h3 className="text-lg font-medium text-foreground">{o.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{o.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent work */}
      <section className="section-padding border-t border-border">
        <div className="container-custom">
          <Heading eyebrow="Recent work" title="Products we've built for our clients" />
          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((p) => (
              <li key={p.name} className="flex flex-col border-t border-border pt-6">
                <p className="eyebrow">{p.category}</p>
                <h3 className="mt-3 text-2xl font-medium text-foreground">{p.name}</h3>
                <p className="mt-3 leading-relaxed text-foreground/80">{p.headline}</p>
                {p.url && (
                  <TrackedLink
                    href={p.url}
                    event="project_visit"
                    eventParams={{ project: p.name }}
                    className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                    aria-label={`Visit ${p.name} website`}
                  >
                    Visit <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </TrackedLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding border-t border-border">
        <div className="container-custom">
          <Heading eyebrow="How it works" title="From first call to launch" />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-border pt-6">
                <p className="text-sm font-medium text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-lg font-medium text-foreground">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding border-t border-border">
        <div className="container-custom grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Heading eyebrow="FAQ" title="Questions we're often asked" className="mb-0 md:mb-0" />
          <Accordion type="single" collapsible className="border-t border-border">
            {variant.faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`faq-${i}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left text-lg font-medium text-foreground hover:no-underline">{f.question}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final call to action */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="container-custom flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-medium sm:text-4xl">Tell us what you want to build</h2>
            <p className="mt-3 text-lg text-primary-foreground/80">
              Free consultation with our team in Hyderabad. Prefer email? Write to {site.email}.
            </p>
          </div>
          <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90">
            <TrackedLink href="#quote" eventParams={{ location: "final_cta" }}>
              Get a free quote <ArrowRight className="h-4 w-4" aria-hidden />
            </TrackedLink>
          </Button>
        </div>
      </section>
    </>
  );
}

function Heading({ eyebrow, title, className = "" }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={`mb-12 max-w-2xl md:mb-16 ${className}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-medium text-foreground sm:text-4xl">{title}</h2>
    </div>
  );
}
