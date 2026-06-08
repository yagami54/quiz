// Kick chat connector — reads public chat via Pusher websocket (no auth needed).
import { execFile } from "child_process";

const PUSHER_KEY = "32cbd69e4b950bf97679";
const PUSHER_URL = `wss://ws-us2.pusher.com/app/${PUSHER_KEY}?protocol=7&client=js&version=8.4.0&flash=false`;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

export interface ChatMsg {
  username: string;
  content: string;
  color?: string;
  at: number;
}

export type KickStatus = "idle" | "connecting" | "connected" | "error";

/**
 * Fetch the channel JSON. Kick is behind Cloudflare which blocks Node's fetch
 * (TLS fingerprint), so we shell out to curl which passes. curl ships with
 * Windows 10+ and is present on macOS/Linux.
 */
function fetchChannel(slug: string): Promise<unknown> {
  const url = `https://kick.com/api/v2/channels/${encodeURIComponent(slug)}`;
  return new Promise((resolve, reject) => {
    execFile(
      "curl",
      ["-s", "-m", "20", "-A", UA, "-H", "Accept: application/json", url],
      { maxBuffer: 10 * 1024 * 1024 },
      (err, stdout) => {
        if (err) return reject(new Error("تعذّر الاتصال بـ Kick (curl)"));
        if (!stdout || !stdout.trim())
          return reject(new Error("القناة غير موجودة أو محجوبة"));
        try {
          resolve(JSON.parse(stdout));
        } catch {
          reject(new Error("استجابة غير متوقعة من Kick (ربما Cloudflare)"));
        }
      }
    );
  });
}

/**
 * معرّف غرفة دردشة ثابت من البيئة (احتياطي عند حجب Cloudflare للـ datacenter).
 * صيغ مدعومة:
 *   KICK_CHATROOM_ID=15933557                       (يُطبَّق على أي قناة)
 *   KICK_CHATROOM_ID=yuri4games:15933557,other:123  (خريطة slug:id)
 */
function chatroomIdFromEnv(slug: string): number | null {
  const raw = (process.env.KICK_CHATROOM_ID || "").trim();
  if (!raw) return null;
  if (/^\d+$/.test(raw)) return Number(raw);
  for (const part of raw.split(",")) {
    const [s, id] = part.split(":").map((x) => x.trim());
    if (s && id && s.toLowerCase() === slug.toLowerCase() && /^\d+$/.test(id)) {
      return Number(id);
    }
  }
  return null;
}

export class KickChat {
  slug = "";
  chatroomId: number | null = null;
  status: KickStatus = "idle";
  error = "";
  private ws: WebSocket | null = null;
  private onMsg: (m: ChatMsg) => void;
  private onStatus: () => void;
  private stopped = false;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(onMsg: (m: ChatMsg) => void, onStatus: () => void) {
    this.onMsg = onMsg;
    this.onStatus = onStatus;
  }

  async connect(slug: string) {
    this.disconnect();
    this.stopped = false;
    this.slug = slug.trim().toLowerCase().replace(/^@/, "");
    this.status = "connecting";
    this.error = "";
    this.onStatus();

    // 1) جلب معرّف الغرفة عبر API (يعمل من IP منزلي)
    let id: number | null = null;
    try {
      const data = (await fetchChannel(this.slug)) as { chatroom?: { id?: number } };
      id = data?.chatroom?.id ?? null;
    } catch {
      /* قد يحجب Cloudflare طلبات الـ datacenter — نجرّب fallback تحت */
    }

    // 2) fallback: معرّف ثابت من متغيّر البيئة (للنشر على خوادم datacenter مثل Render)
    //    صيغة: KICK_CHATROOM_ID=<id> أو KICK_CHATROOM_ID=<slug>:<id>,<slug>:<id>
    if (!id) id = chatroomIdFromEnv(this.slug);

    if (!id) {
      this.status = "error";
      this.error = "تعذّر الحصول على معرّف غرفة الدردشة";
      this.onStatus();
      return;
    }

    this.chatroomId = id;
    this.openSocket();
  }

  private openSocket() {
    if (this.stopped || !this.chatroomId) return;
    const ws = new WebSocket(PUSHER_URL);
    this.ws = ws;

    ws.onopen = () => {
      /* wait for connection_established */
    };

    ws.onmessage = (e) => {
      let m: { event: string; data?: string };
      try {
        m = JSON.parse(typeof e.data === "string" ? e.data : "");
      } catch {
        return;
      }
      if (m.event === "pusher:connection_established") {
        ws.send(
          JSON.stringify({
            event: "pusher:subscribe",
            data: { channel: `chatrooms.${this.chatroomId}.v2` },
          })
        );
      } else if (m.event === "pusher_internal:subscription_succeeded") {
        this.status = "connected";
        this.error = "";
        this.onStatus();
      } else if (typeof m.event === "string" && m.event.includes("ChatMessage")) {
        // Kick renamed this event: "App\Events\ChatMessage" -> "App\Events\ChatMessageEvent".
        // Match by substring so we survive future renames too.
        try {
          const d = JSON.parse(m.data || "{}");
          this.onMsg({
            username: d?.sender?.username ?? "?",
            content: String(d?.content ?? ""),
            color: d?.sender?.identity?.color,
            at: Date.now(),
          });
        } catch {
          /* ignore malformed */
        }
      }
    };

    ws.onerror = () => {
      this.status = "error";
      this.error = "انقطع الاتصال بالدردشة";
      this.onStatus();
    };

    ws.onclose = () => {
      if (this.stopped) return;
      // auto-reconnect
      this.reconnectTimer = setTimeout(() => this.openSocket(), 3000);
    };
  }

  disconnect() {
    this.stopped = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.ws) {
      try {
        this.ws.close();
      } catch {
        /* ignore */
      }
      this.ws = null;
    }
    this.status = "idle";
    this.onStatus();
  }
}
