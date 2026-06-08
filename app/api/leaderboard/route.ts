import { getTopAllTime, supabaseEnabled } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const channel = new URL(request.url).searchParams.get("channel") || "";
  const players = await getTopAllTime(channel, 100);
  return Response.json({ enabled: supabaseEnabled(), players });
}
