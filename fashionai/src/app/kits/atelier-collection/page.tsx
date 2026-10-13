import KitForm from "@/components/KitForm";
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

      {/* ── 5. ZONE DE TÉLÉCHARGEMENT & FORMULAIRE ───────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-[#DCDCE2] pb-14 mb-14" id="telechargement">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#56565F] font-bold">
              CE QUI EST LIVRÉ DANS LE BUNDLE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0B0B0D]">
              Recevez les 3 pièces complètes du Directeur de Collection
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed">
              En raison de la richesse du skill (57 432 caractères), le livrable est découpé selon le protocole officiel : la logique procédurale dans le chargeur court, la base de connaissances dans le fichier système.
            </p>
          </div>

          <div className="space-y-3 border border-[#DCDCE2] bg-white p-5">
            <div className="flex items-start gap-3 border-b border-[#DCDCE2] pb-3">
              <span className="font-mono text-xs font-bold text-[#0B0B0D] bg-[#F6F6F8] px-2 py-1 border border-[#DCDCE2]">01</span>
              <div>
                <div className="font-mono text-xs font-bold uppercase text-[#0B0B0D]">
                  CHARGEUR_ATELIER_COLLECTION.txt (&lt; 8 000 car.)
                </div>
                <div className="font-sans text-[11px] text-[#56565F]">
                  À coller dans le champ Instructions. Fixe l’ordre imposé, les règles absolues et le carnet de projet.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 border-b border-[#DCDCE2] pb-3">
              <span className="font-mono text-xs font-bold text-[#0B0B0D] bg-[#F6F6F8] px-2 py-1 border border-[#DCDCE2]">02</span>
              <div>
                <div className="font-mono text-xs font-bold uppercase text-[#0B0B0D]">
                  SYSTEME_ATELIER_COLLECTION.md (~ 50 000 car.)
                </div>
                <div className="font-sans text-[11px] text-[#56565F]">
                  À déposer dans la section Connaissances. Tous les gabarits de prompts, règles R1-R13 et contrôles.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono text-xs font-bold text-[#0B0B0D] bg-[#F6F6F8] px-2 py-1 border border-[#DCDCE2]">03</span>
              <div>
                <div className="font-mono text-xs font-bold uppercase text-[#0B0B0D]">
                  GUIDE_INSTALLATION_ATELIER_COLLECTION.md
                </div>
                <div className="font-sans text-[11px] text-[#56565F]">
                  Mode d’emploi pas à pas en français et protocole de test en 4 points pour valider l’agent dès le premier essai.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-[#0B0B0D] p-6 md:p-8">
          <h3 className="font-serif text-2xl text-[#0B0B0D] mb-1">
            Télécharger le kit complet
          </h3>
          <p className="font-sans text-xs text-[#56565F] mb-6">
            Remplissez ce formulaire pour déclencher immédiatement le téléchargement des 3 pièces.
          </p>
          <KitForm slug="atelier-collection" />
        </div>
      </section>

      {/* ── 6. LE CHEMIN ÉCOLE (BLOC DISTINCT ENCRE - AC0-11) ───────────── */}
      <section className="w-full bg-[#0B0B0D] text-white p-8 md:p-12 border border-[#0B0B0D]">
        <div className="max-w-3xl space-y-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#25D366] font-bold bg-white/10 inline-block px-2.5 py-1">
            ÉCOLE DE MODE · FILIÈRE CRÉATION
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">
            Vos étudiants doivent rendre une collection ?
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-300 leading-relaxed">
            Le kit fonctionne parfaitement en format capsule — 2 à 6 looks — et sa méthode est conçue pour être enseignée et répliquée par une classe entière sur un semestre. Échangeons sur WhatsApp pour mettre en place une formation dédiée à vos promotions.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/2250757512959?text=Bonjour%20Stephen,%20je%20repr%C3%A9sente%20une%20%C3%A9cole%20de%20mode%20et%20je%20souhaite%20%C3%A9changer%20sur%20le%20kit%20Atelier%20Collection%20pour%20nos%20%C3%A9tudiants"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-[#0B0B0D] px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors cursor-pointer"
            >
              <span>En parler sur WhatsApp (+225 07 57 51 29 59) →</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
