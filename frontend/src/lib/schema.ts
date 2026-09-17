/**
 * JSON-LD structured data.
 *
 * Rendered as <script type="application/ld+json"> tags. Every claim here
 * must match what the site actually says — search engines penalise
 * structured data that contradicts the visible page.
 */

import type { Product } from "@/types";
import { CONTACT, LOCATION, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

/**
 * `JewelryStore` with no `openingHours` and an explicit
 * `publicAccess: false` — pieces are shown by appointment, not from a
 * walk-in shopfront.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/lockup.png`,
    image: `${SITE_URL}/brand/full.png`,
    description: SITE_DESCRIPTION,
    priceRange: "₹₹₹",
    publicAccess: false,
    address: {
      "@type": "PostalAddress",
      streetAddress: LOCATION.lines[0],
      addressLocality: LOCATION.city,
      addressRegion: "Maharashtra",
      postalCode: "400051",
      addressCountry: "IN",
    },
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneHref,
      email: CONTACT.email,
      contactType: "sales",
      availableLanguage: ["English", "Hindi", "Gujarati", "Marathi"],
    },
    sameAs: [CONTACT.instagram, CONTACT.facebook],
  };
}

/**
 * Product schema.
 *
 * Nothing is sold online, so this advertises no `price` or `availability`.
 * Claiming `InStock` with a checkout price on a catalogue that has neither
 * is exactly what Google's merchant policies flag.
 */
export function getProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.slug,
    category: product.category,
    material: product.metal,
    brand: { "@type": "Brand", name: SITE_NAME },
    url: `${SITE_URL}/product/${product.slug}`,
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
