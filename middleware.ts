import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token, "token");
  
  const isAuth = !!token;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/dashboard", "/tasks"]; // secure routes

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isAuth) {
    // not authenticated and accessing protected route
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*"],
};
