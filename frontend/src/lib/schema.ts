/**
 * Generates JSON-LD structured data for SEO.
 * These are rendered as <script type="application/ld+json"> tags.
 */

import type { Product } from "@/types";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MISUNI JEWELS",
    url: "https://misunijewels.com",
    logo: "https://misunijewels.com/logo-dark.png",
    description:
      "Real diamond jewellery crafted in gold, white gold & rose gold. Purity. Integrity. Brilliance.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-99999-99999",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://instagram.com/misunijewels",
      "https://facebook.com/misunijewels",
    ],
  };
}

export function getProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: "MISUNI JEWELS",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "MISUNI JEWELS",
      },
    },
    material: product.metal,
    category: product.category,
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MISUNI JEWELS",
    url: "https://misunijewels.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://misunijewels.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
