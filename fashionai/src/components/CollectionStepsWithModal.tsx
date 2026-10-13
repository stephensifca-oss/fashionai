"use client";

import { useState, useEffect, useCallback } from "react";

export interface StepIllustration {
  id: string;
  titre: string;
  src: string;
  aspectRatio?: string;
  bgMode?: "dark" | "light";
  badge?: string;
  description: string;
  casesDetail?: { label: string; desc: string }[];
}

export interface StepItem {
  num: string;
  titre: string;
  sousTitre: string;
  explicationGenerale: string;
  ceQueVousObtenez: string[];
  livrableCourt: string;
  imageCard: string;
  imageCardFit?: "cover" | "contain";
  badgeCard?: string;
  isMasterStep?: boolean;
  roleAgent: string;
  resume: string;
  entrees: string[];
  livrables: string[];
  verrousRegles: string[];
  illustrations: StepIllustration[];
}

export const ETAPES_COLLECTION: StepItem[] = [
  {
    num: "01",
    titre: "Univers & ADN",
    sousTitre: "Cadrage du concept, palette, matières et éléments signatures",
    explicationGenerale: "À partir de votre thème, de vos inspirations et de vos tissus, le skill définit l'identité visuelle de votre collection : il extrait la palette de couleurs officielle, sélectionne les matières et verrouille 3 à 5 détails signatures (ADN) qui feront la force de vos créations.",
    ceQueVousObtenez: [
      "Fiche Collection officielle (concept, palette hex certifiée, nomenclature)",
      "Moodboard d'ambiance 1:1 (atmosphère, lumière et décor)",
      "Planche Kit matières & ADN 1:1 (tissus à plat et détails signatures)",
      "Fiche Muse officielle (morphologie et visage de votre mannequin)"
    ],
    livrableCourt: "Fiche Collection + 2 Planches 1:1 (Univers & Kit Matières / ADN)",
    imageCard: "/etape-01-planche-univers.webp",
    badgeCard: "2 PLANCHES INCLUSES",
    roleAgent: "Directeur Artistique & Gardien de l'ADN : Il verrouille le concept, extrait la palette hex certifiée et les gestes de construction avant toute ébauche de silhouette. Il ne génère jamais d'image au hasard.",
    resume: "À partir de vos inspirations, de croquis préliminaires ou de photos de tissus à plat, l'agent extrait un concept fort, une palette hiérarchisée (5 à 8 hex), une carte des matières et 3 à 5 éléments signatures (ADN). Il compose deux planches 1:1 sans texte qui serviront de références intangibles tout au long de la création.",
    entrees: [
      "Thème, saison, occasion ou intention stylistique du créateur",
      "Photos de tissus à plat (wax, lin, crêpe, soies, broderies)",
      "Planche de votre muse ou persona cliente cible",
      "Références visuelles d’ambiances, de volumes ou de textures"
    ],
    livrables: [
      "Fiche Collection v1 (fiche_collection_v1.md) : brief, intention, palette hex certifiée, nomenclature matière",
      "Planche 01 · Univers & Moodboard (1:1) : 9 cases synthétisant l'atmosphère, la lumière et le décor",
      "Planche 02 · Kit Matières & ADN (1:1) : grille 3×3 sans texte isolant l'imprimé, les gestes signatures et les matières macro",
      "Fichiers maîtres découpés par code Python : ref_muse, ref_I1, ref_matieres, ref_adn"
    ],
    verrousRegles: [
      "Maximum 3 questions à la fois avec propositions concrètes et choix recommandé ★",
      "Règle d'ouverture millimétrée : tout pli ou fente révélant un imprimé a une hauteur maximale (« never above [repère] »)",
      "Le moodboard n'est JAMAIS joint aux prompts de silhouettes (évite toute pollution graphique)",
      "Zéro texte généré dans les images : les cartouches et médaillons sont appliqués par code"
    ],
    illustrations: [
      {
        id: "univers",
        titre: "Planche 01 · Univers & Moodboard (Format 1:1)",
        src: "/etape-01-planche-univers.webp",
        aspectRatio: "aspect-square",
        badge: "ATMOSPHÈRE & LUMIÈRE",
        description: "Grille 3×3 d'atmosphère et de lumière : lagune Ébrié au couchant (Abidjan), lin écru texturé, ombres portées de palmes, éventail tressé artisanal, céramiques en terre cuite et terracotta, horizon nocturne et crêpe bleu nuit rehaussé d'un bouton de laiton brossé.",
        casesDetail: [
          { label: "Lagune au Couchant", desc: "Abidjan, lumière dorée de 17h, ponton de bois sur l'eau calme." },
          { label: "Lin Écru Texturé", desc: "Matière principale diurne, tombé lourd, respirant et naturel." },
          { label: "Ombre de Palmes", desc: "Jeu de lumière rasante et contraste chaud sur mur ocre chaulé." },
          { label: "Éventail Tressé", desc: "Inspiration géométrique du geste signature de l'éventail à 7 plis." },
          { label: "Céramiques & Ocre", desc: "Terre cuite et motifs circulaires repris dans les médaillons brodés." },
          { label: "Lumière Crépusculaire", desc: "Transition entre la capsule de jour et les pièces du soir." },
          { label: "Organza Solaire", desc: "Voile translucide doré apportant légèreté, volume et transparence." },
          { label: "Lagune Nocturne", desc: "Bleu nuit profond (#0C1021) de la ville illuminée au bord de l'eau." },
          { label: "Crêpe Nuit & Laiton", desc: "Bouton dôme en laiton brossé sur crêpe bleu nuit texturé." }
        ]
      },
      {
        id: "kit",
        titre: "Planche 02 · Kit Matières & Éléments Signatures (Format 1:1)",
        src: "/etape-01-planche-kit.webp",
        aspectRatio: "aspect-square",
        badge: "ADN & TEXTILES RÉELS",
        description: "Grille 3×3 technique sans texte : l'éventail signature à 7 plis en lin écru ouvrant sur le wax, la déclinaison sur crêpe bleu nuit, le médaillon circulaire brodé, les ruches d'organza, le bouton laiton à boutonnière artisanale, les plis couteau et les macros de matières réelles.",
        casesDetail: [
          { label: "Éventail Lin & Wax", desc: "Geste signature D1 : 7 plis s'ouvrant sur l'imprimé wax Éventails." },
          { label: "Éventail Nuit & Wax", desc: "Déclinaison soir sur crêpe bleu nuit avec doublure contrastée." },
          { label: "Médaillon Circulaire", desc: "Élément signature D2 : application textile brodée au point sellier." },
          { label: "Ruches Organza", desc: "Volants plissés étagés en organza mordoré pour manches et col." },
          { label: "Bouton Laiton & Boutonnière", desc: "Boutonnière passepoilée en lin et bouton laiton antique." },
          { label: "Plis Couteau", desc: "Plissé rigoureux assurant la dynamique des jupes et pantalons." },
          { label: "Lin Écru Macro", desc: "Gros plan textural sans retouche pour la bibliothèque de rendu." },
          { label: "Crêpe Nuit Macro", desc: "Texture dense à faible reflet pour les tenues de cocktail." },
          { label: "Organza sur Lin", desc: "Superposition matière créant les jeux d'opacité et de translucidité." }
        ]
      }
    ]
  },
  {
    num: "02",
    titre: "Plan & Line-up 2D",
    sousTitre: "Pyramide de collection et figurines couleur côte à côte",
    explicationGenerale: "Le skill équilibre la structure de votre collection (nombre de looks, robes, vestes, ensembles) et génère une vue d'ensemble de toutes vos silhouettes alignées de face en figurines 2D couleur pour valider le rythme et les proportions avant toute photo.",
    ceQueVousObtenez: [
      "Plan de collection hiérarchisé (catégories, longueurs, volumes)",
      "Désignation du Look Fondateur ★ (la silhouette maîtresse de la collection)",
      "Line-up 2D panoramique (toutes vos tenues dessinées côte à côte en couleur)"
    ],
    livrableCourt: "Plan hiérarchisé + Bandeau 2D des 5 figurines alignées (3:2)",
    imageCard: "/etape-02-lineup-2d.webp",
    badgeCard: "FIGURINES 2D COULEUR (3:2)",
    roleAgent: "Directeur de Collection & Équilibriste : Il structure l'offre (capsule 2 à 6 looks, collection 8 à 12 looks), fixe la pyramide de collection et désigne le Look Fondateur.",
    resume: "Avant d'engager le moindre prototype photo ou 3D, l'agent dispose l'ensemble des figurines couleur de face sur une seule bande panoramique 3:2. Cette vue permet de juger immédiatement du rythme, des longueurs, des volumes et de la répartition des matières (lin écru, organza solaire, crêpe bleu nuit et wax Éventails).",
    entrees: [
      "Validation de la Fiche Collection v1",
      "Nombre de looks visé (capsule, filière école ou collection complète)",
      "Répartition souhaitée : tops, pantalons, vestes, robes courtes/longues"
    ],
    livrables: [
      "Plan de Collection hiérarchisé : pyramide 50 % commercial, 30 % fort, 20 % spectaculaire",
      "Désignation du Look Fondateur ★ (la silhouette portant le maximum d'ADN)",
      "Line-up 2D en bande 3:2 : figurines couleur sans visage pour valider le rythme global",
      "Attribution des paires de travail pour la confection des fiches techniques"
    ],
    verrousRegles: [
      "Ordre strict : interdiction de dessiner les fiches tant que le line-up n'est pas équilibré",
      "Le look fondateur est toujours travaillé en premier pour verrouiller le cadre",
      "Pas de doublon de silhouette : chaque look a sa propre fonction dans la collection"
    ],
    illustrations: [
      {
        id: "lineup2d",
        titre: "Line-up 2D des figurines couleur de face — Collection Couchant (Format 3:2)",
        src: "/etape-02-lineup-2d.webp",
        aspectRatio: "aspect-[3/2]",
        badge: "HARMONIE DES 5 SILHOUETTES",
        description: "Bandeau panoramique des 5 looks de la capsule Couchant présentés en figurines couleur sans visage : Look 01 (Brise · robe lin à fente wax), Look 02 (Ponton · palazzo lin & crop top asymétrique), Look 03 (Entre-Deux · robe kimono lin bordée d'organza solaire, Look Fondateur ★), Look 04 (Lagune Nocturne · fourreau asymétrique bleu nuit à fente wax) et Look 05 (Dernier Rayon · robe de gala sirène avec drapé d'organza cascade).",
        casesDetail: [
          { label: "Look 01 · Brise", desc: "Robe mi-longue lin écru, manches kimono, médaillon brodé poitrine et fente éventail wax 7 plis." },
          { label: "Look 02 · Ponton", desc: "Crop top asymétrique monobretelle wax Éventails et pantalon palazzo taille haute à fentes plissées." },
          { label: "Look 03 · Entre-Deux ★", desc: "Look Fondateur : robe kimono longue lin écru, col châle dégradé organza solaire, médaillon taille et fente wax." },
          { label: "Look 04 · Lagune Nocturne", desc: "Robe fourreau asymétrique bleu nuit monobretelle, bouton laiton épaule et fente haute sur wax sombre." },
          { label: "Look 05 · Dernier Rayon", desc: "Robe bustier sirène bleu nuit, drapé plissé d'organza solaire en cascade sur le buste et double godet wax." }
        ]
      }
    ]
  },
  {
    num: "03",
    titre: "Fiches Techniques & Dessins à Plat",
    sousTitre: "Fiches de construction en cm et dessins vectoriels face/dos",
    explicationGenerale: "Le skill rédige pour chaque silhouette une fiche de construction avec mesures exactes et fait générer les dessins techniques à plat en couleur (Face + Dos). C'est cette fiche qui fixe la coupe définitive du vêtement pour l'atelier.",
    ceQueVousObtenez: [
      "Fiche technique détaillée par tenue (mesures en cm, zones de tissus, fermetures)",
      "Dessins à plat couleur Face + Dos (présentés par paires de silhouettes)",
      "Sélection des 3 gros plans macro indispensables sur chaque tenue"
    ],
    livrableCourt: "Fiche technique par look + Dessin à plat couleur par paire (3:2)",
    imageCard: "/etape-03-dessin-plat.webp",
    imageCardFit: "contain",
    badgeCard: "DESSINS À PLAT FACE & DOS (3:2)",
    roleAgent: "Modéliste & Chef d'Atelier : Il traduit chaque silhouette en cotes réelles sur base 38 normalisée, impose la nomenclature des coutures et fige les dessins à plat face et dos.",
    resume: "Chaque tenue fait l'objet d'une fiche technique complète avec mesures en cm (tour de poitrine, taille, hanches, longueurs en triple ancrage) et dessin vectoriel couleur Face + Dos. Les planches regroupent les tenues par paires de style (ici la paire Soir : Looks 04 et 05) pour verrouiller l'exactitude des découpes, la position des zips invisibles et l'implantation des signatures ADN avant tout prototype.",
    entrees: [
      "Validation du Line-up 2D des 5 figurines (Étape 02)",
      "Détails de construction par zone (matières, doublures, thermocollants, finitions)",
      "Emplacement et type de fermeture (zip invisible dos, boutonnage laiton, fentes)"
    ],
    livrables: [
      "Fiche Technique Markdown par look (L[n]_fiche_v1.md) avec cotation base 38",
      "Dessins à plat couleur Face + Dos par paires de 2 looks (format 3:2 / 16:9)",
      "Définition des 3 gros plans macro obligatoires (G1 détail, G2 matière, G3 finition)",
      "Gabarits techniques de découpe et de placement de l'imprimé wax"
    ],
    verrousRegles: [
      "La fiche technique fait loi sur la forme : le prototype photo devra s'y soumettre",
      "Toute modification de forme rend le dessin faux : redessin avant toute photo",
      "Les fiches de tous les looks sont validées avant de déclencher le premier prototype"
    ],
    illustrations: [
      {
        id: "dessins-plat",
        titre: "Planche Technique Dessins à Plat Face & Dos — Paire Soir (Looks 04 & 05)",
        src: "/etape-03-dessin-plat.webp",
        aspectRatio: "aspect-[16/9]",
        bgMode: "light",
        badge: "PAIRE SOIR · FACE & DOS NORMALISÉS",
        description: "Planche technique d'atelier couleur normalisée : chaque tenue est présentée en double vue Face + Dos sur mannequin neutre pour valider l'exactitude des découpes, les fermetures zippées invisibles, les asymétries et le positionnement des éléments d'ADN (wax, organza solaire, boutons laiton, médaillons brodés).",
        casesDetail: [
          { label: "Look 05 · Face", desc: "Bustier sirène bleu nuit (#0C1021), découpes princesse, drapé d'organza solaire plissé en bandeau plongeant et double godet wax éventail." },
          { label: "Look 05 · Dos", desc: "Ligne dos nu zippée invisible, ruban vertical et médaillon brodé circulaire wax placé au creux des reins." },
          { label: "Look 04 · Face", desc: "Fourreau asymétrique monobretelle, bouton dôme laiton brossé avec pendentif vertical bijou et fente haute sur wax." },
          { label: "Look 04 · Dos", desc: "Bretelle dorsale diagonale avec rappel du bouton laiton et pinces de cambrure cintrées jusqu'à l'ourlet." },
          { label: "Cotations Base 38", desc: "Mesures d'atelier strictes : tour de poitrine 88 cm, taille 70 cm, hanches 96 cm, stature 168 cm, tombé au sol." },
          { label: "Verrouillage Atelier", desc: "Spécification géométrique contractuelle : aucun prototype photographique ne peut dévier de ces patrons." }
        ]
      }
    ]
  },
  {
    num: "04",
    titre: "Prototypes Portés",
    sousTitre: "Une image 3:2 par look : Face + Dos en pied + 3 gros plans",
    explicationGenerale: "Le skill génère pour chaque look une photo de mode ultra-réaliste réunissant votre muse dans le décor officiel. Chaque image présente la silhouette sous tous les angles : en pied de face, en pied de dos et en 3 gros plans macro de détails.",
    ceQueVousObtenez: [
      "Planche photo complète par look (Face en pied + Dos en pied + 3 macros)",
      "Contrôle de conformité strict (respect absolu de la coupe et des matières)",
      "Cohérence totale de la muse, de la lumière et du décor d'une photo à l'autre"
    ],
    livrableCourt: "Planche prototype 3 panneaux par look (Face, Dos, 3 macros)",
    imageCard: "/etape-04-prototype.webp",
    badgeCard: "PLANCHE 3 PANNEAUX (3:2)",
    roleAgent: "Directeur de Casting & Chef Opérateur : Il contrôle la conformité du tombé, de la carnation de la muse, de la lumière et vérifie le rendu panneau par panneau.",
    resume: "Chaque look est capturé sur une planche normalisée en 3 panneaux : Panneau A (vue face en pied, 35% de largeur), Panneau B (vue dos en pied, 35%), Colonne C (3 macros empilées de même hauteur, 30%). Cette disposition rigoureuse permet l'extraction automatisée par script.",
    entrees: [
      "Fichiers maîtres du look : dessin à plat validé (L[n]_plat), imprimé (ref_I1), détails (L[n]_details), muse (ref_muse)",
      "Prototype du look fondateur validé servant de référence de cadre"
    ],
    livrables: [
      "Une planche prototype 3:2 par look avec fines gouttières de séparation",
      "Contrôle qualité systématique sur 5 critères (cadrage, face, dos, macros, cohérence)",
      "Remplacement chirurgical de panneau défectueux par script Python si besoin"
    ],
    verrousRegles: [
      "Le prototype fondateur est validé en premier pour figer le décor, l'éclairage et la muse",
      "Le prototype fait loi sur le rendu visuel, jamais sur la forme (qui appartient à la fiche)",
      "Dans A et B, tête aux semelles intégrales : pieds et sol dans les 8 % inférieurs"
    ],
    illustrations: [
      {
        id: "prototype-mode",
        titre: "Planche Prototype Porté — Look 05 (Dernier Rayon) au coucher de soleil",
        src: "/etape-04-prototype.webp",
        aspectRatio: "aspect-[16/9]",
        badge: "35% FACE · 35% DOS · 30% MACROS",
        description: "Planche prototype contractuelle 3 panneaux au ratio 3:2 : Panneau A (35% gauche : muse de face en pied sur le ponton dans la lumière dorée du couchant), Panneau B (35% centre : muse de dos en pied avec dos nu et médaillon brodé circulaire), Colonne C (30% droite : 3 macros empilées de même hauteur — G1 drapé organza sur bustier, G2 fente godet wax plissé à 7 plis, G3 bouton laiton et broderie point sellier).",
        casesDetail: [
          { label: "Panneau A · Face en pied (35%)", desc: "Muse dans la lumière dorée crépusculaire, robe sirène bleu nuit (#0C1021) avec bandeau d'organza solaire et double godet wax plissé." },
          { label: "Panneau B · Dos en pied (35%)", desc: "Vue arrière complète : dos nu, fermeture invisible, bouton laiton dôme et médaillon circulaire brodé au creux des reins." },
          { label: "Macro G1 · Buste & Organza", desc: "Gros plan zénithal sur le drapé plissé d'organza solaire mordoré et la carnation naturelle de la muse." },
          { label: "Macro G2 · Godet Wax Plissé", desc: "Gros plan inférieur sur les 7 plis ouverts du godet dévoilant l'imprimé wax Éventails au ras du sol." },
          { label: "Macro G3 · Médaillon & Bouton", desc: "Gros plan macro sur la boutonnière d'atelier, le bouton laiton brossé et le médaillon textile brodé au point sellier." },
          { label: "Contrôle Qualité IA", desc: "Zéro altération morphologique : le décor, la lumière et la muse sont verrouillés pour toute la collection." }
        ]
      }
    ]
  },
  {
    num: "05",
    titre: "Line-up Réaliste",
    sousTitre: "Extraction des vues face assemblées par code avec médaillons ADN",
    explicationGenerale: "Le skill découpe par programmation les vues de face de chaque mannequin réel et les assemble sur une même ligne d'horizon, sans régénération IA pour éviter toute déformation, puis y intègre les médaillons d'ADN et les légendes d'atelier.",
    ceQueVousObtenez: [
      "Line-up réaliste panoramique (tous vos mannequins réels sur le même sol)",
      "Médaillons signatures circulaires incrustés sur chaque silhouette",
      "Planches individuelles de présentation avec typographie et cartouche d'atelier"
    ],
    livrableCourt: "Line-up panoramique des 5 mannequins réels sur même horizon",
    imageCard: "/etape-05-lineup-realiste.webp",
    badgeCard: "LINE-UP 5 LOOKS (PANORAMIQUE)",
    roleAgent: "Ingénieur d'Édition : Il découpe les vues face des prototypes avec Python, aligne les mannequins sur une même ligne d'horizon et applique les médaillons ADN circulaires.",
    resume: "Tous les mannequins photographiés sont rassemblés sur une même planche d'alignement panoramique (Soleil Couchant · 5 Looks de l'heure dorée à la nuit). Aucune IA générative n'intervient à ce stade : l'assemblage est 100 % déterministe par code Python pour préserver strictement les échelles, les carnations, l'alignement sur le sol et incruster les médaillons ADN circulaires.",
    entrees: [
      "Vues de face validées issues des planches prototypes de chaque look (Étape 04)",
      "Tuiles d'ADN et de matières extraites du kit de l'étape 1",
      "Charte typographique d'atelier pour le titrage et la numérotation"
    ],
    livrables: [
      "Line-up panoramique officiel complet : les 5 silhouettes portées côte à côte",
      "Médaillons ADN circulaires superposés par code avec contour sellier",
      "Bandeau de titrage, double capsule (Le Jour en lin / La Nuit en crêpe) et nomenclature"
    ],
    verrousRegles: [
      "Zéro génération IA pour l'assemblage : tout est composé par script Python",
      "Échelle morphologique rigoureusement identique d'une silhouette à l'autre",
      "Élimine tout risque de dérive de carnation ou de changement de décor"
    ],
    illustrations: [
      {
        id: "lineup-panoramique",
        titre: "Line-up Panoramique Officiel — Soleil Couchant (5 Looks de face)",
        src: "/etape-05-lineup-realiste.webp",
        aspectRatio: "aspect-[21/10]",
        badge: "SOLEIL COUCHANT · 5 LOOKS",
        description: "Bandeau panoramique officiel réunissant les 5 silhouettes réelles alignées sur le même ponton face à la baie d'Abidjan au coucher de soleil. La collection est articulée en 2 capsules complémentaires : Le Jour (lin écru & wax Éventails) et La Nuit (crêpe bleu nuit & wax Calebasses), chacune rehaussée de ses médaillons ADN circulaires incrustés par script.",
        casesDetail: [
          { label: "Look 01 · Brise", desc: "Robe-croisée en lin écru, manches chauve-souris, fente wax plissée à 7 plis et médaillon macro textile circulaire." },
          { label: "Look 02 · Ponton", desc: "Top bustier une épaule imprimé wax & pantalon palazzo lin à fentes plissées avec macro éventail." },
          { label: "Look 03 · Entre-Deux ★", desc: "Look Fondateur : robe portefeuille col V bordé d'organza solaire, médaillon brodé hanche et fente wax." },
          { label: "Look 04 · Lagune Nocturne", desc: "Fourreau asymétrique bleu nuit monobretelle avec bouton laiton épaule et fente haute sur wax." },
          { label: "Look 05 · Dernier Rayon", desc: "Bustier sirène bleu nuit avec organza solaire plissé drapé sur le buste et double godet wax plissé." },
          { label: "Capsules Jour & Nuit", desc: "Progression chromatique et stylistique : transition de l'heure dorée à la nuit sans rupture d'horizon." }
        ]
      },
      {
        id: "lineup-table",
        titre: "Line-up Réaliste en situation d'atelier (tablette & échantillons)",
        src: "/atelier-collection-slide-table.webp",
        aspectRatio: "aspect-[16/10]",
        badge: "VÉRIFICATION D'ATELIER",
        description: "Le line-up réaliste final présenté sur la tablette du styliste dans l'atelier, confronté directement aux bobines, échantillons de tissus réels et croquis de coupe.",
        casesDetail: [
          { label: "Confrontation Matières", desc: "Vérification directe avec les coupons de wax, lin et crêpe avant validation." },
          { label: "Cohérence Lumière", desc: "Même muse, même lumière crépusculaire douce, même palette hex certifiée." },
          { label: "Échelle Métrique", desc: "Hauteur de silhouette et ligne de sol rigoureusement constantes par script." }
        ]
      }
    ]
  },
  {
    num: "06",
    titre: "Lookbook-Planche",
    sousTitre: "Dossier de synthèse haute définition prêt pour acheteurs et presse",
    explicationGenerale: "Le skill assemble l'ensemble de votre collection en une planche éditoriale haute définition résumant l'univers, la palette, les matières et le défilé des silhouettes, prête à être présentée aux acheteurs, à la presse ou à un jury.",
    ceQueVousObtenez: [
      "Planche Lookbook officielle grand format (format 3:2 haute résolution)",
      "Dossier éditorial complet (titre, intention, palette, tissus réels et looks)",
      "Fichier PDF prêt pour impression grand format ou projection"
    ],
    livrableCourt: "Planche Lookbook 3:2 haute résolution (PNG + PDF imprimable)",
    imageCard: "/atelier-collection-lookbook-planche.webp",
    badgeCard: "DOSSIER FINAL LIVRÉ",
    roleAgent: "Directeur de Publication : Il compile l'ensemble des éléments validés en une composition éditoriale de prestige prête à être imprimée ou projetée.",
    resume: "Le livrable ultime de l'Atelier Collection : une planche de synthèse 3:2 haute définition réunissant le titre de collection, le concept poétique, la suite ordonnée des silhouettes, la palette hex certifiée, les échantillons réels et les accessoires.",
    entrees: [
      "Fiche collection validée (titre, intention, citation, muse)",
      "Line-up réaliste final et tuiles de matières / univers"
    ],
    livrables: [
      "Lookbook-Planche de synthèse au format 3:2 haute définition (PNG 300 dpi)",
      "Fichier PDF prêt pour l'impression, la projection ou l'envoi aux acheteurs",
      "Pack complet de reprise zippé (pack_collection_vN.zip)"
    ],
    verrousRegles: [
      "Le dossier est totalement autonome : lisible en un coup d'œil sans explication",
      "Respect absolu de la charte typographique et de la grille éditoriale",
      "Prêt pour transmission aux jurys d'écoles, investisseurs ou ateliers de façon"
    ],
    illustrations: [
      {
        id: "planche-lookbook",
        titre: "Planche Lookbook de Synthèse — Collection Couchant (Format 3:2)",
        src: "/atelier-collection-lookbook-planche.webp",
        aspectRatio: "aspect-[3/2]",
        badge: "LIVRABLE MAÎTRE",
        description: "La planche finale complète : colonne de gauche avec le concept et la muse, médaillons d'ambiance en haut, silhouettes portées au centre, palette chromatique hex et bande technique inférieure.",
        casesDetail: [
          { label: "Colonne Concept", desc: "Titre de collection, citation créateur, persona cliente et décor." },
          { label: "Médaillons Univers", desc: "Rappel des inspirations de lagune et des matières brutes." },
          { label: "Silhouettes Ordonnées", desc: "Vues en pied de la capsule avec leurs médaillons ADN respectifs." },
          { label: "Palette Certifiée", desc: "Pastilles de couleur avec codes hex exacts pour les teinturiers." }
        ]
      }
    ]
  },
  {
    num: "07",
    titre: "Dessin Technique & Patronnage Coté",
    sousTitre: "Dessin vectoriel au trait noir d'atelier, dossier technique .md et patron coté calculé par code (PDF 1:10, A0/A4, SVG, DXF CLO 3D)",
    explicationGenerale: "Le skill assure le passage en atelier : il génère le dessin technique au trait noir d'atelier (face et dos épurés), puis calcule géométriquement chaque pièce de patronnage (sans IA générative) avec les valeurs de couture et les contrôles d'assemblage.",
    ceQueVousObtenez: [
      "Dessin technique vectoriel au trait noir Face + Dos (sans corps ni ombre)",
      "Dossier technique d'atelier (.md) avec cotes finies et ordre de montage",
      "Patronnage coté calculé par code (PDF 1:10 A3, PDF taille réelle A0/A4, SVG)",
      "Fichier DXF AAMA compatible CLO 3D pour la découpe ou l'essayage virtuel"
    ],
    livrableCourt: "Dessin trait face/dos + Dossier technique .md + Patron calculé (PDF 1:10, A0/A4, SVG, DXF)",
    imageCard: "/etape-07-patronage.webp",
    imageCardFit: "contain",
    badgeCard: "PATRON CALCULÉ PAR CODE (DXF/PDF)",
    isMasterStep: true,
    roleAgent: "Modéliste CAO & Patronnier Industriel : Il produit le dessin technique au trait noir normalisé, puis calcule géométriquement chaque pièce de patron avec valeurs de couture et contrôles d'aisance. Zéro IA pour le patron.",
    resume: "L'aboutissement industriel de la collection : à partir des fiches techniques et des prototypes validés, l'agent génère les dessins techniques au trait noir (face + dos, sans corps ni ombre, 2 looks par image), compose la planche technique cotée par code Python, rédige le dossier technique (.md) et calcule le patronnage coté sans aucune IA générative (blocs de base, aisances, valeurs de couture et contrôles d'assemblage). Sorties professionnelles prêtes pour atelier ou logiciel 3D : tableau de cotes .md, planche 1:10 PDF A3, SVG vectoriel, PDF taille réelle A0/A4 et fichier DXF AAMA importable dans CLO 3D.",
    entrees: [
      "Fiches techniques validées (Étape 03) et prototypes portés validés (Étape 04)",
      "Choix de la taille de coupe : barème standard 38 normalisé ★, gradation (34 à 48) ou sur-mesure créateur",
      "Cahier des charges d'atelier : valeurs de couture (1 cm standard, 3 cm ourlet), thermocollants et zips",
      "Logiciel de destination éventuel (CLO 3D, Browzwear, Gerber, Lectra Modaris ou coupe manuelle d'atelier)"
    ],
    livrables: [
      "Dessin technique au trait noir Face + Dos (P[n]_technique_v1) sans corps, 2 looks par planche",
      "Planche technique cotée par code Python avec cartouche d'atelier officiel (collection, look, taille, version)",
      "Dossier technique complet (L[n]_dossier_v1.md) : mesures finies, tolérances, nomenclature, gamme de montage",
      "Patron coté calculé par code (L[n]_patron_v1.md + planche 1:10 PDF A3, SVG, PDF A0/A4 taille réelle)",
      "Fichier vectoriel d'échange CAO DXF type AAMA (L[n]_patron.dxf) et protocole d'assemblage pour CLO 3D"
    ],
    verrousRegles: [
      "ZÉRO GÉNÉRATION IA POUR LE PATRON : le tracé est 100 % déterministe et calculé par code géométrique Python",
      "Contrôles d'assemblage obligatoires : poitrine, taille, hanches, longueurs de coutures appariées et emmanchures",
      "Tant qu'un contrôle d'assemblage échoue, le patron n'est JAMAIS livré : recalibration automatique des pièces",
      "Le barème d'atelier ou d'école prime toujours sur le barème standard ; toile d'essai systématiquement préconisée"
    ],
    illustrations: [
      {
        id: "patronage-technique",
        titre: "Dessin Technique au Trait Noir & Patronnage Industriel Coté — Look 05 (Dernier Rayon)",
        src: "/etape-07-patronage.webp",
        aspectRatio: "aspect-[16/9]",
        bgMode: "light",
        badge: "DESSIN AU TRAIT & CAO CALCULÉE",
        description: "Dossier d'industrialisation et de modélisme complet : à gauche, le dessin technique au trait d'atelier normalisé en double vue Face + Dos (coutures d'assemblage, zips invisibles, découpes bustier sirène, godets et médaillon brodé) ; à droite, les pièces du patronnage coté calculé par script géométrique Python (corsage devant/dos, jupes fourreau avec valeurs de couture 10 mm, sens du droit-fil, crans de montage, godets d'éventail et tableau de contrôle des aisances pour export DXF / CLO 3D).",
        casesDetail: [
          { label: "Dessin Trait Face", desc: "Tracé vectoriel noir épuré sans corps ni dégradé : découpes bustier princesse, aplat d'organza et godet wax." },
          { label: "Dessin Trait Dos", desc: "Vue arrière technique : fermeture éclair invisible milieu dos, ligne de dos nu et placement du médaillon." },
          { label: "Corsage & Découpes", desc: "Pièces de bustier calculées avec valeur de couture 1 cm, aisance poitrine +4 cm et crans d'assemblage." },
          { label: "Jupe Sirène & Godets", desc: "Quilles et panneaux de jupe évasés avec incrustation des 7 plis de l'éventail signature wax." },
          { label: "Contrôles Géométriques", desc: "Vérification automatisée par code : coutures côtés appariées à 0.1 mm, aisances hanches et taille conformes." },
          { label: "Sorties Industrielles", desc: "Exports instantanés : PDF A3 échelle 1:10, PDF A0 taille réelle, DXF AAMA pour CLO 3D et tableau de cotes." }
        ]
      }
    ]
  }
];

