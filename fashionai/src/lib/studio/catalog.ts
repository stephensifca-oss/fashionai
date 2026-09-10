export interface Model {
  id: string;
  name: string;
  thumbnail: string;
  character_sheet?: string;
  rights_status: string;
  morphology: string;
  description: string;
  published: boolean;
}

export interface TemplateFraming {
  scale_text: string;
  camera_text: string;
  orientation_text: string;
  posture_text: string;
  gaze_text: string;
  placement_text: string;
  composition_text: string;
}

export interface Template {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  source_image: string;
  master_aspect_ratio: '2:3' | '1:1' | '16:9';
  view_aspect_ratio: '1:1';
  description: string;
  framing_profil: TemplateFraming;
  framing_dos: TemplateFraming;
  published: boolean;
}

export const MODELS_CATALOG: Model[] = [
  {
    id: 'model-fatou',
    name: 'FATOU · 01',
    thumbnail: '/models/fatou_portrait.jpg',
    character_sheet: '/models/fatou_character_sheet.png',
    rights_status: 'Propriété Studio FashionAI · Droits Commerciaux Exclusifs',
    morphology: '1m78 · Carré ondulé balayage caramel · Teint ébène satiné',
    description: 'Mannequin signature FashionAI : multi-angles validés (face, profil, dos) et verrouillage facial haute fidélité.',
    published: true,
  },
  {
    id: 'model-awa',
    name: 'AWA · 02',
    thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    rights_status: 'Libre de droits · Licence Studio Exclusif',
    morphology: '1m75 · Silhouette athlétique · Teint ambré',
    description: 'Idéale pour le streetwear chic et les ensembles structurés.',
    published: false,
  },
  {
    id: 'model-kadi',
    name: 'KADI · 03',
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    rights_status: 'Libre de droits · Licence Studio Exclusif',
    morphology: '1m80 · Silhouette élancée · Port graphique',
    description: 'Parfaite pour les robes de soirée et les pièces à volume.',
    published: false,
  },
  {
    id: 'model-yann',
    name: 'YANN · 04',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rights_status: 'Libre de droits · Licence Studio Exclusif',
    morphology: '1m85 · Silhouette masculine · Épaules nettes',
    description: 'Tailoring masculin, chemises et vestes structurées.',
    published: false,
  },
];

export const TEMPLATES_CATALOG: Template[] = [
  {
    id: 'tpl-studio-blanc',
    slug: 'studio-cyclorama-blanc',
    name: '01 · STUDIO CYCLORAMA BLANC',
    thumbnail: '/templates/studio_blanc_reference.png',
    source_image: '/templates/studio_blanc_reference.png',
    master_aspect_ratio: '2:3',
    view_aspect_ratio: '1:1',
    description: 'Cyclorama blanc pur infini e-commerce, éclairage studio doux diffus, contact shadow naturel au sol.',
    framing_profil: {
      scale_text: 'Plan américain mi-cuisse',
      camera_text: 'Hauteur de poitrine, axe 3/4 net',
      orientation_text: 'Corps orienté à 45° par rapport à l\'objectif',
      posture_text: 'Appui asymétrique naturel, mains et tombé du tissu dégagés',
      gaze_text: 'Regard 3/4 posé et direct',
      placement_text: 'Sujet centré, negative space blanc pur homogène',
      composition_text: 'Fond blanc pur #FFFFFF, ombres au sol douces, contraste net',
    },
    framing_dos: {
      scale_text: 'Du sommet du crâne à mi-cuisse',
      camera_text: 'Hauteur de poitrine, prise de vue dorsale directe 180°',
      orientation_text: 'Corps tourné à 180° dos à l\'objectif',
      posture_text: 'Nuque et ligne de dos dégagées, bras légèrement écartés',
      gaze_text: 'Profil perdu ou regard nuque',
      placement_text: 'Sujet centré dans le cadre',
      composition_text: 'Mise en valeur totale de la fermeture, des coutures et du tombé dorsal',
    },
    published: true,
  },
  {
    id: 'tpl-riviera',
    slug: 'terrasse-riviera',
    name: '02 · TERRAISSE RIVIERA',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    source_image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    master_aspect_ratio: '2:3',
    view_aspect_ratio: '1:1',
    description: 'Lumière dorée de fin d\'après-midi, colonnade et texture pierre ocre.',
    framing_profil: {
      scale_text: 'Plan américain mi-cuisse',
      camera_text: 'Hauteur de poitrine, léger angle de 3/4',
      orientation_text: 'Profil 45 degrés vers la lumière',
      posture_text: 'Mouvement naturel, drapé du tissu valorisé',
      gaze_text: 'Regard vers l\'horizon lointain',
      placement_text: 'Tiers droit avec échappée sur le décor',
      composition_text: 'Équilibre chaud / froid et reflets solaires doux',
    },
    framing_dos: {
      scale_text: 'Du haut de tête jusqu\'aux genoux',
      camera_text: 'Angle arrière net',
      orientation_text: 'Dos complet 180°',
      posture_text: 'Épaules droites, cambrure naturelle',
      gaze_text: 'Nuque mise en avant',
      placement_text: 'Centré, contraste lumineux sur le tissu',
      composition_text: 'Lecture intégrale de la structure dos du vêtement',
    },
    published: true,
  },
];
