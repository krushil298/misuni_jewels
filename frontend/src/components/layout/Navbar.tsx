"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScrollDirection();
  const { totalItems } = useCart();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isHome = pathname === "/";
  const isScrolled = scrollY > 80;
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* ── Main nav ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isTransparent
            ? "bg-transparent border-b border-white/10"
            : "bg-white border-b border-[#e8e8e8]"
        )}
      >
        <nav className="grid grid-cols-3 items-center w-full px-4 sm:px-8 max-w-[1440px] mx-auto h-[58px]">
          {/* Left — hamburger (mobile) / nav links (desktop) */}
          <div className="flex items-center">
            <button
              className={cn(
                "md:hidden transition-all duration-300 hover:opacity-60 p-1",
                isTransparent ? "text-white" : "text-[#2d3435]"
              )}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
            <div className="hidden md:flex gap-6 lg:gap-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-['Inter'] uppercase tracking-[0.15rem] lg:tracking-[0.2rem] text-[0.65rem] lg:text-[0.7rem] font-medium transition-all duration-300",
                    isTransparent
                      ? pathname === link.href
                        ? "text-white border-b border-white pb-0.5"
                        : "text-white/80 hover:text-white"
                      : pathname === link.href
                      ? "text-[#2d3435] border-b border-[#2d3435] pb-0.5"
                      : "text-[#5f5e5e] hover:text-[#2d3435]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center — logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex flex-col items-center group">
              <span
                className={cn(
                  "text-[1.05rem] sm:text-[1.3rem] font-black uppercase tracking-[0.2rem] sm:tracking-[0.35rem] leading-none transition-all duration-300",
                  isTransparent ? "text-white" : "text-[#2d3435]"
                )}
              >
                MISUNI
              </span>
              <span
                className={cn(
                  "text-[0.38rem] sm:text-[0.48rem] uppercase tracking-[0.18rem] sm:tracking-[0.3rem] font-light mt-0.5 transition-all duration-300",
                  isTransparent ? "text-white/70" : "text-[#5f5e5e]"
                )}
              >
                JEWELS
              </span>
            </Link>
          </div>

          {/* Right — search + wishlist + cart */}
          <div className="flex items-center gap-3 sm:gap-4 justify-end">
            <Link
              href="/wishlist"
              className={cn(
                "transition-all duration-300 hover:opacity-60 hidden md:block",
                isTransparent ? "text-white" : "text-[#2d3435]"
              )}
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                "transition-all duration-300 hover:opacity-60",
                isTransparent ? "text-white" : "text-[#2d3435]"
              )}
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <Link
              href="/cart"
              className={cn(
                "transition-all duration-300 hover:opacity-60 relative",
                isTransparent ? "text-white" : "text-[#2d3435]"
              )}
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {totalItems > 0 && (
                <span
                  className={cn(
                    "absolute -top-1 -right-1 text-[7px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold",
                    isTransparent ? "bg-white text-[#0e0e0e]" : "bg-[#2d3435] text-white"
                  )}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Search popup overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md flex flex-col items-center justify-start pt-[20vh]"
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="w-full max-w-2xl px-6"
            >
              <p className="text-white/40 text-[0.55rem] uppercase tracking-[0.4rem] mb-6 text-center">
                What are you looking for?
              </p>
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent border-b-2 border-white/30 focus:border-white/80 outline-none text-white text-2xl sm:text-3xl font-light tracking-widest pb-4 placeholder:text-white/25 transition-colors duration-300 pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-4 text-white/40 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                </button>
              </form>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Chains", "Bracelets", "Pendants", "Rings", "Watches"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      router.push(`/search?q=${tag.toLowerCase()}`);
                      setSearchOpen(false);
                    }}
                    className="text-white/40 hover:text-white text-[0.6rem] uppercase tracking-[0.25rem] border border-white/15 hover:border-white/40 px-4 py-2 transition-all duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for non-home pages */}
      {!isHome && <div className="h-[58px]" />}
    </>
  );
}
