# PRD — Studio fashionai · Application de génération de shootings mode

**Auteur :** Stephen (Pôle Web SIFCA)
**Date :** 9 septembre 2026
**Statut :** Draft v2 — remplace la v1 du 28/08
**Produit :** Le studio de génération — application web
**Documents liés :** `PRD.md` (site lead-gen) · `PROCESS_GENERATION.md` (le pipeline décodé) · `IMPLEMENTATION_GENERATION.md` (l'orchestration) · `shooting-produit-ia/` (le kit distribué)

---

## Ce qui change depuis la v1

| Sujet | v1 (28/08) | v2 (09/09) |
|---|---|---|
| **Le kit distribué** | Hypothétique, « le site distribue une méthode » | **Expédié** — V-USER et V-PRO en GPT/Gem, plus une adaptation Flow. Le kit produit **7 plans**, pas 3 |
| **Ligne gratuit / payant** | Gratuit = plan maître · payant = la série | **Cassée par le kit** : la couverture n'est plus le différenciateur. Voir §2, entièrement réécrit |
| **Fournisseur d'image** | Ouvert, « à décider » | **Deux voies arbitrées** : Seedream v5 edit via fal (référence de qualité) · Nano Banana Pro via Vertex (financé par le crédit) |
| **Modèle Google** | « Le crédit de 300 USD » | Utilisable **uniquement via Vertex**, jamais via AI Studio. 90 jours fermes. §12 chiffré |
| **Coût par série** | Non chiffré | **≈ 0,60 $** la série complète, ≈ 0,30 $ la démonstration. §14 |
| **Negative prompt** | Supposé disponible | **Absent** des endpoints d'édition Seedream et de Nano Banana. Conversion en affirmations — la règle existe déjà dans le kit |
| **État du code** | Rien n'existait | Un chemin de test tourne, avec quatre défauts identifiés. §0 |
| **Droits mannequins** | Question ouverte | **Incident** : trois mannequins sur quatre sur photos Unsplash étiquetées à tort. §13 |
| **Requirements** | 21 P0 | 26 P0 — cinq ajoutés par l'audit du 29/08 |

**Ce qui ne change pas :** les deux voies high ticket / low ticket, le pipeline en trois étages, la révélation progressive, les deux validateurs, la couche d'abstraction fournisseur, le principe du lead qui écrit en premier.

---

## 0. État réel au 9 septembre

Un PRD qui ne dit pas où en est la réalité est une liste de vœux. Voici l'écart.

| Brique | État | Reste à faire |
|---|---|---|
| Couche fournisseur | **Faite** — fal/Seedream edit avec `image_urls` et `image_size`, Vertex, Cloudflare, HuggingFace | Retirer `require('fs')`, monter les résolutions à 2K |
| Registre d'agents | Fait, versionné | **Embarquer au build** — `fs.readFileSync` casse sur Cloudflare |
| Catalogue mannequins / templates | Typé conformément au modèle de données | **Dépublier les trois mannequins sans droits établis** |
| Chaîne complète des 3 étages | Tourne | **Le triptyque est débranché du swap** — voir §8 |
| Validateurs | Écrits | **Jamais appelés** dans le chemin réel · extracteurs manquants · seuil 0,85 non implémenté |
| Orchestration | **Dans le navigateur** | Sortir côté serveur, workflow durable |
| Authentification | **Aucune** sur `/api/admin/*` | Bloquant avant tout déploiement |
| Crédits, plafonds, persistance | Néant | Rien n'est débité, rien n'est conservé |
| Kit distribué | **Expédié** — GPT/Gem V-USER et V-PRO, guide d'installation, adaptation Flow | Mesurer ce qu'il produit |

**Traduction :** le studio est en phase 2-3 du phasage, pas en phase 5. Ce qui manque n'est pas de l'interface, c'est le socle qui rend l'interface honnête.

---

## Pourquoi un document séparé

Le site et le studio ne résolvent pas le même problème, ne s'adressent pas au même moment de la relation, et ne se construisent pas au même moment.

| | Site lead-gen | Studio |
|---|---|---|
| Ce qu'il produit | Des conversations WhatsApp qualifiées | Des images exploitables en fiche produit |
| Ce qu'il coûte à l'usage | Rien | Des appels LLM et des générations d'images |
| Qui l'utilise | Tout visiteur | Un lead identifié, avec des crédits |
| Ce qui le fait échouer | Une promesse floue | **Une image ratée servie à un prospect** |
| Quand il se construit | Maintenant | Après que l'étage 2 donne des résultats commercialisables |

---

## 1. Problem Statement

Une marque mode a besoin d'une **série cohérente** — face, trois-quarts, dos — sur le même mannequin, dans le même décor, sous la même lumière, pour la même référence produit. Une belle image isolée ne remplit pas une fiche produit. Et c'est précisément ce qu'un usage naïf d'un générateur ne sait pas faire : demander « un autre angle » produit un autre mannequin, un autre vêtement, un autre décor.

**Le problème à résoudre est la cohérence de série, pas la qualité d'image.**

Le kit distribué résout ce problème **pour quelqu'un qui veut bien travailler** : installer un GPT, charger deux images, lire une fiche, copier sept prompts dans un moteur payant, recommencer. Yann le fera. **Fatou ne le fera jamais, et Awa ne le fera pas quarante fois par mois.**

Le studio n'existe pas parce que la méthode manque. **Il existe parce que l'exécution de la méthode coûte quarante minutes et une compétence que la cible n'a pas.**

**Contrainte structurante :** le studio sert deux populations opposées avec le même moteur — le lead high ticket à qui on montre ce dont on est capable avant de faire le travail à sa place, et le lead low ticket qui l'utilisera lui-même. Le produit doit fonctionner pour les deux **sans se dédoubler**.

---

## 2. La ligne de valeur — entièrement réécrite

**La v1 disait : gratuit = le plan maître, payant = la série. Le kit a rendu cette ligne caduque.** Un utilisateur qui installe la V-USER obtient les prompts des sept plans, gratuitement, pour toujours. La couverture ne peut plus être ce qui se vend.

### L'échelle réelle du produit, en trois étages

| | **Étage 0 — Le kit** | **Étage 1 — Le studio** | **Étage 2 — La prestation** |
|---|---|---|---|
| Ce qu'on livre | Des **prompts** | Des **images** | Des **fiches produit finies** |
| Coût marginal pour nous | **Zéro** | ≈ 0,60 $ la série | Notre temps |
| Ce que l'utilisateur fournit | Son compte, son moteur payant, 40 min par article | Deux photos et trois clics | Son catalogue |
| Pour qui | Yann, et les curieux | Awa | Fatou |
| Ce que ça nous rapporte | **Des leads et une preuve de demande** | Des crédits, et surtout des conversations | Du chiffre d'affaires |

**Le kit n'est pas une version d'attente du studio. C'est ce qui dé-risque le studio** : il dit, avant qu'on dépense un franc d'infrastructure, si la méthode intéresse quelqu'un — et il le dit avec des noms et des numéros WhatsApp.

### Ce que le studio vend réellement

Quatre choses, dont aucune n'est « plus de vues » :

1. **L'exécution.** Pas de compte à créer, pas d'outil à choisir, pas de copier-coller, pas de fiche à relire. Deux photos, trois clics, trois minutes.
2. **Les verrous appliqués par la machine.** Dans le kit, la cohérence dépend de la discipline de l'utilisateur. Dans le studio, les deux validateurs la font respecter et relancent quand elle est rompue. **C'est la différence entre une méthode et un produit.**
3. **Le volume.** Quarante articles par mois se traitent en série, pas en recopiant sept prompts quarante fois.
4. **Des images, pas du texte.** Le kit livre des prompts ; l'utilisateur doit encore payer un moteur et savoir s'en servir. Le studio livre le fichier.

### La nouvelle ligne gratuit / payant

> **Gratuit dans le studio — le plan maître.** Une image, sur *son* vêtement, avec le mannequin et le décor de son choix. Ce qui compte n'est pas qu'elle soit unique, c'est qu'elle soit **produite sans effort**.
> **Payant — la série et le volume.**

Ce n'est plus une frontière de contenu, c'est une frontière de service. Elle résiste au fait que le kit soit public, elle ne dépend pas du secret, et elle reste exactement à l'endroit où le pipeline se coupe en deux.

**Et le passage de l'un à l'autre reste le moment où l'utilisateur écrit sur WhatsApp.**

---

## 3. Les deux voies commerciales

| | **Voie A — High ticket** | **Voie B — Low ticket** |
|---|---|---|
| Qui | Marque, PME, agence | E-commerçante, créateur indépendant |
| Ce qu'il achète | Une prestation — on fait le travail | Un accès à l'outil |
| Rôle du studio | **Démonstration** : le lead voit son propre vêtement traité en 3 minutes | **Le produit lui-même** |
| Qui manipule l'outil | Nous, en interne, sur le catalogue du client | Le client |
| Ce qui compte | Que le plan maître soit irréprochable | Que le libre-service soit compréhensible sans accompagnement |
| Échéance | Dès la V1 du studio | Après validation de la voie A |

**Conséquence de conception :** interface publique et usage interne partagent le même moteur, la même bibliothèque et la même base. La différence tient aux crédits et aux plafonds, pas au code. **Ne construis pas deux applications.**

---

## 4. Goals

- **Produire une série cohérente de 3 images** — plan maître, trois-quarts, dos — sans que l'utilisateur écrive un prompt.
- **Verrouiller** l'identité, le vêtement, le décor, la lumière et l'étalonnage d'une image à l'autre, **par la machine et non par la discipline de l'utilisateur**.
- **Détecter les deux modes d'échec connus** — inversion et contamination — et relancer plutôt que de servir une image ratée.
- **Rendre la démonstration gratuite convaincante** : le plan maître seul doit suffire à provoquer un message WhatsApp.
- **Donner à voir pendant l'attente.**
- **Tenir une enveloppe de coût connue et plafonnée**, avec coupure automatique.
- **Conserver chaque prompt produit** — jeu de données d'entraînement de la phase 3.
- **Créer un template sans production photographique.**
- **Ne jamais contredire le kit.** Les agents du studio et ceux du kit partagent la même grammaire ; une divergence produirait deux qualités différentes sous une seule marque.

---

## 5. Non-Goals

- **Un éditeur d'images.** On génère, on livre.
- **Un générateur libre.** Pas de champ « écris ton prompt » — c'est ce que le kit fait déjà, ailleurs.
- **Un catalogue de mannequins illimité.** 4 à 6 aux droits **documentés** valent mieux que trente au statut douteux.
- **Le mode expert en V1.**
- **Le temps réel.** Interrogation toutes les 3 secondes.
- **L'hébergement d'un modèle propriétaire.**
- **Le paiement en ligne intégré en V1.** Recharge par message WhatsApp — c'est le mécanisme, pas un pis-aller.
- **Les catégories hors mode.**
- **Entraîner quoi que ce soit sur les images d'un client** sans accord écrit.
- **Concurrencer le kit.** Le studio ne doit pas chercher à donner moins pour protéger sa valeur : sa valeur est le service, pas la rétention d'information.

---

## 6. Personas

### S1 — Fatou, responsable com' **(voie A)**
Elle ne veut pas apprendre l'outil. Elle veut voir le résultat **sur sa collection**, pour décider si elle nous confie la production.
**Ce qui la convainc :** que le vêtement soit reconnaissable. Pas que l'image soit belle.
**Ce qui la perd :** une main à six doigts, un tissu qui ne tombe pas comme le sien, un écran qui tourne dans le vide.
**Elle n'installera jamais le kit.** C'est elle qui justifie l'existence du studio.

### S2 — Awa, e-commerçante **(voie B)**
30 à 80 articles par mois. Elle a besoin de comprendre l'interface sans rien lire et de refaire la même chose quarante fois.
**Ce qui compte :** le coût par série et la répétabilité.
**Elle pourrait installer le kit, et abandonnera au troisième article.** C'est le volume qui la ramène vers le studio.

### S3 — Yann, photographe **(voie B — exigeant)**
**C'est lui qui utilise le kit, et il le fera très bien.** Il jugera les points de tension du tissu et la cohérence de lumière entre les vues. Il trouvera les défauts et il les dira. **C'est le meilleur testeur de la V1** — et le client le moins probable du studio.
**Ce qu'il veut :** les deux champs texte. Ne les cache pas.

### S4 — Nous, en interne **(voie A — production)**
L'usage le plus intensif du studio en V1 sera le nôtre. L'admin doit permettre de rejouer un shoot, lire les prompts, comparer deux versions d'agent.

---

## 7. Le produit — ce qu'est un shoot

Un **shoot** = un vêtement × un mannequin × un template → une série.

### Ce que l'utilisateur fournit

| Entrée | Statut | Ce qu'elle alimente |
|---|---|---|
| 1 à N photos du vêtement | Requis | L'agent `cloth` |
| **Précisions sur le vêtement** | Optionnel, replié | `precisions` — rattrape ce que la photo ne montre pas |
| Un mannequin de la bibliothèque | Requis | `perso` |
| Un template | Requis | Image de scène + cadrages + ratios |
| **Ajustements** | Optionnel, replié | `modifs` — direction artistique |

**Les deux champs texte séparent l'outil jouet de l'outil professionnel.** Repliés par défaut, jamais supprimés.

### Ce qu'un template contient

| Composant | Rôle |
|---|---|
| Une image de scène source | Ambiance, lumière, étalonnage |
| **Deux cadrages en texte** — sept postes chacun | Géométrie des vues |
| Ratios fixes | 2:3 maître, 1:1 vues |
| Clé d'instructions d'agent | Verrous de morphologie, anti-idéalisation |

Les cadrages sont du texte, pas des images — décision du 26/08. Trois conséquences : créer un template devient presque gratuit, la question des droits disparaît, et **le mode d'échec le plus grave du transfert disparaît structurellement**.

### Ce que le système produit

| Étape | Générations | Appels LLM | Crédit |
|---|---|---|---|
| Triptyque — normalisation du vêtement | 1 | 1 | **Offert** |
| Plan maître | 1 | 1 | **1** |
| Vue 02 — trois-quarts | 1 | 1 | **1** |
| Vue 03 — dos | 1 | 1 | **1** |
| **Total série** | **4** | **4** | **3** |

**Pourquoi trois vues quand le kit en propose sept.** Le kit est gratuit à exécuter pour nous : son coût marginal est nul, sept plans n'y coûtent rien. Chaque vue du studio coûte 0,13 $. Les sept plans du kit se justifient éditorialement ; les trois du studio se justifient économiquement — face, trois-quarts, dos couvrent une fiche produit. **Les quatre plans supplémentaires (profil strict, buste, taille, macro) sont le premier catalogue d'extensions payantes**, pas un manque.

---

## 8. Le pipeline — trois étages

```
ÉTAGE 1   cloth (LLM) → triptyque (image)
              ↓ OBLIGATOIRE ET BLOQUANT
ÉTAGE 2   swap (LLM) → plan maître (image)
              ↓ le transfert exige le prompt ET l'image du maître
ÉTAGE 3   2 × [ transfert (LLM) → vue (image) ]
          les deux branches EN PARALLÈLE
```

### La dépendance qui doit être écrite, pas supposée

**Le swap reçoit le triptyque, jamais les photos brutes de l'utilisateur.**

C'était implicite en v1, et c'est exactement ce qui a été cassé dans la première implémentation : le triptyque y était généré *en parallèle* du plan maître et ne lui était jamais transmis, gagnant quarante secondes au prix du mécanisme central.

Le triptyque n'est pas une illustration : c'est le vêtement **normalisé** — dos déduit et explicite, pièces séparées, lumière homogène, fond neutre. Le swap travaille sur cette version propre, pas sur une photo prise au téléphone où le dos n'est pas visible. **Cette dépendance est un requirement, pas une préférence** (A0-22).

### Révélation progressive, dans cet ordre imposé

1. **Le triptyque** — l'utilisateur voit que ça travaille sur *son* vêtement. C'est ce qui le fait rester.
2. **Le plan maître** — le moment « waouh ».
3. **Les deux vues**, ensemble.

Cette progression laisse partir celui qui est déjà convaincu par le plan maître — comportement souhaité côté voie A.

**Deux agents dédiés, pas un agent générique.** `TRANSFERT_DOS` s'appuie sur le panneau 3 du triptyque comme autorité ; `TRANSFERT_PROFIL` déduit le profil de la continuité entre les panneaux 2 et 3, faute de panneau latéral.

---

## 9. Interface — même identité, registre différent

```
background  #F6F6F8      surface     #FFFFFF
ink         #0B0B0D      ink-soft    #56565F
rule        #DCDCE2      accent      #B7410E   (sienne brûlée)
whatsapp    #25D366      (boutons WhatsApp uniquement)
```

**Trois couleurs, trois rôles qui ne se recouvrent jamais :** l'encre porte toutes les actions · le vert WhatsApp porte la seule action qui compte · la sienne brûlée est de l'identité, **jamais sur un bouton**, une apparition par écran.

`border-radius: 0` partout, aucune ombre, filets de 1 px, images à fond perdu.

**Le registre change.** Le site est une page éditoriale qu'on lit ; le studio est un **outil qu'on manœuvre** :

- **Bodoni Moda uniquement dans le titre de page.** DM Mono et Archivo font tout le reste.
- Rythme plus dense qu'une landing — une console, pas une page de vente.
- **L'interface s'efface derrière les images générées par l'utilisateur.**

| # | Écran | Ce qui le définit |
|---|---|---|
| 08 | État initial | Trois étapes numérotées, encart de coût, bouton Générer |
| 09 | **En génération** | **Le plus important.** Progression en trois segments, révélation progressive. Un seul point carré qui pulse. **Aucun spinner, aucun squelette, aucun dégradé** |
| 10 | Série livrée | Les quatre images sont le contenu. Bande WhatsApp en bas |
| 11 | Les sélecteurs | Mannequin et template, deux grilles jumelles |

Prompts Stitch complets : artefact **Prompts Stitch fashionai**, 08 à 11.

---

## 10. Requirements

### Must-Have (P0)

| # | Exigence | Critères d'acceptation |
|---|---|---|
| A0-1 | Téléversement 1..N photos, **filtrage serveur avant tout appel LLM** | Given une image non conforme, When téléversée, Then rejetée côté serveur, avant l'agent |
| A0-2 | Champs « Précisions » et « Ajustements », optionnels, repliés | Given l'utilisateur remplit, When il génère, Then le texte va à `cloth` et `swap` respectivement |
| A0-3 | Mannequins avec `rights_status` **vérifiable**, publication conditionnée | Given un mannequin sans provenance documentée, When on tente de le publier, Then refus |
| A0-4 | Templates : scène, deux cadrages en 7 postes, ratios, clé d'agent | Given un template publié, When sélectionné, Then cadrages et ratios chargés |
| A0-5 | **Workflow durable** trois étages, étage 3 parallélisé | Given une panne à l'étage 3, When reprise, Then triptyque et maître non régénérés |
| A0-6 | **Révélation progressive** | Given un shoot en cours, When le triptyque existe, Then il s'affiche avant le maître |
| A0-7 | Interrogation `GET /api/shoots/:id` à 3 s, **coupure à 10 min** | Given un workflow bloqué, When 10 min, Then erreur explicite et arrêt |
| A0-8 | **Validateur d'inversion** avant génération du maître | Given un negative contenant un terme du triptyque, When validation, Then l'appel LLM est relancé |
| A0-9 | **Validateur de contamination**, seuil de similarité **0,85** | Given un bloc verrouillé divergent, When validation, Then l'étape est relancée |
| A0-10 | Reprises plafonnées à **2**, puis échec visible en admin | Given 3 échecs, When plafond atteint, Then erreur avec message conservé |
| A0-11 | **Couche d'abstraction fournisseur** | Given un audit du dépôt, When on cherche un appel direct hors `lib/providers`, Then aucun |
| A0-12 | Crédits **débités à la création**, remboursés sur échec | Given un workflow en échec, When il se termine, Then crédits recrédités |
| A0-13 | **Trois plafonds cumulés** : 3/lead/jour · 10/IP/jour · **global quotidien avec coupure** | Given le plafond global atteint, When nouveau shoot, Then refus explicite, sans débit |
| A0-14 | `master_prompt` et `agent_versions` conservés | Given un shoot terminé, When fiche admin, Then prompt complet et versions lisibles |
| A0-15 | **Gratuit = plan maître.** Vues débloquées par `POST /api/shoots/:id/views` | Given un shoot en maître seul, When crédits arrivent, Then vues lancées sans régénérer le maître |
| A0-16 | **Recharge par message WhatsApp** avec code unique | Given plus de crédits, When clic CTA, Then WhatsApp s'ouvre avec le code du shoot |
| A0-17 | Avertissement `[estimation]` remonté à l'interface | Given une seule photo de face, When triptyque produit, Then « Le dos a été estimé… » s'affiche |
| A0-18 | Réglage **« ne pas ajouter d'accessoires non visibles »** | Given réglage actif, When `cloth` s'exécute, Then aucun accessoire absent des photos |
| A0-19 | Admin : rejeu, lecture des prompts, comparaison de versions, erreurs | Given un shoot en erreur, When ouvert, Then étape fautive, message et prompt visibles |
| A0-20 | Système graphique appliqué, **registre outil** | Given un audit des 4 écrans, When on compte Bodoni, Then titre de page uniquement |
| A0-21 | Responsive mobile-first à 360 px | Given une génération sur 360 px, When elle progresse, Then les 4 emplacements restent lisibles |
| **A0-22** | **Le swap et les vues reçoivent le triptyque, jamais les photos brutes** | Given un shoot, When le prompt swap est composé, Then ses références contiennent `triptychUrl` et aucune photo d'origine |
| **A0-23** | **Authentification sur `/admin/*` et `/api/admin/*`**, refus par défaut si le secret est absent | Given une requête sans secret, When elle atteint la route, Then 401 avant tout appel facturé |
| **A0-24** | **L'orchestration s'exécute côté serveur**, jamais dans le navigateur | Given l'onglet fermé en cours de génération, When on rouvre le shoot, Then il a continué |
| **A0-25** | **Les validateurs sont appelés dans le chemin réel**, avec leurs extracteurs `extractBlock` et `extractNegative` | Given un cas de test forgé, When le shoot tourne, Then la reprise se déclenche effectivement |
| **A0-26** | **Négatifs convertis en affirmations** quand le fournisseur n'accepte pas de negative prompt | Given Nano Banana ou Seedream edit, When le prompt est composé, Then aucune liste d'exclusion n'est envoyée en clair |

### Nice-to-Have (P1)

| # | Exigence | Notes |
|---|---|---|
| A1-1 | Téléchargement de la série en archive nommée par référence produit | Ce qu'Awa fera 40 fois par mois |
| A1-2 | Historique des shoots par lead, avec reprise | Évite de tout recommencer |
| A1-3 | **Vues supplémentaires à l'unité** — profil strict, buste, taille, macro | Les quatre plans du kit que le studio ne fait pas encore. **Premier catalogue d'extensions payantes** |
| A1-4 | Préréglage mannequin + template | Cohérence de marque sur un catalogue entier |
| A1-5 | Comparateur avant / après | La preuve la plus convaincante, gratuite à produire |
| A1-6 | Crédits bonus contre témoignage ou autorisation d'usage | Alimente la galerie du site |
| A1-7 | **Import d'une fiche `@tenue` produite par le kit** | Un utilisateur du kit passe au studio sans repartir de zéro. Passerelle étage 0 → étage 1 |

### Version 2

| # | Exigence |
|---|---|
| AV2-1 | **Template personnalisé** décrit en langage naturel — la plus vendeuse des évolutions, à réserver au payant |
| AV2-2 | Mode expert : réécriture directe du prompt maître |
| AV2-3 | Variantes de mannequin — coiffure, maquillage — sans nouveau shooting |
| AV2-4 | WhatsApp Cloud API : attribution automatique des crédits |
| AV2-5 | **Génération vidéo** à partir du plan maître — l'adaptation Flow du kit en donne déjà la grammaire |
| AV2-6 | Paiement mobile money (Wave, Orange Money, MTN) via Paystack ou Flutterwave |
| AV2-7 | Bascule vers un modèle entraîné maison, alimentée par les `master_prompt` conservés |

---

## 11. Modèle de données

```
models
  id, name, thumbnail_path, reference_image_path,
  rights_status,            -- provenance vérifiable, pas une formule
  rights_document_path, published

templates
  id, slug, name, thumbnail_path, source_image_path,
  master_aspect_ratio, view_aspect_ratio,
  agent_instructions_key, published

template_framings           -- les cadrages, en TEXTE
  id, template_id, position, slug, name,
  scale_text, camera_text, orientation_text, posture_text,
  gaze_text, placement_text, composition_text

garments
  id, lead_id, source_images[] (json),
  precisions_text, no_invented_accessories,
  triptych_prompt, triptych_path, has_estimations, created_at

shoots
  id, lead_id, garment_id, model_id, template_id,
  modifs_text, master_prompt, master_image_path,
  status, credits_spent, agent_versions (json),
  provider_image, provider_llm,      -- quel moteur a produit ce shoot
  cost_cents,                        -- coût réel constaté
  error_message, created_at, updated_at

shoot_views
  id, shoot_id, framing_slug, position,
  prompt, image_path, status, retries, error_message, created_at
```

**Deux colonnes ajoutées en v2.** `provider_image` / `provider_llm` et `cost_cents` : sans elles, impossible de comparer la qualité entre deux moteurs ni de connaître la marge réelle par crédit — les deux chiffres qui décident de la voie B.

**Trois champs à ne pas perdre de vue.** `rights_status` — d'où vient ce visage, et a-t-on le droit de l'exploiter commercialement ? `master_prompt` — rejeu, débogage, jeu d'entraînement. `agent_versions` — sans lui, on ne saura jamais si une dégradation vient de l'agent, du modèle ou du tirage.

**Les agents vivent dans `/agents/*.md`, embarqués au build par un `registry.ts` versionné. Jamais en base, jamais lus au runtime.**

---

## 12. Architecture et fournisseurs

| Couche | Choix |
|---|---|
| Orchestration | **Cloudflare Workflows** — gratuit, 3 000 étapes/jour, l'attente ne consomme pas de CPU |
| Application | Next.js sur Cloudflare Workers, même dépôt que le site |
| Base | Cloudflare D1, mêmes tables `leads` que le site |
| Images produites | Stockage objet — **premier poste qui sortira du gratuit** |
| Génération et LLM | Couche d'abstraction, bascule par variable d'environnement |
| Suivi client | Interrogation 3 s, coupure 10 min |

### Les deux voies de génération, arbitrées

| | **Seedream v5 Pro edit** (fal) | **Nano Banana Pro** (Vertex) |
|---|---|---|
| Références acceptées | 10 | **14**, cohérence annoncée sur 5 personnes |
| Prix par image 2K | ≈ 0,07 $ | 0,134 $ |
| Qui paie | Carte | **Le crédit de 300 USD** |
| Calibrage des agents | **Validé le 26/08** | À vérifier — grammaire différente |
| Negative prompt | Absent de l'endpoint edit | Absent |

**Pour les agents LLM :** `cloth`, `transfert_profil` et `transfert_dos` en **Gemini 3.6 Flash** ; `swap` en Flash aussi, à monter en **Gemini 3 Pro** si le validateur d'inversion se déclenche plus d'une fois sur dix — c'est lui qui porte le raisonnement difficile.

**Le crédit ne paie que ce qui passe par Vertex.** Un appel à `generativelanguage.googleapis.com` est facturé à part, sur la carte. Le compte d'essai dure **90 jours fermes** : passer en compte payant conserve le crédit restant mais **ne prolonge pas le délai**, et active la carte pour tout ce que le crédit ne couvre pas.

**Un risque déjà résolu ailleurs.** Ni Seedream edit ni Nano Banana n'acceptent de negative prompt. La règle de conversion existe déjà — elle est écrite dans le guide d'installation du kit : intégrer chaque négatif dans son bloc sous forme affirmative, transformer l'éviction en affirmation exclusive, viser 250 à 400 mots au lieu de 350 à 550, doubler chaque verrou impératif d'une formulation descriptive. **Le studio applique cette même bascule** (A0-26). Ne la réinvente pas, réutilise-la — et si tu la modifies, modifie-la dans les deux.

**Point d'architecture non négociable : aucun appel direct à une API de génération hors de `lib/providers`.**

### Ordre de construction

1. La couche fournisseur seule, avec une page de test interne **authentifiée**.
2. L'étage 1 isolé — téléversement → triptyque.
3. L'étage 2, **triptyque branché**, avec le validateur d'inversion. **Fin de cette étape : le produit gratuit est complet et livrable.**
4. L'étage 3 — les deux vues, le validateur de contamination.
5. Les crédits et les plafonds.
6. L'admin.

> **Ne construis pas l'étage 3 avant que l'étage 2 ne donne des résultats que tu juges commercialisables.** Si le plan maître n'est pas bon, les vues ne le rattraperont pas — elles en héritent.

---

## 13. Sécurité, droits et honnêteté du rendu

**Le filtrage image est côté serveur, avant le LLM.** Les agents ont une Étape 0bis — refus des sujets mineurs ou d'âge ambigu, refus du contenu sexuel explicite. C'est nécessaire. **Mais une instruction de prompt n'est pas un contrôle d'accès.** L'agent est la seconde barrière, jamais la première. Un outil qui fait porter un vêtement à un mannequin attire par construction des usages détournés.

### L'incident des mannequins — à traiter avant toute publication

Trois des quatre mannequins du catalogue sont des photos **Unsplash de personnes réelles**, avec `rights_status: 'Libre de droits · Licence Studio Exclusif'`.

La licence Unsplash porte sur le droit d'auteur du **photographe**. Elle ne transmet pas le droit à l'image de la **personne**. Or l'usage visé est le plus exigeant qui soit : un visage identifiable réutilisé comme mannequin dans des visuels commerciaux vendus à des marques. « Licence Studio Exclusif » affirme en outre une exclusivité que personne n'a accordée.

**Le champ censé nous protéger a été rempli avec une formule rassurante au lieu d'un fait.** C'est le mode d'échec à retenir : `rights_status` doit contenir une **provenance vérifiable** — d'où vient l'image, quel document l'autorise, où il est archivé — et la publication doit être refusée sans elle (A0-3).

Ces trois mannequins n'ont d'ailleurs pas de `character_sheet` : le verrou d'identité ne peut pas fonctionner pour eux.

### Deux comportements à dire dans l'interface

- Les escarpins nude ont été **inventés** par `cloth` — non visibles sur la photo, coupée aux chevilles. Conforme à sa règle d'accessoires, mais une marque qui vend un pantalon ne veut pas qu'on lui invente des chaussures. D'où A0-18.
- **La morphologie rendue est celle du mannequin choisi, pas de la personne sur la photo d'entrée.** Comportement voulu, mais à écrire : les verrous anti-idéalisation protègent le mannequin, pas la personne d'origine.

**Droits :** aucun entraînement sur les images d'un client sans accord écrit. Aucune image de campagne d'une autre marque dans le produit.

---

## 14. Économie unitaire

Ce que coûte une série, en 2K, appels LLM inclus.

| Poste | Nano Banana Pro (Vertex) | Seedream v5 edit (fal) |
|---|---|---|
| 4 appels LLM — Gemini 3.6 Flash | ≈ 0,06 $ | ≈ 0,06 $ |
| 4 images | 0,54 $ | ≈ 0,28 $ |
| **Série complète** | **≈ 0,60 $** | **≈ 0,34 $** |
| **Démonstration seule** (triptyque + maître) | ≈ 0,30 $ | ≈ 0,20 $ |

**Ce que couvre le crédit de 300 USD :** environ **500 séries complètes**, ou **1 000 démonstrations gratuites**.

**Lire ces chiffres comme une contrainte, pas comme une réserve.** Un seul testeur qui passe son catalogue de 40 articles consomme 24 $ en un après-midi. **Le plafond global quotidien avec coupure n'est donc pas une précaution : c'est ce qui rend le test multi-utilisateurs possible.** Ordre de grandeur pour tenir 90 jours : **3 $ par jour**, soit 5 séries complètes ou 10 démonstrations.

Deux garde-fous côté Google en plus du plafond applicatif : une alerte budgétaire Cloud Billing (qui notifie sans rien arrêter) et surtout un **abaissement volontaire des quotas Vertex du projet**, qui coupe pour de bon.

---

## 15. Success Metrics

**Qualité — la seule qui décide de la suite**

- **Séries livrées sans défaut visible**, jugées à l'œil sur 30 séries : cible **≥ 80 %**. Sous 60 %, on ne montre le studio à personne.
- **Taux de reprise déclenchée par les validateurs** : à mesurer, pas à cibler. Une valeur élevée signale un agent à corriger.
- **Taux d'échec de workflow** : **< 3 %**.
- **Durée médiane d'une série** : **< 5 min**, dont **< 60 s jusqu'au triptyque**.

**Usage**

- **Abandon avant la fin de la génération** — mesure directe de la qualité de l'écran 09.
- **Passage maître → série** parmi ceux qui ont vu leur plan maître : **la métrique commerciale centrale**.
- **Messages WhatsApp de recharge reçus.**
- **Séries par utilisateur récurrent** — sépare l'essayeur du client low ticket réel.

**Le kit comme instrument de mesure**

Le kit est distribué et ne coûte rien à l'usage : c'est le meilleur capteur de demande disponible avant que le studio existe.

- **Téléchargements du kit** et part des leads qui l'installent réellement.
- **« As-tu réussi ta première image ? »** à J+3, deux boutons WhatsApp. **L'écart entre les deux réponses est la donnée la plus décisive du projet** : si beaucoup n'y arrivent pas seuls, le studio a un marché démontré, avec des noms dedans. Si presque tous y arrivent, la valeur est dans la prestation, pas dans l'outil.
- **Conversion kit → studio** une fois le studio ouvert.

**Économie**

- **Coût réel par série livrée** — désormais lisible en base via `cost_cents`.
- **Marge par crédit** une fois le crédit Google épuisé. **Ce chiffre décide de la voie B.**
- **Part du plafond global consommée par jour.**

---

## 16. Open Questions

**Tranchées depuis la v1**

- Fournisseur d'image : Seedream v5 edit via fal comme référence de qualité, Nano Banana Pro via Vertex pour la période du crédit.
- Le crédit Google : Vertex uniquement, 90 jours fermes, non prolongeables par l'upgrade.
- La conversion des négatifs en affirmations : règle écrite, réutilisable telle quelle depuis le kit.
- Le kit : expédié, en V-USER et V-PRO, plus une adaptation Flow.

**Encore ouvertes**

- **[Technique] Nano Banana Pro tient-il les quatre verrous ?** Une heure de test : même vêtement, même mannequin, deux chaînes complètes, comparées sur identité du mannequin, construction du vêtement, héritage des accessoires, contamination du décor. **À faire avant d'ouvrir à un seul testeur externe** — c'est ce test qui décide si le crédit finance les images ou seulement les LLM.
- **[Technique] Les deux cadrages texte et les deux agents dédiés ont-ils été testés** contre les transferts par image ? Réponse encore attendue.
- **[Produit] `ref_5` est absent du graphe Magnific** — oubli, ou cadrage écarté ?
- **[Produit] L'image `source` de chaque template** est un livrable à produire, template par template.
- **[Produit] Combien de générations gratuites avant de demander un message WhatsApp ?** À calibrer sur les 50 premiers utilisateurs.
- **[Produit] Le studio doit-il rattraper les quatre plans du kit ?** Recommandation : non en V1, oui en extensions payantes à l'unité (A1-3).
- **[Juridique] Provenance des mannequins.** Sans réponse documentée, la bibliothèque ne peut pas être publiée.
- **[Juridique] CGU du studio** : propriété des images générées, usage commercial autorisé, absence d'entraînement sur les images clients. **Nécessaire avant la première génération publique.**
- **[Juridique] Licence du kit distribué.** Il est désormais public : que peut-on en faire, que ne peut-on pas ? À écrire dans le kit lui-même, pas seulement sur le site.
- **[Opérations] Qui juge les 30 séries, et selon quelle grille ?** Sans grille écrite, « sans défaut visible » ne veut rien dire.
- **[Nettoyage] Les UUID Magnific traînent dans les documents de kit** — à retirer avant toute publication.

---

## 17. Phasage

- **Phase 0 — Valider le pipeline hors application.** Cadrages texte et agents dédiés testés, comparés aux transferts par image. **Rien ne se développe avant.**
- **Phase 1 — La couche fournisseur**, avec une page de test **authentifiée**. *(Faite, à sécuriser.)*
- **Phase 2 — Étage 1.** Téléversement → triptyque. *(Faite.)*
- **Phase 3 — Étage 2, triptyque branché**, validateur d'inversion appelé. **Fin de cette phase : le produit gratuit est complet et livrable** — le moment où le studio devient montrable à un lead high ticket.
- **Phase 4 — Étage 3** et validateur de contamination, workflow durable complet, orchestration côté serveur.
- **Phase 5 — Interface publique.** Les quatre écrans, la révélation progressive, le suivi par interrogation.
- **Phase 6 — Crédits, plafonds, recharge WhatsApp.** Le studio devient la quatrième raison d'écrire.
- **Phase 7 — Admin et instrumentation.** Rejeu, prompts, comparaison de versions, coût par série.
- **Phase 8 — Voie B.** Historique, archive, préréglages, extensions de vues, mobile money. **Seulement si le passage maître → série le justifie.**

**Quatre avertissements.**

La tentation sera de construire l'interface d'abord — c'est la partie visible et la plus agréable. Mais **le studio ne vaut rien tant que l'étage 2 ne produit pas des images commercialisables**, et cela se juge sur une page de test moche.

La deuxième sera de servir une image ratée pour ne pas laisser l'utilisateur les mains vides. **C'est le pire résultat possible** sur une démonstration censée convaincre. Un appel LLM relancé coûte une fraction d'une génération ratée ; une image ratée coûte un lead.

La troisième est nouvelle : **ne cherche pas à protéger le studio en appauvrissant le kit.** Le kit est déjà public et il travaille pour toi — il qualifie, il prouve la demande, il ne coûte rien. La valeur du studio n'est pas ce qu'il retient, c'est ce qu'il fait à la place de l'utilisateur.

Enfin, la voie B ne se décide pas à l'intuition. Elle se décide sur deux chiffres : le taux de passage maître → série, et la marge par crédit une fois le crédit Google épuisé. **Tant que ces deux chiffres n'existent pas, le studio est un outil de démonstration pour la voie A** — et c'est déjà largement suffisant pour justifier de le construire.
