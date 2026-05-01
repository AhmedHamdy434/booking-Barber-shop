import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1. Run next-intl middleware
  const response = intlMiddleware(request);

  // 2. Refresh Supabase session
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This will refresh session if expired - required for Server Components
  // and for protecting routes
  const { data: { user } } = await supabase.auth.getUser()

  // 3. Protect routes
  const { pathname } = request.nextUrl;
  const isProtectedRoute = pathname.includes('/booking') || pathname.includes('/my-bookings');
  
  if (isProtectedRoute && !user) {
    // Redirect to login if trying to access protected route without auth
    // We need to keep the locale in the URL
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
