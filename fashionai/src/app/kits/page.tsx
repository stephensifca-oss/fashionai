"use client";

import React, { useState } from "react";
import Link from "next/link";
import KitForm from "@/components/KitForm";

interface KitCardData {
  id: string;
  slug: string;
  family: "PHOTO" | "VIDÉO";
  level: "DÉBUTANT" | "INTERMÉDIAIRE" | "AVANCÉ";
  familyAndLevel: string;
  toolLine: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  vignettes: string[];
  isFlagship?: boolean;
}

const KITS_LIST: KitCardData[] = [
  {
    id: "kit-atelier",
    slug: "atelier-collection",
    family: "PHOTO",
    level: "AVANCÉ",
    familyAndLevel: "SYSTÈME MASTER · V5.3",
    toolLine: "OUTIL REQUIS — CHATGPT PLUS, CLAUDE OU GEMINI ADVANCED",
    title: "Atelier Collection : Directeur de collection de mode IA",
    description:
      "Du croquis brut au lookbook complet en 6 étapes ordonnées : univers de collection, plan 2D, fiches techniques en cm, prototypes portés sur mesure, line-up réaliste et lookbook haute couture.",
    beforeImage: "/sample_garment.png",
    afterImage: "/atelier-collection-lookbook-planche.webp",
    vignettes: [
      "/etape-01-planche-univers.webp",
      "/etape-02-lineup-2d.webp",
      "/atelier-collection-lookbook-planche.webp",
    ],
    isFlagship: true,
  },
  {
    id: "kit-1",
    slug: "editorial-studio",
    family: "PHOTO",
    level: "DÉBUTANT",
    familyAndLevel: "PHOTO · DÉBUTANT",
    toolLine: "OUTIL REQUIS — CHATGPT OU GEMINI · GRATUIT",
    title: "Transformez une photo de votre vêtement en plan de mode exploitable",
    description:
      "Direction artistique haute couture, gestion des drapés et volumes pour lookbooks studio sans séance photo.",
    beforeImage: "/sample_garment.png",
    afterImage: "/Studio_template/main-full-body-view.png",
    vignettes: [
      "/sample_garment.png",
      "/models/fatou_character_sheet.png",
      "/Studio_template/main-full-body-view.png",
    ],
  },
  {
    id: "kit-2",
    slug: "lookbook-brutaliste",
    family: "PHOTO",
    level: "INTERMÉDIAIRE",
    familyAndLevel: "PHOTO · INTERMÉDIAIRE",
    toolLine: "OUTIL REQUIS — GEMINI · GRATUIT",
    title: "Obtenez le dos de votre pièce sans la photographier",
    description:
      "Reconstitution dorsale 180°, estimation morphologique des coutures, fermetures et tombé précis du textile.",
    beforeImage: "/sample_garment.png",
    afterImage: "/Studio_template/still-back-view.png",
    vignettes: [
      "/sample_garment.png",
      "/examples/example_dos.png",
      "/Studio_template/still-back-view.png",
    ],
  },
  {
    id: "kit-3",
    slug: "serie-coherente-ecom",
    family: "PHOTO",
    level: "INTERMÉDIAIRE",
    familyAndLevel: "PHOTO · INTERMÉDIAIRE",
    toolLine: "OUTIL REQUIS — SEEDREAM · PAYANT",
    title: "Une série cohérente pour votre fiche produit : face, profil, dos",
    description:
      "Conditionnement multi-angles sur égérie verrouillée pour produire des fiches e-commerce complètes et homogènes.",
    beforeImage: "/sample_garment.png",
    afterImage: "/Studio_template/still-profile-view.png",
    vignettes: [
      "/sample_garment.png",
      "/Studio_template/still-front-view.png",
      "/Studio_template/still-profile-view.png",
    ],
  },
  {
    id: "kit-4",
    slug: "campagne-mouvement",
    family: "VIDÉO",
    level: "DÉBUTANT",
    familyAndLevel: "VIDÉO · DÉBUTANT",
    toolLine: "OUTIL REQUIS — GOOGLE FLOW OU VEO · GRATUIT / PAYANT",
    title: "Animez un visuel de collection en plan de campagne cinématique",
    description:
      "Mise en mouvement ralentie de 8 secondes, dynamique naturelle des soieries et travelling caméra fluide.",
    beforeImage: "/sample_garment.png",
    afterImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80",
    vignettes: [
      "/sample_garment.png",
      "/Studio_template/main-full-body-view.png",
      "/Studio_template/signature-detail-macro.png",
    ],
  },
];

