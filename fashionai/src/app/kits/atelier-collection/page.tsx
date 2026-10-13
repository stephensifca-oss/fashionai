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

      {/* ── 4. LE LINE-UP PLEINE LARGEUR & COHÉRENCE ─────────────────────── */}
      <section className="border-b border-[#DCDCE2] pb-12 mb-12">
        <div className="mb-4">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#56565F] block mb-1">
            COHÉRENCE VISUELLE ABSOLUE
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#0B0B0D]">
            Le line-up réaliste : même muse, même décor, même lumière
          </h2>
        </div>

        <div className="border border-[#DCDCE2] bg-white p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 1, src: "/Studio_template/STILL FRONT VIEW.png", label: "LOOK 01 · ROBE FONDATRICE" },
              { id: 2, src: "/Studio_template/STILL PROFILE VIEW.png", label: "LOOK 02 · ENSEMBLE TAILLEUR" },
              { id: 3, src: "/Studio_template/STILL BACK VIEW.png", label: "LOOK 03 · MANTEAU DRAPÉ" },
              { id: 4, src: "/Studio_template/MAIN FULL-BODY VIEW.png", label: "LOOK 04 · PIÈCE FORTE" },
            ].map((look) => (
              <div key={look.id} className="border border-[#DCDCE2] bg-[#F6F6F8] p-2 flex flex-col gap-2">
                <div className="aspect-[2/3] w-full overflow-hidden">
                  <img src={look.src} alt={look.label} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#0B0B0D] truncate">
                  {look.label}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-[#DCDCE2] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-[11px] text-[#56565F]">
            <span>Médaillons ADN circulaires posés par code sur chaque vue de face.</span>
            <span className="uppercase text-[#0B0B0D] font-bold">Zéro dérive de carnation ou de décor</span>
          </div>
        </div>
      </section>

      {/* ── 5. VIDÉO DE DÉMONSTRATION (FAÇADE CLIQUABLE - LCP PRESERVÉ) ─── */}
      <VideoSection />

      {/* ── 6. ENCART D'ENGAGEMENT : COMBIEN ÇA DEMANDE ──────────────────── */}
      <section className="border border-[#0B0B0D] bg-[#F6F6F8] p-6 md:p-8 mb-12">
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#56565F] mb-2 font-bold">
          ENGAGEMENT &amp; COÛT RÉEL ANNONCÉS
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#0B0B0D] mb-3">
          ≈ 20 générations pour 8 looks · 7 étapes · plusieurs séances de travail
        </h2>
        <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed max-w-3xl">
          Ce n’est pas un test de 5 minutes. Une collection demande de valider l’univers, de tracer le plan, de valider chaque fiche technique et dessin à plat avant la première photo, puis de générer les dessins techniques au trait et calculer le patronnage coté (4 générations supplémentaires pour les paires de dessins techniques, le patron étant calculé sans génération d'image). L’agent recommande même de repartir dans une conversation neuve tous les 4 looks via un pack de reprise. Cette rigueur est la seule raison pour laquelle le dossier final tient debout.
        </p>
      </section>

      {/* ── 7. COMPARATIF ÉDITORIAL : CE QU'IL VOUS FAUDRA (2 COLONNES) ─── */}
      <section className="border-b border-[#DCDCE2] pb-12 mb-12">
        <div className="mb-4">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#56565F] block mb-1">
            PRÉREQUIS MATÉRIELS
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#0B0B0D]">
            Ce qu’il vous faudra chez vous (Choisissez votre mode d’usage)
          </h2>
          <p className="font-sans text-xs text-[#56565F] mt-1">
            Section d’information éditoriale. Le fichier téléchargé est identique et contient le guide complet pour les deux modes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-[#DCDCE2] bg-white divide-y md:divide-y-0 md:divide-x divide-[#DCDCE2]">
          
          {/* COLONNE A : MODE DIRECT */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#DCDCE2] pb-3">
                <span className="font-mono text-sm font-bold text-[#0B0B0D] uppercase tracking-wider">
                  MODE DIRECT ★
                </span>
                <span className="font-mono text-[10px] text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 border border-[#25D366]/20 font-bold uppercase">
                  Recommandé si vous débutez
                </span>
              </div>
              <p className="font-sans text-xs text-[#56565F] leading-relaxed">
                Votre assistant génère les images et compose les planches lui-même directement dans la conversation.
              </p>
              
              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#0B0B0D] font-bold">
                  IL VOUS FAUT :
                </div>
                <div className="font-sans text-xs text-[#56565F]">
                  Un assistant capable de générer des images <strong>ET d’exécuter du code Python</strong> (ChatGPT Plus/Team/Pro ou Gemini Advanced).
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#0B0B0D] font-bold">
                  VOS PLANCHES :
                </div>
                <div className="font-sans text-xs text-[#56565F]">
                  Composées automatiquement en PNG haute définition et PDF téléchargeables.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCDCE2] font-mono text-[11px] text-[#56565F]">
              ★ Prise en main directe sans logiciel tiers.
            </div>
          </div>

          {/* COLONNE B : MODE CARNET */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#DCDCE2] pb-3">
                <span className="font-mono text-sm font-bold text-[#0B0B0D] uppercase tracking-wider">
                  MODE CARNET
                </span>
                <span className="font-mono text-[10px] text-[#56565F] bg-[#F6F6F8] px-2 py-0.5 border border-[#DCDCE2] uppercase">
                  Pour créateurs déjà équipés
                </span>
              </div>
              <p className="font-sans text-xs text-[#56565F] leading-relaxed">
                Vous générez vous-même dans l’outil de votre choix et vous renvoyez les images validées à l’assistant.
              </p>
              
              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#0B0B0D] font-bold">
                  IL VOUS FAUT :
                </div>
                <div className="font-sans text-xs text-[#56565F]">
                  Un assistant conversationnel (ChatGPT, Claude, Gemini) <strong>+ un générateur d’images</strong> externe (Midjourney, Seedream, etc.).
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#0B0B0D] font-bold">
                  VOS PLANCHES :
                </div>
                <div className="font-sans text-xs text-[#56565F]">
                  L’agent donne l’ordre, les dimensions et les textes exacts pour un montage propre dans Canva ou PowerPoint.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCDCE2] font-mono text-[11px] text-[#56565F]">
              Idéal si vous avez déjà vos générateurs habituels.
            </div>
          </div>

        </div>
      </section>

      {/* ── 8. CE QUE CE KIT NE FAIT PAS ─────────────────────────────────── */}
      <section className="border-b border-[#DCDCE2] pb-10 mb-12">
        <div className="bg-[#FFF5F5] border border-[#B7410E] p-6 space-y-3">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#B7410E] flex items-center gap-2">
            <span>LIMITES STRICTES DU KIT COMPACT (V5.3)</span>
          </div>
          <h3 className="font-serif text-xl text-[#0B0B0D]">
            Ce que ce kit ne fait pas (C’est la suite, pas ce kit)
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#56565F] leading-relaxed">
            Ce kit produit désormais le dessin technique au trait et calcule le patronnage coté avec exports PDF 1:10, PDF A0/A4, SVG et DXF pour CLO 3D. En revanche, il ne gère <strong>ni les déclinaisons coloris A/B automatisées, ni les scripts CLO 3D via API directe</strong>. Ces fonctionnalités d'automatisation avancée relèvent de la version <em>Atelier Collection Hybride</em>, qui s’enclenche sur une fiche technique validée d'ici.
          </p>
        </div>
      </section>

      {/* ── 9. ZONE DE TÉLÉCHARGEMENT & FORMULAIRE ───────────────────────── */}
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

      {/* ── 10. LE CHEMIN ÉCOLE (BLOC DISTINCT ENCRE - AC0-11) ───────────── */}
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
