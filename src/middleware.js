import { NextResponse } from 'next/server';

const protectedRoutes = ['/tasks', '/tasks/new'];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (!protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks/:path*'],
};
