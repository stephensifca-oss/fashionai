"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { generateKitMarkdown } from "@/lib/kit-generator";

import { useParams } from "next/navigation";
import { qualifyLeadAction } from "@/app/actions/lead";

export default function MerciContent() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const isAtelierCollection = slug === "atelier-collection";

  const searchParams = useSearchParams();
  const token = searchParams.get("t");
  const initialCode = searchParams.get("code") || "A7K2M";
  const platform = searchParams.get("platform") || "google";
  
  const hasAutoDownloaded = useRef(false);
  const [waCode] = useState(initialCode);
  const [kitBlobUrl, setKitBlobUrl] = useState<string>("#");

  // État qualification différée
  const [modePrefere, setModePrefere] = useState<"direct" | "carnet">("direct");
  const [qualificationSubmitted, setQualificationSubmitted] = useState(false);
  const [qualificationLoading, setQualificationLoading] = useState(false);

  useEffect(() => {
    if (!isAtelierCollection) {
      const md = generateKitMarkdown(platform);
      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      setKitBlobUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [platform, isAtelierCollection]);

  let kitFilename = "SHOOTING_IA_GEMINI.md";
  if (platform === "claude") kitFilename = "SHOOTING_IA_CLAUDE.md";
  else if (platform === "chatgpt") kitFilename = "SHOOTING_IA_CHAT-GPT.md";

  const dlModelUrl = "/models/fatou_character_sheet.png";
  const dlTenueUrl = "/models/tenue-test.jpg";

  // URL des fichiers ZIP Atelier Collection selon le modèle
  let atelierZipUrl = "/atelier-collection_Gemini_V5.3.zip";
  let atelierZipName = "atelier-collection_Gemini_V5.3.zip";
  let modelLabel = "Google Gemini";

  if (platform === "chatgpt") {
    atelierZipUrl = "/atelier-collection_ChatGPT_V5.3.zip";
    atelierZipName = "atelier-collection_ChatGPT_V5.3.zip";
    modelLabel = "ChatGPT";
  } else if (platform === "claude") {
    atelierZipUrl = "/atelier-collection_Claude_V5.3.zip";
    atelierZipName = "atelier-collection_Claude_V5.3.zip";
    modelLabel = "Claude";
  }

  // Lancement automatique du téléchargement
  useEffect(() => {
    if (token && !hasAutoDownloaded.current) {
      if (isAtelierCollection) {
        hasAutoDownloaded.current = true;
        const link = document.createElement("a");
        link.href = atelierZipUrl;
        link.download = atelierZipName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (kitBlobUrl !== "#") {
        hasAutoDownloaded.current = true;

        // 1. Lancement du Kit .md
        const linkKit = document.createElement("a");
        linkKit.href = kitBlobUrl;
        linkKit.download = kitFilename;
        document.body.appendChild(linkKit);
        linkKit.click();
        document.body.removeChild(linkKit);

        // 2. Lancement de la Planche Mannequin Fatou (@perso)
        const timer1 = setTimeout(() => {
          const linkModel = document.createElement("a");
          linkModel.href = dlModelUrl;
          linkModel.download = "perso.png";
          document.body.appendChild(linkModel);
          linkModel.click();
          document.body.removeChild(linkModel);
        }, 350);

        // 3. Lancement de la Tenue Test (@tenue)
        const timer2 = setTimeout(() => {
          const linkTenue = document.createElement("a");
          linkTenue.href = dlTenueUrl;
          linkTenue.download = "tenue.jpg";
          document.body.appendChild(linkTenue);
          linkTenue.click();
          document.body.removeChild(linkTenue);
        }, 700);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }
  }, [token, kitBlobUrl, dlModelUrl, dlTenueUrl, platform, isAtelierCollection]);

  return (
    <div className="min-h-screen bg-[#F6F6F8] text-[#0B0B0D] flex flex-col font-sans selection:bg-[#0B0B0D] selection:text-white">
      
      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <header className="w-full h-14 bg-white border-b border-[#DCDCE2] px-6 md:px-12 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center space-x-6">
          <Link href="/studio" className="font-serif text-lg tracking-tight font-normal text-[#0B0B0D]">
            fashionai<span className="text-[#B7410E]">.agency</span>
          </Link>
          <span className="hidden md:inline-block font-mono text-[10px] tracking-widest text-[#56565F] uppercase border-l border-[#DCDCE2] pl-4">
            Confirmation d’accès · Code [{waCode}]
          </span>
        </div>

        <div>
          <Link
            href="/studio"
            className="font-mono text-xs text-[#56565F] hover:text-[#0B0B0D] transition-colors"
          >
            ← Retour au studio
          </Link>
        </div>
      </header>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-12 md:space-y-16">

        {/* ═════════════════════════════════════════════════════════════════
            01. SECTION CONFIRMATION & TÉLÉCHARGEMENT AUTOMATIQUE
            ═════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border border-[#DCDCE2] p-8 md:p-12 text-center space-y-6 shadow-sm">
          <div className="w-14 h-14 bg-[#0B0B0D] text-white flex items-center justify-center mx-auto font-mono text-2xl shadow-md">
            ✓
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#25D366] font-bold bg-[#25D366]/10 px-3 py-1 border border-[#25D366]/20">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
              <span>{isAtelierCollection ? `Téléchargement du pack ${modelLabel} en cours` : "Téléchargement automatique en cours"}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0B0B0D] leading-tight">
              {isAtelierCollection 
                ? `Votre Pack Atelier Collection (${modelLabel}) se télécharge.`
                : "Merci ! Vos fichiers de shooting sont en cours de téléchargement."}
            </h1>
            <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed">
              {isAtelierCollection ? (
                <>Le pack complet <strong>Atelier Collection V5.3 (Édition {modelLabel})</strong> contenant le <strong>Chargeur</strong>, le <strong>Fichier Système</strong> et le <strong>Guide d’Installation</strong> arrive dans votre navigateur au format .zip.</>
              ) : (
                <>Le <strong>Kit d’instructions IA (Édition {platform.toUpperCase()})</strong>, la <strong>Photo HD du Mannequin (@perso)</strong> et une <strong>Tenue de test (@tenue)</strong> se téléchargent automatiquement dans votre navigateur.</>
              )}
            </p>
          </div>

          {/* Boutons d'action / Liens de secours */}
          <div className="border-t border-[#DCDCE2] pt-6 space-y-4">
            <p className="font-mono text-[11px] text-[#56565F] uppercase tracking-wider">
              Le fichier ne s’est pas lancé automatiquement ?
            </p>
            {isAtelierCollection ? (
              <div className="space-y-4">
                <div className="flex flex-wrap justify-center items-center gap-3 font-mono text-xs">
                  <a
                    href={atelierZipUrl}
                    download={atelierZipName}
                    className="px-6 py-3.5 bg-[#0B0B0D] text-white hover:bg-[#B7410E] transition-colors uppercase tracking-wider text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>⬇ Télécharger le Pack {modelLabel} (.zip)</span>
                  </a>
                </div>

                {/* Télécharger les autres éditions */}
                <div className="pt-3 border-t border-[#DCDCE2] text-center space-y-2">
                  <p className="font-mono text-[10px] text-[#56565F] uppercase tracking-wider">
                    Besoin d’une autre version pour un assistant différent ?
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-2 font-mono text-[11px]">
                    <a
                      href="/atelier-collection_ChatGPT_V5.3.zip"
                      download="atelier-collection_ChatGPT_V5.3.zip"
                      className={`px-3 py-1.5 border transition-colors ${
                        platform === "chatgpt" 
                          ? "bg-[#0B0B0D] text-white border-[#0B0B0D]" 
                          : "bg-white text-[#0B0B0D] border-[#DCDCE2] hover:border-[#0B0B0D]"
                      }`}
                    >
                      Édition ChatGPT (.zip)
                    </a>
                    <a
                      href="/atelier-collection_Gemini_V5.3.zip"
                      download="atelier-collection_Gemini_V5.3.zip"
                      className={`px-3 py-1.5 border transition-colors ${
                        platform === "google" 
                          ? "bg-[#0B0B0D] text-white border-[#0B0B0D]" 
                          : "bg-white text-[#0B0B0D] border-[#DCDCE2] hover:border-[#0B0B0D]"
                      }`}
                    >
                      Édition Gemini (.zip)
                    </a>
                    <a
                      href="/atelier-collection_Claude_V5.3.zip"
                      download="atelier-collection_Claude_V5.3.zip"
                      className={`px-3 py-1.5 border transition-colors ${
                        platform === "claude" 
                          ? "bg-[#0B0B0D] text-white border-[#0B0B0D]" 
                          : "bg-white text-[#0B0B0D] border-[#DCDCE2] hover:border-[#0B0B0D]"
                      }`}
                    >
                      Édition Claude (.zip)
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center items-center gap-3 font-mono text-xs">
                <a
                  href={kitBlobUrl}
                  download={kitFilename}
                  className="px-5 py-3 bg-[#0B0B0D] text-white hover:bg-neutral-800 transition-colors uppercase tracking-wider text-[11px] font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>⬇ 1. Télécharger le Kit Prompt (.MD)</span>
                </a>
                <a
                  href={dlModelUrl}
                  download="perso.png"
                  className="px-5 py-3 border border-[#0B0B0D] bg-white text-[#0B0B0D] hover:bg-[#0B0B0D] hover:text-white transition-colors uppercase tracking-wider text-[11px] font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>⬇ 2. Télécharger la Photo Mannequin</span>
                </a>
                <a
                  href={dlTenueUrl}
                  download="tenue.jpg"
                  className="px-5 py-3 border border-[#0B0B0D] bg-white text-[#0B0B0D] hover:bg-[#0B0B0D] hover:text-white transition-colors uppercase tracking-wider text-[11px] font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>⬇ 3. Télécharger la Tenue Test</span>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            01 BIS. QUALIFICATION DIFFÉRÉE (AC0-6) POUR ATELIER COLLECTION
            ═════════════════════════════════════════════════════════════════ */}
        {isAtelierCollection && (
          <section className="bg-white border border-[#DCDCE2] p-6 md:p-8 space-y-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#56565F] font-bold">
                Question facultative pour personnaliser votre suivi
              </span>
              <h2 className="font-serif text-xl md:text-2xl text-[#0B0B0D]">
                Quel mode comptez-vous utiliser chez vous ?
              </h2>
              <p className="font-sans text-xs text-[#56565F]">
                Cela nous aide à vous orienter lors de la session de samedi si vous avez une question d’outillage.
              </p>
            </div>

            {qualificationSubmitted ? (
              <div className="p-3 bg-[#F6F6F8] border border-[#DCDCE2] font-mono text-xs text-[#25D366] font-bold flex items-center gap-2">
                <span>✓ Préférence enregistrée ({modePrefere === "direct" ? "Mode Direct" : "Mode Carnet"}). Merci !</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    setModePrefere("direct");
                    setQualificationLoading(true);
                    if (token) {
                      await qualifyLeadAction({ token, mode_prefere: "direct" });
                    }
                    setQualificationLoading(false);
                    setQualificationSubmitted(true);
                  }}
                  disabled={qualificationLoading}
                  className="flex-1 p-3 text-left border border-[#DCDCE2] hover:border-[#0B0B0D] transition-colors cursor-pointer bg-[#F6F6F8]"
                >
                  <div className="font-mono text-xs font-bold text-[#0B0B0D] uppercase mb-1">
                    Mode Direct ★
                  </div>
                  <div className="font-sans text-[11px] text-[#56565F]">
                    Génération et planches automatiques dans ChatGPT / Gemini (avec Python).
                  </div>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    setModePrefere("carnet");
                    setQualificationLoading(true);
                    if (token) {
                      await qualifyLeadAction({ token, mode_prefere: "carnet" });
                    }
                    setQualificationLoading(false);
                    setQualificationSubmitted(true);
                  }}
                  disabled={qualificationLoading}
                  className="flex-1 p-3 text-left border border-[#DCDCE2] hover:border-[#0B0B0D] transition-colors cursor-pointer bg-[#F6F6F8]"
                >
                  <div className="font-mono text-xs font-bold text-[#0B0B0D] uppercase mb-1">
                    Mode Carnet
                  </div>
                  <div className="font-sans text-[11px] text-[#56565F]">
                    Génération externe dans mes propres générateurs (Midjourney, Seedream) + montage Canva.
                  </div>
                </button>
              </div>
            )}
          </section>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            02. SECTION INVITATION À COLLABORER & ÉCHANGES WHATSAPP (+225 0757512959)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="border-b border-[#DCDCE2] pb-3 text-center md:text-left space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#56565F]">
              Accompagnement &amp; Direction Artistique
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#0B0B0D]">
              Donnons vie à vos shootings de collection.
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#56565F]">
              Vous souhaitez un mannequin exclusif pour votre marque, une production complète de collection, ou un accompagnement direct sur vos prompts ? Échangeons directement sur WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* INTENTION 1 : SHOOTING SUR-MESURE */}
            <a
              href={`https://wa.me/2250757512959?text=Bonjour%20Stephen,%20je%20souhaite%20un%20shooting%20personnalis%C3%A9%20pour%20ma%20marque%20%E2%80%94%20code%20${waCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B0B0D] text-white p-6 flex flex-col justify-between space-y-5 border border-[#0B0B0D] hover:bg-neutral-900 transition-colors group shadow-sm cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#25D366] font-bold bg-white/10 inline-block px-2 py-0.5">
                  ★ Projet Clé en Main
                </div>
                <div className="font-mono text-sm font-bold uppercase text-white">
                  Shooting personnalisé de collection
                </div>
                <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                  Création de votre mannequin signature exclusif, pack shooting de 10 à 50 tenues et visuels 4K retouchés livrés sous 48h.
                </p>
              </div>
              <div className="font-mono text-xs text-[#25D366] underline group-hover:no-underline pt-2">
                Discuter de votre projet sur WhatsApp →
              </div>
            </a>

            {/* INTENTION 2 : FORMATION EN LIGNE DU SAMEDI */}
            <a
              href={`https://wa.me/2250757512959?text=Bonjour%20Stephen,%20je%20m'inscris%20%C3%A0%20la%20formation%20en%20ligne%20du%20samedi%20%E2%80%94%20code%20${waCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0B0B0D] p-6 flex flex-col justify-between space-y-5 border border-[#DCDCE2] hover:border-[#0B0B0D] transition-colors group shadow-sm cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#56565F] bg-[#F6F6F8] inline-block px-2 py-0.5 border border-[#DCDCE2]">
                  Masterclass du Samedi
                </div>
                <div className="font-mono text-sm font-bold uppercase text-[#0B0B0D]">
                  Participer à la formation du samedi
                </div>
                <p className="font-sans text-xs text-[#56565F] leading-relaxed">
                  Session live hebdomadaire chaque samedi pour analyser vos rendus, calibrer vos lumières et débloquer les prompts en direct.
                </p>
              </div>
              <div className="font-mono text-xs text-[#0B0B0D] underline group-hover:no-underline pt-2 font-bold">
                Réserver ma place (Code : {waCode}) →
              </div>
            </a>

            {/* INTENTION 3 : DÉBLOCAGE TECHNIQUE & QUESTIONS */}
            <a
              href={`https://wa.me/2250757512959?text=Bonjour%20Stephen,%20je%20suis%20bloqu%C3%A9%20sur%20une%20%C3%A9tape%20du%20kit%20%E2%80%94%20code%20${waCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0B0B0D] p-6 flex flex-col justify-between space-y-5 border border-[#DCDCE2] hover:border-[#0B0B0D] transition-colors group shadow-sm cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#56565F] bg-[#F6F6F8] inline-block px-2 py-0.5 border border-[#DCDCE2]">
                  Support Direct DA
                </div>
                <div className="font-mono text-sm font-bold uppercase text-[#0B0B0D]">
                  Débloquer une étape ou poser une question
                </div>
                <p className="font-sans text-xs text-[#56565F] leading-relaxed">
                  « Le premier essai rate souvent. C’est normal — écrivez-moi sur WhatsApp, on le débloque ensemble. »
                </p>
              </div>
              <div className="font-mono text-xs text-[#0B0B0D] underline group-hover:no-underline pt-2 font-bold">
                Écrire à notre DA →
              </div>
            </a>

          </div>
        </section>

      </main>

      {/* ── FOOTER & RÉSEAUX SOCIAUX DE STEPHEN ───────────────────────── */}
      <footer className="w-full bg-white border-t border-[#DCDCE2] py-8 px-6 md:px-12 mt-16 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[11px] text-[#56565F]">
          <div>© 2026 FashionAI Agency · Tous droits réservés.</div>
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
