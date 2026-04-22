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
  { href: "/contact", label: "Contact" },
];

const profileLinks = [
  { href: "/wishlist", label: "My Wishlist", icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
  { href: "/collections", label: "Browse Collections", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { href: "/contact", label: "Contact Us", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScrollDirection();
  const { totalItems } = useCart();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";
  const isScrolled = scrollY > 80;
  const isTransparent = isHome && !isScrolled && !isHovered;

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setSearchOpen(false); setProfileOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close profile dropdown when navigating
  useEffect(() => { setProfileOpen(false); }, [pathname]);

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
          isTransparent
            ? "bg-transparent border-none"
            : "bg-surface/95 backdrop-blur-md border-b border-primary/10 shadow-sm"
        )}
      >
        <nav className="relative flex items-center justify-between w-full px-4 sm:px-8 max-w-[1440px] mx-auto h-[85px]">
          {/* Left — hamburger (mobile) / nav links (desktop) */}
          <div className="flex items-center relative z-10">
            <button
              className={cn(
                "md:hidden transition-all duration-300 hover:opacity-60 p-1",
                isTransparent ? "text-white hover:text-primary-container" : "text-on-surface hover:text-primary"
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
                    "font-sans uppercase tracking-[0.15rem] lg:tracking-[0.2rem] text-[0.65rem] lg:text-[0.7rem] font-medium transition-all duration-300 relative group",
                    isTransparent
                      ? pathname === link.href
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                      : pathname === link.href
                      ? "text-primary"
                      : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1.5 left-0 h-[1px] bg-current transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              ))}
            </div>
          </div>

          {/* Center — logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <Link href="/" className="relative block h-[45px] w-[140px] sm:h-[65px] sm:w-[190px] flex items-center justify-center transform transition-transform duration-500 hover:scale-105">
              {/* White logo for transparent/hero state */}
              <Image
                src="/logo-white.png"
                alt="Misuni Jewels"
                fill
                className={cn(
                  "object-contain transition-opacity duration-500",
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
                  "object-contain transition-opacity duration-500",
                  isTransparent ? "opacity-0" : "opacity-100"
                )}
                priority
              />
            </Link>
          </div>

          {/* Right — search + wishlist + cart + profile */}
          <div className="flex items-center gap-3 sm:gap-4 justify-end relative z-10">

            {/* Desktop Search Bar — always visible, pill style */}
            <form
              onSubmit={handleSearch}
              className={cn(
                "hidden lg:flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-500 focus-within:ring-1 border",
                isTransparent
                  ? "bg-white/10 text-white border-transparent focus-within:bg-white/20 focus-within:ring-white/40 focus-within:border-white/30"
                  : "bg-surface-container-low text-on-surface border-primary/5 focus-within:bg-surface-container focus-within:ring-primary/20 focus-within:border-primary/20"
              )}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
                <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "bg-transparent text-[0.7rem] tracking-wider outline-none w-[130px] xl:w-[170px] font-sans transition-all",
                  isTransparent
                    ? "text-white placeholder:text-white/60"
                    : "text-on-surface placeholder:text-on-surface/40"
                )}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="opacity-50 hover:opacity-100 hover:text-primary transition-all flex-shrink-0"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </form>

            {/* Wishlist icon — desktop only */}
            <Link
              href="/wishlist"
              className={cn(
                "transition-all duration-300 hidden md:block hover:scale-110",
                isTransparent ? "text-white hover:text-primary-container" : "text-on-surface hover:text-primary"
              )}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </Link>



            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                "lg:hidden transition-all duration-300 hover:scale-110",
                isTransparent ? "text-white hover:text-primary-container" : "text-on-surface hover:text-primary"
              )}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>

            {/* Profile icon + dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-label="Profile menu"
                className={cn(
                  "flex items-center justify-center transition-all duration-300 hover:scale-110",
                  isTransparent ? "text-white hover:text-primary-container" : "text-on-surface hover:text-primary"
                )}
              >
                {/* Clean outline avatar — circle head + shoulder arc */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/>
                </svg>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-[calc(100%+12px)] w-[240px] bg-surface border border-primary/10 shadow-2xl z-[100] overflow-hidden rounded-sm"
                  >
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-primary/5 bg-primary/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-inner">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4"/>
                            <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-sans text-[0.7rem] font-bold tracking-widest uppercase text-on-surface">Guest</p>
                          <p className="font-sans text-[0.6rem] tracking-wider text-primary-dim uppercase mt-0.5">Jewellery Enthusiast</p>
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="py-2">
                      {profileLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-primary/5 transition-colors group"
                          onClick={() => setProfileOpen(false)}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60 group-hover:text-primary transition-colors flex-shrink-0">
                            <path d={item.icon}/>
                          </svg>
                          <span className="font-sans text-[0.65rem] uppercase tracking-widest text-on-surface/80 group-hover:text-primary transition-colors font-medium">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Divider + WhatsApp CTA */}
                    <div className="border-t border-primary/10 px-5 py-4 bg-surface-container-low">
                      <a
                        href="https://wa.me/919999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full group"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="#25D366" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 group-hover:scale-110 transition-transform">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <span className="font-sans text-[0.65rem] uppercase tracking-widest text-[#25D366] group-hover:opacity-75 transition-opacity font-bold">
                          Enquire via WhatsApp
                        </span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart icon — last, with badge */}
            <Link
              href="/cart"
              className={cn(
                "transition-all duration-300 hover:scale-110 relative hidden md:block",
                isTransparent ? "text-white hover:text-primary-container" : "text-on-surface hover:text-primary"
              )}
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span className={cn(
                  "absolute -top-1.5 -right-1.5 text-[7px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none shadow-sm transition-transform duration-300 animate-in zoom-in",
                  isTransparent ? "bg-white text-primary" : "bg-primary text-white"
                )}>
                  {totalItems > 9 ? "9+" : totalItems}
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-start pt-[20vh]"
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              className="w-full max-w-2xl px-6"
            >
              <p className="text-primary-dim text-[0.6rem] uppercase tracking-[0.4rem] mb-6 text-center font-medium">
                What are you looking for?
              </p>
              <form onSubmit={handleSearch} className="relative group">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent border-b-2 border-primary/20 focus:border-primary outline-none text-on-surface text-3xl sm:text-4xl font-light tracking-widest pb-4 placeholder:text-on-surface/20 transition-all duration-300 pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-4 text-primary/50 hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </form>
              <div className="mt-10 flex flex-wrap gap-3 justify-center">
                {["Necklaces", "Rings", "Earrings", "Bracelets", "Bangles", "Pendants"].map((tag, i) => (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    key={tag}
                    onClick={() => {
                      router.push(`/search?q=${tag.toLowerCase()}`);
                      setSearchOpen(false);
                    }}
                    className="text-primary-dim hover:text-white hover:bg-primary text-[0.65rem] uppercase tracking-[0.25rem] border border-primary/20 hover:border-primary px-5 py-2.5 rounded-full transition-all duration-300"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-8 right-8 text-on-surface/40 hover:text-primary transition-all duration-300 hover:rotate-90 p-2"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for non-home pages */}
      {!isHome && <div className="h-[85px]" />}
    </>
  );
}