export default function CollectionStepsWithModal() {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
  const [selectedIllustrationTab, setSelectedIllustrationTab] = useState<string>("univers");

  const isModalOpen = selectedStepIndex !== null;
  const currentStep = selectedStepIndex !== null ? ETAPES_COLLECTION[selectedStepIndex] : null;

  const openModal = (index: number) => {
    setSelectedStepIndex(index);
    // Reset tab to first illustration of that step
    const step = ETAPES_COLLECTION[index];
    if (step && step.illustrations.length > 0) {
      setSelectedIllustrationTab(step.illustrations[0].id);
    }
  };

  const closeModal = useCallback(() => {
    setSelectedStepIndex(null);
  }, []);

  const goToPrevStep = useCallback(() => {
    if (selectedStepIndex === null) return;
    const newIdx = selectedStepIndex === 0 ? ETAPES_COLLECTION.length - 1 : selectedStepIndex - 1;
    setSelectedStepIndex(newIdx);
    const step = ETAPES_COLLECTION[newIdx];
    if (step && step.illustrations.length > 0) {
      setSelectedIllustrationTab(step.illustrations[0].id);
    }
  }, [selectedStepIndex]);

  const goToNextStep = useCallback(() => {
    if (selectedStepIndex === null) return;
    const newIdx = selectedStepIndex === ETAPES_COLLECTION.length - 1 ? 0 : selectedStepIndex + 1;
    setSelectedStepIndex(newIdx);
    const step = ETAPES_COLLECTION[newIdx];
    if (step && step.illustrations.length > 0) {
      setSelectedIllustrationTab(step.illustrations[0].id);
    }
  }, [selectedStepIndex]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        goToPrevStep();
      } else if (e.key === "ArrowRight") {
        goToNextStep();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, closeModal, goToPrevStep, goToNextStep]);

  return (
    <section className="border-b border-[#DCDCE2] pb-12 mb-12">
      {/* En-tête de section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#56565F] block mb-1">
            MÉTHODE RIGOUREUSE & DÉTERMINISTE
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#0B0B0D]">
            Les sept étapes ordonnées d’un projet de collection
          </h2>
        </div>
        <div className="font-mono text-[11px] text-[#56565F] flex items-center gap-1.5 bg-[#F6F6F8] px-2.5 py-1 border border-[#DCDCE2]">
          <span>●</span>
          <span>CLIQUEZ SUR UNE ÉTAPE POUR OUVRIR LE DÉTAIL</span>
        </div>
      </div>

      {/* Grille des 7 cartes (2 rangées de 3 + 1 carte maîtresse pleine largeur) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ETAPES_COLLECTION.map((etape, idx) => {
          const isMaster = etape.isMasterStep;

          if (isMaster) {
            return (
              <div
                key={etape.num}
                onClick={() => openModal(idx)}
                className="md:col-span-2 lg:col-span-3 border-2 border-[#0B0B0D] bg-white flex flex-col lg:flex-row cursor-pointer hover:shadow-xl transition-all duration-300 group select-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(idx);
                  }
                }}
                aria-label={`Ouvrir les détails de l'étape ${etape.num} : ${etape.titre}`}
              >
                {/* Image d'en-tête / Côté gauche sur desktop */}
                <div className="lg:w-1/2 aspect-[16/10] lg:aspect-auto bg-[#F6F6F8] border-b lg:border-b-0 lg:border-r border-[#DCDCE2] overflow-hidden relative flex items-center justify-center shrink-0">
                  <img
                    src={etape.imageCard}
                    alt={etape.titre}
                    className="w-full h-full object-contain p-3 sm:p-5 bg-white grayscale opacity-95 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.01] transition-all duration-500"
                  />
                  {etape.badgeCard && (
                    <div className="absolute top-3 left-3 bg-[#0B0B0D] text-white text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider font-bold">
                      {etape.badgeCard}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/95 border border-[#0B0B0D] text-[#0B0B0D] text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    VOIR LE DOSSIER TECHNIQUE ↗
                  </div>
                </div>

                {/* Contenu textuel / Côté droit sur desktop */}
                <div className="p-5 md:p-7 lg:w-7/12 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-mono text-xs font-bold text-[#0B0B0D] flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[#B7410E] inline-block"></span>
                        <span className="bg-[#0B0B0D] text-white px-2 py-0.5 text-[10px]">ÉTAPE 07</span>
                        <span className="text-[#B7410E] uppercase tracking-wider text-[11px] font-bold">ABOUTISSEMENT INDUSTRIEL</span>
                      </div>
                      <span className="text-[10px] font-mono bg-[#F6F6F8] border border-[#DCDCE2] px-2 py-0.5 text-[#56565F] uppercase">
                        Patron 100% calculé par code
                      </span>
                    </div>

                    <div className="font-serif text-xl sm:text-2xl text-[#0B0B0D] group-hover:text-[#B7410E] transition-colors">
                      {etape.titre}
                    </div>

                    <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed">
                      {etape.sousTitre}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DCDCE2] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="font-sans text-xs text-[#56565F]">
                      <strong className="text-[#0B0B0D]">Livrable :</strong> {etape.livrableCourt}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-[#0B0B0D] font-bold group-hover:text-[#B7410E] whitespace-nowrap">
                      <span>VOIR LE RÉSUMÉ</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Cartes standard pour Étapes 01 à 06
          return (
            <div
              key={etape.num}
              onClick={() => openModal(idx)}
              className="border border-[#DCDCE2] bg-white flex flex-col justify-between cursor-pointer hover:border-[#0B0B0D] hover:shadow-md transition-all duration-300 group select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(idx);
                }
              }}
              aria-label={`Ouvrir les détails de l'étape ${etape.num} : ${etape.titre}`}
            >
              {/* Image d'en-tête de la carte */}
              <div className="aspect-[4/3] w-full bg-[#F6F6F8] border-b border-[#DCDCE2] overflow-hidden relative flex items-center justify-center">
                <img
                  src={etape.imageCard}
                  alt={etape.titre}
                  className={`w-full h-full ${etape.imageCardFit === "contain" ? "object-contain p-2 bg-white" : "object-cover"} grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500`}
                />
                {etape.badgeCard && (
                  <div className="absolute top-2 left-2 bg-[#0B0B0D] text-white text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider font-bold">
                    {etape.badgeCard}
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-white/90 border border-[#0B0B0D] text-[#0B0B0D] text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  VOIR LE LIVRABLE ↗
                </div>
              </div>

              {/* Contenu textuel de la carte */}
              <div className="p-4 sm:p-5 flex flex-col gap-3 flex-grow">
                {/* Numéro et indicateur */}
                <div className="font-mono text-xs font-bold text-[#0B0B0D] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#0B0B0D] inline-block"></span>
                    ÉTAPE {etape.num}
                  </span>
                  <span className="text-[10px] text-[#56565F] font-normal uppercase">
                    Ordre imposé
                  </span>
                </div>

                {/* Titre */}
                <div className="font-serif text-lg text-[#0B0B0D] group-hover:text-[#B7410E] transition-colors">
                  {etape.titre}
                </div>

                <p className="font-sans text-xs text-[#56565F] leading-relaxed line-clamp-2">
                  {etape.sousTitre}
                </p>

                <div className="mt-auto pt-2 border-t border-[#DCDCE2] flex flex-col gap-1.5">
                  <div className="font-sans text-[11px] text-[#56565F] leading-snug">
                    <strong className="text-[#0B0B0D]">Livrable :</strong> {etape.livrableCourt}
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-[#0B0B0D] font-bold group-hover:text-[#B7410E] transition-colors">
                    <span>VOIR LE RÉSUMÉ DE L’ÉTAPE</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── POPUP MODAL DÉTAILLÉE ────────────────────────────────────── */}
      {isModalOpen && currentStep && (
        <div
          className="fixed inset-0 z-50 bg-[#0B0B0D]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Détails de l'étape ${currentStep.num} : ${currentStep.titre}`}
        >
          <div
            className="max-w-4xl w-full max-h-[92vh] bg-white border border-[#0B0B0D] shadow-2xl flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barre supérieure de la modale */}
            <div className="border-b border-[#DCDCE2] bg-[#F6F6F8] px-4 md:px-6 py-3 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2 font-mono text-xs text-[#0B0B0D] uppercase font-bold tracking-wider">
                <span className="bg-[#0B0B0D] text-white px-2 py-0.5 text-[10px]">
                  ÉTAPE {currentStep.num} / 0{ETAPES_COLLECTION.length}
                </span>
                <span>·</span>
                <span className="text-[#56565F] hidden sm:inline">PROTOCOLE DU DIRECTEUR DE COLLECTION</span>
              </div>

              {/* Contrôles navigation et fermeture */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevStep}
                  className="px-2 py-1 border border-[#DCDCE2] bg-white hover:bg-[#0B0B0D] hover:text-white transition-colors font-mono text-xs cursor-pointer"
                  title="Étape précédente (Flèche gauche)"
                >
                  ← Précédent
                </button>
                <button
                  onClick={goToNextStep}
                  className="px-2 py-1 border border-[#DCDCE2] bg-white hover:bg-[#0B0B0D] hover:text-white transition-colors font-mono text-xs cursor-pointer"
                  title="Étape suivante (Flèche droite)"
                >
                  Suivant →
                </button>
                <button
                  onClick={closeModal}
                  className="w-7 h-7 border border-[#0B0B0D] bg-[#0B0B0D] text-white hover:bg-[#B7410E] hover:border-[#B7410E] transition-colors flex items-center justify-center font-mono text-xs font-bold cursor-pointer ml-1"
                  title="Fermer (Échap)"
                  aria-label="Fermer la pop-up"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Corps défilable de la modale */}
            <div className="overflow-y-auto p-5 md:p-7 space-y-6 flex-grow">
              
              {/* Titre et en-tête */}
              <div className="space-y-3 border-b border-[#DCDCE2] pb-5">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase text-[#B7410E] font-bold tracking-widest">
                  <span>RÉSUMÉ DE L’ÉTAPE</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#0B0B0D] tracking-tight">
                  {currentStep.num}. {currentStep.titre}
                </h3>
                
                {/* Encart synthétique clair : Ce que fait le skill & Ce que vous obtenez */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F6F6F8] p-4 border border-[#DCDCE2] mt-3">
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] uppercase font-bold text-[#0B0B0D] tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#B7410E] inline-block"></span>
                      <span>Ce que fait le skill à cette étape :</span>
                    </div>
                    <p className="font-sans text-xs text-[#56565F] leading-relaxed">
                      {currentStep.explicationGenerale}
                    </p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-[#DCDCE2] pt-3 md:pt-0 md:pl-4">
                    <div className="font-mono text-[10px] uppercase font-bold text-[#0B0B0D] tracking-wider flex items-center gap-1.5">
                      <span className="text-[#B7410E] font-bold">✓</span>
                      <span>Ce que vous obtenez à cette étape :</span>
                    </div>
                    <ul className="space-y-1">
                      {currentStep.ceQueVousObtenez.map((item, idx) => (
                        <li key={idx} className="font-sans text-xs text-[#0B0B0D] flex items-start gap-1.5">
                          <span className="font-mono text-[#B7410E] text-[10px] mt-0.5 shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bloc Illustrations & Planches */}
              {currentStep.illustrations.length > 0 && (
                <div className="space-y-4 bg-[#F6F6F8] border border-[#DCDCE2] p-4 md:p-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#DCDCE2] pb-3">
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B0B0D] flex items-center gap-2">
                      <span>EXEMPLE DE RÉSULTAT</span>
                      <span className="text-[10px] text-[#56565F] font-normal">
                        ({currentStep.illustrations.length} {currentStep.illustrations.length > 1 ? "planches disponibles" : "planche"})
                      </span>
                    </div>

                    {/* Sélecteur d'onglets pour les illustrations multiples (notamment l'Étape 1) */}
                    {currentStep.illustrations.length > 1 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {currentStep.illustrations.map((ill) => (
                          <button
                            key={ill.id}
                            onClick={() => setSelectedIllustrationTab(ill.id)}
                            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors border cursor-pointer ${
                              selectedIllustrationTab === ill.id
                                ? "bg-[#0B0B0D] text-white border-[#0B0B0D] font-bold"
                                : "bg-white text-[#56565F] border-[#DCDCE2] hover:border-[#0B0B0D] hover:text-[#0B0B0D]"
                            }`}
                          >
                            {ill.badge || ill.titre.split("·")[0].trim()}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Affichage de l'illustration sélectionnée */}
                  {currentStep.illustrations.map((ill) => {
                    const isVisible =
                      currentStep.illustrations.length === 1 || selectedIllustrationTab === ill.id;
                    if (!isVisible) return null;

                    return (
                      <div key={ill.id} className="space-y-3">
                        <div className="flex justify-between items-center font-mono text-[11px] text-[#0B0B0D] font-bold">
                          <span>{ill.titre}</span>
                          {ill.badge && (
                            <span className="text-[9px] border border-[#0B0B0D] px-1.5 py-0.5 bg-white uppercase">
                              {ill.badge}
                            </span>
                          )}
                        </div>

                        {/* Image cadre plein écran intérieur */}
                        <div
                          className={`w-full ${ill.aspectRatio || "aspect-[16/10]"} ${ill.bgMode === "light" ? "bg-white border border-[#DCDCE2]" : "bg-[#0B0B0D] border border-[#0B0B0D]"} overflow-hidden flex items-center justify-center`}
                        >
                          <img
                            src={ill.src}
                            alt={ill.titre}
                            className={`w-full h-full ${ill.bgMode === "light" ? "object-contain p-2 sm:p-4" : "object-cover"}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Barre inférieure de la modale */}
            <div className="border-t border-[#DCDCE2] bg-[#F6F6F8] px-4 md:px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shrink-0 font-mono text-[11px] text-[#56565F]">
              <div className="flex items-center gap-2">
                <span className="text-[#0B0B0D] font-bold">ORDRE PROCÉDURAL :</span>
                <span>L'étape {currentStep.num} doit être validée avant d'enclencher la suivante.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#0B0B0D] font-bold">
                  {Number(currentStep.num)} / {ETAPES_COLLECTION.length}
                </span>
                <button
                  onClick={closeModal}
                  className="bg-[#0B0B0D] text-white px-3 py-1 uppercase text-[10px] font-bold hover:bg-[#B7410E] transition-colors cursor-pointer"
                >
                  Fermer la pop-up
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
