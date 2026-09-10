# PRD — `/kits` · La page catalogue

**Auteur :** Stephen (Pôle Web SIFCA)
**Date :** 10 septembre 2026
**Statut :** Draft v1
**Route :** `/kits` — P0 dans l'arborescence du PRD site (§11)
**Référence visuelle :** capture Higgsfield Genjutsu du 10/09
**Documents liés :** `PRD.md` §6 (les deux familles), §11 (arborescence), §12 (P0-16) · `STUDIO_V0_TELECHARGEMENT.md` (la page kit elle-même)

---

## 1. Ce que fait vraiment la référence

La capture montre six mécanismes. Il faut les nommer séparément, parce qu'ils ne se transposent pas tous.

| # | Mécanisme | Ce qu'il produit |
|---|---|---|
| 1 | **En-tête à deux temps** — titre + une phrase à gauche, deux boutons à droite | On sait en une seconde ce qu'on regarde et quoi faire |
| 2 | **Grille dense en mosaïque**, gouttières fines, hauteurs variables | Une impression d'abondance et de production réelle |
| 3 | **Chaque tuile est une vidéo qui boucle**, sans son | C'est ce qui retient l'œil. Sur des images fixes, l'effet s'effondre |
| 4 | **La tuile survolée s'enrichit** : puce de catégorie en haut à gauche, icône d'agrandissement en haut à droite, barre d'action en bas | L'information arrive à la demande, pas d'un coup |
| 5 | **Les entrées sont montrées** — trois vignettes rondes dans la barre du bas | On comprend ce qu'il faut fournir pour obtenir ce résultat |
| 6 | **Un bouton d'action directement sur la tuile** — « Recreate » | On agit sans quitter la grille |

**Le vrai moteur, c'est le n°3 et le n°5.** Le mouvement retient, et montrer les entrées à côté du résultat explique le produit sans une ligne de texte. Le reste est de l'habillage.

---

## 2. Le problème que la référence ne pose pas, et que nous avons

**Higgsfield affiche des centaines de sorties. Nous aurons quatre à huit kits.**

Une mosaïque dense à quatre colonnes demande douze à vingt tuiles pour tenir debout. Avec quatre kits, la même grille donne quatre rectangles perdus dans du vide — l'effet exactement inverse de celui recherché.

**La sortie n'est pas de renoncer à la densité, c'est de comprendre que la référence mélange deux objets** que nous devons séparer :

- **Le catalogue** — ce qu'on peut télécharger. Il se compare, il se choisit. Il en faut peu et ils doivent être lisibles.
- **La preuve** — ce que la méthode produit. Il en faut beaucoup, et c'est elle qui porte la densité.

D'où la structure retenue : **deux zones sur la même page.**

| Zone | Contenu | Rôle |
|---|---|---|
| **A — Les kits** | 2 cartes par ligne en desktop, larges, chacune avec sa mosaïque interne | Le catalogue. On choisit ici |
| **B — La mosaïque de résultats** | Grille dense, tous kits confondus, chaque tuile cliquable vers son kit | La preuve. C'est elle qui donne l'effet de la capture |

La zone B résout trois choses d'un coup : elle donne la densité recherchée, elle fournit la preuve sociale, et elle crée une seconde porte d'entrée vers chaque page kit — celui qui n'a pas su choisir dans la zone A clique sur une image qui lui plaît.

---

## 3. Ce qui se transpose, et ce qui ne se transpose pas

