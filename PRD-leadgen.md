# PRD — fashionai.agency · Kits de production visuelle mode par IA

**Auteur :** Stephen (Pôle Web SIFCA)
**Date :** 26 août 2026
**Statut :** Draft v3 — remplace la v2
**Domaine :** `fashionai.agency`
**Périmètre :** Photo **et** vidéo de produits mode
**Cible prioritaire :** Responsables communication de marques et PME mode

---

## Ce qui change depuis la v2

| Sujet | v2 | v3 |
|---|---|---|
| Périmètre | Shooting photo produit | **Photo ET vidéo de produits mode** — deux familles de kits |
| Cible prioritaire | Awa, e-commerçante | **Fatou, responsable com' de marque/PME** |
| Livrable principal | PDF, `.md` en bonus | **`.md` = le kit (le moteur)** · **PDF = son guide d'utilisation** · vidéo = la démonstration |
| Assistance | Réponses WhatsApp individuelles | **Séance de formation en ligne hebdomadaire**, groupée et enregistrée |
| Acquisition | YouTube | **YouTube + LinkedIn** — Fatou n'est pas au même endroit qu'Awa |
| Prérequis outils | Non traité | **Affichage obligatoire du coût des outils IA requis** avant le formulaire |
| Qualification | Profil individuel | **Champs B2B** : entreprise, rôle, taille d'équipe, budget visuel |

**Ce qui ne change pas :** le domaine, le principe du lead qui écrit en premier, le code unique WhatsApp, la stack Cloudflare sans carte, la SIM dédiée, le fait que rien n'est vendu sur le site, et la V2 génération d'images à crédits.

---

## 1. Problem Statement

Une marque mode ou une PME du secteur a un besoin visuel **permanent et coûteux** : chaque nouvelle collection, chaque nouveau modèle, chaque campagne exige des visuels — et de plus en plus, des vidéos. Un shooting traditionnel mobilise un studio, un photographe, un mannequin, un styliste, une équipe, pour un coût et un délai incompatibles avec un rythme de publication hebdomadaire.

L'IA change l'équation, mais elle est inaccessible en pratique : les outils changent tous les trois mois, les résultats sont médiocres sans méthode, et personne dans l'équipe n'a le temps d'apprendre. Le responsable communication sait que ça existe, voit passer des résultats impressionnants, et ne sait pas par où commencer.

**Le marché du « prompt gratuit pour photo produit IA » est saturé** — des dizaines de sites publient des listes de prompts en contenu SEO. **Le film de mode généré par IA, lui, est un terrain quasi vide.** C'est là que se trouve la différenciation, et c'est ce que le domaine `fashionai.agency` porte naturellement.

Le problème à résoudre n'est pas de distribuer des fichiers, c'est de **transformer une audience professionnelle mode en conversations WhatsApp qualifiées**, où l'offre est ensuite ajustée au besoin réel de chaque interlocuteur.

**Contrainte structurante :** rien n'est vendu sur le site. Le site n'est pas un tunnel de vente — c'est **une machine à provoquer des conversations qualifiées**.

---

## 2. Le principe directeur : c'est le lead qui écrit en premier

Toute l'architecture découle de ce point.

Le modèle de facturation WhatsApp Business 2026 : quand **le client** envoie un message, une **fenêtre de service de 24 heures** s'ouvre, pendant laquelle les réponses libres sont **gratuites**. Si l'entreprise initie, chaque message est facturé.

« Le lead écrit en premier » n'est donc pas un confort de suivi, c'est **le levier économique central**. Chaque mécanisme du site doit lui donner une raison d'écrire.

**Quatre raisons d'écrire sont prévues :**

| # | Raison | Disponibilité | Récurrence |
|---|---|---|---|
| 1 | **S'inscrire à la séance hebdomadaire** | V1 | **Chaque semaine** — la plus précieuse |
| 2 | **Débloquer une difficulté** sur un kit | V1 | À l'usage |
| 3 | **Audit gratuit** d'un visuel existant | V1 | Une fois |
| 4 | **Recharger des crédits** de génération | V2 | Récurrente |

La séance hebdomadaire est la plus importante des quatre : c'est la seule qui produit, **chaque semaine**, une raison neuve d'écrire — sans que tu inities jamais, et sans jamais payer un message.

**Le mécanisme technique qui relie tout : le code unique dans le message pré-rempli.**

```
https://wa.me/225XXXXXXXXX?text=Je%20m'inscris%20à%20la%20séance%20du%20jeudi%20—%20code%20A7K2M
```

Le code est généré côté serveur à l'arrivée du visiteur et stocké avec le kit consulté, l'intention (inscription / blocage / audit), la source UTM et l'horodatage. Quand le message arrive, le lead est identifié sans avoir rien saisi — et son numéro est **vérifié à 100 %**, puisque c'est WhatsApp lui-même qui l'envoie.

---

## 3. Goals

- **Provoquer des conversations WhatsApp initiées par le lead**, chacune identifiée par son code.
- **Remplir la séance hebdomadaire** — c'est le moteur de récurrence du dispositif.
- **Une landing dédiée par kit**, alimentée par sa vidéo YouTube et relayée sur LinkedIn.
- **Téléchargement immédiat et automatique.** Le fichier n'est jamais otage d'une réponse manuelle.
- **Qualifier en B2B** : entreprise, rôle, équipe, volume, budget. Sans offre affichée, c'est le seul moyen d'ajuster la proposition en conversation.
- **Annoncer honnêtement les prérequis** — les outils IA requis et leur coût, avant le formulaire.
- **Scorer sur l'engagement réel** : la présence à une séance vaut plus que tout le reste.
- **Coût d'infrastructure nul, aucune carte bancaire.**
- **Deux familles de kits** — photo et vidéo — sous une promesse unique et lisible.

