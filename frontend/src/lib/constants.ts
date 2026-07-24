/** Site-wide constants & configuration */

export const SITE_NAME = "MISUNI JEWELS";
export const SITE_TAGLINE = "Purity. Integrity. Brilliance.";
export const SITE_DESCRIPTION =
  "Real diamond jewellery crafted in gold, white gold & rose gold. Purity. Integrity. Brilliance. Shop necklaces, rings, earrings, bracelets & bangles.";
export const SITE_URL = "https://misunijewels.com";

export const CONTACT = {
  email: "hello@misunijewels.com",
  phone: "+91 99999 99999",
  whatsapp: "919999999999",
  instagram: "https://instagram.com/misunijewels",
  facebook: "https://facebook.com/misunijewels",
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

export const METALS = [
  "14k Yellow Gold",
  "14k Rose Gold",
  "14k White Gold",
  "18k Yellow Gold",
  "18k Rose Gold",
  "18k White Gold",
  "Platinum & 18k Gold",
] as const;

export type Metal = (typeof METALS)[number];

export const NAV_LINKS = [
  { href: "/collections", label: "Collections" },
  { href: "/contact", label: "Contact" },
] as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
