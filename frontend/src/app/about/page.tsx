import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { LOCATION, SITE_TAGLINE } from "@/lib/constants";
import { appointmentLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "The Atelier",
  description:
    "Misuni Jewels is a Mumbai diamond atelier in Bandra Kurla Complex. Natural certified stones, BIS-hallmarked gold, every piece made to order.",
  alternates: { canonical: "/about" },
};

/**
 * Brand story.
 *
 * Copy here is written to be defensible — it describes how the business
 * actually operates (made to order, no retail counter, viewing by
 * appointment) rather than inventing heritage the brand doesn't have.
 */
export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto w-full max-w-3xl px-5 py-14 text-center md:py-20">
        <Logo variant="mark" height={56} className="mx-auto" />
        <h1 className="mt-8 font-display text-4xl leading-tight text-ink text-balance md:text-5xl">
          {SITE_TAGLINE}
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-sans text-sm leading-relaxed text-ink-2 text-pretty md:text-base">
          Misuni Jewels is a diamond atelier in Bandra Kurla Complex, Mumbai.
          We make a small number of pieces properly, for people who intend to
          keep them.
        </p>
      </section>

      <section className="bg-paper-deep py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div className="relative aspect-4/5 overflow-hidden bg-surface">
            <Image
              src="/images/craftsmanship.png"
              alt="A goldsmith setting a diamond at the bench"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-md">
            <p className="label text-sage mb-3">How we work</p>
            <h2 className="font-display text-3xl leading-[1.15] text-ink text-balance md:text-4xl">
              No shop window, by design
            </h2>
            <div className="mt-5 space-y-4 font-sans text-sm leading-relaxed text-ink-2 text-pretty">
              <p>
                A retail counter means holding stock, and holding stock means
                making what sells rather than what&apos;s worth making. We
                don&apos;t do that. You choose a design, we source the stone,
                and it&apos;s set for you.
              </p>
              <p>
                It takes a little longer. In exchange you get the stone you
                actually chose, in the metal and size you actually wear, at a
                price that isn&apos;t carrying the cost of a showroom on Linking
                Road.
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {[
                {
                  title: "Certified natural stones",
                  body: "Every diamond above 0.30ct ships with its IGI or GIA certificate. Nothing is lab-grown unless you ask for it.",
                },
                {
                  title: "Hallmarked metal",
                  body: "BIS-hallmarked 14k and 18k gold, and 950 platinum. The stamp is on the piece, not just the invoice.",
                },
                {
                  title: "Made to your size",
                  body: "Ring sizing, chain length and bangle diameter are set when you order, not adjusted afterwards.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <Icon name="check" size={17} className="mt-0.5 text-sage" />
                  <div>
                    <p className="font-sans text-[0.8125rem] font-medium text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 font-sans text-[0.8125rem] text-ink-3 text-pretty">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-2xl px-5 py-16 text-center md:py-24">
        <p className="label text-sage mb-3">Come and see</p>
        <h2 className="font-display text-3xl text-ink text-balance md:text-4xl">
          Pieces look different in person
        </h2>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-ink-2 text-pretty">
          Photographs only go so far with diamonds. Book a viewing at{" "}
          {LOCATION.label} and see the difference light makes.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={appointmentLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sage w-full sm:w-auto"
          >
            <Icon name="whatsapp" size={16} />
            Book a viewing
          </a>
          <Link href="/collections" className="btn btn-line w-full sm:w-auto">
            Browse the collection
          </Link>
        </div>
      </section>
    </main>
  );
}