---

## 4. Non-Goals

- **Vendre quoi que ce soit sur le site.** Pas de prix, pas de panier, pas de paiement.
- **Le mot « skill » en façade.** Vocabulaire de développeur. Reste en interne (code, tables).
- **Marketplace communautaire.** Catalogue fermé, curaté.
- **Volume de kits.** 4 à 8 kits excellents valent mieux qu'un catalogue creux.
- **Hébergement vidéo.** Tout reste sur YouTube.
- **Espace membre authentifié en V1.**
- **Automatisation WhatsApp en V1.** WhatsApp Business App, réponses manuelles.
- **Catégories hors mode.** Cosmétique, food, déco : V2 au plus tôt.
- **Traduire les kits en français.** Les prompts restent en anglais — c'est ce qui marche. Seul le **guide d'utilisation** est en français.
- **Blog SEO massif.** La différenciation passe par la démonstration vidéo.
- **Prendre en charge les abonnements outils du lead.** On explique, on ne finance pas.

---

## 5. Personas

### P1 — Fatou, responsable communication en marque / PME mode **(cible prioritaire)**
Gère la communication d'une marque de prêt-à-porter ou d'une PME textile. Doit alimenter Instagram, TikTok, le catalogue et les campagnes, avec un budget serré et sans studio interne. Un prestataire coûte cher et prend du temps ; l'équipe n'a ni les compétences ni la disponibilité pour apprendre seule.

**Ce qu'elle veut :** produire plus, plus vite, sans exploser le budget — et pouvoir le justifier en interne.
**Ce qui la bloque :** elle ne peut pas défendre un budget sur une promesse floue. Il lui faut des preuves et des chiffres.
**Ce qu'elle apprécie dans une séance de groupe :** elle n'est pas seule à ne pas savoir.
→ Finit en formation d'équipe ou en prestation récurrente. **C'est le lead le plus rentable.**

### P2 — Yann, photographe / créa freelance
Voit l'IA arriver et veut s'y mettre avant d'être dépassé. Techniquement à l'aise, exigeant sur le rendu. **C'est lui qui exploitera le fichier `.md` directement**, sans lire le guide.
→ Finit en formation, en collaboration, ou devient prescripteur auprès de ses propres clients.

### P3 — Awa, e-commerçante mode
30 à 80 articles par mois photographiés au téléphone. Volume réel, budget limité, aucune culture technique.
→ Finit en prestation ponctuelle. **Volume important, ticket faible.** À servir, pas à prioriser commercialement.

### P4 — Le curieux
Télécharge, ne fait rien. Utile en volume et en partage. Le scoring l'écarte automatiquement.

---

## 6. Le catalogue — deux familles

Le site couvre la chaîne visuelle mode complète, en deux familles clairement identifiées :

**🖼️ Kits Photo** — produire des visuels fixes : ghost mannequin, packshot studio, mise en situation, détail matière, déclinaison coloris.

**🎬 Kits Vidéo** — animer des visuels existants : animation d'édito, film de campagne, reel produit, séquence cinématique. *(Le kit `ANIMATION_SKILL` fourni appartient à cette famille.)*

**Pourquoi les deux :** la famille Photo capte la demande là où elle existe déjà — c'est le besoin que Fatou sait nommer. La famille Vidéo est la différenciation — c'est ce que personne d'autre ne propose, et ce qui justifie le domaine. La première fait le volume, la seconde fait la réputation.

**Règle de lisibilité :** chaque kit affiche sa famille par un pictogramme et un code couleur constant, sur la landing comme dans le catalogue. Un visiteur doit savoir en une seconde s'il regarde de la photo ou de la vidéo.

---

## 7. Le livrable — trois pièces, trois rôles

Le kit source est un document dense de plusieurs milliers de mots, en anglais, de doctrine de prompt engineering. **Ce document n'est pas le produit : c'est le moteur du produit.** Il est fait pour être collé dans une IA, pas lu par Fatou.

| Pièce | Rôle | Pour qui | Format |
|---|---|---|---|
| **Le kit** | Le moteur. Se colle dans l'IA. | Yann directement, Fatou via le guide | `.md` |
| **Le guide d'utilisation** | Où le coller, quoi lui donner, ce qu'on obtient, 3 exemples | Fatou, Awa | **PDF français brandé** |
| **Le tutoriel** | La démonstration de bout en bout | Tout le monde | Vidéo YouTube |

**Le PDF guide contient :** les prérequis et leur coût, la marche à suivre pas-à-pas avec captures d'écran, trois exemples avant/après réels, les erreurs fréquentes, et **des liens cliquables vers la vidéo YouTube et vers le WhatsApp avec code**. Court et visuel — il doit se lire sur un téléphone en cinq minutes.

**Le PDF est le canal d'acquisition secondaire.** Chaque exemplaire partagé porte tes liens. Un `.md` partagé, non.

---

## 8. Les prérequis — à annoncer avant le formulaire

Le kit `ANIMATION_SKILL` exige **Veo 3**, qui n'est pas gratuit. C'est vrai de la plupart des kits vidéo, et de certains kits photo.

