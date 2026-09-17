import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";

interface RelatedProductsProps {
  products: Product[];
}

/** Related pieces beneath a product. Scroll-snaps on phones. */
export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24">
      <div className="flex items-baseline justify-between border-t border-ink pt-3">
        <h2 className="label text-ink">Also in this family</h2>
        <Link
          href="/collections"
          className="label text-ink-3 transition-colors duration-150 hover:text-ink"
        >
          <span className="inline-flex items-center gap-2">
            All pieces
            <Icon name="arrow-right" size={13} />
          </span>
        </Link>
      </div>

      <ul className="snap-rail hide-scrollbar mt-8 flex gap-4 overflow-x-auto sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id} className="snap-item w-[58vw] shrink-0 sm:w-auto">
            <ProductCard
              product={product}
              sizes="(max-width: 640px) 58vw, (max-width: 1024px) 33vw, 25vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
