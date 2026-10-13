"use client";

import React, { useState } from "react";
import Link from "next/link";
import KitForm from "@/components/KitForm";

interface MasterKit {
  id: string;
  slug: string;
  destinationUrl: string;
  number: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  targetAudience: string;
  tools: string;
  heroImage: string;
  heroTag: string;
  previewThumbnails: { src: string; label: string }[];
  deliverables: string[];
  ctaText: string;
}

const MASTER_KITS: MasterKit[] = [
  {
    id: "studio",
    slug: "studio-shooting-mode",
    destinationUrl: "/studio",
    number: "01",
    badge: "SHOOTING VIRTUEL · ACCESSIBLE",
    title: "Le Kit Studio",
    headline: "Shooting Photo Mode & Fiches E-Commerce",
    description:
      "Transformez une simple photo de votre vêtement prise au smartphone en shooting de mode studio éditorial sans séance photo physique, sans modèle d’agence ni éclairage onéreux.",
    targetAudience: "Idéal pour les marques avec vêtements confectionnés et boutiques e-commerce.",
    tools: "ChatGPT, Gemini ou Claude · Gratuit & Payant",
    heroImage: "/kit-shooting-studio.jpg",
    heroTag: "PLATEAU SHOOTING ÉDITORIAL IA",
    previewThumbnails: [
      { src: "/sample_garment.png", label: "Brut" },
      { src: "/Studio_template/main-full-body-view.png", label: "Plein pied" },
      { src: "/Studio_template/still-back-view.png", label: "Dos 180°" },
      { src: "/Studio_template/still-profile-view.png", label: "Profil 3/4" },
    ],
    deliverables: [
      "Normalisation textile & triptyque sur fond blanc pur (Agent Cloth)",
      "Égérie virtuelle exclusive verrouillée (Mannequin Fatou)",
      "7 cadrages catalogue studio : Plein pied (2:3), Face, Dos 180°, Profil 3/4, Buste, Macro matière",
      "Tutoriel vidéo complet de démonstration en 8 minutes",
    ],
    ctaText: "ACCÉDER AU KIT STUDIO",
  },
  {
    id: "atelier-collection",
    slug: "atelier-collection",
    destinationUrl: "/kits/atelier-collection",
    number: "02",
    badge: "SYSTÈME MASTER V5.3 · AVANCÉ",
    title: "L'Atelier Collection",
    headline: "Directeur de Collection de Mode IA",
    description:
      "Le système complet en 6 étapes ordonnées pour concevoir, structurer, patronner et prototyper toute votre collection, du premier croquis brut au lookbook haute couture final.",
    targetAudience: "Idéal pour les stylistes, directeurs artistiques et marques créant une collection complète.",
    tools: "ChatGPT Plus, Claude 3.7 Sonnet ou Gemini Advanced",
    heroImage: "/kit-atelier-collection.jpg",
    heroTag: "DIRECTION & CONCEPTION DE COLLECTION",
    previewThumbnails: [
      { src: "/etape-01-planche-univers.webp", label: "Univers" },
      { src: "/etape-02-lineup-2d.webp", label: "Plan 2D" },
      { src: "/etape-05-lineup-realiste.webp", label: "Line-up" },
      { src: "/atelier-collection-lookbook-planche.webp", label: "Lookbook" },
    ],
    deliverables: [
      "Étape 01 : Univers de collection, storytelling, moodboard & palette Pantone",
      "Étape 02 : Plan de collection 2D (croquis silhouettes à plat)",
      "Étape 03 : Fiches techniques cotées en cm pour les ateliers et modélistes",
      "Étape 04 : Prototypes portés haute fidélité sur même égérie",
      "Étape 05 : Line-up d'ensemble pour tester l'harmonie globale",
      "Étape 06 : Planche lookbook finale prête pour les acheteurs et la presse",
    ],
    ctaText: "ACCÉDER À L'ATELIER COLLECTION",
  },
];

