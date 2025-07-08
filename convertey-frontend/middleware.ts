// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  
  // Allow reset-password route
  if (pathname.startsWith('/reset-password')) {
    return NextResponse.next();
  }
  
  // Check if user is in password reset flow
  const accessToken = searchParams.get('access_token');
  const type = searchParams.get('type');
  
  if (accessToken && type === 'recovery') {
    // User is in password reset flow, only allow reset-password route
    const resetUrl = new URL('/reset-password', request.url);
    resetUrl.searchParams.set('access_token', accessToken);
    resetUrl.searchParams.set('type', type);
    const refreshToken = searchParams.get('refresh_token');
    if (refreshToken) {
      resetUrl.searchParams.set('refresh_token', refreshToken);
    }
    return NextResponse.redirect(resetUrl);
  }

  // Create Supabase client for other routes
  let response = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Check if user is authenticated for protected routes
  const { data: { session } } = await supabase.auth.getSession();
  
  // Define protected routes
  // '/dashboard', '/profile',
  const protectedRoutes = ['/settings'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute && !session) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};