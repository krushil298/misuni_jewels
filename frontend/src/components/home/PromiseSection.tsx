import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Why Misuni.
 *
 * Four verifiable commitments on the forest ground. Every claim here is one
 * the business can actually stand behind — no invented awards, no
 * "guaranteed lowest price", no fabricated years in business.
 */
const PROMISES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "certificate",
    title: "Certified stones",
    body: "Every diamond above 0.30ct ships with its IGI or GIA certificate. Nothing is lab-grown unless you ask for it.",
  },
  {
    icon: "diamond",
    title: "Hallmarked metal",
    body: "BIS-hallmarked 14k and 18k gold, and 950 platinum. The stamp is on the piece, not just the invoice.",
  },
  {
    icon: "calendar",
    title: "Made to order",
    body: "You choose the design, we source the stone, and it is set for you. Two to three weeks, start to finish.",
  },
  {
    icon: "pin",
    title: "Shown in person",
    body: "No shop floor and no counter. Pieces are brought to a private viewing at our BKC studio, by appointment.",
  },
];

export function PromiseSection() {
  return (
    <section className="bg-forest py-16 md:py-24">
      <div className="shell">
        <SectionHeader
          eyebrow="Why Misuni"
          title="The Misuni"
          titleItalic="promise"
          onDark
        />

        <ul className="mt-12 grid gap-px bg-rule-dark sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((promise) => (
            <li
              key={promise.title}
              className="flex flex-col items-center bg-forest px-6 py-9 text-center"
            >
              <span className="flex size-14 items-center justify-center rounded-full border border-gold/45 text-gold">
                <Icon name={promise.icon} size={22} />
              </span>
              <h3 className="mt-5 font-display text-2xl text-cream">
                {promise.title}
              </h3>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-cream/55 text-pretty">
                {promise.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
