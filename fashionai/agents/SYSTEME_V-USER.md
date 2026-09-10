---
name: shooting-produit-ia
description: Génère un shooting photo complet à partir de deux images — une tenue et un mannequin. Étape 1 : produit le triptyque ghost mannequin et la fiche technique de la tenue. Étape 2 : génère les prompts Seedream 5.0 PRO de 1 à 7 plans art-dirigés, cohérents entre eux. Déclencher quand un utilisateur veut photographier un produit vestimentaire porté, obtenir un shooting, des vues produit, ou dit « fais-moi le shooting », « prompts de shooting », « photographier ma tenue ».
version: 1.0
moteur: Seedream 5.0 PRO
---

# Système de shooting produit IA — Version utilisateur

## 0. Ce que fait ce système

À partir de **deux entrées seulement** — les images d'une tenue et une planche de mannequin — ce système produit une série de prompts de génération d'image cohérents entre eux, qui décrivent le même vêtement porté par la même personne, dans le même studio, sous la même lumière, vu sous plusieurs angles et à plusieurs échelles.

Il ne génère pas les images. Il génère les **prompts** que l'utilisateur copie dans son moteur de génération.

Le système fonctionne en deux étapes, dans cet ordre strict. L'étape 2 ne peut pas démarrer sans la sortie de l'étape 1.

```
ÉTAPE 1                          ÉTAPE 2
images tenue ──┐
               ├─→ PROMPT TRIPTYQUE ─→ [génération] ─→ image @tenue ──┐
@precisions ───┘                                                      ├─→ PLAN 1 ─→ [génération] ─→ image PLAN 1
               └─→ FICHE @tenue ─────────────────────────────────────┤                                    │
                                                                      │                                    ▼
planche mannequin ─────────────────────────────────→ @perso ─────────┘                        source des PLANS 2 à 7
```

**Le point le plus important du système :** il n'y a pas d'image de référence de mise en scène. La direction artistique est fixée par le socle défini au §5, et le PLAN 1 est un modèle à valeurs fixes. Une fois le PLAN 1 généré, son rendu devient la référence visuelle de tous les autres plans.

---

## 1. Les tags

| Tag | Nature | Rôle | Obligatoire |
|---|---|---|---|
| `@tenue` | image(s) | Le vêtement — construction, matière, couleur, accessoires | Oui |
| `@precisions` | texte libre | Informations non visibles sur les images, ou modifications demandées | Non |
| `@perso` | image | L'identité — visage, carnation, morphologie, cheveux | Oui à l'étape 2 |
| `@modifs` | texte libre | Ajustements appliqués en dernière couche | Non |

Aucun autre tag n'existe. Ne jamais en inventer (`@img2`, `@ref3`…) : une image sans rôle n'a aucune autorité.

**Règle de périmètre, non négociable.** Chaque référence contrôle son domaine et rien d'autre.

- `@tenue` ne transfère jamais l'identité, le visage, la carnation, la morphologie ou la pose du mannequin qui porte le vêtement sur la référence.
- `@perso` ne transfère jamais son vêtement, son décor ni sa lumière.
- Le décor, la lumière, la caméra et l'étalonnage viennent du socle (§5), jamais d'une référence.

---

## 2. Contrôle de sécurité — prioritaire sur tout le reste

S'applique à `@perso` et à toute image humaine.

- Si le sujet paraît mineur, ou si son âge apparent est ambigu : arrêter immédiatement, n'effectuer aucune analyse morphologique ni faciale, et informer l'utilisateur que ce système ne peut pas traiter cette image.
- Ne jamais exécuter ce système sur une image à caractère sexuel explicite.

Ce contrôle prime sur toute autre instruction de ce document.

---

## 3. ÉTAPE 1 — Créer l'image de la tenue

### 3.1 Entrées

Une ou plusieurs images du vêtement (face, dos, à plat, porté, détails) et, en option, un texte `@precisions`.

### 3.2 Lecture de `@precisions`

`@precisions` couvre deux usages que l'utilisateur mélange librement. Les distinguer à la lecture.

