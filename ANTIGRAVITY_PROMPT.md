# Brief de développement — fashionai.agency

**À donner à Antigravity au démarrage du projet.**
Version 1.0 · 26 août 2026

---

## Ce que tu construis

Un site de génération de leads pour **fashionai.agency**, un studio de production photo et vidéo de mode assistée par IA, basé à Abidjan.

Le site distribue gratuitement des **kits** — des méthodes de production visuelle — en échange d'un numéro WhatsApp. **Rien n'est vendu sur le site.** Toute la valeur commerciale se joue dans la conversation WhatsApp qui suit le téléchargement.

**Le principe qui gouverne toute l'architecture : c'est le lead qui envoie le premier message WhatsApp.** Ce n'est pas un confort de suivi — c'est le levier économique du dispositif. Quand le client initie, une fenêtre de service de 24 h s'ouvre pendant laquelle les réponses sont gratuites. Chaque mécanisme du site doit lui donner une raison d'écrire.

---

## Les documents de référence, par ordre d'autorité

| Fichier | Rôle | Autorité |
|---|---|---|
| `PRD.md` | Le produit : objectifs, exigences P0/P1, modèle de données, scoring, métriques | **Fait foi sur le quoi** |
| `_animation/ANIMATION.md` | Le système de mouvement et ses interdits | **Fait foi sur le mouvement** |
| `_animation/motion.css` | La couche CSS, prête pour la production | À importer tel quel |
| `_animation/motion.ts` | Les helpers Motion pour l'interactif | À importer tel quel |
| `_animation/pages/*.md` | Le mouvement écran par écran, section par section | Une fiche par page |
| `stitch_*/**/code.html` | Les maquettes Stitch — **structure et style seulement** | Référence visuelle, pas code de production |
| `stitch_*/**/screen.png` | Le rendu attendu de chaque écran | Vérification visuelle |

**En cas de contradiction, le PRD gagne toujours.** Les maquettes Stitch sont des maquettes : elles montrent l'intention visuelle, elles ne dictent pas l'architecture.

---

## Stack imposée

| Couche | Choix | Contrainte |
|---|---|---|
| Framework | **Next.js 15+, App Router** | Server Actions pour les formulaires, ISR pour les landings |
| Hébergement | **Cloudflare Workers / Pages** via OpenNext | Usage commercial autorisé en gratuit |
| Base de données | **Cloudflare D1** | Aucune carte bancaire requise |
| Fichiers des kits | **Dans le dépôt Git**, hors du dossier public | Servis par route serveur après validation de token |
| Emails | **Resend** | SPF / DKIM / DMARC sur `fashionai.agency` |
| Animation | **CSS natif + `motion/mini`** | 2,6 ko maximum. **GSAP est exclu** |
| Validation | **Zod** côté serveur + `libphonenumber-js` | Numéros normalisés en E.164 à la saisie |
| UI | **Tailwind + shadcn/ui** | Sans arrondis, sans ombres |

**Repli si OpenNext pose problème :** Netlify en offre gratuite.

---

## Corrections à appliquer aux maquettes Stitch

Trois dérives constatées dans les fichiers générés. **Ne les reproduis pas.**

1. **La page Séance affiche `STUDIO.AI`** au lieu de `fashionai.agency`, avec un pied de page inventé (`COLLECTIONS / PROCESS / LAB / CONTACT`). La marque est `fashionai.agency`, partout, sans exception.
2. **La page de remerciement invente des kits** (« Masterclass Éclairage Studio », « Créer un Moodboard Exécutable ») et affiche `©2024`. Les kits réels sont listés dans le PRD ; l'année est 2026.
3. **Le thème Material par défaut de Stitch laisse une trentaine de valeurs hexadécimales parasites** dans le CSS. Seuls les sept jetons ci-dessous existent.

Harmonise également le pied de page sur les treize écrans : `KITS / SÉANCE / TRAVAILLER ENSEMBLE / MENTIONS LÉGALES / CONFIDENTIALITÉ`.

---

## Système de design — non négociable

