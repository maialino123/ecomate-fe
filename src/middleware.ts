import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Subdomain mapping to variants
const SUBDOMAIN_MAPPING: Record<string, string> = {
  'variant-a': 'A',
  'variant-b': 'B',
  'variant-c': 'C',
  'variant-d': 'D',
  'a': 'A',  // Short aliases
  'b': 'B',
  'c': 'C',
  'd': 'D',
};

/**
 * Middleware for handling subdomain routing
 *
 * Note: While Next.js 16 introduces "proxy" convention, we're using "middleware"
 * for better Vercel compatibility until their build system fully supports proxy.ts
 *
 * Subdomain Strategy:
 * - variant-a.ecomate.vn → /landing/A
 * - variant-b.ecomate.vn → /landing/B
 * - variant-c.ecomate.vn → /landing/C
 * - variant-d.ecomate.vn → /landing/D
 * - variant-d.app-name.vercel.app → /landing/D (Vercel preview URLs)
 * - ecomate.vn → / (main site)
 *
 * Local Testing:
 * Add to /etc/hosts:
 * 127.0.0.1 variant-a.localhost
 * 127.0.0.1 variant-b.localhost
 * 127.0.0.1 variant-c.localhost
 * 127.0.0.1 variant-d.localhost
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Skip if already on landing page to avoid infinite loops
  if (url.pathname.startsWith('/landing/')) {
    return NextResponse.next();
  }

  // Extract subdomain from hostname
  const hostParts = hostname.split('.');

  // Debug logging (visible in Vercel logs)
  console.log('[Middleware] hostname:', hostname);
  console.log('[Middleware] pathname:', url.pathname);
  console.log('[Middleware] hostParts:', hostParts);

  // Extract the subdomain (first part of hostname)
  const subdomain = hostParts[0];
  console.log('[Middleware] subdomain:', subdomain);

  // Map subdomain to variant
  const variant = SUBDOMAIN_MAPPING[subdomain];
  console.log('[Middleware] mapped variant:', variant);

  if (variant) {
    // Rewrite to /landing/[variant]
    // This keeps the original URL in the browser
    const newPath = `/landing/${variant}`;
    console.log('[Middleware] Rewriting to:', newPath);
    url.pathname = newPath;
    return NextResponse.rewrite(url);
  }

  // No subdomain match - continue normally
  console.log('[Middleware] No variant match, continuing normally');
  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
