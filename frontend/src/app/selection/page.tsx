"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useSelection } from "@/context/SelectionContext";
import { selectionEnquiryLink } from "@/lib/whatsapp";
import { formatPrice, titleCase } from "@/lib/utils";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

/**
 * The visitor's saved selection.
 *
 * Replaces the old cart and wishlist. There is no checkout — the single
 * action is sending the whole list to the atelier on WhatsApp, pre-written,
 * so a client who has shortlisted eight pieces sends one message.
 */
export default function SelectionPage() {
  const { items, count, remove, clear, isHydrated } = useSelection();
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isHydrated) {
    return (
      <main className="mx-auto w-full max-w-[1600px] px-5 py-10 md:px-8 lg:px-12">
        <ProductGridSkeleton count={4} />
      </main>
    );
  }

  if (count === 0) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-col items-center px-5 py-20 text-center md:py-28">
        <Icon name="heart" size={34} className="text-ink-4" />
        <h1 className="mt-6 font-display text-3xl text-ink">
          Your selection is empty
        </h1>
        <p className="mt-3 font-sans text-sm leading-relaxed text-ink-2 text-pretty">
          Tap the heart on any piece to save it here. When you&apos;re ready,
          send us the whole list on WhatsApp in one message.
        </p>
        <Link href="/collections" className="btn btn-ink mt-8">
          Browse the collection
        </Link>
      </main>
    );
  }

  const total = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-8 md:px-8 md:py-12">
      <header className="mb-8">
        <p className="label text-sage mb-3">Your shortlist</p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">
          My selection
        </h1>
        <p className="mt-3 font-sans text-sm text-ink-2">
          {count} {count === 1 ? "piece" : "pieces"} saved
        </p>
      </header>

      <ul className="border-t border-rule">
        {items.map((product) => (
          <li
            key={product.id}
            className="flex gap-4 border-b border-rule py-4"
          >
            <Link
              href={`/product/${product.slug}`}
              className="relative aspect-4/5 w-20 shrink-0 overflow-hidden bg-surface sm:w-24"
            >
              <Image
                src={product.images[0] ?? "/brand/mark.png"}
                alt={product.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
                <p className="label-sm text-ink-3 text-[0.5625rem]">
                  {titleCase(product.category)}
                </p>
                <Link
                  href={`/product/${product.slug}`}
                  className="mt-0.5 block font-display text-base leading-snug text-ink text-pretty"
                >
                  {product.name}
                </Link>
                <p className="mt-0.5 font-sans text-[0.6875rem] text-ink-3">
                  {product.metal}
                </p>
              </div>
              <p className="font-sans text-sm tabular-nums text-ink">
                {formatPrice(product.price)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => remove(product.id)}
              aria-label={`Remove ${product.name} from your selection`}
              className="-mr-2 -mt-2 size-11 shrink-0 self-start text-ink-4 transition-colors duration-150 hover:text-ink"
            >
              <Icon name="close" size={17} className="mx-auto" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-baseline justify-between">
        <p className="label-sm text-ink-3">Indicative total</p>
        <p className="font-sans text-lg tabular-nums text-ink">
          {formatPrice(total)}
        </p>
      </div>
      <p className="mt-1 text-right font-sans text-[0.6875rem] text-ink-3">
        Final quote depends on stone selection, metal and sizing.
      </p>

      {/* Sticky action on phones so it's reachable from any scroll position */}
      <div className="sticky bottom-16 z-raised mt-8 -mx-5 border-t border-rule bg-paper/95 px-5 py-4 backdrop-blur-md md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <a
          href={selectionEnquiryLink(items)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp w-full"
        >
          <Icon name="whatsapp" size={17} />
          Send {count} {count === 1 ? "piece" : "pieces"} on WhatsApp
        </a>

        <div className="mt-3 flex items-center justify-between">
          <Link
            href="/collections"
            className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ink-3 transition-colors duration-150 hover:text-ink"
          >
            Keep browsing
          </Link>
          <button
            type="button"
            onClick={() => setConfirmClear(true)}
            className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ink-4 transition-colors duration-150 hover:text-danger"
          >
            Clear all
          </button>
        </div>
      </div>

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
    </main>
  );
}
