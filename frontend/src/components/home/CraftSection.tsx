import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LOCATION } from "@/lib/constants";
import { appointmentLink } from "@/lib/whatsapp";

/**
 * The atelier.
 *
 * Runs full-bleed against paper-deep to break the rhythm of the ruled
 * sections above it — the page needs one place where the grid relaxes.
 * The image is offset and overlapped by the type column at desktop widths
 * so the two elements interlock rather than sitting in tidy halves.
 */
export function CraftSection() {
  return (
    <section className="mt-20 bg-paper-deep py-16 md:mt-28 md:py-24">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:gap-0">
          {/*
            Both children are placed explicitly — row AND column — so they
            can interlock. Auto-placement refuses to overlap an explicitly
            placed item: with only a row pinned, the figure could not find
            seven free columns and spilled into implicit ones off-canvas.
          */}
          <figure className="md:col-span-6 md:col-start-1 md:row-start-1">
            <div className="relative aspect-4/3 overflow-hidden bg-surface md:aspect-4/5">
              <Image
                src="/images/craftsmanship.png"
                alt="A Misuni goldsmith setting stones at the bench"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </figure>

          {/*
            Overlaps the plate by one column. `relative` is required, not
            decorative: the image sits in a positioned wrapper, so an
            unpositioned panel would be painted over by it regardless of
            DOM order.
          */}
          <div className="md:relative md:z-raised md:col-span-7 md:col-start-6 md:row-start-1 md:self-center md:bg-paper-deep md:py-12 md:pl-12 lg:pl-16">
            <div className="flex items-baseline gap-4 border-t border-ink pt-3">
              <span className="index-num text-ink">04</span>
              <span className="label text-ink-3">The atelier</span>
            </div>

            <h2 className="optical-flush mt-5 font-display text-4xl leading-[0.98] text-ink text-balance lg:text-5xl">
              No shop window,
              <br />
              <em className="italic text-sage">by design</em>
            </h2>

            <div className="mt-5 space-y-3.5 text-[0.9375rem] leading-relaxed text-ink-2 text-pretty">
              <p>
                A retail counter means holding stock, and holding stock means
                making what sells rather than what is worth making. So we
                don&apos;t. You choose a design, we source the stone, and it is
                set for you.
              </p>
              <p>
                It takes two to three weeks. In exchange you get the stone you
                chose, in the metal and size you wear, at a price that
                isn&apos;t carrying a showroom.
              </p>
            </div>

            <dl className="mt-8">
              {[
                ["Stones", "Natural diamonds, IGI or GIA certified above 0.30ct"],
                ["Metal", "BIS-hallmarked 14k & 18k gold, 950 platinum"],
                ["Sizing", "Set at order — not adjusted afterwards"],
              ].map(([term, detail]) => (
                <div key={term} className="spec-row">
                  <dt className="label-sm text-ink-3">{term}</dt>
                  <dd className="text-[0.8125rem] text-ink-2 text-pretty">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-2.5 lg:flex-row">
              <a
                href={appointmentLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sage lg:flex-none"
              >
                <Icon name="whatsapp" size={15} />
                Visit us in {LOCATION.city}
              </a>
              <Link href="/about" className="btn btn-line lg:flex-none">
                Our story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
