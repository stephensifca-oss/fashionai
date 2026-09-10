# Animation — Catalogue  `/kits`

Une page de parcours. Le visiteur balaie, il ne lit pas. Le mouvement doit accompagner le défilement, jamais le retenir.

| # | Section | Classe | Réglage |
|---|---------|--------|---------|
| 1 | Header | *(aucune)* | — |
| 2 | Titre de page (label, H1, chapô) | `.hero-in` | Chargement, 3 enfants |
| 3 | Chips de filtre | `.reveal` sur la rangée | Jamais chip par chip |
| 4 | Filet sous les filtres | `.rule-draw` | — |
| 5 | **Chaque carte de kit** | `.reveal` | Une par une, au fil du défilement |
| 6 | Image de chaque carte | `.image-wipe` | Le geste qui porte toute la page |
| 7 | Filet entre les cartes | `.rule-draw` | — |
| 8 | Bandeau séance | `.reveal` | — |
| 9 | Bouton WhatsApp | `.wa-button` | N'anime jamais |
| 10 | Footer | *(aucune)* | — |

## Points de vigilance

**Pas de `.count-in` sur la grille.** Sur desktop en 3 colonnes, un décalage donnerait une cascade en diagonale — effet de vitrine e-commerce, exactement le registre à éviter. Chaque carte se révèle indépendamment, quand elle entre dans le champ.

**Le filtrage est instantané.** Quand on bascule de Tous à Vidéo, les cartes **ne rejouent pas** leur animation d'entrée : elles apparaissent, point. Une grille qui se re-anime à chaque clic de filtre est insupportable au troisième clic.

**Les deux familles ne reçoivent aucun traitement de mouvement distinct.** Elles se différencient par la pastille et rien d'autre — le site reste une seule maison.
