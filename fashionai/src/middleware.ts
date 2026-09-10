import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1. Routes autorisées pour la Phase 1 de lancement :
  // - /studio (et / qui redirige)
  // - /merci/:path*
  // - /admin/:path*
  // - /api/:path*
  // - assets statiques (_next, images, favicon)
  const isStaticOrInternal =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/models') ||
    pathname.startsWith('/Studio_template') ||
    pathname.startsWith('/examples') ||
    pathname.startsWith('/stitch') ||
    pathname.startsWith('/templates') ||
    pathname.includes('.') || // fichiers avec extension
    pathname === '/favicon.ico';

  if (isStaticOrInternal) {
    return NextResponse.next();
  }

  // 2. Gestion de l'authentification Admin
  if (pathname.startsWith('/admin')) {
    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret) {
      const basicAuth = req.headers.get('authorization');
      if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [, pwd] = atob(authValue).split(':');
        if (pwd === adminSecret) {
          return NextResponse.next();
        }
      }
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }
    return NextResponse.next();
  }

  // 3. Pages autorisées pour les utilisateurs en Phase 1
  const isAllowedPhase1 =
    pathname === '/' ||
    pathname === '/studio' ||
    pathname.startsWith('/merci');

  if (!isAllowedPhase1) {
    // Redirection automatique vers le Studio pour toute autre page (ex: /kits, /seance, etc.)
    const url = req.nextUrl.clone();
    url.pathname = '/studio';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
