import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Metal chooser, set as a comparison row.
 *
 * Each column carries its own specification list under the plate, so this
 * reads as a spec sheet you can compare across rather than three
 * interchangeable marketing cards. Uses the three matched ring photographs
 * that were sitting unreferenced in /public/images.
 */
const METALS = [
  {
    name: "Yellow Gold",
    number: "01",
    image: "/images/ring_yellow_gold.png",
    query: "Yellow Gold",
    specs: [
      ["Purity", "14k · 18k"],
      ["Tone", "Warm, buttery"],
      ["Wears", "Softens with age"],
    ],
  },
  {
    name: "Rose Gold",
    number: "02",
    image: "/images/ring_rose_gold.png",
    query: "Rose Gold",
    specs: [
      ["Purity", "14k · 18k"],
      ["Tone", "Pink-copper"],
      ["Wears", "Hardest of the three"],
    ],
  },
  {
    name: "White Gold & Platinum",
    number: "03",
    image: "/images/ring_platinum.png",
    query: "White Gold",
    specs: [
      ["Purity", "18k · 950 Pt"],
      ["Tone", "Cool silver-white"],
      ["Wears", "Rhodium, re-plated"],
    ],
  },
];

export function MetalStory() {
  return (
    <section className="shell pt-20 md:pt-28">
      <SectionHeader
        index="03"
        title="Three metals, one design"
        note="Nothing here is fixed to a single metal. Choose the one you actually wear and we set the piece in it."
      />

      <ul className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
        {METALS.map((metal) => (
          <li key={metal.name}>
            <Link
              href={`/collections?metal=${encodeURIComponent(metal.query)}`}
              className="group block"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-surface">
                <Image
                  src={metal.image}
                  alt={`A Misuni solitaire ring in ${metal.name.toLowerCase()}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-3 flex items-baseline gap-3 border-t border-ink pt-3">
                <span className="index-num text-ink">{metal.number}</span>
                <h3 className="font-display text-2xl leading-none text-ink text-balance">
                  {metal.name}
                </h3>
              </div>

              <dl className="mt-2">
                {metal.specs.map(([term, detail]) => (
                  <div key={term} className="spec-row">
                    <dt className="label-sm text-ink-3">{term}</dt>
                    <dd className="text-[0.8125rem] text-ink-2">{detail}</dd>
                  </div>
                ))}
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
