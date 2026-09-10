# Audit du studio — code réel vs `STUDIO_ARCHITECTURE.md` (29/08)

Cinq des sept corrections du 29/08 au matin sont faites, et bien faites : `fal.ts` appelle maintenant l'endpoint Seedream edit avec `image_urls` et `image_size`, un fournisseur Vertex existe, `catalog.ts` reprend exactement le modèle de données du PRD, la révélation progressive est implémentée avec son journal, le réglage « ne pas inventer d'accessoires » et la détection des marqueurs `[estimation]` sont là.

Ce document ne revient pas là-dessus. Il porte sur ce que la lecture du code a fait apparaître, et que le document d'architecture ne dit pas.

---

## A. BLOQUANT — Le triptyque a été débranché du pipeline

C'est le point qui compte le plus. Dans `src/app/studio/page.tsx`, l'agent `swap` et la génération du plan maître reçoivent :

- `selectedTemplate.source_image` → `@source`
- **`uploadedGarments`** → `@tenue`
- `character_sheet` → `@perso`

`uploadedGarments`, ce sont **les photos brutes de l'utilisateur**. Le triptyque est lancé *en parallèle* du plan maître (`Promise.all([triptychPromise, masterShotPromise])`) et n'est jamais transmis au swap. Il n'entre dans la chaîne qu'à l'étage 3, pour les vues.

**Ce que ça détruit.** Dans le graphe Magnific, `tenue` — le triptyque — est l'entrée du panneau swap. Ce n'est pas une illustration : c'est le vêtement **normalisé**. Dos déduit et rendu explicite, pièces séparées, lumière homogène, fond neutre. Le swap travaille sur cette version propre, pas sur une photo UGC prise au téléphone avec un mauvais éclairage et un dos invisible.

En envoyant les photos brutes, on demande au swap de faire lui-même la normalisation — c'est exactement ce que le test du 26/08 montre qu'il ne fait pas bien seul, et c'est la raison pour laquelle l'étage 1 existe.

Le gain de la parallélisation est de l'ordre de quarante secondes. Le coût est le mécanisme central du produit.

**À faire :** rétablir la séquence. `swap` reçoit `triptychUrl` en `@tenue`. Les photos brutes ne vont qu'à `cloth`. L'étage 1 redevient bloquant — c'est écrit dans `PROCESS_GENERATION.md` §5B et ce n'est pas négociable.

> Si tu veux garder de la parallélisation, elle est ailleurs : l'étage 3, deux vues en parallèle. Elle y est déjà, et elle est correcte.

---

## B. BLOQUANT — La page publique appelle la route admin de test depuis le navigateur

`/studio` émet huit `fetch` vers `/api/admin/test-pipeline`. Cette route n'a toujours aucune authentification.

Quatre conséquences, toutes sérieuses :

1. **N'importe qui peut appeler la route directement** et brûler les clés fal, Vertex et Gemini.
2. **L'orchestration vit dans l'onglet du navigateur.** Onglet fermé, écran verrouillé, réseau coupé à la minute deux — tout est perdu, et déjà facturé. C'est précisément le problème que Cloudflare Workflows devait résoudre.
3. **Aucun crédit n'est débité, aucun plafond n'est appliqué.** Les trois plafonds cumulés du PRD (3/lead/jour, 10/IP/jour, plafond global avec coupure) n'existent nulle part.
4. Le prompt maître, les versions d'agent, les prompts de vues — **rien n'est persisté**. Or `master_prompt` conservé en base est ce qui permettra le rejeu, le débogage, et le jeu de données d'entraînement de la phase 3.

**À faire, dans cet ordre :** `middleware.ts` protégeant `/admin/*` et `/api/admin/*` par `ADMIN_SECRET`, refus par défaut si la variable est absente. Puis une route `/api/shoots` distincte pour le studio, qui crée le shoot en base et déclenche le workflow côté serveur. La page ne fait plus qu'interroger `GET /api/shoots/:id` toutes les 3 secondes.

---

## C. Les validateurs ne sont jamais appelés

Ils n'existent que derrière `action: 'validate'` dans la route de test, et **aucun appelant n'utilise cette action**. Dans le vrai chemin de génération, ils sont du code mort.

S'y ajoutent les trois défauts déjà signalés le matin et non corrigés : pas de `extractBlock()` ni de `extractNegative()`, comparaison de contamination en égalité stricte au lieu du seuil de similarité 0,85, détection d'inversion par `includes` sans limite de mot.

Tant que ces fonctions ne sont pas branchées dans le workflow, **les deux modes d'échec documentés passent sans être vus.**

---

## D. JURIDIQUE — Le catalogue de mannequins repose sur des photos Unsplash de personnes réelles

Trois des quatre mannequins (`AWA · 02`, `KADI · 03`, `YANN · 04`) ont pour vignette une URL Unsplash, avec :

```
rights_status: 'Libre de droits · Licence Studio Exclusif'
```

**Cette mention est fausse, et le champ qui devait nous protéger a été rempli avec une formule rassurante au lieu d'un fait vérifié.**

