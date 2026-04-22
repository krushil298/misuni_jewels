"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#f0efec] text-[#1a2421] w-full pt-12 sm:pt-16 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 px-4 sm:px-8 md:px-16 max-w-[1440px] mx-auto">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="relative h-[70px] w-[180px] mb-2 sm:mb-4 -ml-2">
            <Image src="/logo-dark.png" alt="Misuni Jewels" fill className="object-contain object-left" />
          </div>
          <p className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase leading-relaxed text-[#4a5553]">
            Real diamond jewellery crafted in gold, white gold &amp; rose gold.
            Purity. Integrity. Brilliance.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h5 className="font-['Inter'] text-[0.7rem] sm:text-[0.75rem] tracking-[0.15rem] uppercase font-bold text-[#1a2421] mb-4 sm:mb-6">
            Explore
          </h5>
          <ul className="space-y-2.5 sm:space-y-3">
            {[
              { href: "/collections", label: "Collections" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/search", label: "Search" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase text-[#4a5553] hover:text-[#1a2421] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h5 className="font-['Inter'] text-[0.7rem] sm:text-[0.75rem] tracking-[0.15rem] uppercase font-bold text-[#1a2421] mb-4 sm:mb-6">
            Service
          </h5>
          <ul className="space-y-2.5 sm:space-y-3">
            {["Shipping", "Returns", "Jewellery Care", "Certification"].map(
              (label) => (
                <li key={label}>
                  <span className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase text-[#4a5553] hover:text-[#1a2421] transition-colors cursor-pointer">
                    {label}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 space-y-4 sm:space-y-6">
          <h5 className="font-['Inter'] text-[0.7rem] sm:text-[0.75rem] tracking-[0.15rem] uppercase font-bold text-[#1a2421] mb-4 sm:mb-6">
            Stay Inspired
          </h5>
          <div className="flex border-b border-[#1a2421]/20 pb-2">
            <input
              className="bg-transparent border-none w-full font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase focus:ring-0 focus:outline-none placeholder:text-[#6e7b79]/50"
              placeholder="EMAIL ADDRESS"
              type="email"
            />
            <button className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase font-bold hover:opacity-50 transition-opacity">
              Join
            </button>
          </div>
          <div className="flex gap-4 mt-6 sm:mt-8">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5553" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:stroke-[#1a2421] transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5553" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:stroke-[#1a2421] transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 px-4 sm:px-8 md:px-16 max-w-[1440px] mx-auto text-center border-t border-[#1a2421]/5 pt-6 sm:pt-8">
        <span className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase text-[#4a5553]">
          &copy; 2025 MISUNI JEWELS. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
