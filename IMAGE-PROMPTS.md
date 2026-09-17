# Misuni Jewels — photography brief

Prompts for Gemini (Nano Banana / Imagen).

The goal is **photographs that look photographed** — not "AI luxury jewellery",
which has a very specific and very recognisable look. Read the next section
before generating anything; it's the difference between output you can ship and
output that will quietly tell every visitor the brand isn't real.

---

## Why generated jewellery photography usually looks fake

Six tells, in the order people notice them:

1. **Impossible light.** Perfectly symmetrical highlights on both sides, no
   single identifiable light source, no falloff. Real studio light comes from
   *somewhere* and dies off across the frame.
2. **Plastic surfaces.** Metal with no micro-scratches, skin with no pores,
   fabric with no slubs. Real 18k gold at macro distance is covered in fine
   polishing swirl.
3. **Zero imperfection.** No dust, no lint, no fingerprint on the display
   surface, every prong identical. Real product photography has a retoucher's
   *decisions* in it, not machine perfection.
4. **Physically wrong diamonds.** Rainbow glare sprayed everywhere, facets that
   don't converge on a culet, stones that glow from inside. Diamonds reflect —
   they don't emit.
5. **Dead-centre everything.** Subject centred, horizon centred, symmetrical
   composition. Photographers compose off-centre constantly.
6. **The staring model.** A flawless woman gazing past the lens into the middle
   distance. It reads as a stock library instantly.

The blocks below are written to defeat all six. **Don't trim them** — the
specificity is what's doing the work.

---

## Block A — paste into every product prompt

```
CAMERA: Shot on a Hasselblad X2D with a 120mm macro, f/11, focus-stacked.
Tripod-mounted, dead-level. Raw file, minimally retouched.

LIGHT: ONE large softbox high and to the camera-left, roughly 45 degrees,
plus a single white bounce card low on the right. The light falls off
visibly toward the right edge of the frame — the right side of the piece
is a stop darker than the left. One dominant specular highlight, not a
ring of them. Shadow beneath the piece is soft-edged but clearly
directional, falling to the lower right.

SURFACE: Warm off-white paper sweep, slightly uneven in tone, with a
faint natural texture. Not a seamless digital gradient. A few almost
invisible specks of dust on the paper.

MATERIAL REALISM: The gold shows fine polishing swirl and faint micro
-scratches under macro magnification. Prongs are hand-set and very
slightly irregular — not machine-identical. Diamonds behave optically
like real stones: facets converge cleanly on the culet, reflections are
mostly white and grey with only occasional small spectral flashes, and
the stone reads dark where it reflects the unlit side of the room.

COLOUR: Neutral-warm white balance, as if shot on daylight film.
Yellow gold is warm but not orange. Rose gold is pink-copper, NOT purple
or lilac. White gold and platinum are cool silver-grey, NOT blue.
Restrained contrast — the shadows keep detail.

GRAIN: Very fine, natural film-like grain. Not clean digital.

AVOID: CGI or 3D-render look, ray-traced perfection, rainbow lens flare,
glowing stones, symmetrical twin highlights, plastic-smooth metal,
vignetting, HDR, over-sharpening, watermark, text, logo, extra stones,
malformed or bent prongs, floating objects with no shadow.
```

## Block B — paste into every prompt with a person in it

```
CASTING: A real-looking South Asian woman, 30s, Mumbai. Ordinary
attractive, not a model composite — slight facial asymmetry, visible
skin texture, pores, fine lines at the eyes, a few flyaway hairs escaping
her bun. Natural eyebrows. Minimal makeup with skin still reading as
skin. NOT airbrushed.

DIRECTION: She is mid-action and unaware of the camera — adjusting a
clasp, glancing down, half-turning away. NOT posed facing the lens. NOT
gazing serenely into the middle distance.

FRAMING: Composed off-centre. Crop into her — it's fine to cut the top of
the head or an edge of the shoulder. Slight, natural handheld tilt.

AVOID: symmetrical beauty-shot framing, airbrushed plastic skin,
perfectly even teeth, the vacant stock-photo stare, hands with wrong
finger counts, jewellery that melts into the skin.
```

---

## 1. Hero (HIGHEST PRIORITY)

The current `hero_image.png` is doing a decent job and the redesign no longer
crops it badly — the homepage now places the photograph in its own plate rather
than putting text over it. So this is an **upgrade, not a rescue**.

**Save as:** `frontend/public/images/hero.png` — **3:4 portrait**, ≥1800×2400.

```
[BLOCK A] [BLOCK B]

A woman in a deep sage-green silk slip dress, photographed from the waist
up in a quiet Mumbai apartment in late afternoon. She is turned three
-quarters away from the lens, one hand lifted to the back of her neck as
if fastening or adjusting the clasp of her necklace. Her attention is on
what her hands are doing, not on the camera.

She wears an elaborate pear-and-round diamond collar necklace in white
gold. It catches the window light across her collarbone.

The light is a single large window out of frame to the left — warm, low,
directional, with real falloff into shadow on the right side of the
frame. Behind her, an interior in soft focus: a plastered wall, the edge
of a wooden shutter, one out-of-focus plant. Depth of field is shallow
but not artificial — the background is soft, not blurred to mush.

Portrait 3:4.
```

## 2. Category plates (six)

