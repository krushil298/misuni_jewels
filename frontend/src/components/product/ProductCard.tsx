"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { useSelection } from "@/context/SelectionContext";
import { cn, formatPrice, titleCase } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
  priority?: boolean;
  sizes?: string;
}

/**
 * A piece in the grid.
 *
 * The card is a button that opens the detail modal — on a single-page site
 * there is no detail route to navigate to. The save control sits above it as
 * a separate button, so it stays keyboard-reachable and the markup contains
 * no nested interactive elements.
 */
export function ProductCard({
  product,
  onOpen,
  priority = false,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw",
}: ProductCardProps) {
  const { isSaved, toggle, isHydrated } = useSelection();
  const saved = isHydrated && isSaved(product.id);

  return (
    <article className="group relative h-full">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="flex h-full w-full flex-col border border-rule bg-cream text-left transition-colors duration-200 hover:border-gold"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-forest-2">
          <Image
            src={product.images[0] ?? "/brand/mark.png"}
            alt={product.name}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />

          {(product.isNew || product.isBestseller) && (
            <span className="label-sm absolute left-0 top-0 bg-gold px-2.5 py-1.5 text-forest">
              {product.isNew ? "New" : "Most loved"}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <span className="label-sm text-gold">
            {titleCase(product.category)}
          </span>
          <h3 className="mt-2 font-display text-xl leading-tight text-forest text-pretty">
            {product.name}
          </h3>
          <p className="mt-1 text-[0.8125rem] text-ink-3">{product.metal}</p>
          <p className="mt-auto pt-3 text-[0.8125rem] text-ink-2">
            Starting from{" "}
            <span className="text-forest">{formatPrice(product.price)}</span>
          </p>
        </div>
      </button>

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
          "absolute right-0 top-0 flex size-10 items-center justify-center bg-cream/90 backdrop-blur-sm transition-colors duration-150",
          saved ? "text-gold" : "text-ink-3 hover:text-forest"
        )}
      >
        <Icon name={saved ? "heart-filled" : "heart"} size={16} />
      </button>
    </article>
  );
}
