/**
 * Site-wide constants.
 *
 * This is the single source of truth for brand copy and contact details.
 * Anything user-facing that appears in more than one place belongs here —
 * the phone number in particular was previously duplicated across four files.
 */

export const SITE_NAME = "MISUNI JEWELS";
export const SITE_TAGLINE = "Purity. Integrity. Brilliance.";
export const SITE_DESCRIPTION =
  "Natural diamond jewellery in 14k & 18k gold, white gold, rose gold and platinum. A private catalogue from Bandra Kurla Complex, Mumbai. Enquire on WhatsApp.";
export const SITE_URL = "https://misunijewels.com";

/**
 * TODO(owner): replace the placeholder number and email before launch.
 * `whatsapp` must be digits only, including country code and no leading +.
 */
export const CONTACT = {
  phoneDisplay: "+91 99999 99999",
  phoneHref: "+919999999999",
  whatsapp: "919999999999",
  email: "hello@misunijewels.com",
  instagram: "https://instagram.com/misunijewels",
  facebook: "https://facebook.com/misunijewels",
} as const;

export const LOCATION = {
  label: "Bandra Kurla Complex",
  city: "Mumbai",
  lines: ["Bandra Kurla Complex", "Bandra East, Mumbai 400051", "Maharashtra, India"],
  /** No retail store — pieces are shown by appointment. */
  byAppointmentOnly: true,
  hours: [
    { days: "Monday — Saturday", time: "11:00 AM — 7:00 PM" },
    { days: "Sunday", time: "By appointment" },
  ],
} as const;

export const CATEGORIES = [
  "necklaces",
  "rings",
  "earrings",
  "bracelets",
  "bangles",
  "pendants",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Metal families used by the filter UI — matched loosely against product.metal. */
export const METAL_FILTERS = [
  "Yellow Gold",
  "White Gold",
  "Rose Gold",
  "Platinum",
] as const;

export const NAV_LINKS = [
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Atelier" },
  { href: "/contact", label: "Contact" },
] as const;

/** Trust marks shown under the enquiry CTA and in the footer. */
export const ASSURANCES = [
  { title: "Natural Diamonds", detail: "IGI / GIA certified stones" },
  { title: "BIS Hallmarked", detail: "Certified 14k & 18k gold" },
  { title: "Made to Order", detail: "Bespoke sizing & metal" },
  { title: "Mumbai Atelier", detail: "Viewing by appointment, BKC" },
] as const;
