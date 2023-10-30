import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

const path = ['/dashboard', '/settings', '/transactions', '/addTransaction', '/statistic']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookie = request.cookies.has("jwt-token");

  if (pathname.startsWith("/login") && cookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (!request.cookies.has("jwt-token") && path.some(e => e.includes(pathname))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [...path, '/login'],
}