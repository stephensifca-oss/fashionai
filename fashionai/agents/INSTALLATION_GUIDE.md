# Installer le système dans ChatGPT et Gemini

## Le principe : deux pièces, pas une

Les fichiers `SYSTEME_V-USER.md` et `SYSTEME_V-PRO.md` font 47 000 et 54 000 caractères. Aucune plateforme n'accepte ça dans un champ d'instructions — celui d'un GPT personnalisé est plafonné à **8 000 caractères**.

Le système se déploie donc en deux pièces :

| Pièce | Contenu | Où elle va |
|---|---|---|
| **Le chargeur** (`CHARGEUR_*.txt`, < 8 000 car.) | La procédure : ce que l'agent doit faire, dans quel ordre, et ce qu'il ne doit jamais faire | Champ **Instructions** |
| **Le fichier système** (`SYSTEME_*.md`) | Les données : gabarits, valeurs des 7 plans, couches du negative prompt, checklists | **Fichier de connaissance** |

**Pourquoi ce partage précis.** Un fichier de connaissance est lu par recherche : le modèle en récupère des fragments quand il juge en avoir besoin. C'est parfait pour aller chercher la focale du PLAN 5 ou le gabarit du triptyque. C'est mauvais pour une règle qui doit s'appliquer à chaque fois sans exception — s'il ne la récupère pas, elle n'existe pas.

Tout ce qui casse le système en silence est donc dans le chargeur : le traitement des verrous, les trois états du bloc 5, le filtrage du bloc 4, l'interdiction des énoncés d'absence, la composition du negative prompt. Le reste peut être cherché à la demande.

---

## Quelle version où

| Version | Usage | Déploiement conseillé |
|---|---|---|
| **V-USER** | Utilisateurs. Deux images en entrée, aucune image de mise en scène | GPT personnalisé public, ou Gem partagé |
| **V-PRO** | Mode PRO. Avec `@source` et `@ref_1` | GPT personnalisé privé, ou Gem privé |

Ne jamais mettre les deux chargeurs dans le même agent : ils se contredisent sur le PLAN 1 (verrous absolus contre verrous référentiels) et sur le negative prompt (4 couches contre 5).

---

## ChatGPT — GPT personnalisé

1. **Explorer les GPT** → **Créer** → onglet **Configurer** (ne pas passer par l'assistant conversationnel, il réécrit les instructions).
2. **Nom** : « Shooting Produit IA » (ou « Shooting Produit IA — PRO »).
3. **Description** : une phrase. Elle n'a aucun effet sur le comportement.
4. **Instructions** : coller le contenu de `CHARGEUR_V-USER.txt` (ou `CHARGEUR_V-PRO.txt`). Le compteur doit afficher moins de 8 000.
5. **Connaissances** : téléverser `SYSTEME_V-USER.md` (ou `SYSTEME_V-PRO.md`).
6. **Fonctionnalités** : garder **Interprétation du code** activée si tu veux que le fichier soit lu de façon fiable. Désactiver **Génération d'images** sur la V-USER si tu veux que l'agent produise des prompts et rien d'autre — sinon il générera des images à la place, et tes utilisateurs n'auront pas leurs prompts.
7. **Amorces de conversation** : « Voici ma tenue, fais-moi le triptyque » · « Voici @perso et @tenue, génère tout le shooting » · « Juste la vue principale ».
8. Tester avant de publier — voir le protocole plus bas.

**Attention à la génération d'images.** Si tu la laisses active, précise dans la première amorce que l'agent doit livrer les prompts. Le modèle a tendance à interpréter « fais-moi le shooting » comme une demande d'images.

---

## Gemini — Gem personnalisé

1. **Gemini** → **Explorer les Gems** → **Nouveau Gem**.
2. **Nom** : le même.
3. **Instructions** : coller le contenu du chargeur. Le champ des Gems est plus généreux que celui des GPT, mais garde la version à 8 000 caractères : c'est elle qui a été testée, et elle reste lisible.
4. **Connaissances** : téléverser le fichier `SYSTEME_*.md`.
5. Enregistrer, puis tester.

Google ne publie pas de limite chiffrée pour le champ d'instructions d'un Gem ni pour ses fichiers de connaissance. Si le champ refuse le texte, coupe la section MOTEUR du chargeur : c'est la seule qui peut vivre uniquement dans le fichier.

---

## Protocole de test — à faire avant de partager

Ces quatre tests attrapent les défauts que le système est précisément fait d'éviter. Si l'un échoue, c'est que le chargeur n'a pas été lu en entier ou que le fichier n'a pas été joint.

**Test 1 — la fiche existe.** Envoyer les images d'une tenue et demander le triptyque. L'agent doit livrer **deux** sorties : le prompt triptyque, puis la fiche `@tenue`. S'il n'en livre qu'une, le chargeur est tronqué.

**Test 2 — les plans sont différents.** Demander les plans 1 à 4. Comparer les blocs Pose et Caméra : les azimuts doivent être 0°, 0°, **90°**, **180°**, et les descriptions de pose doivent différer réellement. Si les quatre plans se ressemblent, le traitement des verrous n'a pas été appliqué — c'est le défaut le plus grave.

**Test 3 — le visage disparaît quand il doit.** Regarder le PLAN 4 (dos) et le PLAN 6 (taille). Aucun des deux ne doit contenir de description de visage, de regard ni de maquillage. Le bloc 5 doit y décrire la peau visible à la place.

**Test 4 — le negative prompt est propre.** Chercher dans les negative prompts les mots « source garment », « blue knit dress » ou tout vêtement qui n'est pas le tien. En V-USER il ne doit y en avoir aucun. Vérifier aussi qu'aucun terme ne décrit ta propre tenue.

---

## Ce qui change quand tu génères dans ChatGPT ou Gemini

Le système écrit des prompts pour Seedream 5.0 PRO, qui accepte un **negative prompt séparé**. GPT Image et Nano Banana n'en acceptent pas : chez eux, une liste de « no ceci, no cela » est lue comme une description et fait apparaître ce qu'elle interdit.

Le chargeur contient déjà la bascule. Pour l'activer, dis-le explicitement à l'agent :

> Je génère les images ici même, reformule les négatifs en positif.

Il doit alors :

- intégrer chaque négatif dans le bloc concerné, sous forme affirmative — « the backdrop is a uniform untextured pale off-white field (#EDEBE6) » plutôt que « no wall texture » ;
- transformer l'éviction en affirmation exclusive — « the figure wears only… » plutôt qu'une liste de ce qu'il ne faut pas voir ;
- viser 250 à 400 mots au lieu de 350 à 550, ces moteurs répondant mal aux prompts longs ;
- doubler chaque verrou impératif d'une formulation descriptive, les ordres (« must be preserved with zero alteration ») y étant moins efficaces que la description répétée de la valeur à tenir.
