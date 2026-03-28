"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

export function BestsellersSection() {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16">
        <AnimatedSection>
          <div className="flex justify-between items-end mb-10 sm:mb-16">
            <div>
              <span className="text-[0.6rem] sm:text-[0.6875rem] tracking-[0.2rem] sm:tracking-[0.25rem] uppercase text-[#5f5e5e] mb-1.5 sm:mb-2 block">
                Curated Selection
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#2d3435]">
                Bestsellers
              </h2>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="p-4 border border-[#2d3435]/10 hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-4 border border-[#2d3435]/10 hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {bestsellers.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