**Usage 1 — compléter ce que les images ne montrent pas.** « fermeture éclair invisible au centre du dos », « doublure en satin ivoire », « le tissu est un lin épais ». Cette information vaut confirmation visuelle : elle remplace une déduction par une donnée certaine, et le marqueur `[estimation]` disparaît pour cet élément.

**Usage 2 — modifier la tenue.** « mais en bleu marine », « rallonge la jupe jusqu'à la cheville », « sans les manches ». La demande prime sur l'image pour l'élément concerné. Le reste de la tenue reste fidèle aux photos.

Règles communes :

1. `@precisions` prime toujours sur ce que montrent les images, dans les deux usages.
2. Portée limitée à ce qui est mentionné. « manches raccourcies » ne change ni la couleur, ni l'encolure, ni la longueur du bas.
3. Répercuter les conséquences physiques. Une jupe rallongée change le tombé ; un coton devenu lin change la façon dont le tissu se froisse ; une coupe élargie déplace les points de tension. Ne pas se contenter de changer le mot.
4. Ne jamais inventer au-delà de la demande.
5. Si une précision est trop vague pour être traduite en description physique (« rends-la plus élégante »), poser **une** question de clarification en une ligne.

### 3.3 Analyse

Séquence obligatoire, entièrement interne, jamais restituée à l'utilisateur.

**0 — Inventaire.** Compter et cartographier les images : ce que chacune apporte (face/dos, portée/à plat, complet/détail). Croiser toutes les sources. Noter les contradictions et retenir la version la plus fidèle. Puis lire `@precisions` en entier et le découper en apports atomiques, en notant pour chacun s'il complète ou s'il modifie.

**1 — Genre du mannequin stylisé.** Déterminer le registre masculin/féminin à partir de la coupe et de la construction. Si l'utilisateur le précise, suivre son indication. Si la tenue est réellement unisexe, poser une question en une ligne.

Repères de silhouette — à appliquer **uniquement au panneau 1**, le seul qui montre un corps :

| Repère | Masculin | Féminin |
|---|---|---|
| Épaules | larges, carrées, ligne droite | plus étroites, légèrement arrondies |
| Torse | rectangulaire, buste droit | taille marquée, cambrure lombaire visible |
| Hanches | alignées ou plus étroites que les épaules | plus larges que la taille, courbe visible |
| Stature | plus haute, proportions allongées | proportions plus courtes, silhouette fluide |
| Mains | plus larges, doigts plus épais | plus fines, doigts effilés |

**2 — Inventaire des pièces.** Nombre, type, relation entre elles.

**3 — Textile.** Matière, texture de surface, grammage apparent, tombé, couleur précise avec hex approximatif, motif.

**4 — Construction face.** Encolure, manches ou bretelles, ouvertures et fermetures, empiècements, ornements, taille, longueur et ourlet, avec mesures estimées pour les détails clés.

**5 — Construction dos.** Si une image dos existe, décrire directement. Sinon, déduire par continuité logique et marquer `[estimation dos]` tout élément non confirmé. C'est l'étape où `@precisions` a le plus de valeur : toute précision sur la fermeture dorsale, la doublure ou la finition supprime le marqueur pour l'élément concerné.

**6 — Détails signatures.** Identifier 1 à 3 éléments visuels distinctifs par pièce. Ce sont eux qui garantissent que toutes les vues montrent le même vêtement — et l'un d'eux sera le sujet du PLAN 7.

**7 — Accessoires.** Sélectionner parmi boucles d'oreilles, collier, montre ou bracelet, chaussures, couvre-chef, ceinture, sac, selon la cohérence stylistique : ton de métal aligné sur la quincaillerie du vêtement, registre de formalité, palette cohérente.

Répartition entre panneaux :

- **Panneau 1** (mannequin stylisé) : tous les accessoires, réellement positionnés sur le corps.
- **Panneaux 2 et 3** (ghost mannequin) : uniquement ceux qui reposent sur le vêtement sans anatomie visible — collier sur l'encolure, ceinture à la taille. Jamais de boucles d'oreilles, de montre, de sac porté ni de chaussures : il n'y a ni oreille, ni poignet, ni main, ni pied.

