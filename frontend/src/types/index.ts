/** A piece in the catalogue. Mirrors the `products` table. */
export interface Product {
  id: string;
  name: string;
  /** URL-safe identifier used for routing. */
  slug: string;
  /** Price in INR. Display-only — nothing is sold through the site. */
  price: number;
  /** Lowercase category, e.g. "necklaces". */
  category: string;
  /** Metal description, e.g. "18k Yellow Gold". */
  metal: string;
  images: string[];
  description: string;
  /** Bullet-point specifications. */
  details: string[];
  /** Ring/bangle sizes or chain lengths, when applicable. */
  sizes?: string[];
  isBestseller: boolean;
  isNew: boolean;
}

/** A curated grouping shown on the homepage and category rail. */
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

/** A client testimonial. */
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  /** 1–5. */
  rating: number;
  product: string;
}

/** Ordering options on the collections page. */
export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "newest"
  | "bestselling";
