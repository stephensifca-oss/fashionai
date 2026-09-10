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
}

const KITS_LIST: KitCardData[] = [
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
    afterImage: "/Studio_template/MAIN FULL-BODY VIEW.png",
    vignettes: [
      "/sample_garment.png",
      "/models/fatou_character_sheet.png",
      "/Studio_template/MAIN FULL-BODY VIEW.png",
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
    afterImage: "/Studio_template/STILL BACK VIEW.png",
    vignettes: [
      "/sample_garment.png",
      "/examples/example_dos.png",
      "/Studio_template/STILL BACK VIEW.png",
    ],
  },
  {
    id: "kit-3",
    slug: "serie-coherente-ecom",
    family: "PHOTO",
    level: "INTERMÉDIAIRE",
    familyAndLevel: "PHOTO · INTERMÉDIAIRE",
    toolLine: "OUTIL REQUIS — SEEDREAM · PAYANT",
    title: "Une série cohérente pour votre fiche produit : face, trois-quarts, dos",
    description:
      "Conditionnement multi-angles sur égérie verrouillée pour produire des fiches e-commerce complètes et homogènes.",
    beforeImage: "/sample_garment.png",
    afterImage: "/Studio_template/STILL PROFILE VIEW.png",
    vignettes: [
      "/sample_garment.png",
      "/Studio_template/STILL FRONT VIEW.png",
      "/Studio_template/STILL PROFILE VIEW.png",
    ],
  },
  {
    id: "kit-4",
    slug: "campagne-mouvement",
    family: "VIDÉO",
    level: "DÉBUTANT",
    familyAndLevel: "VIDÉO · DÉBUTANT",
    toolLine: "OUTIL REQUIS — GOOGLE FLOW · PAYANT",
    title: "Animez un visuel de collection en plan de campagne",
    description:
      "Mise en mouvement cinématique ralentie de 8 secondes, dynamique des tissus et travelling caméra fluide.",
    beforeImage: "/sample_garment.png",
    afterImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80",
    vignettes: [
      "/sample_garment.png",
      "/Studio_template/MAIN FULL-BODY VIEW.png",
      "/Studio_template/SIGNATURE DETAIL MACRO.png",
    ],
  },
];

