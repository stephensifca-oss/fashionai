# Gabarits de prompts — version ChatGPT

Règles communes à tous les gabarits :
- Le prompt passé à l'outil d'image est le gabarit complet, rempli, en anglais.
- **Première ligne sans référence :** `Text-to-image: use NO image from this conversation as a reference. Generate the picture directly from the description below.`
- **Première ligne avec références :** `Use ONLY the reference images listed below, in this order. Ignore every other image in this conversation.` puis une ligne IMAGE par image réellement jointe (rôle, ce qu'on en prend, ce qu'on n'en prend pas), puis `The written description below always wins over any reference.`
- Formats : `square 1:1`, `landscape 3:2`, `portrait 2:3`. Jamais 16:9.
- Toujours terminer par la ligne NO TEXT du gabarit.
- Les crochets [ ] sont à remplir ; ne laisse jamais un crochet dans le prompt envoyé.

---

## Moodboard (étape 1b) — 1:1

```
Text-to-image: use NO image from this conversation as a reference. Generate the picture directly from the description below.

OUTPUT: ONE image, square 1:1, a designer's mood board: a clean grid of 9 rectangular photographs on a plain [hex] background, thin even white gutters, no overlap, no tape, no pins, no desk.
CONTENT — one subject per tile, all photographic: 1 [...] 2 [...] 3 [...] 4 [...] 5 [...] 6 [...] 7 [...] 8 [...] 9 [...]
Mix: architecture or place, material close-ups, one light study, one texture macro, one object. NO complete outfit.
COLOR DISCIPLINE: every tile stays within this palette — [hex + names]. No other dominant color.
STYLE: real photography, natural light, coherent grading. NOT illustration, NOT 3D render, NOT collage art.
NO TEXT anywhere: no captions, no labels, no color codes, no logo, no watermark.
```

## Planche kit (étape 1d bis) — 1:1

```
[Sans photo de tissu : Text-to-image: use NO image from this conversation as a reference. Generate the picture directly from the description below.]
[Avec photo de tissu jointe : Use ONLY the reference images listed below, in this order. Ignore every other image in this conversation.
IMAGE 1 — PRINT: a photo of the real printed fabric I1. Reproduce its exact motif, colors and relative size in the print area below; ignore its folds and lighting.
The written description below always wins over any reference.]

OUTPUT: ONE image, square 1:1, a clean 3×3 grid on a plain [hex] background, thin even white gutters, identical cell size, no text anywhere.
PRINT AREA — [cells 1, 2, 4 and 5 merged into one large top-left square / cell 1 / cells 1 and 2]: [I1: motif, orientation, colors + hex, background hex, real motif size in cm], shown as a perfectly flat, straight, evenly lit fabric swatch seen from directly above, covering about [X × X] cm of fabric, no folds, no shadows, no perspective. Matte flat print, the weave faintly visible.
CELL [n]: real macro photograph — [ADN element or variant: construction, dimensions in cm, count, edge finish, attachments, host material + hex, insert material + hex], covering about [X] cm of garment.
CELL [n]: [...]
CELL [n]: real macro photograph of plain [material + hex], [grain, thickness], covering about 10 cm, no seam, no detail.
In every photographic cell: visible fabric grain, individual stitches, real edge thickness, soft even daylight. Only [metal] is metallic; all fabrics are matte.
NOT a 3D render, NOT illustration. NO TEXT, no numbers, no labels, no logo.
```

**Case seule (après deux échecs)** — 1:1 :
```
Text-to-image: use NO image from this conversation as a reference. Generate the picture directly from the description below.
OUTPUT: ONE square 1:1 real macro photograph on a plain [hex] background — [contenu de la case, tel que dans la planche].
[Attributs de rendu.] NOT a 3D render. NO TEXT, no labels, no logo.
```

**Imprimé à plat, secours** — 1:1 (photo du tissu jointe) :
```
Use ONLY the reference images listed below, in this order. Ignore every other image in this conversation.
IMAGE 1 — a photo of a real printed fabric. Reproduce this exact print as a flat, straight, evenly lit square swatch.
KEEP IDENTICAL: motifs, shapes, spacing, colors and relative size. Do not redesign, simplify or add motifs.
OUTPUT: one square 1:1 image, the fabric seen perfectly flat from directly above, filling the frame, no folds, no shadows, no perspective, no border, no text.
```

## Planche muse (étape 1e, sur demande explicite seulement) — 3:2

```
Text-to-image: use NO image from this conversation as a reference. Generate the picture directly from the description below.

OUTPUT: ONE photorealistic character reference sheet, landscape 3:2, plain light neutral grey #E6E6E4 seamless background, soft even shadowless studio light. LEFT 60 %: three full-body views of the same woman, head to bare feet, same scale, feet on one floor line — FRONT, PROFILE facing the right side of the image, BACK. RIGHT 40 %: top row, three head-and-shoulders views — front, profile, back; bottom, one large tight portrait, front.
MODEL: [Fiche Muse]. Neutral expression, standing straight, arms relaxed at her sides.
WARDROBE: a plain black fitted sleeveless crew-neck crop top and plain black high-waisted fitted shorts, no logo. No jewelry.
Real photography: natural skin with pores and texture, individual hair strands. NOT 3D, NOT CGI, no airbrushed skin. No text, no labels, no watermark.
```

## Bloc Décor (étape 1f) — texte recopié dans chaque prompt de look

```
SETTING: [lieu : architecture, matériaux + hex, sol, plans de profondeur, végétation, ce qu'on voit derrière la muse].
LIGHT: [direction en convention image, qualité, heure]; [ombres : forme, direction, sur quoi elles tombent].
GRADING: [étalonnage, contraste].
COLOR RULE: garment colors stay true to their hex codes; the warm light never shifts a garment hue — [couleur clé] stays [couleur clé], never [dérive attendue].
```

## Bloc Accessoire (étape 1g)

```
A1 [nom]: [forme], [matière et finition], [couleur + hex], [dimensions en cm], [détails], [ce qu'il n'est PAS : no metal hardware, no logo…] — how it is carried/worn: [main, épaule, pieds].
```

## Line-up 2D (étape 2b) — 3:2, 5 looks au plus par bande

```
Text-to-image: use NO image from this conversation as a reference. Generate the picture directly from the description below.

OUTPUT: ONE image, landscape 3:2, a flat fashion line-up: [N] full-body female figures standing side by side on a plain [hex] background, evenly spaced, identical height, feet on the same floor line, none overlapping, none cropped. BAND [n] OF [total].
SCALE LOCK: each figure is exactly 78 % of the image height, feet on a floor line at 12 % from the bottom edge (leave this bottom strip empty).
STYLE: clean flat fashion illustration — flat color zones with thin even dark outlines, prints shown as simplified flat motifs in their real colors, signature details drawn as simple flat shapes. Faceless oval heads, simple hair shape, no shading, no texture, no background scenery.
PROPORTIONS: realistic, about 8 heads tall. NOT elongated fashion-illustration proportions.
POSE: all figures straight and identical, arms slightly away from the body.
[RÈGLES D'OUVERTURE si besoin, ex. PLEAT RULE: every pleat is closed at rest; print only in the lower third, never above knee level; printed area under 10 % of each garment.]
LOOKS from the LEFT SIDE OF THE IMAGE to the RIGHT:
1. [L1 — silhouette en 15 mots, couleurs hex, zones d'imprimé, élément ADN, comptage et position]
2. [...]
NO TEXT, no numbers, no labels, no logo.
```

## Dessin à plat — paire (étape 3c) — 3:2

```
Text-to-image: use NO image from this conversation as a reference. Generate the picture directly from the description below.

OUTPUT: ONE image, landscape 3:2, a flat technical fashion drawing sheet of TWO different outfits, each shown twice, four figures in one row on a plain pure white #FFFFFF background, same scale, feet on the same floor line: from the LEFT SIDE OF THE IMAGE to the RIGHT — figure 1: OUTFIT A FRONT; figure 2: OUTFIT A BACK; a wider empty gap exactly at the horizontal center of the image; figure 3: OUTFIT B FRONT; figure 4: OUTFIT B BACK. Each outfit occupies exactly one half of the image. The garments are drawn flat on faint pale-grey #D9D7D3 faceless figure outlines, about 8 heads tall, standing straight and symmetrical, arms a few centimetres clear of the body; each figure is 80 % of the image height.
STYLE: flat color zones with a thin even black #16110F outline; thin black lines for seams and darts; thin dashed lines for topstitching; printed zones filled with a simplified flat version of the print in its real colors and approximate scale. No shading, no gradient, no photographic texture. A technical drawing, NOT a photograph.

OUTFIT A (left half):
GARMENT — zone by zone: [zone: shape, position anchored in cm and body landmarks, color hex, print I1 or solid, exact counts]
ADN ELEMENTS: [element + variant, simple flat shape, exact position, size and count; opening rule]
SEAMS: [main construction seams]
CLOSURE — technical marking: a bright blue #1E6FD9 dashed line [start, end, length], with a small solid blue pull tab; it appears ONLY in the [FRONT / BACK] view of outfit A.
WHAT EACH VIEW SHOWS — FRONT: [...] · BACK: [surfaces continues et coutures ; ne jamais nommer un élément absent]

OUTFIT B (right half):
[même structure]

The two outfits never share or swap any element: each detail belongs only to its own outfit.
ACCESSORIES: not drawn.
NO TEXT, no numbers, no arrows, no labels, no logo.
```

## Dessin à plat — look seul (look impair ou redessin) — 3:2

Même gabarit avec une seule tenue : « two figures in one row, FRONT on the LEFT half, BACK on the RIGHT half, each figure 80 % of the image height ».
*Dessin au trait noir pour l'atelier, sur demande : même gabarit, noir seul, zones imprimées laissées blanches, sans figure.*

## Prototype porté (étape 4) — 3:2

```
Use ONLY the reference images listed below, in this order. Ignore every other image in this conversation.
IMAGE 1 — SHAPE: a flat two-view technical drawing of the outfit, FRONT left, BACK right. Use the FRONT view for panel A and the BACK view for panel B: proportions, lengths, volumes and the exact placement of every zone, seam, signature element and the closure. Ignore its flat drawing style, its flat colors and the grey figure. Its blue dashed line is only a technical marking: build a real, discreet closure at that place, never a blue line.
IMAGE 2 — PRINT: the original fabric. Use it for motif, colors and motif scale only; ignore folds and lighting.
IMAGE 3 — DETAILS: macro swatches of this outfit's signature elements and materials. Copy how each element is BUILT (shape, count, edges, stitching, attachments, relief) and each material's grain, thickness and sheen; the close-ups in column C follow these swatches. Do NOT copy their colors: garment colors come from the hex codes below.
IMAGE 4 — MUSE: the model. Keep her identity exactly: face, skin tone, [signes distinctifs], body shape, height. Ignore her plain base outfit, the grey background and the studio light. [Her hair is styled as described below, not as in this image.]
[IMAGE 5 — STYLE: the approved founding prototype of the same collection — match its layout, setting, light, shadows, grading, camera, framing, scale and model rendering exactly; do NOT copy its outfit.]
The written description below always wins over any reference.

OUTPUT: ONE image, landscape 3:2, three columns separated by thin even white gutters, no text anywhere:
PANEL A (left, 35 % of the width, full height): one photorealistic editorial fashion photograph of the model seen from the FRONT, full body from the top of the head to the soles of the shoes, nothing cropped, her feet and the floor visible in the lowest 8 % of the panel, she fills about 80 % of the panel height.
PANEL B (center, 35 % of the width, full height): the SAME model in the SAME outfit, place and light, seen strictly from BEHIND, full body from head to soles, nothing cropped, feet and floor visible in the lowest 8 % of the panel, same scale as panel A.
COLUMN C (right, 30 % of the width): three stacked real macro photographs of equal height, each roughly 4:3, of this same outfit in the same light — G1 (top): [détail, position, about X cm of garment]; G2 (middle): [...]; G3 (bottom): [...].

MODEL: [Fiche Muse, mot pour mot]. Hair: [coiffure de collection]. Makeup: [maquillage de collection].
POSE — panel A: [pose de face de la charte, convention image]. The arms and accessories never hide [éléments ADN]. Panel B: [pose de dos de la charte]; the hand on the RIGHT SIDE OF THE IMAGE holds [accessoire tenu, s'il y en a].

OUTFIT — build exactly this, add nothing:
1. [pièce haute …]
2. [pièce basse …]
[longueurs en triple ancrage ; volumes bornés : ce qu'ils ne sont PAS ; comptages exacts]
BACK OF THE OUTFIT (panel B): [dos en surfaces continues, coutures, fente, ADN au dos ou « no print and no pleat visible from behind », fermeture].

MATERIALS AND COLORS — zone by zone: [zone → material, color + hex]. Only [metal pieces] are metallic; everything else is matte.
PRINT: [I1: motif, hex, real motif size in cm]. The print appears ONLY in [zones]. Everywhere else is solid fabric, with no print at all.
SIGNATURE ELEMENTS — locked, copied from the collection: [bloc ADN, mot pour mot] — on this outfit: [position, dimensions, count, opening rule].
CLOSURE: the only closure is [location]; everywhere else is a continuous surface.
ENDINGS: [each free element: start, path, ending].
ACCESSORIES: [Blocs Accessoires du look, mot pour mot, + how worn]. ORNAMENT CEILING: no jewelry, bag, belt, shoes, glasses or embellishment other than these.

[BLOC DÉCOR, mot pour mot — SETTING / LIGHT / GRADING / COLOR RULE]
The three panels share the same place, the same light direction and the same grading.

REALISM: [bloc réalisme]

No text, no numbers, no labels, no logo, no watermark. Natural contrast, no over-sharpening.
```

**Panneau seul** (remplacement d'un panneau raté) : prototype joint en IMAGE 1 « SOURCE OF TRUTH: the approved prototype — reproduce panel [A / B / G2] as described below », même prompt réduit à ce panneau ; format portrait 2:3 pour A ou B, paysage 3:2 pour une macro. Python le remplace ensuite dans la planche (`remplace_panneau`).

## Bloc réalisme (dans chaque prompt photo)

```
REALISM: real editorial fashion photograph, full-frame camera, 85 mm lens at f/5.6 for full-body panels and a 100 mm macro lens for close-ups, camera at waist height, tack sharp, very high resolution. Natural skin with pores and texture, individual hair strands. MATERIALS zone by zone: [matière : grain, épaisseur et tenue, finition des bords, reflet]. The print sits IN the fabric: the weave shows through the ink and the print follows every seam and fold, never a flat digital overlay. Every seam is a fine recessed line; topstitching shows thread relief (stitch about 3 mm); hems and cut edges show their real thickness; closures properly sewn. Soft fabrics: natural tension creases; rigid fabrics: crisp edges, no creases. NOT a 3D render, NOT CGI, NOT plastic, no airbrushed smoothness, no waxy skin, no over-saturated colors.
```

## Portrait beauté (étape 6, facultatif) — 2:3

Références : IMAGE 1 prototype validé du look (tenue et style), IMAGE 2 `ref_muse`.
```
Use ONLY the reference images listed below, in this order. Ignore every other image in this conversation.
IMAGE 1 — STYLE AND OUTFIT: the approved prototype; take the top of the outfit, the setting and the light. IMAGE 2 — MUSE: keep her identity exactly.
OUTPUT: ONE portrait 2:3 photograph, bust, three-quarter view, the model wearing the top of the outfit with [élément ADN] clearly visible, in the same setting and light. [Fiche Muse.] [Bloc Décor.] [Bloc réalisme.] No text, no logo, no watermark.
```

## Retouche (toute étape)

```
Use ONLY the reference images listed below. Ignore every other image in this conversation.
IMAGE 1 — the approved image. Reproduce it exactly, with ONE change.
CHANGE — only this: [panneau concerné si prototype] [description précise, mesures].
KEEP IDENTICAL: [éléments voisins à risque], the other panels, the print (motif, colors, size, placement), the model and her exact pose, the setting, the light, the framing.
DO NOT change anything else. Same photographic realism. No text, no watermark.
OUTPUT: same format and framing as the reference.
```
Si l'image validée est la dernière générée juste au-dessus et qu'aucune autre image n'a été ajoutée depuis, la ligne IMAGE 1 peut dire « the image you generated just above ». Sinon, le créateur la rejoint. Après 3 retouches sur une même image, régénère depuis le prompt complet mis à jour.
