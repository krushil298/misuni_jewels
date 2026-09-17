"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { useSelection } from "@/context/SelectionContext";
import { cn, formatPrice, referenceCode, titleCase } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * A register entry.
 *
 * Caption is set as a ruled row — reference code, name, then metal and
 * price on a baseline — rather than centred marketing text. The save
 * control is a real button layered above the card link, so it stays
 * keyboard-reachable and the markup has no nested interactives.
 */
export function ProductCard({
  product,
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  className,
}: ProductCardProps) {
  const { isSaved, toggle, isHydrated } = useSelection();
  const saved = isHydrated && isSaved(product.id);

  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-4/5 overflow-hidden bg-surface">
        <Link href={`/product/${product.slug}`} className="block size-full">
          <Image
            src={product.images[0] ?? "/brand/mark.png"}
            alt={product.name}
            fill
            sizes={sizes}
            priority={priority}
            className="size-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
          />
          <span className="sr-only">View {product.name}</span>
        </Link>

        {(product.isNew || product.isBestseller) && (
          <span className="label-sm pointer-events-none absolute left-0 top-0 bg-ink px-2 py-1.5 text-paper">
            {product.isNew ? "New" : "Requested"}
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
            "absolute right-0 top-0 flex size-10 items-center justify-center bg-paper/90 backdrop-blur-sm transition-colors duration-150",
            saved ? "text-sage" : "text-ink-3 hover:text-ink"
          )}
        >
          <Icon name={saved ? "heart-filled" : "heart"} size={16} />
        </button>
      </div>

      <Link
        href={`/product/${product.slug}`}
        className="mt-2.5 block border-t border-rule pt-2.5 transition-colors duration-150 group-hover:border-ink"
        tabIndex={-1}
      >
        <div className="flex items-baseline gap-2">
          <span className="index-num shrink-0">
            {referenceCode(product.slug)}
          </span>
          <span className="label-sm ml-auto shrink-0 text-ink-2 tabular-nums">
            {formatPrice(product.price)}
          </span>
        </div>
        <h3 className="mt-1 font-display text-lg leading-tight text-ink text-pretty">
          {product.name}
        </h3>
        <p className="label-sm mt-1 text-ink-3">
          {titleCase(product.category)} · {product.metal}
        </p>
      </Link>
    </article>
  );
}
