# Quels modèles pour quel agent, sur le crédit Google de 300 USD

**Date :** 29 août 2026
**Rappel de la contrainte :** le crédit ne paie **que** ce qui passe par **Vertex AI**. Tout appel à `generativelanguage.googleapis.com` (AI Studio) est facturé à part, sur la carte. Chaque modèle listé ici doit donc être appelé côté Vertex, avec authentification par compte de service.

---

## 1. Le point de départ : un seul modèle d'image est utilisable

C'est la contrainte qui commande tout le reste.

Le pipeline repose sur du **conditionnement multi-références** : le plan maître reçoit la scène, le mannequin et le triptyque ; chaque vue reçoit en plus l'image du maître. Un modèle texte → image ne peut pas faire ça.

| Modèle Google | Multi-références ? | Verdict |
|---|---|---|
| **Imagen 4 / 4-ultra / 4-fast** | Non — texte → image | **Inutilisable** pour les étages 2 et 3 |
| **Gemini 3 Pro Image** *(Nano Banana Pro)* | **Oui — jusqu'à 14 images**, cohérence de 5 personnes, sortie 2K et 4K | **Le seul choix sérieux** |
| **Gemini 3.1 Flash Image** *(Nano Banana 2)* | Oui | Variante économique, à comparer |

Nano Banana Pro est en réalité **mieux dimensionné que Seedream** pour ce pipeline : Seedream edit accepte 10 images de référence, celui-ci en accepte 14, et il annonce explicitement la cohérence d'identité sur plusieurs personnes — exactement le verrou dont dépend toute la série.

---

## 2. Attribution par agent

| Agent | Ce qu'il fait vraiment | Modèle Vertex | Pourquoi celui-là |
|---|---|---|---|
| **`cloth`** | Regarde 1 à 4 photos, écrit la fiche modéliste et le prompt du triptyque | **Gemini 3.6 Flash** | Tâche de description longue et détaillée, pas de raisonnement difficile. Le Pro n'apporterait rien pour 5 fois le prix |
| **`swap`** | Fusionne scène + mannequin + tenue, écrit les 14 blocs | **Gemini 3.6 Flash**, à surveiller | **C'est ici que naît l'erreur d'inversion.** Commence en Flash ; si le validateur d'inversion se déclenche plus d'une fois sur dix, monte cet appel — et lui seul — en **Gemini 3 Pro** |
| **`transfert_profil`** | Recopie les blocs verrouillés, réécrit les points de tension du tissu | **Gemini 3.6 Flash** | Tâche mécanique de recopie fidèle + réécriture localisée. Flash suffit, et la longueur du prompt maître recopié rend le Pro coûteux |
| **`transfert_dos`** | Idem, avec le panneau 3 du triptyque pour autorité | **Gemini 3.6 Flash** | Idem |
| **Toutes les générations d'image** — triptyque 16:9, maître 2:3, deux vues 1:1 | | **`gemini-3-pro-image`** *(Nano Banana Pro)* | Seul modèle Google acceptant les références multiples dont dépend la cohérence de série |

**Note sur les identifiants exacts.** Les suffixes de version et les `-preview` bougent vite, et Nano Banana Pro n'est publié que dans la localisation Vertex `global`, pas dans les régions — c'est déjà noté dans ton `.env.local`. Fais confirmer les chaînes exactes par un appel de listing avant de les figer en défaut, plutôt que de les recopier d'ici.

**Un modèle à écarter explicitement : Llama 70B de Cloudflare**, annoncé comme backend d'agent dans le document d'architecture. C'est un modèle **texte seul** ; `cloth` doit regarder les photos. Il n'a pas sa place ici, quel que soit son prix.

---

## 3. Ce que 300 USD achètent réellement

Estimation par série complète — 4 appels LLM et 4 générations d'image, en 2K.

| Poste | Détail | Coût |
|---|---|---|
| 4 appels LLM | Gemini 3.6 Flash · ~50 k tokens en entrée, ~6 k en sortie | **≈ 0,06 $** |
| 4 images 2K | Nano Banana Pro à 0,134 $ l'image | **0,54 $** |
| **Série complète** | | **≈ 0,60 $** |
| **Démonstration gratuite seule** | triptyque + plan maître | **≈ 0,30 $** |

| Ce que le crédit couvre | Volume |
|---|---|
| Séries complètes | **≈ 500** |
| Démonstrations gratuites (plan maître seul) | **≈ 1 000** |
| Variante Nano Banana 2 en 2K (0,101 $/image) | ≈ 650 séries |
| Variante Nano Banana 2 en 1K (0,067 $/image) | ≈ 900 séries |

**Lis ces chiffres comme une contrainte, pas comme une réserve.** Un seul testeur enthousiaste qui passe son catalogue de 40 articles consomme 24 $ en un après-midi. Douze testeurs comme lui, et le crédit est fini avant la fin du mois.

