"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { CATEGORIES, CONTACT, LOCATION, SITE_TAGLINE } from "@/lib/constants";
import { appointmentLink } from "@/lib/whatsapp";
import { titleCase } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-in navigation drawer.
 *
 * Categories are listed flat rather than nested — with six of them, a
 * visitor on a phone should reach any of them in one tap, not two.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock the page behind the drawer and close on Escape.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 z-drawer bg-ink/40 backdrop-blur-[2px] md:hidden"
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-modal flex w-[86%] max-w-sm flex-col bg-paper pt-safe outline-none md:hidden"
          >
            <div className="flex items-center justify-between border-b border-rule px-5 py-4">
              <Logo variant="lockup" height={34} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="-mr-2 p-2 text-ink-3"
              >
                <Icon name="close" size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
              <p className="label text-sage mb-4">Collection</p>
              <ul className="mb-8 space-y-0.5">
                {CATEGORIES.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/collections?category=${category}`}
                      onClick={onClose}
                      className="flex items-center justify-between border-b border-rule py-3.5 font-display text-xl text-ink"
                    >
                      {titleCase(category)}
                      <Icon
                        name="arrow-right"
                        size={16}
                        className="text-ink-4"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="label text-sage mb-4">Atelier</p>
              <ul className="space-y-0.5">
                {[
                  { href: "/collections", label: "All Pieces" },
                  { href: "/selection", label: "My Selection" },
                  { href: "/about", label: "About Misuni" },
                  { href: "/contact", label: "Contact & Visit" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block border-b border-rule py-3 font-sans text-[0.75rem] uppercase tracking-[0.16em] text-ink-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-rule px-5 py-5 pb-safe">
              <a
                href={appointmentLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full"
              >
                <Icon name="whatsapp" size={17} />
                Book a viewing
              </a>
              <p className="label-sm text-ink-3 mt-4 text-center normal-case tracking-[0.1em]">
                {LOCATION.label}, {LOCATION.city}
              </p>
              <p className="mt-1 text-center font-sans text-[0.625rem] uppercase tracking-[0.22em] text-ink-4">
                {SITE_TAGLINE}
              </p>
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="mt-3 block text-center font-sans text-[0.6875rem] tracking-[0.1em] text-ink-3"
              >
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
