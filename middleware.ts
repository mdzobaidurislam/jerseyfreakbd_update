import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';
// import { auth } from './auth';

export async function middleware(req: NextRequest) {
  const token = await auth();
  const { pathname, searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get('callbackUrl');
  const loginUrl = new URL('/login', req.url);

  loginUrl.searchParams.set('callbackUrl', pathname);

  // If the user is logged in, redirect away from login page
  if (token && pathname === '/login') {
    const redirectTo = redirectUrl || '/user/dashboard';
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // If the user is not logged in and trying to access a protected route, redirect to login page
  const protectedRoutes = ['/user/:path*', '/checkout'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route.replace(':path*', '')));

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};