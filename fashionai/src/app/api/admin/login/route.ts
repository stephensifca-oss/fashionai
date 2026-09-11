import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json();
    const serverSecret = process.env.ADMIN_SECRET;

    if (!serverSecret) {
      return NextResponse.json({ error: "Configuration missing" }, { status: 503 });
    }

    if (secret === serverSecret) {
      const res = NextResponse.json({ success: true });
      res.cookies.set("fa_admin", secret, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return res;
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
