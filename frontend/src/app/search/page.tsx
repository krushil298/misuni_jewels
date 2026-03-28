"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function SearchPage() {
  const [query, setQuery] = useState("");

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
            <span className="material-symbols-outlined text-[#5f5e5e] mr-4">
              search
            </span>
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
                <span className="material-symbols-outlined text-[#757c7d]">
                  close
                </span>
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
          <span className="material-symbols-outlined text-6xl text-[#adb3b4] mb-8 block">
            search_off
          </span>
          <p className="text-[0.875rem] tracking-widest uppercase text-[#757c7d] mb-4">
            No results found
          </p>
          <p className="text-sm font-light tracking-wide text-[#5a6061]">
            Try searching for &ldquo;chains&rdquo;, &ldquo;gold&rdquo;, or
            &ldquo;bracelet&rdquo;
          </p>
        </div>
      )}

      {!query.trim() && (
        <div className="text-center py-12">
          <p className="text-[0.6875rem] tracking-widest uppercase text-[#757c7d]">
            Popular: Chains &bull; Bracelets &bull; Watches &bull; Rings
          </p>
        </div>
      )}
    </main>
  );
}
