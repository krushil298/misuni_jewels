"use client";

import { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/data/api";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.metal.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12 md:py-20">
      <AnimatedSection>
        <div className="max-w-2xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.3rem] text-[#2d3435] mb-12 text-center">
            Search
          </h1>
          <div className="flex items-center border-b border-[#2d3435] pb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6e7b79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-4">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collections, products..."
              autoFocus
              className="flex-grow bg-transparent border-none text-xl font-light tracking-widest focus:outline-none placeholder:text-[#adb3b4] text-[#2d3435]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="hover:opacity-70 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e7b79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </AnimatedSection>

      {query.trim() && (
        <div className="mb-8">
          <span className="font-['Inter'] text-[0.6875rem] tracking-widest uppercase text-[#757c7d]">
            {results.length} {results.length === 1 ? "result" : "results"} for
            &ldquo;{query}&rdquo;
          </span>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {results.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="collection"
              index={i}
            />
          ))}
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <div className="text-center py-24">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a8b3b1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-8">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          <p className="text-[0.875rem] tracking-widest uppercase text-[#757c7d] mb-4">
            No results found
          </p>
          <p className="text-sm font-light tracking-wide text-[#4a5553]">
            Try searching for &ldquo;necklace&rdquo;, &ldquo;rose gold&rdquo;, or
            &ldquo;diamond ring&rdquo;
          </p>
        </div>
      )}

      {!query.trim() && (
        <div className="text-center py-12">
          <p className="text-[0.6875rem] tracking-widest uppercase text-[#757c7d]">
            Popular: Necklaces &bull; Rings &bull; Earrings &bull; Bracelets &bull; Bangles
          </p>
        </div>
      )}
    </main>
  );
}
