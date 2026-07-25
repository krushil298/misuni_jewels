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

/** Map Supabase row → frontend Product type */
function mapDbProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id ?? ""),
    name: String(row.name ?? ""),
    slug: String(row.slug ?? ""),
    price: Number(row.price ?? 0),
    category: String(row.category ?? ""),
    metal: String(row.metal ?? ""),
    images: Array.isArray(row.images) ? row.images : [],
    description: String(row.description ?? ""),
    details: Array.isArray(row.details) ? row.details : [],
    sizes: Array.isArray(row.sizes) ? row.sizes : undefined,
    isBestseller: Boolean(row.isbestseller ?? false),
    isNew: Boolean(row.isnew ?? false),
    collection: String(row.collection ?? ""),
  };
}

/** Map frontend Product → Supabase row (snake_case) */
function mapToDbProduct(product: Partial<Product>): Record<string, unknown> {
  const dbProduct: Record<string, unknown> = {};

  if (product.name !== undefined) dbProduct.name = product.name;
  if (product.slug !== undefined) dbProduct.slug = product.slug;
  if (product.price !== undefined) dbProduct.price = product.price;
  if (product.category !== undefined) dbProduct.category = product.category;
  if (product.metal !== undefined) dbProduct.metal = product.metal;
  if (product.images !== undefined) dbProduct.images = product.images;
  if (product.description !== undefined) dbProduct.description = product.description;
  if (product.details !== undefined) dbProduct.details = product.details;
  if (product.sizes !== undefined) dbProduct.sizes = product.sizes;
  if (product.isBestseller !== undefined) dbProduct.isbestseller = product.isBestseller;
  if (product.isNew !== undefined) dbProduct.isnew = product.isNew;
  if (product.collection !== undefined) dbProduct.collection = product.collection;

  return dbProduct;
}
