import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { CONTACT, LOCATION } from "@/lib/constants";
import { appointmentLink } from "@/lib/whatsapp";

/**
 * Closing invitation.
 *
 * The old homepage ended on a product grid, which leaves a visitor with
 * nowhere to go. This closes on the one action that matters for a
 * catalogue with no checkout, and states plainly how the appointment works
 * rather than implying a storefront.
 */
export function ClosingPanel() {
  return (
    <section className="shell pt-20 md:pt-28">
      <div className="border-t border-ink pt-3">
        <div className="flex items-baseline justify-between">
          <span className="index-num text-ink">05</span>
          <span className="label text-ink-3">{LOCATION.label}</span>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-12 md:gap-10 md:pt-16">
          <div className="md:col-span-7">
            <h2 className="optical-flush font-display text-4xl leading-[0.98] text-ink text-balance md:text-5xl lg:text-6xl">
              Photographs only get
              <br />
              you so far with
              <br />
              <em className="italic text-sage">a diamond</em>
            </h2>

            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-ink-2 text-pretty">
              Message us the pieces you&apos;ve saved and we&apos;ll bring them
              to a viewing — no obligation, no counter, no queue.
            </p>

            <div className="mt-9 flex flex-col gap-2.5 lg:flex-row">
              <a
                href={appointmentLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sage lg:flex-none"
              >
                <Icon name="whatsapp" size={15} />
                Book a viewing
              </a>
              <Link
                href="/collections"
                className="btn btn-line lg:flex-none"
              >
                Browse the register
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Logo variant="mark" height={38} />
            <dl className="mt-7">
              {[
                ["Where", LOCATION.lines.join(", ")],
                ["Hours", LOCATION.hours[0].time],
                ["Phone", CONTACT.phoneDisplay],
                ["Email", CONTACT.email],
              ].map(([term, detail]) => (
                <div key={term} className="spec-row">
                  <dt className="label-sm text-ink-3">{term}</dt>
                  <dd className="text-[0.8125rem] text-ink-2 text-pretty">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
