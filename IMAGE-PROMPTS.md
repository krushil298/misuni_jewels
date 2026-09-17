# Misuni Jewels — image brief

Prompts for Gemini (Nano Banana / Imagen). Generate in the order below; the
house style block is the most important part and should be pasted into
**every** prompt so the set looks like one brand rather than twelve stock photos.

---

## The problem these solve

The 12 product photos currently in Supabase were seeded with wildly
inconsistent backgrounds — glossy black, gold foil, teal, marble, white.
On an ivory page they read as a jumble, and the eye goes to the backdrops
instead of the diamonds. Consistency matters more here than any single
image being beautiful.

---

## House style — paste into every prompt

```
STYLE: Editorial fine-jewellery photography for a luxury Mumbai atelier.
Shot on a medium-format camera, 100mm macro, f/8, focus-stacked so the
whole piece is tack sharp. Soft, large, diffused key light from the upper
left with a subtle silver fill to the right — the light that makes diamond
facets flash without blowing highlights. No harsh specular hotspots.

BACKGROUND: Warm ivory seamless (#FBFAF8) with a very soft natural shadow
beneath the piece. No props, no flowers, no fabric bunching, no gradients,
no vignette, no text, no watermark, no logo.

COLOUR: Neutral-warm white balance. Metals must read true — yellow gold
warm and buttery, rose gold pink-copper (NOT purple or lilac), white gold
and platinum cool silver-white. Diamonds are colourless with cool blue-white
fire, never yellow or grey.

MOOD: Restrained, expensive, calm. Modern and classy, not flashy.
Absolutely no hip-hop / iced-out styling.

AVOID: plastic or CGI look, over-sharpening, fake rainbow glare, visible
prongs that look bent, lopsided symmetry, extra or malformed stones,
text of any kind.
```

---

## 1. Hero — mobile (HIGHEST PRIORITY)

**Why:** `hero_image.png` is 1024×1024. Most of your visitors are on phones,
where the hero crops to roughly 9:16 — a square source means the necklace
gets cropped into the headline. A native portrait frame fixes it.

**Save as:** `frontend/public/images/hero-portrait.png` — **aspect ratio 9:16**,
at least 1440×2560.

```
[HOUSE STYLE BLOCK]

A South Asian woman in her early thirties, photographed from collarbone to
just above the hairline, three-quarter turn, chin slightly lifted, serene
and confident — not smiling at camera. She wears a sage-green silk gown with
a clean neckline.

She wears an elaborate pear-and-round diamond collar necklace in white gold —
the piece is the subject of the photograph and must sit in the UPPER THIRD
of the frame, fully visible and unobstructed.

The LOWER 45% of the frame is soft, dark, uncluttered background — a
deliberately quiet area for white headline text to sit over. Depth of field
falls off gently behind her into a muted sage-and-shadow interior.

Vertical portrait composition, 9:16.
```

> After generating, see **"Wiring in the portrait hero"** at the bottom.

## 2. Hero — desktop (optional refinement)

The existing square image already works well on desktop. Only regenerate if
you want a wider frame.

**Save as:** `frontend/public/images/hero-wide.png` — **16:9**, ≥2560×1440.
Same prompt as above, but: *"Horizontal composition, 16:9. The subject sits
in the RIGHT half of the frame; the LEFT half is quiet, softly shadowed
background for headline text."*

---

## 3. Category tiles (six images)

**Why:** `src/data/categories.ts` currently points at Google-hosted seed URLs
that can expire and don't match each other.

**Save as:** `frontend/public/images/categories/<slug>.png` — **1:1 square**,
≥1200×1200. Slugs: `rings`, `necklaces`, `earrings`, `pendants`,
`bracelets`, `bangles`.

Use the **same** framing and light for all six so the rail reads as a set.

```
[HOUSE STYLE BLOCK]

A single {PIECE} presented alone on warm ivory seamless, centred, shot
slightly from above at a 30-degree angle. The piece occupies about 65% of
the frame with generous even margins. Soft shadow directly beneath.
Square 1:1 composition.
```

Swap `{PIECE}` for:

