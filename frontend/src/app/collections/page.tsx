"use client";

import { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/data/api";
import { Product, SortOption } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterSidebar } from "@/components/collections/FilterSidebar";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

export default function CollectionsPage() {
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }
    if (selectedMetals.length > 0) {
      filtered = filtered.filter((p) =>
        selectedMetals.some((m) =>
          p.metal.toLowerCase().includes(m.toLowerCase())
        )
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "bestselling":
        filtered.sort(
          (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)
        );
        break;
    }

    return filtered;
  }, [selectedCategories, selectedMetals, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeFilterCount = selectedMetals.length + selectedCategories.length;

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
      <AnimatedSection>
        <header className="mb-10 sm:mb-16 flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-end justify-between border-b border-[#adb3b4]/10 pb-8 sm:pb-12">
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-[0.2rem] sm:tracking-[0.3rem] uppercase text-[#2d3435] mb-2 sm:mb-4">
              Collections
            </h1>
            <p className="font-['Inter'] text-[0.6875rem] tracking-[0.15rem] uppercase text-[#5f5e5e] max-w-md opacity-80 leading-relaxed">
              A curated selection of architectural link work and fluid metal
              forms. Designed for the modern collector.
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Mobile filter button */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="md:hidden flex items-center gap-2 border border-[#adb3b4]/30 px-4 py-2.5 font-['Inter'] text-[0.65rem] tracking-widest uppercase hover:border-[#2d3435] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-[#2d3435] text-white text-[0.55rem] rounded-full w-4 h-4 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <span className="font-['Inter'] text-[0.6875rem] tracking-widest uppercase text-[#757c7d] hidden sm:block">
              {filteredProducts.length} Results
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-[#adb3b4]/20 px-3 sm:px-4 py-2 font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase text-[#2d3435] focus:outline-none focus:border-[#2d3435]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="bestselling">Bestselling</option>
            </select>
          </div>
        </header>
      </AnimatedSection>

      <div className="flex flex-col md:flex-row gap-8 sm:gap-16">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <FilterSidebar
            selectedMetals={selectedMetals}
            setSelectedMetals={setSelectedMetals}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onClear={() => {
              setSelectedMetals([]);
              setSelectedCategories([]);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Product grid */}
        <section className="flex-grow">
          {loading ? (
            <div className="flex justify-center py-24">
              <span className="material-symbols-outlined max-w-[200px] animate-spin text-xl text-[#adb3b4]">autorenew</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-10 sm:gap-y-16">
              {paginatedProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="collection"
                  index={i}
                />
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[0.875rem] tracking-widest uppercase text-[#757c7d]">
                No products match your filters
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16 sm:mt-24 flex items-center justify-center gap-4 sm:gap-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="font-['Inter'] text-[0.6875rem] tracking-widest uppercase text-[#757c7d] hover:text-[#2d3435] transition-colors flex items-center gap-1 sm:gap-2 disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
                <span className="hidden sm:inline">Previous</span>
              </button>
              <div className="flex gap-4 sm:gap-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`font-['Inter'] text-[0.6875rem] tracking-widest uppercase transition-colors ${
                        currentPage === page
                          ? "font-bold text-[#2d3435] border-b border-[#2d3435]"
                          : "text-[#757c7d] hover:text-[#2d3435] cursor-pointer"
                      }`}
                    >
                      {String(page).padStart(2, "0")}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="font-['Inter'] text-[0.6875rem] tracking-widest uppercase text-[#757c7d] hover:text-[#2d3435] transition-colors flex items-center gap-1 sm:gap-2 disabled:opacity-30"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
              onClick={() => setFilterDrawerOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 bg-[#f9f9f9] z-[70] md:hidden rounded-t-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-[#adb3b4]/10 sticky top-0 bg-[#f9f9f9]">
                <span className="font-['Inter'] text-[0.75rem] font-bold tracking-[0.2rem] uppercase text-[#2d3435]">
                  Filters
                </span>
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="text-[#2d3435] hover:opacity-60 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="px-6 py-6">
                <FilterSidebar
                  selectedMetals={selectedMetals}
                  setSelectedMetals={setSelectedMetals}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  onClear={() => {
                    setSelectedMetals([]);
                    setSelectedCategories([]);
                    setCurrentPage(1);
                  }}
                />
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="w-full bg-[#2d3435] text-white py-4 font-['Inter'] text-[0.75rem] tracking-[0.2rem] uppercase mt-6"
                >
                  Apply Filters
                  {activeFilterCount > 0 && ` (${activeFilterCount})`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
