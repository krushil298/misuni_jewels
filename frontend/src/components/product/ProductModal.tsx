"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { useSelection } from "@/context/SelectionContext";
import { productEnquiryLink } from "@/lib/whatsapp";
import { METAL_FILTERS } from "@/lib/constants";
import { cn, formatPrice, titleCase } from "@/lib/utils";
import type { Product } from "@/types";

/** Swatch colours for the metals every design can be set in. */
const METAL_SWATCH: Record<string, string> = {
  "Yellow Gold": "#d4af37",
  "Rose Gold": "#dfa08a",
  "White Gold": "#dfe2e3",
  Platinum: "#c9ced1",
};

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

/**
 * Product detail.
 *
 * On a single-page site there is no detail route, so the full specification
 * opens over the page. The parent mirrors the open piece to a `?piece=<slug>`
 * query parameter, which keeps links shareable — someone can still send a
 * specific piece over WhatsApp and have it open straight onto that piece.
 */
export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product && <Panel product={product} onClose={onClose} />}
    </AnimatePresence>
  );
}

function Panel({ product, onClose }: { product: Product; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [image, setImage] = useState(0);

  const initialMetal =
    METAL_FILTERS.find((m) =>
      product.metal.toLowerCase().includes(m.toLowerCase())
    ) ?? METAL_FILTERS[0];

  const [metal, setMetal] = useState<string>(initialMetal);
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const { isSaved, toggle, isHydrated } = useSelection();
  const saved = isHydrated && isSaved(product.id);

  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => panelRef.current?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-modal flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        onClick={onClose}
        className="absolute inset-0 bg-forest/75 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="piece-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden bg-cream outline-none sm:max-h-[88dvh]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-0 top-0 z-raised flex size-12 items-center justify-center bg-cream/90 text-ink-2 backdrop-blur-sm transition-colors duration-150 hover:text-forest"
        >
          <Icon name="close" size={20} />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          <div className="grid md:grid-cols-2">
            {/* Imagery */}
            <div className="bg-forest-2">
              <div className="relative aspect-square w-full">
                <Image
                  src={product.images[image] ?? "/brand/mark.png"}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <ul className="flex gap-2 p-2">
                  {product.images.map((src, i) => (
                    <li key={src}>
                      <button
                        type="button"
                        onClick={() => setImage(i)}
                        aria-label={`View image ${i + 1}`}
                        aria-current={image === i}
                        className={cn(
                          "relative block size-14 overflow-hidden border transition-colors duration-150",
                          image === i
                            ? "border-gold"
                            : "border-transparent hover:border-gold/40"
                        )}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Detail */}
            <div className="p-6 md:p-8">
              <span className="label-sm text-gold">
                {titleCase(product.category)}
              </span>

              <h2
                id="piece-title"
                className="mt-3 font-display text-3xl leading-tight text-forest text-balance"
              >
                {product.name}
              </h2>

              <p className="mt-3 text-lg text-forest">
                Starting from {formatPrice(product.price)}
              </p>
              <p className="mt-1 text-[0.75rem] text-ink-3">
                The final quote follows your stone, metal and sizing.
              </p>

              <p className="mt-5 text-[0.875rem] leading-relaxed text-ink-2 text-pretty">
                {product.description}
              </p>

              {/* Metal */}
              <fieldset className="mt-7">
                <legend className="label-sm text-ink-3">Metal</legend>
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
                          "flex min-h-11 items-center gap-2.5 border px-3 text-[0.6875rem] tracking-[0.1em] transition-colors duration-150",
                          active
                            ? "border-forest text-forest"
                            : "border-rule text-ink-3 hover:border-gold"
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
                <fieldset className="mt-6">
                  <legend className="label-sm text-ink-3">
                    {product.category === "necklaces" ||
                    product.category === "pendants"
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
                            "min-h-11 min-w-14 border px-4 text-[0.75rem] transition-colors duration-150",
                            active
                              ? "border-forest bg-forest text-cream"
                              : "border-rule text-ink-2 hover:border-gold"
                          )}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {/* Specification */}
              {product.details.length > 0 && (
                <ul className="mt-7">
                  {product.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 border-t border-rule py-2.5"
                    >
                      <Icon name="check" size={14} className="mt-0.5 text-gold" />
                      <span className="text-[0.8125rem] text-ink-2 text-pretty">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-col gap-2.5">
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
                  className="btn btn-forest-line w-full"
                >
                  <Icon name={saved ? "heart-filled" : "heart"} size={16} />
                  {saved ? "Saved to selection" : "Save to selection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