| Mécanisme de la référence | Chez nous |
|---|---|
| Fond noir, images qui éclatent | **Non.** Fond `#F6F6F8`. Les images tiennent par le fond perdu et les filets de 1 px, pas par le contraste |
| Assombrir toutes les tuiles sauf celle survolée | **Non.** Un voile sombre sur une page claire salit tout. Seule la tuile active gagne sa barre d'action ; les autres ne bougent pas |
| Vignettes d'entrée **rondes** | **Carrées.** `border-radius: 0` est une règle du système, sans exception |
| Puce de catégorie | **Oui** — famille du kit, en DM Mono capitales, interlettrage 0,14 em |
| Bouton « Recreate » sur la tuile | **Oui, mais renommé et redirigé.** Voir §5 |
| Boucle vidéo par tuile | **Oui, sous une autre forme.** Voir §4 |
| Hauteurs libres en masonry | **Non.** Ratios imposés. Voir §6 |

---

## 4. Le mouvement — comment garder le n°3 sans vidéo

C'est le point technique central. Sans mouvement, la grille meurt ; avec des vidéos, la page devient inutilisable sur une 4G ivoirienne.

**La solution : le balayage avant / après.** Chaque tuile contient deux images superposées — la photo d'origine et le résultat — et une ligne de balayage qui passe de l'une à l'autre.

| Contexte | Comportement |
|---|---|
| Desktop, tuile survolée | Le balayage s'exécute une fois, 900 ms, `ease-out` |
| Mobile, tuile entrant dans le champ | Le balayage s'exécute une fois, déclenché par `IntersectionObserver` |
| `prefers-reduced-motion` | Aucun balayage. La tuile affiche l'état final, séparé par un filet vertical de 1 px |
| Pas de JS | Idem — l'état final est le défaut, le balayage est un enrichissement |

**Pourquoi c'est meilleur qu'une vidéo ici.** Deux JPEG coûtent quelques dizaines de kilo-octets contre plusieurs mégaoctets ; le balayage se fait en CSS pur, donc sans coût de décodage ; et surtout **il dit quelque chose** — une vidéo qui boucle montre un résultat, un balayage montre une transformation. C'est notre argument entier.

C'est la même mécanique que le `.image-wipe` déjà écrit dans `motion.css`. Ne pas en créer une seconde.

---

## 5. Anatomie d'une carte kit — zone A

```
┌──────────────────────────────────────────────┐
│ [MOSAÏQUE — 1 grande + 2 petites]            │  ← balayage avant/après
│                                              │     sur la grande
│  PHOTO · DÉBUTANT                            │  ← puce, DM Mono, en surimpression
├──────────────────────────────────────────────┤  ← filet 1 px
│ Transformez une photo de votre vêtement      │  ← Bodoni, la promesse
│ en plan de mode exploitable                  │
│                                              │
│ Une phrase de description. Ce que ça         │  ← Archivo, ink-soft
│ produit, en une ligne.                       │
│                                              │
│ ▪ ▪ ▪   Ce qu'il vous faut                   │  ← 3 vignettes carrées + libellé
│                                              │
│ Outil requis : Nano Banana · gratuit         │  ← DM Mono, le prérequis
│                                              │
│ [ Voir le kit ]                              │  ← encre pleine, angles droits
└──────────────────────────────────────────────┘
```

### Les trois vignettes d'entrée — le mécanisme le plus utile de la référence

Higgsfield montre les images sources qui ont produit le résultat. **Transposé chez nous, ça devient la réponse à la question que se pose tout visiteur : qu'est-ce que je dois fournir ?**

Trois carrés de 32 px, en filet de 1 px, avec un libellé au survol :

1. **La photo du vêtement** — ce qu'il a déjà, pris au téléphone
2. **La fiche mannequin** — fournie avec le kit
3. **Le décor** — fourni avec le kit

Le message passe sans une phrase : *deux tiers du travail sont déjà faits, il ne manque que ta photo.*

### Le bouton — pourquoi il ne télécharge pas

Dans la référence, « Recreate » agit depuis la grille. **Chez nous il ne doit pas.**

La page kit porte l'encart « Ce dont vous avez besoin » — outil requis, gratuit ou payant, coût mensuel — et le PRD site impose qu'il soit vu **au-dessus du formulaire** (P0-2). Un bouton de téléchargement dans le catalogue court-circuiterait exactement ça, et produirait des leads qui découvrent après coup qu'il leur faut un abonnement.

