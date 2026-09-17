"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useSelection } from "@/context/SelectionContext";
import { productEnquiryLink } from "@/lib/whatsapp";
import { cn, formatPrice, referenceCode, titleCase } from "@/lib/utils";
import { METAL_FILTERS } from "@/lib/constants";
import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

/** Swatch colours for the metal options offered on every design. */
const METAL_SWATCH: Record<string, string> = {
  "Yellow Gold": "#d4af37",
  "Rose Gold": "#dfa08a",
  "White Gold": "#dfe2e3",
  Platinum: "#c9ced1",
};

export function ProductInfo({ product }: ProductInfoProps) {
  /**
   * Seed the metal picker from the product's own metal so the selection
   * starts truthful. The previous version listed swatches keyed by strings
   * that never matched the data (and mapped "Rose Gold" to lilac).
   */
  const initialMetal =
    METAL_FILTERS.find((m) =>
      product.metal.toLowerCase().includes(m.toLowerCase())
    ) ?? METAL_FILTERS[0];

  const [metal, setMetal] = useState<string>(initialMetal);
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const { isSaved, toggle, isHydrated } = useSelection();
  const saved = isHydrated && isSaved(product.id);

  return (
    <div className="lg:col-span-5">
      <div className="lg:sticky lg:top-28">
        <div className="flex items-baseline justify-between border-t border-ink pt-3">
          <span className="index-num text-ink">
            {referenceCode(product.slug)}
          </span>
          <span className="label text-ink-3">
            {titleCase(product.category)}
          </span>
        </div>

        <h1 className="optical-flush mt-5 font-display text-4xl leading-[1.02] text-ink text-balance md:text-5xl">
          {product.name}
        </h1>

        <p className="mt-4 font-sans text-xl tabular-nums text-ink">
          {formatPrice(product.price)}
        </p>
        <p className="mt-1 text-[0.75rem] text-ink-3">
          Indicative · the final quote follows your stone and sizing
        </p>

        {/* Metal */}
        <fieldset className="mt-9">
          <legend className="label border-t border-rule pt-3 text-ink">
            Metal
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {METAL_FILTERS.map((option) => {
              const active = metal === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMetal(option)}
                  aria-pressed={active}
                  className={cn(
                    "flex min-h-11 items-center gap-2.5 border px-3 py-2 font-sans text-[0.6875rem] tracking-[0.1em] transition-colors duration-150",
                    active
                      ? "border-ink text-ink"
                      : "border-rule-strong text-ink-3 hover:border-ink-4"
                  )}
                >
                  <span
                    aria-hidden
                    className="size-4 rounded-full border border-black/10"
                    style={{ backgroundColor: METAL_SWATCH[option] }}
                  />
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Size */}
        {product.sizes && product.sizes.length > 0 && (
          <fieldset className="mt-7">
            <legend className="label border-t border-rule pt-3 text-ink">
              {product.category === "necklaces" || product.category === "pendants"
                ? "Chain length"
                : "Size"}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((option) => {
                const active = size === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-pressed={active}
                    className={cn(
                      "min-h-11 min-w-14 border px-4 font-sans text-[0.75rem] tabular-nums transition-colors duration-150",
                      active
                        ? "border-ink bg-ink text-white"
                        : "border-rule-strong text-ink-2 hover:border-ink-4"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 font-sans text-[0.6875rem] text-ink-3">
              Not sure of your size? Ask us — we&apos;ll guide you.
            </p>
          </fieldset>
        )}

        {/* Actions */}
        <div className="mt-9 flex flex-col gap-2.5">
          <a
            href={productEnquiryLink(product, { metal, size })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp w-full"
          >
            <Icon name="whatsapp" size={17} />
            Enquire on WhatsApp
          </a>

          <button
            type="button"
            onClick={() => toggle(product)}
            aria-pressed={saved}
            className="btn btn-line w-full"
          >
            <Icon name={saved ? "heart-filled" : "heart"} size={16} />
            {saved ? "Saved to selection" : "Save to selection"}
          </button>
        </div>

        {/* Specification */}
        <div className="mt-10">
          <h2 className="label border-t border-ink pt-3 text-ink">
            Specification
          </h2>
          <p className="mt-3 font-sans text-[0.8125rem] leading-relaxed text-ink-2 text-pretty">
            {product.description}
          </p>

          {product.details.length > 0 && (
            <ul className="mt-5">
              {product.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-3 border-t border-rule py-2.5"
                >
                  <Icon name="check" size={14} className="mt-0.5 text-sage" />
                  <span className="font-sans text-[0.8125rem] text-ink-2 text-pretty">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
