import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

/** Columns the storefront needs. Selecting explicitly keeps payloads small. */
const PRODUCT_FIELDS =
  "id,name,slug,price,category,metal,images,description,details,sizes,is_bestseller,is_new";

/**
 * Fetch every product, newest first.
 * Returns an empty array on error so a page renders its empty state
 * rather than crashing.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_FIELDS)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[api] getProducts:", error.message);
      return [];
    }

    return (data ?? []).map(mapProduct);
  } catch (err) {
    console.error("[api] getProducts (unexpected):", err);
    return [];
  }
}

/** Fetch a single product by slug. Returns null when not found. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug?.trim()) return null;

  try {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_FIELDS)
      .eq("slug", slug.trim())
      .maybeSingle();

    if (error) {
      console.error("[api] getProductBySlug:", error.message);
      return null;
    }

    return data ? mapProduct(data) : null;
  } catch (err) {
    console.error("[api] getProductBySlug (unexpected):", err);
    return null;
  }
}

/** Distinct slugs, for `generateStaticParams`. */
export async function getProductSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("products").select("slug");
    if (error || !data) return [];
    return data.map((row) => String(row.slug)).filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Map a database row to the `Product` shape.
 *
 * The columns are snake_case (`is_bestseller`, `is_new`). A previous version
 * read `isbestseller` / `isnew` without the underscore, so every product came
 * back with `isBestseller: false` — which silently emptied the homepage
 * Bestsellers section and both product badges.
 */
function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id ?? ""),
    name: String(row.name ?? ""),
    slug: String(row.slug ?? ""),
    price: Number(row.price ?? 0),
    category: String(row.category ?? ""),
    metal: String(row.metal ?? ""),
    images: Array.isArray(row.images) ? (row.images as string[]) : [],
    description: String(row.description ?? ""),
    details: Array.isArray(row.details) ? (row.details as string[]) : [],
    sizes: Array.isArray(row.sizes) ? (row.sizes as string[]) : undefined,
    isBestseller: Boolean(row.is_bestseller),
    isNew: Boolean(row.is_new),
  };
}
