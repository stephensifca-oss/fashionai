# Studio V0 — la page qui distribue le kit avant que la génération existe

**Date :** 29 août 2026
**Objet :** version transitoire de `/studio`. L'utilisateur ne génère pas encore : il télécharge la méthode et l'exécute dans son propre outil.
**À lire avec :** `PRD.md` §12 (P0-1 à P0-11), `PRD_APPLICATION.md` §2

---

## Ce que je changerais dans ta logique — six points

Ta séquence est juste : comprendre → télécharger contre ses coordonnées → remercier. Les corrections portent sur ce qui se passe autour.

### 1. Ne construis pas une nouvelle page — construis la landing kit, à l'URL `/studio`

Tout ce que tu décris existe déjà en spécification : landing avec démonstration, encart prérequis, formulaire, lien signé, email transactionnel, page de remerciement. C'est P0-1 à P0-11 du PRD site.

Faire une deuxième page avec son propre formulaire et sa propre page de remerciement, c'est dupliquer le code, **couper les leads en deux bases** et casser le scoring. Réutilise le composant de formulaire, la table `leads`, la route de téléchargement à token et la page de remerciement du site. Seul le contenu change.

**Garde l'URL `/studio`** en revanche : c'est là que la génération vivra. Le jour où elle arrive, la page gagne le générateur et le téléchargement reste — le visiteur n'a pas d'adresse à réapprendre, et tes liens YouTube ne meurent pas.

### 2. Ne livre pas toute la méthode — livre de quoi faire **une** image

C'est le point le plus important, et c'est une décision commerciale, pas technique.

Tu as quatre agents : `cloth`, `swap`, `transfert_profil`, `transfert_dos`. Le studio payant vend **la série cohérente** — c'est écrit dans le PRD application : *« Gratuit : le plan maître. Payant : la série. »*

Si le téléchargement contient les quatre agents, tu donnes le produit entier avant de l'avoir construit, et tu n'auras plus rien à vendre le jour où le studio existera.

| Livré dans le kit V0 | Gardé pour le studio |
|---|---|
| `cloth` — la normalisation du vêtement | `transfert_profil` |
| `swap` — le plan maître | `transfert_dos` |
| | Les cadrages en sept postes |
| | La bibliothèque de mannequins et de templates |

Et ce n'est pas une amputation : **ce que tu donnes fait déjà quelque chose de spectaculaire** — une photo UGC devient un plan de mode exploitable. C'est exactement la démonstration gratuite du studio, faite à la main.

La phrase à écrire sur la page : *« Ce kit produit votre plan maître. La série cohérente — trois-quarts et dos, même mannequin, même lumière — c'est ce que fait le studio automatiquement. »* Le manque est annoncé, il devient une attente au lieu d'une déception.

### 3. La page de remerciement ne doit pas demander un like

Un like ne se retrouve pas, ne s'attribue pas, et ne crée aucune conversation. **La seule chose qui compte est un message WhatsApp entrant** — c'est le principe directeur du site, et c'est le levier économique : c'est le lead qui écrit qui ouvre la fenêtre de service gratuite de 24 h.

Remplace « likez nos profils » par les **trois intentions WhatsApp déjà spécifiées**, avec leur code unique :

1. **M'inscrire à la séance de jeudi** *(principal)* — la seule raison d'écrire qui se renouvelle chaque semaine
2. **Je suis bloqué sur une étape**
3. **Auditez un de mes visuels**

Les réseaux sociaux peuvent rester, discrets, tout en bas. Pas au centre.

### 4. Le kit va échouer au premier essai — organise cet échec

Un prompt de 14 blocs sur un outil qu'on découvre, ça rate. C'est prévisible et ce n'est pas un défaut : **c'est ton meilleur générateur de conversations.**

Donc, sur la page et dans le PDF, une phrase assumée : *« Le premier essai rate souvent. C'est normal — écris-moi, on le débloque ensemble. »* Elle transforme la frustration en message entrant au lieu d'un abandon silencieux.

### 5. Ajoute l'encart « Ce dont vous avez besoin » **au-dessus** du formulaire

Le kit ne fonctionne que sur un modèle qui accepte **plusieurs images de référence**. Un utilisateur qui télécharge, essaie sur un outil texte → image et obtient n'importe quoi t'en voudra à toi, pas à son outil.

Nomme donc explicitement les outils compatibles, en séparant gratuit et payant, avec un ordre de grandeur mensuel. Ça fera baisser ton taux de conversion — c'est voulu, et ça t'évite une file de leads déçus.

### 6. Fournis les images de l'exemple, pas seulement le prompt

Ajoute au téléchargement **la photo de vêtement et la fiche mannequin de ton exemple validé**. L'utilisateur reproduit d'abord un résultat connu, vérifie que sa chaîne fonctionne, puis passe à son propre vêtement.

