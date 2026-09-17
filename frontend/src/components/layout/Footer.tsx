import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { CATEGORIES, CONTACT, LOCATION, SITE_NAME } from "@/lib/constants";
import { appointmentLink } from "@/lib/whatsapp";
import { titleCase } from "@/lib/utils";

/**
 * Site footer.
 *
 * The newsletter signup that used to live here was removed — it posted
 * nowhere and there is no mailing list behind it. A viewing request is the
 * action that actually matters for a catalogue with no checkout.
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas-sunk">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5 lg:col-span-4">
            <Logo variant="full" height={92} />
            <p className="mt-6 max-w-xs font-sans text-[0.8125rem] font-light leading-relaxed text-ink-soft text-pretty">
              Natural diamonds, set in 14k and 18k gold, white gold, rose gold
              and platinum. Shown by appointment at our {LOCATION.label}{" "}
              atelier.
            </p>

            <div className="mt-6 flex gap-2">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Misuni Jewels on Instagram"
                className="flex size-10 items-center justify-center border border-hairline-strong text-ink-muted transition-colors duration-150 hover:border-brand hover:text-brand"
              >
                <Icon name="instagram" size={17} />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Misuni Jewels on Facebook"
                className="flex size-10 items-center justify-center border border-hairline-strong text-ink-muted transition-colors duration-150 hover:border-brand hover:text-brand"
              >
                <Icon name="facebook" size={17} />
              </a>
            </div>
          </div>

          {/* Collection */}
          <nav aria-label="Collection" className="md:col-span-3 lg:col-span-2">
            <h2 className="mb-5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink">
              Collection
            </h2>
            <ul className="space-y-3">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`/collections?category=${category}`}
                    className="font-sans text-[0.75rem] font-light text-ink-soft transition-colors duration-150 hover:text-brand"
                  >
                    {titleCase(category)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Atelier */}
          <nav aria-label="Atelier" className="md:col-span-4 lg:col-span-2">
            <h2 className="mb-5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink">
              Atelier
            </h2>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Misuni" },
                { href: "/collections", label: "All Pieces" },
                { href: "/selection", label: "My Selection" },
                { href: "/contact", label: "Contact & Visit" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-[0.75rem] font-light text-ink-soft transition-colors duration-150 hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div className="md:col-span-5 lg:col-span-4">
            <h2 className="mb-5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink">
              Visit
            </h2>

            <address className="space-y-3 not-italic">
              <div className="flex gap-3">
                <Icon name="pin" size={16} className="mt-0.5 text-brand" />
                <p className="font-sans text-[0.75rem] font-light leading-relaxed text-ink-soft">
                  {LOCATION.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex gap-3">
                <Icon name="phone" size={16} className="text-brand" />
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="font-sans text-[0.75rem] font-light text-ink-soft transition-colors duration-150 hover:text-brand"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>
              <div className="flex gap-3">
                <Icon name="mail" size={16} className="text-brand" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-sans text-[0.75rem] font-light text-ink-soft transition-colors duration-150 hover:text-brand"
                >
                  {CONTACT.email}
                </a>
              </div>
            </address>

            <a
              href={appointmentLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sage mt-6 w-full sm:w-auto"
            >
              <Icon name="whatsapp" size={16} />
              Book a viewing
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-hairline pt-7 sm:flex-row sm:justify-between">
          <p className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-ink-faint">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
          <p className="font-sans text-[0.625rem] uppercase tracking-[0.24em] text-ink-faint">
            Purity · Integrity · Brilliance
          </p>
        </div>
      </div>
    </footer>
  );
}
