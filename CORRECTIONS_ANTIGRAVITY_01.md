# Corrections — page de test interne du studio (audit du 29/08)

Le squelette est le bon : couche fournisseur isolée, agents en `/agents/*.md`, validateurs à part, route de test séparée de l'application. **Ne le refais pas.** Les corrections ci-dessous portent sur six points qui empêchent le pipeline réel de fonctionner. Traite-les dans l'ordre : 1 et 2 sont bloquants, le reste suit.

---

## 1. BLOQUANT — Les images de référence ne sont jamais envoyées au générateur

`ImageGenerationInput.referenceImages` existe dans `providers/types.ts`, mais **ni `fal.ts` ni `replicate.ts` ne le transmettent**. Les deux ne postent que `prompt`, `aspect_ratio`, `seed`.

Or les étages 2 et 3 du pipeline sont **entièrement** des générations conditionnées par images :

| Étage | Images de référence obligatoires |
|---|---|
| 1 — triptyque | les photos du vêtement fournies par l'utilisateur |
| 2 — plan maître | l'image de scène du template + la référence mannequin + le triptyque |
| 3 — vues | le plan maître + le triptyque + la référence mannequin |

Sans transmission des références, seul l'étage 1 peut exister, et encore partiellement. **C'est la correction la plus importante du lot.**

## 2. BLOQUANT — Le modèle par défaut est FLUX, pas Seedream

`FAL_ENDPOINT` vaut `fal-ai/flux-pro/v1.1-ultra`, `REPLICATE_MODEL` vaut `black-forest-labs/flux-1.1-pro`.

Tout le corpus de prompts du projet — les quatre agents, les 14 blocs, la grammaire Khalyla — est calibré sur **Seedream**, et validé sur Seedream le 26/08. Un prompt Seedream envoyé à FLUX ne produit pas un résultat dégradé : il produit un résultat qui ne permet plus de juger quoi que ce soit. Le test de la phase 0 devient sans objet.

De plus, `flux-pro/v1.1-ultra` est un endpoint **texte → image** : il n'accepte pas d'image de référence. Les deux problèmes se cumulent.

**À faire :** basculer sur les endpoints d'édition Seedream de fal, qui acceptent jusqu'à 10 images de référence.

| Usage | Endpoint fal |
|---|---|
| Étage 1, 2 et 3 (avec références) | `fal-ai/bytedance/seedream/v5/pro/edit` |
| Repli moins cher | `fal-ai/bytedance/seedream/v4/edit` |
| Sans référence (rare) | `bytedance/seedream/v5/pro/text-to-image` |

**Attention au schéma d'entrée : il n'y a pas de `aspect_ratio` sur ces endpoints, mais un objet `image_size`.** Le code actuel envoie un champ que l'API ignore — les ratios ne sont donc pas respectés.

```ts
const SIZES: Record<AspectRatio, { width: number; height: number }> = {
  '1:1':  { width: 2048, height: 2048 },  // les vues
  '2:3':  { width: 1536, height: 2304 },  // le plan maître
  '3:2':  { width: 2304, height: 1536 },
  '4:5':  { width: 1728, height: 2160 },
  '16:9': { width: 2432, height: 1368 },  // le triptyque
};
```

Corps de requête attendu :

```json
{
  "prompt": "...",
  "image_urls": ["...", "..."],
  "image_size": { "width": 1536, "height": 2304 },
  "num_images": 1,
  "enhance_prompt_mode": "standard",
  "seed": 12345
}
```

**Deux points à vérifier et à me rapporter, pas à décider seul :**

- **Le negative prompt.** Il n'apparaît pas dans le schéma documenté de l'endpoint `edit`. Nos quatre agents en produisent un systématiquement. Vérifie s'il est accepté ; s'il ne l'est pas, **ne le supprime pas silencieusement** — remonte l'information, ça change le contrat des agents et la logique du validateur d'inversion.
- **`enhance_prompt_mode`.** C'est une réécriture automatique du prompt côté fournisseur. Sur un prompt de 14 blocs calibré au mot près, c'est un facteur de dérive non contrôlé. Cherche s'il existe une valeur qui la désactive, et documente ce que tu trouves.

## 3. BLOQUANT PLATEFORME — `registry.ts` utilise `fs` et `path`

`getAgentPrompt()` fait un `fs.readFileSync` au moment de l'exécution. **Ça marche en `next dev` et ça cassera sur Cloudflare**, où il n'y a pas de système de fichiers à l'exécution. Le problème ne se verra qu'au premier déploiement.

Les agents doivent être **embarqués au build**, pas lus au runtime : import statique du contenu markdown, ou un script qui génère un `agents.generated.ts` contenant les quatre chaînes. Le fichier `.md` reste la source éditée à la main — c'est le principe, on ne le change pas.

Au passage : `wrangler.json` pointe vers `.vercel/output/static`, ce qui suppose un adaptateur Cloudflare, et **aucun adaptateur n'est dans `package.json`**. Il n'y a donc aujourd'hui aucun chemin de déploiement fonctionnel. À traiter avant la fin de la phase 1.

