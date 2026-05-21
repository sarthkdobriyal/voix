import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn =
    request.cookies.has('authjs.session-token') ||
    request.cookies.has('__Secure-authjs.session-token')

  const isAppRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/exercises') ||
    request.nextUrl.pathname.startsWith('/speaking')

  if (isAppRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
