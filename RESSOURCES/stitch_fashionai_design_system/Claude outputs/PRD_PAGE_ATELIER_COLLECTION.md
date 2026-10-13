# PRD — `/kits/atelier-collection` · La page du kit Collection

**Auteur :** Stephen (Pôle Web SIFCA)
**Date :** 12 octobre 2026
**Statut :** Draft v1
**Route :** `/kits/atelier-collection` — instance de la landing kit du PRD site (P0-1 à P0-11)
**Objet analysé :** `atelier-collection-compact` V5.2 — 57 432 caractères, 636 lignes
**Documents liés :** `PRD.md` · `PRD_CATALOGUE_KITS.md` · `STUDIO_V0_TELECHARGEMENT.md` · `INSTALLATION_CHATGPT_GEMINI.md`

---

## 0. La contrainte qui commande tout le document

> **Cette page distribue un fichier. Elle ne génère rien.**
>
> Aucune image n'est produite ici, aucun appel à un modèle, aucun crédit, aucune file d'attente. Le kit s'exécute **chez l'utilisateur**, dans son propre assistant, avec son propre abonnement. La page informe, prouve, capture un lead, et livre trois fichiers.

Ce n'est pas une restriction technique de départ, c'est ce qui définit le produit — et ça a trois conséquences que le reste du document applique :

1. **Toute la preuve est pré-rendue.** Images et PDF, produits à l'avance. Rien n'est calculé au chargement, rien ne dépend d'une clé API. Le coût d'infrastructure de cette page est nul, et elle ne peut pas tomber en panne autrement qu'en étant hors ligne.
2. **Le bloc « deux modes » est éditorial, pas fonctionnel.** Il dit ce qu'il faudra avoir chez soi. Ce n'est ni un sélecteur, ni un configurateur : il n'a pas d'état sélectionné et il ne change rien au fichier téléchargé, qui est le même pour tout le monde.
3. **Le mode de l'utilisateur se demande, il ne se devine pas.** Il est recueilli dans la qualification différée de la page de remerciement, parmi les questions facultatives — jamais par un réglage sur la landing.

**Le studio reste le seul endroit du site où quelque chose se génère.** Cette page n'en est pas une variante : c'est une landing kit, comme celles des kits shooting.

---

## 1. Ce que l'analyse du skill a changé dans ma lecture

J'ai abordé ce skill en pensant écrire la même page que pour les kits shooting. **Six constats l'en éloignent**, et ils commandent tout le reste du document.

### a. Ce n'est pas un kit de prompts, c'est un agent

Les kits shooting sont des prompts qu'on colle. Celui-ci est un **directeur de collection** qui tient la mémoire d'un projet sur plusieurs semaines : il versionne chaque look (`L3 v1`, `v2`), tient un carnet de prompts, contrôle chaque image avec un verdict en une ligne, et compose les planches **par code**.

Conséquence : la promesse de la page n'est pas « un prompt qui marche », c'est **« un accompagnement qui tient de l'idée au lookbook »**.

### b. Il ne tient pas dans un champ d'instructions

57 432 caractères. Le champ d'instructions d'un GPT personnalisé en accepte 8 000. **Le livrable ne peut donc pas être un seul fichier** — c'est le partage chargeur + fichier de connaissance que tu as déjà documenté pour les kits shooting. C'est un P0, pas un détail d'emballage.

### c. Les prérequis ne tiennent pas en une ligne

Le skill fonctionne en **deux modes**, qu'il détecte sans jamais les demander :

| | **Mode direct** | **Mode carnet** |
|---|---|---|
| Qui génère | L'assistant | Le créateur, dans son propre outil |
| Ce qu'il faut | Un assistant qui génère **et exécute du code** | Un assistant conversationnel + un générateur d'images |
| Les planches | Composées par code, PNG + PDF | *« donne l'ordre, les dimensions et les textes exacts pour un montage dans Canva ou PowerPoint »* |

L'encart « ce dont vous avez besoin » des kits shooting portait une ligne — un outil, gratuit ou payant. **Ici il lui faut deux colonnes.** Un créateur qui choisit le mauvais mode perd une soirée avant de comprendre pourquoi ses planches ne sortent pas.

### d. Le coût réel doit être annoncé

