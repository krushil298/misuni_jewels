"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { CATEGORIES } from "@/lib/constants";
import { titleCase } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (query: string) => void;
}

/**
 * Full-screen search, opened from the header.
 *
 * The panel is a separate component that only exists while `open`, so its
 * query state starts empty every time by virtue of mounting fresh. The
 * previous version kept the field mounted and cleared it from an effect,
 * which cost an extra render on every close.
 */
export function SearchOverlay({ open, onClose, onSubmit }: SearchOverlayProps) {
  return (
    <AnimatePresence>{open && <Panel onClose={onClose} onSubmit={onSubmit} />}</AnimatePresence>
  );
}

function Panel({
  onClose,
  onSubmit,
}: Pick<SearchOverlayProps, "onClose" | "onSubmit">) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Focus after the entrance transition so mobile keyboards behave.
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-modal bg-canvas pt-safe"
    >
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col px-5 pt-6 md:pt-20">
        <div className="mb-8 flex items-center justify-between">
          <p className="eyebrow">Search the collection</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="-mr-2 p-2 text-ink-muted"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        <form onSubmit={submit} className="relative">
          <Icon
            name="search"
            size={20}
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Solitaire, tennis, rose gold…"
            enterKeyHint="search"
            autoComplete="off"
            className="w-full border-b border-hairline-strong bg-transparent py-4 pl-8 pr-10 font-serif text-2xl text-ink outline-none transition-colors duration-150 placeholder:text-ink-faint focus:border-brand md:text-3xl"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-ink-faint"
            >
              <Icon name="close" size={18} />
            </button>
          )}
        </form>

        <p className="meta mb-4 mt-10">Browse by category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onSubmit(category)}
              className="border border-hairline-strong px-4 py-2.5 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-150 hover:border-brand hover:text-brand"
            >
              {titleCase(category)}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
