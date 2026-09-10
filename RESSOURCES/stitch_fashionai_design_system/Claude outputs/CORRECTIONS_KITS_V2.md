# Corrections — catalogue kits, itération 2

**Date :** 10 septembre 2026
**Sur :** la version mobile 390 px générée après les neuf corrections

---

## Ce qui est réglé

Les prix ont disparu, remplacés par la ligne outil. Les filtres sont `TOUT · PHOTO · VIDÉO`, sans boîtes, l'actif souligné en sienne — et c'est bien la seule sienne de la page. La carte a sa ligne prérequis, son titre Bodoni 26 px, ses trois vignettes carrées de 32 px sous « CE QU'IL VOUS FAUT », et son bouton encre plein. La zone B existe, en deux colonnes, gouttières de 8 px, trois formats. Plus de noir et blanc, plus d'icônes, bandeau aligné à gauche, `© 2026`. Le `border-radius: 0 !important` et le `box-shadow: none !important` en tête de feuille sont une bonne idée : garde-les.

**Onze des seize P0 sont tenus.** Restent cinq points, dont deux qui touchent au système et deux au produit.

---

## 1. SYSTÈME — le fond de page est devenu blanc

```css
body { background-color: #FFFFFF; }
```
et dans la configuration : `surface: '#FFFFFF'`, `paper: '#FFFFFF'`. **Le jeton `background: #F6F6F8` a disparu.**

Ce n'est pas un détail de nuance. Sans ombres, **c'est l'écart entre le fond `#F6F6F8` et les surfaces `#FFFFFF` qui crée toute la profondeur du système**. Tout en blanc, la hiérarchie s'effondre : plus rien ne se détache, les cartes flottent sans ancrage, et il ne reste que les filets pour structurer.

**Deux jetons ont aussi changé de valeur en silence :**

| Jeton | Valeur trouvée | Valeur du système |
|---|---|---|
| `ink-soft` | `#6E6E73` | **`#56565F`** |
| `rule` | `#E5E5EA` | **`#DCDCE2`** |

Ce sont des gris système Apple, pas les tiens. Pris isolément c'est invisible ; recopiés dans la configuration Tailwind par Antigravity, ils deviennent la vérité du site.

```
Restore the exact colour tokens: background '#F6F6F8' (page
background, set it on body), surface '#FFFFFF' (cards and
raised blocks only), ink '#0B0B0D', ink-soft '#56565F',
rule '#DCDCE2', sienna '#B7410E', whatsapp '#25D366'.
The body background must be #F6F6F8, never white — the
contrast between the two is what creates depth in a system
with no shadows.
```

---

## 2. PRODUIT — les outils annoncés ne feraient pas fonctionner tes kits

```
OUTIL REQUIS — MIDJOURNEY V6 · PAYANT
OUTIL REQUIS — STABLE DIFFUSION · GRATUIT
OUTIL REQUIS — RUNWAY GEN-3 · PAYANT
```

Cette ligne n'est pas décorative : **c'est une promesse technique.** Ton pipeline repose sur le **conditionnement multi-références** — la scène, le mannequin, le triptyque, tous passés ensemble au générateur. Un lead qui télécharge le kit, s'abonne à l'outil annoncé et découvre qu'il ne sait pas faire ce que la méthode demande, il ne s'en prendra pas à l'outil : il s'en prendra à toi.

Les outils que tu as réellement documentés dans `INSTALLATION_CHATGPT_GEMINI.md` et `FLOW_AGENT_MODE.md` sont **ChatGPT, Gemini, Google Flow et Seedream**. Ce sont ceux qui doivent apparaître.

Même remarque sur les titres. « KIT ÉDITORIAL STUDIO » est une catégorie, pas une promesse — et ton propre PRD site le dit : *« Le titre doit annoncer le résultat, pas la technique. »* La phrase que j'avais mise dans le prompt a été remplacée par une description de style.

```
Replace all six kit titles and tool lines with these, verbatim:

1. PHOTO · DÉBUTANT — "Transformez une photo de votre
   vêtement en plan de mode exploitable"
   OUTIL REQUIS — CHATGPT OU GEMINI · GRATUIT
2. PHOTO · INTERMÉDIAIRE — "Obtenez le dos de votre pièce
   sans la photographier"
   OUTIL REQUIS — GEMINI · GRATUIT
3. PHOTO · INTERMÉDIAIRE — "Une série cohérente pour votre
   fiche produit : face, trois-quarts, dos"
   OUTIL REQUIS — SEEDREAM · PAYANT
4. VIDÉO · DÉBUTANT — "Animez un visuel de collection en
   plan de campagne"
   OUTIL REQUIS — GOOGLE FLOW · PAYANT
```