// 14 high-fashion result visuals for Zone B Mosaic
const MOSAIC_GALLERY = [
  { id: 1, type: "standard", src: "/Studio_template/MAIN FULL-BODY VIEW.png", alt: "Look Studio 1" },
  { id: 2, type: "row-span-2", src: "/Studio_template/STILL PROFILE VIEW.png", alt: "Look 3/4 Profil" },
  { id: 3, type: "standard", src: "/models/fatou_character_sheet.png", alt: "Égérie Fatou" },
  { id: 4, type: "col-span-2", src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80", alt: "Campagne Mouvement" },
  { id: 5, type: "row-span-2", src: "/Studio_template/BUST & FACE CLOSE-UP.png", alt: "Buste & Encolure" },
  { id: 6, type: "standard", src: "/examples/example_face.png", alt: "Look Face Studio" },
  { id: 7, type: "standard", src: "/Studio_template/STILL BACK VIEW.png", alt: "Vue Dos 180" },
  { id: 8, type: "col-span-2", src: "/Studio_template/SIGNATURE DETAIL MACRO.png", alt: "Macro Matière Textile" },
  { id: 9, type: "standard", src: "/examples/example_profil.png", alt: "Profil Défilé" },
  { id: 10, type: "row-span-2", src: "/Studio_template/WAIST & CONSTRUCTION CLOSE-UP.png", alt: "Construction Taille" },
  { id: 11, type: "standard", src: "/examples/example_dos.png", alt: "Reconstitution Dos" },
  { id: 12, type: "col-span-2", src: "/Studio_template/STILL FRONT VIEW.png", alt: "Série E-Commerce" },
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
      {/* 1. TOP APP BAR / HEADER */}
      <header className="w-full h-14 border-b border-[#DCDCE2] bg-[#F6F6F8] flex items-center justify-between px-5 md:px-20 sticky top-0 z-40">
        <Link href="/" className="font-serif text-lg tracking-tight uppercase font-medium text-[#0B0B0D]">
          fashionai.agency
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-wider text-[#56565F]">
          <Link href="/kits" className="text-[#0B0B0D] font-medium border-b border-[#0B0B0D] pb-0.5">
            KITS
          </Link>
          <Link href="/studio" className="hover:text-[#0B0B0D] transition-colors">
            STUDIO
          </Link>
          <a
            href="https://wa.me/2250700000000?text=Bonjour,%20je%20souhaite%20m%27inscrire%20%C3%A0%20la%20s%C3%A9ance%20du%20jeudi%2018h"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0B0B0D] transition-colors"
          >
            SÉANCE
          </a>
          <a
            href="https://wa.me/2250700000000?text=Bonjour,%20je%20souhaite%20travailler%20avec%20FashionAI"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0B0B0D] transition-colors"
          >
            TRAVAILLER ENSEMBLE
          </a>
        </nav>
        <button
          onClick={() => {
            const el = document.getElementById("kits-grid");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="md:hidden font-mono text-xs uppercase tracking-widest text-[#0B0B0D] hover:opacity-70 transition-opacity cursor-pointer"
        >
          MENU
        </button>
      </header>

      <main className="flex-grow w-full max-w-[1280px] mx-auto px-5 md:px-20 pt-10 pb-20">
        {/* 2. PAGE TITLE & FILTER ROW */}
        <section className="mb-12">
          <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-[0.14em] mb-2">
            CATALOGUE DE MÉTHODES
          </div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight uppercase mb-8 font-normal tracking-tight text-[#0B0B0D]">
            NOS KITS
          </h1>

          {/* FILTER ROW: DM Mono uppercase, left-aligned, 32px apart, no boxes/borders. 'TOUT' active with 1px underline in #B7410E. */}
          <nav className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-wider border-b border-[#DCDCE2] pb-4">
            <button
              onClick={() => setActiveFilter("TOUT")}
              className={`pb-1 transition-all cursor-pointer ${
                activeFilter === "TOUT"
                  ? "text-[#0B0B0D] border-b border-[#B7410E] font-medium"
                  : "text-[#56565F] hover:text-[#0B0B0D]"
              }`}
            >
              TOUT
            </button>
            <button
              onClick={() => setActiveFilter("PHOTO")}
              className={`pb-1 transition-all cursor-pointer ${
                activeFilter === "PHOTO"
                  ? "text-[#0B0B0D] border-b border-[#B7410E] font-medium"
                  : "text-[#56565F] hover:text-[#0B0B0D]"
              }`}
            >
              PHOTO
            </button>
            <button
              onClick={() => setActiveFilter("VIDÉO")}
              className={`pb-1 transition-all cursor-pointer ${
                activeFilter === "VIDÉO"
                  ? "text-[#0B0B0D] border-b border-[#B7410E] font-medium"
                  : "text-[#56565F] hover:text-[#0B0B0D]"
              }`}
            >
              VIDÉO
            </button>
          </nav>
        </section>

        {/* 3. ZONE A: KITS GRID (1 COLUMN MOBILE, 2 COLUMNS DESKTOP, NO OUTER ARTICLE BORDER) */}
        <section id="kits-grid" className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredKits.map((kit) => (
            <article key={kit.id} className="flex flex-col bg-surface overflow-hidden">
              {/* K0-7: BEFORE/AFTER SPLIT 4:5 IMAGE WITH 1PX INK VERTICAL RULE AT 1/3 */}
              <div className="w-full aspect-[4/5] relative overflow-hidden bg-neutral-100 flex">
                {/* Left 1/3: Smartphone raw garment */}
                <div className="w-1/3 h-full relative overflow-hidden bg-[#E9E7F2]/40 flex items-center justify-center border-r border-[#0B0B0D]">
                  <img
                    src={kit.beforeImage}
                    alt="Photo brute d’origine"
                    className="w-full h-full object-cover grayscale-[20%] brightness-95 contrast-90"
                  />
                </div>

                {/* Right 2/3: Polished Studio Fashion Result */}
                <div className="w-2/3 h-full relative overflow-hidden bg-neutral-100">
                  <img
                    src={kit.afterImage}
                    alt={kit.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                  />
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  {/* TWO DM MONO 10PX UPPERCASE LINES (NO OVERLAY) */}
                  <div className="font-mono text-[10px] text-[#0B0B0D] uppercase tracking-[0.14em] font-medium">
                    {kit.familyAndLevel}
                  </div>
                  <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-[0.14em] mt-0.5 mb-2">
                    {kit.toolLine}
                  </div>

                  {/* TITLE IN BODONI MODA 26PX */}
                  <h2 className="font-serif text-[24px] md:text-[26px] font-normal leading-snug mb-3 text-[#0B0B0D]">
                    {kit.title}
                  </h2>

                  {/* DESCRIPTION IN ARCHIVO */}
                  <p className="font-sans text-sm text-[#56565F] leading-relaxed mb-6">
                    {kit.description}
                  </p>
                </div>

                {/* CE QU'IL VOUS FAUT SECTION */}
                <div className="border-t border-[#DCDCE2] pt-4 mt-auto">
                  <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-[0.14em] mb-3">
                    CE QU’IL VOUS FAUT
                  </div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center gap-2 shrink-0">
                      {kit.vignettes.map((vignette, vIdx) => (
                        <div
                          key={vIdx}
                          className="w-8 h-8 border border-[#DCDCE2] overflow-hidden shrink-0 bg-neutral-100"
                        >
                          <img
                            src={vignette}
                            alt="Prérequis"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="font-sans text-[13px] text-[#56565F] leading-tight">
                      Votre photo. Le reste est fourni.
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModalKit(kit)}
                    className="w-full h-12 bg-[#0B0B0D] text-white font-sans text-[15px] font-medium uppercase tracking-wider flex items-center justify-center hover:opacity-90 active:opacity-80 transition-opacity cursor-pointer"
                  >
                    VOIR LE KIT
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* 4. ZONE B: DENSE RESULTS MOSAIC ("CE QUE LA MÉTHODE PRODUIT") */}
        <section className="border-t border-[#DCDCE2] mt-24 pt-20">
          <div className="mb-8">
            <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-[0.14em] mb-2">
              CE QUE LA MÉTHODE PRODUIT
            </div>
            <h2 className="font-serif text-[28px] md:text-[32px] font-normal text-[#0B0B0D] leading-tight">
              Fait avec ces kits
            </h2>
          </div>

          {/* MOSAIC GRID: 2 COLUMNS ON MOBILE, 4 COLUMNS ON DESKTOP, 8PX GUTTERS, 3 EXACT FORMATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-auto">
            {/* 1. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[0].src}
                alt={MOSAIC_GALLERY[0].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 2. 4:5 spanning two rows */}
            <div className="col-span-1 row-span-2 overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[1].src}
                alt={MOSAIC_GALLERY[1].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 3. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[2].src}
                alt={MOSAIC_GALLERY[2].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 4. 8:5 spanning two columns */}
            <div className="col-span-2 aspect-[8/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[3].src}
                alt={MOSAIC_GALLERY[3].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 5. 4:5 spanning two rows */}
            <div className="col-span-1 row-span-2 overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[4].src}
                alt={MOSAIC_GALLERY[4].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 6. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[5].src}
                alt={MOSAIC_GALLERY[5].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 7. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[6].src}
                alt={MOSAIC_GALLERY[6].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 8. 8:5 spanning two columns */}
            <div className="col-span-2 aspect-[8/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[7].src}
                alt={MOSAIC_GALLERY[7].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 9. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[8].src}
                alt={MOSAIC_GALLERY[8].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 10. 4:5 spanning two rows */}
            <div className="col-span-1 row-span-2 overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[9].src}
                alt={MOSAIC_GALLERY[9].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 11. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[10].src}
                alt={MOSAIC_GALLERY[10].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 12. 8:5 spanning two columns */}
            <div className="col-span-2 aspect-[8/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[11].src}
                alt={MOSAIC_GALLERY[11].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 13. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[12].src}
                alt={MOSAIC_GALLERY[12].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 14. 4:5 standard */}
            <div className="col-span-1 aspect-[4/5] overflow-hidden bg-neutral-100">
              <img
                src={MOSAIC_GALLERY[13].src}
                alt={MOSAIC_GALLERY[13].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 5. BANDEAU WHATSAPP (FORMATION DE GROUPE DU JEUDI 18H) */}
      <section className="bg-[#0B0B0D] text-white py-16 px-5 md:px-20 border-t border-[#DCDCE2] text-left">
        <div className="max-w-[1280px] mx-auto flex flex-col items-start">
          <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.14em] mb-2">
            CHAQUE JEUDI, 18H
          </div>
          <h2 className="font-serif text-[28px] md:text-[34px] font-normal leading-snug mb-3 text-white">
            Une séance de groupe pour débloquer votre cas
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed max-w-2xl mb-8">
            Une heure en ligne, gratuite, sur inscription. Vous venez avec un visuel qui ne marche pas, vous repartez avec la solution.
          </p>
          <a
            href="https://wa.me/2250700000000?text=Bonjour,%20je%20souhaite%20m%27inscrire%20%C3%A0%20la%20s%C3%A9ance%20de%20groupe%20du%20jeudi%2018h%20sur%20FashionAI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-[#0B0B0D] font-mono text-xs font-semibold px-8 py-4 uppercase tracking-widest hover:opacity-90 active:opacity-80 transition-opacity cursor-pointer"
          >
            Je m’inscris sur WhatsApp
          </a>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="border-t border-[#DCDCE2] py-12 px-5 md:px-20 text-left bg-surface">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="font-serif text-xl uppercase font-medium tracking-tight mb-4 text-[#0B0B0D]">
              fashionai.agency
            </div>
            <div className="font-sans text-xs text-[#56565F] max-w-xs leading-relaxed">
              Studio d’intelligence artificielle éditoriale & direction artistique pour marques de mode.
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 font-mono text-[11px] uppercase tracking-wider text-[#56565F]">
            <Link href="/kits" className="hover:text-[#0B0B0D] transition-colors">
              KITS
            </Link>
            <a
              href="https://wa.me/2250700000000?text=Bonjour,%20je%20souhaite%20m%27inscrire%20%C3%A0%20la%20s%C3%A9ance%20du%20jeudi%2018h"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0B0B0D] transition-colors"
            >
              SÉANCE
            </a>
            <a
              href="https://wa.me/2250700000000?text=Bonjour,%20je%20souhaite%20collaborer%20avec%20FashionAI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0B0B0D] transition-colors"
            >
              TRAVAILLER ENSEMBLE
            </a>
            <Link href="/mentions-legales" className="hover:text-[#0B0B0D] transition-colors">
              MENTIONS LÉGALES
            </Link>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto font-mono text-[10px] text-[#56565F] uppercase tracking-[0.14em] pt-6 mt-8 border-t border-[#DCDCE2]">
          © 2026 FASHIONAI.AGENCY
        </div>
      </footer>

      {/* 7. MODAL DE TÉLÉCHARGEMENT DU KIT SÉLECTIONNÉ */}
      {activeModalKit && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0D]/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-surface border border-[#DCDCE2] max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative">
            <div className="flex items-start justify-between border-b border-[#DCDCE2] pb-4 mb-6">
              <div>
                <div className="font-mono text-[10px] text-[#B7410E] uppercase font-medium tracking-[0.14em]">
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
                className="text-[#56565F] hover:text-[#0B0B0D] font-mono text-xs cursor-pointer p-1"
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
