# Animation — La séance hebdomadaire  `/seance`

La date est le plus gros élément de l'écran. Elle doit **frapper**, pas se construire.

| # | Section | Classe | Réglage |
|---|---------|--------|---------|
| 1 | Header | *(aucune)* | — |
| 2 | Label « PROCHAINE SÉANCE » | `.hero-in` enfant 1 | — |
| 3 | **La date en très grand** | `.hero-in` enfant 2 | Fondu-montée. **Aucun compteur animé** — un chiffre qui défile est un gadget |
| 4 | Horaire | `.hero-in` enfant 3 | — |
| 5 | **Bouton WhatsApp d'inscription** | `.wa-button` | **N'anime jamais.** C'est l'action de la page entière |
| 6 | Mention gratuite / 1 h / en ligne | `.hero-in` enfant 4 | — |
| 7 | Titre « Comment ça se passe » | `.reveal` | — |
| 8 | Les 4 étapes numérotées | `.count-in` | 4 enfants, 60 ms. **Le décalage est justifié ici** : c'est une vraie séquence |
| 9 | Filets entre les étapes | `.rule-draw` | — |
| 10 | Encart « la semaine dernière » | `.reveal` | — |
| 11 | Titre « Les séances précédentes » | `.reveal` | — |
| 12 | Lignes de replays | `.count-in` | Plafonné à 5 |
| 13 | Footer | *(aucune)* | — |

## Points de vigilance

**Le décalage sur les 4 étapes est le seul du site qui encode une information.** Ailleurs, `.count-in` est décoratif ; ici, l'ordre d'apparition dit l'ordre chronologique. C'est ce qui justifie la numérotation 01–04.

**La date se met à jour par `updateSessionDate()`**, calculée sur `Africa/Abidjan`. Le texte se remplace en fondu court — il ne défile pas.

**Si la séance est reportée**, l'affichage change de contenu sans changer d'animation. Un état exceptionnel ne mérite pas un traitement visuel exceptionnel.
