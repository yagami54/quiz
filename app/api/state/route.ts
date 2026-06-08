import { getPublicState, subscribe } from "@/lib/game";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// القراءة عامة (بيانات عرض فقط) حتى يقدر overlay الـ OBS يقرأها بلا كوكي.
// التحكم (POST /api/control) يبقى محميًا بكلمة السر.
export async function GET(request: Request) {
  void request;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      let closed = false;
      const send = () => {
        if (closed) return;
        try {
          const payload = JSON.stringify(getPublicState());
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        } catch {
          /* controller closed */
        }
      };

      send(); // initial snapshot

      const unsub = subscribe(send);
      const hb = setInterval(send, 1000); // heartbeat + timer refresh

      const close = () => {
        if (closed) return;
        closed = true;
        clearInterval(hb);
        unsub();
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };

      request.signal.addEventListener("abort", close);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
