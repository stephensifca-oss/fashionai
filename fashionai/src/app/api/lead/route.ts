import { submitLead } from "@/app/actions/lead";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const result = await submitLead(formData);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/lead error:", error);
    return NextResponse.json({ success: false, error: "Erreur serveur lors de la soumission." }, { status: 500 });
  }
}
