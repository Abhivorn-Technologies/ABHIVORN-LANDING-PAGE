import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Analytics from "@/components/analytics/Analytics";
import CookieSettingsButton from "@/components/analytics/CookieSettingsButton";
import TrackedLink from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { MAIN_SITE_URL, SITE_URL, site } from "@/lib/site";
import { CONSENT_KEY } from "@/lib/consent";
import { GTAG_IDS, GTM_ID } from "@/lib/tags";
import logo from "@/assets/logo.png";
import "./globals.css";

// Self-hosted Inter (variable weight) — no request to Google Fonts, faster first paint.
const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Website, App & Software Development in Hyderabad | Abhivorn",
  applicationName: site.name,
  publisher: site.legalName,
  formatDetection: { telephone: false },
  // Paid-traffic pages stay out of Google search so they don't compete with the main website (Google Ads still crawls them).
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#003A75",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        {/*
          Google tag (GA4 / Ads) and Google Tag Manager with Consent Mode v2, the same setup as the main website.
          Consent defaults to "denied": Google tags set no cookies until the visitor clicks Accept.
        */}
        {GTAG_IDS.length > 0 && <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_IDS[0]}`} />}
        <script
          id="google-tags"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
(function(){var c;try{c=localStorage.getItem('${CONSENT_KEY}')==='granted'?'granted':'denied';}catch(e){c='denied';}
gtag('consent','default',{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c,wait_for_update:500});
gtag('js',new Date());
${GTAG_IDS.map((id) => `gtag('config','${id}');`).join("")}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');})();`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Focused header: logo and one call to action, no site navigation to pull visitors away from the form */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
          <div className="container-custom flex h-16 items-center justify-between">
            <a href={MAIN_SITE_URL} aria-label={`${site.name} website`}>
              <Image src={logo} alt={site.name} className="h-7 w-auto" sizes="150px" priority />
            </a>
            <Button asChild size="sm">
              <TrackedLink href="#quote" eventParams={{ location: "header" }}>
                Get a free quote
              </TrackedLink>
            </Button>
          </div>
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="border-t border-border">
          <div className="container-custom flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>
              © {site.foundingYear}–{year} {site.legalName}. Hyderabad, Telangana.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
              <a href={MAIN_SITE_URL} className="hover:text-foreground">
                abhivorn.com
              </a>
              <a href={`${MAIN_SITE_URL}/privacy`} className="hover:text-foreground">
                Privacy
              </a>
              <a href={`${MAIN_SITE_URL}/terms`} className="hover:text-foreground">
                Terms
              </a>
              <CookieSettingsButton />
            </nav>
          </div>
        </footer>

        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
