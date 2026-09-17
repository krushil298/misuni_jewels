import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

/** Result type for admin operations */
interface AdminResult<T = void> {
  data: T | null;
  error: string | null;
}

/**
 * Fetch a single product by its ID (for the edit form).
 */
export async function getProductById(id: string): Promise<AdminResult<Product>> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return { data: null, error: error?.message ?? "Product not found" };
    }

    return { data: mapDbProduct(data), error: null };
  } catch (err) {
    console.error("[Admin API] getProductById error:", err);
    return { data: null, error: "Failed to fetch product" };
  }
}

/**
 * Create a new product in Supabase.
 */
export async function createProduct(
  product: Omit<Product, "id">
): Promise<AdminResult<Product>> {
  try {
    const dbProduct = mapToDbProduct(product);
    const { data, error } = await supabase
      .from("products")
      .insert(dbProduct)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: mapDbProduct(data), error: null };
  } catch (err) {
    console.error("[Admin API] createProduct error:", err);
    return { data: null, error: "Failed to create product" };
  }
}

/**
 * Update an existing product in Supabase.
 */
export async function updateProduct(
  id: string,
  product: Partial<Product>
): Promise<AdminResult<Product>> {
  try {
    const dbProduct = mapToDbProduct(product);
    const { data, error } = await supabase
      .from("products")
      .update(dbProduct)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: mapDbProduct(data), error: null };
  } catch (err) {
    console.error("[Admin API] updateProduct error:", err);
    return { data: null, error: "Failed to update product" };
  }
}

/**
 * Delete a product from Supabase.
 */
export async function deleteProduct(id: string): Promise<AdminResult> {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: null };
  } catch (err) {
    console.error("[Admin API] deleteProduct error:", err);
    return { data: null, error: "Failed to delete product" };
  }
}

/**
 * Get aggregate stats for the dashboard.
 */
export async function getDashboardStats(): Promise<
  AdminResult<{
    totalProducts: number;
    totalBestsellers: number;
    totalNew: number;
    categories: string[];
  }>
> {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      return { data: null, error: error.message };
    }

    const products = data ?? [];
    const categories = [...new Set(products.map((p) => String(p.category)))];

    return {
      data: {
        totalProducts: products.length,
        totalBestsellers: products.filter((p) => p.isbestseller).length,
        totalNew: products.filter((p) => p.isnew).length,
        categories,
      },
      error: null,
    };
  } catch (err) {
    console.error("[Admin API] getDashboardStats error:", err);
    return { data: null, error: "Failed to fetch stats" };
  }
}

// ── Mapping helpers ──────────────────────────────────────────────

/**
 * Map a Supabase row → the frontend `Product` type.
 *
 * The flag columns are `is_bestseller` / `is_new`. This previously read
 * `isbestseller` / `isnew` without the underscore, so the admin table always
 * showed both flags as off regardless of their stored value.
 */
function mapDbProduct(row: Record<string, unknown>): Product {
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

/**
 * Map the frontend `Product` → a Supabase row.
 *
 * Writing `isbestseller` / `isnew` (and a `collection` column that does not
 * exist on the table) made PostgREST reject every insert and update, so
 * saving a product from the admin never worked.
 */
function mapToDbProduct(product: Partial<Product>): Record<string, unknown> {
  const row: Record<string, unknown> = {};

  if (product.name !== undefined) row.name = product.name;
  if (product.slug !== undefined) row.slug = product.slug;
  if (product.price !== undefined) row.price = product.price;
  if (product.category !== undefined) row.category = product.category;
  if (product.metal !== undefined) row.metal = product.metal;
  if (product.images !== undefined) row.images = product.images;
  if (product.description !== undefined) row.description = product.description;
  if (product.details !== undefined) row.details = product.details;
  if (product.sizes !== undefined) row.sizes = product.sizes;
  if (product.isBestseller !== undefined) row.is_bestseller = product.isBestseller;
  if (product.isNew !== undefined) row.is_new = product.isNew;

  return row;
}
