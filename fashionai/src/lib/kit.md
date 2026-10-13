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

**C'est la sortie qui alimente l'étape 2, et elle est obligatoire.**

Le prompt triptyque est un prompt de photographie produit : fond blanc, mannequin invisible, aucun corps. Passé tel quel à l'étape 2, son vocabulaire contamine les prompts du shooting — « pure white seamless background », « no props », « invisible mannequin » sont exactement l'inverse de ce qu'on veut y écrire.

La fiche est donc une extraction **purement descriptive** de la même analyse, sans un seul mot de studio, de fond, de cadrage ni de technique photographique.

Elle est livrée après le prompt triptyque, séparée par une ligne vide.

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

Règles de rédaction de la fiche :

- Aucun mot de photographie : ni « background », ni « lighting », ni « panel », ni « ghost mannequin », ni « studio ».
- Les marqueurs `[estimation dos]` sont conservés — l'étape 2 doit savoir ce qui est déduit.
- Une famille d'accessoires absente ne produit aucune ligne. **Ne jamais écrire de négation** (« pas de collier ») : une négation écrite se propage jusqu'au prompt final et supprime des éléments par ricochet.
- Les hex doivent être identiques à ceux du prompt triptyque.

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

Si la fiche `@tenue` n'est pas fournie, la demander avant de produire quoi que ce soit. Sans elle, les descriptions de vêtement dériveront d'un plan à l'autre.

### 4.2 Le menu des plans

Proposer ce choix à l'utilisateur avant de générer :

| Choix | Plans produits |
|---|---|
| **1 — Vue principale seule** | PLAN 1 |
| **2 — Principale + vues STILL** | PLANS 1, 2, 3, 4 |
| **3 — Les gros plans** | PLANS 5, 6, 7 |
| **4 — Toutes les vues** | PLANS 1 à 7 |

**Contrainte de chaînage.** Les PLANS 2 à 7 se génèrent à partir du rendu du PLAN 1 : c'est lui qui fixe la vérité visuelle de la scène. Si l'utilisateur choisit l'option 3 sans avoir généré le PLAN 1, le lui signaler en une ligne et produire quand même les prompts — ils fonctionnent, mais la cohérence entre plans sera moins bonne qu'avec le PLAN 1 en référence.

Tous les prompts demandés sont produits **en une seule réponse**, séparés par leur en-tête de plan.

### 4.3 Le PLAN 1 est un modèle, pas une reconstitution

Il n'y a pas d'image de mise en scène à analyser. Le PLAN 1 se remplit à partir de trois sources et de rien d'autre :

- `@perso` → blocs 4, 5, 6 (identité, visage, cheveux)
- la fiche `@tenue` → bloc 7 et la part accessoires du bloc 6
- le socle §5 → blocs 2, 9, 10, 13, 14 et les valeurs caméra du §7

Aucune de ces trois sources n'est une image de composition. Les blocs 3, 8, 11 et 12 du PLAN 1 prennent donc les valeurs fixes du §7, jamais des valeurs déduites.

**Conséquence sur les verrous.** Le PLAN 1 n'ayant pas de source, ses verrous sont **absolus** : ils protègent les valeurs écrites dans le prompt lui-même, jamais la conformité à une image.

- Verrou de grading : ne jamais écrire « must match the source image ». Écrire la formule absolue du §6.4.
- Négatifs de cadrage : ne jamais écrire « beyond source crop ». Utiliser la formule absolue du §8.
- Négatifs d'éviction : il n'y a rien à évincer. **Aucun** négatif de type « source garment persisting » ou nommant un vêtement étranger.

À partir du PLAN 2, le rendu du PLAN 1 est la source, et le verrou de grading redevient référentiel.

---

## 5. Le socle — identique sur tous les plans

Ces éléments ne varient jamais, quel que soit le plan, quelle que soit la tenue.

**Maisons de référence :** The Row, Bottega Veneta, Jil Sander, Khaite, Toteme.

**Manifesto (bloc 2) :**
```
Ultra-realistic luxury high-fashion editorial photographed as [échelle de plan] against a seamless pale backdrop, inspired by The Row, Bottega Veneta, Jil Sander, Khaite and Toteme. The image celebrates architectural tailoring, sculptural silhouette and refined minimalism through [composition] and cinematic fashion photography.
```
Seuls l'échelle de plan et la composition changent d'un plan à l'autre.

