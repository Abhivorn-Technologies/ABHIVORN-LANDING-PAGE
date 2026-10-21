/**
 * Company facts used on the landing pages. Keep them in line with the main website (src/lib/site.ts there).
 */

/** Where this landing site is served, e.g. https://go.abhivorn.com */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://go.abhivorn.com").replace(/\/$/, "");
/** The main company website */
export const MAIN_SITE_URL = (process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://www.abhivorn.com").replace(/\/$/, "");

export const site = {
  name: "Abhivorn Technologies",
  legalName: "Abhivorn Technologies Pvt Ltd",
  foundingYear: 2025,
  email: "hello@abhivorn.com",
  hours: "Mon–Fri, 9:00 AM – 6:00 PM IST",
} as const;

export const offices = ["Cyber Towers, HITEC City, Hyderabad", "KPHB Colony, Kukatpally, Hyderabad", "Karimnagar, Telangana"];

/** Same figures as the main website's home and about pages. */
export const stats = [
  { value: "50+", label: "Projects delivered" },
  { value: "15", label: "Member delivery team" },
  { value: "3", label: "Offices in Telangana" },
  { value: "2", label: "In-house products" },
] as const;