Quatre kits, pas six. Le PRD site dit *« 4 à 8 kits excellents valent mieux qu'un catalogue creux »* — et quatre cartes qui disent vrai valent mieux que six qui inventent.

---

## 3. La famille n'est pas identifiable (K0-3)

La ligne DM Mono au-dessus du titre porte l'outil, pas la famille. Rien ne dit si on regarde de la photo ou de la vidéo — c'est un P0 du PRD et une règle du PRD site : *« Un visiteur doit savoir en une seconde s'il regarde de la photo ou de la vidéo. »*

**Et j'avais mal spécifié ce point.** Mon prompt demandait une pastille en surimpression sur l'image, alors que ton propre système dit l'inverse : *« Information overlays on images should be avoided; place text in an adjacent grid cell or below the image. »* C'est le système qui a raison.

```
Above each card title, put TWO DM Mono 10px uppercase lines,
not one:
  line 1, in ink: the family and level — "PHOTO · DÉBUTANT"
  line 2, in ink-soft: the tool — "OUTIL REQUIS — CHATGPT
  OU GEMINI · GRATUIT"
No overlay on the image. Never put text on top of a photo.
```

---

## 4. Le balayage avant / après manque toujours (K0-7)

**Oubli de ma part : il n'était dans aucune des neuf corrections.** C'est pourtant le mécanisme central de la page — celui qui remplace la vidéo en boucle de la référence, et le seul qui *montre* une transformation au lieu d'un résultat.

```
The 4:5 image at the top of each card is a before/after
split, not a single photograph. Draw a crisp vertical 1px
ink rule at one third from its left edge. On the left third,
a dull phone-shot photo of a garment on a cluttered domestic
background. On the right two thirds, the polished studio
fashion result. Same garment, same colour, same piece on
both sides — it must read as one photograph transformed,
not two different pictures. No label, no caption, no slider
handle.
```

---

## 5. Le bandeau WhatsApp est redevenu une agence

```
COLLABORATION SUR-MESURE
RÉSERVER UNE SÉANCE
Discutez de votre projet avec notre direction artistique et
recevez un kit adapté pour votre marque.
[ CONTACTER PAR WHATSAPP ]
```

« Réserver une séance » se lit ici comme *réserver un shooting*. Or la séance, dans ton dispositif, c'est **la formation de groupe du jeudi** — la seule raison d'écrire qui se renouvelle chaque semaine, sans que tu inities jamais et sans payer un message. C'est le moteur de récurrence du site entier, et il vient d'être transformé en prise de rendez-vous commerciale.

```
Rewrite the WhatsApp band:
  DM Mono label: "CHAQUE JEUDI, 18H"
  Bodoni Moda 28px: "Une séance de groupe pour débloquer
  votre cas"
  Archivo 14px: "Une heure en ligne, gratuite, sur
  inscription. Vous venez avec un visuel qui ne marche pas,
  vous repartez avec la solution."
  WhatsApp-green button: "Je m'inscris sur WhatsApp"
```

---

## 6. Deux détails à corriger au passage

**Les cartes ont une bordure.** `<article class="border border-rule">` — le prompt l'interdisait explicitement. Les filets séparent, ils n'encadrent pas. Supprime la bordure de l'article ; garde le filet horizontal au-dessus du bloc « ce qu'il vous faut ».

**Le lien WhatsApp est vide** (`href="https://wa.me/"`). Normal sur une maquette, mais à noter pour le développement : le numéro **et le code unique** sont un P0 du PRD site.

---

## Pour Antigravity, plus tard

Trois choses de cette maquette ne doivent pas passer en production : `width: 390px` et `overflow-hidden` sur le `body` (artefacts de maquette), la CDN Tailwind (à remplacer par la vraie configuration), et `auto-rows-auto` sur la mosaïque — les tuiles `row-span-2` n'ont pas de ratio déclaré et leur hauteur dépendra du contenu voisin. En production, ratios explicites sur les trois formats, sinon le CLS remonte.

---

## Ensuite

Une fois ces six corrections passées, demande la version desktop :

```
Now generate the 1440px desktop version of this same page.
Zone A becomes 2 columns with a 48px gap, zone B becomes 4
columns. Page header and WhatsApp button share one row.
Outer margins 80px, content max-width 1280px. Same content,
same rules, same French copy.
```