**Environnement (bloc 9) — densifié par principe :**
```
Minimalist studio environment: a continuous seamless pale off-white cyclorama (#EDEBE6) with no visible horizon line and no colour break, a smooth even matte paper-sweep surface entirely free of texture, grain or panelling, [présence ou absence de sol selon le cadrage], no props, no furniture, no set decoration — a pure clean pale off-white fashion-studio setting.
```
La couleur du fond est nommée avec son hex ici **et répétée dans le bloc 13**. Ce bloc est le plus court des blocs constants, donc le plus fragile face à une référence d'image : le densifier n'est pas facultatif.

**Lumière (bloc 10) — sources fixes dans l'espace :**
Une grande source diffusée, haute, légèrement à gauche de la caméra. Un fill secondaire à droite. Aucune source ne se déplace jamais d'un plan à l'autre. Seul le **modelé apparent** est recalculé : le corps ayant bougé, les ombres et les hautes lumières tombent ailleurs.

**Étalonnage (bloc 14) :** balance des blancs neutre à froide, température lumière du jour, contraste modéré, roll-off doux dans les ombres et les hautes lumières, saturation naturelle, grain très fin, pas de halation.

**Ouverture :** f/5.6 sur tous les plans sauf le PLAN 5 (f/4) et le PLAN 7 (f/5.6 en macro). L'ouverture ne sert jamais à corriger un flou d'arrière-plan — cela se règle par la focale et la distance de mise au point.

---

## 6. La carte des 14 blocs

C'est la mécanique centrale. Chaque bloc a un statut unique : aucun n'est laissé au jugement du moment.

| Bloc | Contenu | Statut d'un plan à l'autre |
|---|---|---|
| 1 | Reference lock | Recopié, **sans** la clause de crop |
| 2 | Manifesto | Échelle de plan réécrite, le reste recopié |
| 3 | Composition | **RÉÉCRIT** — cadrage, angle, placement, negative space, ratio |
| 4 | Sujet | Recopié, **filtré** des zones hors champ (§6.2) |
| 5 | Tête / regard / expression | **RÉÉCRIT ou REMPLACÉ** selon la visibilité du visage (§6.3) |
| 6 | Cheveux, bijoux, accessoires | Recopié, ajusté selon ce qui entre ou sort du champ |
| 7 | Vêtement | Description recopiée de la fiche, **points de tension entièrement réécrits** |
| 8 | Pose | **RÉÉCRIT** intégralement |
| 9 | Environnement | Recopié et densifié |
| 10 | Lumière | Sources recopiées, modelé apparent recalculé |
| 11 | Caméra & viewpoint | **RÉÉCRIT** — distance, hauteur, azimut, élévation, roll, focale, distance de MAP. Ouverture recopiée |
| 12 | Profondeur de champ | Distances recalculées sur la nouvelle géométrie |
| 13 | Palette + textures | Recopié |
| 14 | Grading & rendu | Recopié |

### 6.1 Le traitement des verrous — la règle qui fait fonctionner le multi-plans

Chaque prompt contient des phrases de verrou impératives. **Les recopier toutes à l'identique fait échouer le système** : un prompt qui décrit une nouvelle pose tout en ordonnant de ne pas changer la pose est ingérable, et le générateur conserve la pose précédente. Résultat : sept plans identiques.

| Verrou | Traitement |
|---|---|
| Morphologique — « This exact body morphology… » | **Recopié verbatim** |
| Grading — « Colour grading, white balance… » | **Recopié verbatim** |
| Pose — « This exact pose must be reproduced… » | **RÉÉCRIT** sur la nouvelle pose |
| Caméra — « This exact camera viewpoint… » | **RÉÉCRIT** sur la nouvelle géométrie |
| Clause de crop du bloc 1 | **SUPPRIMÉE** — ce système recadre par définition |

Un verrou réécrit garde sa forme impérative et sa formule de clôture ; seules les valeurs changent.

**Ne jamais livrer un prompt contenant deux verrous contradictoires.** Avant livraison de chaque plan, relire les quatre verrous et vérifier qu'aucun n'interdit ce que le prompt décrit par ailleurs.

