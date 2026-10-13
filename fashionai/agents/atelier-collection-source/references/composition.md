# Composition par Python — étapes 5 et 6

Charger `scripts/atelier_tools.py` dans l'outil Python (`exec(open(chemin).read())`). Tous les fichiers sources doivent être dans `/mnt/data` ; sinon demander au créateur de les redéposer. Sorties PNG haute définition + PDF, proposées en téléchargement.

## Polices

Pas d'Internet dans l'environnement Python. `trouve_police()` cherche un .ttf déposé par le créateur, puis DejaVu ou Liberation. Vérifier chaque glyphe (★, accents, tirets) : un caractère absent s'affiche en carré, le remplacer. Deux familles au plus : serif d'affichage pour les titres, sans-serif légère pour les descriptions.

## 5a. Line-up réaliste — `lineup()`

- Panneaux : la vue de FACE (panneau A, obtenue par `decoupe_proto`) de chaque prototype, dans l'ordre du plan, même hauteur, gouttières de 8 px blanc cassé.
- Groupes : si la collection a des variantes d'ADN, regrouper les looks par variante, séparateur plus large.
- Médaillons : en bas à gauche de chaque panneau, un cercle ≈ 28 % de la largeur du panneau, liseré blanc de 6 px, légère ombre, contenant la **tuile ADN** du look (recadrée dans `ref_adn` ou dans un gros plan du prototype), jamais un détail inventé.
- Bandeau : aplat dans une couleur foncée de la palette ; titre en capitales et une ligne de description en blanc ou écru ; sous chaque panneau « LOOK 0n — NOM » et une ligne de légende.
- Au-delà de 6 looks : une planche par groupe ou par bande de 4.

## 5b. Planches prototypes — `bandeau()` et `cote_a_cote()`

Bandeau écru sous chaque prototype : nom du look en capitales serif espacées, une ligne de description, un filet fin. Présentation deux par deux côte à côte, look impair à gauche.

## 6. Lookbook-planche — composée, jamais régénérée

Paysage 3:2, fond papier clair, marges régulières. Un modèle d'image ferait dériver les looks et déformerait le texte : on compose.

| Zone | Contenu | Source |
|---|---|---|
| Colonne gauche ≈ 24 % | Marque et collection, **titre** en grande serif, accroche, CONCEPT, MUSE, DÉCOR, LA CAPSULE (chiffres clés, constante) | Fiche Collection |
| Bandeau haut, au centre | 4 à 6 tuiles d'univers | Moodboard découpé, fonds des prototypes |
| Haut droite | PALETTE : pastilles + nom + hex + rôle, une pastille par imprimé | Palette (aplats dessinés), `ref_I*` |
| Centre | Looks en pied (panneaux A), LOOK 0n, nom, 3 lignes de récit, 4 lignes techniques, médaillon macro | Prototypes, fiches, tuiles ADN |
| Bande basse | MATIÈRES · ADN · ACCESSOIRES · BEAUTÉ (tuiles + noms) | `ref_adn`, `ref_I*`, gros plans, recadrages |

Titres de rubrique en petites capitales espacées. Vérifier que rien ne déborde du cadre et relire chaque texte avant export. Toute retouche d'un prototype validé rend la planche fausse : le signaler et proposer de recomposer.

Si l'exécution de code est indisponible : donner l'ordre, les dimensions et les textes exacts pour un montage dans Canva ou PowerPoint.
