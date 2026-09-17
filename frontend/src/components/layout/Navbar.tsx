"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { useSelection } from "@/context/SelectionContext";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Site header.
 *
 * Sticky rather than fixed-and-transparent: the homepage no longer runs a
 * photograph under the chrome, so the bar simply sits on paper and gains a
 * rule once you scroll past the masthead. The logo is left-aligned — a
 * centred lockup is the luxury-template default and it wastes the strongest
 * position on the page.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { count, isHydrated } = useSelection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Close transient UI when the route changes — including on browser
   * back/forward, which no click handler sees. Adjusting state during
   * render is React's documented alternative to a `[pathname]` effect.
   */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-header bg-paper/92 backdrop-blur-md transition-shadow duration-150",
          scrolled && "border-b border-rule"
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-16 items-center justify-between gap-3 md:h-20"
        >
          {/* Left — logo */}
          <Link
            href="/"
            aria-label="Misuni Jewels — home"
            className="shrink-0 transition-opacity duration-150 hover:opacity-70"
          >
            <Logo variant="lockup" height={30} priority className="md:hidden" />
            <Logo
              variant="lockup"
              height={38}
              priority
              className="hidden md:block"
            />
          </Link>

          {/* Centre — links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "label relative py-1 transition-colors duration-150",
                    active
                      ? "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-ink"
                      : "text-ink-3 hover:text-ink"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right — search, selection, enquire */}
          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the collection"
              className="p-2 text-ink transition-opacity duration-150 hover:opacity-60"
            >
              <Icon name="search" size={19} />
            </button>

            <Link
              href="/selection"
              aria-label={
                isHydrated && count > 0
                  ? `Your selection, ${count} ${count === 1 ? "piece" : "pieces"}`
                  : "Your selection"
              }
              className="relative p-2 text-ink transition-opacity duration-150 hover:opacity-60"
            >
              <Icon name={count > 0 ? "heart-filled" : "heart"} size={19} />
              {isHydrated && count > 0 && (
                <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center bg-sage text-[0.5625rem] font-medium tabular-nums text-white">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="-mr-2 p-2 text-ink md:hidden"
            >
              <Icon name="menu" size={21} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSubmit={(q) => {
          setSearchOpen(false);
          router.push(`/search?q=${encodeURIComponent(q)}`);
        }}
      />
    </>
  );
}
