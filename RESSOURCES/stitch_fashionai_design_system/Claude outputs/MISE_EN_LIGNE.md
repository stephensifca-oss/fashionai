# Mettre le site en ligne sur `fashionai.agency` — pas à pas

**Date :** 11 septembre 2026

---

## D'abord, comprendre pourquoi rien ne s'affiche

C'est normal, et ce n'est pas une erreur de ta part.

**Cloudflare gère ton domaine. Il n'héberge pas ton site.** Ce sont deux choses différentes :

| | Rôle | État aujourd'hui |
|---|---|---|
| **Le registrar** | Qui possède le nom | OK |
| **Cloudflare DNS** | Le standard téléphonique : à qui renvoyer les visiteurs | ✅ **Fait** |
| **L'hébergement** | La machine qui contient réellement les pages | ❌ **Rien de branché** |

Cloudflare te dit « Your domain is now protected » parce qu'il gère bien le trafic. Mais il regarde ses enregistrements DNS, trouve une adresse qui pointe vers **l'ancien hébergement du SaaS** — celui dont le déploiement est suspendu — et renvoie son erreur **402**.

C'est aussi ce que dit le panneau à droite : **« No Workers connected »**. Traduction : rien n'est branché au bout du fil.

**Il manque donc une seule chose : brancher un hébergement.** Et c'est exactement ce que font les étapes ci-dessous.

---

## Où en est vraiment ton code

Bonne nouvelle : depuis l'audit, l'essentiel est là.

| Point | État |
|---|---|
| Adaptateur `@cloudflare/next-on-pages` | ✅ installé |
| `wrangler` | ✅ installé |
| Script `pages:build` | ✅ présent |
| Base D1 avec un vrai identifiant | ✅ `9159cb7e-…` |
| Lecture de fichiers au runtime (`fs`) | ✅ supprimée |
| **Protection de `/admin`, `/api/admin` et `/studio`** | ❌ **il n'y en avait aucune** |

Ce dernier point était bloquant : `/api/admin/test-pipeline` déclenche des générations facturées, et la page `/studio` l'appelle depuis le navigateur. **Déployé tel quel, n'importe qui trouvant cette URL pouvait vider tes clés fal, Vertex et Gemini.**

**Je l'ai corrigé.** `src/middleware.ts` est écrit dans ton projet : refus par défaut, et si `ADMIN_SECRET` n'est pas configuré, ces zones répondent 503 plutôt que de s'ouvrir par oubli. Pour y accéder toi-même, tu visites une fois `/admin/test-pipeline?k=TON_SECRET` — un cookie de 30 jours se pose et tout fonctionne ensuite normalement dans ce navigateur.

`/studio` est volontairement fermé aussi : sans crédits ni plafonds, il ne peut pas être public.

---

## ÉTAPE 1 — Nettoyer le DNS (5 minutes)

Dans Cloudflare → **DNS** → **Records**.

Tu vas voir un ou plusieurs enregistrements pour `fashionai.agency` et `www`. Cherche ceux de type **A**, **AAAA** ou **CNAME** qui pointent vers l'ancien hébergement — typiquement une valeur contenant `vercel`, `netlify`, `github.io`, ou une adresse IP que tu ne reconnais pas.

**Supprime-les.** Ce sont eux qui produisent le 402.

Laisse en place : les enregistrements **TXT** (vérifications), **MX** s'il y en a, et les enregistrements `NS`.

> Si tu hésites sur un enregistrement, fais une capture et montre-la-moi avant de supprimer.

---

## ÉTAPE 2 — Générer le secret et le mettre dans `.env.local`

Dans un terminal, sur ton Mac :

```bash
openssl rand -hex 24
```

Copie le résultat, puis ajoute-le à `LEAD MAGNET/fashionai/.env.local` :

```
ADMIN_SECRET=le_resultat_colle_ici
```

---

## ÉTAPE 3 — Appliquer le schéma à la base D1 distante

La base existe chez Cloudflare, mais elle est probablement vide. Depuis le dossier `fashionai` :

```bash
npx wrangler d1 execute fashionai-leads --remote --file=./schema.sql
```

La première commande `wrangler` ouvrira ton navigateur pour autoriser l'accès à ton compte Cloudflare. C'est normal, une seule fois.

---

## ÉTAPE 4 — Mettre à jour `wrangler.json`

Un seul champ à changer : `compatibility_date` est resté à `2024-04-01`, ce qui fait tourner `nodejs_compat` en ancien mode et peut casser le build.

