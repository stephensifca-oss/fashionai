import DownloadSectionWithModal from "@/components/DownloadSectionWithModal";
import LookbookHeroSlide from "@/components/LookbookHeroSlide";
import CollectionStepsWithModal from "@/components/CollectionStepsWithModal";
import VideoSection from "@/components/VideoSection";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier Collection · Directeur de Collection de Mode IA",
  description: "Dessinez une collection complète de mode, de l'univers au lookbook puis au patronnage en 7 étapes ordonnées. Directeur de collection IA pour stylistes, marques et écoles.",
};

export default function AtelierCollectionPage() {
  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12">
      
      {/* ── 1. PROMESSE ────────────────────────────────────────────────── */}
      <section className="border-b border-[#DCDCE2] pb-8 mb-10">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#56565F] mb-3">
          <span>PHOTO · AVANCÉ</span>
          <span>·</span>
          <span>DIRECTEUR DE COLLECTION V5.3</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B0B0D] leading-[1.08] max-w-4xl tracking-tight">
          Dessinez une collection complète, de l’idée au lookbook.
        </h1>
        <p className="font-sans text-sm md:text-base text-[#56565F] mt-4 max-w-2xl leading-relaxed">
          L’IA sait sortir une belle image de mode, mais pas tenir une collection sur douze looks. Ce kit installe un directeur de collection dans votre assistant pour verrouiller votre ADN, vos coupes et votre muse du premier croquis jusqu’au dossier final.
        </p>
      </section>

      {/* ── 2. PREUVE PRINCIPALE : LE SLIDE / LOOKBOOK PLEIN CADRE EN VIDÉO ── */}
      <LookbookHeroSlide />


      {/* ── 3. LES SEPT ÉTAPES NUMÉROTÉES AVEC POP-UP DÉTAILLÉE ──────────── */}
      <CollectionStepsWithModal />

      {/* ── 4. VIDÉO DE DÉMONSTRATION (FAÇADE CLIQUABLE - LCP PRESERVÉ) ─── */}
      <VideoSection />

      {/* ── 5. ZONE DE TÉLÉCHARGEMENT AVEC BOUTON & FORMULAIRE EN POP-UP ── */}
      <DownloadSectionWithModal />

      {/* ── 6. COLLABORATION : MARQUES, ATELIERS & ÉCOLES DE MODE ───────── */}
      <section className="w-full bg-[#0B0B0D] text-white p-8 md:p-12 border border-[#0B0B0D]">
        <div className="max-w-3xl space-y-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#25D366] font-bold bg-white/10 inline-block px-2.5 py-1">
            COLLABORATION · MARQUES &amp; ÉCOLES DE MODE
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">
            Vous préparez votre prochaine collection ou formez de futurs talents ?
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-300 leading-relaxed">
            Que vous dirigiez une marque de mode, un atelier ou une filière de création, nous formons vos équipes et intégrons ce protocole en 7 étapes sous forme de workshop intensif ou d’accompagnement sur-mesure.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/2250757512959?text=Bonjour%20Stephen,%20je%20souhaite%20%C3%A9changer%20sur%20un%20accompagnement%20ou%20workshop%20autour%20du%20kit%20Atelier%20Collection%20pour%20mon%20projet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-[#0B0B0D] px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors cursor-pointer"
            >
              <span>Échanger sur votre projet sur WhatsApp (+225 07 57 51 29 59) →</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
