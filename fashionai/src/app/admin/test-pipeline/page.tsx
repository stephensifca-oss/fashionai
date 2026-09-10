'use client';

import React, { useState } from 'react';

export default function TestPipelinePage() {
  // LLM Agent state
  const [selectedAgent, setSelectedAgent] = useState<'cloth' | 'swap' | 'transfert_profil' | 'transfert_dos'>('cloth');
  const [llmProvider, setLlmProvider] = useState('cloudflare');
  const [userInput, setUserInput] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [llmLoading, setLlmLoading] = useState(false);
  const [llmResult, setLlmResult] = useState<string>('');
  const [agentMetadata, setAgentMetadata] = useState<{ version?: string; provider?: string }>({});

  // Image Generation state
  const [imgProvider, setImgProvider] = useState('fal');
  const [imgPrompt, setImgPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'2:3' | '1:1' | '16:9'>('2:3');
  const [imgLoading, setImgLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [imgMetadata, setImgMetadata] = useState<{ seed?: number; cost?: number; provider?: string }>({});

  const [errorMessage, setErrorMessage] = useState('');

  // Handle image upload to data URL
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Run LLM
  const handleRunAgent = async () => {
    setLlmLoading(true);
    setErrorMessage('');
    setLlmResult('');
    try {
      const res = await fetch('/api/admin/test-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'run_agent',
          agentSlug: selectedAgent,
          userInput,
          images: uploadedImage ? [uploadedImage] : [],
          provider: llmProvider,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Erreur inconnue');
      }
      setLlmResult(data.result);
      setAgentMetadata({ version: data.agentVersion, provider: data.provider });
      // Pre-fill image prompt if result is text
      if (data.result) {
        setImgPrompt(data.result);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Erreur réseau');
    } finally {
      setLlmLoading(false);
    }
  };

  // Run Image Generation
  const handleGenerateImage = async () => {
    setImgLoading(true);
    setErrorMessage('');
    setGeneratedImageUrl('');
    try {
      const res = await fetch('/api/admin/test-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_image',
          prompt: imgPrompt,
          aspectRatio,
          provider: imgProvider,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Erreur génération image');
      }
      setGeneratedImageUrl(data.imageUrl);
      setImgMetadata({
        seed: data.seed,
        cost: data.costEstimateCents,
        provider: data.provider,
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Erreur génération image');
    } finally {
      setImgLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F8] text-[#0B0B0D] p-6 md:p-12 font-mono">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-[#DCDCE2] pb-6">
          <div className="text-xs uppercase tracking-widest text-[#56565F] mb-1">
            Studio fashionai · Console Interne
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0B0B0D]">
            Test Pipeline & Fournisseurs
          </h1>
          <p className="text-sm text-[#56565F] mt-2">
            Page de test isolée pour exécuter les agents LLM et les modèles de génération d'images selon la couche d'abstraction (PRD A0-11).
          </p>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-none">
            <span className="font-bold">ERREUR : </span> {errorMessage}
          </div>
        )}

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Section 1: LLM Agent */}
          <div className="bg-white border border-[#DCDCE2] p-6 space-y-6">
            <div className="border-b border-[#DCDCE2] pb-3 flex justify-between items-center">
              <h2 className="text-sm uppercase tracking-wider font-bold text-[#0B0B0D]">
                1. Étage Agent LLM
              </h2>
              {agentMetadata.version && (
                <span className="text-[10px] bg-[#F6F6F8] px-2 py-0.5 border border-[#DCDCE2] text-[#56565F]">
                  v{agentMetadata.version} · {agentMetadata.provider}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-[#56565F] mb-1">Agent</label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value as any)}
                  className="w-full bg-[#F6F6F8] border border-[#DCDCE2] text-xs p-2.5 text-[#0B0B0D] focus:outline-none"
                >
                  <option value="cloth">cloth (Ghost Mannequin)</option>
                  <option value="swap">swap (Plan Maître)</option>
                  <option value="transfert_profil">transfert_profil (3/4)</option>
                  <option value="transfert_dos">transfert_dos (Dos)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase text-[#56565F] mb-1">Fournisseur LLM</label>
                <select
                  value={llmProvider}
                  onChange={(e) => setLlmProvider(e.target.value)}
                  className="w-full bg-[#F6F6F8] border border-[#DCDCE2] text-xs p-2.5 text-[#0B0B0D] focus:outline-none"
                >
                  <option value="cloudflare">Cloudflare Workers AI (Llama 3.3 70B)</option>
                  <option value="gemini">Google Gemini (gemini-2.0-flash)</option>
                  <option value="openai">OpenAI (GPT-4o)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-[#56565F] mb-1">Image de référence / Vêtement</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFile}
                className="w-full text-xs text-[#56565F] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:bg-[#0B0B0D] file:text-white file:cursor-pointer"
              />
              {uploadedImage && (
                <div className="mt-3 w-28 h-28 border border-[#DCDCE2] overflow-hidden">
                  <img src={uploadedImage} alt="Uploaded preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase text-[#56565F] mb-1">
                Entrée utilisateur / Précisions (@precisions, @modifs)
              </label>
              <textarea
                rows={4}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ex: Robe en lin beige, col V, fermeture zippée invisible dans le dos..."
                className="w-full bg-[#F6F6F8] border border-[#DCDCE2] text-xs p-2.5 text-[#0B0B0D] focus:outline-none"
              />
            </div>

            <button
              onClick={handleRunAgent}
              disabled={llmLoading}
              className="w-full py-3 bg-[#0B0B0D] text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 disabled:opacity-50 transition-colors"
            >
              {llmLoading ? 'Exécution Agent en cours...' : 'Exécuter l\'Agent'}
            </button>

            {llmResult && (
              <div className="mt-4 space-y-2">
                <div className="text-[11px] uppercase text-[#56565F]">Prompt Produit :</div>
                <div className="bg-[#F6F6F8] p-3 text-xs border border-[#DCDCE2] max-h-60 overflow-y-auto whitespace-pre-wrap">
                  {llmResult}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Image Generation */}
          <div className="bg-white border border-[#DCDCE2] p-6 space-y-6">
            <div className="border-b border-[#DCDCE2] pb-3 flex justify-between items-center">
              <h2 className="text-sm uppercase tracking-wider font-bold text-[#0B0B0D]">
                2. Étage Génération Image
              </h2>
              {imgMetadata.provider && (
                <span className="text-[10px] bg-[#F6F6F8] px-2 py-0.5 border border-[#DCDCE2] text-[#56565F]">
                  {imgMetadata.provider} {imgMetadata.cost ? `· ~${imgMetadata.cost}¢` : ''}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-[#56565F] mb-1">Fournisseur Image</label>
                <select
                  value={imgProvider}
                  onChange={(e) => setImgProvider(e.target.value)}
                  className="w-full bg-[#F6F6F8] border border-[#DCDCE2] text-xs p-2.5 text-[#0B0B0D] focus:outline-none"
                >
                  <optgroup label="── Google Cloud ──">
                    <option value="vertex">Google Vertex AI · Imagen 3 (Haute Qualité Studio)</option>
                  </optgroup>
                  <optgroup label="── GRATUIT (Sans clé API) ──">
                    <option value="hf-dev">🟢 HuggingFace · FLUX.1-dev (Haute qualité, ~8s) — GRATUIT</option>
                    <option value="hf-schnell">🟢 HuggingFace · FLUX.1-schnell (Ultra-rapide, ~2s) — GRATUIT</option>
                  </optgroup>
                  <optgroup label="── Autres Payants ──">
                    <option value="fal">Fal.ai (Seedream / Flux Pro)</option>
                    <option value="cloudflare">Cloudflare Workers AI (Flux 1 Schnell)</option>
                    <option value="replicate">Replicate (Flux 1.1 Pro)</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase text-[#56565F] mb-1">Ratio d'aspect</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as any)}
                  className="w-full bg-[#F6F6F8] border border-[#DCDCE2] text-xs p-2.5 text-[#0B0B0D] focus:outline-none"
                >
                  <option value="2:3">2:3 (Plan Maître)</option>
                  <option value="1:1">1:1 (Vues Série)</option>
                  <option value="16:9">16:9 (Triptyque / Paysage)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-[#56565F] mb-1">Prompt Image</label>
              <textarea
                rows={6}
                value={imgPrompt}
                onChange={(e) => setImgPrompt(e.target.value)}
                placeholder="Entrez le prompt à envoyer au générateur d'image..."
                className="w-full bg-[#F6F6F8] border border-[#DCDCE2] text-xs p-2.5 text-[#0B0B0D] focus:outline-none"
              />
            </div>

            <button
              onClick={handleGenerateImage}
              disabled={imgLoading || !imgPrompt}
              className="w-full py-3 bg-[#0B0B0D] text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 disabled:opacity-50 transition-colors"
            >
              {imgLoading ? 'Génération Image en cours...' : 'Générer l\'Image'}
            </button>

            {generatedImageUrl && (
              <div className="mt-4 space-y-2">
                <div className="text-[11px] uppercase text-[#56565F]">Rendu Visuel :</div>
                <div className="border border-[#DCDCE2] bg-[#F6F6F8] overflow-hidden flex items-center justify-center">
                  <img
                    src={generatedImageUrl}
                    alt="Rendu généré"
                    className="max-h-96 w-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
