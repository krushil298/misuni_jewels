"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const gridItems = [
  {
    title: "Shop Necklaces",
    href: "/collections?category=necklaces",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvXiYKvp1Dhxi-4nBzmiXihyoCaVR__M6tlnWeZUQJPDCi8Cil9OftSQ53GToM9dvjPkb8yiX0Q5g7pQmuKWx-uRzSVlp5qBcA0oK6dngIlGxSWhcYDJx4LSEbWUaP2jITnzu2Rj2voMSwyFygVRoDG0YR20I3SyOeWnWlOwoFbLi5oQC8e6hPWAs1xTuTDyjwt8IrrQF1LPReRgDfI1GBQlQ6B1WQMs_Qm4aJBsSWFOiB51L1e45mcM5UHilPz31Im84Z5SYpOcrd",
    alt: "Diamond necklaces and fine jewellery",
    offset: false,
  },
  {
    title: "Shop Rings",
    href: "/collections?category=rings",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpk7nkANph_jcMxZk8IIBrhAjCf6_hn7hVDKGVULDeU7w-FWBoTssbQJm5lhz2-GEvmaQTPD-y1OXF71C0CaIGdoL3YSrobStkkzgDAelAJzBHoP8A9ylR7t-yxn9rRSLHX_Xx1OjtJt2pxypFOdrlnFJ0Fky7jlALG_7d7Wf51nYztn9tv389NO3v4DN-QIU3X3MGIevjUnarBrKcMB0_LlzsIObNyJJYpgZmKcGlvakzVy-NyrajBkBTHT2MAlszealG8QeKnUKs",
    alt: "Diamond rings in gold and rose gold",
    offset: true,
  },
  {
    title: "Shop Bracelets",
    href: "/collections?category=bracelets",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2uB5MscaiXscGI7QJ7xuCJRT1lKIokAGqjUy_R2xaY1xfYOvez1i8DI5_rpl1jSpvaRywQlh7aDxcTYkIccfNvnr7gBEs-8O8QPY3RMHieBB20ihbjVwqSU8wvJ2j5A3tDGv6EXbD-AZDhPHZEG7ZVpGQl82nNQg9J-HR3HRy6deMRB6iqDt15NLcORrvSoUNpAtdJRbXgA4QRL3m7-lQVjpkebAcTvYm320jAOfmhUsPIVypCtYQMCoiUKZnTZPTvFGYMZiIxCws",
    alt: "Diamond bracelets and bangles in gold",
    offset: false,
  },
];

export function CollectionsGrid() {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f7] max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
        {gridItems.map((item, i) => (
          <AnimatedSection key={item.title} delay={i * 0.15}>
            <Link
              href={item.href}
              className="relative h-[380px] sm:h-[500px] md:h-[700px] overflow-hidden group cursor-pointer block"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-20" />
              <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 flex justify-center">
                <span className="bg-white text-[#1a2421] px-7 sm:px-10 py-3.5 sm:py-5 uppercase tracking-[0.2rem] sm:tracking-[0.25rem] text-[0.65rem] sm:text-[0.7rem] font-bold group-hover:bg-[#1a2421] group-hover:text-white transition-all duration-300">
                  {item.title}
                </span>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
