# Système d'animation — fashionai.agency

**Version :** 1.0 · 26 août 2026
**À lire avant** `motion.css`, `motion.ts` et les fiches `pages/`.

---

## 1. La contrainte qui décide de tout

Le PRD fixe un objectif de **LCP sous 2,5 s en 4G mobile**, sur une audience ouest-africaine majoritairement sur téléphone d'entrée de gamme. Une bibliothèque d'animation lourde n'est pas un choix esthétique discutable ici — c'est un échec produit.

Deuxième contrainte, esthétique celle-là : le site est un **magazine de mode**, pas une démo technique. Le mouvement doit être invisible en tant que mouvement. Si un visiteur remarque l'animation, elle est ratée.

---

## 2. La stack retenue

### Couche 1 — CSS natif (90 % du site)

**Scroll-driven animations** (`animation-timeline: view()`) et **View Transitions API**.

- **Coût en JavaScript : zéro.** Rien à télécharger, rien à parser, rien à exécuter.
- **Animations sur le compositeur**, pas sur le thread principal — fluides même sur un appareil modeste.
- **Dégradation parfaite.** Chrome et Edge : support complet. Safari 17+ : support partiel. Firefox : en cours début 2026. Là où ce n'est pas supporté, **l'animation ne joue pas et le contenu reste visible**. Aucun code de repli à écrire.

C'est ce qui couvre toutes les révélations au scroll, tous les tracés de filets, toutes les transitions entre pages.

### Couche 2 — Motion, version mini (les 10 % restants)

Pour ce que le CSS ne fait pas : le menu mobile, la façade vidéo, les chips de qualification, les états de formulaire.