**Exigence non négociable : chaque landing affiche, au-dessus du formulaire, un encart « Ce dont vous avez besoin »** — l'outil requis, s'il est gratuit ou payant, et l'ordre de grandeur mensuel.

Ça coûtera des téléchargements. Ça évitera bien davantage de leads frustrés qui découvrent le prérequis après coup — et les leads qui passent quand même le gate sont sensiblement mieux qualifiés. Pour Fatou en particulier, connaître le coût de l'outil est une information dont elle a besoin de toute façon pour arbitrer en interne.

---

## 9. La séance hebdomadaire

C'est la brique la plus structurante de la V1. Elle résout la capacité de support **et** produit du contenu **et** alimente l'offre formation.

### Fonctionnement

- **Une séance en ligne par semaine**, jour et heure fixes, annoncés partout.
- **Inscription par message WhatsApp uniquement** — c'est ce qui en fait une raison d'écrire renouvelée chaque semaine.
- **Ouverte à toute personne ayant téléchargé un kit**, qu'elle soit bloquée ou simplement curieuse.
- **Systématiquement enregistrée.** Sans enregistrement, tout le bénéfice « contenu » disparaît.
- **Outil : Google Meet** (gratuit, aucune installation côté participant).

### Pourquoi c'est plus fort qu'un support individuel

- **Le coût devient du contenu.** Une séance enregistrée est une vidéo YouTube de plus, donc de l'acquisition. Le support s'auto-finance.
- **Le groupe fait la preuve sociale.** Dix personnes qui posent des questions, c'est dix personnes qui en voient neuf autres utiliser tes kits.
- **C'est la démonstration de l'offre formation.** Fatou évalue ta pédagogie en direct, gratuitement. Ceux qui en veulent plus se signalent seuls.
- **La récurrence est intégrée.** Chaque semaine rouvre une fenêtre WhatsApp de 24 h, sans que tu inities jamais.

### Les trois règles qui décident du succès

**Le délai.** Quelqu'un bloqué le mardi qui doit attendre jeudi abandonne. Il faut un **accusé de réception immédiat** et un tri : question courte → réponse par message dans la journée ; vraie difficulté → séance. Le tri se fait à la lecture du message, pas plus tard.

**La régularité.** Une séance annulée deux fois tue le dispositif. La fréquence hebdomadaire est retenue — elle exige une discipline sans faille. **Plancher : en dessous de 3 inscrits, la séance est reportée, mais les inscrits sont prévenus individuellement le jour même.** Un report annoncé ne coûte rien ; un silence coûte la confiance.

**L'enregistrement.** Réflexe dès la première séance, jamais une bonne idée pour plus tard. Chaque enregistrement devient soit une vidéo YouTube publique (acquisition + preuve), soit une pièce de la bibliothèque réservée aux leads (nouvel aimant).

### Signal de scoring

**Quelqu'un qui s'inscrit et vient est le lead le plus chaud de toute la base.** Il a donné son temps, pas seulement son numéro. Ce signal domine toute la grille.

---

## 10. Le parcours

```
YouTube (tuto du kit)  ·  LinkedIn (post + cas)  ·  QR code fin de vidéo  ·  PDF partagé
   │
   ▼
Landing dédiée  /kits/[slug]
   │  Famille (photo/vidéo) · vidéo démo · avant/après · ENCART PRÉREQUIS · formulaire
   ▼
Formulaire court : Prénom · WhatsApp (requis) · Email (recommandé) · consentement
   │
   ▼
Téléchargement IMMÉDIAT  —  kit .md + guide PDF
   │
   ▼
Page de remerciement
   ├─ Qualification B2B (6 questions, skippables)
   ├─ « Regarder le tuto »
   ├─ 🟢 « Je m'inscris à la séance de jeudi »   → wa.me + code   ← LE CTA PRINCIPAL
   ├─ 🟢 « Je bloque, aidez-moi »                 → wa.me + code
   └─ 🟢 « Auditez mon visuel »                   → wa.me + code
   │
   ▼
LE LEAD ÉCRIT  →  fenêtre 24 h  →  échange gratuit  →  numéro vérifié
   │
   ▼
Séance hebdomadaire  →  il voit ta pédagogie  →  il revient la semaine suivante
   │
   ▼
Conversation : diagnostic du besoin  →  proposition ajustée
   ├─ Marque/PME, équipe à monter en compétence  →  Formation d'équipe
   ├─ Volume élevé, pas de ressource interne      →  Production déléguée
   ├─ Créa freelance                              →  Formation individuelle / collaboration
   └─ Pas mûr                                     →  Séances + newsletter
```

**Règle absolue :** le fichier n'est jamais derrière WhatsApp. Un lead qui attend son fichier devient méfiant, pas client.

---

## 11. Arborescence

| Route | Rôle | Priorité |
|---|---|---|
| `/` | Accueil — promesse, deux familles, preuve, catalogue | P0 |
| `/kits` | Catalogue, filtre Photo / Vidéo | P0 |
| `/kits/[slug]` | **Landing dédiée — la page qui compte** | P0 |
| `/merci/[slug]` | Téléchargement + qualification + les trois CTA WhatsApp | P0 |
| `/dl/[token]` | Résolution du lien signé → fichiers | P0 |
| `/seance` | La séance hebdomadaire : principe, jour, heure, inscription WhatsApp, replays | P0 |
| `/travailler-ensemble` | Crédibilité, pas de vente : modes d'intervention, réalisations, WhatsApp | P0 |
| `/admin` | Dashboard leads, catalogue, résolution de code, gestion des séances | P0 |
| `/mentions-legales`, `/confidentialite` | Conformité | P0 |
| `/desinscription/[token]` | Opt-out en un clic | P0 |
| `/a-propos` | Parcours, légitimité | P1 |
| `/replays` | Bibliothèque des séances enregistrées | P1 |

