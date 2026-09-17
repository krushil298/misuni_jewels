import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Metal chooser.
 *
 * Uses the three ring photographs already in /public/images, which were
 * shot as a matched set and had never been referenced anywhere.
 */
const METALS = [
  {
    name: "Yellow Gold",
    detail: "14k & 18k · warm, classic",
    image: "/images/ring_yellow_gold.png",
    query: "Yellow Gold",
  },
  {
    name: "Rose Gold",
    detail: "14k & 18k · soft, contemporary",
    image: "/images/ring_rose_gold.png",
    query: "Rose Gold",
  },
  {
    name: "White Gold & Platinum",
    detail: "18k & 950 Pt · cool, brilliant",
    image: "/images/ring_platinum.png",
    query: "White Gold",
  },
];

export function MetalStory() {
  return (
    <section className="bg-canvas py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Made to order"
          title="Choose your metal"
          description="Every design can be set in any of our metals. Tell us which you prefer and we'll make it to your size."
          align="center"
        />

        <ul className="grid gap-6 sm:grid-cols-3 sm:gap-4 lg:gap-8">
          {METALS.map((metal) => (
            <li key={metal.name}>
              <Link
                href={`/collections?metal=${encodeURIComponent(metal.query)}`}
                className="group block"
              >
                <div className="relative mb-4 aspect-4/3 overflow-hidden bg-surface">
                  <Image
                    src={metal.image}
                    alt={`A Misuni solitaire ring in ${metal.name.toLowerCase()}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-opacity duration-200 ease-out group-hover:opacity-90"
                  />
                </div>
                <h3 className="font-serif text-xl text-ink">{metal.name}</h3>
                <p className="meta mt-1 text-[0.625rem] normal-case tracking-[0.1em]">
                  {metal.detail}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