**`animate()` mini de [Motion](https://motion.dev) : 2,6 ko.** Tree-shakable, MIT, accélération GPU native.

### Pourquoi pas GSAP

GSAP pèse **23,5 ko** contre 2,6 pour ce dont on a besoin — soit neuf fois plus pour un usage marginal. Il est closed-source, propriété de Webflow, avec une licence qui interdit l'usage dans un outil concurrent de Webflow et que Webflow peut révoquer à sa discrétion. Et il ne bénéficie pas de l'accélération GPU native.

GSAP reste excellent pour des timelines complexes et mutables. Ce site n'en a aucune.

### Ce qu'on n'installe pas

**Lenis / smooth scroll JS** — détourne le défilement natif, casse l'accessibilité, coûte du thread principal. Le défilement du navigateur est déjà bon.

**AOS, WOW.js, ScrollReveal** — remplacés intégralement par la couche 1.

**Lottie** — aucun besoin d'illustration animée.

---

## 3. Les jetons de mouvement

```
--dur-fast    180ms   états d'interface : survol, focus, chips, champs
--dur-base    600ms   révélations au scroll — la durée par défaut
--dur-slow    900ms   le hero uniquement, au chargement
--stagger      60ms   décalage entre éléments d'un même groupe

--ease-out    cubic-bezier(.2, .7, .3, 1)    sorties et révélations
--ease-inout  cubic-bezier(.6, 0, .2, 1)     déplacements et bascules
```

Aucun ressort, aucun rebond, aucun élastique. Un magazine ne rebondit pas.

---

## 4. Les quatre gestes du site

Tout le mouvement du site tient en quatre gestes. **Aucun cinquième ne doit être inventé** — c'est cette contrainte qui donne l'impression d'une seule main.

### `.reveal` — le fondu-montée
Opacité 0 → 1, translation Y de 10 px, 600 ms. Le geste par défaut, sur les titres, les paragraphes, les blocs.

### `.rule-draw` — le filet qui se trace
Un filet 1 px passe de `scaleX(0)` à `scaleX(1)`, ancré à gauche, 600 ms. **C'est le geste signature du site** : la grille éditoriale se construit sous les yeux du lecteur au lieu d'apparaître. À réserver aux séparateurs de section.

### `.image-wipe` — l'image qui se dévoile
`clip-path: inset(100% 0 0 0)` → `inset(0)`, du bas vers le haut, 900 ms. **Une photo de mode se dévoile comme un rideau, elle n'apparaît pas en transparence.** Un fondu sur une image de mode fait cheap ; un dévoilement fait éditorial. C'est le détail qui sépare les deux.

### `.count-in` — l'entrée décalée
Applique `.reveal` aux enfants directs avec un décalage de 60 ms. **Plafonné à 5 éléments** — au-delà, le dernier arrive trop tard et l'effet devient de l'attente.

---

## 5. Règles absolues

**Le contenu est visible par défaut.** Aucune animation ne conditionne l'affichage. Si le JS échoue, si le CSS n'est pas supporté, si l'utilisateur a désactivé le mouvement : la page est complète et lisible. Ce point n'est pas négociable — un lead perdu parce qu'une animation n'a pas joué est un échec total.

**Rien n'anime au-dessus de la ligne de flottaison au scroll.** Le hero joue une animation de chargement, pas une animation de défilement. Un élément déjà visible qui attend d'apparaître est une erreur qu'on voit immédiatement.

**Le bouton WhatsApp n'anime jamais à l'entrée.** Il est là, tout de suite, à pleine opacité. C'est la seule action qui compte : elle ne se mérite pas au scroll.

**`prefers-reduced-motion` coupe tout.** Pas d'atténuation, pas de version douce — les animations sont désactivées et les états finaux appliqués directement.

**Aucune animation ne déplace la mise en page.** Uniquement `opacity`, `transform`, `clip-path`. Jamais `height`, `margin`, `top` — ça déclenche des recalculs et ça pénalise le CLS.

**Le curseur reste le curseur du système.** Pas de curseur personnalisé, jamais.

---

## 6. Ce qui est interdit

| Interdit | Pourquoi |
|---|---|
| Parallaxe | Coût thread principal, tape-à-l'œil, incompatible LCP |
| Rotation, `scale` au-delà de 1,02 | Registre publicitaire, pas éditorial |
| Rebond, élastique, ressort | Un magazine ne rebondit pas |
| Transitions de page longues (> 300 ms) | Chaque milliseconde entre le clic et la page coûte des leads |
| Compteurs animés sur les chiffres | Gadget. La grande date de la séance se révèle, elle ne s'incrémente pas |
| Effets au survol sur mobile | L'état de survol n'existe pas au doigt |
| Défilement horizontal automatique | Vole le contrôle au lecteur |
| Animation d'un élément de formulaire pendant la saisie | Distrait au pire moment |

---

## 7. Structure des fichiers

```
_animation/
  ANIMATION.md              ← ce document
  motion.css                ← la couche CSS, prête pour la production
  motion.ts                 ← les helpers Motion pour l'interactif
  pages/
    01-kit-landing.md       ← priorité absolue
    02-merci.md
    03-catalogue.md
    04-seance.md
    05-travailler-ensemble.md
    06-accueil.md
    07-admin.md
  ANTIGRAVITY_PROMPT.md     ← le brief de développement
```

Chaque fiche `pages/` liste, section par section, **quelle classe s'applique à quel élément et avec quel délai**. C'est ce qui permet à un développeur — ou à Antigravity — d'implémenter sans réinterpréter.

---

## 8. Comment vérifier que c'est réussi

- **Lighthouse mobile ≥ 85** en Performance, avec CLS à 0.
- **Onglet Performance de Chrome :** aucune tâche longue déclenchée par le défilement.
- **Le test du réseau lent :** en 3G simulé, la page reste lisible et utilisable pendant tout le chargement.
- **Le test de l'œil :** un visiteur qui parcourt la page ne doit pas être capable de décrire une seule animation. S'il en remarque une, elle est trop forte.

Sources : [Motion vs GSAP](https://motion.dev/docs/gsap-vs-motion) · [Scroll-driven animations et View Transitions en 2026](https://www.frontendhorizon.com/blog/view-transitions-api-and-css-scroll-driven-animations-the-browser-wins-of-2026)