---

## 12. Requirements

### Must-Have (P0) — V1 lançable

| # | Exigence | Critères d'acceptation |
|---|---|---|
| P0-1 | Landing générée depuis la base, une par kit, avec **indication visuelle de la famille** (photo/vidéo) | Given un kit publié, When on visite `/kits/[slug]`, Then la page complète s'affiche avec sa famille identifiable, sans redéploiement |
| P0-2 | **Encart « Ce dont vous avez besoin »** au-dessus du formulaire : outil IA requis, gratuit ou payant, ordre de grandeur mensuel | Given un kit exigeant un outil payant, When la landing s'affiche, Then le prérequis est visible sans scroller au-delà du formulaire |
| P0-3 | Formulaire : Prénom (requis), WhatsApp (requis, indicatif pays, normalisé E.164), Email (recommandé, validé), consentement marketing (case non pré-cochée, distincte de la livraison) | Given un formulaire valide, When soumis, Then le lead est enregistré et le téléchargement démarre en moins de 2 s |
| P0-4 | Livraison immédiate de **deux fichiers** — le kit `.md` et le guide PDF — par lien signé 24 h, non devinable, lié au lead | Given un lien généré, When ouvert après 24 h ou par un autre lead, Then l'accès est refusé avec option « recevoir un nouveau lien » |
| P0-5 | **PDF guide** en français, brandé, avec liens cliquables vers la vidéo YouTube et vers le WhatsApp à code | Given le PDF ouvert sur mobile, When on touche le lien WhatsApp, Then WhatsApp s'ouvre avec le message pré-rempli |
| P0-6 | Génération et persistance d'un **code unique** par session/kit/intention, injecté dans tous les liens `wa.me` | Given un visiteur qui clique un CTA WhatsApp, When le message s'ouvre, Then il contient un code résolvable en base avec son intention |
| P0-7 | **Trois CTA WhatsApp distincts** sur la page de remerciement — inscription séance (principal), blocage, audit — avec messages pré-remplis différents | Given un clic sur l'un des trois, When WhatsApp s'ouvre, Then le message identifie l'intention et le kit |
| P0-8 | **Page `/seance`** : principe, jour et heure fixes, prochaine date calculée automatiquement, bouton d'inscription WhatsApp, replays | Given un visiteur sur `/seance`, When la page charge, Then la date de la prochaine séance est exacte sans intervention manuelle |
| P0-9 | Inscription séance visible aussi sur la landing, dans le PDF et dans l'email transactionnel | Given un lead qui n'a pas vu la page de remerciement, When il ouvre l'email ou le PDF, Then l'invitation à la séance est présente |
| P0-10 | Email transactionnel immédiat : liens de téléchargement, lien vidéo, invitation à la séance, rappel WhatsApp | Given un lead créé, When le formulaire est validé, Then l'email part en moins de 60 s, hors spam sur Gmail et Outlook |
| P0-11 | **Qualification B2B différée**, 6 questions skippables : rôle · entreprise/marque · taille de l'équipe com' · volume de visuels mensuel · besoin photo/vidéo/les deux · blocage principal (champ libre) | Given un lead sur la page de remerciement, When il répond ou ignore, Then dans les deux cas il accède aux fichiers |
| P0-12 | Reconnaissance du lead récurrent (cookie + WhatsApp/email en base) | Given un lead déjà connu, When il visite une autre landing, Then il télécharge en un clic |
| P0-13 | Tracking implicite : UTM, referrer, kit, famille, horodatage, pages vues, clics WhatsApp par intention | Given un visiteur avec UTM LinkedIn, When il devient lead, Then la source est distinguée du trafic YouTube en admin |
| P0-14 | Scoring recalculé côté serveur à chaque interaction, selon la grille §14 | Given un lead qui assiste à une séance, When l'admin le marque présent, Then son score reflète ce signal |
| P0-15 | Dashboard admin : leads (tri/filtre par score, source, kit, famille, statut WhatsApp), fiche détaillée, **résolution d'un code**, **gestion des inscrits et présents par séance**, export CSV | Given un code reçu sur WhatsApp, When l'admin le saisit, Then la fiche du lead correspondant s'affiche |
| P0-16 | Gestion du catalogue en admin : créer/modifier/dépublier un kit (titre, slug, **famille**, description, `.md`, PDF, ID vidéo YouTube, visuels avant/après, **prérequis outil et coût**, sous-catégorie mode, niveau) | Given un kit créé et publié, When on visite son slug, Then la landing est immédiatement accessible |
| P0-17 | Anti-spam : honeypot, rate limiting par IP, blocage des emails jetables, validation stricte du numéro | Given 10 soumissions d'une même IP en 1 min, When la 11ᵉ arrive, Then elle est rejetée sans créer de lead |
| P0-18 | Conformité : mentions légales, confidentialité, consentement marketing explicite et séparé, désinscription en un clic, suppression sur demande | Given un clic sur le lien de désinscription, When la page charge, Then le lead est désabonné sans connexion ni justification |
| P0-19 | Responsive mobile-first, testé à 360 px en réseau lent | Given une visite mobile 360 px, When la landing charge, Then formulaire, encart prérequis et CTA sont accessibles sans zoom |
| P0-20 | Performance : LCP < 2,5 s sur mobile 4G, vidéo YouTube en **façade cliquable** | Given un audit Lighthouse mobile, When il s'exécute, Then le score Performance est ≥ 85 |
| P0-21 | Notification admin sur événement à haute intention : inscription séance, demande d'audit, clic WhatsApp, seuil « chaud » franchi | Given un lead s'inscrit à la séance, When l'événement est enregistré, Then l'admin est notifié en moins de 5 minutes |
| P0-22 | **Migration du domaine `fashionai.agency`** : DNS vers Cloudflare, HTTPS, redirection des anciennes URL indexées, SPF/DKIM/DMARC pour Resend | Given un test de délivrabilité, When un email part du domaine, Then SPF, DKIM et DMARC passent et le message arrive en boîte principale |

