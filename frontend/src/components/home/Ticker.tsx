/**
 * Gold marquee between the hero and the first cream section.
 *
 * Every claim is one the business can stand behind — no invented awards, no
 * "best price guaranteed". The track holds two identical copies and shifts
 * by exactly -50%, so the loop is seamless at any viewport width. It pauses
 * on hover and is held still under `prefers-reduced-motion`.
 *
 * Marked `aria-hidden`: it is decorative repetition, and every claim in it
 * also appears as real text further down the page.
 */
const CLAIMS = [
  "Natural diamonds",
  "IGI & GIA certified",
  "BIS-hallmarked gold",
  "Made to order",
  "Bespoke commissions",
  "Complimentary resizing",
  "Shown by appointment",
  "Bandra Kurla Complex",
];

export function Ticker() {
  return (
    <div className="marquee overflow-hidden bg-gold py-3.5" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {CLAIMS.map((claim) => (
              <li
                key={claim}
                className="label-sm flex shrink-0 items-center gap-7 whitespace-nowrap px-7 text-forest"
              >
                {claim}
                <span className="text-forest/35">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
