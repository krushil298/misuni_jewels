import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { Ticker } from "@/components/home/Ticker";
import { Catalogue } from "@/components/home/Catalogue";
import { PromiseSection } from "@/components/home/PromiseSection";
import { AtelierSection } from "@/components/home/AtelierSection";
import { VisitSection } from "@/components/home/VisitSection";
import { getProducts } from "@/data/api";

/**
 * The site — a single page.
 *
 * Forest and cream bands alternate down the page so each section reads as
 * its own chapter. Products are fetched on the server and handed to the
 * catalogue, which owns the collection filter and opens each piece in a
 * modal rather than navigating away.
 */
export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <HeroSection />
      <Ticker />
      {/* Catalogue reads `?piece=` via useSearchParams, which needs a
          Suspense boundary on a statically rendered page. */}
      <Suspense fallback={null}>
        <Catalogue products={products} />
      </Suspense>
      <PromiseSection />
      <AtelierSection />
      <VisitSection />
    </>
  );
}
