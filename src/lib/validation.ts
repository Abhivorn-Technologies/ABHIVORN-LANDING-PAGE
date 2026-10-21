/** Lead form rules. Kept separate from the form so they can also run on a server endpoint later. */

export type LeadFields = {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  consent: boolean;
};

export type LeadErrors = Partial<Record<keyof LeadFields, string>>;

export const LIMITS = { name: 80, email: 120, phone: 20, message: 3000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s\-()]{7,20}$/;

/** Name, phone, email and service are required; project details are optional to keep the form quick. */
export function validateLead(f: LeadFields): LeadErrors {
  const e: LeadErrors = {};
  const name = f.name.trim();
  const email = f.email.trim();
  const phone = f.phone.trim();
  const message = f.message.trim();

  if (!name) e.name = "Please enter your name.";
  else if (name.length < 2) e.name = "Name looks too short.";
  else if (name.length > LIMITS.name) e.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!phone) e.phone = "Please enter your phone number so we can call you back.";
  else if (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a valid phone number, like +91 98765 43210.";

  if (!email) e.email = "Please enter your email so we can send the proposal.";
  else if (!EMAIL.test(email) || email.length > LIMITS.email) e.email = "Please enter a valid email address, like name@company.com.";

  if (!f.inquiryType) e.inquiryType = "Please choose what you need.";

  if (message.length > LIMITS.message) e.message = `Please keep your message under ${LIMITS.message} characters.`;
  else if ((message.match(/https?:\/\//g) || []).length > 3) e.message = "Please include no more than 3 links.";

  if (!f.consent) e.consent = "Please agree to be contacted so we can reply to you.";

  return e;
}
