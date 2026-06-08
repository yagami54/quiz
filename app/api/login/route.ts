import { NextResponse } from "next/server";
import { AUTH_COOKIE, authToken, checkPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const pw = typeof body.password === "string" ? body.password : "";

  if (!checkPassword(pw)) {
    return NextResponse.json({ error: "wrong-password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, authToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 يومًا
  });
  return res;
}

// تسجيل الخروج
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
