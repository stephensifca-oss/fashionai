"use client";

import React, { useState, useEffect, useRef } from "react";
import KitForm from "@/components/KitForm";

export default function StudioLandingKitPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentMethodSlide, setCurrentMethodSlide] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<"google" | "chatgpt" | "claude" | "autres">("google");
  
  // Header Video Player state
  const headerVideoRef = useRef<HTMLVideoElement>(null);
  const [isHeaderMuted, setIsHeaderMuted] = useState(true);
  const [isHeaderPlaying, setIsHeaderPlaying] = useState(true);

  const toggleHeaderPlay = () => {
    if (headerVideoRef.current) {
      if (headerVideoRef.current.paused) {
        headerVideoRef.current.play();
        setIsHeaderPlaying(true);
      } else {
        headerVideoRef.current.pause();
        setIsHeaderPlaying(false);
      }
    }
  };

  const toggleHeaderMute = () => {
    if (headerVideoRef.current) {
      headerVideoRef.current.muted = !headerVideoRef.current.muted;
      setIsHeaderMuted(headerVideoRef.current.muted);
    }
  };

  const toggleFullscreen = () => {
    if (headerVideoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        headerVideoRef.current.requestFullscreen();
      }
    }
  };

  type LightboxItem = {
    tag: string;
    title: string;
    subtitle: string;
    img: string;
    format?: string;
  };

  const [activeLightbox, setActiveLightbox] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  // Gallery slider state & filtering
  const [galleryFilter, setGalleryFilter] = useState<"all" | "angles" | "details">("all");
  const [gallerySlideIndex, setGallerySlideIndex] = useState(0);

  const proofItems: LightboxItem[] = [
    {
      tag: "AVANT · PHOTO SMARTPHONE BRUTE",
      title: "Photo originale brute (Smartphone)",
      subtitle: "Prise de vue smartphone sans studio ni éclairage contrôlé",
      img: "/sample_garment.png",
      format: "Brut Smartphone",
    },
    {
      tag: "APRÈS · PLAN MAÎTRE ÉDITORIAL (2:3)",
      title: "Plan Maître Haute Définition",
      subtitle: "Génération virtuelle Fatou, cyclorama blanc pur et rendu 4K",
      img: "/Studio_template/main-full-body-view.png",
      format: "Plan Maître (2:3)",
    },
  ];

  const studioGalleryItems: (LightboxItem & { id: string; category: "angles" | "details" })[] = [
    {
      id: "full-body",
      category: "angles",
      tag: "VUE 01 · MAÎTRE",
      title: "Plan Maître Éditorial",
      subtitle: "Silhouette complète, posture naturelle & sac bordeaux",
      img: "/Studio_template/main-full-body-view.png",
      format: "Plein Pied (9:16)",
    },
    {
      id: "front",
      category: "angles",
      tag: "VUE 02 · FACE",
      title: "Plan Face Catalogue",
      subtitle: "Tombé vertical, bustier asymétrique & symétrie e-commerce",
      img: "/Studio_template/still-front-view.png",
      format: "Face Studio (9:16)",
    },
    {
      id: "profile",
      category: "angles",
      tag: "VUE 03 · PROFIL",
      title: "Ligne de Profil 90°",
      subtitle: "Continuité de silhouette, basque drapée et tombé pantalon",
      img: "/Studio_template/still-profile-view.png",
      format: "Profil 90° (9:16)",
    },
    {
      id: "back",
      category: "angles",
      tag: "VUE 04 · DOS",
      title: "Finition Dorsale 180°",
      subtitle: "Bretelles croisées & fermeture éclair invisible dos",
      img: "/Studio_template/still-back-view.png",
      format: "Dos 180° (9:16)",
    },
    {
      id: "bust",
      category: "details",
      tag: "VUE 05 · BUSTE",
      title: "Gros Plan Buste & Porté",
      subtitle: "Fidélité d'incarnation (Fatou), grain de peau & découpe col",
      img: "/Studio_template/bust-and-face-closeup.png",
      format: "Gros Plan (1:1)",
    },
    {
      id: "waist",
      category: "details",
      tag: "VUE 06 · COUPE",
      title: "Détail Taille & Basque",
      subtitle: "Précision du pli asymétrique & texture textile crêpe",
      img: "/Studio_template/waist-and-construction-closeup.png",
      format: "Macro Coupe (1:1)",
    },
    {
      id: "macro",
      category: "details",
      tag: "VUE 07 · FINITION",
      title: "Détail Dos & Corseterie",
      subtitle: "Structure dorsale, surpiqûres et maintien des bretelles",
      img: "/Studio_template/signature-detail-macro.png",
      format: "Macro Matière (1:1)",
    },
  ];

  const filteredGalleryItems = studioGalleryItems.filter(
    (item) => galleryFilter === "all" || item.category === galleryFilter
  );

  // Reset slide index when filter changes
  const handleFilterChange = (filter: "all" | "angles" | "details") => {
    setGalleryFilter(filter);
    setGallerySlideIndex(0);
  };

  const nextGallerySlide = () => {
    if (filteredGalleryItems.length === 0) return;
    setGallerySlideIndex((prev) => (prev + 1) % filteredGalleryItems.length);
  };

  const prevGallerySlide = () => {
    if (filteredGalleryItems.length === 0) return;
    setGallerySlideIndex((prev) => (prev - 1 + filteredGalleryItems.length) % filteredGalleryItems.length);
  };

  // Close modals on Escape key or handle lightbox arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFormModalOpen(false);
        setIsVideoModalOpen(false);
        setActiveLightbox(null);
      } else if (e.key === "ArrowLeft") {
        if (activeLightbox) {
          setActiveLightbox((prev) =>
            prev ? { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length } : null
          );
        }
      } else if (e.key === "ArrowRight") {
        if (activeLightbox) {
          setActiveLightbox((prev) =>
            prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : null
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox]);

  const methodSlides = [
    {
      id: "video",
      type: "video",
      tag: "01 · DÉMONSTRATION VIDÉO",
      title: "Le tutoriel complet en 8 minutes",
      description: "Visionnez le flux de travail complet : de l'import d'une photo brute à la génération du prompt maître et au rendu final.",
      image: "/templates/studio_blanc_reference.png",
      actionText: "▶ Lancer la vidéo (Façade légère)",
    },
    {
      id: "etape-1",
      type: "step",
      tag: "02 · ÉTAPE 01 (AGENT CLOTH)",
      title: "Normalisation Triptyque & Découpe Textile",
      description: "L'agent analyse les photos du vêtement pour extraire la matière, le tombé, les coutures et la couleur hexadécimale exacte sur fond blanc pur 16:9.",
      image: "/sample_garment.png",
      objectFit: "contain" as const,
      details: ["Extraction de matière & texture", "Mannequin stylisé + Ghost face & dos", "Conservation des zips et pinces"],
    },
    {
      id: "etape-2",
      type: "step",
      tag: "03 · ÉTAPE 02 (AGENT SWAP)",
      title: "Verrouillage Mannequin & Décor Studio",
      description: "Le prompt maître injecte la fiche d'identité du mannequin sélectionné (ex: Fatou) et les réglages caméra (focale 85mm, ouverture f/2.8, ombre portée).",
      image: "/models/fatou_portrait.jpg",
      objectFit: "cover" as const,
      details: ["Fiche mannequin exclusive (Fatou)", "Éclairage studio cyclorama blanc", "Morphologie et teint réalistes"],
    },
    {
      id: "etape-3",
      type: "step",
      tag: "04 · ÉTAPE 03 (RENDU FINAL)",
      title: "Synthèse Haute Définition du Plan Maître",
      description: "Votre moteur d'image génère le plan de mode maître au ratio 2:3, prêt pour votre e-commerce, lookbook ou campagnes sponsorisées.",
      image: "/Studio_template/main-full-body-view.png",
      objectFit: "cover" as const,
      details: ["Rendu éditorial 2:3 haute fidélité", "Tombé naturel du tissu", "Prêt pour catalogue et boutique en ligne"],
    },
  ];

  const nextMethodSlide = () => {
    setCurrentMethodSlide((prev) => (prev + 1) % methodSlides.length);
  };

  const prevMethodSlide = () => {
    setCurrentMethodSlide((prev) => (prev - 1 + methodSlides.length) % methodSlides.length);
  };

  const activeMethodSlide = methodSlides[currentMethodSlide];

  return (
    <div className="min-h-screen bg-[#F6F6F8] text-[#0B0B0D] flex flex-col font-sans selection:bg-[#0B0B0D] selection:text-white">
      
      {/* ── TOP HEADER / BRAND BAR ────────────────────────────────────── */}
      <header className="w-full h-14 bg-white border-b border-[#DCDCE2] px-6 md:px-12 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center space-x-6">
          <span className="font-serif text-lg tracking-tight font-normal text-[#0B0B0D]">
            fashionai<span className="text-[#B7410E]">.studio</span>
          </span>
          <span className="hidden md:inline-block font-mono text-[10px] tracking-widest text-[#56565F] uppercase border-l border-[#DCDCE2] pl-4">
            Kit Méthode de Shooting Virtuel · V1.0
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsFormModalOpen(true)}
            className="px-5 py-2.5 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Télécharger le kit
          </button>
        </div>
      </header>

      {/* ── MAIN EDITORIAL CONTAINER ──────────────────────────────────── */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-16 md:space-y-24">

        {/* ═════════════════════════════════════════════════════════════════
            00. SECTION PROMESSE & VIDÉO HEADER (Hero Showcase)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-8 pt-4">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-block font-mono text-[11px] uppercase tracking-widest text-[#56565F] border-b border-[#DCDCE2] pb-1">
              MÉTHODE OFFICIELLE & DIRECTIVES IA · V1.0
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0B0B0D] leading-[1.08] tracking-tight">
              Transformez une photo de votre vêtement en plan de mode exploitable.
            </h1>
            <p className="font-sans text-sm md:text-base text-[#56565F] max-w-2xl mx-auto leading-relaxed">
              La méthode exacte pour passer d’une simple photo smartphone à un shooting e-commerce haute couture, sans studio physique ni mannequin sur place.
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <button
                onClick={() => setIsFormModalOpen(true)}
                className="px-6 py-3 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
              >
                Télécharger le kit gratuit →
              </button>
              <a
                href="#preuve"
                className="px-6 py-3 border border-[#DCDCE2] bg-white text-[#0B0B0D] font-mono text-xs uppercase tracking-wider hover:border-[#0B0B0D] transition-colors"
              >
                Découvrir la preuve ↓
              </a>
            </div>
          </div>

          {/* ── HEADER HERO VIDEO PLAYER ─────────────────────────────── */}
          <div className="relative w-full aspect-video bg-[#121214] border border-[#DCDCE2] overflow-hidden shadow-lg group">
            <video
              ref={headerVideoRef}
              src="/shooting-demo.mp4"
              autoPlay
              loop
              muted={isHeaderMuted}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 bg-[#0B0B0D]/85 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 border border-white/20 backdrop-blur-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
              <span>DÉMO OFFICIELLE · SHOOTING VIRTUEL</span>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="hidden sm:inline bg-[#0B0B0D]/85 text-white font-mono text-[9px] uppercase tracking-widest px-2 py-1 border border-white/20 backdrop-blur-xs">
                1080P · 24 FPS
              </span>
            </div>

            {/* Controls Bar on Hover / Bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 md:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="font-mono text-[11px] text-white/90 space-y-0.5">
                <div className="font-bold flex items-center gap-2">
                  <span>Modèle Virtuel Fatou</span>
                  <span className="text-white/40">·</span>
                  <span className="text-[#25D366]">Cyclorama Studio Blanc Pur</span>
                </div>
                <div className="text-[10px] text-neutral-300">
                  Défilé, fluidité du textile & rotation multi-angles
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={toggleHeaderPlay}
                  aria-label={isHeaderPlaying ? "Mettre en pause" : "Lire la vidéo"}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-mono text-[10px] uppercase tracking-wider transition-colors backdrop-blur-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {isHeaderPlaying ? "⏸ Pause" : "▶ Lecture"}
                </button>
                <button
                  onClick={toggleHeaderMute}
                  aria-label={isHeaderMuted ? "Activer le son" : "Couper le son"}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-mono text-[10px] uppercase tracking-wider transition-colors backdrop-blur-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {isHeaderMuted ? "🔇 Activer le son" : "🔊 Son activé"}
                </button>
                <button
                  onClick={toggleFullscreen}
                  aria-label="Plein écran"
                  className="px-2.5 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-mono text-[10px] uppercase transition-colors backdrop-blur-xs cursor-pointer"
                >
                  ⛶
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            01. SECTION AVANT / APRÈS (LA PREUVE)
            ═════════════════════════════════════════════════════════════════ */}
        <section id="preuve" className="space-y-3">
          <div className="flex justify-between items-center font-mono text-[11px] uppercase tracking-wider text-[#56565F] px-1">
            <span>01 · La Preuve</span>
            <span className="hidden sm:inline">Photo originale vs Plan Maître généré · Cliquez pour agrandir</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#DCDCE2] border border-[#DCDCE2] overflow-hidden">
            {/* AVANT */}
            <div
              onClick={() => setActiveLightbox({ items: proofItems, index: 0 })}
              className="relative bg-[#EAEAEA] aspect-[3/4] group flex items-center justify-center overflow-hidden cursor-pointer"
            >
              <img
                src="/sample_garment.png"
                alt="Photo UGC du vêtement"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-[#0B0B0D] text-white font-mono text-[10px] uppercase tracking-widest px-2.5 py-1">
                AVANT · PHOTO SMARTPHONE BRUTE
              </div>
              <div className="absolute bottom-3 right-3 bg-black/75 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs flex items-center gap-1.5 border border-white/20">
                <span>🔍 Agrandir</span>
              </div>
            </div>

            {/* APRÈS */}
            <div
              onClick={() => setActiveLightbox({ items: proofItems, index: 1 })}
              className="relative bg-[#121214] aspect-[3/4] group flex items-center justify-center overflow-hidden cursor-pointer"
            >
              <img
                src="/Studio_template/main-full-body-view.png"
                alt="Plan Maître Haute Définition"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-white text-[#0B0B0D] font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 font-bold">
                APRÈS · PLAN MAÎTRE ÉDITORIAL (2:3)
              </div>
              <div className="absolute bottom-3 right-3 bg-black/75 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs flex items-center gap-1.5 border border-white/20">
                <span>🔍 Agrandir</span>
              </div>
            </div>
          </div>
          <div className="text-center font-mono text-[11px] text-[#56565F] pt-1">
            Même tombé textile, même structure de matière, même colorimétrie exacte.
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            02. SECTION ÉPURÉE : TÉLÉCHARGER LE KIT STUDIO (CONVERSION DIRECTE)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border border-[#0B0B0D] p-6 md:p-10 shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DCDCE2] pb-6">
            <div className="space-y-1 max-w-xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B7410E] font-bold">
                02 · TÉLÉCHARGEMENT GRATUIT DU KIT
              </span>
              <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#0B0B0D]">
                Obtenez le Master Template Studio (V1.0)
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed">
                Le pack complet comprenant le prompt maître, la matrice 7 angles et les fichiers de conditionnement adaptés à votre modèle d’IA.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
              <button
                onClick={() => setIsFormModalOpen(true)}
                className="w-full md:w-auto px-8 py-4 bg-[#0B0B0D] hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Télécharger le kit gratuit</span>
                <span>→</span>
              </button>
              <span className="font-mono text-[10px] text-[#56565F] uppercase">
                Livraison immédiate · Choix de l'outil dans le formulaire
              </span>
            </div>
          </div>

          {/* Badges de ce qui est inclus */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#F6F6F8] border border-[#DCDCE2] p-3 space-y-1">
              <div className="font-mono text-xs font-bold text-[#0B0B0D] flex items-center gap-1.5">
                <span className="text-[#25D366]">✓</span> Master Template
              </div>
              <p className="font-sans text-[11px] text-[#56565F]">Syntaxe normalisée (.md & .json)</p>
            </div>

            <div className="bg-[#F6F6F8] border border-[#DCDCE2] p-3 space-y-1">
              <div className="font-mono text-xs font-bold text-[#0B0B0D] flex items-center gap-1.5">
                <span className="text-[#25D366]">✓</span> 7 Prompts Multi-Angles
              </div>
              <p className="font-sans text-[11px] text-[#56565F]">Silhouettes & gros plans cohérents</p>
            </div>

            <div className="bg-[#F6F6F8] border border-[#DCDCE2] p-3 space-y-1">
              <div className="font-mono text-xs font-bold text-[#0B0B0D] flex items-center gap-1.5">
                <span className="text-[#25D366]">✓</span> Fiche Mannequin Fatou
              </div>
              <p className="font-sans text-[11px] text-[#56565F]">Fiche d’incarnation & éclairage studio</p>
            </div>

            <div className="bg-[#F6F6F8] border border-[#DCDCE2] p-3 space-y-1">
              <div className="font-mono text-xs font-bold text-[#0B0B0D] flex items-center gap-1.5">
                <span className="text-[#25D366]">✓</span> Multi-Modèles IA
              </div>
              <p className="font-sans text-[11px] text-[#56565F]">Google, ChatGPT, Claude, Midjourney</p>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            03. CARROUSEL INTERACTIF : VIDÉO & ÉTAPES DE LA MÉTHODE
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="border-b border-[#DCDCE2] pb-2 flex justify-between items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#56565F]">
                03 · Démonstration & Étapes
              </p>
              <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-[#0B0B0D]">
                La méthode pas à pas
              </h2>
            </div>
            
            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#56565F] mr-2">
                {currentMethodSlide + 1} / {methodSlides.length}
              </span>
              <button
                onClick={prevMethodSlide}
                aria-label="Diapositive précédente"
                className="w-8 h-8 border border-[#DCDCE2] bg-white hover:border-[#0B0B0D] flex items-center justify-center font-mono text-xs transition-colors cursor-pointer"
              >
                ←
              </button>
              <button
                onClick={nextMethodSlide}
                aria-label="Diapositive suivante"
                className="w-8 h-8 border border-[#DCDCE2] bg-white hover:border-[#0B0B0D] flex items-center justify-center font-mono text-xs transition-colors cursor-pointer"
              >
                →
              </button>
            </div>
          </div>

          {/* Slide Tab Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 font-mono text-[11px] uppercase tracking-wider">
            {methodSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentMethodSlide(idx)}
                className={`py-2 px-3 text-left border transition-all cursor-pointer ${
                  currentMethodSlide === idx
                    ? "bg-[#0B0B0D] text-white border-[#0B0B0D] font-bold"
                    : "bg-white text-[#56565F] border-[#DCDCE2] hover:border-[#0B0B0D] hover:text-[#0B0B0D]"
                }`}
              >
                {slide.tag.split(" · ")[0]} · {slide.id === "video" ? "TUTORIEL" : `ÉTAPE ${idx}`}
              </button>
            ))}
          </div>

          {/* Carousel Slide Card */}
          <div className="bg-white border border-[#DCDCE2] p-6 md:p-8 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Media Left */}
              <div className="md:col-span-6 relative aspect-video bg-[#121214] border border-[#DCDCE2] overflow-hidden group flex items-center justify-center">
                <img
                  src={activeMethodSlide.image}
                  alt={activeMethodSlide.title}
                  className={`w-full h-full ${
                    activeMethodSlide.objectFit === "contain" ? "object-contain p-4" : "object-cover"
                  } ${activeMethodSlide.type === "video" ? "opacity-60 group-hover:opacity-75" : ""} transition-opacity duration-500`}
                />

                {activeMethodSlide.type === "video" ? (
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white bg-black/40 hover:bg-black/20 transition-colors cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-white text-[#0B0B0D] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <span className="font-mono text-lg pl-1">▶</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest bg-[#0B0B0D]/80 px-2.5 py-1 border border-white/20">
                      Visionner en 8 min
                    </span>
                  </button>
                ) : (
                  <div className="absolute bottom-3 left-3 bg-[#0B0B0D]/80 text-white font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border border-white/20">
                    {activeMethodSlide.tag}
                  </div>
                )}
              </div>

              {/* Text / Details Right */}
              <div className="md:col-span-6 space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#B7410E]">
                  {activeMethodSlide.tag}
                </div>
                <h3 className="font-mono text-lg md:text-xl font-bold text-[#0B0B0D] leading-snug">
                  {activeMethodSlide.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed">
                  {activeMethodSlide.description}
                </p>

                {activeMethodSlide.details && (
                  <ul className="space-y-1.5 border-t border-[#DCDCE2] pt-3 font-mono text-[11px] text-[#56565F]">
                    {activeMethodSlide.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#25D366]">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pt-2 flex items-center gap-4">
                  {activeMethodSlide.type === "video" ? (
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="px-5 py-2.5 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Lancer la vidéo →
                    </button>
                  ) : (
                    <button
                      onClick={nextMethodSlide}
                      className="px-5 py-2.5 border border-[#0B0B0D] font-mono text-xs uppercase tracking-wider hover:bg-[#0B0B0D] hover:text-white transition-colors cursor-pointer"
                    >
                      {currentMethodSlide === methodSlides.length - 1 ? "Revoir depuis le début" : "Étape suivante →"}
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            04. GALERIE DE RÉSULTATS STUDIO — SLIDER ANIMÉ PAR GROUPE
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="border-b border-[#DCDCE2] pb-3 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#56565F]">
                04 · Galerie de Résultats Studio
              </p>
              <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-[#0B0B0D]">
                Exemples issus du même kit (Série Multi-Angles)
              </h2>
            </div>

            {/* Filter Tabs : TOUS / Silhouettes / Gros plan */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex border border-[#DCDCE2] bg-white p-0.5 font-mono text-[11px] uppercase">
                <button
                  onClick={() => handleFilterChange("all")}
                  className={`px-3 py-1.5 transition-colors cursor-pointer ${
                    galleryFilter === "all" ? "bg-[#0B0B0D] text-white font-bold" : "text-[#56565F] hover:text-[#0B0B0D]"
                  }`}
                >
                  Tous (7)
                </button>
                <button
                  onClick={() => handleFilterChange("angles")}
                  className={`px-3 py-1.5 transition-colors cursor-pointer ${
                    galleryFilter === "angles" ? "bg-[#0B0B0D] text-white font-bold" : "text-[#56565F] hover:text-[#0B0B0D]"
                  }`}
                >
                  Silhouettes (4)
                </button>
                <button
                  onClick={() => handleFilterChange("details")}
                  className={`px-3 py-1.5 transition-colors cursor-pointer ${
                    galleryFilter === "details" ? "bg-[#0B0B0D] text-white font-bold" : "text-[#56565F] hover:text-[#0B0B0D]"
                  }`}
                >
                  Gros plan (3)
                </button>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-1.5 pl-2">
                <button
                  onClick={prevGallerySlide}
                  aria-label="Image précédente"
                  className="w-8 h-8 border border-[#DCDCE2] bg-white hover:border-[#0B0B0D] flex items-center justify-center font-mono text-xs transition-colors cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={nextGallerySlide}
                  aria-label="Image suivante"
                  className="w-8 h-8 border border-[#DCDCE2] bg-white hover:border-[#0B0B0D] flex items-center justify-center font-mono text-xs transition-colors cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* ── ANIMATED SLIDER / CAROUSEL ────────────────────────────── */}
          <div className="relative overflow-hidden bg-white border border-[#DCDCE2] p-4 md:p-6 shadow-sm">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${gallerySlideIndex * 100}%)`,
              }}
            >
              {filteredGalleryItems.map((item, index) => (
                <div
                  key={item.id}
                  className="w-full shrink-0 px-2 sm:px-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Visual Media */}
                    <div
                      onClick={() => setActiveLightbox({ items: filteredGalleryItems, index })}
                      className="md:col-span-7 aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] max-h-[480px] bg-[#121214] overflow-hidden relative cursor-pointer group flex items-center justify-center border border-[#DCDCE2]"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-3 left-3 bg-[#0B0B0D]/85 text-white font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-white/20">
                        {item.tag}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/75 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs flex items-center gap-1.5 border border-white/20">
                        <span>🔍 Agrandir (Plein écran)</span>
                      </div>
                    </div>

                    {/* Card Info & Details */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#B7410E] uppercase tracking-wider">
                            {item.tag}
                          </span>
                          <span className="font-mono text-[10px] text-[#56565F] bg-[#F6F6F8] px-2 py-0.5 border border-[#DCDCE2]">
                            {item.format}
                          </span>
                        </div>
                        <h3 className="font-mono text-xl md:text-2xl font-bold text-[#0B0B0D]">
                          {item.title}
                        </h3>
                      </div>

                      <p className="font-sans text-sm text-[#56565F] leading-relaxed">
                        {item.subtitle}
                      </p>

                      <div className="border-t border-[#DCDCE2] pt-4 space-y-2 font-mono text-[11px] text-[#56565F]">
                        <div className="flex items-center gap-2">
                          <span className="text-[#25D366]">✓</span>
                          <span>Mannequin virtuel Fatou (Fidélité constante)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#25D366]">✓</span>
                          <span>Cyclorama studio blanc pur sans retouche manuelle</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#25D366]">✓</span>
                          <span>Texture textile & tombé asymétrique fidèles</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => setActiveLightbox({ items: filteredGalleryItems, index })}
                          className="px-5 py-2.5 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          Inspecter en HD →
                        </button>
                        <button
                          onClick={nextGallerySlide}
                          className="px-4 py-2.5 border border-[#DCDCE2] bg-white font-mono text-xs uppercase text-[#56565F] hover:border-[#0B0B0D] hover:text-[#0B0B0D] transition-colors cursor-pointer"
                        >
                          Vue suivante →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Thumbnails / Dots */}
            <div className="mt-6 pt-4 border-t border-[#DCDCE2] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                {filteredGalleryItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setGallerySlideIndex(idx)}
                    aria-label={`Aller à la vue ${idx + 1}`}
                    className={`h-2 transition-all rounded-none cursor-pointer ${
                      gallerySlideIndex === idx
                        ? "w-8 bg-[#0B0B0D]"
                        : "w-2 bg-[#DCDCE2] hover:bg-[#56565F]"
                    }`}
                  />
                ))}
              </div>

              <div className="font-mono text-[11px] text-[#56565F]">
                Vue {gallerySlideIndex + 1} sur {filteredGalleryItems.length} · {galleryFilter === "all" ? "Toutes les vues" : galleryFilter === "angles" ? "Silhouettes" : "Gros plans"}
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#DCDCE2] p-3 flex items-center justify-between font-mono text-[11px] text-[#56565F]">
            <span className="flex items-center gap-2">
              <span className="text-[#25D366]">✓</span>
              Même mannequin (Fatou), même studio lumière diffuse cyclorama, même ensemble textile asymétrique.
            </span>
            <span className="hidden md:inline text-[10px] uppercase text-[#56565F]">
              Faites défiler ou cliquez pour agrandir
            </span>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            05. SECTION NOUVELLE : UN SHOOTING PERSONNALISÉ POUR VOTRE MARQUE ?
            ═════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#0B0B0D] text-white p-8 md:p-12 border border-[#0B0B0D] space-y-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#B7410E] bg-white/10 inline-block px-2.5 py-1 border border-white/10">
              ACCOMPAGNEMENT SUR-MESURE & PRODUCTION EN AGENCE
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
              Un shooting personnalisé pour votre marque ?
            </h2>
            <p className="font-sans text-xs md:text-sm text-neutral-300 leading-relaxed">
              Vous préférez nous confier la direction artistique complète de votre collection, avec vos propres mannequins exclusifs et sans manipuler les prompts ? Notre équipe produit vos séries prêtes à l’emploi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/15 pt-8">
            <div className="space-y-2">
              <div className="font-mono text-xs font-bold uppercase text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-white text-[#0B0B0D] flex items-center justify-center text-[10px]">01</span>
                Mannequin Signature Exclusif
              </div>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Création et verrouillage d’un avatar mannequin sur-mesure réservé à votre marque avec droits d’exploitation totale.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-xs font-bold uppercase text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-white text-[#0B0B0D] flex items-center justify-center text-[10px]">02</span>
                Production Complète de Collection
              </div>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Pack shooting de 10 à 50 tenues : Plan Maître face, profil 3/4, dos 180° et gros plans matières calibrés.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-xs font-bold uppercase text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-white text-[#0B0B0D] flex items-center justify-center text-[10px]">03</span>
                Livraison Clé en Main en 48h
              </div>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Visuels haute définition 4K retouchés, prêts pour vos fiches produits Shopify, lookbooks et publicités Meta/TikTok.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://wa.me/2250757512959?text=Bonjour%20Stephen,%20je%20souhaite%20un%20shooting%20personnalis%C3%A9%20pour%20ma%20marque"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[#0B0B0D] font-mono text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Discuter de votre projet sur WhatsApp →</span>
            </a>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
              Devis & cadrage sous 24h · Échange direct avec notre DA (+225 0757512959)
            </span>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            06. FORMATION EN LIGNE DU SAMEDI (MASTERCLASS LIVE)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border border-[#DCDCE2] p-6 md:p-10 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCDCE2] pb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B7410E] font-bold">
                FORMATION EN LIGNE HEBDOMADAIRE · CHAQUE SAMEDI
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#0B0B0D] font-normal mt-1">
                Une masterclass en direct chaque samedi pour maîtriser votre workflow
              </h2>
            </div>
            <div className="shrink-0 font-mono text-[11px] bg-[#25D366]/10 text-[#25D366] font-bold px-3 py-1 border border-[#25D366]/20">
              ● ATELIER OFFERT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs text-[#56565F] leading-relaxed">
            <div className="space-y-1.5">
              <div className="font-mono text-xs font-bold text-[#0B0B0D] uppercase">01 · Débloquez vos prompts</div>
              <p>Vous venez avec vos visuels bruts ou vos difficultés de génération, nous ajustons la syntaxe et les conditionnements en direct.</p>
            </div>
            <div className="space-y-1.5">
              <div className="font-mono text-xs font-bold text-[#0B0B0D] uppercase">02 · Calibrage de studio</div>
              <p>Apprenez à verrouiller l’éclairage, les textures textiles et la morphologie de votre mannequin sur toute une collection.</p>
            </div>
            <div className="space-y-1.5">
              <div className="font-mono text-xs font-bold text-[#0B0B0D] uppercase">03 · Q&amp;A en temps réel</div>
              <p>Posez toutes vos questions techniques et commerciales directement à Stephen pour rentabiliser votre production IA.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://wa.me/2250757512959?text=Bonjour%20Stephen,%20je%20souhaite%20m'inscrire%20%C3%A0%20la%20formation%20en%20ligne%20du%20samedi%20sur%20FashionAI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-[#0B0B0D] font-mono text-xs uppercase tracking-widest font-bold transition-colors inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Je m’inscris à la formation du samedi sur WhatsApp →</span>
            </a>
            <span className="font-mono text-[10px] text-[#56565F] uppercase tracking-wider">
              Nombre de places limité chaque samedi · Inscription gratuite
            </span>
          </div>
        </section>

      </main>

      {/* ═════════════════════════════════════════════════════════════════
          MODAL POPUP : FORMULAIRE DE TÉLÉCHARGEMENT
          ═════════════════════════════════════════════════════════════════ */}
      {isFormModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsFormModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-white border border-[#0B0B0D] p-6 md:p-8 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="absolute top-4 right-4 text-[#56565F] hover:text-[#0B0B0D] font-mono text-xs uppercase tracking-widest p-1 cursor-pointer"
            >
              ✕ Fermer
            </button>

            <div className="mb-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#56565F] mb-1">
                Formulaire d’accès immédiat · Master Template Studio
              </div>
              <h2 className="font-mono text-lg md:text-xl font-bold uppercase text-[#0B0B0D]">
                Recevoir le Kit Shooting Mode V1.0
              </h2>
            </div>

            <KitForm slug="studio-shooting-mode" initialPlatform={selectedPlatform} />
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          MODAL VIDÉO (SI CLIQUÉ)
          ═════════════════════════════════════════════════════════════════ */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <video
              className="w-full h-full object-contain"
              src="/shooting-demo.mp4"
              controls
              autoPlay
              playsInline
            />
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-9 right-0 text-white font-mono text-xs uppercase tracking-widest hover:underline cursor-pointer"
            >
              ✕ Fermer
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          MODAL LIGHTBOX : INSPECTION HD DES VISUELS
          ═════════════════════════════════════════════════════════════════ */}
      {activeLightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton Fermer */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute -top-10 right-0 text-white font-mono text-xs uppercase tracking-widest hover:text-neutral-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>✕ Fermer (Échap)</span>
            </button>

            {/* Image en grand */}
            <div className="relative border border-white/20 bg-[#121214] overflow-hidden max-h-[75vh] flex items-center justify-center shadow-2xl">
              <img
                src={activeLightbox.items[activeLightbox.index].img}
                alt={activeLightbox.items[activeLightbox.index].title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Légende & Navigation */}
            <div className="w-full mt-3 flex items-center justify-between text-white font-mono text-xs px-1 gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="bg-white text-[#0B0B0D] px-2 py-0.5 text-[10px] font-bold">
                    {activeLightbox.items[activeLightbox.index].tag}
                  </span>
                  <span className="font-bold">{activeLightbox.items[activeLightbox.index].title}</span>
                </div>
                <div className="text-neutral-400 font-sans text-[11px]">
                  {activeLightbox.items[activeLightbox.index].subtitle}
                </div>
              </div>

              {activeLightbox.items.length > 1 && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      setActiveLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              index: (prev.index - 1 + prev.items.length) % prev.items.length,
                            }
                          : null
                      )
                    }
                    className="px-3 py-1.5 border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    ←
                  </button>
                  <span className="text-[11px] text-neutral-400">
                    {activeLightbox.index + 1} / {activeLightbox.items.length}
                  </span>
                  <button
                    onClick={() =>
                      setActiveLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              index: (prev.index + 1) % prev.items.length,
                            }
                          : null
                      )
                    }
                    className="px-3 py-1.5 border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER & RÉSEAUX SOCIAUX DE STEPHEN ───────────────────────── */}
      <footer className="w-full bg-white border-t border-[#DCDCE2] py-8 px-6 md:px-12 mt-16 text-center">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[11px] text-[#56565F]">
          <div>
            © 2026 FashionAI Agency · Tous droits réservés.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <a href="https://wa.me/2250757512959" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold hover:underline">
              WhatsApp (+225 0757512959)
            </a>
            <span>·</span>
            <a href="https://www.instagram.com/stephenkniaexpert/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0B0B0D] transition-colors">
              Instagram
            </a>
            <span>·</span>
            <a href="https://www.facebook.com/Stephenkniaexpert" target="_blank" rel="noopener noreferrer" className="hover:text-[#0B0B0D] transition-colors">
              Facebook
            </a>
            <span>·</span>
            <a href="https://www.tiktok.com/@stephenkn_ia_expert" target="_blank" rel="noopener noreferrer" className="hover:text-[#0B0B0D] transition-colors">
              TikTok
            </a>
            <span>·</span>
            <a href="https://www.youtube.com/@stephenknIAexpert" target="_blank" rel="noopener noreferrer" className="hover:text-[#0B0B0D] transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
