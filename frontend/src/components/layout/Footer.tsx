"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-primary text-white w-full pt-16 sm:pt-20 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Decorative subtle background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-container)_0%,_transparent_40%)] opacity-20 pointer-events-none" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-14 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 w-full relative z-10">
        {/* Brand */}
        <div className="flex flex-col items-start lg:pr-8">
          <div className="relative h-[65px] w-[170px] mb-6 sm:mb-8 -ml-2 transition-transform duration-500 hover:scale-105">
            <Image src="/logo-white.png" alt="Misuni Jewels" fill className="object-contain object-left" />
          </div>
          <p className="font-sans text-[0.65rem] sm:text-[0.7rem] tracking-[0.15rem] uppercase leading-loose text-white/80">
            Real diamond jewellery crafted in gold, white gold &amp; rose gold.
            <br className="hidden sm:block my-2" />
            <span className="text-white font-semibold">Purity. Integrity. Brilliance.</span>
          </p>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <h5 className="font-sans text-[0.7rem] sm:text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            Explore
            <span className="h-px w-8 bg-white/40 rounded-full" />
          </h5>
          <ul className="space-y-4">
            {[
              { href: "/collections", label: "Collections" },
              { href: "/contact", label: "Contact Us" },
              { href: "/search", label: "Search" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-[0.65rem] sm:text-[0.7rem] tracking-[0.15rem] uppercase text-white/70 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 ease-out inline-block">› </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <h5 className="font-sans text-[0.7rem] sm:text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            Client Care
            <span className="h-px w-8 bg-white/40 rounded-full" />
          </h5>
          <ul className="space-y-4">
            {["Jewellery Care", "Certification", "Custom Orders"].map(
              (label) => (
                <li key={label}>
                  <span className="font-sans text-[0.65rem] sm:text-[0.7rem] tracking-[0.15rem] uppercase text-white/70 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 ease-out inline-block">› </span>
                    {label}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <h5 className="font-sans text-[0.7rem] sm:text-[0.75rem] tracking-[0.2rem] uppercase font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            Stay Inspired
            <span className="h-px w-8 bg-white/40 rounded-full" />
          </h5>
          <div className="flex border-b border-white/30 pb-3 focus-within:border-white transition-colors duration-300 group">
            <input
              className="bg-transparent border-none w-full font-sans text-[0.65rem] sm:text-[0.7rem] tracking-widest uppercase focus:ring-0 focus:outline-none placeholder:text-white/50 text-white"
              placeholder="EMAIL ADDRESS"
              type="email"
            />
            <button className="font-sans text-[0.65rem] sm:text-[0.7rem] tracking-widest uppercase font-bold text-white/70 group-focus-within:text-white hover:text-white transition-colors duration-300 pl-4">
              Join
            </button>
          </div>
          <div className="flex gap-4 mt-8 sm:mt-10">
            <a href="#" className="p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-primary text-white/80 transition-all duration-300 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-primary text-white/80 transition-all duration-300 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 w-full text-center border-t border-white/10 pt-8 sm:pt-10">
        <span className="font-sans text-[0.55rem] sm:text-[0.6rem] tracking-[0.25rem] uppercase text-white/50">
          &copy; {new Date().getFullYear()} MISUNI JEWELS. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
