import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getVariant,
  VARIANT_COOKIE_NAME,
  VARIANT_COOKIE_MAX_AGE
} from '@/lib/ab-testing';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply A/B testing to landing page routes
  if (pathname === '/landing' || pathname === '/landing/') {
    // Check if user already has a variant assigned
    const existingVariant = request.cookies.get(VARIANT_COOKIE_NAME)?.value;
    const variant = getVariant(existingVariant);

    // Create response with redirect to variant page
    const url = request.nextUrl.clone();
    url.pathname = `/landing/${variant}`;
    const response = NextResponse.rewrite(url);

    // Set cookie if not already set or if variant changed
    if (!existingVariant || existingVariant !== variant) {
      response.cookies.set(VARIANT_COOKIE_NAME, variant, {
        maxAge: VARIANT_COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
      });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
