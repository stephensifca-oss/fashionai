# PRD — Studio fashionai · Application de génération de shootings mode

**Auteur :** Stephen (Pôle Web SIFCA)
**Date :** 28 août 2026
**Statut :** Draft v1
**Produit :** Le studio de génération — application web
**Relation au site :** V2 du site `fashionai.agency` du point de vue du calendrier, **produit distinct** du point de vue de la conception
**Documents liés :** `PRD.md` (site lead-gen) · `PROCESS_GENERATION.md` (le pipeline décodé) · `IMPLEMENTATION_GENERATION.md` (l'orchestration)

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

Le site distribue une méthode. **Le studio l'exécute à la place du lead.** C'est un produit à part, avec sa propre économie et son propre seuil de qualité.

---

## 1. Problem Statement

Le kit distribué sur le site fonctionne — mais il exige que l'utilisateur sache manipuler un outil de génération, enchaîner trois agents, verrouiller une identité, transférer un cadrage. **Fatou ne le fera jamais.** Yann le fera, une fois, puis abandonnera devant le temps que ça prend.

Le kit démontre la méthode. Il ne produit pas les images.

Or ce dont une marque a besoin, ce n'est pas d'une image impressionnante : c'est d'**une série cohérente** — face, trois-quarts, dos — sur le même mannequin, dans le même décor, avec la même lumière, pour la même référence produit. Une seule belle image ne remplit pas une fiche produit. Et c'est précisément ce qu'un usage naïf d'un générateur ne sait pas faire : demander « un autre angle » produit un autre mannequin, un autre vêtement, un autre décor.

**Le problème à résoudre est la cohérence de série, pas la qualité d'image.** C'est là qu'est la valeur, c'est là qu'est la difficulté technique, et c'est ce que le pipeline validé le 26/08 résout.

**Contrainte structurante :** le studio sert deux populations opposées avec le même moteur — le lead high-ticket à qui on montre ce dont on est capable avant de faire le travail à sa place, et le lead low-ticket qui l'utilisera lui-même, en libre-service. Le produit doit fonctionner pour les deux **sans se dédoubler**.

---

## 2. Le principe directeur : le gratuit démontre, le payant livre

Le pipeline se coupe naturellement en deux, et la ligne de monétisation tombe exactement là.

> **Gratuit — le plan maître.** Une image, sur *son* vêtement, avec le mannequin et le décor de son choix.
> **Payant — la série.** Le plan maître plus deux vues rigoureusement cohérentes : ce qui fait réellement une fiche produit.

Ce n'est pas un arbitrage commercial plaqué sur la technique, c'est la technique elle-même : les étages 1 et 2 forment un bloc autonome, l'étage 3 en dépend entièrement.

**Et le passage de l'un à l'autre est exactement le moment où l'utilisateur écrit sur WhatsApp.** Le studio n'est donc pas une dépense d'acquisition — c'est la quatrième raison d'écrire prévue au §2 du PRD site, et la seule qui soit récurrente par nature.

---

## 3. Les deux voies — ce que le studio sert

Le studio est le même moteur pour deux modèles économiques distincts. Il faut le concevoir en le sachant, sinon on construit deux produits ou aucun.

| | **Voie A — High ticket** | **Voie B — Low ticket** |
|---|---|---|
| Qui | Marque, PME, agence | E-commerçante, créateur indépendant |
| Ce qu'il achète | Une prestation — on fait le travail | Un accès à l'outil |
| Rôle du studio | **Démonstration** : le lead voit son propre vêtement traité en 3 minutes | **Le produit lui-même** |
| Qui manipule l'outil | Nous, en interne, sur le catalogue du client | Le client |
| Ce qui compte | Que le plan maître soit irréprochable | Que le libre-service soit compréhensible sans accompagnement |
| Échéance | Dès la V1 du studio | Après validation de la voie A |

**Conséquence de conception :** l'interface publique et l'usage interne partagent le même moteur, la même bibliothèque et la même base. La différence tient aux crédits et aux plafonds, pas au code. **Ne construis pas deux applications.**

---

## 4. Goals

- **Produire une série cohérente de 3 images** — plan maître, trois-quarts, dos — à partir de photos de vêtement fournies par l'utilisateur, sans qu'il ait à écrire un prompt.
- **Verrouiller l'identité, le vêtement, le décor, la lumière et l'étalonnage** d'une image à l'autre. C'est la valeur unique.
- **Détecter automatiquement les deux modes d'échec connus** — inversion et contamination — et relancer plutôt que de servir une image ratée.
- **Rendre la démonstration gratuite complète et convaincante** : le plan maître seul doit suffire à provoquer un message WhatsApp.
- **Donner à voir pendant l'attente** — le pipeline dure trois cycles, l'écran ne doit jamais rester vide.
- **Rester dans une enveloppe de coût maîtrisée**, avec un plafond global qui coupe.
- **Conserver chaque prompt produit** — c'est le futur jeu de données d'entraînement de la phase 3 de la stratégie modèles.
- **Créer un template sans production photographique** : une image de scène et deux blocs de texte.

---

## 5. Non-Goals

- **Un éditeur d'images.** Pas de retouche, pas de calques, pas de gomme. On génère, on livre.
- **Un générateur libre.** Pas de champ « écris ton prompt ». Les agents sont le produit ; les exposer, c'est le donner.
- **Un catalogue de mannequins illimité.** 4 à 6 mannequins aux droits vérifiés valent mieux que trente au statut douteux.
- **Le mode expert en V1.** Réécriture du prompt maître, template personnalisé décrit en langage naturel, variantes de coiffure : prévus, mais après.
- **Le temps réel.** Pas de SSE, pas de WebSocket. Interrogation toutes les 3 secondes.
- **L'hébergement d'un modèle propriétaire.** Phase 3 de la stratégie, pas ce document.
- **Le paiement en ligne intégré en V1.** Les crédits se rechargent par message WhatsApp — c'est le mécanisme, pas un pis-aller.
- **Les catégories hors mode.** Le pipeline est calibré sur le vêtement porté.
- **Entraîner quoi que ce soit sur les images des clients** sans accord écrit explicite.

---

## 6. Personas

Ce sont ceux du site, vus au moment où ils cliquent sur « Générer ».

### S1 — Fatou, responsable com' **(voie A — démonstration)**
Elle ne veut pas apprendre l'outil. Elle veut voir ce que ça donne **sur sa collection à elle**, pour décider si elle nous confie la production. Elle importe deux photos, choisit un mannequin, clique, et juge en trois minutes.
**Ce qui la convainc :** que le vêtement soit reconnaissable. Pas que l'image soit belle.
**Ce qui la perd :** une main à six doigts, un tissu qui ne tombe pas comme le sien, un écran qui tourne dans le vide.

### S2 — Awa, e-commerçante **(voie B — libre-service)**
30 à 80 articles par mois. C'est elle la cliente du SaaS. Elle a besoin de comprendre l'interface sans lire quoi que ce soit, et de refaire la même chose 40 fois sans réfléchir.
**Ce qui compte pour elle :** le coût par série et la répétabilité.

### S3 — Yann, photographe **(voie B — exigeant)**
Il jugera les points de tension du tissu et la cohérence de la lumière entre les vues. C'est lui qui trouvera les défauts, et c'est lui qui les dira. **C'est le meilleur testeur de la V1.**
**Ce qu'il veut :** les deux champs texte — précisions vêtement, ajustements. Ne les cache pas.

### S4 — Nous, en interne **(voie A — production)**
L'usage le plus intensif du studio en V1 sera le nôtre : traiter le catalogue d'un client high-ticket. L'admin doit permettre de rejouer un shoot, de lire les prompts et de comparer deux versions d'agent.

---

## 7. Le produit — ce qu'est un shoot

Un **shoot** = un vêtement × un mannequin × un template → une série.

### Ce que l'utilisateur fournit

| Entrée | Statut | Ce qu'elle alimente |
|---|---|---|
| 1 à N photos du vêtement | Requis | L'agent `cloth` |
| **Précisions sur le vêtement** (texte libre) | Optionnel, replié | Le champ `precisions` — rattrape ce que la photo ne montre pas |
| Un mannequin de la bibliothèque | Requis | La référence `perso` |
| Un template | Requis | L'image de scène + les cadrages + les ratios |
| **Ajustements** (texte libre) | Optionnel, replié | Le champ `modifs` — direction artistique |

**Les deux champs texte séparent l'outil jouet de l'outil professionnel.** Ils restent repliés par défaut, ils ne disparaissent jamais.

### Ce qu'un template contient réellement

Un template n'est pas un décor. C'est un ensemble complet :

| Composant | Rôle |
|---|---|
| Une image de scène source | L'ambiance, la lumière, l'étalonnage |
| **Deux cadrages rédigés en texte** — sept postes chacun | La géométrie des vues de la série |
| Des ratios fixes | 2:3 pour le maître, 1:1 pour les vues |
| Une clé d'instructions d'agent | Verrous de morphologie, anti-idéalisation |

**Décision du 26/08 — les cadrages sont du texte, plus des images.** Les références utilisées dans le space Magnific sont des photos de campagne appartenant à d'autres marques : exploitables en interne, pas redistribuables dans un produit public. L'agent n'en extrayait de toute façon que sept postes descriptifs — les figer en texte ne perd rien.

**Trois conséquences, toutes favorables :**
1. Créer un template devient presque gratuit — une image et deux paragraphes.
2. La question des droits disparaît.
3. **Le mode d'échec le plus grave du transfert disparaît structurellement** : il n'y a plus d'image d'où contaminer.

### Ce que le système produit

| Étape | Générations | Appels LLM | Crédit |
|---|---|---|---|
| Normalisation du vêtement — le triptyque | 1 | 1 | **Offerte** |
| Plan maître | 1 | 1 | **1** |
| Vue 02 — trois-quarts | 1 | 1 | **1** |
| Vue 03 — dos | 1 | 1 | **1** |
| **Total série** | **4** | **4** | **3** |

Soit **43 % de moins** que le space d'origine, pour la couverture qui compte : face, trois-quarts, dos.

**Pourquoi ces deux vues et pas d'autres.** Sur les trois transferts testés le 26/08, le plan taille de face duplique l'information du plan maître. Le trois-quarts donne le volume et la construction latérale ; le dos donne la fermeture. C'est le triptyque standard d'une fiche produit.

---

## 8. Le pipeline — trois étages, pas quatre

```
ÉTAGE 1   cloth (LLM) → triptyque (image)
              ↓ obligatoire avant la suite
ÉTAGE 2   swap (LLM) → plan maître (image)
              ↓ le transfert exige le prompt ET l'image du maître
ÉTAGE 3   2 × [ transfert (LLM) → vue (image) ]
          les deux branches tournent EN PARALLÈLE
```

Trois cycles perçus, de l'ordre de **trois minutes**. Incompatible avec une attente synchrone : le workflow est durable, le client interroge.

**Révélation progressive, dans cet ordre imposé :**

1. **Le triptyque** — l'utilisateur voit que ça travaille sur *son* vêtement. C'est ce qui le fait rester.
2. **Le plan maître** — le moment « waouh ».
3. **Les deux vues**, ensemble.

Cette progression donne quelque chose à regarder, et elle laisse partir celui qui est déjà convaincu par le plan maître — ce qui est exactement le comportement souhaité côté voie A.

**Deux agents dédiés, pas un agent générique.** `TRANSFERT_DOS` et `TRANSFERT_PROFIL` ont chacun leur cadrage figé et leur logique propre : le dos s'appuie sur le panneau 3 du triptyque comme autorité, le trois-quarts déduit le profil de la continuité entre les panneaux 2 et 3, faute de panneau latéral. Un agent générique paramétré par texte existe (`TRANSFERT_AGENT_v2`) et sert de base aux futurs cadrages.

---

## 9. Interface — même identité, registre différent

Le studio applique **rigoureusement** le système graphique du site : mêmes jetons, mêmes polices, mêmes règles de mise en page.

```
background  #F6F6F8      surface     #FFFFFF
ink         #0B0B0D      ink-soft    #56565F
rule        #DCDCE2      accent      #B7410E   (sienne brûlée)
whatsapp    #25D366      (boutons WhatsApp uniquement)
```

**Trois couleurs, trois rôles qui ne se recouvrent jamais :** l'encre porte toutes les actions · le vert WhatsApp porte la seule action qui compte · la sienne brûlée est de l'identité, **jamais sur un bouton**, une apparition par écran.

`border-radius: 0` partout, aucune ombre, filets de 1 px, images à fond perdu jusqu'au bord du conteneur.

**Mais le registre change.** Le site est une page éditoriale qu'on lit ; le studio est un **outil qu'on manœuvre**. En conséquence :

- **Le Bodoni Moda n'apparaît que dans le titre de page**, nulle part ailleurs. DM Mono et Archivo font tout le reste.
- Le rythme est plus dense qu'une landing — c'est une console, pas une page de vente.
- **L'interface s'efface derrière les images générées par l'utilisateur.** Toute la retenue éditoriale du système existe ici pour une seule raison : que le vêtement du client soit la seule chose qu'on regarde.

### Les quatre écrans

| # | Écran | Ce qui le définit |
|---|---|---|
| 08 | **État initial** | Trois étapes de configuration numérotées, encart de coût en crédits, bouton Générer |
| 09 | **En génération** | **L'écran le plus important.** Indicateur de progression en trois segments, révélation progressive triptyque → maître → deux emplacements de vue. Un seul point carré qui pulse. **Aucun spinner, aucun squelette, aucun dégradé** |
| 10 | **Série livrée** | Les quatre images sont le contenu, l'interface est invisible. Bande WhatsApp en bas |
| 11 | **Les sélecteurs** | Mannequin et template, deux grilles jumelles |

**L'écran 09 est celui qui décide de tout.** Trois minutes d'attente sont longues ; ce qui les rend acceptables, c'est de voir apparaître quelque chose de reconnaissable — son propre vêtement — au bout de quarante secondes.

Les prompts Stitch complets des quatre écrans sont dans l'artefact **Prompts Stitch fashionai** (prompts 08 à 11).

---

## 10. Requirements

### Must-Have (P0) — studio V1 livrable

| # | Exigence | Critères d'acceptation |
|---|---|---|
| A0-1 | Téléversement de 1 à N photos de vêtement, avec **filtrage serveur de l'image avant tout appel LLM** | Given une image non conforme, When elle est téléversée, Then elle est rejetée côté serveur, avant l'agent |
| A0-2 | Champs « Précisions sur le vêtement » et « Ajustements », optionnels, repliés par défaut | Given un utilisateur qui déplie et remplit, When il génère, Then le texte est transmis à `cloth` et à `swap` respectivement |
| A0-3 | Bibliothèque de mannequins avec `rights_status` renseigné, publication conditionnée | Given un mannequin sans statut de droits, When on tente de le publier, Then la publication est refusée |
| A0-4 | Bibliothèque de templates : image de scène, deux cadrages en 7 postes, ratios, clé d'agent | Given un template publié, When il est sélectionné, Then ses deux cadrages et ses deux ratios sont chargés |
| A0-5 | **Workflow durable** en trois étages, étage 3 parallélisé | Given une panne fournisseur à l'étage 3, When la reprise s'exécute, Then le triptyque et le maître ne sont pas régénérés |
| A0-6 | **Révélation progressive** : triptyque, puis maître, puis vues | Given un shoot en cours, When le triptyque existe, Then il s'affiche avant que le maître n'existe |
| A0-7 | Suivi par interrogation `GET /api/shoots/:id` toutes les 3 s, **coupure à 10 minutes** | Given un workflow bloqué, When 10 minutes passent, Then le client bascule sur un état d'erreur explicite et cesse d'interroger |
| A0-8 | **Validateur d'inversion** avant la génération du maître | Given un prompt maître dont le negative contient un terme du triptyque, When la validation s'exécute, Then l'appel LLM est relancé, pas l'image générée |
| A0-9 | **Validateur de contamination** sur les blocs `environment`, `lighting`, `grading`, `palette` | Given un prompt de vue divergent sur un bloc verrouillé, When la validation s'exécute, Then l'étape est relancée |
| A0-10 | Reprises plafonnées à **2** par étape, puis échec visible en admin | Given 3 échecs consécutifs, When le plafond est atteint, Then le shoot passe en erreur avec le message conservé |
| A0-11 | **Couche d'abstraction fournisseur** — `image()` et `llm()`, un fichier par fournisseur, bascule par variable d'environnement | Given un audit du dépôt, When on cherche un appel direct à une API de génération hors `lib/providers`, Then il n'y en a aucun |
| A0-12 | Crédits **débités à la création du shoot**, remboursés automatiquement sur échec du workflow | Given un workflow en échec, When il se termine, Then les crédits sont recrédités et l'utilisateur en est informé |
| A0-13 | **Trois plafonds cumulés** : 3/lead/jour · 10/IP/jour · plafond global quotidien avec coupure automatique | Given le plafond global atteint, When un nouveau shoot est demandé, Then il est refusé avec un message explicite, sans débit |
| A0-14 | `master_prompt` et `agent_versions` conservés sur chaque shoot | Given un shoot terminé, When on ouvre sa fiche admin, Then le prompt maître complet et la version de chaque agent sont lisibles |
| A0-15 | **Gratuit = plan maître.** Les vues exigent des crédits, débloquées par `POST /api/shoots/:id/views` | Given un shoot livré en maître seul, When les crédits arrivent, Then les vues se lancent sans régénérer le maître |
| A0-16 | **Recharge de crédits par message WhatsApp** avec code unique, selon le mécanisme du PRD site | Given un utilisateur à court de crédits, When il clique sur le CTA, Then WhatsApp s'ouvre avec un message pré-rempli contenant le code du shoot |
| A0-17 | Avertissement `[estimation]` : si la sortie de `cloth` contient des marqueurs d'estimation, l'interface le dit | Given une seule photo de face fournie, When le triptyque est produit, Then l'interface affiche « Le dos de votre vêtement a été estimé… Ajoutez une photo de dos pour un rendu fidèle » |
| A0-18 | Réglage **« ne pas ajouter d'accessoires non visibles »** | Given le réglage actif, When `cloth` s'exécute, Then aucun accessoire absent des photos n'est introduit |
| A0-19 | Admin : rejouer un shoot, lire les prompts, comparer deux versions d'agent, voir les erreurs | Given un shoot en erreur, When l'admin l'ouvre, Then l'étape fautive, le message et le prompt en cause sont visibles |
| A0-20 | Système graphique du site appliqué, **registre outil** : Bodoni au seul titre de page | Given un audit visuel des 4 écrans, When on compte les occurrences de Bodoni, Then il n'apparaît que dans le titre de page |
| A0-21 | Responsive mobile-first testé à 360 px | Given une génération suivie sur mobile 360 px, When elle progresse, Then les quatre emplacements d'image restent lisibles sans zoom |

### Nice-to-Have (P1)

| # | Exigence | Notes |
|---|---|---|
| A1-1 | Téléchargement de la série en archive, nommée par référence produit | Ce qu'Awa fera 40 fois par mois |
| A1-2 | Historique des shoots par lead, avec reprise | Évite de tout recommencer |
| A1-3 | Troisième vue optionnelle (plan taille) en crédit supplémentaire | Le cadrage existe déjà, testé |
| A1-4 | Réutilisation d'un mannequin + template en « préréglage » | Cohérence de marque sur un catalogue entier |
| A1-5 | Comparateur avant / après — photo d'origine vs plan maître | La preuve la plus convaincante, et elle est gratuite à produire |
| A1-6 | Crédits bonus contre témoignage ou autorisation d'usage du résultat | Alimente la galerie du site |

### Version 2 du studio

| # | Exigence |
|---|---|
| AV2-1 | **Template personnalisé** : le client décrit son univers de marque, un agent en fabrique le décor. *La plus vendeuse des trois évolutions — à réserver au payant* |
| AV2-2 | **Mode expert** : réécriture directe du prompt maître |
| AV2-3 | Variantes de mannequin — nouvelle coiffure, nouveau maquillage — sans nouveau shooting |
| AV2-4 | WhatsApp Cloud API : attribution automatique des crédits sur réception du code |
| AV2-5 | Génération vidéo à partir du plan maître — la famille vidéo du site rejoint le studio |
| AV2-6 | Paiement mobile money (Wave, Orange Money, MTN) via Paystack ou Flutterwave |
| AV2-7 | Bascule progressive vers un modèle entraîné maison, alimentée par les `master_prompt` conservés |

---

## 11. Modèle de données

```
models                      -- bibliothèque de mannequins
  id, name, thumbnail_path, reference_image_path,
  rights_status, rights_document_path, published

templates                   -- bibliothèque de décors
  id, slug, name, thumbnail_path,
  source_image_path,        -- la scène de référence
  master_aspect_ratio,      -- 2:3
  view_aspect_ratio,        -- 1:1
  agent_instructions_key,
  published

template_framings           -- les cadrages, en TEXTE
  id, template_id, position, slug, name,
  scale_text,               -- 1.1 échelle de plan
  camera_text,              -- 1.2 hauteur et angle
  orientation_text,         -- 1.3 orientation du corps
  posture_text,             -- 1.4 appuis, articulations, mains
  gaze_text,                -- 1.5 expression et regard
  placement_text,           -- 1.6 placement et negative space
  composition_text          -- 1.7 grammaire de composition

garments                    -- ce que l'utilisateur importe
  id, lead_id, source_images[] (json),
  precisions_text, no_invented_accessories,
  triptych_prompt, triptych_path, has_estimations,
  created_at

shoots
  id, lead_id, garment_id, model_id, template_id,
  modifs_text,
  master_prompt,            -- conservé, toujours
  master_image_path,
  status, credits_spent, agent_versions (json),
  error_message, created_at, updated_at

shoot_views
  id, shoot_id, framing_slug,     -- 'profil' | 'dos'
  position, prompt, image_path,
  status, retries, error_message, created_at
```

**Trois champs à ne pas perdre de vue.**

`rights_status` sur les mannequins — d'où vient ce visage, et a-t-on le droit de l'exploiter commercialement ? La page « Travailler ensemble » promet que rien n'est réutilisé sans accord écrit ; la bibliothèque de mannequins est le premier endroit où cette promesse s'applique à nous-mêmes.

`master_prompt` conservé en base — rejeu, débogage, et surtout **le jeu de données d'entraînement de la phase 3**.

`agent_versions` — sans lui, on ne saura jamais si une dégradation vient de l'agent, du modèle ou du tirage.

**Les agents vivent dans `/agents/*.md`, importés par un `registry.ts` versionné. Jamais en base.** Ce sont du code, ils se relisent en diff, ils se déploient avec le reste.

---

## 12. Architecture

Le détail d'implémentation est dans `IMPLEMENTATION_GENERATION.md`. Ce qui relève du PRD :

| Couche | Choix |
|---|---|
| Orchestration | **Cloudflare Workflows** — gratuit, 3 000 étapes/jour, le temps d'attente ne consomme pas de CPU |
| Application | Next.js sur Cloudflare Workers, même dépôt que le site |
| Base | Cloudflare D1, mêmes tables `leads` que le site |
| Images produites | Stockage objet — **premier poste qui sortira du gratuit**, à budgéter |
| Génération d'images | Couche d'abstraction, fournisseur commutable par variable d'environnement |
| LLM des agents | Idem — un seul point de bascule |
| Suivi client | Interrogation 3 s, coupure 10 min |

**Le point d'architecture non négociable : aucun appel direct à une API de génération hors de `lib/providers`.** C'est ce qui rend possible la stratégie en trois temps — crédit Google pour les tests gratuits, agrégateur pour le payant, modèle maison ensuite — sans réécrire l'application à chaque étape.

**Ordre de construction :**

1. La couche fournisseur seule, avec une page de test interne.
2. L'étage 1 isolé — téléversement → triptyque.
3. L'étage 2 — le plan maître et le validateur d'inversion. **À ce stade, le produit gratuit est complet et livrable.**
4. L'étage 3 — les deux vues et le validateur de contamination.
5. Les crédits et les plafonds.
6. L'admin.

> **Ne construis pas l'étage 3 avant que l'étage 2 ne donne des résultats que tu juges commercialisables.** Si le plan maître n'est pas bon, les vues ne le rattraperont pas — elles en héritent.

---

## 13. Sécurité, droits et honnêteté du rendu

**Le filtrage image est côté serveur, avant le LLM.** Les trois agents ont une Étape 0bis — refus des sujets mineurs ou d'âge ambigu, refus du contenu sexuel explicite, priorité sur toute autre instruction. C'est nécessaire et bien vu. **Mais une instruction de prompt n'est pas un contrôle d'accès.** L'agent est la seconde barrière, jamais la première. Un outil qui fait porter un vêtement à un mannequin attire par construction des usages détournés : c'est à prévoir à la conception, pas après le premier incident.

**Deux comportements à dire clairement dans l'interface**, tirés du test du 26/08 :

- Les escarpins nude ont été **inventés** par `cloth` — ils n'étaient pas visibles sur la photo, coupée aux chevilles. C'est conforme à sa règle d'accessoires, mais une marque qui vend un pantalon ne veut pas qu'on lui invente des chaussures. D'où le réglage A0-18.
- **La morphologie rendue est celle du mannequin choisi, pas de la personne sur la photo d'entrée.** C'est le comportement voulu — le swap remplace l'identité *et* le corps — mais il faut l'écrire : les verrous anti-idéalisation protègent le mannequin, pas la personne d'origine.

**Droits :** aucun entraînement sur les images d'un client sans accord écrit. Aucune image de campagne d'une autre marque dans le produit — c'est ce qui a motivé le passage des cadrages au texte.

---

## 14. Success Metrics

**Qualité — la seule qui décide de la suite**

- **Taux de séries livrées sans défaut visible** jugé à l'œil sur 30 séries : cible **≥ 80 %**. Sous 60 %, on ne montre le studio à personne.
- **Taux de reprise déclenchée par les validateurs** : à mesurer, pas à cibler. Une valeur élevée signale un agent à corriger, pas un système qui fonctionne.
- **Taux d'échec de workflow** : cible **< 3 %**.
- **Durée médiane d'une série complète** : cible **< 5 minutes**, dont **< 60 s jusqu'au triptyque**.

**Usage**

- **Taux d'abandon avant la fin de la génération** : c'est la mesure directe de la qualité de l'écran 09.
- **Taux de passage maître → série** parmi ceux qui ont vu leur plan maître : **la métrique commerciale centrale**. C'est elle qui dit si la ligne gratuit/payant est au bon endroit.
- **Nombre de messages WhatsApp de recharge reçus** — le studio est la quatrième raison d'écrire, il doit produire des messages.
- **Nombre de séries par utilisateur récurrent** : sépare l'essayeur du client low-ticket réel.

**Économie**

- **Coût réel par série livrée**, appels LLM inclus. À suivre dès la première semaine.
- **Marge par crédit** aux tarifs de l'agrégateur, une fois le crédit Google épuisé. C'est ce chiffre qui décide si la voie B est viable.
- **Part du plafond global consommée par jour**.

---

## 15. Open Questions

- **[Produit] Combien de mannequins et combien de templates au lancement ?** Ça décide si la bibliothèque tient dans le dépôt Git ou exige un vrai stockage objet. **Recommandation : 4 mannequins, 2 templates.**
- **[Produit] `ref_5` est absent du graphe Magnific** — il y a ref_1, 2, 3, 4 et 6. Oubli, ou cadrage écarté ? Réponse encore attendue.
- **[Produit] L'image `source` de chaque template.** Dans le space, elle vient d'une création existante. Chaque template a besoin de sa propre image de scène validée : **c'est un livrable à produire, template par template.**
- **[Produit] Combien de générations gratuites avant de demander un message WhatsApp ?** Trop peu et personne ne voit la valeur ; trop et la raison d'écrire disparaît. **À calibrer sur les 50 premiers utilisateurs, pas à décider maintenant.**
- **[Technique] Les deux cadrages texte n'ont pas encore été testés** contre les trois transferts par image. C'est le prochain test à faire dans le space, avant tout développement.
- **[Technique] Les deux agents dédiés** — `TRANSFERT_DOS` et `TRANSFERT_PROFIL` — n'ont pas encore tourné. Même remarque.
- **[Technique] Quel fournisseur pour l'étage 2 après les 90 jours du crédit Google ?** La couche d'abstraction rend la question non bloquante, mais elle décide du coût par série.
- **[Juridique] Droits sur les mannequins.** Le character sheet actuel vient d'où ? Sans réponse claire, la bibliothèque ne peut pas être publiée.
- **[Juridique] CGU du studio** : propriété des images générées, usage commercial autorisé, absence d'entraînement sur les images clients. Nécessaire avant la première génération publique.
- **[Opérations] Qui juge les 30 séries du critère qualité, et selon quelle grille ?** Sans grille écrite, « sans défaut visible » ne veut rien dire.
- **[Nettoyage] Les UUID Magnific traînent dans les documents de kit** — à retirer avant toute publication.

---

## 16. Phasage

- **Phase 0 — Valider le pipeline hors application.** Tester les deux cadrages texte et les deux agents dédiés dans le space, comparer aux transferts par image. **Rien ne se développe avant que ce test soit concluant.**
- **Phase 1 — La couche fournisseur.** Clés, quotas, formats, une page de test interne qui génère depuis un prompt écrit à la main.
- **Phase 2 — Étage 1.** Téléversement du vêtement → triptyque. Le résultat se juge à l'œil immédiatement.
- **Phase 3 — Étage 2 et le validateur d'inversion.** **Fin de cette phase : le produit gratuit est complet et livrable.** C'est le moment où le studio devient montrable à un lead high-ticket.
- **Phase 4 — Étage 3.** Les deux vues en parallèle, le validateur de contamination, le workflow durable complet.
- **Phase 5 — Interface publique.** Les quatre écrans, la révélation progressive, le suivi par interrogation.
- **Phase 6 — Crédits, plafonds, recharge WhatsApp.** Le studio devient la quatrième raison d'écrire.
- **Phase 7 — Admin et instrumentation.** Rejeu, lecture des prompts, comparaison de versions d'agent, coût par série.
- **Phase 8 — Voie B.** Historique, archive, préréglages, paiement mobile money. **Seulement si la métrique de passage maître → série le justifie.**

**Trois avertissements.**

La tentation sera de construire l'interface d'abord — c'est la partie visible et la plus agréable. Mais **le studio ne vaut rien tant que l'étage 2 ne produit pas des images commercialisables**, et cela se juge sur une page de test moche. L'interface vient après la preuve, pas avant.

La deuxième tentation sera de servir une image ratée pour ne pas laisser l'utilisateur les mains vides. **C'est le pire résultat possible** sur une démonstration gratuite censée convaincre. Un appel LLM relancé coûte une fraction d'une génération d'image ratée ; une image ratée coûte un lead.

Enfin, la voie B — le SaaS libre-service — ne se décide pas à l'intuition. Elle se décide sur deux chiffres : le taux de passage maître → série, et la marge par crédit une fois le crédit Google épuisé. **Tant que ces deux chiffres n'existent pas, le studio est un outil de démonstration pour la voie A** — et c'est déjà largement suffisant pour justifier de le construire.