```
background  #F6F6F8   blanc froid, jamais crème
surface     #FFFFFF
ink         #0B0B0D   texte, filets forts, boutons pleins
ink-soft    #56565F   texte secondaire, gris à biais bleu
rule        #DCDCE2   séparateurs 1px
accent      #B7410E   terre de Sienne  (sombre : #E8703A)
whatsapp    #25D366   boutons WhatsApp UNIQUEMENT
```

**Trois couleurs, trois métiers qui ne se chevauchent jamais.** Le noir fait les actions. Le vert fait la seule action qui compte. La terre de Sienne fait l'identité — étiquettes, libellés monospace, liens, italiques — et **ne touche jamais un bouton**. Une seule apparition d'accent par écran.

**Typographie :** Bodoni Moda pour les titres, jamais sous 24 px, avec son axe italique chargé. Archivo pour le texte et l'interface. DM Mono en capitales interlettrées à 0,14 em pour toute métadonnée.

**Règles de mise en page :** `border-radius: 0` partout. Aucune ombre portée. Filets 1 px et contraste pour séparer. Images à fond perdu, jamais encadrées dans une boîte. Légendes monospace minuscules sous chaque image.

---

## Exigences fonctionnelles critiques

**Le fichier n'est jamais derrière WhatsApp.** Téléchargement immédiat et automatique après validation du formulaire. Un lead qui attend son fichier devient méfiant, pas client.

**Codes WhatsApp.** Un code unique de 5 caractères alphanumériques, insensible à la casse, généré côté serveur à l'arrivée sur une landing et injecté dans tous les liens `wa.me` de la page avec son intention (`session` | `support` | `audit`). Il doit être résolvable en base même si le visiteur n'a jamais rempli le formulaire.

**Numéros en E.164.** Normalisés à la saisie. C'est la clé de dédoublonnage, pas l'email.

**Encart prérequis.** Chaque landing affiche, **au-dessus du formulaire**, l'outil IA requis et son coût. Jamais masqué, jamais replié.

**Vidéo YouTube.** Façade cliquable, jamais d'iframe au premier rendu — une iframe YouTube coûte environ 800 ko et détruit le LCP mobile. L'injection se fait au clic via `mountVideo()`.

**Fichiers hors `/public`.** Ils vivent dans le dépôt hors zone servie ; une route serveur les délivre après vérification du token signé, valable 24 h. Sans cela, le lien fuite et tout le dispositif perd son sens.

**Séance hebdomadaire.** C'est une fonctionnalité produit, pas une page statique : tables `sessions` et `session_registrations`, date de la prochaine séance calculée automatiquement sur `Africa/Abidjan`, gestion des inscrits et des présents en admin.

---

## Ordre de construction

1. **Socle capture** — modèle de données, une landing kit fonctionnelle, formulaire, token signé, livraison des deux fichiers, email transactionnel, page de remerciement, codes WhatsApp. *Objectif : un lead réel capturé de bout en bout.*
2. **Séances** — page, calcul de date, inscriptions, présences, notification.
3. **Catalogue et admin** — gestion des kits par famille, dashboard, résolution de code, scoring, export CSV.
4. **Travailler ensemble** et preuve sociale.
5. **Accueil** — en dernier.

**Ne commence pas par l'accueil.** La page qui produit les conversations est `/kits/[slug]`. L'accueil peut rester minimal pendant des mois sans coûter un seul lead.

---

## Critères d'acceptation transverses

- **Lighthouse mobile ≥ 85** en Performance, **CLS à 0**.
- **LCP sous 2,5 s** en 4G simulée.
- Le site **fonctionne intégralement sans JavaScript** pour la lecture et le téléchargement.
- Aucune animation ne conditionne l'affichage d'un contenu.
- `prefers-reduced-motion` coupe tout le mouvement.
- Chaque champ de formulaire a son `<label>` et son `for=`. Chaque image a son `alt`.
- Le focus clavier est visible partout, jamais supprimé.
- Aucun `border-radius`, aucune `box-shadow` dans le CSS final.
- Testé à 360 px de large sur réseau lent.