### 6.2 Filtrage du bloc 4

Le bloc 4 décrit le sujet. Recopié aveuglément, il décrit un visage sur un plan de dos et des jambes sur un cadrage taille — le générateur cherche alors à faire apparaître ce qu'on lui décrit, et élargit ou retourne le cadrage.

Sur chaque plan, ne conserver dans le bloc 4 que les zones **réellement dans le champ**. Le verrou morphologique, lui, est toujours conservé en entier.

**Rédaction de la morphologie — règle stricte.** Interdiction des adjectifs vagues : `slim`, `athletic`, `curvy`, `slender`, `toned`. Décrire par ancrages structurels observables uniquement.

> ✗ « an even slender-to-athletic build with balanced shoulder and hip width »
> ✓ « shoulder width matching hip width, a waist narrower than both by a clear margin, long straight legs with the knee roughly at mid-height of the standing figure, narrow wrists and long fingers »

Cette formulation est écrite **une seule fois** au PLAN 1 puis recopiée. Une erreur ici se réplique mécaniquement sur les sept plans.

### 6.3 Le bloc 5 — trois états, jamais recopié aveuglément

C'est la source d'erreur la plus fréquente du système. Le bloc 5 décrit le visage, le regard et l'expression. Sur un plan où le visage est hors champ, le recopier crée une contradiction directe avec le bloc 3, et le générateur tranche presque toujours en faveur du visage : il élargit le cadrage ou retourne la tête.

| Visibilité du visage | Traitement du bloc 5 |
|---|---|
| **Pleinement visible** (plans 1, 2, 5) | Bloc 5 complet : expression, direction du regard, inclinaison de tête, maquillage |
| **Partiellement visible** (plan 3, profil) | Bloc 5 **réduit** aux traits réellement observables : un œil, une joue, la ligne de mâchoire, le maquillage du côté visible |
| **Hors champ** (plans 4, 6, 7) | Bloc 5 **REMPLACÉ** par un paragraphe décrivant le finish des zones de peau visibles — nuque, épaules, décolleté, avant-bras, mains. **Jamais recopié, jamais supprimé sans remplacement** |

Exemple de bloc 5 de remplacement, pour un cadrage taille :

```
Polished editorial finish across the visible skin: luminous satin-matte complexion, smooth even tone across the décolletage, arms and forearms, natural sheen catching along the collarbones and the outer forearm.
```

Ne jamais écrire « makeup carried on the figure but unseen from this viewpoint » ni aucune formule décrivant l'invisible : c'est un énoncé d'absence déguisé.

---

## 7. La bibliothèque des 7 plans

Chaque plan est un jeu de valeurs fixes. L'agent ne les déduit pas, il les applique.

### PLAN 1 — VUE PRINCIPALE

- **Échelle** : plein pied, sujet centré, pieds entièrement dans le cadre, ~70 % de la hauteur
- **Composition** : figure isolée au centre, espace négatif généreux au-dessus de la tête et de part et d'autre
- **Bloc 5** : complet — regard direct vers l'objectif, tête droite et de face
- **Pose** : debout, frontal, poids réparti également sur les deux pieds parallèles écartés à la largeur des hanches, hanches carrées face à la caméra, buste droit et allongé, épaules horizontales, bras relâchés le long du corps. Si la fiche comporte un sac à poignée, la main droite se referme sur l'anse, le sac pendant contre la cuisse extérieure droite avec une ombre de contact.
- **Caméra** : 3,6 m de distance · 1,40 m de hauteur · 3° de plongée · 0° d'azimut · roll horizontal · 70 mm · f/5,6 · MAP 3,6 m
- **Profondeur de champ** : profonde et continue, tête aux pieds nette, plan de netteté sur le torse
- **Ratio** : défaut **9:16** · compatibles 9:16, 5:7 · déconseillé 1:1

### PLAN 2 — VUE STILL DE FACE

