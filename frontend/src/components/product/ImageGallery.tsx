"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

/**
 * Product imagery.
 *
 * Phones get a full-bleed swipeable rail with a position counter — the way
 * people expect to look through photos on a phone. From `lg` up it becomes
 * a main image with thumbnails. The previous version rendered a fixed main
 * image plus exactly two thumbnails, silently dropping any further images.
 */
export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="lg:col-span-7">
        <div className="flex aspect-4/5 items-center justify-center bg-surface">
          <p className="meta">Image coming soon</p>
        </div>
      </div>
    );
  }

  return (
    /*
     * `min-w-0` is load-bearing: this is a grid item, and grid items default
     * to `min-width: auto`, which makes them refuse to shrink below their
     * content's intrinsic width. Without it the full-bleed rail below widens
     * the whole column and the page scrolls sideways.
     */
    <div className="min-w-0 lg:col-span-7">
      {/* Mobile — swipeable rail */}
      <div className="relative min-w-0 lg:hidden">
        <ul
          className="snap-rail hide-scrollbar -mx-5 flex overflow-x-auto"
          onScroll={(e) => {
            const el = e.currentTarget;
            const index = Math.round(el.scrollLeft / el.clientWidth);
            if (index !== active) setActive(index);
          }}
        >
          {/*
            `w-full` rather than `w-screen`: a percentage resolves against the
            scroller, so it tracks the rail exactly. `100vw` includes the
            scrollbar gutter and overshoots by a few pixels.
          */}
          {images.map((src, i) => (
            <li key={src} className="snap-item w-full shrink-0">
              <div className="relative aspect-4/5 bg-surface">
                <Image
                  src={src}
                  alt={
                    i === 0 ? name : `${name} — view ${i + 1} of ${images.length}`
                  }
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>

        {images.length > 1 && (
          <div className="pointer-events-none absolute bottom-3 right-8 bg-ink/70 px-2.5 py-1 font-sans text-[0.625rem] tabular-nums text-white">
            {active + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Desktop — main image + thumbnails */}
      <div className="hidden lg:block">
        <div className="relative aspect-4/5 overflow-hidden bg-surface">
          <Image
            src={images[active]}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
            className="object-cover"
          />
        </div>

        {images.length > 1 && (
          <ul className="mt-3 grid grid-cols-4 gap-3">
            {images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1} of ${images.length}`}
                  aria-current={active === i}
                  className={cn(
                    "relative block aspect-square w-full overflow-hidden border bg-surface transition-colors duration-150",
                    active === i
                      ? "border-ink"
                      : "border-transparent hover:border-hairline-strong"
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="12vw"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
