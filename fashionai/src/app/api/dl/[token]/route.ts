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

  // 1. TÉLÉCHARGEMENT DE LA PLANCHE MANNEQUIN (REDIRECTION VERS ASSET STATIQUE)
  if (downloadType === "model") {
    return NextResponse.redirect(new URL("/models/fatou_character_sheet.png", req.url));
  }

  // 2. TÉLÉCHARGEMENT DU KIT IA COMPLET (.md)
  const kitDocument = generateKitMarkdown(platform);

  return new NextResponse(kitDocument, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="kit-shooting-mode-${platform}-v1.0.md"`,
    },
  });
}
