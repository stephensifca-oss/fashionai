---
name: fashionai.agency — système de design
colors:
  background: '#F6F6F8'      # fond de page, blanc cassé froid, jamais crème
  surface: '#FFFFFF'         # surfaces élevées, encarts, formulaires
  ink: '#0B0B0D'             # texte, filets forts, boutons pleins
  ink-soft: '#56565F'        # texte secondaire, métadonnées
  rule: '#DCDCE2'            # filets de 1px
  accent-sienna: '#B7410E'   # identité seule — jamais sur un bouton
  whatsapp-green: '#25D366'  # boutons WhatsApp uniquement
typography:
  display-xl:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.1'
  title-card:
    fontFamily: Bodoni Moda
    fontSize: 26px
    fontWeight: '400'
    lineHeight: '1.15'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Archivo
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Archivo
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  utility-label:
    fontFamily: DM Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.14em
  utility-label-sm:
    fontFamily: DM Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.14em
spacing:
  margin-mobile: 20px
  margin-desktop: 80px
  gutter: 1px
  gutter-mosaic: 8px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 80px
radius:
  all: 0px
---

## Ce qui a été retiré, et pourquoi

Ce fichier remplace le `DESIGN.md` exporté par Stitch. Celui-ci déclarait **55 couleurs, dont 48 résidus Material Design** — `surface-container-highest`, `on-tertiary-fixed-variant`, `inverse-primary`, `error-container`, et le reste. Aucune n'appartient au système, et plusieurs le contredisent directement : `primary: #000000` là où l'encre est `#0B0B0D`, `surface-dim: #dad9e4` qui tire vers le violet.

Laissés dans une configuration Tailwind, ces jetons finissent utilisés. Sept couleurs suffisent, et la contrainte est le but.

**Deux ajouts** par rapport à l'export : `title-card` en Bodoni 26 px, parce que les titres de carte doivent rester éditoriaux, et `gutter-mosaic` à 8 px pour la mosaïque de résultats de la page catalogue.

**Un conflit tranché :** `margin-desktop` valait 64 px dans le `DESIGN.md` et 80 px dans la configuration Tailwind du `code.html`. Retenu : **80 px**, cohérent avec le `5rem` de tous les autres écrans.

---

## Marque et style

Système destiné à un studio de production mode par IA, adressé à des responsables de marque en Afrique de l'Ouest et en marchés francophones. L'esthétique est strictement éditoriale — magazine de mode imprimé, boutiques de design de type Porto Rocha ou ANCC Studio.

Personnalité : autoritaire, avant-gardiste, rigoureusement retenue. **L'image est le héros** ; la typographie est un élément structurel autant qu'un vecteur de lecture. Mélange de minimalisme et de brutalisme : grille visible, arêtes vives, contraste encre sur papier. Aucune ombre, aucun dégradé, aucun ornement — le luxe vient de la précision de l'alignement et du rythme des blancs.

**Ce n'est jamais un site de startup, de SaaS ou de produit tech.**

## Couleurs — trois rôles qui ne se recouvrent jamais

| Couleur | Rôle | Interdit |
|---|---|---|
| **ink** `#0B0B0D` | Toutes les actions, tous les boutons pleins, les titres, les filets forts | — |
| **whatsapp-green** `#25D366` | La seule action qui compte vraiment, une fois par écran | Tout autre usage |
| **accent-sienna** `#B7410E` | Identité seule — étiquettes DM Mono, liens, italiques Bodoni, chiffres de titre | **Jamais sur un bouton, jamais en aplat, jamais à côté d'une image dont on juge la couleur** |

**Une seule apparition d'accent par écran, jamais deux.** Les images portent toute la couleur ; l'interface reste neutre.

`ink-soft` porte le texte secondaire et les métadonnées, pour créer une hiérarchie de lecture. `rule` ne sert qu'aux filets de 1 px qui dessinent la grille.

## Typographie

- **Bodoni Moda** — titres uniquement, graisse 400, **jamais sous 24 px**, italique pour l'emphase, interlettrage serré. Y compris les titres de carte.
- **Archivo** — paragraphes et interface, 400/500/600, interligne 1,6, **65 caractères par ligne au maximum**.
- **DM Mono** — capitales, interlettrage 0,14 em, 10 à 11 px, pour **toutes** les métadonnées, étiquettes, légendes et libellés de formulaire.

## Mise en page

Modèle à **grille visible** : des filets de 1 px séparent les sections horizontalement et verticalement.

- **Alignement à gauche, sans exception.** Aucun texte centré, nulle part.
- **Marges généreuses** — 80 px en desktop — qui encadrent le contenu.
- **Rythme vertical ample** entre les sections, pour laisser respirer les images.
- **Mobile d'abord** : la grille se replie en une colonne, mais les filets restent et continuent de définir les limites.

## Profondeur

Purement **tonale et structurelle**. Aucune ombre, aucun flou.

- Les images occupent la couche de base et **débordent jusqu'aux bords de leur cellule de grille**.
- Une section est « élevée » par un filet de 1 px ou par un passage du fond au blanc pur.
- **Inversion** : pour un appel à l'action majeur, fond encre et texte papier — un bloc à fort contraste qui interrompt le rythme clair.

## Formes

- **Rayon zéro partout**, y compris `full` — boutons, champs, conteneurs d'image, pastilles.
- Un conteneur se définit par un filet de 1 px, jamais par une ombre.
- **Aucun coin arrondi sur une photographie**, jamais.

## Composants

**Boutons.** Primaire : fond `ink` plein, texte `background`, rayon 0, libellé en DM Mono capitales. Secondaire : filet `ink` de 1 px, sans fond. Tertiaire : texte seul souligné d'un filet de 1 px courant jusqu'au bord du conteneur.

**Cartes et images.** L'image déborde jusqu'aux bords de sa cellule. **Le padding va sur le bloc de texte, jamais sur l'image.** Éviter les surimpressions de texte sur les photos : placer le texte dans une cellule adjacente ou sous l'image, séparé par un filet.

**Champs.** Filet inférieur de 1 px uniquement, libellé en DM Mono au-dessus, focus qui fonce le filet vers `ink`.

**Filets.** 1 px, `#DCDCE2`, pour séparer les éléments de liste et délimiter en-tête et pied de page.

**Mouvement.** Une seule figure : fondu de 600 ms avec une montée de 10 px. Aucun rebond, aucune élasticité. Rien d'autre.

## Interdits permanents

- Aucune icône. Les libellés DM Mono en capitales les remplacent toutes.
- Aucun filtre noir et blanc sur les images — **la fidélité de la couleur du vêtement est l'argument de vente**.
- Aucun prix, aucun panier, aucun paiement, sur aucune page du site.
- Aucun texte centré.
- Aucune ombre, aucun dégradé, aucun arrondi.
