import { isAuthed, isConfigured } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return Response.json({
    authed: isAuthed(request),
    configured: isConfigured(),
  });
}