La licence Unsplash porte sur le droit d'auteur du **photographe**. Elle ne transmet pas le droit à l'image de la **personne photographiée** : Unsplash le dit lui-même, une autorisation du sujet peut être nécessaire selon l'usage. Or l'usage ici est le plus exigeant qui soit — le visage d'une personne identifiable réutilisé comme mannequin dans des visuels commerciaux générés, vendus à des marques. C'est exactement le cas qui réclame une autorisation écrite du modèle.

Par ailleurs, « Licence Studio Exclusif » affirme une exclusivité que personne ne nous a accordée.

Et sur le plan technique, ces trois mannequins n'ont **pas de `character_sheet`** — seulement une vignette. Le verrou d'identité, qui repose sur la fiche multi-angles, ne peut de toute façon pas fonctionner pour eux.

**À faire :** ne garder publié que `FATOU · 01`, le seul avec une fiche de référence et un statut de droits défendable. Les trois autres passent en `published: false` jusqu'à ce que leur origine soit établie. `rights_status` doit contenir une provenance vérifiable, pas une formule commerciale.

*(Même remarque, moins grave, pour le template `TERRASSE RIVIERA` dont la `source_image` est une URL Unsplash externe : un asset de production ne doit pas dépendre d'un domaine tiers.)*

---

## E. Le document d'architecture diverge du code — cinq points à corriger

Ça compte, parce que ce document servira à briefer.

**1. Le schéma décrit un pipeline impossible.** `E2 (tous les LLM) → E3 (validation) → E4 (toutes les images) → E5` suppose que les quatre prompts sont écrits avant qu'une seule image existe. Or les agents de transfert exigent **l'image du plan maître** en entrée. Elle n'existe pas à l'étape 02. La structure réelle est trois étages alternés LLM → image, le dernier dédoublé.

**2. La « Vue Zoom Matière » n'existe pas.** Elle apparaît deux fois dans le document (OUT3 et étape 05). Il n'y a ni agent, ni cadrage, ni code. Et elle casse le modèle : la série V1 est à trois images et trois crédits, décidée le 26/08. Soit on la retire du document, soit on décide consciemment de passer à quatre — mais alors il faut un cadrage écrit, un agent, et recalculer les crédits.

**3. « Prompt assaini sans termes interdits » — non.** Le validateur ne répare pas, il **rejette et relance**. Réparer automatiquement un prompt masquerait l'erreur de l'agent et livrerait une image dont on ne saurait plus d'où elle vient. La relance est un choix, pas une facilité.

**4. Le validateur anti-contamination est décrit à l'envers.** Le document dit « empêche la fuite de détails d'une vue sur une vue incompatible ». Sa fonction réelle : vérifier que les blocs `environment`, `lighting`, `grading`, `palette` du prompt de vue sont **recopiés à l'identique** depuis le prompt maître.

**5. Llama 3.1 / 3.3 70B ne peut pas servir d'agent.** C'est un modèle **texte seul**. L'agent `cloth` doit regarder les photos du vêtement ; `swap` en regarde trois ; les transferts en regardent quatre. Un backend sans vision est inutilisable ici, quel que soit son prix. À retirer de la liste des modèles supportés, ou à réserver à des tâches sans image.

**6. Enfin, `@precisions #2` fusionne deux champs distincts.** « Précisions sur le vêtement » alimente `cloth` ; « Ajustements » alimente `swap`. Deux champs, deux agents, deux moments. Le PRD insiste : ne pas les confondre, ne pas les supprimer.

---

## F. Points techniques restants

| Point | Détail |
|---|---|
| `require('fs')` dans `fal.ts`, `fs` dans `registry.ts` | Marche en `next dev`, casse sur Cloudflare. Les références doivent être des URL publiques ou des data URI construits en amont, pas des lectures disque |
| Résolutions basses | `2:3` rend en 832 × 1248. Pour une fiche produit e-commerce, viser 2K — Seedream edit accepte 2048 |
| Negative prompt | Toujours pas envoyé par `fal.ts`. Vertex le concatène en texte (« Avoid the following: ») — bricolage acceptable en test, à documenter comme tel |
| `gcp-key.json` | Correctement ignoré par git. Mais il ne doit jamais entrer dans un build Cloudflare : passer par les secrets Wrangler avant tout déploiement |

---

## Ordre de traitement

1. **A** — rebrancher le triptyque sur le swap. Sans ça, rien de ce qui suit ne sert.
2. **D** — dépublier les trois mannequins sans droits établis. C'est une ligne de code et ça supprime un risque juridique réel.
3. **B** — `middleware.ts`, puis sortir l'orchestration du navigateur.
4. **C** — brancher les validateurs, avec leurs extracteurs et le seuil 0,85.
5. **E** — corriger le document d'architecture.
6. **F** — le reste.

**Et ensuite seulement, le test qui compte :** une série complète, comparée à l'œil au résultat validé du 26/08, sur les quatre verrous du §14 de `PROCESS_GENERATION.md` — identité du mannequin, construction du vêtement, héritage des accessoires, absence de contamination du décor.