Donc : **`Voir le kit` → `/kits/[slug]`.** Toute la carte est cliquable, le bouton est la cible évidente. C'est aussi ce que tu as demandé.

---

## 6. La mosaïque de résultats — zone B

C'est elle qui porte l'effet de la capture.

**Pas de masonry libre.** Les hauteurs calculées en JavaScript provoquent des sauts de mise en page, comptés dans le CLS, et le catalogue doit rester comparable. À la place, un jeu de trois formats qui produit le même rythme avec un coût nul :

| Format | Ratio | Fréquence |
|---|---|---|
| Standard | 4:5 | 2 sur 3 |
| Haute | 4:5 sur deux rangées | 1 sur 6 |
| Large | 8:5 sur deux colonnes | 1 sur 6 |

Le format est un champ du résultat en base, choisi à la publication — pas un calcul.

**Quatre colonnes en desktop, deux en tablette, une en mobile.** Gouttières de 8 px, jamais plus : c'est la finesse des gouttières qui fait la densité.

**Chaque tuile porte, au survol :** la puce du kit dont elle provient, et rien d'autre. Cliquer mène à `/kits/[slug]`, ancré sur la galerie.

**Ordre :** mélangé, mais stable pour une même session — un ordre qui change à chaque rechargement empêche de retrouver une image qu'on avait repérée.

---

## 7. L'en-tête

Deux temps, comme la référence, mais dans notre registre.

```
LES KITS                                    [ La séance de jeudi ]
Des méthodes complètes pour produire vos
visuels mode par IA. Gratuites, testées,
utilisables dès aujourd'hui.

[ Photo ]  [ Vidéo ]  [ Tout ]
```

- **Titre** en Bodoni Moda — la seule occurrence de Bodoni de toute la page en dehors des titres de carte.
- **Une phrase**, pas deux, en Archivo `ink-soft`.
- **Un seul bouton à droite**, en vert WhatsApp : l'inscription à la séance hebdomadaire. C'est la seule action qui compte sur cette page, et le catalogue n'a pas de second appel à l'action.
- **Le filtre famille** — Photo / Vidéo / Tout — en DM Mono capitales. Filtre côté client, pas de rechargement, l'état dans l'URL (`?famille=photo`) pour que le lien soit partageable.

Le filtre n'apparaît qu'**à partir de trois kits publiés**. En dessous, il souligne le vide.

---

## 8. Système graphique

```
background  #F6F6F8      surface     #FFFFFF
ink         #0B0B0D      ink-soft    #56565F
rule        #DCDCE2      accent      #B7410E   (sienne brûlée)
whatsapp    #25D366      (bouton séance uniquement)
```

**Trois couleurs, trois rôles qui ne se recouvrent jamais.** L'encre porte toutes les actions — donc les boutons « Voir le kit ». Le vert WhatsApp porte la seule action qui compte — le bouton séance, une fois. La sienne brûlée est de l'identité, **jamais sur un bouton**, **une seule apparition sur la page** : le filet actif du filtre famille.

Bodoni Moda pour le titre de page et les titres de carte, jamais sous 24 px. Archivo pour le corps. DM Mono capitales, interlettrage 0,14 em, pour toutes les métadonnées — famille, niveau, prérequis, libellés d'entrée.

`border-radius: 0` partout. Aucune ombre. Filets de 1 px. **Les images vont au bord du conteneur** — aucune marge intérieure entre une image et son cadre.

---

## 9. Requirements

### Must-Have (P0)

