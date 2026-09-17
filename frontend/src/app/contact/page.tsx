import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { CONTACT, LOCATION } from "@/lib/constants";
import { appointmentLink, generalEnquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Visit",
  description:
    "Speak to Misuni Jewels on WhatsApp, or arrange a private viewing at our Bandra Kurla Complex atelier in Mumbai.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact page.
 *
 * Deliberately has no contact form. The previous one collected five fields
 * and then discarded them — `handleSubmit` only flipped a "Message Sent!"
 * label, with no endpoint behind it, so every enquiry was silently lost.
 * WhatsApp, phone and email are real channels that reach the owner.
 */
export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-10 md:px-8 md:py-16">
      <header className="mb-10 md:mb-14">
        <p className="label text-sage mb-3">Get in touch</p>
        <h1 className="font-display text-4xl leading-tight text-ink text-balance md:text-5xl">
          Let&apos;s find your piece
        </h1>
        <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-ink-2 text-pretty">
          We don&apos;t run a retail counter — pieces are shown privately, by
          appointment, at our {LOCATION.label} studio. WhatsApp is the quickest
          way to reach us.
        </p>
      </header>

      {/* Primary channels */}
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={generalEnquiryLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between border border-rule bg-surface p-6 transition-colors duration-150 hover:border-whatsapp"
        >
          <Icon name="whatsapp" size={26} className="text-whatsapp" />
          <div className="mt-8">
            <p className="font-display text-xl text-ink">Message us</p>
            <p className="mt-1 font-sans text-[0.8125rem] text-ink-3 text-pretty">
              Questions, photos, availability — usually answered same day.
            </p>
          </div>
        </a>

        <a
          href={appointmentLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between border border-rule bg-surface p-6 transition-colors duration-150 hover:border-sage"
        >
          <Icon name="calendar" size={26} className="text-sage" />
          <div className="mt-8">
            <p className="font-display text-xl text-ink">Book a viewing</p>
            <p className="mt-1 font-sans text-[0.8125rem] text-ink-3 text-pretty">
              See pieces in person at our BKC studio, by appointment.
            </p>
          </div>
        </a>
      </div>

      {/* Details */}
      <div className="mt-12 grid gap-10 border-t border-rule pt-10 sm:grid-cols-2">
        <section>
          <h2 className="mb-5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink">
            Studio
          </h2>
          <address className="space-y-4 not-italic">
            <div className="flex gap-3">
              <Icon name="pin" size={17} className="mt-0.5 text-sage" />
              <p className="font-sans text-[0.8125rem] leading-relaxed text-ink-2">
                {LOCATION.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="mt-1 block text-ink-3">
                  By appointment only
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <Icon name="phone" size={17} className="text-sage" />
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="font-sans text-[0.8125rem] text-ink-2 transition-colors duration-150 hover:text-sage"
              >
                {CONTACT.phoneDisplay}
              </a>
            </div>

            <div className="flex gap-3">
              <Icon name="mail" size={17} className="text-sage" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-sans text-[0.8125rem] text-ink-2 transition-colors duration-150 hover:text-sage"
              >
                {CONTACT.email}
              </a>
            </div>
          </address>
        </section>

        <section>
          <h2 className="mb-5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink">
            Hours
          </h2>
          <dl className="space-y-3">
            {LOCATION.hours.map((entry) => (
              <div
                key={entry.days}
                className="flex justify-between gap-4 border-b border-rule pb-3"
              >
                <dt className="font-sans text-[0.8125rem] text-ink-2">
                  {entry.days}
                </dt>
                <dd className="font-sans text-[0.8125rem] tabular-nums text-ink">
                  {entry.time}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex gap-2">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Misuni Jewels on Instagram"
              className="flex size-11 items-center justify-center border border-rule-strong text-ink-3 transition-colors duration-150 hover:border-sage hover:text-sage"
            >
              <Icon name="instagram" size={18} />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Misuni Jewels on Facebook"
              className="flex size-11 items-center justify-center border border-rule-strong text-ink-3 transition-colors duration-150 hover:border-sage hover:text-sage"
            >
              <Icon name="facebook" size={18} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
