"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-[1440px] mx-auto px-8 py-32 text-center">
        <AnimatedSection>
          <span className="material-symbols-outlined text-6xl text-[#adb3b4] mb-8 block">
            favorite
          </span>
          <h1 className="text-4xl font-bold uppercase tracking-[0.3rem] text-[#2d3435] mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-[0.875rem] tracking-widest text-[#5f5e5e] mb-12">
            Save your favorite pieces for later
          </p>
          <Link
            href="/collections"
            className="inline-block bg-[#2d3435] text-[#faf7f6] px-12 py-5 uppercase tracking-[0.3rem] text-sm hover:bg-[#535252] transition-all"
          >
            Browse Collections
          </Link>
        </AnimatedSection>
      </main>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12 md:py-20">
      <AnimatedSection>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.3rem] text-[#2d3435] mb-4">
          Wishlist
        </h1>
        <p className="text-[0.6875rem] tracking-widest uppercase text-[#757c7d] mb-16">
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {items.map((product, i) => (
          <AnimatedSection key={product.id} delay={i * 0.1}>
            <div className="group">
              <Link href={`/product/${product.slug}`}>
                <div className="relative aspect-[4/5] bg-surface-container-low overflow-hidden mb-6">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Link>
              <div className="flex flex-col items-center text-center px-4">
                <h2 className="font-['Inter'] text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-[#2d3435] mb-2">
                  {product.name}
                </h2>
                <span className="font-['Inter'] text-[0.6875rem] tracking-widest text-[#5f5e5e] mb-4">
                  {formatPrice(product.price)}
                </span>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      addToCart(product);
                      removeItem(product.id);
                    }}
                    className="bg-[#2d3435] text-[#faf7f6] px-6 py-3 text-[0.65rem] tracking-[0.2rem] uppercase hover:bg-[#535252] transition-all"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="border border-[#adb3b4]/30 px-4 py-3 hover:border-[#2d3435] transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </main>
  );
}
