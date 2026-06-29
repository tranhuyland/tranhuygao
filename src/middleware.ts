import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && token !== "authenticated") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