Le skill le chiffre lui-même : **≈ 16 générations pour 8 looks** (moodboard 1, planche kit 1, line-up 2D 2, dessins à plat 4, prototypes 8), plus quelques retouches. Et il recommande de repartir dans une conversation neuve tous les 4 looks.

Ce n'est pas un essai de dix minutes. **Masquer ce chiffre produirait des leads déçus** — exactement ce que l'encart prérequis existe pour éviter. Il doit être sur la page.

### e. L'échec n'arrive pas au même endroit

Sur un kit shooting, on rate la première image. Ici, **on abandonne à l'étape 3**, quand il faut produire huit fiches techniques avant la première photo. L'ordre est imposé, et c'est ce qui fait la qualité — mais c'est aussi le mur.

**Conséquence directe : la séance hebdomadaire vaut beaucoup plus sur ce kit que sur les autres.** Un projet de six étapes sur plusieurs semaines a besoin d'un rendez-vous ; un prompt unique n'en a pas besoin. C'est le kit qui remplit la séance.

### f. L'audience n'est pas celle du site

Le skill s'adresse à des **stylistes, des marques et des écoles de mode**. Les kits shooting s'adressent à qui a déjà un vêtement à photographier ; celui-ci s'adresse à qui **conçoit** le vêtement.

Et il mentionne explicitement les écoles : *« 2 à 6 looks pour une capsule ou une école »*. **Une école de mode est un lead d'un type nouveau** — ni high ticket ponctuel, ni low ticket en libre-service : un client de formation récurrent. Il mérite son propre chemin sur la page.

---

## 2. Problem Statement

Un styliste, une jeune marque ou un étudiant en mode doit produire une collection complète : univers, plan, line-up, fiches techniques, prototypes, lookbook. Le dossier attendu est le même qu'il y a vingt ans, mais sans atelier, sans photographe et sans budget de prototypage.

L'IA sait produire de belles images de mode. **Elle ne sait pas tenir une collection** — c'est-à-dire garder la même muse, le même ADN, le même décor et la même lumière sur douze looks, puis en faire un dossier cohérent. Demandez douze fois « une robe dans cet esprit » et vous obtenez douze univers.

**Le problème n'est pas de générer, c'est de tenir.** Et c'est exactement ce que ce skill résout : une mémoire de projet, un ordre imposé, des blocs verrouillés recopiés mot pour mot, et des planches composées par code plutôt que régénérées.

**Pour le site, ce kit joue un rôle que les autres ne jouent pas :** il ouvre une audience de **créateurs** — stylistes et écoles — là où le reste du catalogue parle aux vendeurs. C'est une porte d'entrée vers la formation, pas vers la production.

---

## 3. Goals

- **Faire comprendre en dix secondes ce que le kit produit** — une collection entière, pas une image.
- **Annoncer honnêtement l'engagement** : six étapes, deux modes, ≈ 16 générations pour 8 looks.
- **Dire quel outil il faudra**, avant le téléchargement, pour que l'installation réussisse du premier coup — sans rien configurer sur le site.
- **Livrer les trois pièces** — chargeur, fichier système, guide d'installation — et pas un fichier unique inutilisable.
- **Capter le segment école** par un chemin distinct.
- **Remplir la séance hebdomadaire.** C'est le kit qui en a le plus besoin et qui la justifie le mieux.
- **Ne jamais présenter quatre versions du skill.** Une page, une version par défaut, un chemin de progression nommé.

---

## 4. Non-Goals

- **Générer quoi que ce soit sur le site.** Aucune image, aucun appel à un modèle, aucun crédit. Voir §0 — c'est la contrainte première, pas une simplification de V1.
- **Vendre quoi que ce soit.** Pas de prix, pas de panier. Règle du site, sans exception.
- **Présenter la famille complète** — compact, hybride, visuel, standard. Choix paralysant. Le compact est le défaut ; les autres sont une suite, pas une alternative.
- **Promettre le patron coté et CLO 3D.** Le skill les exclut explicitement et renvoie vers `atelier-collection-hybride`. La page doit dire la même chose, au même endroit.
- **Un générateur en ligne.** Ce kit s'exécute chez l'utilisateur, dans son assistant. Ce n'est pas le studio.
- **Masquer le travail.** Six étapes, c'est long, et le dire est un filtre utile.
- **Un formulaire de plus.** Même composant, même table `leads`, même page de remerciement que les autres kits.

---

## 5. Personas

