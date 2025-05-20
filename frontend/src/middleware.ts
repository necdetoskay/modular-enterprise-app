import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Bu fonksiyon, her istekte çalışır
export function middleware(request: NextRequest) {
  // Kullanıcının oturum durumunu kontrol et
  // localStorage'a doğrudan erişemediğimiz için, token'ı cookie'den kontrol ediyoruz
  const token = request.cookies.get('token')?.value || '';
  const isLoggedIn = !!token;

  // Kullanıcının gitmeye çalıştığı URL
  const { pathname } = request.nextUrl;

  // Dashboard sayfalarına erişim kontrolü
  if (pathname.startsWith('/dashboard') && !isLoggedIn) {
    // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendir
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Kullanıcı giriş yapmışsa ve auth sayfalarına erişmeye çalışıyorsa
  if (pathname.startsWith('/auth') && isLoggedIn) {
    // Dashboard'a yönlendir
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Diğer durumlarda normal akışa devam et
  return NextResponse.next();
}

// Middleware'in hangi yollar için çalışacağını belirt
export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
