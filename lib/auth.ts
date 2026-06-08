import crypto from "crypto";

// كلمة السر تُضبط في .env.local (ADMIN_PASSWORD). إن لم تُضبط، تبقى اللوحة مفتوحة (غير محمية).
const PASSWORD = process.env.ADMIN_PASSWORD || "";
const SECRET = process.env.ADMIN_SECRET || "culture-quiz-fallback-secret";

export const AUTH_COOKIE = "quiz_auth";
export const isConfigured = () => PASSWORD.length > 0;

/** token غير قابل للتخمين بدون كلمة السر، يُخزَّن في الكوكي */
export function authToken(): string {
  return crypto.createHmac("sha256", SECRET).update(PASSWORD).digest("hex");
}

/** مقارنة كلمة السر بزمن ثابت (ضد timing attacks) */
export function checkPassword(pw: string): boolean {
  if (!isConfigured()) return false;
  const a = Buffer.from(String(pw));
  const b = Buffer.from(PASSWORD);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** هل الطلب مُصادَق عليه عبر الكوكي؟ */
export function isAuthed(request: Request): boolean {
  if (!isConfigured()) return true; // لا كلمة سر مضبوطة => مفتوح
  const cookie = request.headers.get("cookie") || "";
  const m = cookie.match(new RegExp(`(?:^|; )${AUTH_COOKIE}=([^;]+)`));
  return !!m && m[1] === authToken();
}

/** للحماية في مسارات الـ API: ترجع Response 401 إن لم يكن مصادقًا، وإلا null */
export function guard(request: Request): Response | null {
  if (isAuthed(request)) return null;
  return Response.json({ error: "unauthorized" }, { status: 401 });
}