// 14 high-fashion result visuals for Zone B Mosaic (with lowercase valid paths)
const MOSAIC_GALLERY = [
  { id: 1, type: "standard", src: "/Studio_template/main-full-body-view.png", alt: "Look Studio 1" },
  { id: 2, type: "row-span-2", src: "/Studio_template/still-profile-view.png", alt: "Look 3/4 Profil" },
  { id: 3, type: "standard", src: "/models/fatou_character_sheet.png", alt: "Égérie Fatou" },
  { id: 4, type: "col-span-2", src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80", alt: "Campagne Mouvement" },
  { id: 5, type: "row-span-2", src: "/Studio_template/bust-and-face-closeup.png", alt: "Buste & Encolure" },
  { id: 6, type: "standard", src: "/examples/example_face.png", alt: "Look Face Studio" },
  { id: 7, type: "standard", src: "/Studio_template/still-back-view.png", alt: "Vue Dos 180" },
  { id: 8, type: "col-span-2", src: "/Studio_template/signature-detail-macro.png", alt: "Macro Matière Textile" },
  { id: 9, type: "standard", src: "/examples/example_profil.png", alt: "Profil Défilé" },
  { id: 10, type: "row-span-2", src: "/Studio_template/waist-and-construction-closeup.png", alt: "Construction Taille" },
  { id: 11, type: "standard", src: "/examples/example_dos.png", alt: "Reconstitution Dos" },
  { id: 12, type: "col-span-2", src: "/Studio_template/still-front-view.png", alt: "Série E-Commerce" },
  { id: 13, type: "standard", src: "/models/fatou_portrait.jpg", alt: "Portrait Studio" },
  { id: 14, type: "standard", src: "/sample_garment.png", alt: "Extraction Textile" },
];

export default function KitsPage() {
  const [activeFilter, setActiveFilter] = useState<"TOUT" | "PHOTO" | "VIDÉO">("TOUT");
  const [activeModalKit, setActiveModalKit] = useState<KitCardData | null>(null);

  const filteredKits = KITS_LIST.filter((k) => {
    if (activeFilter === "TOUT") return true;
    return k.family === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#F6F6F8] text-[#0B0B0D] font-sans selection:bg-[#0B0B0D] selection:text-white flex flex-col">
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-5 md:px-20 pt-12 pb-20">
        {/* 1. PAGE TITLE & FILTER ROW */}
        <section className="mb-12">
          <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-[0.16em] mb-2 font-medium">
            CATALOGUE DE MÉTHODES & PROMPTS ÉDITORIAUX
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl uppercase font-normal tracking-tight text-[#0B0B0D] leading-tight">
                NOS KITS
              </h1>
              <p className="font-sans text-sm md:text-base text-[#56565F] max-w-xl mt-2 leading-relaxed">
                Méthodes reproductibles, prompts validés et protocoles pour transformer vos pièces en campagnes de mode internationales sans studio physique.
              </p>
            </div>
            <div className="font-mono text-xs text-[#56565F] shrink-0 uppercase tracking-widest pb-1">
              5 MÉTHODES DISPONIBLES
            </div>
          </div>

          {/* FILTER ROW */}
          <nav className="flex items-center gap-8 font-mono text-xs uppercase tracking-wider border-b border-[#DCDCE2] pb-4">
            <button
              onClick={() => setActiveFilter("TOUT")}
              className={`pb-1 transition-all cursor-pointer ${
                activeFilter === "TOUT"
                  ? "text-[#0B0B0D] border-b-2 border-[#B7410E] font-bold"
                  : "text-[#56565F] hover:text-[#0B0B0D]"
              }`}
            >
              TOUT ({KITS_LIST.length})
            </button>
            <button
              onClick={() => setActiveFilter("PHOTO")}
              className={`pb-1 transition-all cursor-pointer ${
                activeFilter === "PHOTO"
                  ? "text-[#0B0B0D] border-b-2 border-[#B7410E] font-bold"
                  : "text-[#56565F] hover:text-[#0B0B0D]"
              }`}
            >
              PHOTO ({KITS_LIST.filter((k) => k.family === "PHOTO").length})
            </button>
            <button
              onClick={() => setActiveFilter("VIDÉO")}
              className={`pb-1 transition-all cursor-pointer ${
                activeFilter === "VIDÉO"
                  ? "text-[#0B0B0D] border-b-2 border-[#B7410E] font-bold"
                  : "text-[#56565F] hover:text-[#0B0B0D]"
              }`}
            >
              VIDÉO ({KITS_LIST.filter((k) => k.family === "VIDÉO").length})
            </button>
          </nav>
        </section>

        {/* 2. KITS GRID */}
        <section id="kits-grid" className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {filteredKits.map((kit) => (
            <article
              key={kit.id}
              className={`flex flex-col bg-white border border-[#DCDCE2] overflow-hidden transition-all duration-300 hover:border-[#0B0B0D] ${
                kit.isFlagship ? "md:col-span-2 shadow-xs" : ""
              }`}
            >
              {/* BEFORE/AFTER SPLIT 4:5 IMAGE WITH 1PX VERTICAL RULE */}
              <div
                className={`w-full relative overflow-hidden bg-neutral-100 flex ${
                  kit.isFlagship ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/5]"
                }`}
              >
                {/* Left: Smartphone raw garment */}
                <div className="w-1/3 h-full relative overflow-hidden bg-[#ECEBF0] flex items-center justify-center border-r border-[#0B0B0D]">
                  <img
                    src={kit.beforeImage}
                    alt="Photo brute d’origine"
                    className="w-full h-full object-cover object-center grayscale-[15%] brightness-95 contrast-95"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B0B0D]/85 text-white font-mono text-[9px] uppercase px-2 py-0.5 tracking-wider backdrop-blur-xs">
                    BRUT
                  </div>
                </div>

                {/* Right: Polished Studio Fashion Result */}
                <div className="w-2/3 h-full relative overflow-hidden bg-neutral-100">
                  <img
                    src={kit.afterImage}
                    alt={kit.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                  />
                  <div className="absolute top-3 right-3 bg-[#0B0B0D]/85 text-white font-mono text-[9px] uppercase px-2 py-0.5 tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                    RÉSULTAT IA
                  </div>
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  {/* TWO DM MONO 10PX UPPERCASE LINES */}
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="font-mono text-[10px] text-[#B7410E] uppercase tracking-[0.14em] font-semibold">
                      {kit.familyAndLevel}
                    </span>
                    {kit.isFlagship && (
                      <span className="font-mono text-[9px] bg-[#0B0B0D] text-white px-2 py-0.5 uppercase tracking-widest">
                        KIT VEDETTE
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-[0.14em] mb-3">
                    {kit.toolLine}
                  </div>

                  {/* TITLE IN BODONI */}
                  <h2
                    className={`font-serif font-normal leading-snug mb-3 text-[#0B0B0D] ${
                      kit.isFlagship ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {kit.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="font-sans text-sm md:text-base text-[#56565F] leading-relaxed mb-6">
                    {kit.description}
                  </p>
                </div>

                {/* PREREQUISITES & CTA */}
                <div className="border-t border-[#DCDCE2] pt-5 mt-auto">
                  <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-[0.14em] mb-3 font-medium">
                    CE QU’IL VOUS FAUT
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 shrink-0">
                      {kit.vignettes.map((vignette, vIdx) => (
                        <div
                          key={vIdx}
                          className="w-9 h-9 border border-[#DCDCE2] overflow-hidden shrink-0 bg-neutral-100"
                        >
                          <img
                            src={vignette}
                            alt="Prérequis"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="font-sans text-xs text-[#56565F] leading-tight">
                      Votre pièce d’origine. Le reste est fourni et guidé étape par étape.
                    </span>
                  </div>

                  {/* CTA BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {kit.slug === "atelier-collection" ? (
                      <>
                        <Link
                          href="/kits/atelier-collection"
                          className="flex-1 h-12 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 active:opacity-80 transition-opacity cursor-pointer font-medium"
                        >
                          DÉCOUVRIR LE SYSTÈME COMPLET
                          <span>→</span>
                        </Link>
                        <button
                          onClick={() => setActiveModalKit(kit)}
                          className="h-12 px-6 border border-[#0B0B0D] text-[#0B0B0D] font-mono text-xs uppercase tracking-widest flex items-center justify-center hover:bg-neutral-100 active:opacity-80 transition-colors cursor-pointer"
                        >
                          TÉLÉCHARGER LE KIT
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setActiveModalKit(kit)}
                        className="w-full h-12 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center hover:opacity-90 active:opacity-80 transition-opacity cursor-pointer font-medium"
                      >
                        VOIR LE KIT & TÉLÉCHARGER
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* 3. DENSE RESULTS MOSAIC ("CE QUE LA MÉTHODE PRODUIT") */}
        <section className="border-t border-[#DCDCE2] mt-24 pt-16">
          <div className="mb-10">
            <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-[0.16em] mb-2 font-medium">
              CE QUE LA MÉTHODE PRODUIT
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#0B0B0D] leading-tight">
              Fait avec ces kits éditoriaux
            </h2>
            <p className="font-sans text-sm text-[#56565F] mt-2 max-w-lg">
              Chaque visuel ci-dessous a été généré via nos méthodologies de prompts verrouillés et de cohérence morphologique.
            </p>
          </div>

          {/* MOSAIC GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* 1. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[0].src}
                alt={MOSAIC_GALLERY[0].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 2. 4:5 spanning two rows */}
            <div className="col-span-1 row-span-2 overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[1].src}
                alt={MOSAIC_GALLERY[1].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 3. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[2].src}
                alt={MOSAIC_GALLERY[2].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 4. 8:5 spanning two columns */}
            <div className="col-span-2 aspect-[8/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[3].src}
                alt={MOSAIC_GALLERY[3].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 5. 4:5 spanning two rows */}
            <div className="col-span-1 row-span-2 overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[4].src}
                alt={MOSAIC_GALLERY[4].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 6. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[5].src}
                alt={MOSAIC_GALLERY[5].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 7. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[6].src}
                alt={MOSAIC_GALLERY[6].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 8. 8:5 spanning two columns */}
            <div className="col-span-2 aspect-[8/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[7].src}
                alt={MOSAIC_GALLERY[7].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 9. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[8].src}
                alt={MOSAIC_GALLERY[8].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 10. 4:5 spanning two rows */}
            <div className="col-span-1 row-span-2 overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[9].src}
                alt={MOSAIC_GALLERY[9].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 11. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[10].src}
                alt={MOSAIC_GALLERY[10].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 12. 8:5 spanning two columns */}
            <div className="col-span-2 aspect-[8/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[11].src}
                alt={MOSAIC_GALLERY[11].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 13. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[12].src}
                alt={MOSAIC_GALLERY[12].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 14. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#DCDCE2]">
              <img
                src={MOSAIC_GALLERY[13].src}
                alt={MOSAIC_GALLERY[13].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 4. BANDEAU WHATSAPP (FORMATION DE GROUPE DU JEUDI 18H) */}
      <section className="bg-[#0B0B0D] text-white py-16 px-5 md:px-20 border-t border-[#DCDCE2]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.16em] mb-2 font-medium">
              CHAQUE JEUDI À 18H00 GMT
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal leading-snug mb-3 text-white">
              Une séance de groupe pour débloquer votre cas
            </h2>
            <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed">
              Une heure en direct, gratuite, sur inscription WhatsApp. Venez avec une photo ou une collection qui bloque, repartez avec le prompt exact et le rendu corrigé.
            </p>
          </div>
          <a
            href="https://wa.me/2250757512959?text=Bonjour,%20je%20souhaite%20m%27inscrire%20%C3%A0%20la%20s%C3%A9ance%20de%20groupe%20du%20jeudi%2018h%20sur%20FashionAI"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#25D366] text-[#0B0B0D] font-mono text-xs font-semibold px-8 py-4 uppercase tracking-widest hover:opacity-90 active:opacity-80 transition-opacity cursor-pointer inline-flex items-center gap-2"
          >
            <span>Je m’inscris sur WhatsApp</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* 5. MODAL DE TÉLÉCHARGEMENT DU KIT SÉLECTIONNÉ */}
      {activeModalKit && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0D]/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#0B0B0D] max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#DCDCE2] pb-4 mb-6">
              <div>
                <div className="font-mono text-[10px] text-[#B7410E] uppercase font-semibold tracking-[0.14em]">
                  {activeModalKit.familyAndLevel}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0B0B0D] uppercase mt-1 leading-snug">
                  {activeModalKit.title}
                </h3>
                <p className="font-mono text-[10px] text-[#56565F] uppercase tracking-wider mt-1">
                  {activeModalKit.toolLine}
                </p>
              </div>
              <button
                onClick={() => setActiveModalKit(null)}
                className="text-[#56565F] hover:text-[#0B0B0D] font-mono text-xs cursor-pointer p-1 uppercase tracking-wider"
              >
                ✕ FERMER
              </button>
            </div>

            <KitForm slug={activeModalKit.slug} />
          </div>
        </div>
      )}
    </div>
  );
}
