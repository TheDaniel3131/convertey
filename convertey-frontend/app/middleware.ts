import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // 1️⃣  Detect Supabase recovery link – they always carry these params
  const isRecovery = url.searchParams.get("type") === "recovery";
  const isResetRoute = url.pathname.startsWith("/reset-password");

  if (isRecovery && !isResetRoute) {
    // Redirect the user back to the reset page *with* their querystring intact.
    return NextResponse.redirect(new URL(`/reset-password${url.search}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // Run on every route
};