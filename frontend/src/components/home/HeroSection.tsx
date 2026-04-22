"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2400&q=90&fit=crop";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt="Luxury diamond jewellery in gold"
          fill
          className="object-cover object-center scale-[1.02]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-inverse-surface/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 mix-blend-overlay" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full mt-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-surface/90 drop-shadow-lg text-base sm:text-lg tracking-wider sm:tracking-widest font-sans font-light leading-relaxed mb-10 sm:mb-14 max-w-sm sm:max-w-xl mx-auto"
        >
          Real diamond jewellery crafted in gold, white gold &amp; rose gold. <br className="hidden sm:block" />
          Where every stone tells a story of <span className="text-primary-container font-medium">purity, integrity &amp; brilliance</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <Link
            href="/collections"
            className="group relative overflow-hidden bg-primary text-white px-8 sm:px-10 py-3.5 sm:py-4 uppercase tracking-[0.25rem] sm:tracking-[0.3rem] text-[0.65rem] sm:text-[0.7rem] font-sans font-medium transition-all duration-500 w-[240px] sm:min-w-[240px] text-center shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </Link>
        </motion.div>
      </div>


    </section>
  );
}
