import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

function getAdminSecret() {
  // En mode local developpement avec next dev, getRequestContext().env peut etre vide
  // On fallback sur process.env standard
  try {
    const ctx = getRequestContext();
    if (ctx?.env?.ADMIN_SECRET) return ctx.env.ADMIN_SECRET as string;
  } catch (e) {
    // Ignorer
  }
  return process.env.ADMIN_SECRET;
}

export async function checkAuthAPI(req?: Request) {
  const secret = getAdminSecret();
  if (!secret) {
    return new NextResponse('Zone privée désactivée (ADMIN_SECRET absent).', { status: 503 });
  }

  if (req) {
    const authHeader = req.headers.get('x-admin-secret');
    if (authHeader === secret) return null;
  }

  try {
    const c = await cookies();
    const fromCookie = c.get('fa_admin')?.value;
    if (fromCookie === secret) return null;

    const h = await headers();
    const fromHeader = h.get('x-admin-secret');
    if (fromHeader === secret) return null;
  } catch (err) {
    console.error("Auth API fallback error:", err);
  }

  return new NextResponse('Non autorisé.', { status: 401 });
}

export async function requireAuthPage() {
  const secret = getAdminSecret();
  if (!secret) {
    throw new Error('Zone privée désactivée (ADMIN_SECRET absent).');
  }

  try {
    const c = await cookies();
    const fromCookie = c.get('fa_admin')?.value;
    if (fromCookie !== secret) return false;
    return true;
  } catch (err) {
    console.error("Auth Page error:", err);
    return false;
  }
}
