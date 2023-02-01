import acceptLanguage from 'accept-language';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getPathLanguage } from './lib/i18n/pathname';
import { fallbackLang, languages } from './lib/i18n/settings';

acceptLanguage.languages(languages);

const cookieName = 'i18next';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const userLanguage = getUserLanguage(req);
  const pathLanguage = getPathLanguage(req.nextUrl.pathname);
  if (!languages.includes(pathLanguage)) {
    return NextResponse.redirect(
      new URL(`/${userLanguage}${req.nextUrl.pathname}`, req.url),
    );
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer')!);
    const refererLanguage = getPathLanguage(refererUrl.pathname);
    if (languages.includes(refererLanguage)) {
      res.cookies.set(cookieName, refererLanguage);
    }
  }

  return res;
}

export const config = {
  matcher: [
    // Skip libraries and assets
    '/((?!api|_next/static|_next/image|assets|favicon|sw.js).*)',
  ],
};

function getUserLanguage(req: NextRequest) {
  let userLanguage;
  if (req.cookies.has(cookieName)) {
    userLanguage = acceptLanguage.get(req.cookies.get(cookieName)!.value);
  }
  if (!userLanguage) {
    userLanguage = acceptLanguage.get(req.headers.get('Accept-Language'));
  }
  if (!userLanguage) {
    userLanguage = fallbackLang;
  }
  return userLanguage;
}
