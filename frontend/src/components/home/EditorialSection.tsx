"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function EditorialSection() {
  return (
    <section className="py-32 bg-surface-container-high overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <AnimatedSection>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0opcWYvjPahpRLcqiBjIlPpchj-BADX-hb--1sbHFOdinl5rAVE9yK2kvGnCpdVyJe4HAa1L-9xdzbjkiaeODgBWyZGr68uPUhA5dPe3VZ_bBfO6R1khKjYe4Tvv-OWt0V6bDcLzHbcjjcgJVxKSVLhhUDTQo5Da87dkMw9YxrfLG35thiZ4TOiYF1nwGVJid5seSVqZ4IdrtZ8GwZjWcBNSNsivH5vQnaoxtv7EYt63rNpFURcKCdGblHuevaXr-qjCTSI2E4oqF"
              alt="Confident stylish man in a tailored jacket"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="max-w-md">
            <span className="text-[0.6875rem] tracking-[0.25rem] uppercase text-[#5f5e5e] mb-6 block">
              Join the Legacy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.4rem] leading-tight text-[#2d3435] mb-8">
              Elevate Your Network
            </h2>
            <p className="text-lg font-light tracking-widest text-[#2d3435]/80 leading-relaxed mb-12">
              We are looking for creative visionaries and global ambassadors to
              join the MISUNI inner circle. Gain exclusive access to drops and
              atelier events.
            </p>
            <Link
              href="/contact"
              className="border-b-2 border-[#2d3435] py-2 uppercase tracking-[0.3rem] text-sm font-bold hover:opacity-60 transition-opacity inline-block"
            >
              Join the Network
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
