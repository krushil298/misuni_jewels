"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2400&q=90&fit=crop";

export function HeroSection() {
  return (
    <section className="relative h-[75vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt="Luxury diamond jewellery in gold"
          fill
          className="object-cover object-center scale-[1.02]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full mt-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white drop-shadow-md text-base sm:text-lg tracking-wider sm:tracking-widest font-sans font-light leading-relaxed mb-8 sm:mb-12 max-w-sm sm:max-w-xl mx-auto"
        >
          Real diamond jewellery crafted in gold, white gold &amp; rose gold. <br className="hidden sm:block" />
          Where every stone tells a story of purity, integrity &amp; brilliance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link
            href="/collections"
            className="bg-white text-[#1a2421] px-8 sm:px-10 py-3.5 sm:py-4 uppercase tracking-[0.25rem] sm:tracking-[0.3rem] text-[0.65rem] sm:text-[0.7rem] font-sans font-semibold hover:bg-white/90 active:scale-95 transition-all duration-200 w-[220px] sm:min-w-[220px] text-center"
          >
            Explore Collection
          </Link>
          <Link
            href="/about"
            className="border border-white/50 text-white px-8 sm:px-10 py-3.5 sm:py-4 uppercase tracking-[0.25rem] sm:tracking-[0.3rem] text-[0.65rem] sm:text-[0.7rem] font-sans font-medium hover:bg-white/10 active:scale-95 transition-all duration-200 w-[220px] sm:min-w-[220px] text-center"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.3rem] font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-6 sm:h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
