"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-[1440px] mx-auto px-8 py-32 text-center">
        <AnimatedSection>
          <span className="material-symbols-outlined text-6xl text-[#adb3b4] mb-8 block">
            shopping_bag
          </span>
          <h1 className="text-4xl font-bold uppercase tracking-[0.3rem] text-[#2d3435] mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-[0.875rem] tracking-widest text-[#5f5e5e] mb-12">
            Discover our curated collections
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

  const shipping = 0;
  const tax = totalPrice * 0.09;
  const orderTotal = totalPrice + tax + shipping;

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12 md:py-20">
      <AnimatedSection>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.3rem] text-[#2d3435] mb-4">
          Shopping Cart
        </h1>
        <p className="text-[0.6875rem] tracking-widest uppercase text-[#757c7d] mb-16">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 sm:gap-8 pb-6 sm:pb-8 border-b border-[#adb3b4]/10"
            >
              <div className="w-20 h-28 sm:w-24 sm:h-32 md:w-32 md:h-40 bg-surface-container-lowest overflow-hidden flex-shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={128}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-[0.75rem] uppercase tracking-[0.15rem] font-bold text-[#2d3435] mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-[0.6875rem] tracking-widest text-[#5f5e5e] uppercase">
                    {item.selectedMetal || item.product.metal}
                    {item.selectedSize && ` / ${item.selectedSize}`}
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4 flex-wrap gap-3">
                  <div className="flex items-center border border-[#adb3b4]/30">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                      className="px-3 py-2 hover:bg-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        remove
                      </span>
                    </button>
                    <span className="px-4 py-2 text-[0.75rem] tracking-widest font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="px-3 py-2 hover:bg-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        add
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[0.875rem] font-light tracking-widest text-[#2d3435]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[#757c7d]">
                        close
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-low p-8 sticky top-32">
            <h2 className="text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-[#2d3435] mb-8">
              Order Summary
            </h2>
            <div className="space-y-4 text-[0.6875rem] tracking-widest uppercase">
              <div className="flex justify-between">
                <span className="text-[#5f5e5e]">Subtotal</span>
                <span className="text-[#2d3435]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f5e5e]">Estimated Tax</span>
                <span className="text-[#2d3435]">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f5e5e]">Shipping</span>
                <span className="text-[#2d3435]">Complimentary</span>
              </div>
              <div className="border-t border-[#adb3b4]/20 pt-4 mt-4">
                <div className="flex justify-between text-[0.875rem] font-bold">
                  <span className="text-[#2d3435]">Total</span>
                  <span className="text-[#2d3435]">
                    {formatPrice(orderTotal)}
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full bg-[#2d3435] text-[#faf7f6] py-5 text-[0.75rem] font-bold tracking-[0.25rem] uppercase hover:bg-[#535252] transition-all active:scale-[0.98] mt-8">
              Proceed to Checkout
            </button>
            <Link
              href="/collections"
              className="block text-center mt-4 text-[0.6875rem] tracking-widest uppercase text-[#5f5e5e] hover:text-[#2d3435] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
