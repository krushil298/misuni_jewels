import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products: Product[];
}

/** "You may also like" rail beneath a product. Scroll-snaps on phones. */
export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 border-t border-hairline pt-12 md:mt-24 md:pt-16">
      <SectionHeader
        title="You may also like"
        action={{ href: "/collections", label: "View all" }}
      />

      <ul className="snap-rail hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="snap-item w-[58vw] shrink-0 sm:w-auto"
          >
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
