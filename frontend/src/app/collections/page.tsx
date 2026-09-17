import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/data/api";
import { CollectionsBrowser } from "./CollectionsBrowser";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Browse Misuni Jewels — natural diamond rings, necklaces, earrings, bracelets, bangles and pendants in 14k & 18k gold, white gold, rose gold and platinum.",
  alternates: { canonical: "/collections" },
};

/** Products are fetched on the server; the browser handles filtering only. */
export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<ProductGridSkeleton count={8} />}>
      <CollectionsBrowser products={products} />
    </Suspense>
  );
}
