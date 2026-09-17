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
 * On the homepage it starts transparent over the hero and resolves to an
 * ivory bar once scrolled. Everywhere else it is solid from the start.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { count, isHydrated } = useSelection();

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Close the drawer and search when the route changes — including on
   * browser back/forward, which no click handler sees. Adjusting state
   * during render is React's documented alternative to a `[pathname]`
   * effect, and avoids the extra commit that effect would cost.
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
          "fixed inset-x-0 top-0 z-header inset-x-safe transition-colors duration-200 ease-out",
          overHero
            ? // A soft top scrim keeps the white lockup and icons legible
              // regardless of what the hero photograph is doing behind them.
              "bg-transparent before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-24 before:bg-linear-to-b before:from-ink/45 before:to-transparent"
            : "border-b border-hairline bg-canvas/95 backdrop-blur-md"
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "relative mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between gap-2 px-4 md:h-20 md:px-8 lg:px-12",
            overHero ? "text-white" : "text-ink"
          )}
        >
          {/* Left — menu (mobile) / links (desktop) */}
          <div className="flex flex-1 items-center gap-7">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="-ml-2 p-2 md:hidden"
            >
              <Icon name="menu" size={22} />
            </button>

            <div className="hidden items-center gap-7 md:flex">
              {NAV_LINKS.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative py-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-opacity duration-150 hover:opacity-70",
                      active && "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Centre — logo */}
          <Link
            href="/"
            aria-label="Misuni Jewels — home"
            className="shrink-0 transition-opacity duration-150 hover:opacity-80"
          >
            <Logo
              variant="lockup"
              tone={overHero ? "white" : "sage"}
              height={34}
              priority
              className="md:hidden"
            />
            <Logo
              variant="lockup"
              tone={overHero ? "white" : "sage"}
              height={48}
              priority
              className="hidden md:block"
            />
          </Link>

          {/* Right — search + saved */}
          <div className="flex flex-1 items-center justify-end gap-1 md:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the collection"
              className="p-2 transition-opacity duration-150 hover:opacity-70"
            >
              <Icon name="search" size={20} />
            </button>

            <Link
              href="/selection"
              aria-label={
                isHydrated && count > 0
                  ? `Your selection, ${count} ${count === 1 ? "piece" : "pieces"}`
                  : "Your selection"
              }
              className="relative p-2 transition-opacity duration-150 hover:opacity-70"
            >
              <Icon name={count > 0 ? "heart-filled" : "heart"} size={20} />
              {isHydrated && count > 0 && (
                <span
                  className={cn(
                    "absolute right-0 top-0 flex size-4 items-center justify-center rounded-full text-[0.5625rem] font-semibold tabular-nums",
                    overHero ? "bg-white text-ink" : "bg-brand text-white"
                  )}
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* Reserve the header's height on pages that don't run under it. */}
      {!isHome && <div aria-hidden className="h-14 md:h-20" />}

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
