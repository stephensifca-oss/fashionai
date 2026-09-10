# Animation — Tableau de bord  `/admin`

Registre entièrement différent. Ce n'est plus une page éditoriale, c'est un **outil**. On le balaie et on l'opère, on ne le lit pas.

**Règle générale : presque aucune animation.** Un tableau de bord qui s'anime à chaque chargement fait perdre du temps à celui qui l'ouvre vingt fois par jour.

| # | Section | Classe | Réglage |
|---|---------|--------|---------|
| 1 | Sidebar | *(aucune)* | — |
| 2 | Titre + bouton export | *(aucune)* | — |
| 3 | Les 5 tuiles de statistiques | `.count-in` | 5 enfants, 60 ms. **Seule animation d'entrée de la page** |
| 4 | Résolveur de code | *(aucune)* | — |
| 5 | Chips de filtre | *(aucune)* | — |
| 6 | Tableau des leads | *(aucune)* | Jamais de cascade sur les lignes |
| 7 | Pagination | *(aucune)* | — |

## Interactions — les seules qui comptent

| Interaction | Traitement |
|---|---|
| Filtrer ou trier | Remplacement instantané, aucune transition |
| Survol d'une ligne | Fond `--rule-2`, 180 ms |
| Résolution d'un code | Fondu court sur le résultat, `--dur-fast` |
| Code introuvable | `shakeField()` sur le champ, une fois |
| Export CSV | `setSubmitting()` sur le bouton — le libellé change, pas de spinner |

## Points de vigilance

**Les pastilles de score n'animent pas.** L'état chaud / tiède / froid est encodé dans la forme — rempli, contour, texte seul — pas dans le mouvement. Un lead chaud qui clignote est une distraction, pas une information.

**Aucune transition de page vers ou depuis l'admin.** On y entre pour travailler.