**Le plafond global quotidien avec coupure automatique (A0-13 du PRD) cesse donc d'être une précaution : c'est ce qui rend le test multi-utilisateurs possible.** Il doit exister avant le premier testeur externe, pas après.

Ordre de grandeur raisonnable pour tenir 90 jours : **3 $ par jour**, soit environ 5 séries complètes ou 10 démonstrations. À répartir entre 3 générations par lead et par jour.

---

## 4. Les cinq contraintes du compte d'essai

Elles sont structurantes pour ton objectif de test en situation réelle.

**a) 90 jours, puis arrêt sec.** Passé le délai ou le crédit épuisé, 30 jours de grâce, puis suppression des ressources. Rien de structurel ne doit en dépendre — c'est déjà pourquoi la couche fournisseur est commutable.

**b) Pas d'augmentation de quota pendant l'essai.** Les quotas Vertex par défaut sur `gemini-3-pro-image` s'appliquent, et tu ne peux pas les faire relever. Avec plusieurs testeurs simultanés, c'est le quota qui te bloquera avant le crédit. **Vérifie le quota réel du projet et cale ton plafond global en dessous**, sinon les échecs arriveront en pleine démonstration.

**c) Passer en compte payant conserve le crédit, mais ne prolonge pas les 90 jours.** Google est explicite sur les deux points : *« you keep any remaining credit »*, mais ce crédit *« must be consumed within the original 90 days period from your sign-up date »*. L'upgrade supprime la falaise de suppression des ressources et débloque l'accès aux produits restreints — donc la possibilité de **demander** une augmentation de quota. Pouvoir la demander n'est pas l'obtenir : un projet neuf sans historique de dépense n'obtient pas de gros relèvements, et pas immédiatement.

Contrepartie immédiate : dès l'upgrade, **tout ce que le crédit ne couvre pas est facturé sur la carte** — les appels AI Studio, les modèles partenaires en API managée, et tout dépassement. **Le plafond global applicatif devient alors ta seule protection réelle.** Ajoute-lui deux garde-fous côté Google : une alerte budgétaire Cloud Billing (qui notifie, mais n'arrête rien) et surtout un **abaissement volontaire des quotas Vertex de ton propre projet**, qui lui coupe pour de bon.

**d) Tu deviens responsable de ce que tes testeurs envoient.** Ouvrir l'outil à des tiers active le filtrage serveur des images en amont (A0-1). Un outil qui habille un mannequin attire des usages détournés ; l'instruction d'agent n'est pas un contrôle d'accès.

**e) Filigrane SynthID.** Toutes les images Google en portent un, invisible. Vérifie au premier essai qu'aucun filigrane **visible** n'apparaît sur la sortie API — ce serait rédhibitoire pour une fiche produit.

---

## 5. Le test à faire avant de basculer

Tes quatre agents et tes 14 blocs sont calibrés sur **Seedream**, et validés sur Seedream le 26/08. Nano Banana Pro ne répond pas à la même grammaire : il s'appuie davantage sur les images de référence et sur une consigne en langage naturel que sur une description exhaustive. Le prompt en 14 blocs fonctionnera, mais rien ne dit qu'il donnera le même résultat.

**Une heure de test tranche la question.** Même vêtement, même mannequin, même template, deux chaînes complètes :

1. Seedream v5 Pro edit via fal
2. Nano Banana Pro via Vertex

Comparés sur les quatre verrous du §14 de `PROCESS_GENERATION.md` : identité du mannequin, construction du vêtement, héritage des accessoires, absence de contamination du décor.

Trois issues possibles, toutes utiles :

- **Nano Banana tient** → tout passe sur Vertex, le crédit finance 500 séries et fal devient le repli.
- **Nano Banana dérive** → une variante d'agent adaptée à sa grammaire (consigne plus directive, description plus courte, poids sur les références). C'est du travail de prompt, pas d'architecture — la couche fournisseur est déjà en place.
- **Nano Banana échoue** sur le verrou d'identité → on garde Seedream pour les images et le crédit ne finance plus que les appels LLM. C'est alors 0,06 $ par série au lieu de 0,60 $ : le crédit devient quasi inépuisable, mais il ne paie plus la partie chère.

**Fais ce test avant d'ouvrir à un seul testeur externe.** C'est lui qui décide de tout le reste.

---

## 6. Une piste à évaluer en une heure : Virtual Try-On

Vertex propose un modèle **Virtual Try-On** — une image de personne, une image de vêtement, la personne portant le vêtement — facturé 0,12 $ l'image. C'est littéralement ton étage 2.

Il ne remplacera pas ton pipeline : pas de direction artistique, pas de décor choisi, pas de transfert de cadrage. Mais s'il tient mieux la fidélité du vêtement que ton swap, il peut devenir la brique de départ du plan maître, ton agent reprenant la main pour le décor et la lumière.

Ça vaut un essai, pas un pari. À faire après le test du §5, pas avant.
