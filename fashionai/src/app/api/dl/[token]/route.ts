import { NextRequest, NextResponse } from "next/server";
import { generateKitMarkdown } from "@/lib/kit-generator";

export const runtime = 'edge';

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
  const slug = searchParams.get("slug") || "";

  // Cas spécial : Kit Atelier Collection (Pack ZIP par modèle ou fichiers individuels)
  if (slug === "atelier-collection" || downloadType.startsWith("atelier_")) {
    if (downloadType === "atelier_chargeur") {
      return NextResponse.redirect(new URL("/kits/atelier-collection/CHARGEUR_ATELIER_COLLECTION.txt", req.url));
    }
    if (downloadType === "atelier_systeme") {
      return NextResponse.redirect(new URL("/kits/atelier-collection/SYSTEME_ATELIER_COLLECTION.md", req.url));
    }
    if (downloadType === "atelier_guide") {
      return NextResponse.redirect(new URL("/kits/atelier-collection/GUIDE_INSTALLATION_ATELIER_COLLECTION.md", req.url));
    }

    if (platform === "chatgpt") {
      return NextResponse.redirect(new URL("/atelier-collection_ChatGPT_V5.3.zip", req.url));
    }
    if (platform === "claude") {
      return NextResponse.redirect(new URL("/atelier-collection_Claude_V5.3.zip", req.url));
    }
    return NextResponse.redirect(new URL("/atelier-collection_Gemini_V5.3.zip", req.url));
  }

  // 1. TÉLÉCHARGEMENT DE LA PLANCHE MANNEQUIN (REDIRECTION VERS ASSET STATIQUE)
  if (downloadType === "model") {
    return NextResponse.redirect(new URL("/models/fatou_character_sheet.png", req.url));
  }

  // 2. TÉLÉCHARGEMENT DU KIT IA COMPLET (.md)
  const kitDocument = generateKitMarkdown(platform);

  let filename = "SHOOTING_IA_GEMINI.md";
  if (platform === "claude") filename = "SHOOTING_IA_CLAUDE.md";
  else if (platform === "chatgpt") filename = "SHOOTING_IA_CHAT-GPT.md";

  return new NextResponse(kitDocument, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
