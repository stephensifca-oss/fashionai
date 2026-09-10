# Animation — Page de remerciement  `/merci/[slug]`

Le lead vient de donner son numéro. **Il doit voir ses fichiers immédiatement.** Toute animation sur les boutons de téléchargement est un délai perçu.

| # | Section | Classe | Réglage |
|---|---------|--------|---------|
| 1 | Header | *(aucune)* | — |
| 2 | Confirmation (label, titre, sous-titre) | `.hero-in` | Chargement, 3 enfants |
| 3 | **Les 2 boutons de téléchargement** | `[data-no-motion]` | **Visibles instantanément.** C'est la promesse tenue |
| 4 | Façade tutoriel | `.reveal` | — |
| 5 | Titre « On avance ensemble » | `.reveal` | — |
| 6 | Carte A — séance *(fond noir, dominante)* | `.reveal` | — |
| 7 | Bouton WhatsApp de la carte A | `.wa-button` | N'anime jamais |
| 8 | Cartes B et C — blocage, audit | `.count-in` | 2 enfants, 60 ms |
| 9 | Boutons WhatsApp B et C | `.wa-button` | N'animent jamais |
| 10 | Bloc qualification | `.reveal` sur le bloc | — |
| 11 | Les 6 groupes de questions | `.count-in` | Plafonné à 5 — le 6ᵉ hérite du délai du 5ᵉ |
| 12 | Chips | `pressChip()` | Au clic uniquement, `scale` 0,97 |
| 13 | Boutons Envoyer / Passer | *(hérite)* | — |
| 14 | « À découvrir ensuite » | `.count-in` | Images en `.image-wipe` |
| 15 | Footer | *(aucune)* | — |

## Points de vigilance

**Les trois cartes ne s'animent pas ensemble.** La carte A est seule en `.reveal`, les cartes B et C arrivent en `.count-in` après. Cette hiérarchie de mouvement redouble la hiérarchie visuelle : la séance passe en premier.

**Aucune animation sur les chips au chargement.** Elles réagissent au doigt, elles n'apparaissent pas en cascade — un formulaire qui s'anime pendant qu'on le remplit rend fou.
