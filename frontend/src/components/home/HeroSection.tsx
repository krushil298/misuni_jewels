import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { appointmentLink } from "@/lib/whatsapp";

/**
 * Homepage hero.
 *
 * Uses the local brand photograph rather than the previous hotlinked
 * Unsplash URL — that was an uncached third-party request in the critical
 * path, and the stock image had nothing to do with the collection.
 *
 * Sized in dvh so mobile browser chrome collapsing doesn't clip the CTAs.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[88dvh] w-full items-end overflow-hidden md:min-h-[92dvh] md:items-center">
      <div className="absolute inset-0">
        <Image
          src="/images/hero_image.png"
          alt="A Misuni diamond necklace worn with an emerald silk gown"
          fill
          priority
          sizes="100vw"
          /*
           * Biased upward on phones so the necklace sits above the headline
           * rather than behind it — the piece is the point of the photograph.
           */
          className="object-cover object-[58%_22%] md:object-center"
        />
        {/*
          Two stacked scrims: a strong one at the foot for text legibility on
          phones, and a gentle side wash so the desktop copy column reads
          without dulling the jewellery itself.
        */}
        <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/30 to-ink/10 md:from-ink/70 md:via-ink/20 md:to-transparent" />
        <div className="absolute inset-0 hidden bg-linear-to-r from-ink/60 via-transparent to-transparent md:block" />
      </div>

      <div className="relative z-raised mx-auto w-full max-w-[1600px] px-5 pb-16 pt-28 md:px-8 md:py-24 lg:px-12">
        <div className="max-w-xl">
          <p className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.32em] text-white/80">
            Bandra Kurla Complex · Mumbai
          </p>

          <h1 className="mt-5 font-serif text-[2.75rem] leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl">
            Diamonds worth
            <span className="block italic text-sage-200">keeping</span>
          </h1>

          <p className="mt-5 max-w-md font-sans text-sm font-light leading-relaxed text-white/85 text-pretty md:text-base">
            Natural, certified stones set in 14k and 18k gold. Every piece is
            made to order and shown to you in person — or over WhatsApp,
            wherever you are.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/collections" className="btn btn-sage w-full sm:w-auto">
              View the collection
            </Link>
            <a
              href={appointmentLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full border border-white/40 text-white transition-colors duration-150 hover:bg-white hover:text-ink sm:w-auto"
            >
              <Icon name="whatsapp" size={16} />
              Book a viewing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
