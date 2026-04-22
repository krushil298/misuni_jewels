"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScrollDirection();
  const { totalItems } = useCart();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isHome = pathname === "/";
  const isScrolled = scrollY > 80;
  const isTransparent = isHome && !isScrolled && !isHovered;

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isTransparent
            ? "bg-transparent border-none"
            : "bg-white border-b border-[#e8e8e8]"
        )}
      >
        <nav className="relative flex items-center justify-between w-full px-4 sm:px-8 max-w-[1440px] mx-auto h-[85px]">
          {/* Left — hamburger (mobile) / nav links (desktop) */}
          <div className="flex items-center relative z-10">
            <button
              className={cn(
                "md:hidden transition-all duration-300 hover:opacity-60 p-1",
                isTransparent ? "text-white" : "text-[#2d3435]"
              )}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div className="hidden md:flex gap-6 lg:gap-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans uppercase tracking-[0.15rem] lg:tracking-[0.2rem] text-[0.65rem] lg:text-[0.7rem] font-medium transition-all duration-300",
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <Link href="/" className="relative block h-[45px] w-[140px] sm:h-[65px] sm:w-[190px] flex items-center justify-center">
              {/* White logo for transparent/hero state */}
              <Image
                src="/logo-white.png"
                alt="Misuni Jewels"
                fill
                className={cn(
                  "object-contain transition-opacity duration-300",
                  isTransparent ? "opacity-100" : "opacity-0"
                )}
                priority
              />
              {/* Dark logo for solid/white navbar state */}
              <Image
                src="/logo-dark.png"
                alt="Misuni Jewels"
                fill
                className={cn(
                  "object-contain transition-opacity duration-300",
                  isTransparent ? "opacity-0" : "opacity-100"
                )}
                priority
              />
            </Link>
          </div>

          {/* Right — search + wishlist + cart */}
          <div className="flex items-center gap-3 sm:gap-4 justify-end relative z-10">
            {/* Desktop Search Bar */}
            <form 
              onSubmit={handleSearch} 
              className={cn(
                "hidden lg:flex items-center border rounded-sm px-3 py-1.5 transition-opacity",
                isTransparent 
                  ? "border-white/40 text-white hover:border-white" 
                  : "border-[#2d3435]/40 text-[#2d3435] hover:border-[#2d3435]"
              )}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-[0.65rem] uppercase tracking-widest outline-none w-[100px] xl:w-[140px] placeholder:inherit placeholder:opacity-60 font-sans"
              />
              <button type="submit" aria-label="Search text" className="ml-1 hover:opacity-60 transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </form>

            <Link
              href="/wishlist"
              className={cn(
                "transition-all duration-300 hover:opacity-60 hidden md:block",
                isTransparent ? "text-white" : "text-[#2d3435]"
              )}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </Link>
            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                "lg:hidden transition-all duration-300 hover:opacity-60",
                isTransparent ? "text-white" : "text-[#2d3435]"
              )}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
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
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </form>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Necklaces", "Rings", "Earrings", "Bracelets", "Bangles", "Pendants"].map((tag) => (
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for non-home pages */}
      {!isHome && <div className="h-[68px]" />}
    </>
  );
}
