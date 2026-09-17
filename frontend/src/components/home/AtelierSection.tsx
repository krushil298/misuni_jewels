import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { appointmentLink } from "@/lib/whatsapp";

/**
 * Bespoke / the atelier.
 *
 * Type on the left, framed photograph on the right with a specification
 * panel beneath it. Where a competitor would run a 2x2 grid of round
 * numbers — "10+ years", "5K+ clients" — this uses facts the business can
 * evidence, because a new brand inventing a client count is the fastest way
 * to lose a serious buyer.
 */
export function AtelierSection() {
  return (
    <section id="atelier" className="bg-forest py-16 md:py-24">
      <div className="shell grid gap-14 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6 lg:col-span-5">
          <span className="eyebrow">Bespoke service</span>

          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-cream md:text-5xl">
            Design your{" "}
            <em className="font-normal italic text-gold">dream</em> jewellery
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-cream/60">
            <p>
              A retail counter means holding stock, and holding stock means
              making what sells rather than what is worth making. So we
              don&apos;t. You bring a reference, a stone, or just an idea — and
              we make it.
            </p>
            <p>
              It takes two to three weeks. In exchange you get the stone you
              chose, in the metal and size you actually wear, at a price that
              isn&apos;t carrying a showroom.
            </p>
          </div>

          <dl className="mt-9">
            {[
              ["Stones", "Natural diamonds, IGI or GIA certified above 0.30ct"],
              ["Metal", "BIS-hallmarked 14k & 18k gold, 950 platinum"],
              ["Sizing", "Set at order — resizing afterwards is complimentary"],
              ["Lead time", "Two to three weeks from confirmation"],
            ].map(([term, detail]) => (
              <div key={term} className="spec-row spec-row-dark">
                <dt className="label-sm text-gold">{term}</dt>
                <dd className="text-[0.8125rem] text-cream/65 text-pretty">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href={appointmentLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold mt-9"
          >
            <Icon name="whatsapp" size={15} />
            Start your design
          </a>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="plate-frame">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-forest-2">
              <Image
                src="/images/craftsmanship.png"
                alt="A Misuni goldsmith setting a diamond at the bench"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
