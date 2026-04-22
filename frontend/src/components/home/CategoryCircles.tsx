"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { collections } from "@/data/collections";

const categories = [
  { name: "Necklaces", slug: "necklaces", image: collections[1].image },
  { name: "Rings", slug: "rings", image: collections[4].image },
  { name: "Earrings", slug: "earrings", image: collections[5].image },
  { name: "Bracelets", slug: "bracelets", image: collections[2].image },
  { name: "Bangles", slug: "bangles", image: collections[6].image },
];

export function CategoryCircles() {
  return (
    <section className="py-16 sm:py-28 bg-surface max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16">
      <AnimatedSection>
        <div className="flex flex-nowrap md:justify-center overflow-x-auto gap-6 sm:gap-14 md:gap-24 hide-scrollbar pb-8 pt-4 px-2">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/collections?category=${cat.slug}`}
              className="flex flex-col items-center gap-6 min-w-[90px] sm:min-w-[130px] group cursor-pointer"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full transition-transform duration-700 ease-out group-hover:scale-110 flex items-center justify-center">
                {/* Decorative outer ring */}
                <div className="absolute inset-0 rounded-full border border-primary/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 rounded-full border border-primary/10 group-hover:border-primary/40 transition-colors duration-500 z-10 pointer-events-none" />
                
                <div className="w-full h-full rounded-full overflow-hidden bg-surface-container shadow-sm group-hover:shadow-lg transition-shadow duration-500">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover rounded-full scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>
              <span className="text-[0.6875rem] tracking-[0.25rem] uppercase font-medium text-on-surface/80 group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
