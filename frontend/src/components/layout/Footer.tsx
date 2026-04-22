"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-inverse-surface text-surface w-full pt-16 sm:pt-20 pb-8 border-t border-primary/20 relative overflow-hidden">
      {/* Decorative subtle background overlay from theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-dim)_0%,_transparent_40%)] opacity-10 pointer-events-none" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-14 px-6 sm:px-10 md:px-16 max-w-[1440px] mx-auto relative z-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-start">
          <div className="relative h-[70px] w-[180px] mb-4 sm:mb-6 -ml-2 transition-transform duration-500 hover:scale-105">
            <Image src="/logo-white.png" alt="Misuni Jewels" fill className="object-contain object-left" />
          </div>
          <p className="font-sans text-[0.6rem] sm:text-[0.65rem] tracking-[0.15rem] uppercase leading-loose text-surface/70">
            Real diamond jewellery crafted in gold, white gold &amp; rose gold.
            <br className="hidden sm:block my-1" />
            <span className="text-primary-container font-medium">Purity. Integrity. Brilliance.</span>
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h5 className="font-sans text-[0.7rem] sm:text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-white mb-6 sm:mb-8 flex items-center gap-2">
            Explore
            <span className="h-px w-6 bg-primary/40 rounded-full" />
          </h5>
          <ul className="space-y-3 sm:space-y-4">
            {[
              { href: "/collections", label: "Collections" },
              { href: "/contact", label: "Contact" },
              { href: "/search", label: "Search" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-[0.65rem] sm:text-[0.6875rem] tracking-[0.15rem] uppercase text-surface/60 hover:text-primary-container transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 ease-out inline-block">› </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h5 className="font-sans text-[0.7rem] sm:text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-white mb-6 sm:mb-8 flex items-center gap-2">
            Service
            <span className="h-px w-6 bg-primary/40 rounded-full" />
          </h5>
          <ul className="space-y-3 sm:space-y-4">
            {["Shipping", "Returns", "Jewellery Care", "Certification"].map(
              (label) => (
                <li key={label}>
                  <span className="font-sans text-[0.65rem] sm:text-[0.6875rem] tracking-[0.15rem] uppercase text-surface/60 hover:text-primary-container transition-colors duration-300 cursor-pointer flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 ease-out inline-block">› </span>
                    {label}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 space-y-6 sm:space-y-8">
          <h5 className="font-sans text-[0.7rem] sm:text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-white mb-6 sm:mb-8 flex items-center gap-2">
            Stay Inspired
            <span className="h-px w-6 bg-primary/40 rounded-full" />
          </h5>
          <div className="flex border-b border-primary/30 pb-3 focus-within:border-primary-container transition-colors duration-300 group">
            <input
              className="bg-transparent border-none w-full font-sans text-[0.65rem] sm:text-[0.7rem] tracking-widest uppercase focus:ring-0 focus:outline-none placeholder:text-surface/30 text-white"
              placeholder="EMAIL ADDRESS"
              type="email"
            />
            <button className="font-sans text-[0.65rem] sm:text-[0.7rem] tracking-widest uppercase font-bold text-primary-container group-focus-within:text-white hover:text-primary transition-colors duration-300 pl-4">
              Join
            </button>
          </div>
          <div className="flex gap-5 mt-8 sm:mt-10">
            <a href="#" className="p-2 rounded-full border border-surface/10 hover:bg-primary hover:border-primary hover:text-white text-surface/60 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="p-2 rounded-full border border-surface/10 hover:bg-primary hover:border-primary hover:text-white text-surface/60 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 px-6 sm:px-10 md:px-16 max-w-[1440px] mx-auto text-center border-t border-primary/20 pt-8 sm:pt-10">
        <span className="font-sans text-[0.55rem] sm:text-[0.6rem] tracking-[0.25rem] uppercase text-surface/40">
          &copy; {new Date().getFullYear()} MISUNI JEWELS. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
