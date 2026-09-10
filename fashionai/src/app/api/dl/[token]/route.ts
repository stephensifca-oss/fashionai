import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || !token.startsWith("token-")) {
    return new NextResponse("Token de téléchargement invalide ou expiré.", {
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const searchParams = req.nextUrl.searchParams;
  const downloadType = searchParams.get("type") || "kit";
  const platform = (searchParams.get("platform") || "google").toLowerCase();

  // Track download in leads store
  try {
    const { incrementLeadDownloads } = await import("@/lib/leads-store");
    incrementLeadDownloads(token);
  } catch (err) {
    console.error("Error tracking download:", err);
  }

  // 1. TÉLÉCHARGEMENT DE LA PLANCHE MANNEQUIN (IMAGE TEST FATOU @perso)
  if (downloadType === "model") {
    try {
      const modelPath = path.join(process.cwd(), "public", "models", "fatou_character_sheet.png");
      if (!fs.existsSync(modelPath)) {
        return new NextResponse("Fichier image non trouvé.", { status: 404 });
      }
      const imageBuffer = fs.readFileSync(modelPath);

      return new NextResponse(imageBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": 'attachment; filename="planche-mannequin-fatou-reference.png"',
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch (e) {
      console.error("Erreur lors du téléchargement de l'image mannequin :", e);
      return new NextResponse("Erreur lors de la lecture du fichier image.", { status: 500 });
    }
  }

  // 2. TÉLÉCHARGEMENT DU KIT IA COMPLET (.md)
  let installGuide = "";
  let chargeurContent = "";
  let systemeContent = "";

  try {
    const installPath = path.join(process.cwd(), "agents", "INSTALLATION_GUIDE.md");
    if (fs.existsSync(installPath)) {
      installGuide = fs.readFileSync(installPath, "utf-8");
    }
  } catch (e) {
    console.error("Failed to read INSTALLATION_GUIDE", e);
  }

  try {
    const chargeurPath = path.join(process.cwd(), "agents", "CHARGEUR_V-USER.txt");
    if (fs.existsSync(chargeurPath)) {
      chargeurContent = fs.readFileSync(chargeurPath, "utf-8");
    }
  } catch (e) {
    console.error("Failed to read CHARGEUR_V-USER", e);
  }

  try {
    const systemePath = path.join(process.cwd(), "agents", "SYSTEME_V-USER.md");
    if (fs.existsSync(systemePath)) {
      systemeContent = fs.readFileSync(systemePath, "utf-8");
    }
  } catch (e) {
    console.error("Failed to read SYSTEME_V-USER", e);
  }

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

  const selectedPlatformNote = platformNotes[platform] || platformNotes.google;

  const kitDocument = `# 📸 KIT OFFICIEL SHOOTING PRODUIT IA — V1.0 [ÉDITION ${platform.toUpperCase()}]
*FashionAI Studio — https://fashionai.agency*
*Délivré le : ${new Date().toLocaleDateString('fr-FR')}*

---

> **Note d'exploitation :** Ce kit vous permet de générer des séries complètes de shooting mode (7 vues cohérentes) à partir d'une photo de votre vêtement et d'une planche mannequin.
> 
> *« Le premier essai rate souvent. C'est normal — rejoignez la session du samedi ou écrivez-nous sur WhatsApp pour débloquer vos prompts. »*

---

${selectedPlatformNote}

---

# 📦 PIÈCE 0 : GUIDE D'INSTALLATION & DE DÉPLOIEMENT

${installGuide}

---

# 🚀 PIÈCE 1 : LE CHARGEUR D'INSTRUCTIONS (< 8 000 Caractères)
> **À COPIER DIRECTEMENT DANS LE CHAMP "INSTRUCTIONS" DE VOTRE GPT OU GEM PERSONNALISÉ**

\`\`\`markdown
${chargeurContent}
\`\`\`

---

# 📚 PIÈCE 2 : LE FICHIER SYSTÈME (BASE DE CONNAISSANCES)
> **À ENREGISTRER SOUS LE NOM "SYSTEME_V-USER.md" ET À TÉLÉVERSER DANS LA SECTION "CONNAISSANCES / FICHIERS"**

${systemeContent}

---

## 🖼️ RESSOURCES & ASSETS DE TEST JOINTS
- **Planche Mannequin Officielle :** Fatou (\`planche-mannequin-fatou-reference.png\`)
- **Décor Signature :** Cyclorama Blanc Pur (\`#EDEBE6\`)

---

## 💬 ASSISTANCE DIRECTE WHATSAPP
- **M'inscrire à la séance du samedi :** https://wa.me/2250757512959?text=Je%20m'inscris%20%C3%A0%20la%20s%C3%A9ance%20du%20samedi
- **Débloquer une étape :** https://wa.me/2250757512959?text=Je%20suis%20bloqu%C3%A9%20sur%20le%20kit
`;

  return new NextResponse(kitDocument, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="kit-shooting-mode-${platform}-v1.0.md"`,
    },
  });
}
