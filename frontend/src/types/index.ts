export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  metal: string;
  images: string[];
  description: string;
  details: string[];
  sizes?: string[];
  isBestseller: boolean;
  isNew: boolean;
  collection: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMetal?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  product: string;
}
