"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductModal } from "@/components/product/ProductModal";
import { Icon } from "@/components/ui/Icon";
import { categoryTiles } from "@/data/categories";
import { cn, titleCase } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * Collections and pieces — the browsing half of the page.
 *
 * Both sections are one client component because they share filter state:
 * choosing a collection scrolls to the grid and filters it. Product detail
 * opens in a modal rather than a route, and the open piece is mirrored to a
 * `?piece=<slug>` query parameter so a link to a specific piece can still be
 * shared and will open straight onto it.
 */
export function Catalogue({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | null>(null);

  /*
   * Seeded from `?piece=` during render rather than in an effect — an effect
   * would set state on mount and cost an extra render pass, and the React
   * compiler flags it. After mount this state is the source of truth; the
   * URL is kept in step by `syncUrl` below.
   */
  const [open, setOpen] = useState<Product | null>(() => {
    const slug = searchParams.get("piece");
    return slug ? (products.find((p) => p.slug === slug) ?? null) : null;
  });

  /** Mirror the open piece into the URL without adding history entries. */
  const syncUrl = useCallback((product: Product | null) => {
    const url = new URL(window.location.href);
    if (product) url.searchParams.set("piece", product.slug);
    else url.searchParams.delete("piece");
    window.history.replaceState(null, "", url);
  }, []);

  const openPiece = useCallback(
    (product: Product) => {
      setOpen(product);
      syncUrl(product);
    },
    [syncUrl]
  );

  const closePiece = useCallback(() => {
    setOpen(null);
    syncUrl(null);
  }, [syncUrl]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [products]);

  const shown = useMemo(
    () =>
      category ? products.filter((p) => p.category === category) : products,
    [products, category]
  );

  const chooseCollection = (slug: string) => {
    setCategory(slug);
    document.getElementById("pieces")?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      {/* ── Collections ─────────────────────────────────────────────── */}
      <section id="collections" className="bg-cream py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            eyebrow="Our collections"
            title="Crafted for every"
            titleItalic="cherished moment"
            description="Six families of piece. Every design can be set in any of our metals and sized to you."
          />
        </div>

        <ul className="snap-rail hide-scrollbar mt-12 flex gap-4 overflow-x-auto px-5 md:mx-auto md:grid md:max-w-[1400px] md:grid-cols-3 md:overflow-visible md:px-10 lg:grid-cols-6 xl:px-16">
          {categoryTiles.map((tile, i) => (
            <li
              key={tile.slug}
              className="snap-item w-[58vw] shrink-0 sm:w-[38vw] md:w-auto"
            >
              <button
                type="button"
                onClick={() => chooseCollection(tile.slug)}
                className="group relative block aspect-3/4 w-full overflow-hidden bg-forest-2 text-left"
              >
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 58vw, (max-width: 1024px) 33vw, 16vw"
                  priority={i < 3}
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                {/* Scrim across the foot only, so the piece stays readable */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-forest via-forest/75 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-2xl leading-none text-cream">
                    {tile.name}
                  </h3>
                  <span className="link-arrow mt-2.5 text-[0.5625rem] tracking-[0.2em] text-gold">
                    View {counts[tile.slug] ?? 0}
                    <Icon name="arrow-right" size={11} />
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Pieces ──────────────────────────────────────────────────── */}
      <section id="pieces" className="bg-cream-2 py-16 md:py-24">
        <div className="shell">
          <SectionHeader
            eyebrow="Signature pieces"
            title="Most loved"
            titleItalic="designs"
            description="Tap any piece for its full specification, then send it to us on WhatsApp."
          />

          {/* Filter chips */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <Chip
              active={category === null}
              onClick={() => setCategory(null)}
              label={`All (${products.length})`}
            />
            {categoryTiles.map((tile) => (
              <Chip
                key={tile.slug}
                active={category === tile.slug}
                onClick={() => setCategory(tile.slug)}
                label={`${tile.name} (${counts[tile.slug] ?? 0})`}
                disabled={!counts[tile.slug]}
              />
            ))}
          </div>

          {shown.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {shown.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={openPiece}
                  priority={i < 4}
                />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center font-display text-2xl text-forest">
              Nothing in this collection yet —{" "}
              <button
                type="button"
                onClick={() => setCategory(null)}
                className="italic text-gold underline underline-offset-4"
              >
                see everything
              </button>
            </p>
          )}

          <p className="mt-10 text-center text-[0.8125rem] text-ink-3">
            {titleCase(category ?? "all")} pieces shown are indicative. Anything
            here can be made in another metal, another stone, or to your own
            design.
          </p>
        </div>
      </section>

      <ProductModal product={open} onClose={closePiece} />
    </>
  );
}

function Chip({
  active,
  onClick,
  label,
  disabled = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "min-h-11 border px-4 text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-150",
        active
          ? "border-forest bg-forest text-cream"
          : "border-rule text-ink-2 hover:border-gold",
        disabled && "cursor-not-allowed opacity-35 hover:border-rule"
      )}
    >
      {label}
    </button>
  );
}
