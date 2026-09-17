import { Icon, type IconName } from "@/components/ui/Icon";
import { ASSURANCES } from "@/lib/constants";

const ICONS: IconName[] = ["diamond", "certificate", "calendar", "pin"];

/**
 * Factual credentials, directly under the hero.
 *
 * This replaces the previous testimonials carousel, which carried five
 * invented reviewers in New York, Los Angeles, London, Dubai and Miami
 * quoting products that aren't in the catalogue. Verifiable claims about
 * certification and sourcing do the same reassurance job honestly.
 */
export function AssuranceStrip() {
  return (
    <section
      aria-label="What every piece includes"
      className="border-y border-hairline bg-surface"
    >
      <ul className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-px bg-hairline md:grid-cols-4">
        {ASSURANCES.map((item, i) => (
          <li
            key={item.title}
            className="flex flex-col items-center gap-2 bg-surface px-4 py-7 text-center md:flex-row md:gap-4 md:px-8 md:text-left"
          >
            <Icon name={ICONS[i]} size={22} className="text-brand" />
            <div>
              <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink">
                {item.title}
              </p>
              <p className="mt-1 font-sans text-[0.6875rem] font-light text-ink-muted text-pretty">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
