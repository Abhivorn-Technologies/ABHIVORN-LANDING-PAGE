# Abhivorn landing page

Google Ads landing pages for Abhivorn Technologies, served at **go.abhivorn.com**. Same design and Google tag setup as the main website ([abhivorn.com](https://www.abhivorn.com)), with a short lead form instead of site navigation.

## Pages

| URL | Use it for ad groups about | Form pre-selects |
| --- | --- | --- |
| `go.abhivorn.com/` | General software / app / website development | Nothing |
| `go.abhivorn.com/website` | Website design and development | New website |
| `go.abhivorn.com/mobile-app` | iOS and Android apps | Mobile app |
| `go.abhivorn.com/custom-software` | ERP, CRM, portals, dashboards | Custom software |
| `go.abhivorn.com/thank-you` | Shown after a lead is sent | |

Copy for every page lives in `src/lib/content.ts`. Pages are `noindex`, so they don't compete with the main website in Google search; Google Ads can still crawl them.

## Leads

The form sends name, phone, email, service and optional details through **EmailJS**, the same as the main website's contact form. Each email also says where the lead came from (`Google Ads`, UTM campaign and keyword, landing page). Add `{{lead_source}}` and `{{landing_page}}` to the EmailJS template to see them.

Spam protection: a hidden honeypot field, a minimum fill time and a one-minute resend cooldown.

## Conversion tracking

On a successful send the page:

1. pushes `generate_lead` to the dataLayer and GA4 (mark it as a key event in GA4),
2. fires the Google Ads conversion when `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` is set,
3. opens `/thank-you`, which can also be used as a URL-based conversion goal.

Google tags load under Consent Mode v2 and set no cookies until the visitor accepts the cookie banner.

## Setup

1. **Vercel:** import this repo as a new project. Add the variables from `.env.example`.
2. **Domain:** in the Vercel project, open Settings → Domains and add `go.abhivorn.com`. At your domain provider, add the DNS record Vercel shows (a `CNAME` for `go` pointing to `cname.vercel-dns.com`).
3. **EmailJS:** use the same service, template and public key as the main website, and add `go.abhivorn.com` to the allowed domains in EmailJS.
4. **Google Ads:** in Goals → Conversions, create a "Submit lead form" conversion (website, manual setup with a Google tag), copy its label (the part after `AW-18110944464/`) into `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`, then redeploy.

## Development

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run lint && npm run typecheck && npm run build
```
