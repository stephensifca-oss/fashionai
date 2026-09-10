# Animation — Accueil  `/`

Rappel de son rôle : l'accueil **n'est pas la porte d'entrée du site**. La majorité du trafic arrive directement sur une landing kit. L'accueil sert d'aiguillage et de contrôle de crédibilité — souvent consulté *après* le téléchargement, juste avant la décision d'écrire.

Conséquence pour le mouvement : **il doit convaincre vite, pas impressionner.**

| # | Section | Classe | Réglage |
|---|---------|--------|---------|
| 1 | Header | *(aucune)* | — |
| 2 | Hero — label, H1, chapô, 2 boutons | `.hero-in` | Chargement, 4 enfants, 80 ms |
| 3 | Image hero pleine largeur | `.hero-image` | Dévoilement, délai 200 ms |
| 4 | Légende de l'image | `.reveal` | — |
| 5 | Bloc « Kits Photo » | `.reveal` + image en `.image-wipe` | — |
| 6 | Filet de séparation | `.rule-draw` | — |
| 7 | Bloc « Kits Vidéo » | `.reveal` + image en `.image-wipe` | — |
| 8 | Label « Commencer ici » | `.reveal` | — |
| 9 | Les 3 kits en avant | `.count-in` | 3 enfants, images en `.image-wipe` |
| 10 | Lien « Voir les 6 kits » | *(hérite)* | — |
| 11 | Bandeau séance | `.reveal` | — |
| 12 | **Bouton WhatsApp** | `.wa-button` | N'anime jamais |
| 13 | Preuve — 3 paires avant/après | `.count-in` | Images en `.image-wipe` |
| 14 | Footer | *(aucune)* | — |

## Points de vigilance

**Le hero n'est pas un diaporama et ne le devient jamais.** Le texte arrive avant l'image — inversion délibérée par rapport à un portfolio de photographe, où l'image parle seule. Ici, il y a quelque chose à dire.

**Les deux familles reçoivent un traitement rigoureusement identique.** Aucune ne doit paraître plus importante que l'autre : Photo capte la demande exprimée, Vidéo porte la différenciation.

**L'indicateur de cette page n'est pas le taux de conversion, c'est le taux de clic vers une landing kit.** Toute animation qui allonge le trajet vers les trois kits en avant travaille contre elle.