### C1 — Aïcha, styliste indépendante **(cible prioritaire)**
Une marque naissante, deux collections par an, aucun atelier. Elle dessine, elle sait ce qu'elle veut, elle n'a ni budget de prototypage ni photographe.
**Ce qui la convainc :** voir un lookbook complet et cohérent, pas une belle image isolée.
**Ce qui la perd :** comprendre à l'étape 3 qu'il faut huit fiches techniques avant la première photo.
→ Finit en accompagnement de collection, ou en production de visuels. **Le meilleur lead de ce kit.**

### C2 — Une école de mode **(lead d'un type nouveau)**
Des étudiants qui doivent rendre une collection. Le skill les cite nommément et prévoit le format capsule, 2 à 6 looks.
**Ce qui compte pour elle :** que la méthode soit enseignable et reproductible par vingt étudiants.
→ Finit en **formation**, récurrente, facturée à l'établissement. Peu nombreux, haute valeur.

### C3 — Yann, créa / modéliste
Il jugera les fiches techniques et le dessin à plat. Exigeant sur la cotation, il ira vite vers le patron coté — donc vers la version hybride.
**C'est le meilleur testeur**, et le plus susceptible de trouver les défauts.

### C4 — L'étudiant seul
Télécharge, essaie, abandonne ou réussit. Peu solvable aujourd'hui, prescripteur demain, et **c'est lui qui remplit la séance**.

---

## 6. La page, section par section

Ordre imposé. Une colonne sur mobile.

| # | Section | Contenu | Pourquoi |
|---|---|---|---|
| 1 | **Promesse** | DM Mono : `PHOTO · AVANCÉ`. Bodoni : « Dessinez une collection complète, de l'idée au lookbook » | Un résultat, jamais le nom du produit |
| 2 | **Le lookbook-planche** | **Une seule image plein cadre** : la planche finale d'une collection réelle | **C'est la preuve.** Elle montre en une image ce que 400 mots n'expliquent pas |
| 3 | **Les six étapes** | Six lignes séparées de filets, numérotées `01` à `06`, chacune avec son livrable. Une image par étape | Une des rares séquences réelles du site : la numérotation est justifiée |
| 4 | **Le line-up** | Le line-up réaliste, pleine largeur, avec ses médaillons ADN | Montre la cohérence — l'argument central |
| 5 | **La vidéo** | Façade cliquable, jamais une iframe au premier rendu | LCP |
| 6 | **Combien ça demande** | Encart bordé : « ≈ 16 générations pour 8 looks · 6 étapes · plusieurs séances » | L'honnêteté qui filtre. Voir §1d |
| 7 | **Ce qu'il vous faudra** | **Deux colonnes côte à côte**, comparaison éditoriale. Voir §7 | Le cœur de la page |
| 8 | **Ce que ce kit ne fait pas** | Patron coté, barème, CLO 3D, coloris A/B — « c'est la suite, pas ce kit » | Reprend mot pour mot la limite du skill |
| 9 | **Le bouton** | « Télécharger le kit » | Un seul bouton principal |
| 10 | **Vous êtes une école ?** | Bloc distinct, bas de page, bouton WhatsApp propre | Le segment C2 — voir §9 |

**Registre éditorial.** Système graphique du site tel quel : `#F6F6F8`, filets de 1 px, aucun arrondi, aucune ombre, Bodoni aux titres, sienne brûlée **une seule fois** sur la page.

---

## 7. Le bloc « ce qu'il vous faudra » — la section qui décide de tout

Deux colonnes, séparées par un filet vertical de 1 px. Pas de pastilles, pas de couleur : le choix se fait par le texte.

```
MODE DIRECT                      │  MODE CARNET
                                 │
Votre assistant génère les       │  Vous générez vous-même, dans
images et compose les planches   │  l'outil de votre choix, et vous
lui-même.                        │  renvoyez l'image.
                                 │
IL VOUS FAUT                     │  IL VOUS FAUT
Un assistant capable de générer  │  Un assistant conversationnel
des images ET d'exécuter du      │  + un générateur d'images :
code.                            │  ChatGPT (GPT Image), Gemini
                                 │  (Nano Banana Pro) ou Seedream.
                                 │
VOS PLANCHES                     │  VOS PLANCHES
Composées automatiquement,       │  Vous recevez l'ordre, les
en PNG et PDF.                   │  dimensions et les textes exacts,
                                 │  à monter dans Canva ou PowerPoint.
                                 │
Recommandé si vous débutez. ★    │  Recommandé si vous avez déjà
                                 │  votre outil et vos habitudes.
```

