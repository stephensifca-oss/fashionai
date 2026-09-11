# Phase 0 — le domaine `fashionai.agency`

**Date :** 11 septembre 2026
**État :** DNS sur Cloudflare, mode Full, certificat en place. **Le domaine répond, mais mal.**
**Référence :** `PRD.md` §16 et P0-22

---

## Ce que j'ai vérifié aujourd'hui

| Vérification | Résultat | Conséquence |
|---|---|---|
| Réponse HTTP de `https://fashionai.agency` | **402 Payment Required** | À corriger avant toute communication — voir §1 |
| Indexation Google du domaine | **Aucune** | Rien à rediriger |
| Archives Wayback | **Aucun instantané** | L'ancien SaaS n'a laissé aucune trace publique |
| Cloudflare | Actif, DNS Full, aucun Worker connecté | Normal, rien n'est encore déployé |

**Deux bonnes nouvelles et un problème.**

Les bonnes nouvelles règlent une question ouverte du PRD : **il n'y a aucun historique à reprendre.** Pas d'URL indexée, pas de page archivée, pas de contenu ancien qui remonterait dans les résultats. La partie « redirection des anciennes URL indexées » de P0-22 devient sans objet. Tu pars d'une page blanche, ce qui est plus simple — et ce qui veut aussi dire qu'aucune autorité SEO n'est héritée : tout se construira à partir de zéro.

---

## 1. URGENT — le domaine sert une erreur 402 au monde entier

`https://fashionai.agency` répond aujourd'hui **402 Payment Required**. L'onglet « Deployment Paused » de ton navigateur désigne probablement la cause : un hébergeur a suspendu un déploiement, et le domaine pointe toujours dessus.

Ce n'est pas neutre. Tant que ça dure :

- Tout visiteur — y compris un prospect à qui tu aurais donné l'adresse — voit une erreur de paiement.
- **Les robots d'indexation aussi.** Un 402 répété apprend à Google que le domaine est cassé, et il faudra du temps pour revenir. C'est le seul point de cette liste qui coûte quelque chose à chaque jour qui passe.
- Un lien partagé sur WhatsApp ou LinkedIn génère un aperçu d'erreur.

**À faire aujourd'hui, dans l'ordre du plus rapide au plus propre :**

1. Identifier la source du 402 — l'onglet « Deployment Paused » dit lequel. Si c'est un ancien hébergement du SaaS, supprime simplement les enregistrements DNS qui pointent vers lui.
2. En attendant le vrai site, sers **une page d'attente** : une Cloudflare Page statique d'une seule page — nom, une phrase, un bouton WhatsApp. Dix minutes de travail, et le domaine cesse d'être cassé.
3. Vérifier que `fashionai.agency` **et** `www.fashionai.agency` répondent tous les deux en 200, avec redirection de l'un vers l'autre.

> Une page d'attente avec un bouton WhatsApp n'est pas du temps perdu : c'est déjà un canal de capture, et elle utilise le même mécanisme de code unique que le site final.

---

## 2. La vérification qui reste à faire, et que je ne peux pas faire à ta place

**La réputation email n'a rien à voir avec l'indexation web.** L'ancien SaaS peut très bien avoir envoyé des milliers d'emails depuis ce domaine sans laisser la moindre trace dans Google. Si le domaine est sur une liste noire, tes emails transactionnels partiront en spam — et P0-10 du PRD exige 98 % de délivrabilité.

**À faire avant de configurer Resend :**