| Slug | `{PIECE}` |
|---|---|
| `rings` | round brilliant solitaire diamond ring in 18k yellow gold, four-prong setting, slim band |
| `necklaces` | fine diamond tennis necklace in 18k white gold, laid in a soft open curve |
| `earrings` | pair of round diamond halo stud earrings in 18k white gold, side by side |
| `pendants` | single pear-cut diamond solitaire pendant on a fine rose gold chain |
| `bracelets` | diamond tennis bracelet in 18k white gold, arranged in a relaxed oval |
| `bangles` | slim pavé-set diamond bangle in 18k rose gold, standing upright |

---

## 4. Product photography — the real win

Each product wants **3 images** in this order. Consistency across all 12
products matters far more than any individual shot.

**Save as:** upload to Supabase Storage, then paste URLs into the admin form
(one per line, in this order).

**4a — Hero, on ivory**
```
[HOUSE STYLE BLOCK]
{PRODUCT DESCRIPTION} presented alone on warm ivory seamless, centred,
30-degree elevated angle, piece filling ~70% of frame. Square 1:1.
```

**4b — Macro detail**
```
[HOUSE STYLE BLOCK]
Extreme macro of the setting on {PRODUCT DESCRIPTION} — individual diamond
facets, prong work and the metal's polish clearly visible. Shallow depth of
field falling off at the edges. Warm ivory background. Square 1:1.
```

**4c — Worn, for scale**
```
[HOUSE STYLE BLOCK]
{PRODUCT DESCRIPTION} worn on a South Asian woman with warm mid-tone skin and
a neat manicure. Cropped tight to {the hand and wrist / the neck and collarbone
/ the ear and jawline}. Natural skin texture, no heavy retouching. Soft ivory
background, gently out of focus. Square 1:1.
```

For `{PRODUCT DESCRIPTION}`, use the product name and metal from your
catalogue, e.g. *"a pavé diamond eternity band bracelet in 18k yellow gold
with a box clasp"*.

---

## 5. Atelier / craftsmanship

`craftsmanship.png` already works. If you want a matching second frame for
the About page:

**Save as:** `frontend/public/images/atelier-bench.png` — **4:5 portrait**, ≥1600×2000.

```
[HOUSE STYLE BLOCK]

An Indian master goldsmith's hands setting a small diamond into a gold ring
with a fine steel graver, photographed close over a well-used wooden
jeweller's bench pin. Warm directional window light from the left. Hands
show real age and skill — weathered knuckles, short clean nails. Shallow
depth of field; the tools behind fall softly out of focus.

Face not visible. Portrait 4:5.
```

---

## 6. Open Graph / WhatsApp share card

**Why:** when someone forwards a link on WhatsApp, this is the preview.
Currently it falls back to the logo on transparency, which renders badly
on WhatsApp's dark bubbles.

**Save as:** `frontend/public/images/og-card.png` — **1.91:1**, exactly 1200×630.

```
[HOUSE STYLE BLOCK]

A diamond solitaire ring and a fine diamond tennis necklace arranged
together on warm ivory seamless, shot from directly above, composed in the
RIGHT two-thirds of the frame. The LEFT third is clean empty ivory with
nothing in it — space for a logo to be placed afterwards.

Horizontal 1.91:1 composition, no text.
```

Then place `/public/brand/lockup.png` into that empty left third, and add
the file to `openGraph.images` in `src/app/layout.tsx`.

---

## Wiring in the portrait hero

Once `hero-portrait.png` exists, open
`src/components/home/HeroSection.tsx` and replace the single `<Image>` with
an art-directed pair:

```tsx
{/* Phones — native 9:16 frame */}
<Image
  src="/images/hero-portrait.png"
  alt="A Misuni diamond collar necklace worn with a sage silk gown"
  fill priority sizes="100vw"
  className="object-cover md:hidden"
/>
{/* Tablet and up */}
<Image
  src="/images/hero_image.png"
  alt=""
  fill priority sizes="100vw"
  className="hidden object-cover object-center md:block"
/>
```

## Wiring in the category tiles

In `src/data/categories.ts`, replace each `image:` value with its local path,
e.g. `image: "/images/categories/rings.png"`. Nothing else references those
URLs. Once all six are local you can delete the `lh3.googleusercontent.com`
entry from `remotePatterns` in `next.config.ts`.
