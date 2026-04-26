"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";

const categories = [
  { name: "Necklaces",     slug: "necklaces",     image: collections[1].image },
  { name: "Rings",         slug: "rings",         image: collections[4].image },
  { name: "Earrings",      slug: "earrings",      image: collections[5].image },
  { name: "Pendants",      slug: "pendants",      image: collections[3].image },
  { name: "Bracelets",     slug: "bracelets",     image: collections[2].image },
  { name: "Bangles",       slug: "bangles",       image: collections[6].image },
  {
    name: "Solitaires",
    slug: "solitaires",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&crop=center",
  },
  {
    name: "Diamond Sets",
    slug: "diamond-sets",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
  },
  {
    name: "Tennis",
    slug: "tennis",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=300&h=300&fit=crop&crop=center",
  },
  {
    name: "Eternity Bands",
    slug: "eternity-bands",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop&crop=center",
  },
];

const loopedCategories = [...categories, ...categories, ...categories];

export function CategoryCircles() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const track = trackRef.current;
      const firstChild = track.children[0] as HTMLElement;
      const gap = parseInt(window.getComputedStyle(track).gap || '0');
      const itemWidth = firstChild.offsetWidth + gap;
      
      // Smooth scroll by one item
      track.scrollBy({ left: itemWidth, behavior: "smooth" });

      // After the smooth scroll animation completes, check for loop boundary
      setTimeout(() => {
        const oneThird = track.scrollWidth / 3;
        // If we've scrolled past the first set, instantly jump back
        if (track.scrollLeft >= oneThird) {
          track.scrollLeft -= oneThird;
        }
      }, 400); // 400ms is enough time for native smooth scroll to finish
    }
  };

  return (
    <section className="py-6 sm:py-8 bg-white overflow-hidden select-none relative group/section">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        
        <div className="relative w-full max-w-[900px] mx-auto">
          {/* Scrollable track — hidden scrollbar, no drag */}
          <div className="w-full max-w-[800px] mx-auto overflow-hidden">
          <div
            ref={trackRef}
            className="flex overflow-x-hidden hide-scrollbar gap-4 sm:gap-8 py-4 px-2 scroll-smooth justify-start"
            style={{ scrollBehavior: "smooth" }}
          >
          {loopedCategories.map((cat, i) => (
            <Link
              key={`${cat.slug}-${i}`}
              href={`/collections?category=${cat.slug}`}
              draggable={false}
              className="flex flex-col items-center gap-2 sm:gap-4 flex-shrink-0 w-[82px] sm:w-[130px] group cursor-pointer"
            >
              {/* Thicker grey border and padding as per the design */}
              <div className="relative w-[82px] h-[82px] sm:w-[125px] sm:h-[125px] rounded-full p-[4px] sm:p-[6px] bg-gray-200 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 82px, 125px"
                    draggable={false}
                    className="object-cover pointer-events-none"
                  />
                </div>
              </div>
              <span className="text-[0.55rem] sm:text-[0.8rem] font-extrabold uppercase tracking-widest text-black whitespace-nowrap text-center">
                {cat.name}
              </span>
            </Link>
          ))}
          </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute -right-2 sm:-right-4 lg:right-0 top-[45%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-black hover:bg-gray-50 transition-colors z-20 opacity-0 group-hover/section:opacity-100"
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