- Passer le domaine **et** l'adresse IP d'envoi dans un vérificateur de listes noires multi-bases (MXToolbox Blacklist Check, ou l'équivalent).
- Vérifier séparément **Spamhaus** — c'est celle qui compte le plus.
- Si le domaine est listé : demander le retrait avant tout envoi. Un premier envoi depuis un domaine listé aggrave la situation au lieu de l'améliorer.

Si le domaine est propre, note-le quelque part avec la date : c'est ta ligne de base.

---

## 3. Les enregistrements DNS — dans le bon ordre

### Maintenant, avant même d'avoir un service d'envoi

Le domaine n'envoie aucun email légitime aujourd'hui. **Verrouille-le.** Un domaine sans SPF ni DMARC est une invitation à l'usurpation, et une campagne de spam usurpant ton nom détruirait la réputation avant même ton premier envoi.

```
Type   Nom                      Valeur
TXT    @                        v=spf1 -all
TXT    _dmarc                   v=DMARC1; p=reject; rua=mailto:stephen.sifca@gmail.com
MX     @                        (aucun — ou null MX : priorité 0, cible ".")
```

Traduction : *ce domaine n'envoie aucun email, rejetez tout ce qui prétend venir de lui, et envoyez-moi les rapports.*

### Ensuite, quand Resend sera en place

Remplacer le SPF et ajouter la clé DKIM fournie par Resend :

```
TXT    @                        v=spf1 include:<valeur fournie par Resend> -all
TXT    <sélecteur>._domainkey   <clé publique fournie par Resend>
TXT    _dmarc                   v=DMARC1; p=reject; rua=mailto:...
```

**Ordre impératif :** publier SPF et DKIM, envoyer un email de test, vérifier que les trois passent, **et seulement ensuite** garder `p=reject`. Si tu laisses `p=reject` en place pendant que Resend n'est pas encore autorisé, tes propres emails seront rejetés.

Un test simple : envoyer à une adresse Gmail, ouvrir « Afficher l'original », et vérifier les trois lignes `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`.

---

## 4. Deux réglages Cloudflare à trancher

### Les robots d'IA

Le réglage actuel est « Block only on pages with ads ». Tu n'as pas de publicité : **il ne bloque donc rien.** C'est un choix par défaut, pas une décision.

Ma recommandation : **ne bloque pas.** Ta cible cherche de plus en plus par assistant interposé, et un site invisible pour les IA est un site qui disparaît d'un canal entier. Tu as besoin d'être trouvé bien plus que de protéger des images qui sont elles-mêmes du marketing.

**La nuance est ailleurs.** Le jour où la galerie contiendra les visuels d'un client, ce n'est pas `robots.txt` qui te protégera — c'est l'accord écrit avec ce client, et ta page « Travailler ensemble » le promet déjà. Le fichier robots est une politesse, pas une protection juridique.

### Le transfert du registrar

Cloudflare propose le transfert du nom de domaine et le facture **au prix coûtant**, sans marge. Le renouvellement du domaine étant ton seul coût récurrent sur ce projet, l'économie est réelle même si elle est modeste.

Conditions habituelles : plus de 60 jours depuis l'enregistrement ou le dernier transfert, et déverrouillage chez le registrar actuel. **Sans urgence** — mais à faire avant la prochaine échéance de renouvellement, pas après.

---

## 5. Search Console

À faire une fois que le domaine répond en 200 :

1. Ajouter une propriété **de type domaine** (pas préfixe d'URL) — elle couvre tous les sous-domaines et les deux protocoles.
2. Valider par enregistrement TXT dans Cloudflare.
3. Soumettre le `sitemap.xml` dès qu'il existe.
4. Surveiller « Couverture » les premières semaines : c'est là que les traces d'un 402 prolongé apparaîtraient.

---

## Ce qui reste de la Phase 0

| # | Action | Bloquant pour |
|---|---|---|
| 1 | **Supprimer le 402** — DNS ou page d'attente | Tout. Chaque jour compte |
| 2 | Vérifier les listes noires, domaine et IP | La configuration Resend |
| 3 | Publier SPF `-all` + DMARC `p=reject` maintenant | Rien — mais protège dès aujourd'hui |
| 4 | Vérifier `www` et l'apex en 200 | Le partage de liens |
| 5 | Search Console en propriété domaine | La mesure |
| 6 | Décider du réglage robots d'IA | Rien d'urgent |
| 7 | Transfert registrar | Prochaine échéance |

**Ce qui n'est plus à faire :** la redirection des anciennes URL indexées. Il n'y en a pas.

Une fois les points 1 à 4 réglés, la Phase 0 est close et la Phase 1 du PRD site peut démarrer.
