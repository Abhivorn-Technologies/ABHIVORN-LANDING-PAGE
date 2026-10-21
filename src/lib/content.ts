/**
 * Landing page copy. Each variant is its own URL so an ad group can point at the page that matches its keywords:
 * go.abhivorn.com/ (general), /website, /mobile-app and /custom-software.
 * Project and FAQ wording comes from the main website; don't add claims that aren't there.
 */

export type Faq = { question: string; answer: string };

export type Variant = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Option pre-selected in the lead form */
  inquiryType: string;
  offerings: { title: string; description: string }[];
  faqs: Faq[];
};

export const inquiryTypes = [
  "New website",
  "E-commerce store",
  "Web application / custom software",
  "Mobile app (iOS / Android)",
  "HRMS / VORN HR",
  "Healthcare / VORQARD",
  "AI & automation",
  "Something else",
];

const generalOfferings = [
  { title: "Websites", description: "Fast business websites and landing pages that work on every phone and are ready for Google." },
  { title: "E-commerce stores", description: "Catalogues, carts, checkout with Razorpay/UPI/COD, order tracking and an admin console." },
  { title: "Web applications", description: "Booking systems, customer portals and dashboards with secure logins." },
  { title: "Mobile apps", description: "iOS and Android apps, designed, built, tested and published to the stores." },
  { title: "Custom software", description: "ERP, CRM, HRMS and workflow automation built around how your team works." },
  { title: "AI & automation", description: "Document reading, chatbots and automated workflows inside your existing systems." },
];

const generalFaqs: Faq[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "A business website usually takes 2–4 weeks, a web or mobile app 6–14 weeks, and larger platforms are delivered in phases. You'll get a clear timeline before we start.",
  },
  {
    question: "How do you price projects?",
    answer:
      "Every project is quoted after we understand the scope, so you only pay for what you need. Share your requirements and we'll send a detailed proposal with timelines.",
  },
  {
    question: "Will we own the source code?",
    answer: "Yes. Once the project is complete, the source code and deployment belong to you.",
  },
  {
    question: "Do you provide support after launch?",
    answer: "Yes. Every project includes a bug-fix warranty after launch, and we offer ongoing maintenance and enhancements after that.",
  },
  {
    question: "Where is your team based?",
    answer:
      "Our head office is at Cyber Towers, HITEC City, Hyderabad, with branches in KPHB and Karimnagar. We work with clients across India and overseas.",
  },
];

