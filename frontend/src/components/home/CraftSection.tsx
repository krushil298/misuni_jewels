import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LOCATION } from "@/lib/constants";
import { appointmentLink } from "@/lib/whatsapp";

/**
 * Atelier / craftsmanship panel.
 *
 * Replaces the old "Elevate Your Network — join the MISUNI inner circle,
 * gain exclusive access to drops and atelier events" block, which promised
 * a membership programme that doesn't exist and sat next to a stock photo
 * of a man in a jacket.
 */
export function CraftSection() {
  return (
    <section className="bg-canvas-sunk py-14 md:py-20">
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 px-5 md:grid-cols-2 md:gap-14 md:px-8 lg:gap-20 lg:px-12">
        <div className="relative aspect-4/3 overflow-hidden bg-surface md:aspect-square">
          <Image
            src="/images/craftsmanship.png"
            alt="A Misuni goldsmith setting stones at the bench"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-md">
          <p className="eyebrow mb-3">The atelier</p>
          <h2 className="font-serif text-3xl leading-[1.15] text-ink text-balance md:text-4xl lg:text-[2.75rem]">
            Set by hand, one stone at a time
          </h2>
          <p className="mt-4 font-sans text-sm font-light leading-relaxed text-ink-soft text-pretty">
            We don&apos;t hold stock in a shop window. Each piece is made after
            you choose it — your stone, your metal, your size — by goldsmiths
            we&apos;ve worked with for years. That means a little patience, and
            a piece that is genuinely yours.
          </p>

          <ul className="mt-7 space-y-3">
            {[
              "Natural diamonds with IGI or GIA certification",
              "BIS-hallmarked 14k & 18k gold and 950 platinum",
              "Resizing and bespoke commissions welcome",
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <Icon name="check" size={16} className="mt-0.5 text-brand" />
                <span className="font-sans text-[0.8125rem] font-light text-ink-soft text-pretty">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={appointmentLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sage w-full sm:w-auto"
            >
              <Icon name="whatsapp" size={16} />
              Visit us in {LOCATION.city}
            </a>
            <Link href="/about" className="btn btn-outline w-full sm:w-auto">
              Our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