**Save as:** `frontend/public/images/categories/<slug>.png` — **1:1**, ≥1400×1400.
Slugs: `rings`, `necklaces`, `earrings`, `pendants`, `bracelets`, `bangles`.

Two of these appear as tall plates in the homepage mosaic, so keep the piece
comfortably inside the frame with room to crop.

```
[BLOCK A]

A single {PIECE}, photographed alone on the paper sweep, composed slightly
LEFT of centre and slightly below the midline — not dead centre. The piece
fills about 60% of the frame. Shot from a 35-degree elevated angle, not
flat-on. Square 1:1.
```

| Slug | `{PIECE}` |
|---|---|
| `rings` | round brilliant solitaire ring in 18k yellow gold, four claws, slim band, resting on its side |
| `necklaces` | diamond tennis necklace in 18k white gold, laid in a loose irregular curve, one end trailing out of frame |
| `earrings` | pair of round diamond halo studs in 18k white gold, not perfectly aligned with each other |
| `pendants` | pear-cut solitaire pendant on a fine rose gold chain, chain pooled naturally beside it |
| `bracelets` | diamond tennis bracelet in 18k white gold, relaxed into an uneven oval |
| `bangles` | slim pavé diamond bangle in 18k rose gold, resting at a slight angle |

> Note the "not perfectly aligned", "loose irregular", "uneven" instructions —
> these are deliberate. Perfect arrangement is one of the strongest AI tells.

## 3. Product photography — three per piece

Consistency across all 12 products matters far more than any single shot. The
seeded images currently mix glossy black, gold foil, teal and marble
backgrounds, which is why the grid looks restless.

**3a — On paper**
```
[BLOCK A]
{PRODUCT}, alone on the paper sweep, composed off-centre, 35-degree
elevated angle, filling ~65% of frame. Square 1:1.
```

**3b — Macro**
```
[BLOCK A]
Extreme macro of the setting on {PRODUCT}. Frame is filled by three or
four stones and the metal around them. Individual facets, the claw tips,
and the fine polishing marks on the gold are all visible. Focus falls off
sharply at the frame edges — only the central stone is critically sharp.
Square 1:1.
```

**3c — Worn**
```
[BLOCK A] [BLOCK B]
{PRODUCT} worn, photographed close. Crop tight to {the hand and wrist /
the base of the neck / the ear and jaw}. Real skin: visible texture,
faint veins, a knuckle crease, a short unpolished nail. She is mid
-movement. Daylight from one side. Background is the soft out-of-focus
interior, not a studio sweep. Square 1:1.
```

Use the product name and metal from your catalogue for `{PRODUCT}`, e.g.
*"a pavé diamond eternity band bracelet in 18k yellow gold with a box clasp"*.

## 4. Atelier

`craftsmanship.png` is the strongest image you already have — real hands, real
bench, real directional light. Keep it. If you want a companion frame:

**Save as:** `frontend/public/images/atelier-2.png` — **4:5**, ≥1600×2000.

```
[BLOCK A — but override SURFACE and LIGHT as below]

Reportage, not studio. A cluttered goldsmith's bench in a small Mumbai
workshop: a bench pin worn concave from use, scattered gravers, a tin of
polishing compound with the label rubbed off, gold dust in the tray, a
mug. An older craftsman's hands rest mid-task, holding a half-set ring.

Light is a bare workshop window plus the yellow pool of an angled desk
lamp — two sources, different colour temperatures, mixed and uncorrected.
Deep shadows in the corners of the frame.

Handheld, very slightly tilted. Shot at f/2.8 so the far end of the bench
falls out of focus. Fine grain. His face is not in frame.

Portrait 4:5.
```

## 5. WhatsApp / Open Graph share card

**Save as:** `frontend/public/images/og-card.png` — exactly **1200×630**.

```
[BLOCK A]

A diamond solitaire ring and a fine tennis necklace resting together on
the paper sweep, arranged casually rather than styled — the necklace
curls naturally, the ring sits where it was set down. Composed in the
RIGHT two-thirds of the frame.

The LEFT third is empty paper, lit slightly darker than the right, with
nothing in it. Horizontal 1.91:1. No text.
```

Place `/public/brand/lockup.png` into that empty left third afterwards, then add
the file to `openGraph.images` in `src/app/layout.tsx`.

---

## Wiring the results in

**Hero** — in `src/components/home/HeroSection.tsx`, change the `src` on the
single `<Image>` to `/images/hero.png`. The plate is already `aspect-4/5` on
phones and `aspect-3/4` from `md`, so a 3:4 source needs no art direction.

**Categories** — in `src/data/categories.ts`, replace each `image:` with its
local path, e.g. `image: "/images/categories/rings.png"`. Nothing else
references those URLs.

**Products** — upload to Supabase Storage and paste the URLs into the admin
form, one per line, in the order 3a → 3b → 3c. `next.config.ts` already allows
`*.supabase.co` storage URLs.

Once every category and product image is local or on Supabase, delete the
`lh3.googleusercontent.com` entry from `remotePatterns` in `next.config.ts`.

## One thing generation won't fix

Your catalogue prices read as US dollars converted to rupee symbols — ₹420 for
a diamond ring, ₹850 for an 18k gold bracelet, ₹14,500 for a VVS1 cuban link.
No photograph will make those look right next to the pieces.
