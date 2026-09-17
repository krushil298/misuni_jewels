import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categoryTiles } from "@/data/categories";

/**
 * Category browser.
 *
 * A native scroll-snap rail on phones, a grid from `md` up. This replaces a
 * hand-rolled carousel that tracked `translateX` against a measured item
 * width, triplicated its items to fake an infinite loop, and offered only a
 * hover-revealed right arrow — unusable on touch. Native overflow scrolling
 * gets momentum, accessibility and keyboard support for free.
 */
export function CategoryRail() {
  return (
    <section className="bg-canvas py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Explore"
          title="Shop by category"
          action={{ href: "/collections", label: "All pieces" }}
        />
      </div>

      <ul className="snap-rail hide-scrollbar flex gap-3 overflow-x-auto px-5 pb-2 md:mx-auto md:max-w-[1600px] md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8 lg:grid-cols-6 lg:px-12">
        {categoryTiles.map((tile, i) => (
          <li
            key={tile.slug}
            className="snap-item w-[44vw] shrink-0 sm:w-[30vw] md:w-auto"
          >
            <Link href={`/collections?category=${tile.slug}`} className="group block">
              <div className="relative mb-3 aspect-square overflow-hidden bg-surface">
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 16vw"
                  priority={i < 3}
                  className="object-cover transition-opacity duration-200 ease-out group-hover:opacity-90"
                />
              </div>
              <h3 className="font-serif text-lg leading-tight text-ink">
                {tile.name}
              </h3>
              <p className="mt-0.5 font-sans text-[0.6875rem] font-light leading-snug text-ink-muted text-pretty">
                {tile.blurb}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
