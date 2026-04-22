"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { collections } from "@/data/collections";

const categories = [
  { name: "Necklaces", slug: "necklaces", image: collections[1].image },
  { name: "Pendants", slug: "pendants", image: collections[3].image },
  { name: "Rings", slug: "rings", image: collections[4].image },
  { name: "Best Sellers", slug: "best-sellers", image: collections[0].image },
  { name: "Earrings", slug: "earrings", image: collections[5].image },
];

export function CategoryCircles() {
  const scrollRight = () => {
    const container = document.getElementById('category-scroll');
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-surface max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16">
      <AnimatedSection>
        <div className="relative w-full flex items-center justify-center max-w-5xl mx-auto">
          
          <div 
            id="category-scroll"
            className="flex flex-nowrap overflow-x-auto hide-scrollbar gap-4 sm:gap-8 md:gap-14 py-4 px-2 sm:px-12 scroll-smooth"
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections?category=${cat.slug}`}
                className="flex flex-col items-center gap-3 sm:gap-4 min-w-[75px] sm:min-w-[100px] group cursor-pointer shrink-0"
              >
                {/* Outer border and white padding (matching screenshot) */}
                <div className="relative w-[85px] h-[85px] sm:w-[110px] sm:h-[110px] rounded-full p-[3px] sm:p-1 bg-white border border-black/10 shadow-sm transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <span className="text-[0.65rem] sm:text-[0.75rem] font-bold uppercase tracking-wide text-[#1a1a1a]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Arrow Button (matching screenshot) */}
          <button 
            onClick={scrollRight}
            className="hidden md:flex absolute -right-4 w-11 h-11 rounded-full bg-[#f8f8f8] shadow-sm border border-black/5 items-center justify-center text-black hover:bg-gray-100 transition-colors z-10"
            aria-label="Scroll categories right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </AnimatedSection>
    </section>
  );
}
