"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Icon } from "@/components/ui/Icon";
import { useDebounce } from "@/hooks/useDebounce";
import { CATEGORIES } from "@/lib/constants";
import { titleCase } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * Catalogue search.
 *
 * Reads the `q` parameter on mount — the header and the category chips both
 * navigate to `/search?q=…`, and the previous version ignored it entirely,
 * so every one of those links landed on an empty search box.
 */
export function SearchResults({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debounced = useDebounce(query, 200);

  // Keep the URL in step so results are shareable and survive a refresh.
  useEffect(() => {
    const trimmed = debounced.trim();
    const current = searchParams.get("q") ?? "";
    if (trimmed === current) return;

    router.replace(
      trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search",
      { scroll: false }
    );
  }, [debounced, router, searchParams]);

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return [];

    return products.filter((p) =>
      [p.name, p.category, p.metal, p.description].some((field) =>
        field.toLowerCase().includes(q)
      )
    );
  }, [debounced, products]);

  const hasQuery = debounced.trim().length > 0;

  return (
    <main className="mx-auto w-full max-w-[1600px] px-5 py-8 md:px-8 md:py-12 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 font-serif text-3xl text-ink md:text-4xl">
          Search
        </h1>

        <div className="relative">
          <Icon
            name="search"
            size={19}
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Solitaire, tennis, rose gold…"
            enterKeyHint="search"
            autoComplete="off"
            className="w-full border-b border-hairline-strong bg-transparent py-3.5 pl-8 pr-10 font-serif text-xl text-ink outline-none transition-colors duration-150 placeholder:text-ink-faint focus:border-brand md:text-2xl"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 size-11 -translate-y-1/2 text-ink-faint"
            >
              <Icon name="close" size={17} className="mx-auto" />
            </button>
          )}
        </div>

        {!hasQuery && (
          <div className="mt-8">
            <p className="meta mb-3">Try a category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setQuery(category)}
                  className="border border-hairline-strong px-3.5 py-2 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-150 hover:border-brand hover:text-brand"
                >
                  {titleCase(category)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {hasQuery && (
        <div className="mt-12">
          <p className="meta mb-6" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? "result" : "results"} for
            &ldquo;{debounced.trim()}&rdquo;
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
              {results.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={i < 4}
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              ))}
            </div>
          ) : (
            <div className="border border-hairline bg-surface px-6 py-16 text-center">
              <p className="font-serif text-2xl text-ink">No matches</p>
              <p className="mx-auto mt-2 max-w-sm font-sans text-sm font-light text-ink-muted text-pretty">
                We may still be able to make what you&apos;re after — most of
                our work is bespoke.
              </p>
              <Link href="/collections" className="btn btn-primary mt-7">
                Browse everything
              </Link>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