## 4. SÉCURITÉ — La route admin n'a aucune authentification

`/api/admin/test-pipeline` accepte n'importe quelle requête POST. Il n'y a pas de `middleware.ts` dans le projet, et aucune vérification dans la route.

Cette route déclenche des appels LLM et des générations d'images facturés. Déployée telle quelle, **n'importe qui peut vider les clés API**.

**À faire :** un `middleware.ts` qui protège `/admin/*` et `/api/admin/*` par un secret d'environnement (`ADMIN_SECRET`), et refuse par défaut si la variable est absente. Pas de « on verra plus tard » : cette route existe déjà et sera poussée avec le reste.

## 5. Les validateurs ne sont pas branchables en l'état

Trois problèmes distincts.

**a) Il manque les extracteurs.** `validateInversion` reçoit un `negativePrompt` et une liste de mots-clés déjà extraits ; `validateContamination` reçoit des blocs déjà découpés. Or `extractNegative()` et `extractBlock()` **n'existent nulle part**. C'est précisément la partie difficile : découper un prompt de 14 blocs et en isoler `environment`, `lighting`, `grading`, `palette`. Sans ces fonctions, les validateurs sont testables à la main et inutilisables dans le workflow.

**b) La comparaison de contamination est en égalité stricte.** Le spec demande un **seuil de similarité à 0,85**, pas `!==`. Avec une égalité stricte, une virgule ou un retour à la ligne différent déclenche une reprise. En production, ça veut dire des shoots qui échouent au plafond de reprises alors que rien n'est contaminé. Implémente une similarité (Dice sur bigrammes ou Levenshtein normalisé) après normalisation — minuscules, espaces réduits, ponctuation retirée.

**c) La détection d'inversion fait du `includes` sans limite de mot.** Un mot-clé de trois lettres se retrouve dans des dizaines de mots. Passe en correspondance sur limites de mot (`\b`), et écarte les mots vides.

## 6. Le fournisseur Gemini vise la mauvaise API pour notre facturation

`llm/gemini.ts` appelle `generativelanguage.googleapis.com/v1beta/...?key=API_KEY` : c'est **l'API Gemini d'AI Studio**.

Or la documentation Google Cloud est explicite : *« The $300 credit can't pay for Gemini API in AI Studio costs. »* Le crédit de 300 USD ne paiera donc jamais un seul appel passé par cette URL — au-delà du quota gratuit, c'est la carte bancaire qui est débitée directement.

Les appels **Vertex AI**, eux, sont bien déduits du crédit. C'est donc Vertex qu'il faut viser.

**À faire : un troisième fournisseur LLM, `llm/vertex.ts`**, à côté de `gemini.ts` — on ne remplace pas, on ajoute, et `LLM_PROVIDER` arbitre.

- Endpoint régional `…-aiplatform.googleapis.com`, projet + région dans la config
- Authentification par **compte de service / OAuth**, pas par `?key=` — c'est la principale différence d'implémentation
- Identifiants de modèle propres à Vertex, à vérifier au moment de l'écriture

Garde `gemini.ts` : il reste utile pour les essais rapides sur le quota gratuit d'AI Studio, sans facturation.

## 7. Points mineurs, à corriger au passage

- **`gemini-1.5-pro` est un identifiant daté.** Vérifie le modèle réellement disponible avant de le figer en défaut.
- **`costEstimateCents` est codé en dur** (5 pour fal, 4 pour Replicate). Sur la page de test, c'est ce chiffre qui sert à estimer le coût par série : mets la vraie grille par endpoint, sinon l'estimation ment.
- **`negativePrompt` est accepté par le type et jamais envoyé** par aucun des deux fournisseurs. Silencieusement perdu — voir le point 2.
- Le type `AspectRatio` est bon, garde-le. C'est le mapping vers l'API qui manque.

---

## Ce que doit produire la page de test à la fin de ces corrections

Un test manuel, réalisable en une session, qui répond à une seule question : **est-ce que le pipeline reproduit le résultat validé du 26/08 hors de Magnific ?**

1. Charger les photos d'un vêtement → agent `cloth` → prompt triptyque → génération en 16:9. Le triptyque doit être lisible : ghost face, ghost dos, mannequin en pied.
2. Reprendre ce triptyque + une référence mannequin + une image de scène → agent `swap` → prompt maître → génération en 2:3, **avec les trois images en référence**.
3. Passer le prompt maître et son image aux agents `transfert_profil` et `transfert_dos` → deux générations en 1:1, **avec le plan maître en référence**.
4. Vérifier à l'œil les quatre verrous du tableau §14 de `PROCESS_GENERATION.md` : identité du mannequin, construction du vêtement, héritage des accessoires, absence de contamination du décor.

**Tant que ces quatre points ne passent pas, ne construis rien d'autre.** Ni interface, ni crédits, ni workflow durable. C'est la condition de sortie de la phase 1.