**Pourquoi ce bloc existe.** Le skill détecte le mode sans le demander — c'est juste pour l'utilisateur en cours de conversation, mais désastreux en amont : quelqu'un qui installe le kit dans un outil sans exécution de code découvrira à l'étape 5 que ses planches ne se composent pas. **L'information doit arriver avant le téléchargement, pas pendant l'usage.**

**Ce bloc ne se clique pas.** Pas de bouton, pas d'onglet, pas d'état sélectionné, aucune coche. Deux colonnes de texte séparées par un filet, qu'on lit. **Le fichier téléchargé est le même dans les deux cas** — c'est le guide d'installation qui traite les deux modes, pas le site.

**Le mode intéresse quand même la qualification** — mode direct = débutant à accompagner, mode carnet = utilisateur équipé, souvent professionnel. Il se demande donc **dans la qualification différée de la page de remerciement**, parmi les questions facultatives, avec les autres. Pas sur la landing, et jamais comme condition du téléchargement.

---

## 8. Ce qui est livré

**Trois pièces, pas une.** C'est imposé par la taille du skill — 57 432 caractères contre 8 000 autorisés dans un champ d'instructions.

| Fichier | Rôle | Où il va |
|---|---|---|
| `CHARGEUR_ATELIER_COLLECTION.txt` | La procédure : quoi faire, dans quel ordre, ce qu'il ne faut jamais faire. **Moins de 8 000 caractères** | Champ **Instructions** |
| `SYSTEME_ATELIER_COLLECTION.md` | Les données : gabarits, blocs de prompts, règles R1 à R13, grilles de planches, contrôle qualité | **Fichier de connaissance** |
| `guide-atelier-collection.pdf` | Installation pas à pas, en français, avec le protocole de test | À lire d'abord |

**Le partage suit exactement la règle que tu as écrite** dans `INSTALLATION_CHATGPT_GEMINI.md` : *tout ce qui casse le système en silence va dans le chargeur ; le reste peut être cherché à la demande.* Pour ce skill, ce qui doit impérativement être dans le chargeur : l'ordre imposé des six étapes, l'interdiction de tout texte généré dans une image, la limite de 5 images de référence par génération, et la règle des blocs recopiés mot pour mot.

**Un quatrième élément, à ne pas oublier :** un **protocole de test en quatre points**, comme pour les kits shooting. Il doit vérifier que l'agent livre bien la Fiche Collection, qu'il refuse de passer à l'étape suivante avant validation, qu'il ne met aucun texte dans les images, et qu'il affiche le carnet.

**Un découpage à produire.** Le chargeur n'existe pas encore : il faut l'extraire du skill. C'est un livrable à part entière, pas une mise en forme.

---

## 9. Le chemin école

Un bloc distinct, en bas de page, sur fond encre.

> **ÉCOLE DE MODE**
> Vos étudiants doivent rendre une collection.
> Le kit fonctionne en format capsule — 2 à 6 looks — et la méthode s'enseigne.
> [ En parler sur WhatsApp ]

**Pourquoi un chemin séparé.** Une école ne télécharge pas un kit : elle évalue une méthode pour vingt étudiants et un semestre. Le formulaire de capture individuel ne lui convient pas, et le mettre dans le même entonnoir que l'étudiant seul écrase le signal.

C'est le second bouton WhatsApp de la page — et **la seule page du site qui en porte deux**. Le premier reste l'inscription à la séance. Si les deux se gênent visuellement, c'est celui de l'école qui descend, pas l'inverse.

---

## 10. Requirements

### Must-Have (P0)

