"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "collection";
  index?: number;
}

export function ProductCard({
  product,
  variant = "default",
  index = 0,
}: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (variant === "collection") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link href={`/product/${product.slug}`}>
          <article className="group cursor-pointer">
            <div className="relative aspect-[4/5] bg-surface-container-low overflow-hidden mb-6">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {product.isBestseller && (
                <div className="absolute top-4 left-4 bg-[#2d3435] px-3 py-1">
                  <span className="font-['Inter'] text-[0.6rem] tracking-[0.15rem] uppercase text-[#f9f9f9] font-bold">
                    Best Seller
                  </span>
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-[#2d3435] px-3 py-1">
                  <span className="font-['Inter'] text-[0.6rem] tracking-[0.15rem] uppercase text-[#f9f9f9] font-bold">
                    New
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-[#2d3435]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <button
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "#1a2421" : "none"} stroke="#1a2421" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <h2 className="font-['Inter'] text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-[#2d3435] mb-2">
                {product.name}
              </h2>
              <span className="font-['Inter'] text-[0.6875rem] tracking-widest text-[#5f5e5e]">
                {formatPrice(product.price)}
              </span>
            </div>
          </article>
        </Link>
      </motion.div>
    );
  }

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group">
        <div className="relative aspect-[4/5] bg-surface-container-lowest overflow-hidden mb-6 transition-all duration-700">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-4 right-4 bg-[#2d3435]/90 backdrop-blur-md text-white py-4 uppercase text-[0.65rem] tracking-[0.2rem] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            Quick Add
          </button>
        </div>
        <h3 className="text-[0.75rem] uppercase tracking-[0.15rem] font-bold text-[#2d3435] mb-2">
          {product.name}
        </h3>
        <p className="text-[0.875rem] font-light tracking-widest text-[#5f5e5e]">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
