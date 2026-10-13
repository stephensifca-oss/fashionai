"use client";

import { useState } from "react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="border-b border-[#DCDCE2] pb-12 mb-12">
      <div className="mb-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#56565F] block mb-1">
          DÉMONSTRATION DU FLUX
        </span>
        <h2 className="font-serif text-2xl md:text-3xl text-[#0B0B0D]">
          Regarder le Directeur de Collection orchestrer une collection complète
        </h2>
      </div>

      <div className="aspect-video w-full bg-[#0B0B0D] relative overflow-hidden group border border-[#0B0B0D]">
        {isPlaying ? (
          <video
            src="/atelier-collection-demo.mp4"
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 cursor-pointer"
          >
            <img
              src="/atelier-collection-poster.jpg"
              alt="Aperçu vidéo du Directeur de Collection"
              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-neutral-950/40 flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border border-white bg-black/40 backdrop-blur-xs flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-[#0B0B0D] transition-colors duration-300">
                <span className="font-mono text-2xl sm:text-3xl font-bold ml-1">▶</span>
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-300 mb-1">
                Démonstration réelle du workflow · 18s
              </div>
              <h3 className="font-serif text-lg sm:text-2xl text-white max-w-xl">
                Cliquer pour lancer la vidéo
              </h3>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 flex justify-between items-center font-mono text-[11px] text-[#56565F]">
        <span>Vidéo pré-rendue · Sans iframe externe pour préserver le LCP</span>
        <span className="uppercase text-[#0B0B0D] font-bold">Flux direct 4K</span>
      </div>
    </section>
  );
}