export const variants: Variant[] = [
  {
    slug: "",
    metaTitle: "Website, App & Software Development Company in Hyderabad | Abhivorn",
    metaDescription:
      "Get a free consultation and quote for your website, mobile app or custom software from Abhivorn Technologies, Hyderabad.",
    eyebrow: "Software development company · Hyderabad",
    h1: "Websites, apps and software, built for your business",
    intro:
      "Tell us what you need and get a clear plan, timeline and quote. Our Hyderabad team designs, builds and supports websites, web applications and mobile apps for businesses across India.",
    inquiryType: "",
    offerings: generalOfferings,
    faqs: generalFaqs,
  },
  {
    slug: "website",
    metaTitle: "Website Design & Development Company in Hyderabad | Abhivorn",
    metaDescription:
      "Business websites, landing pages and e-commerce stores that load fast and bring enquiries. Get a free quote from Abhivorn Technologies, Hyderabad.",
    eyebrow: "Website development · Hyderabad",
    h1: "A fast, professional website that brings you enquiries",
    intro:
      "Business websites, e-commerce stores and web applications that load fast, work on every phone and are ready for Google from day one.",
    inquiryType: "New website",
    offerings: [
      { title: "Business & corporate websites", description: "Modern websites that explain what you do clearly and make it easy to get in touch." },
      { title: "E-commerce stores", description: "Catalogues, carts, checkout with Razorpay/UPI/COD, order tracking and an admin console." },
      { title: "Landing pages", description: "Launch and campaign pages with lead capture built in." },
      { title: "Web applications", description: "Booking systems, portals and SaaS platforms with secure logins and dashboards." },
      { title: "SEO & performance", description: "Server-rendered pages, structured data, sitemaps and fast loading from day one." },
      { title: "Multilingual sites", description: "English, Telugu and Hindi versions for audiences across India." },
    ],
    faqs: [
      {
        question: "How long does it take to build a website?",
        answer: "A business website usually takes 2–4 weeks. E-commerce stores and web applications typically take 6–10 weeks depending on features.",
      },
      {
        question: "Can I update the content myself?",
        answer: "Yes. We can add an admin panel or CMS so your team can update products, pages and blog posts without a developer.",
      },
      {
        question: "Do you provide hosting and domain setup?",
        answer: "We handle deployment, domain connection, SSL and analytics setup as part of the launch.",
      },
      generalFaqs[1],
      generalFaqs[3],
    ],
  },
  {
    slug: "mobile-app",
    metaTitle: "Mobile App Development Company in Hyderabad, iOS & Android | Abhivorn",
    metaDescription:
      "iOS and Android apps designed, built and published to the stores by Abhivorn Technologies, Hyderabad. Get a free consultation and quote.",
    eyebrow: "Mobile app development · Hyderabad",
    h1: "Your iOS and Android app, designed, built and launched",
    intro:
      "From the first version to the Play Store and App Store: we design, build, test and publish your app, then keep improving it after launch.",
    inquiryType: "Mobile app (iOS / Android)",
    offerings: [
      { title: "iOS and Android apps", description: "One team for both platforms, from first design to store release." },
      { title: "Customer, vendor and rider apps", description: "Connected apps for marketplaces and delivery businesses, with an admin panel." },
      { title: "Booking and service apps", description: "Appointments, payments and notifications for service businesses." },
      { title: "App design", description: "Clickable designs you can try before any code is written." },
      { title: "Store publishing", description: "Play Store and App Store submission under your developer accounts." },
      { title: "Support after launch", description: "Bug fixes, updates for new OS versions and new features." },
    ],
    faqs: [
      {
        question: "How long does it take to build an app?",
        answer: "A first version (MVP) typically takes 8–14 weeks, including design, development, testing and store submission.",
      },
      {
        question: "Will you publish the app to the stores?",
        answer: "Yes. We handle Play Store and App Store submission under your developer accounts.",
      },
      generalFaqs[1],
      generalFaqs[2],
      generalFaqs[3],
    ],
  },
  {
    slug: "custom-software",
    metaTitle: "Custom Software Development Company in Hyderabad | Abhivorn",
    metaDescription:
      "Customer portals, dashboards, ERP, CRM and workflow automation built around your business by Abhivorn Technologies, Hyderabad. Get a free quote.",
    eyebrow: "Custom software development · Hyderabad",
    h1: "Software built around how your business actually works",
    intro:
      "Customer portals, admin dashboards, ERP, CRM and workflow automation, designed for your process instead of forcing your team to work around a generic tool.",
    inquiryType: "Web application / custom software",
    offerings: [
      { title: "Customer portals", description: "Let customers log in, place orders, track work and download documents." },
      { title: "Admin dashboards", description: "One place to see sales, operations and team activity in real time." },
      { title: "ERP & CRM", description: "Sales, inventory, billing and customer records that fit your process." },
      { title: "HRMS", description: "Attendance, leave and payroll with PF, ESI and professional tax." },
      { title: "Workflow automation", description: "Replace spreadsheets and manual steps with automated approvals, alerts and scheduled jobs." },
      { title: "Integrations", description: "Payment gateways, accounting tools, biometric devices, ERPs and custom APIs." },
    ],
    faqs: [
      {
        question: "Can you work with our existing systems?",
        answer: "Yes. We regularly integrate with payment gateways, accounting tools, biometric devices, ERPs and custom APIs.",
      },
      generalFaqs[2],
      generalFaqs[0],
      generalFaqs[1],
      generalFaqs[3],
    ],
  },
];

export const getVariant = (slug: string) => variants.find((v) => v.slug === slug);

/** Recent client work, as listed on the main website's projects page. */
export const work = [
  { name: "LIMOVI", category: "Finance", headline: "A 360° gold asset platform: invest, borrow, liquidate and wear", url: "https://limovi.in/" },
  {
    name: "Multi New Trends",
    category: "E-commerce",
    headline: "A hyperlocal shopping and delivery platform with customer, vendor and rider apps",
    url: "https://www.multinewtrends.com/",
  },
  { name: "VORQARD", category: "Healthcare", headline: "Our own connected healthcare platform for patients, doctors and clinics", url: "https://www.vorqard.com" },
  { name: "Well Wisher", category: "Healthcare", headline: "Booking for hospital-visit companions and patient support", url: "https://www.wellwisherinfo.com/" },
  { name: "SCROLME", category: "E-commerce", headline: "Social commerce built on short-form video", url: "https://www.scrollme.co/" },
  { name: "CINQ by RAGHAVA", category: "Real Estate", headline: "An ultra-luxury real estate launch site for a 61-floor, 5-tower project" },
];

export const steps = [
  { title: "Share your idea", description: "Fill in the form. We call you back within one business day to understand what you need." },
  { title: "Get a plan and quote", description: "A written proposal with scope, timeline and price, so you know exactly what you're getting." },
  { title: "Design and build", description: "Designs you can click through first, then development with a working demo at every milestone." },
  { title: "Launch and support", description: "Testing, launch and a bug-fix warranty, then ongoing improvements if you need them." },
];
