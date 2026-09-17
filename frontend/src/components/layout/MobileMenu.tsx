"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { SECTIONS } from "@/lib/sections";
import { CONTACT, LOCATION, SITE_TAGLINE } from "@/lib/constants";
import { appointmentLink } from "@/lib/whatsapp";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Slide-in navigation drawer. Links are in-page anchors on the single page. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

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
            className="fixed inset-0 z-drawer bg-forest/60 backdrop-blur-sm md:hidden"
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
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-modal flex w-[86%] max-w-sm flex-col bg-forest pt-safe text-cream outline-none md:hidden"
          >
            <div className="flex items-center justify-between border-b border-rule-dark px-5 py-4">
              <Logo variant="lockup" tone="gold" height={34} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="-mr-2 p-2 text-cream/70"
              >
                <Icon name="close" size={22} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-7">
              <ul>
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={onClose}
                      className="flex items-center justify-between border-b border-rule-dark py-4 font-display text-3xl text-cream"
                    >
                      {section.label}
                      <Icon
                        name="arrow-right"
                        size={16}
                        className="text-gold"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-rule-dark px-5 py-5 pb-safe">
              <a
                href={appointmentLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold w-full"
              >
                <Icon name="whatsapp" size={16} />
                Book a viewing
              </a>

              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="mt-4 block text-center text-[0.8125rem] text-cream/60"
              >
                {CONTACT.phoneDisplay}
              </a>
              <p className="mt-1 text-center text-[0.75rem] text-cream/40">
                {LOCATION.label}, {LOCATION.city}
              </p>
              <p className="label-sm mt-4 text-center text-gold/70">
                {SITE_TAGLINE}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