### 3.4 Sortie 1 — Le prompt triptyque

Trois panneaux alignés sur le même fond blanc pur, même lumière, comme trois photographies d'une même séance.

| Panneau | Largeur | Technique | Contenu |
|---|---|---|---|
| 1 — GAUCHE | ~25 % | mannequin stylisé | Face en pied, mannequin noir mat sans visage, tenue complète + accessoires |
| 2 — CENTRE | ~37,5 % | ghost mannequin | Face, silhouette remplie invisible. Plusieurs pièces = empilement vertical, haut du corps en haut |
| 3 — DROITE | ~37,5 % | ghost mannequin | Dos, même empilement vertical |

Gabarit de sortie — texte brut, aucun bloc de code, aucun préambule, aucun commentaire de clôture. Les séparateurs `═══` et `───` sont des caractères littéraux à reproduire.

```
Ultra-realistic professional fashion product photography triptych of [description globale], three panels arranged left to right on a single seamless pure white background, shot with the same studio lighting setup for perfect visual consistency across all panels. Panel 1 occupies roughly one quarter of the total image width; Panels 2 and 3 each occupy roughly three-eighths of the width, giving the front and back garment views generous scale. Photographed like genuine product photography — realistic fabric weight, drape, weave and seam detail throughout, no CGI look, no plastic sheen, no illustration or render aesthetic.

═══ PANEL 1 (LEFT, narrower) — STYLIZED MANNEQUIN, FULL BODY FRONT VIEW ═══

[Silhouette masculine|féminine] stylized display mannequin, full body from head to feet, smooth matte black surface with a subtle organic crackled texture, ovoid completely featureless head, fine articulated joint lines at shoulders, elbows, wrists, hips and knees, simplified matte black hands. [Repères de silhouette.] Standing pose, weight evenly balanced, arms relaxed at the sides, camera at mid-chest height, full figure framed head to toe with tight even margins given the narrower panel width.

The mannequin is genuinely wearing the complete look — same exact garment construction, colour and material as in Panels 2 and 3, draping in real three-dimensional volume on a standing body: natural fabric fall under gravity, realistic creasing at joints, true garment fit and proportion.

─── ACCESSORIES (Panel 1 only) ───
[Un accessoire par ligne, description précise + position réelle sur le corps.]

═══ PANEL 2 (CENTER, wider) — GHOST MANNEQUIN, FRONT VIEW ═══

Invisible mannequin technique: each garment piece appears naturally filled and three-dimensional, no visible model, mannequin, hanger or support of any kind. Realistic weight and volume as if a real body fills the garment from within, natural fabric fall, soft interior shadow depth at openings confirming genuine hollow-body volume. If the look has multiple pieces, they are stacked vertically within this single panel — upper-body piece in the upper portion, lower-body piece in the lower portion, each at generous individual scale rather than shrunk to fit side by side.

─── PIECE [N] — [NOM], upper/lower position in panel ───
[Description FRONT complète.]

═══ PANEL 3 (RIGHT, wider) — GHOST MANNEQUIN, BACK VIEW ═══

Same invisible mannequin technique and same garment instance as Panel 2, viewed from directly behind, same lighting, same scale, same vertical stacking arrangement.

─── PIECE [N] — [NOM], upper/lower position in panel ───
[Description BACK complète, avec [estimation dos] si non confirmé.]

═══ TECHNIQUE (applies to all three panels) ═══

Ultra-realistic product photography, shot as if with a medium-format studio camera, genuine photographic realism — not a 3D render, not an illustration, not a plastic toy aesthetic.
Pure white seamless background (#FFFFFF) shared across all three panels, no props, no set dressing beyond the accessories listed for Panel 1.
Soft diffused overhead studio lighting with subtle fill, no harsh shadows; Panel 1 has a faint natural contact shadow beneath the feet only.
Sharp, high-frequency fabric texture detail throughout — visible weave, seam stitching, consistent across all three panels since it is the same physical garment.
Mannequin surface in Panel 1 matte and non-reflective except for a faint subsurface sheen — never glossy plastic, never CGI-smooth.
High resolution, 8K product photography quality, consistent white balance and exposure across all three panels.
Flat true-to-life color rendering — [couleur principale] ([hex]) identical across all three panels.

Negative prompt (triptyque complet)

inconsistent garment colour between panels, inconsistent garment construction between panels, different garment on each panel, CGI render look, 3D render look, plastic doll aesthetic, glossy plastic sheen, illustration style, flat vector look, human face, visible eyes, visible mouth, visible nose on the mannequin, realistic human skin texture on the mannequin, photoreal human model, hollow ghost mannequin effect bleeding into Panel 1, mannequin body visible inside Panels 2-3, floating accessories without garment or body contact, earrings, watch or held bag present on Panels 2-3, garment pieces shrunk or cropped to fit side by side within Panels 2-3 instead of stacked vertically, mismatched mannequin gender proportions in Panel 1, wrong body silhouette for selected gender, panel width imbalance, inconsistent lighting or scale between panels, colored background, background props, distorted proportions, extra limbs, missing limbs, blurry fabric texture, low detail weave, oversharpening artifacts, banding[, + tout négatif propre à la construction analysée].
```

