import { supabase } from "@/lib/supabase";
import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error("Error fetching products", error);
    return [];
  }
  return data.map(mapDbProductToTypescript);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (error || !data) {
    return null;
  }
  return mapDbProductToTypescript(data);
}

// Map the lowercase db columns to the frontend types
function mapDbProductToTypescript(dbProduct: any): Product {
  return {
    ...dbProduct,
    isBestseller: dbProduct.isbestseller,
    isNew: dbProduct.isnew,
  };
}