| # | Exigence | Critères d'acceptation |
|---|---|---|
| AC0-1 | Page générée depuis la base comme toute landing kit, famille `PHOTO`, niveau `AVANCÉ` | Given le kit publié, When on visite la route, Then la page s'affiche sans redéploiement |
| AC0-2 | **Le lookbook-planche en preuve principale**, plein cadre, au-dessus de tout le reste | Given un visiteur mobile, When la page charge, Then la planche est le premier élément visuel |
| AC0-3 | Les six étapes affichées, numérotées, avec leur livrable et une image chacune | Given la section, When on la lit, Then chaque étape nomme ce qu'on obtient |
| AC0-4 | **Encart d'engagement** : nombre de générations, nombre d'étapes, durée en séances | Given la page, When on atteint l'encart, Then « ≈ 16 générations pour 8 looks » est lisible |
| AC0-5 | **Bloc « ce qu'il vous faudra »**, deux colonnes, au-dessus du formulaire, outils nommés par mode. **Sans aucun élément cliquable** | Given un audit de la section, When on cherche un bouton, un onglet ou une coche, Then il n'y en a aucun, et le texte des deux modes est lisible intégralement |
| AC0-6 | Le mode est demandé **dans la qualification différée**, facultatif comme les autres questions | Given un lead qui répond « carnet », When il valide, Then `mode_prefere = 'carnet'` ; When il ignore, Then il accède quand même aux fichiers |
| AC0-15 | **Aucune génération depuis cette page** : pas d'appel à une API de modèle, pas de clé côté client, toute la preuve pré-rendue | Given un audit du code et du réseau au chargement, When on inspecte les requêtes, Then aucune ne vise un fournisseur de génération |
| AC0-7 | **Livraison de trois fichiers** par lien signé 24 h | Given le téléchargement, When il démarre, Then chargeur, système et guide partent ensemble |
| AC0-8 | **Le chargeur fait moins de 8 000 caractères** | Given le fichier publié, When on le mesure, Then il tient dans un champ d'instructions de GPT personnalisé |
| AC0-9 | Section « ce que ce kit ne fait pas » : patron coté, barème, CLO 3D, coloris A/B | Given la page, When on la lit, Then la limite est annoncée avant le formulaire |
| AC0-10 | Champ de qualification **« vous êtes »** : styliste · marque · **école** · étudiant · modéliste | Given le formulaire, When il est soumis, Then le segment est enregistré |
| AC0-11 | **Bloc école** avec son propre lien `wa.me` à code unique et intention distincte | Given un clic, When WhatsApp s'ouvre, Then le message identifie l'intention « école » |
| AC0-12 | Formulaire, livraison, email et page de remerciement **réutilisés tels quels** | Given un audit du code, When on cherche un second composant de formulaire, Then il n'y en a pas |
| AC0-13 | Système graphique appliqué, **une seule apparition de la sienne brûlée** | Given un audit visuel, When on compte `#B7410E`, Then il y en a exactement un |
| AC0-14 | Vidéo en façade cliquable, images AVIF/WebP, LCP < 2,5 s en 4G, testé à 360 px | Given un audit Lighthouse mobile, When il s'exécute, Then Performance ≥ 85 |

### Nice-to-Have (P1)

| # | Exigence | Notes |
|---|---|---|
| AC1-1 | **Une collection d'exemple en entier** — fiche, line-up, 3 prototypes, lookbook — en page dédiée | La preuve la plus forte possible. Longue à produire, imbattable |
| AC1-2 | Le carnet de prompts d'une collection réelle, en PDF | Montre le sérieux de la méthode à un professionnel |
| AC1-3 | Témoignage d'une école ou d'un étudiant | Le segment C2 se vend par la référence |
| AC1-4 | Passerelle vers `atelier-collection-hybride` une fois le compact maîtrisé | Le palier naturel : patron coté et CLO 3D |
| AC1-5 | Replay d'une séance consacrée à une collection, de bout en bout | Transforme la séance en actif permanent |

---

## 11. Données

Aucune table nouvelle. Trois colonnes sur `leads` :

```
mode_prefere TEXT,      -- 'direct' | 'carnet'
segment_creation TEXT,  -- 'styliste' | 'marque' | 'ecole' | 'etudiant' | 'modeliste'
etablissement TEXT      -- rempli uniquement si segment = 'ecole'
```

Ajouts au scoring du §14 du PRD site :

| Signal | Points |
|---|---|
| Segment déclaré **école**, avec établissement nommé | **+45** |
| Segment styliste ou marque | +25 |
| Mode carnet (déjà équipé) | +10 |
| Clic sur le CTA école | **+40** |
| Segment étudiant | 0 — à servir, pas à prioriser |

**L'école domine délibérément.** C'est le seul segment de ce kit qui porte un budget de formation, et il est rare : quand il se présente, il doit remonter en tête de liste immédiatement.

---

## 12. Ce qu'on mesure

