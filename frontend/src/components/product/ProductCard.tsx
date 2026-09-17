"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { useSelection } from "@/context/SelectionContext";
import { cn, formatPrice, titleCase } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** Priority-load the image for above-the-fold cards. */
  priority?: boolean;
  /** Sizes hint matching the grid this card sits in. */
  sizes?: string;
  className?: string;
}

/**
 * A single catalogue tile.
 *
 * One card, used everywhere — the previous version had two near-identical
 * variants that had drifted apart in typography and badge styling.
 *
 * The save control is a real button layered above the card link rather than
 * nested inside it, so it is reachable by keyboard and does not produce
 * invalid nested-interactive markup.
 */
export function ProductCard({
  product,
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  className,
}: ProductCardProps) {
  const { isSaved, toggle, isHydrated } = useSelection();
  const saved = isHydrated && isSaved(product.id);

  const badge = product.isNew
    ? "New"
    : product.isBestseller
      ? "Bestseller"
      : null;

  return (
    <article className={cn("group relative", className)}>
      <div className="relative mb-3 aspect-4/5 overflow-hidden bg-surface">
        <Link href={`/product/${product.slug}`} className="block size-full">
          <Image
            src={product.images[0] ?? "/brand/mark.png"}
            alt={product.name}
            fill
            sizes={sizes}
            priority={priority}
            className="size-full object-cover transition-opacity duration-200 ease-out group-hover:opacity-90"
          />
          <span className="sr-only">View {product.name}</span>
        </Link>

        {badge && (
          <span
            className={cn(
              "pointer-events-none absolute left-0 top-0 px-2.5 py-1 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-white",
              product.isNew ? "bg-brand" : "bg-ink"
            )}
          >
            {badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggle(product)}
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${product.name} from your selection`
              : `Save ${product.name} to your selection`
          }
          className={cn(
            "absolute right-2 top-2 flex size-9 items-center justify-center bg-surface/85 backdrop-blur-sm transition-colors duration-150",
            saved ? "text-brand" : "text-ink-muted hover:text-ink"
          )}
        >
          <Icon name={saved ? "heart-filled" : "heart"} size={17} />
        </button>
      </div>

      <Link href={`/product/${product.slug}`} className="block" tabIndex={-1}>
        <p className="meta mb-1 text-[0.5625rem]">
          {titleCase(product.category)}
        </p>
        <h3 className="mb-1 font-serif text-base leading-snug text-ink text-balance">
          {product.name}
        </h3>
        <p className="font-sans text-[0.8125rem] tabular-nums text-ink-soft">
          {formatPrice(product.price)}
        </p>
      </Link>
    </article>
  );
}