| # | Exigence | Critères d'acceptation |
|---|---|---|
| K0-1 | `/kits` généré depuis la base, aucun contenu en dur | Given un kit publié en admin, When on visite `/kits`, Then il apparaît sans redéploiement |
| K0-2 | Zone A : carte par kit avec mosaïque, promesse, description, 3 entrées, prérequis, bouton | Given un kit publié, When la carte s'affiche, Then les six éléments sont présents |
| K0-3 | **La famille est identifiable en une seconde** — puce constante, même code sur la carte et sur la landing | Given un visiteur, When il regarde une carte, Then il sait si c'est photo ou vidéo sans lire |
| K0-4 | **Le prérequis outil et son coût sont visibles dès le catalogue** | Given un kit exigeant un outil payant, When la carte s'affiche, Then l'outil et l'ordre de grandeur mensuel sont lisibles |
| K0-5 | Carte entière cliquable vers `/kits/[slug]` | Given un clic n'importe où sur la carte, When il est capté, Then la landing s'ouvre |
| K0-6 | **Aucun téléchargement depuis le catalogue** | Given un audit de la page, When on cherche un formulaire ou un lien de fichier, Then il n'y en a aucun |
| K0-7 | Balayage avant/après : survol en desktop, `IntersectionObserver` en mobile | Given une tuile entrant dans le champ sur mobile, When elle est visible à 50 %, Then le balayage s'exécute une fois |
| K0-8 | **Contenu visible sans JS et sans animation** | Given `prefers-reduced-motion` ou JS désactivé, When la page charge, Then toutes les images et tous les textes sont lisibles |
| K0-9 | Zone B : mosaïque de résultats, format en base, chaque tuile cliquable vers son kit | Given un résultat publié, When on clique, Then la landing du kit correspondant s'ouvre |
| K0-10 | Filtre famille côté client, état dans l'URL, affiché **à partir de 3 kits** | Given `?famille=video`, When la page charge, Then seuls les kits vidéo sont affichés et le lien est partageable |
| K0-11 | Un seul bouton WhatsApp sur la page — inscription à la séance, avec code unique | Given un clic, When WhatsApp s'ouvre, Then le message pré-rempli contient un code résolvable |
| K0-12 | Système graphique appliqué, **une seule apparition de la sienne brûlée** | Given un audit visuel, When on compte les usages de `#B7410E`, Then il y en a exactement un |
| K0-13 | **CLS proche de zéro** — ratios déclarés, aucune hauteur calculée en JS | Given un audit Lighthouse mobile, When il s'exécute, Then CLS < 0,05 et Performance ≥ 85 |
| K0-14 | Images en AVIF/WebP, chargement différé hors du premier écran, LCP < 2,5 s en 4G | Given une visite mobile, When la page charge, Then le premier écran est complet en moins de 2,5 s |
| K0-15 | Responsive : 4 / 2 / 1 colonnes, testé à 360 px | Given 360 px, When on parcourt la page, Then aucun débordement horizontal |
| K0-16 | Admin : publier un kit, choisir sa mosaïque, publier un résultat avec son format et son kit d'origine | Given un résultat créé en admin, When il est publié, Then il apparaît en zone B au bon format |

### Nice-to-Have (P1)

| # | Exigence | Notes |
|---|---|---|
| K1-1 | Icône d'agrandissement sur les tuiles de la zone B, ouvrant une vue plein écran | Le n°4 de la référence. Utile pour juger la qualité — c'est notre argument |
| K1-2 | Filtres supplémentaires : outil requis, niveau, sous-catégorie mode | Utile à partir de ~8 kits, pas avant |
| K1-3 | Bandeau « nouveau » sur les kits de moins de 14 jours | Donne une raison de revenir |
| K1-4 | Compteur de téléchargements par kit | Preuve sociale — **seulement au-delà de 50, en dessous ça décourage** |
| K1-5 | Ordre de la zone B pondéré par le kit le moins téléchargé | Rééquilibre l'attention vers les kits qui en manquent |

---

## 10. Modèle de données

Aucune table nouvelle du côté des kits. Une table pour la zone B.