### Nice-to-Have (P1)

| # | Exigence | Notes |
|---|---|---|
| P1-1 | **Page `/replays`** : bibliothèque des séances enregistrées | Transforme le support en actif permanent. Peut devenir un aimant à part entière |
| P1-2 | **QR code `wa.me` par kit**, à afficher en fin de vidéo YouTube | Supprime l'étape « aller sur le site ». Fort levier sur audience mobile |
| P1-3 | Rappel automatique aux inscrits la veille de la séance | Le taux de présence s'effondre sans rappel. Attention : message sortant → à envoyer par email, pas par WhatsApp (coût) |
| P1-4 | Séquence email 4 messages (J0, J2, J5, J9) branchée sur le profil déclaré | Sans relance, les leads meurent en dix jours |
| P1-5 | Réponses types WhatsApp documentées (inscription, blocage, audit, diagnostic) | Sans script, chaque conversation repart de zéro |
| P1-6 | **Cas clients chiffrés** : coût et délai d'un shooting traditionnel vs production IA | C'est l'argument dont Fatou a besoin pour défendre son budget en interne. Probablement l'élément de conversion le plus puissant du site |
| P1-7 | Galerie de résultats avant/après par famille | La preuve la plus convaincante |
| P1-8 | Progressive profiling au 3ᵉ téléchargement (site web, pays, budget) | Enrichit sans tout demander d'un coup |
| P1-9 | Catalogue filtrable famille / sous-catégorie mode / outil / niveau | Utile à partir de ~8 kits |
| P1-10 | OG images dynamiques par kit + données structurées `HowTo` / `VideoObject` | Partage social et SEO |

### Version 2

| # | Exigence |
|---|---|
| V2-1 | Génération d'images directement sur la page de chaque kit |
| V2-2 | Système de crédits : 3 générations offertes sans inscription |
| V2-3 | **Recharge de crédits uniquement par message WhatsApp** — cœur du mécanisme |
| V2-4 | Plafonds anti-abus : par IP, par empreinte navigateur, plafond global quotidien avec coupure |
| V2-5 | Crédits bonus contre témoignage, partage de résultat, parrainage |
| V2-6 | WhatsApp Cloud API + webhook : résolution automatique du code et attribution des crédits |
| V2-7 | Extension éventuelle hors mode |
| V2-8 | Réutilisation des images générées (avec accord) comme preuve sociale |

---

## 13. Modèle de données

```
leads
  id, first_name, whatsapp_e164 (unique), whatsapp_country, email,
  consent_marketing, consent_at, source_utm{source,medium,campaign,content},
  referrer, first_seen_at, last_seen_at, score, status,
  whatsapp_verified, whatsapp_first_message_at,
  unsubscribed_at, deleted_at

lead_profile                -- qualification B2B, tous champs nullables
  lead_id, role, company_name, company_type, team_size,
  monthly_volume, need_type (photo|video|both),
  fashion_subcategory, main_blocker (text),
  website, country, budget_range, answered_at

kits                        -- « skills » en interne, « kits » en façade
  id, slug, title, subtitle, family (photo|video), description_md,
  md_path, pdf_path, file_version,
  required_tool, tool_is_paid, tool_cost_note,
  youtube_video_id, thumbnail_path, before_after[] (json),
  fashion_subcategory, level, published, published_at, download_count

downloads
  id, lead_id, kit_id, created_at, ip_hash, user_agent, utm{...}

download_tokens
  token, lead_id, kit_id, expires_at, used_at

wa_codes                    -- le pivot du dispositif
  code (5 car. alphanum., casse insensible), lead_id (nullable),
  kit_id, intent (session|support|audit|credits|download),
  utm{...}, created_at, redeemed_at

sessions                    -- les séances hebdomadaires
  id, scheduled_at, status (planned|held|postponed),
  meet_url, recording_url, topic, notes

session_registrations
  session_id, lead_id, registered_at, attended (bool), source_code

events
  id, lead_id (nullable), type, payload (json), created_at
  -- page_view · video_play · form_submit · download
  -- qualification_answer · wa_click · wa_message_received
  -- session_registered · session_attended
  -- email_open · email_click · cta_click
```

