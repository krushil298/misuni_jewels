import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { CONTACT, LOCATION } from "@/lib/constants";
import { appointmentLink, generalEnquiryLink } from "@/lib/whatsapp";

/**
 * Visit and contact.
 *
 * Deliberately has no contact form. The original one collected five fields
 * and discarded them — its submit handler only flipped a "Message Sent!"
 * label, with no endpoint behind it, so every enquiry was silently lost.
 * WhatsApp, phone and email are channels that actually reach the owner.
 */
export function VisitSection() {
  return (
    <section id="visit" className="bg-cream py-16 md:py-24">
      <div className="shell">
        <SectionHeader
          eyebrow="Visit us"
          title="Photographs only get you"
          titleItalic="so far with a diamond"
          description="Message us the pieces you've saved and we'll have them ready for a private viewing — no obligation, no counter, no queue."
        />

        {/* Two primary channels */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          <a
            href={appointmentLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between border border-rule bg-cream-2 p-7 transition-colors duration-200 hover:border-gold"
          >
            <Icon name="calendar" size={26} className="text-gold" />
            <div className="mt-10">
              <h3 className="font-display text-2xl text-forest">
                Book a viewing
              </h3>
              <p className="mt-2 text-[0.8125rem] text-ink-2 text-pretty">
                Private appointment at our {LOCATION.label} studio.
              </p>
            </div>
          </a>

          <a
            href={generalEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between border border-rule bg-cream-2 p-7 transition-colors duration-200 hover:border-whatsapp"
          >
            <Icon name="whatsapp" size={26} className="text-whatsapp" />
            <div className="mt-10">
              <h3 className="font-display text-2xl text-forest">Message us</h3>
              <p className="mt-2 text-[0.8125rem] text-ink-2 text-pretty">
                Questions, photos, availability — usually same day.
              </p>
            </div>
          </a>
        </div>

        {/* Details */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-10 border-t border-rule pt-10 sm:grid-cols-2">
          <address className="not-italic">
            <h3 className="label-sm text-gold">The studio</h3>
            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <Icon name="pin" size={17} className="mt-0.5 text-gold" />
                <p className="text-[0.875rem] leading-relaxed text-ink-2">
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
                <Icon name="phone" size={17} className="text-gold" />
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="text-[0.875rem] text-ink-2 transition-colors duration-150 hover:text-forest"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>
              <div className="flex gap-3">
                <Icon name="mail" size={17} className="text-gold" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-all text-[0.875rem] text-ink-2 transition-colors duration-150 hover:text-forest"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </address>

          <div>
            <h3 className="label-sm text-gold">Hours</h3>
            <dl className="mt-5">
              {LOCATION.hours.map((entry) => (
                <div
                  key={entry.days}
                  className="flex justify-between gap-4 border-b border-rule py-2.5"
                >
                  <dt className="text-[0.875rem] text-ink-2">{entry.days}</dt>
                  <dd className="text-[0.875rem] text-forest">{entry.time}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex gap-2">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Misuni Jewels on Instagram"
                className="flex size-11 items-center justify-center border border-rule text-ink-3 transition-colors duration-150 hover:border-gold hover:text-gold"
              >
                <Icon name="instagram" size={18} />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Misuni Jewels on Facebook"
                className="flex size-11 items-center justify-center border border-rule text-ink-3 transition-colors duration-150 hover:border-gold hover:text-gold"
              >
                <Icon name="facebook" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