```
kits                        -- existe déjà (PRD site, P0-16)
  + card_layout             -- 'mosaique' | 'simple'
  + before_image_path       -- la photo d'origine, pour le balayage
  + after_image_path        -- le résultat
  + input_thumbs (json)     -- 3 entrées : {path, label}

kit_results                 -- la zone B
  id, kit_id,
  image_path,
  before_image_path,        -- optionnel : active le balayage sur cette tuile
  format,                   -- 'standard' | 'haute' | 'large'
  caption,                  -- optionnel, affiché au survol
  rights_status,            -- provenance : notre production, ou accord écrit du client
  position, published, created_at
```

**`rights_status` sur les résultats, pour la même raison que sur les mannequins.** Une image produite pour un client ne va pas dans la galerie publique sans son accord écrit — c'est ce que promet la page « Travailler ensemble », et c'est la deuxième fois que cette promesse s'applique à nous-mêmes.

---

## 11. Ce qu'on mesure

Cette page n'a qu'un seul travail : **envoyer vers une landing kit.** Tout le reste est décoratif.

| Indicateur | Cible | Ce qu'il dit |
|---|---|---|
| **Taux de clic `/kits` → `/kits/[slug]`** | **≥ 45 %** | La métrique de la page. Sous 30 %, les promesses des cartes sont mauvaises |
| Répartition des clics entre zone A et zone B | à mesurer | Si la zone B domine largement, les cartes ne remplissent pas leur rôle et il faut les réécrire |
| Répartition des clics par kit | à mesurer | Un kit qui ne reçoit jamais de clic a un problème de titre, pas de contenu |
| Taux de rebond depuis `/kits` | ≤ 40 % | Au-dessus, la page ne donne pas envie d'ouvrir quoi que ce soit |
| Usage du filtre famille | à mesurer | S'il n'est jamais utilisé, il encombre : le supprimer |
| Part de trafic direct sur `/kits` vs `/` | à mesurer | Dira si le catalogue mérite d'être une destination ou reste un passage |

**Le titre de chaque carte annonce un résultat, jamais une technique.** « Kit Animation » est un nom d'outil ; « Transformez vos photos de collection en films de campagne » est une promesse. La répartition des clics par kit mesure exactement ça.

---

## 12. Instructions à Antigravity

1. Route `/kits` en Server Component, données chargées depuis D1. Aucun contenu en dur.
2. Deux zones distinctes dans le DOM — zone A `<section>` catalogue, zone B `<section>` galerie. Pas de composant commun : leurs cartes n'ont ni le même contenu ni le même rôle.
3. **Ratios déclarés en CSS** (`aspect-ratio`), jamais de hauteur calculée en JavaScript. Aucun masonry.
4. Balayage avant/après en CSS, réutilisant `.image-wipe` de `motion.css`. Déclencheur : `:hover` en desktop, `IntersectionObserver` en mobile. **L'état final est le défaut** — le balayage s'ajoute, il ne conditionne rien.
5. `next/image`, AVIF/WebP, `priority` sur les deux premières cartes seulement, `loading="lazy"` partout ailleurs.
6. Filtre famille en composant client, état synchronisé avec l'URL (`?famille=`). Le rendu initial reste serveur.
7. Un seul lien `wa.me`, avec code unique généré côté serveur, intention « inscription séance ».
8. Système graphique du site. Bodoni au titre de page et aux titres de carte. **Une seule apparition de `#B7410E` sur toute la page.**
9. Testé à 360 px en réseau lent. LCP < 2,5 s, CLS < 0,05.

**Ordre de construction :** la carte kit seule, en dur, jusqu'à ce qu'elle soit juste · la zone A branchée sur la base · le balayage · la zone B · le filtre.

> Ne commence pas par la mosaïque. **C'est la carte kit qui envoie sur la landing, et c'est la landing qui produit les leads.** La zone B est ce qui rend la page belle ; la zone A est ce qui la rend utile. Si la carte est bonne, une page sans mosaïque fonctionne. L'inverse n'est pas vrai.
