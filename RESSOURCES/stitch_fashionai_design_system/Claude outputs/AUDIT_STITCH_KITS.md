# Audit de la sortie Stitch — page catalogue des kits

**Date :** 10 septembre 2026
**Sources :** `code.html` et `DESIGN.md` générés par Stitch
**Référence :** `PRD_CATALOGUE_KITS.md` · `PRD.md` §4 (Non-Goals) · prompt Stitch 12

---

## Ce qui est bon, et qu'il faut garder

La grille visible est réussie. `border-x` + `border-b` sur la section, `border-r` sur chaque cellule : les filets de 1 px dessinent la structure sans une seule bordure de carte. C'est exactement le modèle de grille du système, et c'est bien mieux exécuté que ce que produit Stitch d'habitude.

La configuration Tailwind force `borderRadius` à 0 **y compris `full`** — ce qui tue par avance les avatars ronds et les pastilles. C'est malin, garde-le.

L'inversion du bandeau séance en fond encre, les jetons `ink` / `ink-soft` / `rule` / `accent-sienna` / `whatsapp-green` correctement repris, et l'échelle typographique conforme. Le socle est sain.

---

## 1. LE PROBLÈME CRITIQUE — la page vend des prestations, avec des prix

```
KIT EDITORIAL STUDIO      1 Modèle, 3 Looks, Studio Blanc    À PARTIR DE 500€
KIT LOOKBOOK URBAIN       2 Modèles, 5 Looks, Extérieur      À PARTIR DE 800€
KIT CAMPAGNE AVANT-GARDE  Direction Artistique, Sur Mesure   SUR DEVIS
```

**Deux erreurs superposées, et ce sont les seules qui comptent vraiment.**

**a) Il y a des prix.** Le premier Non-Goal du PRD site est sans ambiguïté : *« Vendre quoi que ce soit sur le site. Pas de prix, pas de panier, pas de paiement. »* Tout le dispositif repose là-dessus — l'offre est ajustée à chaque interlocuteur **dans la conversation WhatsApp**, jamais affichée. Une grille tarifaire sur le catalogue détruit ce mécanisme : elle qualifie à ta place, elle fait fuir le lead high ticket qui se compare à 500 €, et elle attire celui qui cherche le moins cher.

**b) Ce ne sont pas tes kits.** « 1 Modèle, 3 Looks, Studio Blanc » décrit une **prestation de shooting**. Tes kits sont des **méthodes téléchargeables** : un fichier `.md`, un guide PDF, un tutoriel YouTube. La page générée présente une agence photo qui vend des séances. C'est un autre produit, un autre modèle économique, et une autre entreprise.

Les filtres suivent la même erreur : `EDITORIAL / LOOKBOOK / E-COMMERCE` au lieu de `TOUT / PHOTO / VIDÉO`, qui sont tes deux familles.

> **Si tu as changé de modèle et que tu veux vraiment vendre des prestations chiffrées sur le site, dis-le : ce n'est pas une correction de page, c'est une réécriture du PRD site, du scoring, du parcours WhatsApp et de la page « Travailler ensemble ». Sinon, c'est une invention de Stitch, et il faut la retirer entièrement.**

Cette sortie ne vient d'ailleurs ni du prompt 3 ni du prompt 12 : ni le contenu, ni les filtres, ni la structure ne correspondent. Relance depuis le prompt 12.

---

## 2. Les exigences P0 absentes

| # | Exigence | État |
|---|---|---|
| K0-2 | Carte avec mosaïque, promesse, description, **3 entrées**, prérequis, bouton | Seulement image + titre + une ligne |
| K0-3 | Famille identifiable en une seconde — puce PHOTO / VIDÉO | **Absente** |
| K0-4 | **Prérequis outil et coût visibles dès le catalogue** | **Absent** |
| K0-7 | Balayage avant / après | **Absent** |
| K0-9 | **Zone B — la mosaïque de résultats** | **Absente en totalité** |
| K0-12 | Une seule apparition de la sienne brûlée | **Zéro apparition** |
| K0-15 | Version mobile | **Non générée** |

La zone B manquante et les trois vignettes d'entrée manquantes sont les deux pertes les plus coûteuses : ce sont elles qui donnaient la densité de la référence et qui répondaient sans un mot à la question « qu'est-ce que je dois fournir ? ».

---

## 3. Les écarts de système graphique

**Les images ne sont pas à fond perdu.** `<article class="... p-4">` met 16 px de marge intérieure autour de chaque image. Le `DESIGN.md` généré par Stitch dit lui-même, deux fois : *« Images must bleed to the edges of their specific grid cell »*. Il s'est contredit. Le padding va sur le bloc de texte, jamais sur l'image.

**Les images sont désaturées par défaut.** `grayscale group-hover:grayscale-0`. Personne ne l'a demandé, et c'est le pire réglage possible ici : ton argument de vente est la **fidélité de la couleur du vêtement**. Une grille de vignettes en noir et blanc annule la démonstration. À supprimer, sans négociation.

**Les icônes sont revenues.** Material Symbols est chargé et utilisé deux fois — `menu` dans l'en-tête, `chat` dans le bouton WhatsApp. La règle est « type only ».

