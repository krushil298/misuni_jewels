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
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistanceRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Removed auto-scroll for a static carousel experience

  /* ── Mouse drag ── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragDistanceRef.current = 0;
    startX.current = e.pageX;
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const dx = e.pageX - startX.current;
    dragDistanceRef.current = Math.abs(dx);
    trackRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    resumeTimer.current = setTimeout(() => setPaused(false), 1800);
  };

  const onMouseLeave = () => {
    if (isDragging.current) onMouseUp();
  };

  /* ── Touch drag ── */
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    dragDistanceRef.current = 0;
    startX.current = e.touches[0].pageX;
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.touches[0].pageX - startX.current;
    dragDistanceRef.current = Math.abs(dx);
    trackRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    resumeTimer.current = setTimeout(() => setPaused(false), 1800);
  };

  // Prevent link navigation when user was dragging
  const onLinkClick = (e: React.MouseEvent) => {
    if (dragDistanceRef.current > 6) e.preventDefault();
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: trackRef.current.clientWidth / 2, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden select-none relative group/section">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        
        {/* Scrollable track — hide native scrollbar */}
        <div
          ref={trackRef}
          className="flex overflow-x-auto xl:justify-center hide-scrollbar gap-3 sm:gap-10 py-4 px-2 scroll-smooth"
          style={{ scrollBehavior: "auto" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {categories.map((cat, i) => (
            <Link
              key={`${cat.slug}-${i}`}
              href={`/collections?category=${cat.slug}`}
              onClick={onLinkClick}
              draggable={false}
              className="flex flex-col items-center gap-3 sm:gap-4 min-w-[70px] sm:min-w-[125px] group cursor-pointer shrink-0"
            >
              {/* Thicker grey border and padding as per the design */}
              <div className="relative w-[70px] h-[70px] sm:w-[125px] sm:h-[125px] rounded-full p-[3px] sm:p-[6px] bg-gray-200 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 70px, 125px"
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

        {/* Right Arrow Button */}
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-4 sm:right-8 lg:right-12 top-[45%] -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-100 items-center justify-center text-black hover:bg-gray-50 transition-colors z-20 opacity-0 group-hover/section:opacity-100"
          aria-label="Scroll right"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
