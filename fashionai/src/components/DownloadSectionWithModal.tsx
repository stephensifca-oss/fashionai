"use client";

import { useState, useEffect, useCallback } from "react";
import KitForm from "@/components/KitForm";

export default function DownloadSectionWithModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Fermeture par touche Échap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* ── SECTION D'APPEL AU TÉLÉCHARGEMENT SUR LA PAGE ──────────────── */}
      <section
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-[#DCDCE2] pb-14 mb-14"
        id="telechargement"
      >
        {/* Colonne gauche : Détail des 3 pièces */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#56565F] font-bold">
              CE QUI EST LIVRÉ DANS LE BUNDLE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0B0B0D]">
              Recevez les 3 pièces complètes du Directeur de Collection
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed">
              En raison de la richesse du skill, le livrable est structuré selon le protocole officiel : la logique procédurale dans le chargeur d’instructions, la base de connaissances dans le fichier système.
            </p>
          </div>

          <div className="space-y-3 border border-[#DCDCE2] bg-white p-5">
            <div className="flex items-start gap-3 border-b border-[#DCDCE2] pb-3">
              <span className="font-mono text-xs font-bold text-[#0B0B0D] bg-[#F6F6F8] px-2 py-1 border border-[#DCDCE2]">
                01
              </span>
              <div>
                <div className="font-mono text-xs font-bold uppercase text-[#0B0B0D]">
                  CHARGEUR_ATELIER_COLLECTION.txt
                </div>
                <div className="font-sans text-[11px] text-[#56565F] mt-0.5">
                  À coller dans le champ Instructions. Fixe l’ordre imposé, les règles absolues et le carnet de projet.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 border-b border-[#DCDCE2] pb-3">
              <span className="font-mono text-xs font-bold text-[#0B0B0D] bg-[#F6F6F8] px-2 py-1 border border-[#DCDCE2]">
                02
              </span>
              <div>
                <div className="font-mono text-xs font-bold uppercase text-[#0B0B0D]">
                  SYSTEME_ATELIER_COLLECTION.md
                </div>
                <div className="font-sans text-[11px] text-[#56565F] mt-0.5">
                  À déposer dans la section Connaissances. Tous les gabarits de prompts, règles R1-R13 et contrôles.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-mono text-xs font-bold text-[#0B0B0D] bg-[#F6F6F8] px-2 py-1 border border-[#DCDCE2]">
                03
              </span>
              <div>
                <div className="font-mono text-xs font-bold uppercase text-[#0B0B0D]">
                  GUIDE_INSTALLATION_ATELIER_COLLECTION.md
                </div>
                <div className="font-sans text-[11px] text-[#56565F] mt-0.5">
                  Mode d’emploi pas à pas en français et protocole de test en 4 points pour valider l’agent dès le premier essai.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite : Carte d'action avec bouton déclencheur du pop-up */}
        <div className="lg:col-span-6 bg-[#F6F6F8] border border-[#0B0B0D] p-6 md:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-block bg-[#0B0B0D] text-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest font-bold">
              ACCÈS INSTANTANÉ · BUNDLE V5.3
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#0B0B0D]">
              Télécharger le kit complet
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed">
              Cliquez ci-dessous pour ouvrir le formulaire et recevoir immédiatement vos 3 pièces prêtes à l’emploi pour ChatGPT, Claude et Gemini.
            </p>

            <ul className="space-y-2 pt-2 border-t border-[#DCDCE2] font-mono text-xs text-[#0B0B0D]">
              <li className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✓</span>
                <span>3 pièces complètes (Chargeur, Système & Guide)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✓</span>
                <span>Fichiers Markdown & texte universels</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✓</span>
                <span>Procédure de test en 4 points incluse</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="w-full bg-[#0B0B0D] hover:bg-[#B7410E] text-white py-4 px-6 font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] group"
            >
              <span>TÉLÉCHARGER LE KIT COMPLET (GRATUIT)</span>
              <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <p className="font-sans text-[11px] text-center text-[#56565F]">
              Téléchargement direct dans votre navigateur · Aucune carte bancaire requise
            </p>
          </div>
        </div>
      </section>

      {/* ── MODALE POP-UP DU FORMULAIRE ─────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-xl bg-white border border-[#0B0B0D] shadow-2xl p-6 sm:p-8 my-8 animate-in zoom-in-95 duration-200"
          >
            {/* Bouton fermeture */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center text-[#56565F] hover:text-[#0B0B0D] hover:bg-[#F6F6F8] border border-transparent hover:border-[#DCDCE2] transition-colors cursor-pointer font-mono text-lg"
              aria-label="Fermer la fenêtre"
            >
              ✕
            </button>

            {/* En-tête de la modale */}
            <div className="mb-6 pr-8 space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B7410E] font-bold block">
                PACK OFFICIEL · DIRECTEUR DE COLLECTION V5.3
              </span>
              <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl text-[#0B0B0D]">
                Télécharger votre Kit Atelier Collection
              </h3>
              <p className="font-sans text-xs text-[#56565F]">
                Remplissez ce formulaire pour déclencher immédiatement le téléchargement de vos 3 pièces.
              </p>
            </div>

            {/* Formulaire intégré */}
            <div className="border-t border-[#DCDCE2] pt-4">
              <KitForm slug="atelier-collection" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
