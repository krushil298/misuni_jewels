import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/data/api";
import { SearchResults } from "./SearchResults";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Misuni Jewels collection.",
  robots: { index: false, follow: true },
};

export default async function SearchPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<ProductGridSkeleton count={8} />}>
      <SearchResults products={products} />
    </Suspense>
  );
}
