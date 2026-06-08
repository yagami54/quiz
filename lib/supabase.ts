import { createClient, SupabaseClient } from "@supabase/supabase-js";

// تكامل اختياري: إن لم تُضبط مفاتيح Supabase، كل الدوال تصبح no-op واللعبة تعمل عادي.
const URL = process.env.SUPABASE_URL || "";
const KEY = process.env.SUPABASE_SERVICE_KEY || "";

let client: SupabaseClient | null = null;

export const supabaseEnabled = () => Boolean(URL && KEY);

function getClient(): SupabaseClient | null {
  if (!supabaseEnabled()) return null;
  if (!client) client = createClient(URL, KEY, { auth: { persistSession: false } });
  return client;
}

/** يضيف نقاطًا للصدارة التاريخية (atomic increment عبر RPC). fire-and-forget. */
export async function addPointsToHistory(
  channel: string,
  username: string,
  displayName: string,
  points: number
) {
  const c = getClient();
  if (!c || points === 0 || !channel) return;
  try {
    await c.rpc("add_points", {
      p_channel: channel.toLowerCase(),
      p_username: username.toLowerCase(),
      p_display: displayName,
      p_points: points,
    });
  } catch {
    /* تجاهل أخطاء الشبكة — لا تُعطّل اللعبة */
  }
}

export interface HistoryRow {
  username: string;
  points: number;
}

/** يجلب الصدارة التاريخية لقناة معيّنة (الأعلى نقاطًا). */
export async function getTopAllTime(channel: string, limit = 100): Promise<HistoryRow[]> {
  const c = getClient();
  if (!c || !channel) return [];
  try {
    const { data } = await c
      .from("leaderboard")
      .select("display_name, total_points")
      .eq("channel", channel.toLowerCase())
      .order("total_points", { ascending: false })
      .limit(limit);
    return (data ?? []).map((r) => ({
      username: (r as { display_name: string }).display_name,
      points: (r as { total_points: number }).total_points,
    }));
  } catch {
    return [];
  }
}