```json
"compatibility_date": "2026-09-01",
```

Le reste du fichier est correct — ne touche pas à `pages_build_output_dir`, il est bien réglé pour l'adaptateur.

---

## ÉTAPE 5 — Construire

```bash
npm run build
npm run pages:build
```

La seconde commande produit `.vercel/output/static` — c'est ce dossier que Cloudflare servira.

**Si ça échoue**, copie-moi l'erreur complète. Les échecs classiques à cette étape sont une route qui utilise une API Node indisponible sur l'edge, ou une page qui doit déclarer `export const runtime = 'edge'`.

---

## ÉTAPE 6 — Créer le projet Cloudflare Pages et déployer

```bash
npx wrangler pages deploy .vercel/output/static --project-name=fashionai
```

À la première exécution, wrangler propose de créer le projet — accepte.

À la fin, il affiche une URL du type `https://fashionai.pages.dev`. **Ouvre-la : ton site est en ligne.** Pas encore sur ton domaine, mais il existe.

---

## ÉTAPE 7 — Brancher les variables et la base

Dans le tableau de bord Cloudflare → **Workers & Pages** → **fashionai** → **Settings**.

**Variables d'environnement** (onglet Variables, pour l'environnement Production) — ajoute, en cochant « chiffrer » pour chacune :

```
ADMIN_SECRET
FAL_KEY
GEMINI_API_KEY
GCP_PROJECT_ID
GCP_LOCATION
VERTEX_IMAGEN_MODEL
LLM_PROVIDER
IMAGE_PROVIDER
RESEND_API_KEY        (quand Resend sera configuré)
```

> ⚠️ **`gcp-key.json` ne se colle pas dans une variable comme un mot de passe.** C'est un fichier JSON complet. Colle son contenu entier dans une variable `GCP_SERVICE_ACCOUNT_JSON` et adapte `gcp-auth.ts` pour la lire — dis-moi quand tu y es, je te donnerai la modification. **Ne commite jamais ce fichier dans Git.**

**Liaison D1** (onglet Bindings) : ajouter une liaison de type D1, nom de variable `DB`, base `fashionai-leads`.

Puis redéployer pour que tout soit pris en compte :

```bash
npx wrangler pages deploy .vercel/output/static --project-name=fashionai
```

---

## ÉTAPE 8 — Brancher le domaine

Cloudflare → **Workers & Pages** → **fashionai** → **Custom domains** → **Set up a custom domain**.

Saisis `fashionai.agency`, valide. Recommence avec `www.fashionai.agency`.

Cloudflare crée lui-même les bons enregistrements DNS — c'est pour ça que l'étape 1 comptait : s'il reste un ancien enregistrement sur le même nom, la liaison échoue.

**Deux à trois minutes plus tard, `https://fashionai.agency` affiche ton site.**

---

## ÉTAPE 9 — Vérifier

| Vérification | Résultat attendu |
|---|---|
| `https://fashionai.agency` | Le site, en 200 |
| `https://www.fashionai.agency` | Le site aussi |
| `https://fashionai.agency/api/admin/test-pipeline` | **401 Non autorisé** |
| `https://fashionai.agency/studio` | **401** — normal, pas encore public |
| `/admin/test-pipeline?k=TON_SECRET` | S'ouvre, et pose le cookie |

**Le troisième test est le plus important.** S'il renvoie autre chose que 401 ou 503, arrête-toi et dis-le-moi : ça voudrait dire que le middleware n'est pas actif, et tes clés seraient exposées.

---

## Ce qu'il te restera après

Le site sera en ligne, mais ces points restent ouverts — aucun n'empêche la mise en ligne :

- Les listes noires du domaine, à vérifier avant de configurer Resend.
- SPF `-all` et DMARC `p=reject`, à publier dès maintenant (fichier `PHASE0_DOMAINE.md`).
- La page catalogue, encore en maquette Stitch.
- Le triptyque à rebrancher sur le swap, les validateurs à appeler, les crédits et plafonds — avant que `/studio` puisse s'ouvrir.

---

## Une alternative si tu veux aller plus vite

Si une étape bloque et que tu veux que le domaine cesse d'afficher une erreur **aujourd'hui** : fais l'étape 1, puis crée un projet Pages vide avec une seule page HTML — nom, une phrase, un bouton WhatsApp — et branche le domaine dessus (étape 8). Quinze minutes.

Tu remplaceras cette page par le vrai site quand il sera prêt, sans rien retoucher au DNS. Et une page d'attente avec un bouton WhatsApp capture déjà des conversations.