**Les filtres sont des boîtes.** Le PRD demande des éléments DM Mono avec un simple filet de 1 px en sienne sous l'actif — et c'est la seule apparition d'accent de la page. Ici ce sont quatre rectangles bordés, et l'accent n'apparaît nulle part.

**Les titres de carte sont en Archivo 16 px gras.** Le PRD demande **Bodoni Moda 26 px**. C'est ce qui fait la différence entre un catalogue éditorial et une liste de produits — et en l'état, c'est une liste de produits.

**Le bandeau séance est centré.** Le `DESIGN.md` dit : *« Hard Left Alignment: All text and elements must anchor to the left grid line. No centered text. »*

**`© 2024`.** Nous sommes en 2026. C'est la deuxième fois que Stitch date le pied de page dans le passé — vérifie-le systématiquement.

**Trois colonnes en zone A au lieu de deux.** Défendable en soi, mais avec la mosaïque, les trois vignettes d'entrée, le prérequis et le bouton à faire tenir, la carte devient illisible à 380 px de large. Reste à deux.

---

## 4. Le `DESIGN.md` est à nettoyer avant de le donner à Antigravity

Sur 55 jetons de couleur déclarés, **48 sont des résidus Material Design** : `surface-container-highest`, `on-tertiary-fixed-variant`, `inverse-primary`, `error-container`… Aucun n'appartient à ton système, et plusieurs le contredisent — `primary: #000000` alors que ton encre est `#0B0B0D`, `surface-dim: #dad9e4` qui est violacé.

Laissés dans la configuration Tailwind, ils seront utilisés. C'est exactement la dérive relevée sur les écrans d'août.

Une version nettoyée est jointe : `DESIGN_CLEAN.md`, sept couleurs.

**Un conflit à trancher au passage :** le `DESIGN.md` déclare `margin-desktop: 64px`, la configuration Tailwind du `code.html` déclare `80px`. Choisis-en un — je recommande **80 px**, cohérent avec le `5rem` des autres prompts.

---

## 5. Les corrections à coller dans Stitch, dans cet ordre

Courtes et séparées, selon ta règle numéro 5.

**1 — Retirer le modèle commercial**
```
Remove every price from this page: no "À PARTIR DE", no "SUR
DEVIS", no currency anywhere. Nothing is sold on this site.
Replace the price line on each card with a DM Mono 10px
uppercase line naming the required AI tool and whether it is
free or paid, e.g. "OUTIL REQUIS — NANO BANANA · GRATUIT".
```

**2 — Reprendre les vraies familles**
```
Replace the filter row with three DM Mono uppercase items,
left aligned, 32px apart, no boxes and no borders: TOUT ·
PHOTO · VIDÉO. The active one is ink with a 1px underline in
#B7410E. That underline is the only #B7410E on the page.
```

**3 — Rendre les images aux images**
```
Remove all grayscale filters — the images must always be in
full colour. Remove the p-4 padding from each card so the
image bleeds to the edges of its grid cell; keep the padding
on the text block below the 1px rule only.
```

**4 — Retirer les icônes**
```
Remove the Material Symbols stylesheet and both icons.
Replace the hamburger with a DM Mono uppercase "MENU" text
link, and remove the chat icon from the WhatsApp button.
Type only, no icons anywhere.
```

**5 — Remettre les titres en éditorial**
```
Card titles use Bodoni Moda 26px regular, not Archivo bold.
Left aligned, on their own line above the description.
```

**6 — Aligner à gauche et corriger la date**
```
Left-align the entire "Réserver une séance" band on the grid
— no centered text anywhere on this page. Change the footer
copyright to 2026.
```

**7 — Ajouter ce qui manque**
```
On each card, between the description and the button, add a
1px top rule, then a DM Mono 10px ink-soft label "CE QU'IL
VOUS FAUT", then three 32px SQUARE thumbnails in a row 8px
apart, each with a 1px rule border: a garment photo, a model
reference sheet, a studio backdrop. To their right, Archivo
13px ink-soft: "Votre photo. Le reste est fourni."
Below that, a solid ink rectangle button, paper text,
Archivo 15px medium, 48px tall: "Voir le kit".
```

**8 — La zone B**
```
Below the kit grid, separated by 80px and a 1px rule, add a
dense results mosaic. DM Mono 10px label "CE QUE LA MÉTHODE
PRODUIT", Bodoni Moda 28px "Fait avec ces kits", then about
14 full-bleed fashion images, 8px gutters, 2 columns on
mobile and 4 on desktop, in three formats only: 4:5 standard,
4:5 spanning two rows, 8:5 spanning two columns. No captions.
Do not dim the tiles.
```

**9 — Le mobile**
```
Now generate the 390px mobile version of this same page.
Zone A becomes one column, zone B two columns. Same content,
same rules, same French copy.
```

---

## Ce qu'il faut retenir

Le squelette est bon — la grille de filets, la configuration sans arrondi, les jetons corrects. **Ce qui a dérivé, c'est le produit, pas le style.**

Une page qui affiche « À PARTIR DE 500 € » sous une prestation de shooting n'est pas une variante graphique de ton catalogue : c'est le site d'une autre entreprise. Corrige ça en premier, le reste est du réglage.
