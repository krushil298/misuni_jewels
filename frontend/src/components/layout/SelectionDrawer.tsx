"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useSelection } from "@/context/SelectionContext";
import { selectionEnquiryLink } from "@/lib/whatsapp";
import { formatPrice, titleCase } from "@/lib/utils";

interface SelectionDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * The visitor's saved selection.
 *
 * A drawer rather than a page, because the site is a single page. This
 * replaces the old cart and wishlist: nothing is sold online, so there is no
 * quantity, no price maths and no checkout. The one action is sending the
 * whole shortlist to the atelier as a single pre-written WhatsApp message —
 * a client who has saved eight pieces sends one message, not eight.
 */
export function SelectionDrawer({ open, onClose }: SelectionDrawerProps) {
  return (
    <AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>
  );
}

function Panel({ onClose }: { onClose: () => void }) {
  const { items, count, remove, clear } = useSelection();
  const [confirmClear, setConfirmClear] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => panelRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !confirmClear) onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, confirmClear]);

  const total = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        onClick={onClose}
        className="fixed inset-0 z-drawer bg-forest/70 backdrop-blur-sm"
      />

      <motion.aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Your selection"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-y-0 right-0 z-modal flex w-full max-w-md flex-col bg-cream pt-safe outline-none"
      >
        <header className="flex items-center justify-between border-b border-rule px-5 py-4">
          <div>
            <span className="label-sm text-gold">Your selection</span>
            <p className="mt-1 font-display text-2xl text-forest">
              {count} {count === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close selection"
            className="-mr-2 p-2 text-ink-2 transition-colors duration-150 hover:text-forest"
          >
            <Icon name="close" size={22} />
          </button>
        </header>

        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <Icon name="heart" size={32} className="text-ink-3" />
            <p className="mt-5 font-display text-2xl text-forest">
              Nothing saved yet
            </p>
            <p className="mt-2 text-[0.875rem] text-ink-2 text-pretty">
              Tap the heart on any piece to save it here, then send us the whole
              list on WhatsApp in one message.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-forest-line mt-7"
            >
              Browse the collection
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto overscroll-contain px-5">
              {items.map((product) => (
                <li
                  key={product.id}
                  className="flex gap-4 border-b border-rule py-4"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden bg-forest-2">
                    <Image
                      src={product.images[0] ?? "/brand/mark.png"}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="label-sm text-gold">
                      {titleCase(product.category)}
                    </span>
                    <p className="mt-1 font-display text-lg leading-tight text-forest text-pretty">
                      {product.name}
                    </p>
                    <p className="mt-0.5 text-[0.75rem] text-ink-3">
                      {product.metal}
                    </p>
                    <p className="mt-1 text-[0.8125rem] text-ink-2">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="-mr-2 -mt-2 size-11 shrink-0 self-start text-ink-3 transition-colors duration-150 hover:text-danger"
                  >
                    <Icon name="close" size={16} className="mx-auto" />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="border-t border-rule px-5 py-4 pb-safe">
              <div className="flex items-baseline justify-between">
                <span className="label-sm text-ink-3">Indicative total</span>
                <span className="text-lg text-forest">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="mt-1 text-[0.6875rem] text-ink-3">
                Final quote follows your stones, metals and sizing.
              </p>

              <a
                href={selectionEnquiryLink(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-4 w-full"
              >
                <Icon name="whatsapp" size={17} />
                Send {count} on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="mt-3 w-full py-2 text-[0.6875rem] uppercase tracking-[0.16em] text-ink-3 transition-colors duration-150 hover:text-danger"
              >
                Clear selection
              </button>
            </footer>
          </>
        )}
      </motion.aside>

      <ConfirmDialog
        open={confirmClear}
        title="Clear your selection?"
        description={`This removes all ${count} saved ${
          count === 1 ? "piece" : "pieces"
        }. It can't be undone.`}
        confirmLabel="Clear all"
        cancelLabel="Keep them"
        destructive
        onConfirm={() => {
          clear();
          setConfirmClear(false);
        }}
        onCancel={() => setConfirmClear(false)}
      />
    </>
  );
}