- **Échelle** : plein pied, symétrie stricte, ~75 % de la hauteur, marge de sol sous les pieds
- **Composition** : la colonne verticale du corps ancre une composition rigoureusement symétrique, marges latérales égales
- **Bloc 5** : complet — regard droit vers l'objectif, menton horizontal, tête droite
- **Pose** : pieds rapprochés, talons presque joints, pointes légèrement ouvertes. Bras tombant droits le long du corps, coudes à peine fléchis. Main gauche ouverte et relâchée contre la cuisse extérieure gauche. Sac, s'il existe, tenu bas dans la main droite.
- **Caméra** : 3,4 m · 1,50 m · 2° de plongée · 0° d'azimut · 75 mm · f/5,6 · MAP 3,4 m
- **Profondeur de champ** : profonde, plan de netteté sur le torse
- **Ratio** : défaut **9:16** · compatibles 9:16, 5:7 · déconseillé 1:1
- **Négatifs propres au plan** : `feet planted wide apart, arms raised or bent away from the sides, asymmetrical stance`

### PLAN 3 — VUE STILL DE PROFIL

- **Échelle** : plein pied, profil latéral strict, ~75 % de la hauteur
- **Composition** : sujet placé légèrement en avant du centre, l'espace vide s'ouvrant devant le visage dans la direction du regard, le cadre restant ouvert derrière le dos
- **Bloc 5** : **réduit** — profil strict, un seul œil et une joue visibles, regard porté droit devant le long de l'axe du profil et non vers l'objectif, menton horizontal, ligne du nez et de la mâchoire lisible comme un contour
- **Pose** : corps pivoté à 90°, poids réparti sur les deux pieds alignés sur l'axe du profil, hanches et épaules dans le même plan latéral, buste droit, épaules légèrement tirées en arrière. Bras proche relâché le long du corps ; bras éloigné largement occulté par le corps. Jambe éloignée occultée par la jambe proche — c'est une conséquence de l'orientation, pas un défaut.
- **Caméra** : 3,4 m · 1,50 m · 0° d'élévation (hauteur d'œil) · **90° d'azimut** · 70 mm · f/5,6 · MAP 3,4 m
- **Profondeur de champ** : profonde, plan de netteté sur le torse côté proche
- **Ratio** : défaut **9:16** · compatibles 9:16, 5:7 · déconseillé 1:1
- **Négatifs propres au plan** : `frontal orientation, three-quarter turn, body facing the lens, gaze to camera`

### PLAN 4 — VUE STILL DE DOS

- **Échelle** : plein pied de dos, centré, ~70 % de la hauteur
- **Composition** : figure isolée, espace négatif généreux au-dessus et autour
- **Bloc 4** : **filtré** — aucune description faciale. Décrire les omoplates, la nuque, la ligne du dos, les bras et les mains
- **Bloc 5** : **REMPLACÉ** — finish de la peau visible : nuque, ligne du cou, épaules, haut du dos, avant-bras
- **Bloc 6** : les cheveux décrits depuis l'arrière, dégageant la nuque. Aucun bijou de visage
- **Bloc 7** : c'est le plan qui montre la construction dos. Puiser dans le champ « construction dos » de la fiche — bretelles croisées, fermeture centrale, découpes, ourlet. Les éléments marqués `[estimation dos]` restent décrits, mais sans le marqueur dans le prompt final
- **Pose** : debout, dos entièrement présenté à l'objectif, hanches carrées à l'opposé de la caméra, poids réparti sur les deux pieds parallèles écartés à la largeur des hanches, buste droit, épaules horizontales, bras relâchés. Tête droite, alignée sur la colonne, visage détourné
- **Caméra** : 3,4 m · 1,45 m · 2° de plongée · **180° d'azimut** · 70 mm · f/5,6 · MAP 3,4 m
- **Profondeur de champ** : profonde, plan de netteté sur le haut du dos
- **Ratio** : défaut **9:16** · compatibles 9:16, 5:7 · déconseillé 1:1
- **Négatifs propres au plan** : `face turned toward camera, frontal torso, profile head turn, visible facial features`

### PLAN 5 — GROS PLAN BUSTE ET VISAGE

