"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { collections } from "@/data/collections";

const categories = [
  { name: "Best Sellers", slug: "best-sellers", image: collections[0].image },
  { name: "Chains", slug: "chains", image: collections[1].image },
  { name: "Bracelets", slug: "bracelets", image: collections[2].image },
  { name: "Pendants", slug: "pendants", image: collections[3].image },
  { name: "Watches", slug: "watches", image: collections[5].image },
];

export function CategoryCircles() {
  return (
    <section className="py-12 sm:py-24 bg-[#f9f9f9] max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16">
      <AnimatedSection>
        <div className="flex flex-nowrap md:justify-center overflow-x-auto gap-5 sm:gap-12 md:gap-20 hide-scrollbar pb-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections?category=${cat.slug}`}
              className="flex flex-col items-center gap-4 min-w-[80px] sm:min-w-[120px] group cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-[#2d3435]/10 p-1 bg-white transition-transform duration-500 group-hover:scale-105 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-[0.6875rem] tracking-[0.2rem] uppercase font-semibold text-[#2d3435] whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
