import type { Metadata } from "next";
import Link from "next/link";
import { Archivo, Bodoni_Moda, DM_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ 
  subsets: ["latin"], 
  variable: "--font-archivo",
  display: "swap" 
});

const bodoni = Bodoni_Moda({ 
  subsets: ["latin"], 
  variable: "--font-bodoni",
  display: "swap"
});

const dmMono = DM_Mono({ 
  weight: "500",
  subsets: ["latin"], 
  variable: "--font-dm-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "FASHIONAI.AGENCY — Studio Éditorial IA",
  description: "Production photo et vidéo de mode assistée par IA pour marques africaines et internationales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${archivo.variable} ${bodoni.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-[#F6F6F8] text-[#0B0B0D]">
        {/* HEADER TOP APP BAR */}
        <header className="bg-surface h-[56px] w-full sticky top-0 z-50 border-b border-rule flex items-center justify-between px-margin-mobile md:px-margin-desktop">
          <Link href="/studio" className="font-body-sm text-[15px] font-semibold text-ink uppercase tracking-widest hover:opacity-70 transition-opacity duration-600">
            FASHIONAI.AGENCY
          </Link>
          <nav className="hidden md:flex items-center gap-stack-md">
            <Link href="/studio" className="font-utility-label text-utility-label uppercase tracking-widest text-ink hover:opacity-70 transition-opacity">
              STUDIO
            </Link>
            <Link href="/kits" className="font-utility-label text-utility-label uppercase tracking-widest text-ink font-bold border-b border-ink pb-0.5">
              KITS
            </Link>
            <a 
              href="https://wa.me/2250757512959?text=Bonjour,%20je%20souhaite%20m%27inscrire%20%C3%A0%20la%20s%C3%A9ance%20du%20jeudi%2018h" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-utility-label text-utility-label uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
            >
              SÉANCE
            </a>
            <a 
              href="https://wa.me/2250757512959?text=Bonjour,%20je%20souhaite%20travailler%20avec%20FashionAI" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-utility-label text-utility-label uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
            >
              TRAVAILLER ENSEMBLE
            </a>
          </nav>
        </header>

        {children}

        {/* FOOTER */}
        <footer className="bg-background text-ink w-full border-t border-rule flex flex-col items-start gap-stack-md px-margin-mobile md:px-margin-desktop py-stack-lg mt-auto">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md">
            <nav className="flex flex-col md:flex-row md:items-center gap-stack-sm md:gap-stack-md w-full">
              <Link href="/studio" className="font-utility-label text-[10px] uppercase tracking-widest text-ink hover:opacity-70 transition-opacity duration-600">
                STUDIO
              </Link>
              <span className="text-rule hidden md:inline">|</span>
              <Link href="/kits" className="font-utility-label text-[10px] uppercase tracking-widest text-ink hover:opacity-70 transition-opacity duration-600 font-bold">
                KITS
              </Link>
              <span className="text-rule hidden md:inline">|</span>
              <a 
                href="https://wa.me/2250757512959?text=Bonjour,%20je%20souhaite%20m%27inscrire%20%C3%A0%20la%20s%C3%A9ance%20du%20jeudi%2018h" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-utility-label text-[10px] uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
              >
                SÉANCE (JEUDI 18H)
              </a>
              <span className="text-rule hidden md:inline">|</span>
              <a 
                href="https://wa.me/2250757512959?text=Bonjour,%20je%20souhaite%20collaborer%20avec%20FashionAI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-utility-label text-[10px] uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
              >
                TRAVAILLER ENSEMBLE
              </a>
            </nav>
          </div>

          {/* RÉSEAUX SOCIAUX DE STEPHEN */}
          <div className="w-full border-t border-rule pt-stack-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[#56565F]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#0B0B0D] font-bold">Réseaux Stephen :</span>
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

            <div className="font-utility-label text-[10px] font-bold text-ink uppercase tracking-widest">
              © 2026 FASHIONAI.AGENCY
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
