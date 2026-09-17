"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SelectionDrawer } from "@/components/layout/SelectionDrawer";
import { useSelection } from "@/context/SelectionContext";
import { SECTIONS } from "@/lib/sections";
import { appointmentLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Site header.
 *
 * Sticky on the forest ground, carrying the gold lockup. On a single page
 * the links are in-page anchors rather than routes, and a scroll-spy marks
 * the section currently in view.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectionOpen, setSelectionOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { count, isHydrated } = useSelection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Scroll-spy. The observer's root margin pulls the detection band to the
   * upper third of the viewport, so a section is marked active once its
   * heading reaches reading height rather than when its last pixel leaves.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        // Nothing is marked active while the hero still fills the band —
        // otherwise the first link lights up before it has been reached.
        setActive(visible[0]?.target.id ?? null);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-header bg-forest/95 backdrop-blur-md transition-shadow duration-200",
          scrolled && "shadow-[0_1px_0_0_var(--color-rule-dark)]"
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-20 items-center justify-between gap-4 md:h-24"
        >
          <a
            href="#top"
            aria-label="Misuni Jewels — top of page"
            className="shrink-0 transition-opacity duration-150 hover:opacity-75"
          >
            <Logo
              variant="lockup"
              tone="gold"
              height={44}
              priority
              className="md:hidden"
            />
            <Logo
              variant="lockup"
              tone="gold"
              height={60}
              priority
              className="hidden md:block"
            />
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? "true" : undefined}
                  className={cn(
                    "label relative py-1 transition-colors duration-150",
                    active === section.id
                      ? "text-gold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-gold"
                      : "text-cream/70 hover:text-cream"
                  )}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1 md:gap-3">
            <button
              type="button"
              onClick={() => setSelectionOpen(true)}
              aria-label={
                isHydrated && count > 0
                  ? `Your selection, ${count} ${count === 1 ? "piece" : "pieces"}`
                  : "Your selection"
              }
              className="relative p-2 text-cream transition-colors duration-150 hover:text-gold"
            >
              <Icon name={count > 0 ? "heart-filled" : "heart"} size={19} />
              {isHydrated && count > 0 && (
                <span className="absolute right-0 top-0 flex size-4 items-center justify-center bg-gold text-[0.5625rem] font-medium text-forest">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            <a
              href={appointmentLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold-line hidden min-h-10 px-5 py-2.5 lg:inline-flex"
            >
              Book consultation
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="-mr-2 p-2 text-cream md:hidden"
            >
              <Icon name="menu" size={21} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SelectionDrawer
        open={selectionOpen}
        onClose={() => setSelectionOpen(false)}
      />
    </>
  );
}
