import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthAction } from './lib/auth/authAction';

// export default createMiddleware({
//   locales: ['en', 'ru'],
//   defaultLocale: 'en'
// });


const intlMiddleware = createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en'
});

export async function middleware(request: NextRequest) {


  if (request.nextUrl.pathname.startsWith('/(en|ru)/admin-moderator')) {

    const cookie = request.cookies.get('AdminToken')?.value
    // console.log("🚀 ~ middleware ~ cookie:", cookie)



    if (!cookie) {
      NextResponse.redirect(new URL('/admin-moderator', request.url))
    }
    NextResponse.json({
      token: cookie
    })

  }
  if (request.nextUrl.pathname.startsWith('/(en|ru)/admin-4c458ba3adfa8005a9df1c8fa74e28e0')) {

    const cookie = request.cookies.get('SuperAdminToken')?.value
    if (!cookie) {
      NextResponse.redirect(new URL('/admin-moderator', request.url))
    }
    NextResponse.json({
      token: cookie
    })

  }
 



  return intlMiddleware(request);
}



export const config = {
  matcher: ['/', '/(en|ru)/:path*']
};
