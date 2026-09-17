import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { SECTIONS } from "@/lib/sections";
import { CONTACT, LOCATION, SITE_NAME } from "@/lib/constants";
import { appointmentLink } from "@/lib/whatsapp";

/**
 * Colophon.
 *
 * No newsletter field — there is no mailing list behind it, and a form that
 * posts nowhere is worse than no form at all.
 */
export function Footer() {
  return (
    <footer className="border-t border-rule-dark bg-forest text-cream">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="full" tone="gold" height={104} />
            <p className="mt-7 max-w-xs text-[0.8125rem] leading-relaxed text-cream/55 text-pretty">
              A diamond atelier in {LOCATION.label}, {LOCATION.city}. Every
              piece made to order and shown by appointment.
            </p>
          </div>

          <nav aria-label="Sections" className="md:col-span-3">
            <h2 className="label-sm text-gold">Explore</h2>
            <ul className="mt-5 space-y-3">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-[0.8125rem] text-cream/70 transition-colors duration-150 hover:text-cream"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="label-sm text-gold">Visit</h2>
            <address className="mt-5 space-y-3 not-italic">
              <p className="text-[0.8125rem] leading-relaxed text-cream/70">
                {LOCATION.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="block text-[0.8125rem] text-cream/70 transition-colors duration-150 hover:text-cream"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block break-all text-[0.8125rem] text-cream/70 transition-colors duration-150 hover:text-cream"
              >
                {CONTACT.email}
              </a>
            </address>

            <div className="mt-6 flex gap-2">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Misuni Jewels on Instagram"
                className="flex size-10 items-center justify-center border border-rule-dark text-cream/65 transition-colors duration-150 hover:border-gold hover:text-gold"
              >
                <Icon name="instagram" size={16} />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Misuni Jewels on Facebook"
                className="flex size-10 items-center justify-center border border-rule-dark text-cream/65 transition-colors duration-150 hover:border-gold hover:text-gold"
              >
                <Icon name="facebook" size={16} />
              </a>
              <a
                href={appointmentLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex size-10 items-center justify-center border border-rule-dark text-cream/65 transition-colors duration-150 hover:border-gold hover:text-gold"
              >
                <Icon name="whatsapp" size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-rule-dark pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="label-sm text-cream/35">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
          <p className="label-sm text-cream/35">
            Purity · Integrity · Brilliance
          </p>
        </div>
      </div>
    </footer>
  );
}
