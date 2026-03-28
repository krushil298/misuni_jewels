"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface StyledWithProps {
  products: Product[];
}

export function StyledWith({ products }: StyledWithProps) {
  return (
    <section className="mt-32 pt-24 border-t border-[#adb3b4]/10">
      <AnimatedSection>
        <header className="flex flex-col md:flex-row md:justify-between items-baseline mb-16 gap-4">
          <h2 className="text-3xl font-bold uppercase tracking-[0.2rem] text-[#2d3435]">
            Styled With
          </h2>
          <Link
            href="/collections"
            className="text-[0.6875rem] tracking-widest uppercase underline underline-offset-8 decoration-1"
          >
            Shop The Look
          </Link>
        </header>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {products.map((product, i) => (
          <AnimatedSection key={product.id} delay={i * 0.1}>
            <Link
              href={`/product/${product.slug}`}
              className="group cursor-pointer block"
            >
              <div className="aspect-[3/4] overflow-hidden bg-surface-container-lowest mb-6">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[0.6875rem] tracking-widest text-[#5f5e5e] uppercase">
                  {product.category}
                </p>
                <h4 className="text-[0.875rem] font-medium tracking-wide uppercase">
                  {product.name}
                </h4>
                <p className="text-[0.8125rem] text-[#5a6061]">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
