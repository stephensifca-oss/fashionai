"use client";

import { useState } from "react";

interface SlideItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  badge: string;
  category: string;
  title: string;
  description: string;
  actionHint?: string;
}

const SLIDES: SlideItem[] = [
  {
    id: "atelier-table",
    type: "image",
    src: "/atelier-collection-slide-table.webp",
    badge: "CONCEPTION & DIRECTION ARTISTIQUE",
    category: "01 · ATELIER DU STYLISTE",
    title: "De l’esquisse technique et des matières jusqu’au line-up 6 looks",
    description: "Table de travail du créateur : recherche textile (wax, sergé, bordeaux), croquis de patronage en cm et collection complète validée sur tablette.",
    actionHint: "PROJET RÉEL",
  },
  {
    id: "collection-video",
    type: "video",
    src: "/atelier-collection-demo.mp4",
    poster: "/atelier-collection-poster.jpg",
    badge: "CLIP DE DÉMONSTRATION EN MOUVEMENT",
    category: "02 · RENDU CINÉMATIQUE",
    title: "Vérifier la dynamique des tissus et la tenue de l’égérie",
    description: "Extrait de campagne cinématique (18s) démontrant la stabilité morphologique, le tombé des drapés et la cohérence de lumière.",
    actionHint: "CLIQUER POUR LANCER (18S)",
  },
  {
    id: "lookbook-sheet",
    type: "image",
    src: "/atelier-collection-lookbook-planche.webp",
    badge: "DOSSIER FINAL COMPOSÉ PAR CODE",
    category: "03 · PLANCHE LOOKBOOK",
    title: "Lookbook-planche de synthèse haute définition",
    description: "Titre de collection, concept, silhouettes ordonnées, palette hex validée et médaillons ADN réunis en une seule planche finale sans retouche.",
    actionHint: "EXPORT 3:2 HAUTE DÉFINITION",
  },
];

export default function LookbookHeroSlide() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const currentSlide = SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setIsPlayingVideo(false);
    setCurrentSlideIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlayingVideo(false);
    setCurrentSlideIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (idx: number) => {
    setIsPlayingVideo(false);
    setCurrentSlideIndex(idx);
  };

  return (
    <section className="mb-14 select-none">
      <div className="border border-[#0B0B0D] bg-white overflow-hidden shadow-sm">
        
        {/* Barre supérieure du slider avec sélecteurs d'onglets */}
        <div className="border-b border-[#DCDCE2] bg-[#F6F6F8] px-3 md:px-4 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-[10px] text-[#56565F] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-[#0B0B0D] font-bold">PREUVE DU LIVRABLE</span>
            <span>·</span>
            <span className="text-[#0B0B0D] font-bold">{currentSlide.badge}</span>
          </div>

          <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`px-2 py-1 text-[10px] font-mono transition-colors border cursor-pointer ${
                    currentSlideIndex === idx
                      ? "bg-[#0B0B0D] text-white border-[#0B0B0D] font-bold"
                      : "bg-white text-[#56565F] border-[#DCDCE2] hover:border-[#0B0B0D] hover:text-[#0B0B0D]"
                  }`}
                  title={slide.title}
                >
                  {slide.category.split("·")[0].trim()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 pl-2 border-l border-[#DCDCE2]">
              <button
                onClick={handlePrev}
                className="w-6 h-6 border border-[#DCDCE2] bg-white hover:bg-[#0B0B0D] hover:text-white transition-colors flex items-center justify-center font-bold text-xs cursor-pointer"
                aria-label="Slide précédent"
              >
                ←
              </button>
              <span className="font-mono text-[10px] px-1 text-[#0B0B0D] font-bold">
                {currentSlideIndex + 1}/{SLIDES.length}
              </span>
              <button
                onClick={handleNext}
                className="w-6 h-6 border border-[#DCDCE2] bg-white hover:bg-[#0B0B0D] hover:text-white transition-colors flex items-center justify-center font-bold text-xs cursor-pointer"
                aria-label="Slide suivant"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Cadre principal d'affichage de la slide */}
        <div className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] w-full bg-[#0B0B0D] relative overflow-hidden group">
          {currentSlide.type === "video" ? (
            isPlayingVideo ? (
              <video
                src={currentSlide.src}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                onClick={() => setIsPlayingVideo(true)}
                className="w-full h-full relative cursor-pointer"
              >
                <img
                  src={currentSlide.poster || currentSlide.src}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-neutral-950/30 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border border-white bg-black/40 backdrop-blur-xs flex items-center justify-center group-hover:bg-white group-hover:text-[#0B0B0D] text-white transition-all duration-300">
                    <span className="font-mono text-2xl sm:text-3xl font-bold ml-1">▶</span>
                  </div>
                </div>

                {/* Légende de bas de slide */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 border border-[#0B0B0D] p-3 md:p-4 backdrop-blur-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-0.5">
                    <div className="font-mono text-xs font-bold uppercase text-[#0B0B0D] flex items-center gap-2">
                      <span>{currentSlide.title}</span>
                      <span className="text-[10px] text-[#25D366] font-bold">● VIDÉO ACTIVE</span>
                    </div>
                    <div className="font-sans text-[11px] text-[#56565F]">
                      {currentSlide.description}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#0B0B0D] border border-[#0B0B0D] px-2.5 py-1.5 shrink-0 bg-[#F6F6F8] font-bold">
                    {currentSlide.actionHint}
                  </span>
                </div>
              </div>
            )
          ) : (
            <div className="w-full h-full relative">
              <img
                src={currentSlide.src}
                alt={currentSlide.title}
                className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-700"
              />

              {/* Boutons flèches overlay transparents pour survol rapide */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-white bg-black/40 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 hover:bg-white hover:text-[#0B0B0D] transition-all flex items-center justify-center font-mono text-sm cursor-pointer"
                aria-label="Slide précédent"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-white bg-black/40 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 hover:bg-white hover:text-[#0B0B0D] transition-all flex items-center justify-center font-mono text-sm cursor-pointer"
                aria-label="Slide suivant"
              >
                →
              </button>

              {/* Légende de bas de slide */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 border border-[#0B0B0D] p-3 md:p-4 backdrop-blur-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="space-y-0.5">
                  <div className="font-mono text-xs font-bold uppercase text-[#0B0B0D] flex items-center gap-2">
                    <span>{currentSlide.title}</span>
                    <span className="text-[10px] text-[#56565F] font-mono border border-[#DCDCE2] px-1.5 py-0.5 bg-[#F6F6F8]">
                      {currentSlide.category}
                    </span>
                  </div>
                  <div className="font-sans text-[11px] text-[#56565F]">
                    {currentSlide.description}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#0B0B0D] border border-[#0B0B0D] px-2.5 py-1.5 bg-[#F6F6F8] font-bold">
                    {currentSlide.actionHint}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Barre de navigation basse avec pagination */}
        <div className="px-4 py-2 bg-white border-t border-[#DCDCE2] flex justify-between items-center font-mono text-[10px] text-[#56565F]">
          <div className="flex items-center gap-2">
            <span>SLIDES DU PROJET :</span>
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? "w-8 bg-[#0B0B0D]"
                      : "w-3 bg-[#DCDCE2] hover:bg-[#868691]"
                  }`}
                  aria-label={`Aller à la slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">UTILISEZ LES FLÈCHES ← / → POUR DÉFILER</span>
            <span className="text-[#0B0B0D] font-bold">
              SLIDE 0{currentSlideIndex + 1} / 0{SLIDES.length}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