C'est ce qui sépare un kit qu'on lit d'un kit qu'on exécute. Coût pour toi : zéro. **Attention : uniquement des références dont tu détiens les droits** — donc la fiche `FATOU`, pas les mannequins Unsplash.

---

## La page, section par section

Ordre imposé. Une seule colonne sur mobile, tout au-dessus du pli compte.

| # | Section | Contenu | Règle |
|---|---|---|---|
| 1 | **Promesse** | Le résultat, pas la technique. *« Transformez une photo de votre vêtement en plan de mode exploitable »* | Bodoni, une seule fois sur la page |
| 2 | **Avant / après** | La photo UGC d'origine à côté du plan maître, à taille égale | **C'est la preuve.** Rien ne convainc autant. Images à fond perdu, pas de cadre |
| 3 | **Galerie d'exemples** | 3 à 6 résultats issus du même kit | Grille, pas de carrousel — un carrousel n'est vu qu'à sa première image |
| 4 | **La vidéo** | Façade cliquable, jamais une iframe au premier rendu | Une iframe YouTube coûte ~800 kB et détruit le LCP mobile |
| 5 | **Les étapes en images** | Captures numérotées, une par étape, **empilées verticalement** | Pas d'accordéon, pas d'onglets : on doit pouvoir tout lire en scrollant |
| 6 | **Ce dont vous avez besoin** | Outils compatibles · gratuit ou payant · coût mensuel indicatif | **Au-dessus du bouton**, jamais après |
| 7 | **Le bouton** | « Télécharger le kit » | Encre pleine, angles droits. Un seul bouton principal sur la page |
| 8 | **Ce que ce kit ne fait pas** | Deux lignes honnêtes : le plan maître oui, la série cohérente non | Prépare la vente du studio |

**Registre.** C'est une page éditoriale qu'on lit, pas la console du studio : le système graphique du site s'applique tel quel — `#F6F6F8`, filets de 1 px, aucun arrondi, aucune ombre, sienne brûlée une seule fois et jamais sur un bouton.

---

## Le formulaire — champ par champ

Il s'ouvre en surcouche au clic sur le bouton. Six champs, pas plus.

| Champ | Statut | Détail |
|---|---|---|
| Prénom | Requis | — |
| **WhatsApp** | Requis | Indicatif pays, normalisé E.164, `libphonenumber-js` côté serveur |
| Email | Recommandé | Validé, jetables bloqués |
| **Lien de votre boutique ou page pro** | Requis **avec échappatoire** | Instagram, Facebook, TikTok ou site |
| *« Je n'ai pas encore de page pro »* | Case à cocher | **Débloque l'envoi sans lien** |
| Consentement marketing | Case **non pré-cochée**, distincte de la livraison | — |

### Sur le lien social — l'idée est bonne, la mise en œuvre décide de tout

C'est **le meilleur signal de qualification que tu obtiendras**, et de loin : en trente secondes tu vois le catalogue, le niveau des visuels actuels, le volume, la clientèle. Tu arrives dans la conversation WhatsApp en sachant à qui tu parles.

Mais rendu strictement obligatoire, il coûte cher : à Abidjan, beaucoup vendent par statut WhatsApp et messages privés, sans page publique. Tu perdrais exactement les profils d'Awa.

D'où l'échappatoire. **Et l'échappatoire est elle-même une donnée :** qui la coche est en amorçage — plutôt low ticket, à orienter vers le futur SaaS. Qui donne un lien Instagram à 20 000 abonnés est un lead high ticket, à traiter en agence.

### La justification à écrire au-dessus des champs

Ta formulation — « ces prompts sont d'abord destinés aux entrepreneurs » — est la bonne idée. Rédige-la ainsi :

> **Ce kit est destiné en priorité aux entrepreneurs et aux marques.**
> Nous demandons un lien vers votre boutique ou votre page pour comprendre à qui nous nous adressons, et pour vous répondre utilement si vous nous écrivez. Rien n'est publié, rien n'est revendu.

Une raison énoncée fait accepter une demande qui, sans elle, paraît intrusive. La dernière phrase est celle qui débloque le plus de formulaires.

---

## Ce qui est livré

Trois pièces, immédiatement, par lien signé 24 h lié au lead :

1. **`kit-shooting-mode.md`** — `cloth` + `swap`, en anglais. Le moteur.
2. **`guide-kit-shooting.pdf`** — en français, brandé, avec liens cliquables vers la vidéo et vers le WhatsApp à code. C'est le mode d'emploi, pas une traduction.
3. **`exemple/`** — la photo de vêtement et la fiche mannequin de l'exemple validé, pour reproduire avant d'improviser.

**Le téléchargement ne dépend jamais d'une réponse manuelle de ta part.** Il part dans les deux secondes, et l'email transactionnel dans la minute.

