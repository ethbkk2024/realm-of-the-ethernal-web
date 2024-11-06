import { NextRequest, NextResponse } from 'next/server';

export function middleware(_req: NextRequest) {
  // const cookieString = req.headers.get('cookie');
  // if (cookieString && cookieString?.search('accessToken') >= 0) {
  return NextResponse.next();
  // }
  // if (req.nextUrl.pathname === '/') {
  //   return NextResponse.next();
  // }
  // return NextResponse.redirect(new URL('/login', req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next|images|icons|login|favicon.ico).*)',
  ],
};
