import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { appointmentLink } from "@/lib/whatsapp";

/**
 * Hero.
 *
 * Forest ground, type in the left columns, and the photograph set in a plate
 * with a gold outline offset behind it plus a badge overlapping its lower
 * corner. On phones the plate leads and the outline frame is dropped — at
 * 390px it crowds the image rather than framing it.
 */
export function HeroSection() {
  return (
    <section className="bg-forest text-cream">
      <div className="shell grid gap-14 py-12 md:grid-cols-12 md:items-center md:gap-14 md:py-20 lg:py-24">
        {/* Type */}
        <div className="order-2 md:order-1 md:col-span-6 lg:col-span-5">
          <span className="eyebrow eyebrow-ruled">Fine diamonds · Mumbai</span>

          <h1 className="mt-7 font-display text-5xl leading-[1.04] text-cream sm:text-6xl lg:text-7xl">
            Timeless beauty.
            <br />
            <em className="font-normal italic text-gold">Made for you.</em>
          </h1>

          <p className="mt-6 max-w-md font-display text-xl italic leading-snug text-cream/70">
            Crafted for those who intend to keep them.
          </p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
            We hold no stock and keep no shop floor. Every piece is made to
            order — your stone, your metal, your size — and shown to you in
            person at Bandra Kurla Complex.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#pieces" className="btn btn-gold">
              Explore the collection
            </a>
            <a
              href={appointmentLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow px-2 py-3 text-cream/75 transition-colors duration-150 hover:text-gold"
            >
              Book a viewing
              <Icon name="arrow-right" size={14} />
            </a>
          </div>
        </div>

        {/* Plate */}
        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <div className="plate-frame">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-forest-2 md:aspect-square">
              <Image
                src="/images/hero_image.png"
                alt="A Misuni diamond collar necklace worn with a sage silk gown"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[58%_16%] md:object-center"
              />
            </div>

            <div className="absolute -bottom-6 left-4 border border-gold/45 bg-forest px-6 py-4 md:-bottom-8 md:-left-8 md:px-8 md:py-5">
              <p className="font-display text-4xl leading-none text-gold">
                100%
              </p>
              <p className="label-sm mt-2 text-cream/65">
                Natural certified stones
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
