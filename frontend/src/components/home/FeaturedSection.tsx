import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/data/api";
import { formatPrice, referenceCode, titleCase } from "@/lib/utils";

/**
 * Most-requested pieces.
 *
 * One piece is given a large plate and full specifications; the rest run
 * beside it as a ruled index with reference codes. A flat row of four
 * equal tiles states that nothing is more important than anything else,
 * which is both untrue and visually inert.
 *
 * Falls back to the newest arrivals when nothing is flagged, so the
 * section is never an empty hole.
 */
export async function FeaturedSection() {
  const products = await getProducts();
  if (products.length === 0) return null;

  const bestsellers = products.filter((p) => p.isBestseller);
  const pool = bestsellers.length >= 5 ? bestsellers : products;
  const [lead, ...others] = pool;
  const index = others.slice(0, 5);
  const grid = pool.slice(0, 4);

  return (
    <section className="shell pt-20 md:pt-28">
      <SectionHeader
        index="02"
        title="Most requested"
        note="The pieces clients ask to see first. Prices are indicative — the final quote follows your stone and sizing."
        action={{ href: "/collections", label: "View all" }}
      />

      {/* ── md+: lead plate + ruled index ───────────────────────────── */}
      <div className="mt-12 hidden grid-cols-12 gap-10 md:grid">
        <Link
          href={`/product/${lead.slug}`}
          className="group col-span-7 block lg:col-span-6"
        >
          <div className="relative aspect-4/5 overflow-hidden bg-surface">
            <Image
              src={lead.images[0] ?? "/brand/mark.png"}
              alt={lead.name}
              fill
              priority
              sizes="(max-width: 1024px) 58vw, 50vw"
              className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.01]"
            />
          </div>

          <div className="mt-3 flex items-baseline gap-4 border-t border-ink pt-3">
            <span className="index-num text-ink">
              {referenceCode(lead.slug)}
            </span>
            <h3 className="flex-1 font-display text-3xl leading-none text-ink">
              {lead.name}
            </h3>
            <span className="label text-ink tabular-nums">
              {formatPrice(lead.price)}
            </span>
          </div>
          <p className="mt-2 max-w-md text-[0.8125rem] leading-relaxed text-ink-2 text-pretty">
            {lead.description}
          </p>
        </Link>

        <ol className="col-span-5 self-start lg:col-span-5 lg:col-start-8">
          {index.map((product) => (
            <li key={product.id}>
              <Link
                href={`/product/${product.slug}`}
                className="group flex items-center gap-4 border-t border-rule py-4 transition-colors duration-150 hover:border-ink"
              >
                <span className="index-num w-10 shrink-0">
                  {referenceCode(product.slug)}
                </span>
                <div className="relative size-14 shrink-0 overflow-hidden bg-surface">
                  <Image
                    src={product.images[0] ?? "/brand/mark.png"}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-xl leading-tight text-ink">
                    {product.name}
                  </h3>
                  <p className="label-sm mt-1 text-ink-3">
                    {titleCase(product.category)} · {product.metal}
                  </p>
                </div>
                <span className="label shrink-0 text-ink-2 tabular-nums">
                  {formatPrice(product.price)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Phones: two-up grid ─────────────────────────────────────── */}
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 md:hidden">
        {grid.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
