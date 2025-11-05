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

  // Extract subdomain
  // For production: variant-a.ecomate.vn
  // For local: variant-a.localhost
  const hostParts = hostname.split('.');

  // Handle localhost (for development)
  if (hostname.includes('localhost')) {
    const subdomain = hostname.split('.')[0];

    // Map subdomain to variant
    const variant = SUBDOMAIN_MAPPING[subdomain];

    if (variant) {
      // Rewrite to /landing/[variant]
      // But keep the original URL in browser
      url.pathname = `/landing/${variant}`;
      return NextResponse.rewrite(url);
    }
  }

  // Handle production domains
  if (hostParts.length >= 3) {
    // variant-a.ecomate.vn -> ['variant-a', 'ecomate', 'vn']
    const subdomain = hostParts[0];

    // Map subdomain to variant
    const variant = SUBDOMAIN_MAPPING[subdomain];

    if (variant) {
      // Rewrite to /landing/[variant]
      url.pathname = `/landing/${variant}`;
      return NextResponse.rewrite(url);
    }
  }

  // If no subdomain match, continue normally
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