**Notes :**
- Clé de dédoublonnage : le **numéro WhatsApp en E.164**, pas l'email. Normalisation à la saisie.
- `wa_codes` existe **avant** le lead : un visiteur peut cliquer un CTA sans avoir rempli le formulaire. Le rapprochement se fait à réception du message.
- Le code est court (5 caractères) parce qu'il doit rester lisible dans un message, et insensible à la casse parce qu'il sera parfois retapé à la main.
- `sessions` et `session_registrations` sont ce qui rend la séance mesurable — sans ces tables, tu ne sauras jamais si elle convertit.

---

## 14. Scoring

| Signal | Points |
|---|---|
| Téléchargement d'un kit | +10 (plafonné à 40) |
| Qualification complétée | +15 |
| Champ « blocage » rempli | +10 |
| Volume déclaré 50–200 visuels/mois | +15 |
| Volume déclaré 200+ visuels/mois | +25 |
| Rôle responsable com' / marketing en marque ou PME | +20 |
| Équipe de 2 personnes ou plus | +10 |
| Besoin déclaré « photo **et** vidéo » | +10 |
| Clic sur un CTA WhatsApp | +20 |
| **Message WhatsApp effectivement reçu** | **+40** |
| Demande d'audit visuel | +35 |
| Demande d'assistance (blocage) | +25 |
| **Inscription à une séance** | **+40** |
| **Présence effective à une séance** | **+60** |
| Présence à 2 séances ou plus | +40 supplémentaires |
| Ouverture d'email ×3 ou plus | +5 |
| Aucune activité depuis 30 jours | −15 |

**Seuils :** ≥ 70 chaud (contact sous 48 h) · 40–69 tiède (séquence dédiée) · < 40 froid (newsletter passive).

**La présence en séance domine délibérément la grille.** C'est le seul signal qui coûte du temps au lead — impossible à produire par accident, impossible à simuler. Quelqu'un qui bloque une heure de son agenda professionnel pour t'écouter a déjà pris sa décision, même s'il ne le sait pas encore.

Valeurs **à recalibrer après 100 leads réels et 5 séances**. Le premier scoring est toujours faux ; l'important est d'avoir les données pour le corriger.

---

## 15. Architecture technique

**Stack : Next.js sur Cloudflare, aucune carte bancaire à aucune étape.**

| Couche | Choix | Carte ? |
|---|---|---|
| Framework | **Next.js 15+ (App Router)** — Server Actions, ISR pour les landings | — |
| Hébergement | **Cloudflare Workers / Pages** (via OpenNext) — usage commercial autorisé en gratuit | Non |
| Base de données | **Cloudflare D1** — 5 Go, 5 M lignes lues/jour, 100 k écrites/jour, renouvelé quotidiennement | Non |
| Fichiers (`.md` + PDF) | **Dans le dépôt Git**, hors dossier public, servis par route serveur après validation du token | — |
| Visuels avant/après | Dépôt + `next/image` (AVIF/WebP) | — |
| Emails | **Resend** — ~3 000/mois | Non |
| Visio | **Google Meet** — gratuit, rien à installer côté participant | Non |
| WhatsApp V1 | Liens `wa.me` + **WhatsApp Business App** sur ligne dédiée | Non |
| WhatsApp V2 | **WhatsApp Cloud API** + webhook | Non |
| Validation | Zod côté serveur, `libphonenumber-js` pour l'E.164 | — |
| UI | Tailwind + shadcn/ui | — |
| Analytics | Événements maison en table `events` — c'est eux qui alimentent le scoring | — |

**Seul coût du projet : le renouvellement du domaine**, 10 à 15 € par an.

**Points d'architecture non négociables :**

- **Les fichiers ne sont jamais dans `/public`.** Ils vivent dans le dépôt hors zone servie ; une route serveur les délivre après vérification du token. Sans ça, le lien fuite et le dispositif perd son sens.
- **Les landings sont statiques et revalidées** (ISR), servies depuis le CDN. C'est ce qui tient le LCP.
- **La vidéo YouTube n'est jamais une iframe au premier rendu.** Façade cliquable injectant l'iframe au clic — une iframe YouTube coûte environ 800 kB et détruit le LCP mobile.
- **Les formulaires passent par des Server Actions**, jamais par une route API publique.
- **Le scoring est calculé côté serveur uniquement.**
- **Cinq modules séparés** : *Capture* · *Livraison* · *WhatsApp* (codes, intentions, résolution) · *Séances* (planification, inscriptions, présences) · *Intelligence* (events, scoring, segmentation). Cette séparation permettra de brancher la Cloud API et les crédits en V2 sans toucher au reste.

**Repli :** si l'adaptateur OpenNext pose problème, **Netlify** en offre gratuite est l'alternative — usage commercial autorisé, Next.js natif, pas de carte.

---

## 16. Le domaine `fashionai.agency`

