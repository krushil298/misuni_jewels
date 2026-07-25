"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementBarProps {
  message: string;
  link?: { href: string; label: string };
}

export function AnnouncementBar({ message, link }: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-on-surface text-white text-center relative z-[60] overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 px-4 py-2.5">
            <p className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.2rem] sm:tracking-[0.25rem] uppercase font-sans font-medium">
              {message}
              {link && (
                <a
                  href={link.href}
                  className="underline underline-offset-4 ml-2 hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </a>
              )}
            </p>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-3 sm:right-4 text-white/50 hover:text-white transition-colors"
              aria-label="Dismiss announcement"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
