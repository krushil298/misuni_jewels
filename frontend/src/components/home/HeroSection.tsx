import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { appointmentLink } from "@/lib/whatsapp";

/**
 * Homepage opening.
 *
 * Type-led rather than photo-led: the headline sits on paper in the left
 * columns and the photograph occupies a tall offset plate on the right,
 * with a specification strip ruled beneath. The previous full-bleed image
 * with a gradient scrim and two centred buttons is the default template for
 * this kind of site — and it forced a dark scrim over the jewellery, which
 * is the one thing the picture exists to show.
 *
 * On phones the order inverts: plate first, then type, so the piece is the
 * first thing seen without any overlay fighting it.
 */
export function HeroSection() {
  return (
    <section className="shell pt-6 md:pt-10">
      {/* Masthead rule */}
      <div className="flex items-baseline justify-between border-t border-ink pt-3">
        <p className="label text-ink">Misuni Jewels</p>
        <p className="label text-ink-3">Est. Mumbai</p>
      </div>

      <div className="grid gap-8 pt-8 md:grid-cols-12 md:gap-10 md:pt-14">
        {/* Type column */}
        <div className="order-2 flex flex-col md:order-1 md:col-span-6 lg:col-span-5">
          <h1 className="optical-flush font-display text-[3.5rem] leading-[0.92] tracking-[-0.02em] text-ink sm:text-7xl lg:text-[5.5rem]">
            A register of
            <br />
            diamonds
            <br />
            <em className="italic text-sage">worth keeping</em>
          </h1>

          <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2 text-pretty">
            We hold no stock and keep no shop floor. Each piece in this index
            is made to order — your stone, your metal, your size — and shown to
            you in person at Bandra Kurla Complex.
          </p>

          {/*
            Stacked until `lg`: from `md` the type column is only six of
            twelve tracks, and two side-by-side buttons overflow it at
            tablet widths.
          */}
          <div className="mt-9 flex flex-col gap-2.5 lg:flex-row">
            <Link href="/collections" className="btn btn-ink lg:flex-none">
              View the register
            </Link>
            <a
              href={appointmentLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line lg:flex-none"
            >
              <Icon name="whatsapp" size={15} />
              Book a viewing
            </a>
          </div>

          {/* Specification strip — ledger detail, and all of it verifiable */}
          <dl className="mt-12 md:mt-14">
            {[
              ["Stones", "Natural, IGI / GIA certified"],
              ["Metal", "BIS-hallmarked 14k · 18k · 950 Pt"],
              ["Made", "To order, 2–3 weeks"],
              ["Shown", "By appointment, BKC Mumbai"],
            ].map(([term, detail]) => (
              <div key={term} className="spec-row">
                <dt className="label-sm text-ink-3">{term}</dt>
                <dd className="text-[0.8125rem] text-ink-2 text-pretty">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Image plate — offset, and taller than it is wide */}
        <figure className="order-1 md:order-2 md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-4/5 w-full overflow-hidden bg-surface md:aspect-3/4">
            <Image
              src="/images/hero_image.png"
              alt="A Misuni diamond collar necklace worn with a sage silk gown"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[58%_18%] md:object-center"
            />
          </div>
          <figcaption className="mt-2.5 flex items-baseline justify-between border-t border-rule pt-2.5">
            <span className="label-sm text-ink-3">Pear &amp; round collar</span>
            <span className="label-sm text-ink-4">18k White Gold</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
