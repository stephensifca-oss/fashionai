export function generateKitMarkdown(platform: string = "google"): string {
  const p = platform.toLowerCase();

  const platformNotes: Record<string, string> = {
    google: `### 🎯 CONSEILS D'EXÉCUTION SPÉCIFIQUES POUR GOOGLE (GEMINI / IMAGEN 3 / VERTEX AI)
- Créez un **Gem personnalisé** dans Gemini : collez la Pièce 1 (Chargeur) dans le champ **Instructions**, et téléversez la Pièce 2 (Système) en **Fichier de connaissances**.
- **Important pour Gemini/Imagen 3 :** Si vous générez directement dans Gemini, indiquez-lui la phrase magique : *« Je génère les images ici même, reformule les négatifs en positif »*.
- Utilisez la planche mannequin jointe (@perso) et vos photos de vêtement (@tenue).`,

    chatgpt: `### 🎯 CONSEILS D'EXÉCUTION SPÉCIFIQUES POUR CHATGPT / OPENAI (GPT-4O / DALL-E)
- Créez un **GPT personnalisé** (Explorer les GPT → Créer → Configurer).
- Collez la Pièce 1 (Chargeur) dans le champ **Instructions** (compteur < 8 000 caractères).
- Téléversez la Pièce 2 (Système) dans la section **Connaissances**.
- Désactivez "Génération d'images" sur GPT si vous voulez que l'agent livre exclusivement les prompts optimisés sans gaspiller vos messages.`,

    autres: `### 🎯 CONSEILS D'EXÉCUTION SPÉCIFIQUES POUR CLAUDE (ANTHROPIC), SEEDREAM, FLUX & MIDJOURNEY
- **Pour Claude (3.7 Sonnet / 3.5 Sonnet) :** Téléversez la Pièce 2 (Système) dans un Projet Claude ou joignez-le en contexte avec votre image vêtement (@tenue) et votre mannequin (@perso).
- Le système V-USER génère la syntaxe native 14 blocs calibrée pour **Seedream 5.0 PRO**, **Flux.1** et **Midjourney v6** (\`--cref\` / \`--sref\`).
- Pour ComfyUI / Fooocus : IP-Adapter Style Fidelity 0.7, Composition 0.8.`,
  };

  const selectedNote = platformNotes[p] || platformNotes.google;

  return `# 📸 KIT OFFICIEL SHOOTING PRODUIT IA — V1.0 [ÉDITION ${p.toUpperCase()}]
*FashionAI Studio — https://fashionai.agency*
*Délivré le : ${new Date().toLocaleDateString('fr-FR')}*

---

> **Note d'exploitation :** Ce kit vous permet de générer des séries complètes de shooting mode (7 vues cohérentes) à partir d'une photo de votre vêtement et d'une planche mannequin.
> 
> *« Le premier essai rate souvent. C'est normal — rejoignez la session du samedi ou écrivez-nous sur WhatsApp pour débloquer vos prompts. »*

---

${selectedNote}

---

# 📦 PIÈCE 0 : GUIDE D'INSTALLATION & DE DÉPLOIEMENT

## 1. Principe de fonctionnement
Le système repose sur une architecture en 3 couches :
1. **L'analyse textile (@tenue) :** Déconstruction de la matière, texture, coupe, drapé et finitions.
2. **Le verrou d'identité (@perso) :** Préservation stricte du visage, morphologie et coiffure du mannequin.
3. **La cohérence spatiale 360° :** Génération séquentielle des 7 vues éditoriales (Face, Profil, Dos, Macro, etc.).

---

# 🚀 PIÈCE 1 : LE CHARGEUR D'INSTRUCTIONS (< 8 000 Caractères)
> **À COPIER DIRECTEMENT DANS LE CHAMP "INSTRUCTIONS" DE VOTRE GPT OU GEM PERSONNALISÉ**

\`\`\`markdown
# RÔLE & DIRECTIVES DU MODÈLE
Tu es le Moteur Éditorial FashionAI spécialisé dans la production de shootings mode haute couture et e-commerce.
À partir de deux images de référence (@tenue = vêtement, @perso = mannequin) et d'une sélection de cadrage (@source), tu rédiges des prompts photographiques ultra-détaillés en 14 blocs sans aucune dérive de couleur, coupe ou identité.
\`\`\`

---

# 📚 PIÈCE 2 : LE FICHIER SYSTÈME (BASE DE CONNAISSANCES)
> **À ENREGISTRER SOUS LE NOM "SYSTEME_V-USER.md" ET À TÉLÉVERSER DANS LA SECTION "CONNAISSANCES / FICHIERS"**

## Matrice des 7 Cadrages Signature
1. **Plan Maître (Full-Body) :** 85mm f/2.8, lumière cyclorama diffusée 5600K.
2. **Vue Profil 3/4 :** Cadrage 70mm, drapé latéral et tombé naturel du tissu.
3. **Vue Dos Épurée :** Éclairage arrière subtil, finitions et découpes du dos.
4. **Macro Matière & Finitions :** 105mm Macro f/4, grain textile net, surpiqûres visibles.

---

## 🖼️ RESSOURCES & ASSETS DE TEST JOINTS
- **Planche Mannequin Officielle :** Fatou (\`planche-mannequin-fatou-reference.png\`)
- **Décor Signature :** Cyclorama Blanc Pur (\`#EDEBE6\`)

---

## 💬 ASSISTANCE DIRECTE WHATSAPP
- **M'inscrire à la séance du samedi :** https://wa.me/2250757512959?text=Je%20m'inscris%20%C3%A0%20la%20s%C3%A9ance%20du%20samedi
- **Débloquer une étape :** https://wa.me/2250757512959?text=Je%20suis%20bloqu%C3%A9%20sur%20le%20kit
`;
}
