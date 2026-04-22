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

  // Auto-advance via requestAnimationFrame when not paused
  const autoScrollPos = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.6; // px per frame (~36px/s at 60fps)
    const oneThird = track.scrollWidth / 3;

    const tick = () => {
      if (!isDragging.current && !paused) {
        autoScrollPos.current += SPEED;
        if (autoScrollPos.current >= oneThird) {
          autoScrollPos.current -= oneThird;
        }
        track.scrollLeft = autoScrollPos.current;
      } else {
        // keep autoScrollPos in sync with manual scroll so resume is seamless
        autoScrollPos.current = track.scrollLeft;
        if (autoScrollPos.current >= oneThird) autoScrollPos.current -= oneThird;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused]);

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

  return (
    <section className="py-8 sm:py-12 bg-surface overflow-hidden select-none">
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 z-10 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 z-10 bg-gradient-to-l from-surface to-transparent" />

        {/* Scrollable track — hide native scrollbar */}
        <div
          ref={trackRef}
          className="flex overflow-x-scroll hide-scrollbar gap-4 sm:gap-6 py-4 px-4 cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: "auto" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {loopedCategories.map((cat, i) => (
            <Link
              key={`${cat.slug}-${i}`}
              href={`/collections?category=${cat.slug}`}
              onClick={onLinkClick}
              draggable={false}
              className="flex flex-col items-center gap-2 sm:gap-3 min-w-[72px] sm:min-w-[90px] group cursor-pointer shrink-0"
            >
              <div className="relative w-[75px] h-[75px] sm:w-[95px] sm:h-[95px] rounded-full p-[3px] bg-white border border-black/10 shadow-sm transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={120}
                    height={120}
                    draggable={false}
                    className="w-full h-full object-cover rounded-full pointer-events-none"
                  />
                </div>
              </div>
              <span className="text-[0.6rem] sm:text-[0.68rem] font-bold uppercase tracking-wide text-[#1a1a1a] whitespace-nowrap text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