**Verdict : à conserver.** Le nom dit ce que fait le site, le TLD `.agency` renforce le positionnement de prestataire — cohérent avec le fait que rien n'est vendu en ligne — et l'ancien usage (SaaS de génération d'images pour marques mode) visait exactement la même audience sur le même sujet. C'est le cas de figure idéal en réutilisation de domaine. Son ancienneté est un actif.

**État constaté au 26/08/2026 :** le domaine répond en **HTTP 402 (Payment Required)** — l'hébergement précédent est suspendu pour défaut de paiement, mais le domaine est intact et les DNS résolvent.

**Checklist avant mise en service :**

1. Vérifier que le domaine est **renouvelé et sous ton contrôle** chez le registrar — un 402 côté hébergeur peut masquer une échéance proche côté domaine.
2. `site:fashionai.agency` dans Google — recenser l'indexation résiduelle et prévoir les redirections.
3. **Vérification de listes noires** (MXToolbox ou équivalent). **Point critique :** l'ancien SaaS a probablement envoyé des emails depuis ce domaine. S'il a été blacklisté, la délivrabilité Resend est compromise avant le premier envoi.
4. Wayback Machine — repérer d'éventuelles URL à conserver.
5. Google Search Console — vérifier l'absence d'action manuelle.
6. Repointer les DNS vers Cloudflare, configurer **SPF, DKIM, DMARC**, tester la délivrabilité avant le lancement.

---

## 17. La ligne WhatsApp

**Décision : SIM dédiée, dès le premier jour.**

Un numéro enregistré sur la Cloud API **ne peut plus être utilisé dans l'application WhatsApp**. Démarrer sur le numéro personnel condamne à choisir plus tard entre renoncer à l'automatisation et perdre WhatsApp sur sa ligne privée.

Trois raisons complémentaires : séparation vie privée / vie pro (les leads écrivent le dimanche à 23 h), crédibilité d'un profil WhatsApp Business complet, coût dérisoire d'une SIM.

**Le chemin :** SIM dédiée → WhatsApp Business App en V1 (message d'accueil automatique, réponses rapides, étiquettes) → migration de **ce même numéro** vers la Cloud API en V2.

**Règle absolue :** ce numéro apparaîtra dans les descriptions de toutes les vidéos, les QR codes, chaque PDF distribué. **Un numéro changé, c'est tout l'historique de contenu qui pointe dans le vide.** Il se choisit une fois.

---

## 18. Acquisition

Fatou et Awa ne sont pas au même endroit. Deux canaux, deux rôles.

**YouTube — la démonstration.** Le tuto par kit reste la porte d'entrée principale. C'est là que se prouve le résultat, et c'est ce qui justifie le gate. QR code WhatsApp en fin de vidéo.

**LinkedIn — l'accès à Fatou.** Une responsable communication de marque ne cherche pas « tuto prompt IA » sur YouTube ; elle voit passer des cas dans son fil. Format qui marche : le cas chiffré (avant/après avec coût et délai comparés), le retour d'expérience, l'extrait de séance. Lien vers la landing du kit correspondant, avec UTM distinct pour mesurer.

**Les séances enregistrées alimentent les deux.** Chaque séance produit du contenu réutilisable sur les deux canaux, sans production supplémentaire.

**Le PDF partagé — le canal invisible.** Chaque guide contient tes liens. Un guide transféré à une collègue est une acquisition gratuite. Raison de plus pour soigner ce document.

---

## 19. Contenu à produire

**Par kit :** le document source → **fichier `.md` propre** (le moteur) + **guide PDF français brandé** (mode d'emploi, prérequis chiffrés, 3 exemples avant/après, erreurs fréquentes, liens cliquables) · une vidéo YouTube de 6–12 min · 3 à 6 visuels avant/après réels · une description de 150–250 mots orientée résultat · une miniature · un QR code WhatsApp.

**Cible V1 : 4 kits au lancement — 2 photo, 2 vidéo.** L'équilibre importe : la famille Photo capte la demande exprimée, la famille Vidéo porte la différenciation. Puis 1 nouveau kit toutes les deux semaines.

**Axe de segmentation :** par sous-catégorie mode plutôt que par outil IA. Le visiteur cherche « comment traiter **mon** type de produit », pas « comment utiliser tel modèle ». Pistes : prêt-à-porter porté · ghost mannequin · accessoires et bijoux · pagne et textile africain · animation d'édito · film de campagne.

**Le kit `ANIMATION_SKILL` fourni** appartient à la famille Vidéo. Son guide PDF devra expliquer clairement le prérequis Veo 3 et son coût, et pourquoi les prompts restent en anglais.

---

## 20. Success Metrics

**Leading indicators (60 premiers jours)**

- **Taux visiteur → lead** sur une landing kit : cible **25–35 %**. Sous 15 %, c'est la promesse de la landing ou la valeur perçue du kit qui est en cause. *(Attention : l'encart prérequis fera mécaniquement baisser ce taux sur les kits à outil payant — c'est voulu, et c'est à mesurer séparément par famille.)*
- **Taux de clic sur un CTA WhatsApp** parmi les leads : cible **≥ 25 %**.
- **Taux de messages WhatsApp effectivement reçus** parmi les clics : cible **≥ 50 %**. *Métrique la plus importante du dispositif* — l'écart entre le clic et le message envoyé mesure exactement la force de la raison d'écrire.
- **Taux d'inscription à la séance** parmi les leads : cible **≥ 15 %**.
- **Taux de présence** parmi les inscrits : cible **≥ 50 %**. Sans rappel la veille, il tombe sous 30 %.
- **Nombre de séances tenues vs planifiées** : cible **100 %**. C'est un indicateur de discipline, pas de performance — mais c'est lui qui décide de la crédibilité du dispositif.
- **Taux de complétion de la qualification** : cible **≥ 40 %**.
- **Répartition des leads par famille** (photo vs vidéo) : indicateur de positionnement, à surveiller dès les premières semaines.
- **Répartition YouTube vs LinkedIn** : dira si Fatou est effectivement atteinte, ou si le trafic reste dominé par le profil Awa.
- **Délivrabilité de l'email transactionnel** : **≥ 98 %**.

**Lagging indicators (3–6 mois)**

- Nombre de conversations WhatsApp qualifiées par mois.
- Nombre de leads ayant assisté à 2 séances ou plus — **le meilleur prédicteur de conversion de toute la base**.
- Taux conversation → proposition commerciale formulée : cible **≥ 30 %**.
- Nombre de formations d'équipe et de missions de production attribuables au site.
- Part du chiffre d'affaires attribuable au site.
- Coût d'acquisition par lead, temps de production de contenu inclus.

---

## 21. Open Questions

- **[Produit] Faut-il un kit d'appel sans outil payant ?** Si les quatre kits de lancement exigent tous un abonnement, le gate se referme sur une audience étroite. **Recommandation : au moins un kit photo utilisable avec un outil gratuit**, comme porte d'entrée. À arbitrer avant de choisir les quatre premiers.
- **[Produit] Quelle promesse exacte porte chaque kit ?** « Kit Animation » est un nom d'outil, pas une promesse. Le titre de la landing doit annoncer le résultat — « Transformez vos photos de collection en films de campagne » —, pas la technique.
- **[Produit] Le kit source est en anglais.** Décision retenue : on ne traduit pas les prompts, on traduit le mode d'emploi. À confirmer après le premier retour utilisateur — si le blocage linguistique revient en séance, il faudra reconsidérer.
- **[Opérations] Quel jour et quelle heure pour la séance ?** À fixer une fois pour toutes, et à ne plus bouger. Contrainte réelle : ton emploi du temps, pas celui du lead idéal — une séance déplacée deux fois vaut moins qu'une séance à un horaire imparfait mais immuable.
- **[Opérations] Combien de temps par jour pour les conversations WhatsApp ?** C'est la vraie limite de capacité, bien avant l'infrastructure. C'est ce plafond qui déterminera quand la Cloud API devient indispensable.
- **[Opérations] Quel délai de réponse t'engages-tu à tenir ?** Annonce un délai tenable un mardi chargé, pas un dimanche calme. Une promesse non tenue coûte plus qu'une promesse modeste.
- **[Opérations] Les replays sont-ils publics ou réservés aux leads ?** Publics = acquisition et preuve. Réservés = nouvel aimant. **Recommandation : publics au début** — tu as davantage besoin de notoriété que de rareté.
- **[Marketing] Qui rédige les séquences email et les réponses types WhatsApp ?** Chantier à part entière, à mener en parallèle du développement.
- **[Marketing] As-tu des cas clients chiffrés exploitables ?** C'est l'élément de conversion le plus puissant pour Fatou, et le plus long à constituer. À démarrer dès le premier client.
- **[Technique] État réel du domaine** — voir la checklist §16, en particulier la vérification de listes noires.
- **[Juridique] Quelle entité facture ?** Statut, mentions légales, conditions d'intervention. Nécessaire avant la première prestation facturée.
- **[Juridique] Droits sur les visuels générés et sur ceux montrés en séance.** Si une marque partage ses produits en séance enregistrée puis publiée, il faut son accord explicite. À cadrer avant la première séance filmée, pas après.

---

## 22. Phasage

- **Phase 0 — Débloquer le domaine.** Vérifier le renouvellement, contrôler les listes noires, repointer les DNS vers Cloudflare, configurer SPF/DKIM/DMARC, tester la délivrabilité. **Rien ne démarre avant.**
- **Phase 1 — Socle capture.** Next.js + D1, modèle de données, une landing kit fonctionnelle avec encart prérequis, formulaire, token signé, livraison `.md` + PDF, email transactionnel, page de remerciement, codes WhatsApp à trois intentions. **Objectif : un lead réel capturé de bout en bout, et un message WhatsApp reçu avec son code.**
- **Phase 2 — Séances.** Page `/seance`, calcul automatique de la prochaine date, inscriptions, gestion des présences en admin, notification. **La séance est une fonctionnalité produit, pas une activité annexe** — elle a besoin de son support technique.
- **Phase 3 — Catalogue et admin.** Gestion des kits par famille sans redéploiement, dashboard leads, résolution de code, scoring, export CSV.
- **Phase 4 — Crédibilité et conversion.** Page « Travailler ensemble », cas clients chiffrés, preuve sociale, réponses types WhatsApp, QR codes.
- **Phase 5 — Contenu et lancement.** 4 kits (2 photo, 2 vidéo), 4 vidéos en ligne, guides PDF, séquences email, mentions légales, ligne WhatsApp opérationnelle, **première séance tenue**.
- **Phase 6 — Mesure et calibrage.** Recalibrage du scoring sur données réelles, analyse de l'écart clic / message reçu, analyse inscription / présence, ajustement des raisons d'écrire.
- **Phase 7 — V2.** Génération d'images, crédits, Cloud API, replays structurés.

**Deux avertissements pour la suite.**

La tentation sera de commencer par le design de l'accueil. La page qui produit des conversations, c'est `/kits/[slug]`. Elle doit être construite, testée et optimisée en premier ; l'accueil peut rester minimal pendant des mois sans coûter un seul lead.

Et la séance hebdomadaire ne doit pas être traitée comme un service après-vente qu'on ajoutera « quand il y aura du monde ». **C'est le moteur de récurrence du dispositif entier** — c'est elle qui fait revenir le lead chaque semaine, gratuitement, de sa propre initiative. Elle se lance dès le premier inscrit, même s'ils ne sont que trois.