export default function KitsOverviewPage() {
  const [activeModalKit, setActiveModalKit] = useState<MasterKit | null>(null);

  return (
    <div className="min-h-screen bg-[#F6F6F8] text-[#0B0B0D] font-sans selection:bg-[#0B0B0D] selection:text-white flex flex-col">
      <main className="flex-grow w-full max-w-[1320px] mx-auto px-5 md:px-16 pt-12 pb-24">
        
        {/* ── 1. HEADER SECTION ────────────────────────────────────── */}
        <section className="mb-14 border-b border-[#DCDCE2] pb-10">
          <div className="font-mono text-[10px] md:text-xs text-[#56565F] uppercase tracking-[0.2em] mb-3 font-semibold">
            CATALOGUE DE MÉTHODES OFFICIELLES · FASHIONAI.AGENCY
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl uppercase font-normal tracking-tight text-[#0B0B0D] leading-none mb-4">
                NOS KITS
              </h1>
              <p className="font-sans text-base md:text-lg text-[#56565F] max-w-2xl leading-relaxed">
                Deux méthodologies prêtes à l’emploi pour les créateurs et marques de mode. Choisissez le système correspondant exactement à votre stade de création.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0B0B0D] bg-white border border-[#DCDCE2] px-4 py-2.5 shrink-0 self-start lg:self-end">
              <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
              <span>2 SYSTÈMES VALIDÉS & DISPONIBLES</span>
            </div>
          </div>
        </section>

        {/* ── 2. THE TWO MASTER KITS CARDS ─────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {MASTER_KITS.map((kit) => (
            <article
              key={kit.id}
              className="flex flex-col bg-white border border-[#DCDCE2] hover:border-[#0B0B0D] transition-colors duration-300 overflow-hidden shadow-xs"
            >
              {/* TOP HERO COVER IMAGE (IMAGE 1 & IMAGE 2) */}
              <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative overflow-hidden bg-neutral-100 border-b border-[#DCDCE2]">
                <img
                  src={kit.heroImage}
                  alt={kit.title}
                  className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#0B0B0D]/85 text-white font-mono text-[9px] md:text-[10px] uppercase px-2.5 py-1 tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  <span>{kit.heroTag}</span>
                </div>
              </div>

              {/* THUMBNAILS PREVIEW STRIP */}
              <div className="grid grid-cols-4 border-b border-[#DCDCE2] bg-[#F6F6F8]">
                {kit.previewThumbnails.map((thumb, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-2 border-r last:border-r-0 border-[#DCDCE2] flex items-center gap-2"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 overflow-hidden bg-white border border-[#DCDCE2]">
                      <img
                        src={thumb.src}
                        alt={thumb.label}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#56565F] truncate">
                      {thumb.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CARD BODY */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  {/* BADGES & TOOLS */}
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-mono text-[10px] md:text-[11px] text-[#B7410E] uppercase tracking-[0.16em] font-semibold">
                      {kit.badge}
                    </span>
                    <span className="font-mono text-xs text-[#0B0B0D] font-bold">
                      {kit.number}
                    </span>
                  </div>

                  <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-wider mb-4">
                    {kit.tools}
                  </div>

                  {/* TITLE & HEADLINE */}
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#0B0B0D] font-normal leading-tight mb-1">
                    {kit.title}
                  </h2>
                  <div className="font-mono text-xs text-[#0B0B0D] font-medium tracking-wide uppercase mb-3">
                    {kit.headline}
                  </div>

                  {/* DESCRIPTION */}
                  <p className="font-sans text-sm text-[#56565F] leading-relaxed mb-4">
                    {kit.description}
                  </p>

                  <div className="bg-[#F6F6F8] border border-[#DCDCE2] p-3 mb-6 text-xs font-sans text-[#0B0B0D]">
                    <span className="font-semibold">Pour qui ? </span>
                    <span className="text-[#56565F]">{kit.targetAudience}</span>
                  </div>

                  {/* DELIVERABLES LIST */}
                  <div className="mb-6 border-t border-[#DCDCE2] pt-4">
                    <div className="font-mono text-[10px] text-[#56565F] uppercase tracking-[0.14em] mb-3 font-semibold">
                      CE QUI EST INCLUS DANS LE PROTOCOLE :
                    </div>
                    <ul className="space-y-2">
                      {kit.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 font-sans text-xs text-[#56565F] leading-relaxed">
                          <span className="text-[#0B0B0D] font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CALL TO ACTION BUTTONS */}
                <div className="pt-4 border-t border-[#DCDCE2] flex flex-col sm:flex-row gap-3">
                  <Link
                    href={kit.destinationUrl}
                    className="flex-1 h-13 bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 active:opacity-80 transition-opacity cursor-pointer font-semibold shadow-xs"
                  >
                    <span>{kit.ctaText}</span>
                    <span className="text-sm">→</span>
                  </Link>

                  <button
                    onClick={() => setActiveModalKit(kit)}
                    className="h-13 px-5 border border-[#0B0B0D] text-[#0B0B0D] font-mono text-xs uppercase tracking-wider flex items-center justify-center hover:bg-neutral-100 active:opacity-80 transition-colors cursor-pointer shrink-0"
                    title="Télécharger directement les fichiers sans quitter la page"
                  >
                    TÉLÉCHARGER
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ── 3. FORMATION JEUDI 18H (WHATSAPP STEPHEN) ────────────── */}
        <section className="bg-[#0B0B0D] text-white py-14 px-6 md:px-12 border border-[#0B0B0D] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.18em] mb-2 font-semibold">
              ACCOMPAGNEMENT DIRECT · CHAQUE JEUDI À 18H00 GMT
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug mb-3 text-white">
              Une question sur le choix de votre kit ?
            </h3>
            <p className="font-sans text-sm text-neutral-400 leading-relaxed">
              Séance en direct gratuite sur inscription WhatsApp. Venez avec votre photo ou projet de collection, nous vous guidons vers le flux de travail exact.
            </p>
          </div>

          <a
            href="https://wa.me/2250757512959?text=Bonjour%20Stephen,%20je%20souhaite%20m%27inscrire%20%C3%A0%20la%20s%C3%A9ance%20du%20jeudi%2018h%20sur%20les%20kits%20FashionAI"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#25D366] text-[#0B0B0D] font-mono text-xs font-semibold px-8 py-4 uppercase tracking-widest hover:opacity-90 active:opacity-80 transition-opacity cursor-pointer inline-flex items-center gap-2"
          >
            <span>Réserver ma place sur WhatsApp</span>
            <span>→</span>
          </a>
        </section>

      </main>

      {/* ── 6. DIRECT DOWNLOAD MODAL (IF TRIGGERED) ──────────────── */}
      {activeModalKit && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0D]/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#0B0B0D] max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#DCDCE2] pb-4 mb-6">
              <div>
                <div className="font-mono text-[10px] text-[#B7410E] uppercase font-semibold tracking-[0.14em]">
                  {activeModalKit.badge}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0B0B0D] uppercase mt-1 leading-snug">
                  {activeModalKit.title} : {activeModalKit.headline}
                </h3>
                <p className="font-mono text-[10px] text-[#56565F] uppercase tracking-wider mt-1">
                  {activeModalKit.tools}
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
