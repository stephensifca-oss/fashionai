import { Suspense } from "react";
import MerciContent from "@/components/MerciContent";

export function generateStaticParams() {
  return [
    { slug: "studio-shooting-mode" },
    { slug: "editorial-studio" },
    { slug: "lookbook-brutaliste" },
    { slug: "serie-coherente-ecom" },
    { slug: "campagne-mouvement" },
  ];
}

export default function MerciPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F6F6F8] flex items-center justify-center font-mono text-xs">Chargement...</div>}>
      <MerciContent />
    </Suspense>
  );
}
