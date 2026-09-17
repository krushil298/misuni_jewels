import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/data/api";

/**
 * Featured pieces.
 *
 * Falls back to the newest arrivals when nothing is flagged as a bestseller,
 * so this section is never an empty hole on the homepage.
 */
export async function FeaturedSection() {
  const products = await getProducts();
  if (products.length === 0) return null;

  const bestsellers = products.filter((p) => p.isBestseller);
  const featured = (bestsellers.length >= 4 ? bestsellers : products).slice(
    0,
    8
  );

  return (
    <section className="bg-canvas-sunk py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Curated"
          title="Most requested"
          description="The pieces our clients ask to see first."
          action={{ href: "/collections", label: "View all" }}
        />

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < 2}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
