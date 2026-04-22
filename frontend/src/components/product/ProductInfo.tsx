"use client";

import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

const metalColors: Record<string, string> = {
  "White Gold 14k": "#E5E5E5",
  "18k Gold": "#D4AF37",
  "Rose Gold": "#E0B0FF",
  "Sterling Silver": "#C0C0C0",
  "White Gold": "#E5E5E5",
  "Stainless Steel": "#B0B0B0",
  Platinum: "#E5E7EB",
};

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedMetal, setSelectedMetal] = useState(product.metal);
  const [specsOpen, setSpecsOpen] = useState(true);
  const { isWishlisted, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleWhatsApp = () => {
    // Replace with the actual WhatsApp number of the owner (include country code, without + or 00)
    const phoneNumber = "919999999999"; 
    const message = `Hi Misuni Jewels, I'm interested in the ${product.name} (${selectedMetal}${selectedSize ? `, Size: ${selectedSize}` : ""}). Could you please share more details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleWishlistToggle = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-fit">
      <div className="space-y-12">
        <header className="space-y-4">
          <p className="text-[0.6875rem] tracking-[0.25rem] text-[#5f5e5e] uppercase font-medium">
            Fine Jewelry / {product.category}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.15rem] leading-tight text-[#2d3435]">
            {product.name}
          </h1>
          <p className="text-2xl font-light tracking-widest text-[#2d3435]">
            {formatPrice(product.price)}
          </p>
        </header>

        {/* Metal Selection */}
        <div className="space-y-4">
          <label className="text-[0.6875rem] tracking-widest uppercase font-bold text-[#2d3435]">
            Select Metal
          </label>
          <div className="flex gap-4">
            {Object.entries(metalColors)
              .slice(0, 3)
              .map(([metal, color]) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`w-12 h-12 rounded-full border p-1 flex items-center justify-center transition-all ${
                    selectedMetal === metal
                      ? "border-[#2d3435]"
                      : "border-[#adb3b4]/20 hover:border-[#2d3435]"
                  }`}
                >
                  <div
                    className="w-full h-full rounded-full shadow-inner"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
          </div>
          <p className="text-xs text-[#757c7d] italic">
            {selectedMetal} - Handcrafted
          </p>
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[0.6875rem] tracking-widest uppercase font-bold text-[#2d3435]">
                {product.category === "chains" ? "Chain Length" : "Size"}
              </label>
              <button className="text-[0.6875rem] underline underline-offset-4 uppercase tracking-widest text-[#5f5e5e]">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-3 text-[0.75rem] tracking-widest uppercase font-medium transition-colors ${
                    selectedSize === size
                      ? "border-[#2d3435] bg-[#2d3435] text-[#faf7f6]"
                      : "border-[#adb3b4]/30 hover:border-[#2d3435]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-4 pt-6">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] text-white py-5 text-[0.75rem] font-bold tracking-[0.25rem] uppercase hover:bg-[#20bd5a] transition-all active:scale-[0.98] flex justify-center items-center gap-3"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Enquire via WhatsApp
          </button>
          <button
            onClick={handleWishlistToggle}
            className="w-full border border-[#2d3435] text-[#2d3435] py-5 text-[0.75rem] font-bold tracking-[0.25rem] uppercase hover:bg-surface-container-low transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{
                fontVariationSettings: wishlisted
                  ? "'FILL' 1"
                  : "'FILL' 0",
              }}
            >
              favorite
            </span>
            {wishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>

        {/* Details Accordion */}
        <div className="pt-12 border-t border-[#adb3b4]/10 space-y-6">
          <button
            onClick={() => setSpecsOpen(!specsOpen)}
            className="flex justify-between items-center cursor-pointer group w-full"
          >
            <h3 className="text-[0.75rem] tracking-widest uppercase font-bold">
              Product Specifications
            </h3>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              {specsOpen ? "expand_less" : "east"}
            </span>
          </button>
          {specsOpen && (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-[#5a6061] font-light">
                {product.description}
              </p>
              <ul className="space-y-2 mt-4">
                {product.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-sm text-[#5a6061] font-light flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[#5a6061] rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
