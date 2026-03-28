"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#f2f4f4] text-[#2d3435] w-full pt-12 sm:pt-16 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 px-4 sm:px-8 md:px-16 max-w-[1440px] mx-auto">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="text-xl font-bold tracking-[0.2rem] text-[#2d3435] mb-4 sm:mb-6 uppercase">
            MISUNI
          </div>
          <p className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase leading-relaxed text-[#5f5e5e]">
            Mastering the art of brilliance. Every piece is a testament to
            timeless luxury and modern design integrity.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h5 className="font-['Inter'] text-[0.7rem] sm:text-[0.75rem] tracking-[0.15rem] uppercase font-bold text-[#2d3435] mb-4 sm:mb-6">
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
                  className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase text-[#5f5e5e] hover:text-[#2d3435] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h5 className="font-['Inter'] text-[0.7rem] sm:text-[0.75rem] tracking-[0.15rem] uppercase font-bold text-[#2d3435] mb-4 sm:mb-6">
            Service
          </h5>
          <ul className="space-y-2.5 sm:space-y-3">
            {["Shipping", "Returns", "Care Guide", "Sustainability"].map(
              (label) => (
                <li key={label}>
                  <span className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase text-[#5f5e5e] hover:text-[#2d3435] transition-colors cursor-pointer">
                    {label}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 space-y-4 sm:space-y-6">
          <h5 className="font-['Inter'] text-[0.7rem] sm:text-[0.75rem] tracking-[0.15rem] uppercase font-bold text-[#2d3435] mb-4 sm:mb-6">
            Stay Inspired
          </h5>
          <div className="flex border-b border-[#2d3435]/20 pb-2">
            <input
              className="bg-transparent border-none w-full font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase focus:ring-0 focus:outline-none placeholder:text-[#757c7d]/50"
              placeholder="EMAIL ADDRESS"
              type="email"
            />
            <button className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase font-bold hover:opacity-50 transition-opacity">
              Join
            </button>
          </div>
          <div className="flex gap-4 mt-6 sm:mt-8">
            <span className="material-symbols-outlined text-[#5f5e5e] cursor-pointer hover:text-[#2d3435] transition-colors">
              share
            </span>
            <span className="material-symbols-outlined text-[#5f5e5e] cursor-pointer hover:text-[#2d3435] transition-colors">
              photo_camera
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 px-4 sm:px-8 md:px-16 max-w-[1440px] mx-auto text-center border-t border-[#2d3435]/5 pt-6 sm:pt-8">
        <span className="font-['Inter'] text-[0.6rem] sm:text-[0.6875rem] tracking-widest uppercase text-[#5f5e5e]">
          &copy; 2024 MISUNI JEWELS. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
