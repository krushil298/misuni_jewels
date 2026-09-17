"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterPanel } from "@/components/collections/FilterPanel";
import { Icon } from "@/components/ui/Icon";
import { cn, titleCase } from "@/lib/utils";
import type { Product, SortOption } from "@/types";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-low": "Price: low to high",
  "price-high": "Price: high to low",
  newest: "Newest first",
  bestselling: "Most requested",
};

/**
 * Catalogue browser.
 *
 * Products are passed in from the server component, which removes the
 * client-side fetch entirely. The previous version fetched in an effect and
 * derived the filtered list in a `useMemo` whose dependency array omitted
 * `products` — so once the fetch resolved the memo never recomputed and the
 * page showed "No products match your filters" permanently.
 */
export function CollectionsBrowser({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();

  // Deep links from the nav, footer and homepage rail arrive as query params.
  const initialCategory = searchParams.get("category");
  const initialMetal = searchParams.get("metal");

  const [categories, setCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [metals, setMetals] = useState<string[]>(
    initialMetal ? [initialMetal] : []
  );
  const [sort, setSort] = useState<SortOption>("featured");
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggle = (
    value: string,
    list: string[],
    set: (next: string[]) => void
  ) => {
    set(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  const matchesMetal = (product: Product, metal: string) =>
    product.metal.toLowerCase().includes(metal.toLowerCase());

  /** Counts reflect the *other* active filters, so options never dead-end. */
  const counts = useMemo(() => {
    const byCategory: Record<string, number> = {};
    const byMetal: Record<string, number> = {};

    for (const product of products) {
      if (metals.length === 0 || metals.some((m) => matchesMetal(product, m))) {
        byCategory[product.category] = (byCategory[product.category] ?? 0) + 1;
      }
      if (categories.length === 0 || categories.includes(product.category)) {
        for (const metal of ["Yellow Gold", "White Gold", "Rose Gold", "Platinum"]) {
          if (matchesMetal(product, metal)) {
            byMetal[metal] = (byMetal[metal] ?? 0) + 1;
          }
        }
      }
    }

    return { category: byCategory, metal: byMetal };
  }, [products, categories, metals]);

  const results = useMemo(() => {
    let list = products;

    if (categories.length > 0) {
      list = list.filter((p) => categories.includes(p.category));
    }
    if (metals.length > 0) {
      list = list.filter((p) => metals.some((m) => matchesMetal(p, m)));
    }

    const sorted = [...list];
    switch (sort) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "bestselling":
        sorted.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller));
        break;
    }
    return sorted;
  }, [products, categories, metals, sort]);

  const activeCount = categories.length + metals.length;
  const clear = () => {
    setCategories([]);
    setMetals([]);
  };

  const heading =
    categories.length === 1 ? titleCase(categories[0]) : "The collection";

  return (
    <main className="shell py-6 md:py-10">
      {/* Masthead, ruled like the homepage sections */}
      <header className="border-t border-ink pt-3">
        <div className="flex items-baseline justify-between">
          <span className="index-num text-ink">
            {String(results.length).padStart(2, "0")}
          </span>
          <span className="label text-ink-3">
            {results.length === 1 ? "Piece" : "Pieces"} in the register
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-12 md:gap-10">
          <h1 className="optical-flush font-display text-5xl leading-[0.96] text-ink text-balance md:col-span-7 md:text-6xl lg:text-7xl">
            {heading}
          </h1>
          <p className="max-w-sm self-end text-[0.875rem] leading-relaxed text-ink-2 text-pretty md:col-span-4 md:col-start-9">
            Every piece is made to order in your choice of metal and size.
            Save what you like and send the list on WhatsApp.
          </p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="sticky top-16 z-sticky mb-8 mt-10 flex items-center justify-between gap-3 border-y border-rule bg-paper/95 py-2.5 backdrop-blur-md md:static">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex min-h-11 items-center gap-2 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ink lg:hidden"
        >
          <Icon name="sliders" size={16} />
          Filter
          {activeCount > 0 && (
            <span className="flex size-4 items-center justify-center bg-sage text-[0.5625rem] font-semibold tabular-nums text-white">
              {activeCount}
            </span>
          )}
        </button>

        <p className="label hidden text-ink-3 lg:block">
          {results.length} {results.length === 1 ? "piece" : "pieces"}
        </p>

        <label className="flex items-center gap-2">
          <span className="sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="min-h-11 cursor-pointer border-0 bg-transparent py-1 pr-6 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-ink outline-none"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
              <option key={option} value={option}>
                {SORT_LABELS[option]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex gap-10 lg:gap-14">
        {/* Desktop filters */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-28">
            <FilterPanel
              categories={categories}
              metals={metals}
              onToggleCategory={(v) => toggle(v, categories, setCategories)}
              onToggleMetal={(v) => toggle(v, metals, setMetals)}
              onClear={clear}
              counts={counts}
            />
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          {/* Active filter chips */}
          {activeCount > 0 && (
            <ul className="mb-6 flex flex-wrap gap-2">
              {[...categories, ...metals].map((value) => (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() =>
                      categories.includes(value)
                        ? toggle(value, categories, setCategories)
                        : toggle(value, metals, setMetals)
                    }
                    className="flex items-center gap-1.5 border border-rule-strong px-3 py-1.5 font-sans text-[0.6875rem] tracking-[0.1em] text-ink-2 transition-colors duration-150 hover:border-ink"
                  >
                    {titleCase(value)}
                    <Icon name="close" size={12} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14 xl:grid-cols-4">
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
            <div className="border-t border-ink py-16 text-center">
              <p className="font-display text-3xl text-ink">
                Nothing matches those filters
              </p>
              <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-ink-3 text-pretty">
                Try removing a filter, or tell us what you&apos;re looking for
                and we&apos;ll make it.
              </p>
              <button
                type="button"
                onClick={clear}
                className="btn btn-ink mt-7"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-drawer bg-ink/40 lg:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed inset-x-0 bottom-0 z-modal flex max-h-[85dvh] flex-col bg-paper lg:hidden"
              )}
            >
              <div className="flex items-center justify-between border-b border-rule px-5 py-4">
                <h2 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ink">
                  Filter
                </h2>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close filters"
                  className="-mr-2 p-2 text-ink-3"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
                <FilterPanel
                  categories={categories}
                  metals={metals}
                  onToggleCategory={(v) => toggle(v, categories, setCategories)}
                  onToggleMetal={(v) => toggle(v, metals, setMetals)}
                  onClear={clear}
                  counts={counts}
                />
              </div>

              <div className="border-t border-rule px-5 py-4 pb-safe">
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="btn btn-ink w-full"
                >
                  Show {results.length}{" "}
                  {results.length === 1 ? "piece" : "pieces"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