**Les fichiers ne sont jamais dans `/public`.** Dépôt hors zone servie, route serveur qui vérifie le token. Sans ça le lien fuite et le dispositif ne sert plus à rien.

Marque une **version** dans le `.md` (`Kit Shooting Mode — v1.0`). Le jour où tu corriges un agent, tu sais qui a quoi.

---

## La page de remerciement

Trois blocs, dans cet ordre.

**1. Les fichiers**, en premier. La promesse est tenue avant tout le reste.

**2. Les trois boutons WhatsApp**, chacun avec son code unique en message pré-rempli :

```
https://wa.me/225XXXXXXXXX?text=Je%20m'inscris%20%C3%A0%20la%20s%C3%A9ance%20du%20jeudi%20%E2%80%94%20code%20A7K2M
```

L'inscription à la séance est le bouton principal. C'est la seule raison d'écrire qui revient **chaque semaine**, sans que tu inities jamais et sans payer un message.

**3. La qualification différée** — six questions, toutes ignorables, l'accès aux fichiers n'en dépend pas : rôle · entreprise · taille de l'équipe · volume de visuels par mois · photo, vidéo ou les deux · blocage principal en champ libre.

Les réseaux sociaux : une ligne en pied de page. Pas un bloc.

---

## Données et scoring

**Aucune nouvelle table.** Le champ social s'ajoute à `leads` :

```
social_url TEXT,
social_platform TEXT,      -- instagram | facebook | tiktok | site | autre
has_no_social INTEGER,     -- l'échappatoire cochée
```

Ajouts à la grille §14 du PRD :

| Signal | Points |
|---|---|
| Lien social fourni | **+15** |
| Lien vérifié comme boutique active | **+25** |
| Échappatoire cochée | **0** — pas de malus, mais oriente vers la voie low ticket |

Le lien se vérifie à la main, en admin, au moment de la première conversation. Pas d'automatisation : à ce volume, l'œil est meilleur et plus rapide.

---

## Ce qu'on mesure — et ce que ça décide

Cette page a une mission de plus que les autres : **dire s'il faut construire le studio.**

| Indicateur | Cible | Ce qu'il décide |
|---|---|---|
| Visiteur → lead | 25–35 % | La promesse et la preuve avant/après |
| Lien social fourni parmi les leads | ≥ 60 % | La qualité de la justification écrite |
| Clic WhatsApp parmi les leads | ≥ 25 % | La force des trois raisons d'écrire |
| **Message reçu parmi les clics** | **≥ 50 %** | **La métrique centrale du dispositif** |
| **« As-tu réussi ta première image ? »** | à mesurer | **Décide de tout le reste** |

Ce dernier point mérite d'être construit : à J+3, un email avec **deux boutons WhatsApp** — *« oui, j'ai réussi »* et *« non, je suis bloqué »*.

Les deux réponses sont un message entrant, donc une fenêtre de 24 h ouverte gratuitement. Et l'écart entre les deux te dit la seule chose qui compte : **si beaucoup n'y arrivent pas seuls, le studio automatisé a un marché démontré, avec des noms et des numéros dedans.** Si presque tous y arrivent, la valeur est ailleurs — dans la production faite pour eux, pas dans l'outil.

---

## Instructions à Antigravity

1. Route `/studio` en Server Component, contenu chargé depuis D1 comme une landing kit — pas de contenu en dur, pas de redéploiement pour changer un exemple.
2. **Réutiliser** `KitForm`, `EncartPrerequis`, la route de téléchargement à token, la page de remerciement et la table `leads`. Ajouter les trois colonnes ci-dessus par migration.
3. Ajouter les champs `social_url`, `social_platform`, `has_no_social` au schéma Zod côté serveur, avec la règle : **lien requis sauf si l'échappatoire est cochée**.
4. Vidéo YouTube en façade cliquable. Images en `next/image`, AVIF/WebP.
5. Trois liens `wa.me` avec code unique généré côté serveur, une intention distincte chacun.
6. Système graphique du site appliqué tel quel. Bodoni uniquement dans le titre de promesse.
7. **Ne pas toucher au studio de génération.** Cette page est autonome et vit à la même URL ; le générateur s'ajoutera au-dessus du téléchargement, sans le remplacer.
8. Testé à 360 px sur réseau lent. LCP < 2,5 s.

**Ordre de construction :** la page et son avant/après · le formulaire et la livraison · l'email transactionnel · la page de remerciement et ses trois boutons · l'email J+3 à deux boutons.

> Ne commence pas par la galerie. **La section qui produit des leads, c'est l'avant/après** — une photo prise au téléphone à côté du résultat. Si celle-là est bonne, le reste de la page peut être médiocre. Si elle est mauvaise, rien ne la rattrapera.
