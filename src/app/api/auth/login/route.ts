import { NextResponse } from "next/server";
import { validateAdminLogin } from "@/lib/auth/admin-auth";

export async function POST(req: Request) {
  const body = await req.json();

  const { username, password } = body;

  if (!validateAdminLogin(username, password)) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true
  });

  // set cookie session
  response.cookies.set("admin-token", "authenticated", {
    httpOnly: true,
    secure: true,
    path: "/"
  });

  return response;
}