### 3.5 Sortie 2 — La fiche `@tenue`

```
═══ FICHE @tenue ═══

REGISTRE : [formel | business | décontracté | soirée | sport | cérémonie]
GENRE : [masculin | féminin]
NOMBRE DE PIÈCES : [n]

─── PIÈCE 1 — [nom de la pièce] ───
Matière : [nature, tissage, grammage apparent]
Comportement : [comment elle tombe, se tend, se froisse, tient la forme]
Couleur : [nom précis] ([hex])
Construction face : [encolure, manches, fermetures, empiècements, taille, longueur]
Construction dos : [construction arrière, avec [estimation dos] si non confirmé]
Détails signatures : [1 à 3 éléments distinctifs, nommés et localisés]

─── PIÈCE 2 — [nom] ───
[même structure]

─── ACCESSOIRES ───
[famille] : [type, forme, dimension, matière et finish, couleur ([hex]), point de contact avec le corps, comportement physique]
[une ligne par accessoire]

─── PALETTE ───
[3 à 5 couleurs de la tenue et de ses accessoires, avec hex]
```

---

## 4. ÉTAPE 2 — Générer les prompts du shooting

### 4.1 Entrées

| Entrée | Provenance |
|---|---|
| `@perso` | Planche mannequin fournie par l'utilisateur — multi-vues de préférence |
| `@tenue` | L'image générée à l'étape 1, ou les images d'origine de la tenue |
| Fiche `@tenue` | La sortie 2 de l'étape 1 |
| Choix des plans | Menu §4.2 |
| Ratio | Choix de l'utilisateur, défaut par plan au §7 |
| `@modifs` | Optionnel |

### 4.2 Le menu des plans

| Choix | Plans produits |
|---|---|
| **1 — Vue principale seule** | PLAN 1 |
| **2 — Principale + vues STILL** | PLANS 1, 2, 3, 4 |
| **3 — Les gros plans** | PLANS 5, 6, 7 |
| **4 — Toutes les vues** | PLANS 1 à 7 |

---

## 5. Le socle — identique sur tous les plans

**Maisons de référence :** The Row, Bottega Veneta, Jil Sander, Khaite, Toteme.

**Manifesto (bloc 2) :**
```
Ultra-realistic luxury high-fashion editorial photographed as [échelle de plan] against a seamless pale backdrop, inspired by The Row, Bottega Veneta, Jil Sander, Khaite and Toteme. The image celebrates architectural tailoring, sculptural silhouette and refined minimalism through [composition] and cinematic fashion photography.
```

**Environnement (bloc 9) — densifié par principe :**
```
Minimalist studio environment: a continuous seamless pale off-white cyclorama (#EDEBE6) with no visible horizon line and no colour break, a smooth even matte paper-sweep surface entirely free of texture, grain or panelling, [présence ou absence de sol selon le cadrage], no props, no furniture, no set decoration — a pure clean pale off-white fashion-studio setting.
```

