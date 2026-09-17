import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { CATEGORIES, CONTACT, LOCATION, SITE_NAME } from "@/lib/constants";
import { titleCase } from "@/lib/utils";

/**
 * Colophon.
 *
 * Set on ink so the page closes on a firm edge rather than fading out, and
 * ruled like the rest of the register. No newsletter field — there is no
 * mailing list behind it, and a form that posts nowhere is worse than none.
 */
export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-paper md:mt-28">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Logo variant="full" tone="white" height={96} />
            <p className="mt-7 max-w-xs text-[0.8125rem] leading-relaxed text-paper/60 text-pretty">
              A diamond atelier in Bandra Kurla Complex, Mumbai. Made to order,
              shown by appointment.
            </p>
          </div>

          <nav aria-label="Collection" className="md:col-span-2">
            <h2 className="label-sm text-paper/40">Collection</h2>
            <ul className="mt-5 space-y-2.5">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`/collections?category=${category}`}
                    className="text-[0.8125rem] text-paper/75 transition-colors duration-150 hover:text-paper"
                  >
                    {titleCase(category)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Atelier" className="md:col-span-2">
            <h2 className="label-sm text-paper/40">Atelier</h2>
            <ul className="mt-5 space-y-2.5">
              {[
                { href: "/about", label: "About Misuni" },
                { href: "/collections", label: "All pieces" },
                { href: "/selection", label: "My selection" },
                { href: "/contact", label: "Contact & visit" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8125rem] text-paper/75 transition-colors duration-150 hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <h2 className="label-sm text-paper/40">Visit</h2>
            <address className="mt-5 space-y-3 not-italic">
              <p className="text-[0.8125rem] leading-relaxed text-paper/75">
                {LOCATION.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="block text-[0.8125rem] tabular-nums text-paper/75 transition-colors duration-150 hover:text-paper"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block text-[0.8125rem] text-paper/75 transition-colors duration-150 hover:text-paper"
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
                className="flex size-10 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-150 hover:border-paper hover:text-paper"
              >
                <Icon name="instagram" size={16} />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Misuni Jewels on Facebook"
                className="flex size-10 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-150 hover:border-paper hover:text-paper"
              >
                <Icon name="facebook" size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-paper/15 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="label-sm text-paper/40">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
          <p className="label-sm text-paper/40">
            Purity · Integrity · Brilliance
          </p>
        </div>
      </div>
    </footer>
  );
}
