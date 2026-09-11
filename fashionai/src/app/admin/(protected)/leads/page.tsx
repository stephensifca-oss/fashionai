"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import Link from "next/link";
import { getLeadsAction, updateLeadStatusAction, deleteLeadAction } from "@/app/actions/admin";
import type { LeadRecord } from "@/lib/leads-store";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [selectedLeadForWa, setSelectedLeadForWa] = useState<LeadRecord | null>(null);
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<LeadRecord | null>(null);
  const [noteText, setNoteText] = useState("");
  const [waMessageTemplate, setWaMessageTemplate] = useState<"standard" | "audit" | "followup">("standard");
  const [nowTimestamp, setNowTimestamp] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  // Load leads
  const fetchLeads = async () => {
    setLoading(true);
    const res = await getLeadsAction();
    if (res.success) {
      setLeads(res.leads);
    }
    setLoading(false);
  };

  useEffect(() => {
    let active = true;
    getLeadsAction().then((res) => {
      if (active) {
        setNowTimestamp(Date.now());
        if (res.success) {
          setLeads(res.leads);
        }
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search
      const matchesSearch =
        !searchQuery ||
        lead.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.whatsapp.includes(searchQuery) ||
        (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        lead.wa_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.social_url && lead.social_url.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

      // Platform
      const matchesPlatform = platformFilter === "all" || lead.platform === platformFilter;

      // Country
      const matchesCountry = countryFilter === "all" || lead.country_code === countryFilter;

      return matchesSearch && matchesStatus && matchesPlatform && matchesCountry;
    });
  }, [leads, searchQuery, statusFilter, platformFilter, countryFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = leads.length;
    const refTime = nowTimestamp || 0;
    const last24h = refTime
      ? leads.filter((l) => refTime - new Date(l.created_at).getTime() <= 24 * 60 * 60 * 1000).length
      : 0;

    // Platform breakdown
    const googleCount = leads.filter((l) => l.platform === "google").length;
    const gptCount = leads.filter((l) => l.platform === "chatgpt").length;
    const othersCount = leads.filter((l) => l.platform === "autres").length;

    // Pro shop presence
    const withSocial = leads.filter((l) => !l.has_no_social && l.social_url).length;
    const proRate = total > 0 ? Math.round((withSocial / total) * 100) : 0;

    // Status counts
    const newCount = leads.filter((l) => l.status === "nouveau").length;
    const convertedCount = leads.filter((l) => l.status === "converti" || l.status === "audit_reserve").length;

    // Countries
    const countryMap: Record<string, number> = {};
    leads.forEach((l) => {
      const c = l.country_code || "CI";
      countryMap[c] = (countryMap[c] || 0) + 1;
    });
    const sortedCountries = Object.entries(countryMap).sort((a, b) => b[1] - a[1]);

    return {
      total,
      last24h,
      newCount,
      convertedCount,
      googleCount,
      gptCount,
      othersCount,
      proRate,
      topCountries: sortedCountries.slice(0, 3),
    };
  }, [leads, nowTimestamp]);

  // Handle status update
  const handleStatusChange = (leadId: string, newStatus: LeadRecord["status"]) => {
    startTransition(async () => {
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      await updateLeadStatusAction(leadId, newStatus);
    });
  };

  // Handle notes save
  const handleSaveNotes = async () => {
    if (!selectedLeadForNotes) return;
    const leadId = selectedLeadForNotes.id;
    startTransition(async () => {
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, notes: noteText } : l))
      );
      await updateLeadStatusAction(leadId, selectedLeadForNotes.status, noteText);
      setSelectedLeadForNotes(null);
    });
  };

  // Handle delete lead
  const handleDeleteLead = async (leadId: string, prenom: string) => {
    if (!confirm(`Supprimer définitivement le lead de ${prenom} ?`)) return;
    startTransition(async () => {
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      await deleteLeadAction(leadId);
    });
  };

  // Generate WhatsApp Message text
  const generateWaText = (lead: LeadRecord, templateType: "standard" | "audit" | "followup") => {
    const cleanPlatform =
      lead.platform === "google"
        ? "Google (Imagen 3 / Gemini)"
        : lead.platform === "chatgpt"
        ? "ChatGPT (GPT-4o)"
        : "Midjourney / Flux";

    if (templateType === "audit") {
      return `Bonjour ${lead.prenom}, c’est Stephen de FashionAI Agency. J’ai bien reçu votre demande pour le Kit Shooting Mode V1.0 (Code de validation : ${lead.wa_code}).

J’ai jeté un œil à votre profil${lead.social_url ? ` (${lead.social_url})` : ""}. Avez-vous 10 minutes cette semaine pour qu’on fasse une démonstration en direct sur l’un de vos propres vêtements ?`;
    }

    if (templateType === "followup") {
      return `Bonjour ${lead.prenom}, avez-vous réussi à générer votre première série de shooting avec le kit ${cleanPlatform} (Code : ${lead.wa_code}) ? 

Si vous rencontrez le moindre blocage sur la cohérence des angles ou des tissus, je peux vous débloquer rapidement !`;
    }

    // Standard
    return `Bonjour ${lead.prenom}, c’est Stephen de FashionAI.Agency !

J’ai bien validé votre accès au Kit Shooting Mode V1.0 (${cleanPlatform}). Votre code de confirmation est le [${lead.wa_code}].

Avez-vous pu télécharger le guide et la fiche de test ? Je reste disponible si vous souhaitez des conseils pour adapter le prompt à votre marque !`;
  };

  // Open WhatsApp
  const handleOpenWhatsApp = (lead: LeadRecord, templateType = waMessageTemplate) => {
    const text = generateWaText(lead, templateType);
    const cleanNumber = lead.whatsapp.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    if (lead.status === "nouveau") {
      handleStatusChange(lead.id, "contacte");
    }
  };

  // CSV Export
  const exportToCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = [
      "ID",
      "Date",
      "Prénom",
      "WhatsApp",
      "Pays",
      "Email",
      "Lien Pro",
      "Plateforme IA",
      "Code WA",
      "Statut",
      "Téléchargements",
      "Notes",
    ];

    const rows = filteredLeads.map((l) => [
      l.id,
      new Date(l.created_at).toLocaleString("fr-FR"),
      `"${l.prenom.replace(/"/g, '""')}"`,
      `"${l.whatsapp}"`,
      l.country_code,
      `"${l.email || ""}"`,
      `"${l.social_url || ""}"`,
      l.platform,
      l.wa_code,
      l.status,
      l.downloads_count,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fashionai_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F6F6F8] text-[#0B0B0D] font-sans pb-16">
      {/* Top Header Console — Light Theme */}
      <header className="border-b border-[#DCDCE2] bg-white px-6 py-4 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/studio"
            className="font-mono text-xs font-bold tracking-widest text-[#0B0B0D] uppercase hover:text-[#B7410E] transition-colors"
          >
            FASHIONAI<span className="text-[#B7410E]">.AGENCY</span>
          </Link>
          <span className="text-[#DCDCE2]">/</span>
          <span className="font-mono text-xs tracking-wider text-[#56565F] uppercase">
            ADMIN CONSOLE · GESTION DES LEADS
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/test-pipeline"
            className="px-3 py-1.5 border border-[#DCDCE2] bg-white text-xs font-mono text-[#56565F] hover:text-[#0B0B0D] hover:border-[#0B0B0D] transition-colors rounded-none"
          >
            🧪 Test Pipeline
          </Link>
          <Link
            href="/studio"
            className="px-3 py-1.5 bg-[#0B0B0D] text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-neutral-800 transition-colors rounded-none"
          >
            Voir le Studio →
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Page Title & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#DCDCE2] pb-4">
          <div>
            <span className="font-mono text-[11px] text-[#B7410E] uppercase tracking-widest font-bold">
              TABLEAU DE BORD COMMERCIAL
            </span>
            <h1 className="font-mono text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0B0B0D] mt-1">
              Prospects Lead Magnet & Accès Studio
            </h1>
          </div>
          <div className="font-mono text-xs text-[#56565F]">
            Kit Shooting Mode V1.0 · Distribution Dynamique
          </div>
        </div>

        {/* KPI Metrics Header */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Leads */}
          <div className="bg-white border border-[#DCDCE2] p-4 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-[#56565F] font-mono text-[11px] uppercase tracking-wider">
              <span>Total Prospects</span>
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 font-bold">
                +{metrics.last24h} (24h)
              </span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-bold font-mono text-[#0B0B0D]">{metrics.total}</div>
              <div className="text-xs text-[#56565F] mt-0.5 font-mono">
                <span className="text-blue-700 font-bold">{metrics.newCount} nouveau(x)</span> · {metrics.convertedCount} qualifié(s)
              </div>
            </div>
            <div className="h-1 bg-[#F6F6F8] w-full overflow-hidden border border-[#DCDCE2]">
              <div
                className="h-full bg-[#B7410E]"
                style={{
                  width: `${metrics.total > 0 ? (metrics.convertedCount / metrics.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          {/* Card 2: Plateformes IA */}
          <div className="bg-white border border-[#DCDCE2] p-4 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-[#56565F] font-mono text-[11px] uppercase tracking-wider">
              <span>Édition IA Demandée</span>
            </div>
            <div className="my-2 flex flex-col gap-1 font-mono text-xs">
              <div className="flex justify-between items-center text-[#0B0B0D]">
                <span>Google (Imagen 3)</span>
                <span className="font-bold bg-blue-50 text-blue-800 px-1.5 py-0.2 border border-blue-200">{metrics.googleCount}</span>
              </div>
              <div className="flex justify-between items-center text-[#56565F]">
                <span>ChatGPT (4o)</span>
                <span className="font-bold bg-emerald-50 text-emerald-800 px-1.5 py-0.2 border border-emerald-200">{metrics.gptCount}</span>
              </div>
              <div className="flex justify-between items-center text-[#56565F]">
                <span>Autres (Midjourney)</span>
                <span className="font-bold bg-purple-50 text-purple-800 px-1.5 py-0.2 border border-purple-200">{metrics.othersCount}</span>
              </div>
            </div>
            <div className="text-[10px] text-[#56565F] font-mono">
              Répartition des kits générés
            </div>
          </div>

          {/* Card 3: Top Géographie */}
          <div className="bg-white border border-[#DCDCE2] p-4 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-[#56565F] font-mono text-[11px] uppercase tracking-wider">
              <span>Top Géographie</span>
            </div>
            <div className="my-2 flex flex-col gap-1 font-mono text-xs">
              {metrics.topCountries.length > 0 ? (
                metrics.topCountries.map(([code, count]) => (
                  <div key={code} className="flex justify-between items-center text-[#0B0B0D]">
                    <span>
                      {code === "CI"
                        ? "🇨🇮 Côte d’Ivoire"
                        : code === "FR"
                        ? "🇫🇷 France"
                        : code === "SN"
                        ? "🇸🇳 Sénégal"
                        : code === "CM"
                        ? "🇨🇲 Cameroun"
                        : code}
                    </span>
                    <span className="font-bold text-[#56565F] bg-[#F6F6F8] px-1.5 border border-[#DCDCE2]">{count}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-[#56565F]">—</div>
              )}
            </div>
            <div className="text-[10px] text-[#56565F] font-mono">
              Origine par indicatif pays
            </div>
          </div>

          {/* Card 4: Qualification & Pro */}
          <div className="bg-white border border-[#DCDCE2] p-4 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-[#56565F] font-mono text-[11px] uppercase tracking-wider">
              <span>Profils Qualifiés</span>
              <span className="text-[#0B0B0D] font-bold">{metrics.proRate}%</span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-bold font-mono text-[#0B0B0D]">{metrics.proRate}%</div>
              <div className="text-xs text-[#56565F] mt-0.5 font-mono">
                Boutique ou compte Instagram déclaré
              </div>
            </div>
            <div className="text-[10px] text-[#B7410E] font-mono font-bold">
              Cible prioritaire Voie A & B
            </div>
          </div>
        </section>

        {/* Filters & Actions Control Bar */}
        <section className="bg-white border border-[#DCDCE2] p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Search Input */}
            <div className="relative min-w-[240px] flex-1">
              <input
                type="text"
                placeholder="Rechercher par prénom, WhatsApp, email, code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F6F6F8] border border-[#DCDCE2] focus:border-[#0B0B0D] focus:ring-0 px-3 py-2 text-xs font-mono text-[#0B0B0D] placeholder-[#56565F] rounded-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-[#56565F] hover:text-[#0B0B0D] text-xs font-mono cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-[#DCDCE2] text-xs font-mono text-[#0B0B0D] px-3 py-2 rounded-none cursor-pointer focus:border-[#0B0B0D]"
            >
              <option value="all">Statut : Tous ({leads.length})</option>
              <option value="nouveau">🔵 Nouveau</option>
              <option value="contacte">🟡 Contacté</option>
              <option value="audit_reserve">🟣 Audit Réservé</option>
              <option value="converti">🟢 Converti</option>
              <option value="archive">⚪ Archivé</option>
            </select>

            {/* Platform Filter */}
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-white border border-[#DCDCE2] text-xs font-mono text-[#0B0B0D] px-3 py-2 rounded-none cursor-pointer focus:border-[#0B0B0D]"
            >
              <option value="all">Plateforme : Toutes</option>
              <option value="google">Google (Imagen 3)</option>
              <option value="chatgpt">ChatGPT (4o)</option>
              <option value="autres">Autres (Midjourney)</option>
            </select>

            {/* Country Filter */}
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="bg-white border border-[#DCDCE2] text-xs font-mono text-[#0B0B0D] px-3 py-2 rounded-none cursor-pointer focus:border-[#0B0B0D]"
            >
              <option value="all">Pays : Tous</option>
              <option value="CI">🇨🇮 Côte d’Ivoire</option>
              <option value="SN">🇸🇳 Sénégal</option>
              <option value="CM">🇨🇲 Cameroun</option>
              <option value="FR">🇫🇷 France</option>
              <option value="BJ">🇧🇯 Bénin</option>
              <option value="TG">🇹🇬 Togo</option>
              <option value="ML">🇲🇱 Mali</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="px-3 py-2 border border-[#DCDCE2] hover:border-[#0B0B0D] bg-white font-mono text-xs text-[#56565F] hover:text-[#0B0B0D] transition-colors flex items-center gap-1.5 rounded-none cursor-pointer"
              title="Rafraîchir les données"
            >
              <span className={loading ? "animate-spin" : ""}>🔄</span>
              <span>Actualiser</span>
            </button>

            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-[#0B0B0D] hover:bg-neutral-800 text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 rounded-none cursor-pointer"
            >
              <span>📥 Exporter CSV ({filteredLeads.length})</span>
            </button>
          </div>
        </section>

        {/* Leads Table */}
        <section className="bg-white border border-[#DCDCE2] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DCDCE2] bg-[#F6F6F8] text-[#56565F] font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Date / Heure</th>
                  <th className="py-3 px-4">Prospect & Code</th>
                  <th className="py-3 px-4">WhatsApp & Pays</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Boutique / Page Pro</th>
                  <th className="py-3 px-4">Édition IA</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Actions Rapides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCDCE2] font-mono text-xs">
                {loading && leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#56565F]">
                      Chargement des leads en cours...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#56565F]">
                      Aucun lead ne correspond aux filtres sélectionnés.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const isRecent =
                      nowTimestamp > 0 &&
                      nowTimestamp - new Date(lead.created_at).getTime() < 24 * 60 * 60 * 1000;

                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-[#F6F6F8] transition-colors group"
                      >
                        {/* 1. Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-[#56565F]">
                          <div className="flex items-center gap-2">
                            <span>
                              {new Date(lead.created_at).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {isRecent && lead.status === "nouveau" && (
                              <span className="px-1.5 py-0.5 bg-[#B7410E] text-white text-[9px] font-bold tracking-widest uppercase">
                                NEW
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 2. Prospect & Code */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-bold text-[#0B0B0D] text-sm">{lead.prenom}</div>
                          <div className="text-[10px] text-[#56565F]">
                            Code : <span className="text-[#B7410E] font-bold">[{lead.wa_code}]</span>
                          </div>
                        </td>

                        {/* 3. WhatsApp & Pays */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-[#0B0B0D] font-bold">
                            <span>{lead.dial_code}</span>
                            <span>{lead.phone_number}</span>
                          </div>
                          <div className="text-[10px] text-[#56565F]">
                            {lead.country_code} ({lead.whatsapp})
                          </div>
                        </td>

                        {/* 4. Email */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-[#56565F]">
                          {lead.email ? (
                            <a
                              href={`mailto:${lead.email}`}
                              className="hover:text-[#0B0B0D] underline decoration-dotted"
                            >
                              {lead.email}
                            </a>
                          ) : (
                            <span className="text-[#A0A0AB]">—</span>
                          )}
                        </td>

                        {/* 5. Boutique / Page Pro */}
                        <td className="py-3.5 px-4 max-w-[200px] truncate">
                          {lead.social_url ? (
                            <a
                              href={
                                lead.social_url.startsWith("http")
                                  ? lead.social_url
                                  : `https://${lead.social_url}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#0B0B0D] font-bold hover:text-[#B7410E] underline underline-offset-2 truncate"
                            >
                              <span>🔗</span>
                              <span className="truncate">{lead.social_url}</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-[#868691]">
                              {lead.has_no_social ? "Pas de page déclarée" : "—"}
                            </span>
                          )}
                        </td>

                        {/* 6. Édition IA */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                              lead.platform === "google"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : lead.platform === "chatgpt"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-purple-50 text-purple-800 border-purple-200"
                            }`}
                          >
                            {lead.platform}
                          </span>
                        </td>

                        {/* 7. Statut */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as LeadRecord["status"])
                            }
                            className={`px-2 py-1 text-[11px] font-mono border rounded-none cursor-pointer ${
                              lead.status === "nouveau"
                                ? "bg-blue-50 text-blue-800 border-blue-300 font-bold"
                                : lead.status === "contacte"
                                ? "bg-amber-50 text-amber-800 border-amber-300 font-bold"
                                : lead.status === "audit_reserve"
                                ? "bg-purple-50 text-purple-800 border-purple-300 font-bold"
                                : lead.status === "converti"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                                : "bg-gray-100 text-gray-700 border-gray-300"
                            }`}
                          >
                            <option value="nouveau">🔵 Nouveau</option>
                            <option value="contacte">🟡 Contacté</option>
                            <option value="audit_reserve">🟣 Audit Réservé</option>
                            <option value="converti">🟢 Converti</option>
                            <option value="archive">⚪ Archivé</option>
                          </select>
                        </td>

                        {/* 8. Actions Rapides */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Bouton WhatsApp 1-Clic */}
                            <button
                              onClick={() => {
                                setSelectedLeadForWa(lead);
                                setWaMessageTemplate("standard");
                              }}
                              className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold text-xs flex items-center gap-1 transition-colors rounded-none cursor-pointer"
                              title="Ouvrir WhatsApp avec message personnalisé"
                            >
                              <span>💬</span>
                              <span>WhatsApp</span>
                            </button>

                            {/* Bouton Notes */}
                            <button
                              onClick={() => {
                                setSelectedLeadForNotes(lead);
                                setNoteText(lead.notes || "");
                              }}
                              className="px-2.5 py-1.5 bg-white border border-[#DCDCE2] hover:border-[#0B0B0D] text-[#56565F] hover:text-[#0B0B0D] text-xs transition-colors rounded-none cursor-pointer"
                              title="Notes & détails internes"
                            >
                              <span>📝</span>
                            </button>

                            {/* Bouton Supprimer */}
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.prenom)}
                              className="p-1.5 text-[#868691] hover:text-red-600 text-xs transition-colors cursor-pointer"
                              title="Supprimer ce lead"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-[#DCDCE2] bg-[#F6F6F8] flex flex-wrap items-center justify-between text-xs font-mono text-[#56565F]">
            <div>
              Affichage de <span className="text-[#0B0B0D] font-bold">{filteredLeads.length}</span> sur{" "}
              <span className="text-[#0B0B0D]">{leads.length}</span> prospect(s)
            </div>
            <div>Dernière synchronisation locale en temps réel</div>
          </div>
        </section>
      </main>

      {/* MODAL 1 : WHATSAPP 1-CLIC PREVIEW & SENDER — LIGHT THEME */}
      {selectedLeadForWa && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#DCDCE2] max-w-lg w-full p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-start justify-between border-b border-[#DCDCE2] pb-3">
              <div>
                <span className="font-mono text-[10px] text-emerald-700 font-bold tracking-widest uppercase">
                  ⚡ RELANCE 1-CLIC WHATSAPP
                </span>
                <h3 className="font-mono text-base font-bold text-[#0B0B0D] mt-0.5">
                  Contacter {selectedLeadForWa.prenom} ({selectedLeadForWa.whatsapp})
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeadForWa(null)}
                className="text-[#56565F] hover:text-[#0B0B0D] font-mono text-xs cursor-pointer"
              >
                ✕ FERMER
              </button>
            </div>

            {/* Template Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-[#56565F] uppercase font-bold">
                Modèle de message :
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "standard", label: "Standard / Kit", icon: "📦" },
                  { id: "audit", label: "Proposition Audit", icon: "✨" },
                  { id: "followup", label: "Suivi J+2", icon: "🎯" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setWaMessageTemplate(item.id as "standard" | "audit" | "followup")}
                    className={`p-2 border text-left font-mono text-xs transition-colors rounded-none cursor-pointer ${
                      waMessageTemplate === item.id
                        ? "bg-[#0B0B0D] border-[#0B0B0D] text-white font-bold"
                        : "bg-[#F6F6F8] border-[#DCDCE2] text-[#56565F] hover:border-[#0B0B0D] hover:text-[#0B0B0D]"
                    }`}
                  >
                    <div>
                      {item.icon} {item.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Preview Box */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-[#56565F] uppercase font-bold">
                Aperçu du texte transmis à WhatsApp :
              </label>
              <div className="bg-[#F6F6F8] border border-[#DCDCE2] p-3 text-xs font-mono text-[#0B0B0D] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {generateWaText(selectedLeadForWa, waMessageTemplate)}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DCDCE2]">
              <button
                onClick={() => setSelectedLeadForWa(null)}
                className="px-4 py-2 border border-[#DCDCE2] text-xs font-mono text-[#56565F] hover:text-[#0B0B0D] bg-white rounded-none cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  handleOpenWhatsApp(selectedLeadForWa, waMessageTemplate);
                  setSelectedLeadForWa(null);
                }}
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 rounded-none cursor-pointer"
              >
                <span>🚀 Ouvrir dans WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2 : NOTES & DÉTAILS DU PROSPECT — LIGHT THEME */}
      {selectedLeadForNotes && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#DCDCE2] max-w-lg w-full p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-start justify-between border-b border-[#DCDCE2] pb-3">
              <div>
                <span className="font-mono text-[10px] text-[#B7410E] tracking-widest uppercase font-bold">
                  FICHE PROSPECT INTERNE
                </span>
                <h3 className="font-mono text-base font-bold text-[#0B0B0D] mt-0.5">
                  Détails & Notes · {selectedLeadForNotes.prenom}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeadForNotes(null)}
                className="text-[#56565F] hover:text-[#0B0B0D] font-mono text-xs cursor-pointer"
              >
                ✕ FERMER
              </button>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 gap-2 bg-[#F6F6F8] border border-[#DCDCE2] p-3 text-xs font-mono">
              <div>
                <span className="text-[#56565F]">WhatsApp :</span>{" "}
                <span className="text-[#0B0B0D] font-bold">{selectedLeadForNotes.whatsapp}</span>
              </div>
              <div>
                <span className="text-[#56565F]">Code :</span>{" "}
                <span className="text-[#B7410E] font-bold">[{selectedLeadForNotes.wa_code}]</span>
              </div>
              <div>
                <span className="text-[#56565F]">Plateforme :</span>{" "}
                <span className="text-[#0B0B0D]">{selectedLeadForNotes.platform}</span>
              </div>
              <div>
                <span className="text-[#56565F]">Téléchargements :</span>{" "}
                <span className="text-[#0B0B0D]">{selectedLeadForNotes.downloads_count || 1} fois</span>
              </div>
              {selectedLeadForNotes.social_url && (
                <div className="col-span-2 truncate">
                  <span className="text-[#56565F]">Boutique / Page :</span>{" "}
                  <a
                    href={
                      selectedLeadForNotes.social_url.startsWith("http")
                        ? selectedLeadForNotes.social_url
                        : `https://${selectedLeadForNotes.social_url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0B0B0D] font-bold underline"
                  >
                    {selectedLeadForNotes.social_url}
                  </a>
                </div>
              )}
            </div>

            {/* Notes Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-[#56565F] uppercase font-bold">
                Notes commerciales & Historique d’échange :
              </label>
              <textarea
                rows={4}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Ex: Demande de devis pour 30 pièces, audit prévu jeudi à 15h..."
                className="w-full bg-[#F6F6F8] border border-[#DCDCE2] focus:border-[#0B0B0D] focus:ring-0 p-3 text-xs font-mono text-[#0B0B0D] placeholder-[#868691] rounded-none resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DCDCE2]">
              <button
                onClick={() => setSelectedLeadForNotes(null)}
                className="px-4 py-2 border border-[#DCDCE2] text-xs font-mono text-[#56565F] hover:text-[#0B0B0D] bg-white rounded-none cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveNotes}
                disabled={isPending}
                className="px-5 py-2.5 bg-[#0B0B0D] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors rounded-none cursor-pointer"
              >
                {isPending ? "Enregistrement..." : "💾 Enregistrer la note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
