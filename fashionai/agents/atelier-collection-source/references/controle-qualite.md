# Contrôle qualité, rédaction, retouches et cascade

## Règles de rédaction des prompts

- **R1 Convention image.** Gauche/droite du point de vue du spectateur, à l'intérieur d'un panneau. Jamais « wearer's left ». Une vue se désigne par FRONT / BACK.
- **R2 Mesures et comptages.** Toute bordure, fente, motif ou élément reçoit une taille en cm ; tout élément répété un comptage exact (« exactly five »).
- **R3 Borner.** Tout volume dit ce qu'il n'est pas (« NOT a ball gown, no petticoat », « NOT flared, NOT an A-line »).
- **R4 Triple ancrage des longueurs :** cm + repère du corps + comparaison (« 78 cm, hem at mid-thigh, level with the fingertips »). Hauteurs d'ourlet et de fente cotées depuis le sol. Pièce qui descend au sol : préciser ce qui dépasse (« only the pointed toes show »).
- **R5 Zones imprimées fermées :** liste des zones, puis « Everywhere else is solid fabric, with no print at all ». Ouverture sur imprimé : départ, largeur maximale, « never above [repère] ».
- **R6 Plafond d'ornement** avec compte exact des pièces décoratives et des accessoires.
- **R7 Ancrages et terminaisons** de tout élément libre : départ, trajet, fin.
- **R8 Couleurs.** Hex partout. Or ou ocre de tissu ou de fil = MAT ; seul le métal brille. La lumière ne change jamais la teinte d'un vêtement ; nommer la dérive à éviter (« never black », « never yellow »).
- **R9 Ne jamais nommer un élément absent** là où il doit être absent : décrire ce qu'on y voit.
- **R10 Blocs recopiés mot pour mot :** blocs ADN, Fiche Muse, Bloc Décor, Blocs Accessoires, bibliothèque de rendu.
- **R11 Première ligne** (version ChatGPT) : avec références, « Use ONLY the reference images listed below, in this order. Ignore every other image in this conversation. » ; sans référence, « Text-to-image: use NO image from this conversation as a reference. »
- **R12 Références.** Une ligne IMAGE par image réellement jointe ; « The written description below always wins ». Jamais une planche entière ni une tuile avec du texte. Si le nombre d'images change, renumérote et préviens le créateur.
- **R13 Cadrage en pied.** « from the top of the head to the soles of the shoes, nothing cropped, feet and floor visible in the lowest 8 % ».

## Verdict

Une ligne : ✅ validée / ✅ᵗ validée avec tolérance / ⚠️ 1 point à corriger / ❌ à refaire ; le défaut en français ; puis tu proposes la correction et tu la lances après accord. Au plus 2 cycles sur un même point ; au troisième, change d'approche (reformulation complète, solution de construction, panneau seul) et dis-le.

## Tolérance écrite — accepter plutôt que retoucher

Si l'écart entre dans la tolérance : verdict ✅ᵗ, écart nommé en une ligne, **fiche mise à jour d'après l'image** (« mis à jour d'après le prototype »), on avance. Le créateur peut toujours exiger la retouche.

**Toléré** (si cohérent sur toutes les vues) :
- longueur à ± 3 cm si le repère du corps reste juste ;
- comptage à ± 1-2 sur un élément répété non constant, ou élément caché par la construction ;
- rendu de matière un peu différent, dans la même famille ;
- accessoire ou décor interprété autrement mais cohérent avec le bloc (bloc mis à jour) ;
- pose légèrement différente sans cacher l'ADN.

**Jamais toléré** : identité de la muse ; couleur de vêtement hors de son hex ; élément d'ADN absent, mauvaise variante, constante ★ invisible ; règle d'ouverture violée ; fermeture impossible ou pièce qui ne s'enfile pas ; panneau coupé ou mise en page fausse ; texte ou logo dans l'image.

Un écart toléré sur le look fondateur devient la norme pour les suivants (prompt maître mis à jour).

## Table des défauts

| Défaut | Correctif |
|---|---|
| Image dans un autre format que celui demandé | Rappeler « landscape 3:2 » en tête d'OUTPUT ; recadrer par Python si l'écart est faible |
| L'outil reprend une image ancienne de la conversation (contamination) | Première ligne R11 ; faire joindre les références au message « go » ; si ça persiste, conversation neuve avec le pack de reprise |
| L'outil refuse le prompt | Reformuler les mots ambigus ; ne rien contourner ; expliquer en une ligne |
| Forme différente du dessin à plat | Vérifier la concordance des versions ; renforcer OUTFIT (R3, R4) |
| Longueur fausse | R4 : triple ancrage + ce qui dépasse de l'ourlet ; une seule longueur par retouche |
| Élément d'ADN différent de sa tuile, mauvaise variante | Corriger le bloc ADN (vaut pour toute la collection) ; nommer ce qu'il n'est PAS |
| Comptage qui dérive | R2 « exactly N » ; après 2 dérives, solution de construction ou tolérance |
| Imprimé qui s'ouvre trop haut ou trop large | R5 : « closed above the knee, print only in the lowest 20 cm, max 6 cm at the hem » |
| Imprimé agrandi, réorganisé, qui déborde | R2 + R5 |
| Couleur virée par la lumière | R8 ; nommer la dérive |
| Muse différente | Fiche Muse mot pour mot + `ref_muse` ; en IMAGE 5, le prototype fondateur |
| Coiffure de la planche muse reprise | Ligne IMAGE 4 : « her hair is styled as described below » |
| Décor, lumière, cadrage qui dérivent | Bloc Décor mot pour mot ; IMAGE 5 = prototype fondateur |
| Accessoire ajouté ou changé | R6 + Bloc Accessoire mot pour mot |
| Détail masqué par un bras | « never hide [élément] » ; changer de main |
| Panneau A ou B coupé | R13 ; panneau seul en 2:3, remplacé par Python |
| Colonnes mal réparties, gros plans manquants | Rappeler 35 / 35 / 30 % ; « three stacked macros of equal height » |
| Dos qui contredit le dessin | Dos en surfaces continues (R9) ; IMAGE 1 vue BACK pour le panneau B |
| Trait bleu de fermeture recopié | « build a real, discreet closure » |
| Style dessiné repris du dessin à plat | « ignore its flat drawing style » |
| Texte, légende ou logo dans l'image | Retirer ; texte posé par Python |
| Rendu lisse, plastique, 3D | Bloc réalisme renforcé |
| Paire : un détail passe d'un look à l'autre, tailles différentes | « never share or swap any element » ; « each outfit occupies exactly one half » ; sinon look seul |
| Line-up 2D : figures fusionnées, hauteurs différentes | Ordre gauche-droite répété ; SCALE LOCK |
| Planche kit : case ratée, imprimé trop petit ou redessiné | Retouche de la case seule ; imprimé en bloc 2×2 ; après 2 échecs, case seule |

## Cascade — ce qui devient faux quand quelque chose change

| Ce qui change | À refaire, dans l'ordre |
|---|---|
| Fiche Collection (palette, matière, bloc ADN, muse, Bloc Décor, Bloc Accessoire) | Cases concernées de la planche kit → prototypes concernés (tu listes et demandes) → line-up → planches → lookbook |
| Fiche technique (forme, zone, ADN, couture, dos, fermeture) | Dessin à plat du look seul → récapitulatif (Python) → prototype → line-up → planches → lookbook |
| Fiche technique (couleur seule) | Dessin à plat du look seul → récapitulatif → prototype (retouche) → line-up → planches → lookbook |
| Prototype (retouche ou panneau) | Line-up → planche du look → lookbook |
