"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
  { href: "/wishlist", label: "Wishlist" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-[#0e0e0e] z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
              <span className="text-lg font-black tracking-[0.3rem] text-white uppercase">
                MISUNI
              </span>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-['Inter'] uppercase tracking-[0.2rem] text-[0.8rem] font-medium text-white/70 hover:text-white transition-colors block py-3.5 border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-6 py-8 border-t border-white/10">
              <p className="text-white/30 text-[0.55rem] uppercase tracking-[0.25rem]">
                Purity · Integrity · Brilliance
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
