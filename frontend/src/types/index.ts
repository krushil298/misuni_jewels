/** A product available in the jewellery catalog */
export interface Product {
  /** Unique identifier (from Supabase) */
  id: string;
  /** Display name */
  name: string;
  /** URL-safe identifier for routing */
  slug: string;
  /** Price in INR */
  price: number;
  /** Product category (e.g., "necklaces", "rings") */
  category: string;
  /** Metal type (e.g., "18k Yellow Gold") */
  metal: string;
  /** Array of image URLs */
  images: string[];
  /** Full product description */
  description: string;
  /** Bullet-point feature details */
  details: string[];
  /** Available sizes, if applicable */
  sizes?: string[];
  /** Whether this product is marked as a bestseller */
  isBestseller: boolean;
  /** Whether this product is newly added */
  isNew: boolean;
  /** Collection this product belongs to */
  collection: string;
}

/** An item in the shopping cart */
export interface CartItem {
  /** The product being purchased */
  product: Product;
  /** Quantity in cart */
  quantity: number;
  /** Selected size option */
  selectedSize?: string;
  /** Selected metal option */
  selectedMetal?: string;
}

/** A product collection or category grouping */
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Cover image URL */
  image: string;
  /** Number of products in this collection */
  productCount: number;
}

/** A customer testimonial/review */
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  /** Star rating (1-5) */
  rating: number;
  /** Product name the testimonial is about */
  product: string;
}

/** Alias: A wishlisted product is just a Product reference */
export type WishlistItem = Product;

/** Sort options for the collections page */
export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "newest"
  | "bestselling";