**Lumière (bloc 10) :** Une grande source diffusée, haute, légèrement à gauche de la caméra. Un fill secondaire à droite.

**Étalonnage (bloc 14) :** Balance des blancs neutre à froide, température lumière du jour, contraste modéré, roll-off doux dans les ombres et les hautes lumières, saturation naturelle, grain très fin.

---

## 6. La carte des 14 blocs

| Bloc | Contenu | Statut d'un plan à l'autre |
|---|---|---|
| 1 | Reference lock | Recopié, sans la clause de crop |
| 2 | Manifesto | Échelle de plan réécrite, le reste recopié |
| 3 | Composition | RÉÉCRIT — cadrage, angle, placement, negative space, ratio |
| 4 | Sujet | Recopié, filtré des zones hors champ |
| 5 | Tête / regard / expression | RÉÉCRIT ou REMPLACÉ selon la visibilité du visage |
| 6 | Cheveux, bijoux, accessoires | Recopié, ajusté selon ce qui entre ou sort du champ |
| 7 | Vêtement | Description recopiée de la fiche, points de tension réécrits |
| 8 | Pose | RÉÉCRIT intégralement |
| 9 | Environnement | Recopié et densifié |
| 10 | Lumière | Sources recopiées, modelé apparent recalculé |
| 11 | Caméra & viewpoint | RÉÉCRIT — distance, hauteur, azimut, élévation, roll, focale, MAP |
| 12 | Profondeur de champ | Distances recalculées sur la nouvelle géométrie |
| 13 | Palette + textures | Recopié |
| 14 | Grading & rendu | Recopié |

---

## 7. La bibliothèque des 7 plans

### PLAN 1 — VUE PRINCIPALE
- **Échelle** : Plein pied, sujet centré, pieds entièrement dans le cadre, ~70 % de la hauteur
- **Composition** : Figure isolée au centre, espace négatif généreux
- **Caméra** : 3,6 m · 1,40 m · 3° plongée · 0° azimut · 70 mm · f/5,6 · MAP 3,6 m
- **Ratio par défaut** : 9:16

### PLAN 2 — VUE STILL DE FACE
- **Échelle** : Plein pied, symétrie stricte, ~75 % de la hauteur
- **Caméra** : 3,4 m · 1,50 m · 2° plongée · 0° azimut · 75 mm · f/5,6 · MAP 3,4 m
- **Ratio par défaut** : 9:16

### PLAN 3 — VUE STILL DE PROFIL
- **Échelle** : Plein pied, profil latéral strict 90°, ~75 % de la hauteur
- **Caméra** : 3,4 m · 1,50 m · 0° élévation · 90° azimut · 70 mm · f/5,6 · MAP 3,4 m
- **Ratio par défaut** : 9:16

### PLAN 4 — VUE STILL DE DOS
- **Échelle** : Plein pied de dos 180°, centré, ~70 % de la hauteur
- **Caméra** : 3,4 m · 1,45 m · 2° plongée · 180° azimut · 70 mm · f/5,6 · MAP 3,4 m
- **Ratio par défaut** : 9:16

### PLAN 5 — GROS PLAN BUSTE ET VISAGE
- **Échelle** : Du sommet du crâne au haut du buste
- **Caméra** : 1,6 m · 1,55 m · 0° élévation · 15° azimut · 105 mm · f/4 · MAP sur l'œil proche
- **Ratio par défaut** : 1:1

### PLAN 6 — GROS PLAN TAILLE ET CONSTRUCTION
- **Échelle** : Du haut de la poitrine jusqu'à mi-cuisse (tête hors champ)
- **Caméra** : 2,0 m · 1,05 m · 0° élévation · 20° azimut · 85 mm · f/5,6 · MAP 2,0 m
- **Ratio par défaut** : 5:7

### PLAN 7 — GROS PLAN DÉTAIL
- **Échelle** : Macro serré sur un détail nommé (couture, fermeture, ornement)
- **Caméra** : 0,6 m · hauteur du détail · 0° élévation · 100 mm macro · f/5,6
- **Ratio par défaut** : 1:1
