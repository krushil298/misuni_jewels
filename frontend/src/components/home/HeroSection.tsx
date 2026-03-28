"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2400&q=90&fit=crop";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt="Luxury diamond jewellery editorial"
          fill
          className="object-cover object-center scale-[1.02]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3rem" }}
          animate={{ opacity: 1, letterSpacing: "0.4rem" }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="text-white/60 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.4rem] sm:tracking-[0.6rem] mb-4 sm:mb-6 font-light"
        >
          Purity · Integrity · Brilliance
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-[3.5rem] sm:text-6xl md:text-[7rem] lg:text-[8.5rem] font-black uppercase tracking-[0.2rem] sm:tracking-[0.3rem] leading-[0.9] mb-3 sm:mb-4"
        >
          MISUNI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-white/50 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.5rem] sm:tracking-[0.8rem] mb-8 sm:mb-10 font-light"
        >
          JEWELS
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-white/75 text-xs sm:text-sm md:text-base tracking-wider sm:tracking-widest font-light leading-relaxed mb-8 sm:mb-12 max-w-xs sm:max-w-md mx-auto"
        >
          Curation of light and metal. Precision craftsmanship for the discerning modern collector.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link
            href="/collections"
            className="bg-white text-[#0e0e0e] px-8 sm:px-10 py-3.5 sm:py-4 uppercase tracking-[0.25rem] sm:tracking-[0.3rem] text-[0.65rem] sm:text-[0.7rem] font-semibold hover:bg-white/90 active:scale-95 transition-all duration-200 w-[200px] sm:min-w-[200px] text-center"
          >
            Shop Now
          </Link>
          <Link
            href="/collections"
            className="border border-white/50 text-white px-8 sm:px-10 py-3.5 sm:py-4 uppercase tracking-[0.25rem] sm:tracking-[0.3rem] text-[0.65rem] sm:text-[0.7rem] font-light hover:bg-white/10 active:scale-95 transition-all duration-200 w-[200px] sm:min-w-[200px] text-center"
          >
            View Lookbook
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
        <span className="text-white/40 text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.3rem]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-6 sm:h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
