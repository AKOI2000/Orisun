import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, isValidSessionToken } from '@/lib/auth';

// Middleware runs on the Edge Runtime by default, which doesn't have
// Node's 'crypto' module or support bcryptjs - both of which lib/auth.js
// needs. Forcing the Node.js runtime here gives us the full environment.
export const runtime = 'nodejs';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const loggedIn = isValidSessionToken(token);

  // No session, trying to reach the dashboard - send them to log in.
  if (!loggedIn && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Already logged in, visiting the login page - no need to see it again.
  if (loggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};