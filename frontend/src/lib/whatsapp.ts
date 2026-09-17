import { CONTACT } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

/** Build a wa.me deep link with a pre-filled message. */
function link(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** General "get in touch" link used by the floating button and nav. */
export function generalEnquiryLink(): string {
  return link(
    `Hello MISUNI JEWELS — I'd like to know more about your collection.`
  );
}

/** Enquiry about one piece, including the options the visitor picked. */
export function productEnquiryLink(
  product: Product,
  opts: { metal?: string; size?: string } = {}
): string {
  const spec = [opts.metal ?? product.metal, opts.size && `Size ${opts.size}`]
    .filter(Boolean)
    .join(", ");

  return link(
    `Hello MISUNI JEWELS — I'm interested in this piece.\n\n` +
      `${product.name}\n` +
      `${spec}\n` +
      `${formatPrice(product.price)}\n` +
      `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://misunijewels.com"}/product/${product.slug}\n\n` +
      `Could you share availability and details?`
  );
}

/**
 * Enquiry covering an entire saved selection, so a client who has browsed
 * twenty pieces sends one message instead of twenty.
 */
export function selectionEnquiryLink(products: Product[]): string {
  if (products.length === 0) return generalEnquiryLink();

  const lines = products
    .map(
      (p, i) =>
        `${i + 1}. ${p.name} — ${p.metal} — ${formatPrice(p.price)}`
    )
    .join("\n");

  return link(
    `Hello MISUNI JEWELS — I'd like to enquire about ${products.length} ` +
      `${products.length === 1 ? "piece" : "pieces"} from your collection:\n\n` +
      `${lines}\n\n` +
      `Could you share availability and arrange a viewing?`
  );
}

/** Link for booking a viewing at the BKC atelier. */
export function appointmentLink(): string {
  return link(
    `Hello MISUNI JEWELS — I'd like to book a viewing at your BKC atelier. ` +
      `Could you share available times?`
  );
}