| Indicateur | Cible | Ce qu'il décide |
|---|---|---|
| Visiteur → lead | **15–25 %** | Plus bas que les kits shooting, et c'est voulu : l'encart d'engagement filtre |
| Part de leads « école » | à mesurer | Si elle dépasse 10 %, la formation devient une ligne d'offre à part entière |
| Répartition direct / carnet | à mesurer | Dit quel outil documenter en priorité |
| Inscription à la séance parmi les leads | **≥ 25 %** | Nettement plus haut que les autres kits — un projet de six étapes a besoin d'un rendez-vous |
| **« Où en êtes-vous ? » à J+10** | à mesurer | **La métrique centrale de ce kit** — voir ci-dessous |

**Le relevé d'étape à J+10.** Un email avec six boutons WhatsApp, un par étape : *« j'en suis à l'étape 1 · 2 · 3 · 4 · 5 · 6 »*.

Chaque réponse est un message entrant, donc une fenêtre de 24 h ouverte gratuitement. Et la distribution dit exactement **où la méthode casse**. Si tout le monde s'arrête à l'étape 3, ce n'est pas un problème de motivation : c'est que produire huit fiches techniques avant la première photo est un mur, et il faudra soit l'aplanir dans le chargeur, soit en faire le sujet d'une séance.

C'est l'équivalent, pour ce kit, du « as-tu réussi ta première image ? » des kits shooting — adapté à un parcours long.

---

## 13. Open Questions

- **[Produit] Le chargeur de moins de 8 000 caractères n'existe pas.** C'est le vrai travail avant la page. À extraire du skill, en gardant côté chargeur l'ordre imposé, l'interdiction de texte dans les images, le plafond de 5 références et les blocs recopiés mot pour mot.
- **[Produit] Faut-il livrer le compact seul, ou le compact et le visuel ?** Recommandation : **le compact seul**. Deux fichiers à installer, c'est déjà beaucoup ; deux versions à choisir, c'est une page qui ne convertit plus.
- **[Produit] Quelle collection sert de démonstration ?** Il en faut **une, complète et réelle** — lookbook, line-up, trois prototypes. C'est le livrable le plus long à produire et celui qui porte toute la page.
- **[Juridique] Droits sur la collection de démonstration.** Si elle vient d'un travail d'étudiant ou d'un client, accord écrit avant publication. Troisième fois que cette promesse s'applique à nous-mêmes.
- **[Opérations] Es-tu prêt à accompagner un projet de six étapes sur WhatsApp ?** Ce kit produit des conversations longues, pas des questions ponctuelles. C'est la vraie limite de capacité — et l'argument pour que la séance hebdomadaire absorbe ces demandes au lieu du fil individuel.
- **[Marketing] L'école où tu enseignes est le premier terrain.** Vingt étudiants qui suivent la méthode en conditions réelles donneraient en un semestre la distribution d'étapes que la mesure du §12 mettrait un an à produire — et un témoignage.

---

## 14. Phasage

- **Phase 0 — Produire la collection de démonstration.** Une collection complète, droits clarifiés, lookbook et line-up exportés. **Rien ne se publie avant** : sans elle, la page n'a pas d'argument.
- **Phase 1 — Découper le skill.** Chargeur sous 8 000 caractères, fichier système, protocole de test en quatre points.
- **Phase 2 — Le guide PDF** en français, avec l'installation dans les deux modes.
- **Phase 3 — La page.** Réutilisation de la landing kit, plus les trois blocs spécifiques : engagement, deux modes, école.
- **Phase 4 — Instrumentation.** Les trois colonnes, le scoring, l'email de relevé d'étape à J+10.
- **Phase 5 — Le terrain.** Déploiement auprès de l'école, relevé de la distribution d'étapes, premier témoignage.

**Deux avertissements.**

La tentation sera de publier la page avec des images de collection prises ailleurs. **Ce kit se vend sur une collection cohérente** — et une cohérence empruntée à quatre sources se voit immédiatement, surtout par Aïcha et Yann, qui sont précisément ceux qu'il faut convaincre.

Et ne cherche pas à raccourcir les six étapes pour rendre la page plus attirante. **L'ordre imposé est ce qui fait tenir la collection** : c'est la valeur, pas le coût. La page doit l'assumer et le dire — elle y gagnera des leads plus rares et nettement meilleurs.
