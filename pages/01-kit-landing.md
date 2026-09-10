# Animation — Landing d'un kit  `/kits/[slug]`

**Priorité absolue.** C'est la page qui produit les conversations : toute animation qui retarde l'accès au formulaire est une erreur.

| # | Section | Classe | Réglage |
|---|---------|--------|---------|
| 1 | Header | *(aucune)* | Toujours visible, jamais animé |
| 2 | Bloc titre du kit (tag, H1, chapô, méta) | `.hero-in` | Chargement, décalage 80 ms, 4 enfants |
| 3 | Image hero pleine largeur | `.hero-image` | Dévoilement bas → haut, délai 200 ms |
| 4 | Légende sous l'image | `.reveal` | — |
| 5 | Façade vidéo | `.reveal` | L'iframe est injectée au clic via `mountVideo()` |
| 6 | Titre « Ce que ça donne » | `.reveal` | — |
| 7 | Les 3 paires avant/après | `.count-in` | 3 enfants, décalage 60 ms, chaque image en `.image-wipe` |
| 8 | Titre « Ce que vous obtenez » | `.reveal` | — |
| 9 | Les 3 lignes de livrables | `.count-in` | 3 enfants |
| 10 | Filets entre les lignes | `.rule-draw` | Tracé gauche → droite |
| 11 | **Encart prérequis** | `.reveal` | Rien de plus. Il doit se lire, pas se remarquer |
| 12 | **Formulaire** | `.reveal` sur le bloc entier | **Jamais sur les champs individuels.** Un champ qui apparaît pendant qu'on tape est une catastrophe |
| 13 | Bouton « Télécharger le kit » | *(hérite du bloc)* | — |
| 14 | Bandeau assistance | `.reveal` | — |
| 15 | **Bouton WhatsApp** | `.wa-button` | **N'anime jamais.** Pleine opacité dès le rendu |
| 16 | Footer | *(aucune)* | — |

## Points de vigilance

**Le formulaire est le point d'arrivée.** Si un visiteur scrolle vite, il doit le trouver déjà en place. La plage d'animation `entry 5%` garantit que le bloc est complet bien avant d'être au centre de l'écran.

**Les paires avant/après sont le cœur de la preuve.** Le dévoilement `.image-wipe` compte ici plus qu'ailleurs : c'est le geste qui fait ressembler la page à un magazine plutôt qu'à un site.

**Desktop :** le formulaire est en colonne collante. Il s'anime **une seule fois** au premier passage, jamais à chaque changement de position collante.
