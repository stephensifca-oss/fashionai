# Prompt de démarrage — à coller dans Antigravity

---

Tu vas développer **fashionai.agency**, un site de génération de leads pour un studio de production photo et vidéo de mode assistée par IA, basé à Abidjan.

## Avant d'écrire la moindre ligne de code

Lis ces fichiers, dans cet ordre :

1. `PRD.md` — le produit complet : objectifs, exigences P0/P1, modèle de données, scoring, métriques
2. `_animation/ANTIGRAVITY_PROMPT.md` — le brief technique, la stack imposée et les corrections à appliquer
3. `_animation/ANIMATION.md` — le système de mouvement et ses interdits
4. `_animation/pages/01-kit-landing.md` — le mouvement de la page qu'on construit en premier
5. `kit_landing_page_mobile/code.html` et `kit_landing_page_desktop/code.html` — les maquettes Stitch

**Ordre d'autorité en cas de contradiction : le PRD gagne toujours.** Les fichiers Stitch sont des maquettes — elles montrent l'intention visuelle et la structure, elles ne dictent pas l'architecture. Ne recopie jamais leur code tel quel en production.

## Ce que tu construis maintenant — et rien d'autre

**Phase 1 uniquement : le socle de capture.**

- Le projet Next.js 15 (App Router) avec la stack imposée
- Le schéma D1 complet tel que défini dans le PRD, section « Modèle de données »
- **Une** landing kit fonctionnelle sur `/kits/[slug]`, générée depuis la base
- Le formulaire : Prénom, WhatsApp (normalisé E.164), Email, consentement — en Server Action
- La génération et la persistance du code WhatsApp à 5 caractères, avec son intention
- Le token signé 24 h et la route de livraison des deux fichiers
- L'email transactionnel via Resend
- La page de remerciement `/merci/[slug]` avec ses trois CTA WhatsApp et la qualification

**Objectif de la phase : un lead réel capturé de bout en bout, et un message WhatsApp reçu portant son code.** Tant que ça ne marche pas, rien d'autre ne compte.

**Ne construis pas** : l'accueil, le catalogue, la page séance, la page travailler-ensemble, l'admin. Ils viendront après.

## Contraintes non négociables

**Stack.** Next.js 15 App Router · Cloudflare Workers via OpenNext · Cloudflare D1 · Resend · Tailwind · Zod côté serveur · `libphonenumber-js`. Animation : `_animation/motion.css` importé tel quel + `motion/mini` uniquement. **GSAP est exclu.**

**Les fichiers des kits ne sont jamais dans `/public`.** Ils vivent dans le dépôt hors zone servie ; une route serveur les délivre après vérification du token. Sans ça, le lien fuite et tout le dispositif perd son sens.

**Le fichier n'est jamais derrière WhatsApp.** Téléchargement immédiat après validation du formulaire.

**L'encart prérequis est au-dessus du formulaire**, jamais replié, jamais masqué.

**La vidéo YouTube est une façade cliquable.** Jamais d'iframe au premier rendu — elle coûte environ 800 ko et détruit le LCP mobile.

**Design.** `border-radius: 0` partout, aucune ombre portée, séparation par filets 1 px. Sept jetons de couleur, pas un de plus. L'accent terre de Sienne `#B7410E` ne touche jamais un bouton. Le vert `#25D366` est réservé à WhatsApp.

**Le site fonctionne intégralement sans JavaScript** pour la lecture et le téléchargement.

## Trois erreurs présentes dans les maquettes Stitch — ne les reproduis pas

1. La page Séance affiche `STUDIO.AI` au lieu de `fashionai.agency`. La marque est `fashionai.agency`, partout.
2. La page de remerciement invente des kits inexistants et affiche `©2024`. Les kits réels sont dans le PRD ; l'année est 2026.
3. Le thème Material par défaut laisse une trentaine d'hexadécimaux parasites dans le CSS. Seuls les sept jetons existent.

## Critères d'acceptation de la phase 1

- Lighthouse mobile ≥ 85 en Performance, CLS à 0, LCP sous 2,5 s en 4G simulée
- Un lead soumis apparaît en base avec son numéro en E.164, sa source UTM et son code
- Le lien de téléchargement expire à 24 h et refuse un autre lead
- L'email part en moins de 60 s et n'atterrit pas en spam sur Gmail
- Chaque champ a son `<label>` et son `for=`, chaque image son `alt`, le focus clavier est visible
- Aucun `border-radius` ni `box-shadow` dans le CSS final
- `prefers-reduced-motion` coupe tout le mouvement
- Testé à 360 px de large

## Ta première réponse

**N'écris aucun code tout de suite.** Réponds-moi d'abord avec :

1. L'arborescence de fichiers que tu proposes pour la phase 1
2. Le schéma D1 en SQL, tel que tu comptes le créer
3. Les points du PRD qui te paraissent ambigus ou contradictoires — je préfère les trancher maintenant que les découvrir dans le code
4. Ce que tu comptes faire différemment des maquettes Stitch, et pourquoi

Je valide, et ensuite tu développes.
