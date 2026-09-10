import EncartPrerequis from "@/components/EncartPrerequis";
import KitForm from "@/components/KitForm";

export function generateStaticParams() {
  return [
    { slug: "editorial-studio" },
    { slug: "lookbook-brutaliste" },
    { slug: "serie-coherente-ecom" },
    { slug: "campagne-mouvement" },
    { slug: "studio-shooting-mode" },
  ];
}

export default async function KitLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // En production, on récupérera le kit depuis D1 en fonction du slug.
  // Données hardcodées pour l'implémentation de la phase 1.
  const kit = {
    title: "Transformez vos photos de collection en films de campagne",
    subtitle: "Le kit qui anime une image éditoriale en clip cinématique de 8 secondes.",
    family: "VIDÉO",
    level: "INTERMÉDIAIRE",
    requiredTool: "Google Veo 3",
    isPaid: true,
    costNote: "Accès requis, ~20€/mois",
  };

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg border-b border-rule pb-stack-lg mb-stack-lg reveal-up" style={{ animationDelay: '100ms' }}>
        <div className="absolute bottom-stack-lg left-0 z-10 flex flex-col justify-end max-w-[34rem] p-stack-md bg-surface/90 border border-rule backdrop-blur-sm">
          <div className="font-utility-label text-utility-label uppercase mb-stack-sm tracking-widest text-ink">
            FAMILLE / {kit.family}
          </div>
          <h1 className="font-display-xl-mobile md:font-headline-lg text-[32px] md:text-[38px] leading-[1.05] mb-stack-sm text-ink">
            {kit.title}
          </h1>
          <p className="font-body-md text-ink-soft mb-stack-md">
            {kit.subtitle}
          </p>
          <div className="font-utility-label text-utility-label uppercase text-ink flex items-center gap-2 border-t border-rule pt-stack-sm">
            <span className="material-symbols-outlined text-[14px]">videocam</span>
            NIVEAU {kit.level} — 12 MIN DE TUTO
          </div>
        </div>

        <div className="flex flex-col md:col-span-2">
          <div className="aspect-[4/5] w-full bg-surface border border-rule relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80" 
              alt="Hero Fashion Image" 
              className="w-full h-full object-cover grayscale opacity-90 transition-opacity duration-700 hover:opacity-100" 
            />
          </div>
          <div className="font-utility-label text-utility-label uppercase text-ink-soft mt-stack-sm tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">play_circle</span>
            RÉSULTAT OBTENU AVEC LE KIT — 01
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg border-b border-rule pb-stack-lg mb-stack-lg reveal-up" style={{ animationDelay: '200ms' }}>
        {/* Main Area (Left) */}
        <div className="lg:col-span-7 flex flex-col gap-stack-lg">
          <div>
            <div className="aspect-video w-full bg-ink relative overflow-hidden group cursor-pointer mb-stack-sm">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 border border-surface flex items-center justify-center text-surface group-hover:bg-surface group-hover:text-ink transition-colors duration-600">
                  <span className="material-symbols-outlined text-[32px]">play_arrow</span>
                </div>
              </div>
            </div>
            <div className="font-utility-label text-utility-label uppercase text-ink-soft tracking-widest mt-2">
              TUTORIEL COMPLET — 12 MIN
            </div>
          </div>

          <div className="border-t border-rule pt-stack-lg">
            <h2 className="font-headline-lg text-[26px] mb-stack-md text-ink">Ce que vous obtenez</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 border-y border-rule">
              <div className="p-stack-md md:border-r border-rule flex flex-col gap-stack-sm border-b md:border-b-0">
                <div className="font-utility-label text-utility-label uppercase text-ink">LE KIT .MD</div>
                <p className="font-body-sm text-ink-soft">Le moteur de prompt exact à copier-coller dans l'outil d'IA.</p>
              </div>
              <div className="p-stack-md md:border-r border-rule flex flex-col gap-stack-sm border-b md:border-b-0">
                <div className="font-utility-label text-utility-label uppercase text-ink">LE GUIDE PDF</div>
                <p className="font-body-sm text-ink-soft">Mode d'emploi détaillé sur les paramètres de mouvement.</p>
              </div>
              <div className="p-stack-md flex flex-col gap-stack-sm">
                <div className="font-utility-label text-utility-label uppercase text-ink">LE TUTORIEL VIDÉO</div>
                <p className="font-body-sm text-ink-soft">La démonstration de notre flux de travail complet.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar (Right) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-[80px] flex flex-col gap-stack-md w-full max-w-[26rem] ml-auto">
            <EncartPrerequis requiredTool={kit.requiredTool} isPaid={kit.isPaid} costNote={kit.costNote} />
            <div className="bg-surface border border-ink p-stack-lg reveal-up" style={{ animationDelay: "300ms" }}>
              <h3 className="font-headline-lg text-[28px] md:text-[28px] mb-stack-md text-ink">Recevoir le kit</h3>
              <KitForm slug={resolvedParams.slug} />
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full bg-ink text-surface py-stack-lg px-margin-desktop text-center flex flex-col items-center justify-center gap-stack-md reveal-up" style={{ animationDelay: '300ms' }}>
        <div className="font-utility-label text-utility-label uppercase text-ink-soft tracking-widest">
            VOUS BLOQUEZ ?
        </div>
        <h2 className="font-headline-lg text-[24px] md:text-[24px] max-w-2xl mx-auto">
            Séance de groupe hebdomadaire pour analyser vos résultats et affiner la méthode.
        </h2>
        <a href="#" className="mt-stack-sm bg-whatsapp text-ink font-utility-label text-utility-label uppercase py-4 px-stack-lg border border-whatsapp hover:bg-transparent hover:text-whatsapp transition-colors duration-600 inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">chat</span>
          Échanger sur WhatsApp
        </a>
      </section>
    </main>
  );
}
