"use client";

import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";

const categories = [
  { name: "Necklaces",        slug: "necklaces",          image: collections[1].image },
  { name: "Rings",            slug: "rings",              image: collections[4].image },
  { name: "Earrings",         slug: "earrings",           image: collections[5].image },
  { name: "Pendants",         slug: "pendants",           image: collections[3].image },
  { name: "Bracelets",        slug: "bracelets",          image: collections[2].image },
  { name: "Bangles",          slug: "bangles",            image: collections[6].image },
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
    image: "https://images.unsplash.com/photo-1573408301185-9519f94bf84b?w=300&h=300&fit=crop&crop=center",
  },
];

// Triple for a seamless infinite loop
const loopedCategories = [...categories, ...categories, ...categories];

export function CategoryCircles() {
  return (
    <section className="py-8 sm:py-12 bg-surface overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-surface to-transparent" />

        {/* Marquee track */}
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-8 sm:gap-12 md:gap-16 py-4 px-4"
          style={{ animationDuration: "40s" }}
        >
          {loopedCategories.map((cat, i) => (
            <Link
              key={`${cat.slug}-${i}`}
              href={`/collections?category=${cat.slug}`}
              className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[100px] group cursor-pointer shrink-0"
            >
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
              <span className="text-[0.62rem] sm:text-[0.72rem] font-bold uppercase tracking-wide text-[#1a1a1a] whitespace-nowrap text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
