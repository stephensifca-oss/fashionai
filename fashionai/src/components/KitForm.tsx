"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/app/actions/lead";

interface CountryOption {
  code: string;
  name: string;
  dial: string;
  flag: string;
  placeholder: string;
}

const COUNTRIES: CountryOption[] = [
  { code: "CI", name: "Côte d’Ivoire", dial: "+225", flag: "🇨🇮", placeholder: "07 57 51 29 59" },
  { code: "SN", name: "Sénégal", dial: "+221", flag: "🇸🇳", placeholder: "77 000 00 00" },
  { code: "CM", name: "Cameroun", dial: "+237", flag: "🇨🇲", placeholder: "6 00 00 00 00" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷", placeholder: "06 00 00 00 00" },
  { code: "BJ", name: "Bénin", dial: "+229", flag: "🇧🇯", placeholder: "97 00 00 00" },
  { code: "TG", name: "Togo", dial: "+228", flag: "🇹🇬", placeholder: "90 00 00 00" },
  { code: "ML", name: "Mali", dial: "+223", flag: "🇲🇱", placeholder: "70 00 00 00" },
  { code: "BF", name: "Burkina Faso", dial: "+226", flag: "🇧🇫", placeholder: "70 00 00 00" },
  { code: "GN", name: "Guinée", dial: "+224", flag: "🇬🇳", placeholder: "620 00 00 00" },
  { code: "GA", name: "Gabon", dial: "+241", flag: "🇬🇦", placeholder: "06 00 00 00" },
  { code: "CG", name: "Congo (Brazzaville)", dial: "+242", flag: "🇨🇬", placeholder: "06 000 00 00" },
  { code: "CD", name: "RDC (Kinshasa)", dial: "+243", flag: "🇨🇩", placeholder: "81 000 00 00" },
  { code: "MA", name: "Maroc", dial: "+212", flag: "🇲🇦", placeholder: "06 00 00 00 00" },
  { code: "DZ", name: "Algérie", dial: "+213", flag: "🇩🇿", placeholder: "05 00 00 00 00" },
  { code: "TN", name: "Tunisie", dial: "+216", flag: "🇹🇳", placeholder: "20 000 00 00" },
  { code: "BE", name: "Belgique", dial: "+32", flag: "🇧🇪", placeholder: "0470 00 00 00" },
  { code: "CH", name: "Suisse", dial: "+41", flag: "🇨🇭", placeholder: "079 000 00 00" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦", placeholder: "(514) 000-0000" },
  { code: "US", name: "États-Unis", dial: "+1", flag: "🇺🇸", placeholder: "(555) 000-0000" },
  { code: "GB", name: "Royaume-Uni", dial: "+44", flag: "🇬🇧", placeholder: "07000 000000" },
  { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬", placeholder: "0800 000 0000" },
  { code: "GH", name: "Ghana", dial: "+233", flag: "🇬🇭", placeholder: "020 000 0000" },
  { code: "ZA", name: "Afrique du Sud", dial: "+27", flag: "🇿🇦", placeholder: "071 000 0000" },
  { code: "OTHER", name: "Autre pays / International", dial: "+", flag: "🌍", placeholder: "Indicatif + Numéro" },
];

const LOCAL_STORAGE_KEY = "fashionai_lead_profile";

export default function KitForm({ 
  slug = "studio-shooting-mode",
  initialPlatform = "google"
}: { 
  slug?: string;
  initialPlatform?: "google" | "chatgpt" | "claude" | "autres";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form fields with auto-remplissage
  const [prenom, setPrenom] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("CI");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [hasNoSocial, setHasNoSocial] = useState(false);
  const [consent, setConsent] = useState(true);
  const [platform, setPlatform] = useState<"google" | "chatgpt" | "claude" | "autres">(initialPlatform);

  // 4. Auto-remplissage lors des prochaines visites
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.prenom) setPrenom(data.prenom);
        if (data.countryCode) setSelectedCountryCode(data.countryCode);
        if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
        if (data.email) setEmail(data.email);
        if (data.socialUrl) setSocialUrl(data.socialUrl);
        if (data.hasNoSocial !== undefined) setHasNoSocial(data.hasNoSocial);
        if (data.platform) setPlatform(data.platform);
      }
    } catch (e) {
      console.warn("Could not read stored profile", e);
    }
  }, []);

  const currentCountry = COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Save profile in localStorage for auto-remplissage
    try {
      const profileToSave = {
        prenom,
        countryCode: selectedCountryCode,
        phoneNumber,
        email,
        socialUrl: hasNoSocial ? "" : socialUrl,
        hasNoSocial,
        platform,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profileToSave));
    } catch (e) {
      console.warn("Could not save profile to localStorage", e);
    }

    const formData = new FormData();
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("social_url", hasNoSocial ? "" : socialUrl);
    formData.append("has_no_social", hasNoSocial ? "on" : "off");
    formData.append("consent", consent ? "on" : "off");
    formData.append("slug", slug);
    formData.append("platform", platform);
    formData.append("country_code", currentCountry.dial);
    formData.append("phone_number", phoneNumber);

    // Compute combined whatsapp field
    const rawNumber = phoneNumber.trim();
    let fullWhatsapp = rawNumber;
    if (!rawNumber.startsWith("+") && currentCountry.dial !== "+") {
      fullWhatsapp = `${currentCountry.dial} ${rawNumber}`;
    }
    formData.set("whatsapp", fullWhatsapp);

    const result = await submitLead(formData);

    if (result.success) {
      router.push(`/merci/${slug}?t=${result.token}&code=${result.code || ""}&platform=${platform}`);
    } else {
      setError(result.error || "Une erreur est survenue lors de l’envoi.");
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Justification éthique et commerciale */}
      <div className="bg-[#F6F6F8] border border-[#DCDCE2] p-3 text-xs text-[#56565F] leading-relaxed">
        <p className="font-mono text-[11px] font-bold text-[#0B0B0D] uppercase tracking-wider mb-1">
          Ce kit est destiné en priorité aux créateurs et aux marques.
        </p>
        <p className="font-sans text-[11px] text-[#56565F]">
          Vos coordonnées servent à générer votre kit personnalisé et vous envoyer l’accès à la masterclass en direct. Rien n’est revendu.
        </p>
      </div>

      {error && (
        <div className="bg-[#FFF5F5] text-[#B7410E] p-3 text-xs font-mono border border-[#B7410E]">
          {error}
        </div>
      )}

      {/* 0. Choix de la plateforme */}
      <div className="flex flex-col gap-1.5 border border-[#DCDCE2] p-3 bg-[#F6F6F8]">
        <div className="flex justify-between items-center">
          <label className="font-mono text-[11px] uppercase tracking-wider text-[#0B0B0D] font-bold">
            01 · Votre outil / modèle IA préféré :
          </label>
          <span className="font-mono text-[9px] text-[#56565F] uppercase bg-white px-1.5 py-0.5 border border-[#DCDCE2]">
            Format adapté
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: "google", label: "Google", desc: "Imagen 3 / Gemini" },
            { id: "chatgpt", label: "ChatGPT / OpenAI", desc: "GPT-4o Vision" },
            { id: "claude", label: "Claude", desc: "Claude 3.7 Sonnet" },
            { id: "autres", label: "Midjourney & +", desc: "Flux / Midjourney" },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setPlatform(item.id as "google" | "chatgpt" | "claude" | "autres")}
              className={`p-2.5 text-left border font-mono transition-all rounded-none cursor-pointer flex flex-col justify-between ${
                platform === item.id
                  ? "bg-[#0B0B0D] text-white border-[#0B0B0D] shadow-xs"
                  : "bg-white text-[#56565F] border-[#DCDCE2] hover:border-[#0B0B0D]"
              }`}
            >
              <div className="font-bold text-xs">{item.label}</div>
              <div className={`text-[9px] mt-1 ${platform === item.id ? "text-neutral-300" : "text-[#868691]"}`}>
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Prénom */}
      <div className="flex flex-col gap-1">
        <label className="font-mono text-[11px] uppercase tracking-wider text-[#56565F]" htmlFor="prenom">
          01 · Prénom <span className="text-[#B7410E]">*</span>
        </label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          placeholder="Votre prénom"
          required
          className="w-full bg-white border border-[#DCDCE2] focus:border-[#0B0B0D] focus:ring-0 px-3 py-2 text-xs font-mono text-[#0B0B0D] transition-colors rounded-none"
        />
      </div>

      {/* 2 & 3. Séparation Pays et Numéro WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* 02. Choix du pays */}
        <div className="sm:col-span-5 flex flex-col gap-1">
          <label className="font-mono text-[11px] uppercase tracking-wider text-[#56565F]" htmlFor="country_select">
            02 · Pays <span className="text-[#B7410E]">*</span>
          </label>
          <div className="relative">
            <select
              id="country_select"
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
              className="w-full bg-white border border-[#DCDCE2] focus:border-[#0B0B0D] focus:ring-0 px-3 py-2 text-xs font-mono text-[#0B0B0D] transition-colors rounded-none cursor-pointer appearance-none pr-8 truncate"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} ({c.dial})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#56565F]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 03. Numéro WhatsApp */}
        <div className="sm:col-span-7 flex flex-col gap-1">
          <label className="font-mono text-[11px] uppercase tracking-wider text-[#56565F]" htmlFor="phone_number">
            03 · WhatsApp <span className="text-[#B7410E]">*</span>
          </label>
          <div className="flex">
            {currentCountry.dial !== "+" && (
              <span className="inline-flex items-center px-2.5 bg-[#F6F6F8] border border-r-0 border-[#DCDCE2] text-xs font-mono text-[#56565F] select-none shrink-0">
                {currentCountry.flag} {currentCountry.dial}
              </span>
            )}
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={currentCountry.placeholder}
              required
              className="w-full bg-white border border-[#DCDCE2] focus:border-[#0B0B0D] focus:ring-0 px-3 py-2 text-xs font-mono text-[#0B0B0D] transition-colors rounded-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Email */}
      <div className="flex flex-col gap-1">
        <label className="font-mono text-[11px] uppercase tracking-wider text-[#56565F]" htmlFor="email">
          04 · Email <span className="text-[#56565F] font-normal">(Recommandé pour recevoir la copie)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="contact@votreboutique.com"
          className="w-full bg-white border border-[#DCDCE2] focus:border-[#0B0B0D] focus:ring-0 px-3 py-2 text-xs font-mono text-[#0B0B0D] transition-colors rounded-none"
        />
      </div>

      {/* 5. Lien boutique ou page pro */}
      <div className="flex flex-col gap-1">
        <label className="font-mono text-[11px] uppercase tracking-wider text-[#56565F]" htmlFor="social_url">
          05 · Lien de votre boutique ou page pro {!hasNoSocial && <span className="text-[#B7410E]">*</span>}
        </label>
        <input
          type="text"
          id="social_url"
          name="social_url"
          value={socialUrl}
          onChange={(e) => setSocialUrl(e.target.value)}
          placeholder="instagram.com/ma_marque ou lien site"
          disabled={hasNoSocial}
          required={!hasNoSocial}
          className={`w-full border px-3 py-2 text-xs font-mono transition-colors rounded-none ${
            hasNoSocial
              ? "bg-[#F6F6F8] text-[#868691] border-[#DCDCE2] cursor-not-allowed"
              : "bg-white text-[#0B0B0D] border-[#DCDCE2] focus:border-[#0B0B0D]"
          }`}
        />
      </div>

      {/* 5. VISIBILITÉ FORTE DE LA COCHE : Case à cocher "Pas de page pro" */}
      <div 
        className="flex items-center gap-3 pt-1 cursor-pointer select-none"
        onClick={() => setHasNoSocial(!hasNoSocial)}
      >
        <div className={`w-5 h-5 flex items-center justify-center border transition-all rounded-none shrink-0 ${
          hasNoSocial 
            ? "bg-[#0B0B0D] border-[#0B0B0D] text-white" 
            : "bg-white border-[#868691] hover:border-[#0B0B0D]"
        }`}>
          {hasNoSocial && (
            <svg className="w-3.5 h-3.5 stroke-current stroke-[3]" viewBox="0 0 24 24" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <input
          type="checkbox"
          id="has_no_social"
          name="has_no_social"
          checked={hasNoSocial}
          onChange={(e) => setHasNoSocial(e.target.checked)}
          className="sr-only"
        />
        <label htmlFor="has_no_social" className="font-mono text-[11px] text-[#56565F] leading-tight cursor-pointer">
          Je n’ai pas encore de page pro ou boutique publique
        </label>
      </div>

      {/* 5. VISIBILITÉ FORTE DE LA COCHE : Case à cocher "Consentement" */}
      <div 
        className="flex items-center gap-3 pt-2 border-t border-[#DCDCE2] cursor-pointer select-none"
        onClick={() => setConsent(!consent)}
      >
        <div className={`w-5 h-5 flex items-center justify-center border transition-all rounded-none shrink-0 ${
          consent 
            ? "bg-[#0B0B0D] border-[#0B0B0D] text-white" 
            : "bg-white border-[#868691] hover:border-[#0B0B0D]"
        }`}>
          {consent && (
            <svg className="w-3.5 h-3.5 stroke-current stroke-[3]" viewBox="0 0 24 24" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="sr-only"
        />
        <label htmlFor="consent" className="font-sans text-[11px] text-[#56565F] leading-tight cursor-pointer">
          J’accepte de recevoir des conseils de production et les invitations aux masterclasses du samedi.
        </label>
      </div>

      {/* Bouton Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full bg-[#0B0B0D] text-white font-mono text-xs uppercase tracking-widest py-4 border border-[#0B0B0D] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 rounded-none cursor-pointer"
      >
        <span>{loading ? "GÉNÉRATION DU LIEN..." : "TÉLÉCHARGER LE KIT COMPLET (V1.0) →"}</span>
      </button>

      <div className="text-center">
        <span className="font-mono text-[10px] text-[#56565F] uppercase tracking-wider">
          LIVRAISON IMMÉDIATE PAR LIEN SÉCURISÉ · AUTO-REMPLISSAGE ACTIVÉ
        </span>
      </div>
    </form>
  );
}
