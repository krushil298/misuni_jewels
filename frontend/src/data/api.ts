import { supabase } from "@/lib/supabase";
import { Product } from "@/types";

/**
 * Fetches all products from Supabase.
 * Returns an empty array on error to prevent page crashes.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("[API] Error fetching products:", error.message);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn("[API] No products found in database");
      return [];
    }

    return data.map(mapDbProductToTypescript);
  } catch (err) {
    console.error("[API] Unexpected error fetching products:", err);
    return [];
  }
}

/**
 * Fetches a single product by its slug.
 * Returns null if not found or on error.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug || typeof slug !== "string") {
    console.error("[API] Invalid slug provided:", slug);
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug.trim())
      .single();

    if (error || !data) {
      if (error?.code !== "PGRST116") {
        // PGRST116 = "not found" — expected for invalid slugs
        console.error("[API] Error fetching product by slug:", error?.message);
      }
      return null;
    }

    return mapDbProductToTypescript(data);
  } catch (err) {
    console.error("[API] Unexpected error fetching product:", err);
    return null;
  }
}

/**
 * Maps Supabase snake_case/lowercase columns to our TypeScript interface.
 * Handles potential missing fields gracefully.
 */
function mapDbProductToTypescript(dbProduct: Record<string, unknown>): Product {
  return {
    id: String(dbProduct.id ?? ""),
    name: String(dbProduct.name ?? ""),
    slug: String(dbProduct.slug ?? ""),
    price: Number(dbProduct.price ?? 0),
    category: String(dbProduct.category ?? ""),
    metal: String(dbProduct.metal ?? ""),
    images: Array.isArray(dbProduct.images) ? dbProduct.images : [],
    description: String(dbProduct.description ?? ""),
    details: Array.isArray(dbProduct.details) ? dbProduct.details : [],
    sizes: Array.isArray(dbProduct.sizes) ? dbProduct.sizes : undefined,
    isBestseller: Boolean(dbProduct.isbestseller ?? false),
    isNew: Boolean(dbProduct.isnew ?? false),
    collection: String(dbProduct.collection ?? ""),
  };
}