- **Échelle** : du sommet du crâne au haut du buste. L'encolure, les bretelles ou le col de la pièce du haut sont dans le champ ; le reste du vêtement en sort
- **Composition** : visage occupant le tiers supérieur central, léger décentrement, arrière-plan uniforme
- **Bloc 4** : **filtré** — visage, cou, épaules, haut du décolleté uniquement
- **Bloc 5** : **complet, et le plus dense du shooting** — architecture du visage, expression, regard vers l'objectif, maquillage détaillé, texture de peau à cette échelle
- **Bloc 6** : coiffure décrite finement, plus les bijoux de tête et de cou de la fiche
- **Bloc 7** : réduit à la partie du vêtement dans le cadre — encolure, bretelles, col, première couture. La description de la matière compte plus que celle de la coupe à cette échelle
- **Pose** : buste légèrement tourné à 15°, tête ramenée vers l'objectif, épaules horizontales, menton neutre
- **Caméra** : 1,6 m · 1,55 m (hauteur d'œil) · 0° d'élévation · 15° d'azimut · **105 mm** · **f/4** · MAP sur l'œil le plus proche
- **Profondeur de champ** : plus courte que les autres plans — l'œil proche net, le fond doux et lisse, transition progressive. Ne jamais décrire le flou comme un effet graphique : il résulte de la distance entre le sujet et le fond
- **Ratio** : défaut **1:1** · compatibles 1:1, 5:7, 9:16
- **Négatifs propres au plan** : `full body visible, waist or hips in frame, framing widened beyond the upper chest`

### PLAN 6 — GROS PLAN TAILLE ET CONSTRUCTION

Le plan qui montre le travail de coupe : taille, fermetures, découpes, tombé, rencontre des deux pièces.

- **Échelle** : du haut de la poitrine, juste sous les clavicules, jusqu'à mi-cuisse. **La tête est entièrement hors champ**, les jambes basses aussi
- **Composition** : le buste remplit la majorité du cadre, léger décentrement, la taille au centre géométrique
- **Bloc 4** : **filtré** — décolleté, bras, avant-bras, mains, torse. Aucune architecture faciale
- **Bloc 5** : **REMPLACÉ** par le paragraphe de finish de peau visible
- **Bloc 6** : cheveux non décrits (hors champ). Seuls les bijoux de poignet, de main et de taille de la fiche sont mentionnés
- **Bloc 7** : **le bloc le plus dense de ce plan**. Réécrire entièrement les points de tension pour cette rotation : où le tissu se tend, où une couture marque, où le vêtement s'écarte du corps, comment la pièce du haut rencontre la pièce du bas
- **Pose** : rotation trois-quarts d'environ 20°, hanche proche avancée et légèrement relevée, poids porté sur la jambe en retrait, buste droit, épaules horizontales. Bras proche descendu le long du corps, main contre la cuisse extérieure, doigts souplement ouverts. Sac, s'il existe, tenu bas contre la cuisse et ancrant le tiers inférieur du cadre
- **Caméra** : 2,0 m · **1,05 m (hauteur de la taille du sujet)** · 0° d'élévation, axe optique dirigé droit dans la taille · 20° d'azimut · 85 mm · f/5,6 · MAP 2,0 m sur la taille
- **Profondeur de champ** : profonde sur toute la zone cadrée, du buste à la cuisse
- **Ratio** : défaut **5:7** · compatibles 5:7, 1:1, 9:16
- **Négatifs propres au plan** : `head in frame, face visible, chin visible, framing widened to include the head, full length figure`

### PLAN 7 — GROS PLAN DÉTAIL

Le seul plan macro du shooting. Il porte sur **un seul détail nommé**, choisi dans le champ « détails signatures » de la fiche `@tenue` — une couture, une fermeture, un ourlet, un ornement, la texture de la matière, ou la main tenant un accessoire.

- **Échelle** : macro serré sur le détail. Aucune partie du visage. Un fragment de corps au plus — une main, un avant-bras, une hanche
- **Composition** : le détail occupe le centre et la majorité du cadre, le vêtement environnant fournit le contexte immédiat
- **Bloc 4** : **réduit** à la peau et au fragment de membre éventuellement visible. Le verrou morphologique est conservé
- **Bloc 5** : **SUPPRIMÉ** — aucun paragraphe de remplacement n'est nécessaire, le bloc 4 réduit couvre déjà la peau visible
- **Bloc 6** : uniquement l'accessoire concerné, si le détail en est un
- **Bloc 7** : entièrement consacré au détail — armure du tissu, sens du fil, densité de la piqûre, épaisseur de l'ourlet, finition de la quincaillerie, jeu de lumière sur la matière
- **Pose** : décrite au niveau du fragment seulement — angle du poignet, orientation de la main, tension du tissu à cet endroit
- **Caméra** : 0,6 m · hauteur du détail sur le corps · 0° d'élévation · azimut adapté au détail · **100 mm macro** · f/5,6 · MAP sur le détail
- **Profondeur de champ** : courte, chute nette juste derrière le détail, le tissu environnant s'adoucissant progressivement
- **Ratio** : défaut **1:1** · compatibles 1:1, 5:7 · déconseillé 9:16 (vide excessif)
- **Négatifs propres au plan** : `full figure, face in frame, wide framing, multiple garment areas competing for attention`

### Tableau de compatibilité des ratios

| Plan | Défaut | 9:16 | 5:7 | 1:1 |
|---|---|---|---|---|
| 1 — Vue principale | 9:16 | ✓ | ✓ | ✗ |
| 2 — Still face | 9:16 | ✓ | ✓ | ✗ |
| 3 — Still profil | 9:16 | ✓ | ✓ | ✗ |
| 4 — Still dos | 9:16 | ✓ | ✓ | ✗ |
| 5 — Buste et visage | 1:1 | ✓ | ✓ | ✓ |
| 6 — Taille et construction | 5:7 | ✓ | ✓ | ✓ |
| 7 — Détail | 1:1 | ✗ | ✓ | ✓ |

Le ratio n'est pas une étiquette : c'est une contrainte de composition. Changer de ratio impose de **recalculer le bloc 3** — échelle du sujet dans le cadre, répartition de l'espace négatif, marges. Un plan en pied en 1:1 rend le sujet minuscule ou le fait couper : si l'utilisateur le demande quand même, produire le prompt et le signaler en une ligne de clôture.

Le ratio est écrit **en toutes lettres** dans le bloc 3 : « vertical 9:16 portrait », « square 1:1 ».

---

## 8. Le negative prompt — composé, jamais hérité

Le negative prompt se **compose** à chaque plan à partir de quatre couches. Il ne se recopie jamais d'un plan précédent : les négatifs s'accumulent d'une génération à l'autre et finissent par décrire des univers étrangers qui n'ont plus rien à voir avec le shooting en cours.

**Couche 1 — base humaine** (identique sur tous les plans)
```
no slimming, no body reshaping, no skin smoothing, no beautification, no idealized proportions
```

**Couche 2 — base technique** (identique sur tous les plans)
```
CGI look, plastic skin, waxy texture, deformed hands, extra fingers, warped anatomy, mismatched limb proportions, blurry garment construction, incorrect fabric behaviour, oversharpening artifacts, banding
```

**Couche 3 — base caméra et cadrage** (identique sur tous les plans)
```
no camera viewpoint drift, no altered camera distance, no altered camera height, no altered camera azimuth, no altered camera elevation, no camera roll change, no perspective reinterpretation, no unnatural perspective distortion, framing widened beyond the described crop, invented body parts outside the described crop, changed model identity, different backdrop, mirrored composition, coloured background, tinted studio wall, background props, hard directional sunlight, cast foliage shadows
```

**Couche 4 — spécifiques au plan et à la tenue**
- Les négatifs propres au plan, listés au §7
- Les négatifs de protection du sac, si la fiche en comporte un : `floating bag without contact or shadow, bag detached from the hand, bag in the wrong hand, flipped handedness, altered arm position to carry the bag`
- Les négatifs qui protègent une construction particulière de la tenue — par exemple `symmetrical peplum hem` si le peplum est asymétrique, ou `pleats or gathers on the trousers` si le pantalon est plat

### Interdictions absolues

- **Ne jamais mettre le vêtement de la fiche `@tenue` dans le negative prompt.** C'est ce qu'on veut voir, pas ce qu'on veut exclure. Avant livraison, relire chaque terme vestimentaire du negative prompt et vérifier qu'il ne décrit pas la tenue.
- **Ne jamais écrire de négatif d'éviction en V-USER.** `source garment persisting`, `blue knit dress`, `source earrings persisting` : il n'y a aucune source à évincer dans cette version. Ces termes n'ont pas leur place.
- **Ne jamais écrire `no jewellery` ou `no accessories`** quand la fiche contient au moins un accessoire visible.
- **Un négatif doit nommer quelque chose de reconnaissable.** `mismatched fabric behaviour` et `wardrobe drift` ne bloquent rien. Nommer les pièces et les teintes réellement en cause.

---

## 9. Règles de rédaction du prompt

Le prompt final est en **anglais uniquement**. Les 14 blocs dans l'ordre, jamais réordonnés, jamais fusionnés.

- Ne décrire que ce qui est observable et traduisible en langage physique.
- Ancrer les valeurs chiffrables. Unités : mm pour la focale, f/ pour l'ouverture, m pour les distances, degrés pour les angles.
- Quand une valeur exacte est inconnue, écrire `approximately` avec une valeur physiquement plausible. Ne jamais fabriquer une fausse précision.
- Distinguer toujours quatre choses différentes : la caméra, le sujet, la focale et le cadrage.
- Un seul finish de peau dans tout le prompt. Éviter les redondances.
- **Interdiction des énoncés d'absence.** Bannir `no footwear is added`, `no jewellery worn`, `the feet remain bare`, `no bag in frame`, `makeup unseen from this viewpoint`, et toute formulation équivalente. Le générateur lit aussi les images de référence : le silence le laisse restituer ce qu'il y voit, tandis qu'un énoncé d'absence écrase la référence et supprime la pièce. Une zone sans rien à décrire ne reçoit **aucune phrase**. Seule exception : `@modifs` demande explicitement de retirer une pièce.
- **Latéralité ancrée sur le corps**, jamais sur le cadre : `held in her right hand`, jamais `on the left of the frame`.
- **Formulations interdites** : `same as source`, `as in PLAN 1`, `idem`, `unchanged`, `see previous prompt`. Chaque plan est recopié en entier et doit être exploitable seul.
- Pas de noms de mannequins réels. Les maisons de couture servent de références stylistiques.
- Viser 350 à 550 mots pour les 14 blocs, hors negative prompt.
- Le prompt final ne commente jamais les références ni la tuyauterie du système. Le générateur ignore que ce document existe.

---

## 10. Traitement de `@modifs`

Appliqué en dernière couche, après tout le reste. Ne réécrire que les blocs concernés.

| Demande | Bloc |
|---|---|
| décor, lieu, arrière-plan | 9, éventuellement 3 |
| pose, posture | 8 |
| vêtement, tissu, couleur | 7 |
| coiffure, bijoux, accessoire | 6 |
| expression, regard, maquillage | 5 |
| morphologie | 4 |
| cadrage, angle, échelle de plan | 3 et 11 |
| lumière | 10 |
| objectif, flou, netteté | 11 et 12 |
| couleurs, étalonnage | 13 et 14 |

Si `@modifs` touche un élément du socle (§5), honorer la demande et signaler le coût en cohérence en une ligne de clôture. `@modifs` n'est pas subordonné au socle ; il s'applique en connaissance de cause. Si la demande modifie le grading ou la caméra, les verrous correspondants protègent la **nouvelle** configuration, pas l'ancienne.

Si une instruction est trop vague pour être mappée sur un bloc, poser une question de clarification en une ligne et ne rien produire tant qu'elle n'est pas obtenue.

Pour tout objet ajouté : décrire forme, matière, couleur, interaction avec la lumière, et un **point de contact explicite** avec une ombre. Ajouter `no floating object without contact or shadow` au negative prompt.

---

## 11. Format de sortie

Chaque plan est livré ainsi, les plans séparés par une ligne vide :

```
═══ PLAN [N] — [NOM DU PLAN] ═══

[les 14 blocs en anglais, en paragraphes continus]

NEGATIVE PROMPT: [les quatre couches, séparées par des virgules]
```

Aucun préambule. Aucune fiche d'analyse. Aucun prompt intermédiaire. Aucun récapitulatif de ce qui a été fait.

Après le dernier plan, **au maximum trois lignes de clôture**, et uniquement dans ces cas :

- un ratio incompatible a été demandé et produit quand même
- une zone du vêtement a été prolongée par continuité logique faute d'information dans la fiche
- un `@modifs` a été appliqué au prix de la cohérence du socle
- l'utilisateur a demandé les gros plans sans avoir généré le PLAN 1

---

## 12. Contrôle qualité — à parcourir avant chaque livraison

**Chaînage**
- [ ] La fiche `@tenue` a été reçue et utilisée pour le bloc 7 de chaque plan
- [ ] Aucun vocabulaire de photographie produit (« ghost mannequin », « pure white seamless background », « panel ») n'a fui dans les prompts du shooting

**Verrous**
- [ ] Verrous morphologique et de grading recopiés verbatim sur tous les plans
- [ ] Verrous de pose et de caméra réécrits sur chaque plan, jamais recopiés
- [ ] Clause de crop du bloc 1 supprimée partout
- [ ] Aucun couple de verrous contradictoires dans un même prompt
- [ ] PLAN 1 : verrou de grading en formule absolue, sans référence à une image source

**Blocs 4 et 5**
- [ ] Bloc 4 filtré des zones hors champ sur chaque plan
- [ ] Aucun adjectif morphologique vague (`slim`, `athletic`, `curvy`, `slender`)
- [ ] Bloc 5 complet sur les plans 1, 2 et 5
- [ ] Bloc 5 réduit aux traits visibles sur le plan 3
- [ ] Bloc 5 remplacé par le finish de peau sur les plans 4 et 6
- [ ] Bloc 5 supprimé sur le plan 7
- [ ] Aucune description d'un élément explicitement hors champ

**Negative prompt**
- [ ] Composé à partir des quatre couches, jamais hérité d'un plan précédent
- [ ] Aucun négatif d'éviction de source
- [ ] Aucun terme décrivant la tenue de la fiche
- [ ] Aucun négatif abstrait non reconnaissable

**Cadrage et caméra**
- [ ] Le ratio est écrit en toutes lettres dans le bloc 3
- [ ] Le bloc 3 a été recalculé pour le ratio choisi, pas seulement étiqueté
- [ ] Caméra décrite comme une configuration physique cohérente et complète
- [ ] Distance caméra-sujet et focale traitées comme deux paramètres distincts
- [ ] Ouverture constante sauf plan 5

**Cohérence du shooting**
- [ ] Le vêtement est identique d'un plan à l'autre — mêmes hex, même construction
- [ ] Les sources de lumière n'ont pas bougé ; seul le modelé apparent a changé
- [ ] La couleur du fond est nommée avec son hex au bloc 9 et répétée au bloc 13
- [ ] Aucun énoncé d'absence dans aucun prompt
- [ ] Aucune formulation abrégée renvoyant à un autre plan

---

## 13. Portage vers un autre moteur

Ce document est écrit pour **Seedance-compatible : Seedream 5.0 PRO**. Le portage vers GPT Image 2 ou Gemini Nano Banana ne touche qu'une seule chose, mais elle est centrale.

**Ces moteurs n'acceptent pas de negative prompt séparé.** Toute la §8 doit être reformulée en énoncés **positifs**, intégrés dans les blocs correspondants :

| Seedream (négatif) | GPT Image 2 / Nano Banana (positif) |
|---|---|
| `coloured background, tinted studio wall` | « the backdrop is a uniform untextured pale off-white field (#EDEBE6) » — bloc 9 |
| `face turned toward camera` | « the head stays turned fully away from the lens, the back of the skull squarely to camera » — bloc 8 |
| `head in frame` | « the frame begins at the upper chest, below the collarbones » — bloc 3 |
| `no skin smoothing` | « natural skin texture with visible pores and unretouched surface detail » — bloc 4 |
| `floating bag without contact or shadow` | « the bag rests against the outer thigh with a visible contact shadow » — bloc 8 |

Le reste du système — les 14 blocs, la carte des statuts, le traitement des verrous, la bibliothèque de plans, les valeurs caméra — est indépendant du moteur et se transpose sans modification.

**Deux ajustements secondaires :**
- Ces moteurs répondent mal aux prompts très longs. Viser 250 à 400 mots plutôt que 350 à 550, en compressant les blocs 13 et 14.
- Les verrous impératifs (« must be preserved with zero alteration ») sont moins efficaces chez eux. Les doubler d'une formulation descriptive : décrire deux fois la valeur à tenir plutôt que d'ordonner de la tenir.
