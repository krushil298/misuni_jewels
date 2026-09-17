import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categoryTiles } from "@/data/categories";

/**
 * Category index.
 *
 * An asymmetric mosaic rather than six identical squares: the first two
 * entries take double-height plates in the outer columns and the remaining
 * four stack between them, so the eye has somewhere to start. Each entry
 * carries its register number and count.
 *
 * Phones get a single ruled list — a six-wide grid squeezed onto 390px is
 * how you end up with thumbnails nobody can read.
 */
export function CategoryIndex() {
  const [lead, second, ...rest] = categoryTiles;

  return (
    <section className="shell pt-20 md:pt-28">
      <SectionHeader
        index="01"
        title="The collection, by form"
        note="Six families of piece. Every design can be set in any of our metals and sized to you."
        action={{ href: "/collections", label: "All pieces" }}
      />

      {/* ── Phones and tablets: ruled list with a thumbnail ─────────── */}
      <ul className="mt-10 lg:hidden">
        {categoryTiles.map((tile, i) => (
          <li key={tile.slug}>
            <Link
              href={`/collections?category=${tile.slug}`}
              className="flex items-center gap-4 border-t border-rule py-3.5"
            >
              <span className="index-num w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative size-16 shrink-0 overflow-hidden bg-surface">
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="64px"
                  priority={i < 2}
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl leading-none text-ink">
                  {tile.name}
                </h3>
                <p className="mt-1 truncate text-[0.75rem] text-ink-3">
                  {tile.blurb}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/*
        ── lg+: asymmetric mosaic ─────────────────────────────────────
        Held back to `lg` deliberately. At tablet widths the four inner
        plates fall below ~100px each and their captions stop being
        readable — the ruled list serves that range far better.
      */}
      <div className="mt-12 hidden grid-cols-12 gap-x-6 gap-y-10 lg:grid">
        <Plate tile={lead} number="01" span="col-span-4" ratio="aspect-3/4" priority />

        <div className="col-span-4 grid grid-cols-2 gap-x-6 gap-y-10 self-center">
          {rest.map((tile, i) => (
            <Plate
              key={tile.slug}
              tile={tile}
              number={String(i + 3).padStart(2, "0")}
              span=""
              ratio="aspect-square"
            />
          ))}
        </div>

        <Plate
          tile={second}
          number="02"
          span="col-span-4"
          ratio="aspect-3/4"
          priority
        />
      </div>
    </section>
  );
}

function Plate({
  tile,
  number,
  span,
  ratio,
  priority = false,
}: {
  tile: (typeof categoryTiles)[number];
  number: string;
  span: string;
  ratio: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/collections?category=${tile.slug}`}
      className={`group block ${span}`}
    >
      <div className={`relative ${ratio} overflow-hidden bg-surface`}>
        <Image
          src={tile.image}
          alt=""
          fill
          sizes="(max-width: 1280px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-2.5 flex items-baseline gap-3 border-t border-rule pt-2.5">
        <span className="index-num">{number}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl leading-none text-ink">
            {tile.name}
          </h3>
          <p className="mt-1.5 text-[0.75rem] leading-snug text-ink-3 text-pretty">
            {tile.blurb}
          </p>
        </div>
      </div>
    </Link>
  );
}
