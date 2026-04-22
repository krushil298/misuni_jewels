import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/data/api";

export async function BestsellersSection() {
  const products = await getProducts();
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section className="py-10 sm:py-16 bg-surface-container-low relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 sm:mb-12 gap-6">
            <div>
              <span className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.3rem] sm:tracking-[0.4rem] font-medium uppercase text-primary mb-3 sm:mb-4 block flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                Curated Selection
              </span>
              <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-[0.15rem] sm:tracking-[0.2rem] text-on-surface">
                Bestsellers
              </h2>
            </div>

          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-x-8 sm:gap-y-12">
          {bestsellers.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.15}>
              <div className="group">
                <ProductCard product={product} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
