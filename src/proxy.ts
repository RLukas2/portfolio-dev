import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const alwaysAllowedRoutes = [
  '/home',
  '/about',
  '/projects',
  '/blog',
  '/contact',
];

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    const redirectPath = '/home';
    return NextResponse.rewrite(new URL(redirectPath, request.url));
  }

  const alwaysAllowedRoute = alwaysAllowedRoutes.find((route) =>
    pathname.startsWith(route),
  );

  if (alwaysAllowedRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!api/auth|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
