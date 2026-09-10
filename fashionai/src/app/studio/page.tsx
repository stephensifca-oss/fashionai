"use client";

import React, { useState, useEffect, useRef } from "react";
import KitForm from "@/components/KitForm";

export default function StudioLandingKitPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<"google" | "chatgpt" | "autres">("google");
  
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
  const [galleryFilter, setGalleryFilter] = useState<"all" | "angles" | "details">("all");

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
      img: "/Studio_template/MAIN%20FULL-BODY%20VIEW.png",
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
      img: "/Studio_template/MAIN%20FULL-BODY%20VIEW.png",
      format: "Plein Pied (9:16)",
    },
    {
      id: "front",
      category: "angles",
      tag: "VUE 02 · FACE",
      title: "Plan Face Catalogue",
      subtitle: "Tombé vertical, bustier asymétrique & symétrie e-commerce",
      img: "/Studio_template/STILL%20FRONT%20VIEW.png",
      format: "Face Studio (9:16)",
    },
    {
      id: "profile",
      category: "angles",
      tag: "VUE 03 · PROFIL",
      title: "Ligne de Profil 90°",
      subtitle: "Continuité de silhouette, basque drapée et tombé pantalon",
      img: "/Studio_template/STILL%20PROFILE%20VIEW.png",
      format: "Profil 90° (9:16)",
    },
    {
      id: "back",
      category: "angles",
      tag: "VUE 04 · DOS",
      title: "Finition Dorsale 180°",
      subtitle: "Bretelles croisées & fermeture éclair invisible dos",
      img: "/Studio_template/STILL%20BACK%20VIEW.png",
      format: "Dos 180° (9:16)",
    },
    {
      id: "bust",
      category: "details",
      tag: "VUE 05 · BUSTE",
      title: "Gros Plan Buste & Porté",
      subtitle: "Fidélité d'incarnation (Fatou), grain de peau & découpe col",
      img: "/Studio_template/BUST%20%26%20FACE%20CLOSE-UP.png",
      format: "Gros Plan (1:1)",
    },
    {
      id: "waist",
      category: "details",
      tag: "VUE 06 · COUPE",
      title: "Détail Taille & Basque",
      subtitle: "Précision du pli asymétrique & texture textile crêpe",
      img: "/Studio_template/WAIST%20%26%20CONSTRUCTION%20CLOSE-UP.png",
      format: "Macro Coupe (1:1)",
    },
    {
      id: "macro",
      category: "details",
      tag: "VUE 07 · FINITION",
      title: "Détail Dos & Corseterie",
      subtitle: "Structure dorsale, surpiqûres et maintien des bretelles",
      img: "/Studio_template/SIGNATURE%20DETAIL%20MACRO.png",
      format: "Macro Matière (1:1)",
    },
  ];

  // Close modals on Escape key or handle lightbox arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFormModalOpen(false);
        setIsVideoModalOpen(false);
        setActiveLightbox(null);
      } else if (e.key === "ArrowLeft") {
        setActiveLightbox((prev) =>
          prev ? { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length } : null
        );
      } else if (e.key === "ArrowRight") {
        setActiveLightbox((prev) =>
          prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  const carouselSlides = [
    {
      id: "video",
      type: "video",
      tag: "01 · DÉMONSTRATION",
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
      image: "/Studio_template/MAIN%20FULL-BODY%20VIEW.png",
      objectFit: "cover" as const,
      details: ["Rendu éditorial 2:3 haute fidélité", "Tombé naturel du tissu", "Prêt pour catalogue et boutique en ligne"],
    },
  ];

  const platformsInfo = {
    google: {
      name: "Google",
      models: "Imagen 3 / Gemini Image / Vertex AI",
      cost: "Gratuit / Pay-as-you-go (~0.03$/image)",
      badge: "Édition Google (Recommandée)",
      description: "Syntaxe optimisée pour Google AI Studio et Vertex AI avec conditionnement multi-images direct.",
    },
    chatgpt: {
      name: "ChatGPT / OpenAI",
      models: "GPT-4o Vision & DALL-E / GPT Image",
      cost: "Inclus dans ChatGPT Plus (~20$/mois)",
      badge: "Édition ChatGPT",
      description: "Prompts conversationnels et descriptifs avec balises @source, @tenue et @perso prêtes à l'emploi.",
    },
    autres: {
      name: "Claude et autres",
      models: "Claude 3.7 / 3.5 Sonnet, Midjourney, Flux.1, Seedream",
      cost: "Inclus Claude Pro / API ou local",
      badge: "Édition Claude & Autres",
      description: "Directives adaptées aux modèles multimodaux Claude (Anthropic), Midjourney v6 (--cref/--sref), et générateurs Flux/Seedream.",
    },
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const activeSlide = carouselSlides[currentSlide];

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
            className="px-5 py-2.5 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Télécharger le kit
          </button>
        </div>
      </header>

      {/* ── MAIN EDITORIAL CONTAINER ──────────────────────────────────── */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-16 md:space-y-24">

        {/* ═════════════════════════════════════════════════════════════════
            01. SECTION PROMESSE & VIDÉO HEADER (Hero Showcase)
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
                className="px-6 py-3 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Télécharger le kit gratuit →
              </button>
              <a
                href="#preuve"
                className="px-6 py-3 border border-[#DCDCE2] bg-white text-[#0B0B0D] font-mono text-xs uppercase tracking-wider hover:border-[#0B0B0D] transition-colors"
              >
                Découvrir les résultats ↓
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
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-mono text-[10px] uppercase tracking-wider transition-colors backdrop-blur-xs flex items-center gap-1.5"
                >
                  {isHeaderPlaying ? "⏸ Pause" : "▶ Lecture"}
                </button>
                <button
                  onClick={toggleHeaderMute}
                  aria-label={isHeaderMuted ? "Activer le son" : "Couper le son"}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-mono text-[10px] uppercase tracking-wider transition-colors backdrop-blur-xs flex items-center gap-1.5"
                >
                  {isHeaderMuted ? "🔇 Activer le son" : "🔊 Son activé"}
                </button>
                <button
                  onClick={toggleFullscreen}
                  aria-label="Plein écran"
                  className="px-2.5 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-mono text-[10px] uppercase transition-colors backdrop-blur-xs"
                >
                  ⛶
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            02. SECTION AVANT / APRÈS (LA PREUVE — Fond perdu, sans cadre)
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
                src="/Studio_template/MAIN%20FULL-BODY%20VIEW.png"
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
            03. GALERIE D'EXEMPLES (SÉRIE MULTI-ANGLES COHÉRENTE)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="border-b border-[#DCDCE2] pb-3 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#56565F]">
                02 · Galerie de Résultats Studio
              </p>
              <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-[#0B0B0D]">
                Exemples issus du même kit (Série Multi-Angles)
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-[#56565F] mr-1 hidden sm:inline">
                Série Complète · {studioGalleryItems.length} Vues Cohérentes
              </span>
              <div className="inline-flex border border-[#DCDCE2] bg-white p-0.5 font-mono text-[10px] uppercase">
                <button
                  onClick={() => setGalleryFilter("all")}
                  className={`px-2.5 py-1 transition-colors ${
                    galleryFilter === "all" ? "bg-[#0B0B0D] text-white font-bold" : "text-[#56565F] hover:text-[#0B0B0D]"
                  }`}
                >
                  Tous (7)
                </button>
                <button
                  onClick={() => setGalleryFilter("angles")}
                  className={`px-2.5 py-1 transition-colors ${
                    galleryFilter === "angles" ? "bg-[#0B0B0D] text-white font-bold" : "text-[#56565F] hover:text-[#0B0B0D]"
                  }`}
                >
                  Silhouettes (4)
                </button>
                <button
                  onClick={() => setGalleryFilter("details")}
                  className={`px-2.5 py-1 transition-colors ${
                    galleryFilter === "details" ? "bg-[#0B0B0D] text-white font-bold" : "text-[#56565F] hover:text-[#0B0B0D]"
                  }`}
                >
                  Gros Plans & Macro (3)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {studioGalleryItems
              .map((item, originalIndex) => ({ item, originalIndex }))
              .filter(({ item }) => galleryFilter === "all" || item.category === galleryFilter)
              .map(({ item, originalIndex }) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightbox({ items: studioGalleryItems, index: originalIndex })}
                  className="bg-white border border-[#DCDCE2] p-3 space-y-3 group hover:border-[#0B0B0D] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div className="aspect-[3/4] bg-[#121214] overflow-hidden relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-2 left-2 bg-[#0B0B0D]/85 text-white font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-white/20">
                      {item.tag}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white/90 font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                      🔍 Agrandir
                    </div>
                  </div>
                  <div className="px-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#0B0B0D]">{item.title}</span>
                      <span className="font-mono text-[9px] text-[#56565F] bg-[#F6F6F8] px-1.5 py-0.5 border border-[#DCDCE2]">
                        {item.format}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-[#56565F] leading-tight line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-white border border-[#DCDCE2] p-3 flex items-center justify-between font-mono text-[11px] text-[#56565F]">
            <span className="flex items-center gap-2">
              <span className="text-[#25D366]">✓</span>
              Même mannequin (Fatou), même studio lumière diffuse cyclorama, même ensemble textile asymétrique.
            </span>
            <span className="hidden md:inline text-[10px] uppercase text-[#56565F]">
              Cliquez sur un visuel pour l’inspecter en haute définition
            </span>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            04. CARROUSEL INTERACTIF : VIDÉO & ÉTAPES DE LA MÉTHODE
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
                {currentSlide + 1} / {carouselSlides.length}
              </span>
              <button
                onClick={prevSlide}
                aria-label="Diapositive précédente"
                className="w-8 h-8 border border-[#DCDCE2] bg-white hover:border-[#0B0B0D] flex items-center justify-center font-mono text-xs transition-colors"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                aria-label="Diapositive suivante"
                className="w-8 h-8 border border-[#DCDCE2] bg-white hover:border-[#0B0B0D] flex items-center justify-center font-mono text-xs transition-colors"
              >
                →
              </button>
            </div>
          </div>

          {/* Slide Tab Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 font-mono text-[11px] uppercase tracking-wider">
            {carouselSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`py-2 px-3 text-left border transition-all ${
                  currentSlide === idx
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
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className={`w-full h-full ${
                    activeSlide.objectFit === "contain" ? "object-contain p-4" : "object-cover"
                  } ${activeSlide.type === "video" ? "opacity-60 group-hover:opacity-75" : ""} transition-opacity duration-500`}
                />

                {activeSlide.type === "video" ? (
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white bg-black/40 hover:bg-black/20 transition-colors"
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
                    {activeSlide.tag}
                  </div>
                )}
              </div>

              {/* Text / Details Right */}
              <div className="md:col-span-6 space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#B7410E]">
                  {activeSlide.tag}
                </div>
                <h3 className="font-mono text-lg md:text-xl font-bold text-[#0B0B0D] leading-snug">
                  {activeSlide.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed">
                  {activeSlide.description}
                </p>

                {activeSlide.details && (
                  <ul className="space-y-1.5 border-t border-[#DCDCE2] pt-3 font-mono text-[11px] text-[#56565F]">
                    {activeSlide.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#25D366]">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pt-2 flex items-center gap-4">
                  {activeSlide.type === "video" ? (
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="px-5 py-2.5 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                    >
                      Lancer la vidéo →
                    </button>
                  ) : (
                    <button
                      onClick={nextSlide}
                      className="px-5 py-2.5 border border-[#0B0B0D] font-mono text-xs uppercase tracking-wider hover:bg-[#0B0B0D] hover:text-white transition-colors"
                    >
                      {currentSlide === carouselSlides.length - 1 ? "Revoir depuis le début" : "Étape suivante →"}
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            05. SÉLECTION DE LA PLATEFORME / MODÈLE UTILISÉ
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="border-b border-[#DCDCE2] pb-2 flex justify-between items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#56565F]">
                04 · Choix du Modèle & Outils
              </p>
              <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-[#0B0B0D]">
                Sélectionnez votre outil pour obtenir la version adaptée
              </h2>
            </div>
            <span className="font-mono text-[11px] text-[#56565F]">3 Versions Disponibles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["google", "chatgpt", "autres"] as const).map((pKey) => {
              const info = platformsInfo[pKey];
              const isSelected = selectedPlatform === pKey;
              return (
                <div
                  key={pKey}
                  onClick={() => setSelectedPlatform(pKey)}
                  className={`cursor-pointer p-5 border transition-all flex flex-col justify-between space-y-4 rounded-none ${
                    isSelected
                      ? "bg-white border-[#0B0B0D] shadow-md ring-1 ring-[#0B0B0D]"
                      : "bg-[#F6F6F8] border-[#DCDCE2] hover:border-[#0B0B0D] hover:bg-white"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm font-bold uppercase text-[#0B0B0D]">
                        {info.name}
                      </span>
                      <span className={`font-mono text-[9px] uppercase px-2 py-0.5 border ${
                        isSelected ? "bg-[#0B0B0D] text-white border-[#0B0B0D]" : "text-[#56565F] border-[#DCDCE2]"
                      }`}>
                        {isSelected ? "Sélectionné" : "Choisir"}
                      </span>
                    </div>

                    <div className="font-mono text-[10px] text-[#25D366] font-bold">
                      {info.cost}
                    </div>

                    <div className="font-mono text-[11px] text-[#0B0B0D] font-medium">
                      {info.models}
                    </div>

                    <p className="font-sans text-xs text-[#56565F] leading-relaxed pt-1">
                      {info.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#DCDCE2] font-mono text-[10px] uppercase text-[#56565F] flex items-center justify-between">
                    <span>Format kit : .md</span>
                    <span className="text-[#0B0B0D] font-bold">Édition {info.name.split(" ")[0]} →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bouton direct lié à la plateforme sélectionnée */}
          <div className="bg-white border border-[#DCDCE2] p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="font-mono text-xs text-[#0B0B0D]">
              <span className="text-[#56565F]">Version configurée :</span>{" "}
              <strong>{platformsInfo[selectedPlatform].badge}</strong>
            </div>
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="px-6 py-3 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Télécharger cette version ({platformsInfo[selectedPlatform].name}) →
            </button>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            06. SECTION NOUVELLE : UN SHOOTING PERSONNALISÉ POUR VOTRE MARQUE ?
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
                Formulaire d’accès · {platformsInfo[selectedPlatform].badge}
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
