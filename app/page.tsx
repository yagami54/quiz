"use client";

import { useGameState } from "@/lib/useGameState";
import { TOPIC_LABELS, Topic, PublicState, PredKind, PRED_LABELS } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

async function send(action: string, extra: Record<string, unknown> = {}) {
  await fetch("/api/control", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...extra }),
  });
}

async function logout() {
  await fetch("/api/login", { method: "DELETE" });
  window.location.reload();
}

const TOPIC_EMOJI: Record<string, string> = {
  mixed: "🎲",
  general: "🧠",
  history: "🏛️",
  geography: "🗺️",
  science: "🔬",
  religion: "🕌",
  sports: "⚽",
  art: "🎨",
  gaming: "🎮",
};

const OPTION_COLORS = [
  "bg-rose-500/90",
  "bg-sky-500/90",
  "bg-amber-500/90",
  "bg-emerald-500/90",
];

export default function Page() {
  const [auth, setAuth] = useState<{ authed: boolean; configured: boolean } | null>(null);
  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then(setAuth)
      .catch(() => setAuth({ authed: true, configured: false }));
  }, []);

  if (!auth)
    return <main className="flex-1 grid place-items-center text-slate-500">تحميل...</main>;
  if (auth.configured && !auth.authed)
    return <LoginScreen onSuccess={() => setAuth({ authed: true, configured: true })} />;
  return <AdminApp />;
}

// ---------------- Login gate ----------------
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (!pw.trim() || busy) return;
    setBusy(true);
    setErr(false);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setBusy(false);
    if (res.ok) onSuccess();
    else {
      setErr(true);
      setPw("");
    }
  };
  return (
    <main className="flex-1 grid place-items-center p-6">
      <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black/90 border border-amber-500/25 p-8 text-center space-y-5 animate-pop shadow-[0_0_60px_-15px_rgba(212,175,55,0.4)]">
        <img src="/logo.png" alt="Yuri4Games" className="w-24 h-24 mx-auto object-contain gold-glow" />
        <div>
          <h1 className="text-2xl font-extrabold gold-text leading-tight">لوحة التحكم</h1>
          <p className="text-amber-200/70 text-xs font-bold tracking-widest mt-1">YURI4GAMES</p>
        </div>
        <p className="text-slate-400 text-sm">أدخل كلمة السر للدخول.</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="كلمة السر"
          className="w-full rounded-xl bg-black/50 border border-zinc-700 px-3 py-3 text-center outline-none focus:border-amber-500 transition"
        />
        {err && <p className="text-rose-400 text-sm">⚠ كلمة السر غير صحيحة</p>}
        <button
          onClick={submit}
          disabled={busy || !pw.trim()}
          className="btn-gold w-full rounded-xl font-extrabold py-3 text-lg"
        >
          {busy ? "جارٍ التحقّق..." : "دخول"}
        </button>
      </div>
    </main>
  );
}

function AdminApp() {
  const { state, connected } = useGameState();

  if (!state) {
    return (
      <main className="flex-1 grid place-items-center text-slate-500">
        تحميل...
      </main>
    );
  }

  // 1) not connected to Kick
  if (state.status !== "connected") {
    return <ConnectScreen state={state} sse={connected} />;
  }
  // 2) connected but no activity chosen (topic for trivia, or prediction segment)
  if (!state.topic && state.mode !== "prediction") {
    return <TopicScreen state={state} />;
  }
  // 3) full game dashboard
  return <GameDashboard state={state} sse={connected} />;
}

// ---------------- Connect ----------------
function ConnectScreen({ state, sse }: { state: PublicState; sse: boolean }) {
  const [slug, setSlug] = useState(state.slug || "");
  const busy = state.status === "connecting";
  return (
    <main className="flex-1 grid place-items-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black/90 border border-amber-500/25 p-8 text-center space-y-5 animate-pop shadow-[0_0_60px_-15px_rgba(212,175,55,0.4)]">
        <img
          src="/logo.png"
          alt="Yuri4Games"
          className="w-28 h-28 mx-auto object-contain gold-glow animate-floaty"
        />
        <div>
          <h1 className="text-3xl font-extrabold gold-text leading-tight">تحدي الثقافة</h1>
          <p className="text-amber-200/70 text-xs font-bold tracking-widest mt-1">YURI4GAMES</p>
        </div>
        <p className="text-slate-400 text-sm">
          اربط قناتك على Kick — يجيب المتابعون مباشرةً من الدردشة.
        </p>
        <div className="flex items-center rounded-xl bg-black/50 border border-zinc-700 overflow-hidden focus-within:border-amber-500 transition">
          <span className="px-3 text-slate-500 text-sm shrink-0">kick.com/</span>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="channel"
            dir="ltr"
            className="flex-1 bg-transparent py-3 pl-3 outline-none text-left"
            onKeyDown={(e) => e.key === "Enter" && slug && send("connect", { slug })}
          />
        </div>
        {state.status === "error" && (
          <p className="text-rose-400 text-sm">⚠ {state.connectError}</p>
        )}
        <button
          onClick={() => send("connect", { slug })}
          disabled={busy || !slug.trim()}
          className="btn-gold w-full rounded-xl font-extrabold py-3 text-lg"
        >
          {busy ? "جارٍ الاتصال..." : "ربط القناة"}
        </button>
        <p className="text-[11px] text-slate-600">
          {sse ? "الخادم متصل" : "جارٍ الاتصال بالخادم..."} · بدون تسجيل دخول، قراءة الدردشة فقط
        </p>
        <button onClick={logout} className="text-[11px] text-slate-500 hover:text-amber-300 transition">
          🔒 تسجيل الخروج
        </button>
      </div>
    </main>
  );
}

// ---------------- Topic select ----------------
function TopicScreen({ state }: { state: PublicState }) {
  const topics: Topic[] = [
    "mixed",
    "general",
    "gaming",
    "religion",
    "history",
    "geography",
    "science",
    "sports",
    "art",
  ];
  return (
    <main className="flex-1 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Yuri4Games" className="w-14 h-14 object-contain gold-glow shrink-0" />
            <div>
              <h1 className="text-2xl font-extrabold gold-text">اختر الفقرة</h1>
              <p className="text-slate-400 text-sm">
                متصل بـ <span className="text-emerald-400">kick.com/{state.slug}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => send("disconnect")}
              className="text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-3 py-2"
            >
              قطع الاتصال
            </button>
            <button
              onClick={logout}
              title="تسجيل الخروج"
              className="text-xs rounded-lg bg-zinc-800 hover:bg-rose-600/30 border border-zinc-700 px-3 py-2"
            >
              🔒
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => send("topic", { topic: t })}
              className="rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-amber-500 hover:bg-zinc-800/80 p-6 text-center transition group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition">
                {TOPIC_EMOJI[t]}
              </div>
              <div className="font-bold">{TOPIC_LABELS[t]}</div>
            </button>
          ))}
        </div>

        {/* standalone PUBG match-prediction segment */}
        <div className="mt-4">
          <button
            onClick={() => send("mode", { mode: "prediction" })}
            className="w-full rounded-2xl bg-gradient-to-br from-orange-500/15 to-amber-500/15 border border-orange-500/40 hover:border-orange-400 hover:from-orange-500/25 hover:to-amber-500/25 p-6 text-center transition group flex items-center justify-center gap-4"
          >
            <div className="text-4xl group-hover:scale-110 transition">🎯</div>
            <div className="text-right">
              <div className="font-extrabold text-orange-300 text-lg">
                توقّعات الماتش (PUBG)
              </div>
              <div className="text-xs text-slate-400">
                فقرة مستقلة — توقّع القتلات والمرتبة وChicken Dinner
              </div>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}

// ---------------- Game dashboard ----------------
function GameDashboard({ state, sse }: { state: PublicState; sse: boolean }) {
  const [tab, setTab] = useState<"settings" | "players">("players");
  const [showStandings, setShowStandings] = useState(false);
  const secs = Math.ceil(state.msLeft / 1000);

  return (
    <div className="flex-1 flex min-h-0 h-screen overflow-hidden">
      {showStandings && (
        <StandingsScreen state={state} onClose={() => setShowStandings(false)} />
      )}
      {/* RIGHT panel (settings/players) — first in RTL DOM = right side */}
      <aside className="w-72 shrink-0 border-l border-slate-800 bg-slate-900/60 flex flex-col">
        <div className="p-3 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-bold flex items-center gap-2">⚙ الإعدادات</h2>
        </div>
        <div className="flex border-b border-slate-800 text-sm">
          <button
            onClick={() => setTab("settings")}
            className={`flex-1 py-2 ${tab === "settings" ? "bg-amber-500/15 text-amber-300 border-b-2 border-amber-500" : "text-slate-400"}`}
          >
            إعدادات اللعبة
          </button>
          <button
            onClick={() => setTab("players")}
            className={`flex-1 py-2 ${tab === "players" ? "bg-amber-500/15 text-amber-300 border-b-2 border-amber-500" : "text-slate-400"}`}
          >
            اللاعبون ({state.playerCount})
          </button>
        </div>
        {tab === "settings" ? (
          <SettingsTab state={state} />
        ) : (
          <PlayersTab state={state} />
        )}
      </aside>

      {/* CENTER */}
      <main className="flex-1 min-w-0 flex flex-col relative">
        <header className="p-3 flex items-center justify-between border-b border-amber-500/15">
          <div className="flex items-center gap-2.5 text-right">
            <img src="/logo.png" alt="YR" className="w-9 h-9 object-contain gold-glow shrink-0" />
            <div>
              <h1 className={`text-lg font-bold ${state.mode === "prediction" ? "text-orange-300" : "gold-text"}`}>{state.topicLabel}</h1>
              <p className="text-xs text-slate-500">
                {state.mode === "prediction" ? "توقّعات حية على ماتشات PUBG" : "أسئلة ثقافية متنوعة"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${state.status === "connected" ? "bg-emerald-500" : "bg-rose-500"}`} />
              {state.playerCount} لاعبين
            </span>
            {state.phase !== "lobby" && (
              <span className="rounded-md bg-slate-800 px-2 py-1">
                السؤال {state.qIndex + 1}/{state.perRound}
              </span>
            )}
            <button
              onClick={() => setShowStandings(true)}
              title="شاشة الترتيب"
              className="rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 w-8 h-8 grid place-items-center"
            >
              🏆
            </button>
            <button
              onClick={() => send("back")}
              title="العودة إلى المواضيع"
              className="rounded-md bg-slate-800 hover:bg-slate-700 w-8 h-8 grid place-items-center"
            >
              🏠
            </button>
            <button
              onClick={logout}
              title="تسجيل الخروج"
              className="rounded-md bg-slate-800 hover:bg-rose-600/30 w-8 h-8 grid place-items-center"
            >
              🔒
            </button>
          </div>
        </header>

        <div className="flex-1 grid place-items-center p-6 relative overflow-auto">
          {state.phase === "lobby" &&
            (state.prediction.active ? (
              <PredictionScreen state={state} />
            ) : (
              <RoomScreen state={state} />
            ))}

          {(state.phase === "question" || state.phase === "reveal") && state.question && (
            <div className="w-full max-w-2xl space-y-5">
              {/* timer + pause */}
              <div className="flex justify-center gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2">
                  <span className={`text-2xl font-extrabold ${secs <= 5 && state.phase === "question" ? "text-rose-400" : "text-slate-100"}`}>
                    {secs}s
                  </span>
                  <span>⏱</span>
                  <button
                    onClick={() => send("pause")}
                    className="w-7 h-7 grid place-items-center rounded-full bg-amber-500 text-slate-900 text-xs"
                  >
                    {state.paused ? "▶" : "⏸"}
                  </button>
                </div>
                <div className="rounded-xl bg-slate-800 px-4 py-2 font-bold">
                  السؤال {state.qIndex + 1}/{state.perRound}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-8 text-center">
                <p className="text-2xl font-bold leading-relaxed">{state.question.text}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {state.question.options.map((opt, i) => {
                  const isCorrect = state.phase === "reveal" && state.reveal?.correct === i;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-xl p-4 text-lg font-semibold border-2 transition ${
                        isCorrect
                          ? "bg-emerald-600 border-emerald-300"
                          : "bg-slate-800 border-transparent"
                      }`}
                    >
                      <span className={`grid place-items-center w-9 h-9 rounded-lg text-slate-900 font-extrabold ${OPTION_COLORS[i]}`}>
                        {i + 1}
                      </span>
                      <span>{opt}</span>
                      {isCorrect && <span className="mr-auto">✅</span>}
                    </div>
                  );
                })}
              </div>
              {state.phase === "reveal" && !state.settings.autoAdvance ? (
                <p className="text-center text-amber-300 text-sm font-bold animate-pulse">
                  ⏸ متوقّف — اضغط «⏭ السؤال التالي» للمتابعة
                </p>
              ) : (
                <p className="text-center text-slate-500 text-sm">
                  ✍ يكتب المتابعون رقم الإجابة (1-4) في الدردشة
                </p>
              )}
            </div>
          )}

          {state.phase === "finished" && (
            <div className="w-full max-w-2xl space-y-5">
              <div className="text-center">
                <div className="text-5xl">🏁</div>
                <p className="text-2xl font-extrabold gold-text mt-1">انتهت الجولة — النتائج النهائية</p>
              </div>
              <Leaderboard players={state.players} />
              <div className="flex gap-3 justify-center pt-1">
                <button onClick={() => send("start")} className="rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold py-3 px-6">
                  جولة جديدة
                </button>
                <button onClick={() => send("back")} className="rounded-xl bg-zinc-700 hover:bg-zinc-600 font-bold py-3 px-6">
                  فقرة أخرى
                </button>
              </div>
            </div>
          )}

          <WinnerPopup state={state} />
        </div>

        {/* bottom control bar */}
        {state.phase !== "lobby" && (
          <div className="p-3 border-t border-slate-800 flex gap-2 justify-center">
            <button onClick={() => send("next")} className="rounded-lg bg-sky-600 hover:bg-sky-500 font-medium px-4 py-2 text-sm">
              ⏭ السؤال التالي
            </button>
            <button onClick={() => send("pause")} className="rounded-lg bg-amber-600 hover:bg-amber-500 font-medium px-4 py-2 text-sm">
              {state.paused ? "▶ استئناف" : "⏸ إيقاف مؤقت"}
            </button>
            <button onClick={() => send("stop")} className="rounded-lg bg-rose-600 hover:bg-rose-500 font-medium px-4 py-2 text-sm">
              ⏹ إيقاف
            </button>
          </div>
        )}
      </main>

      {/* LEFT panel (chat + log) — last in RTL DOM = left side */}
      <aside className="w-80 shrink-0 border-r border-slate-800 bg-slate-900/60 flex flex-col min-h-0">
        <div className="p-3 border-b border-slate-800 flex items-center gap-2">
          <h2 className="font-bold">💬 الدردشة والسجل</h2>
          <span className={`mr-auto text-xs flex items-center gap-1 ${sse ? "text-emerald-400" : "text-rose-400"}`}>
            <span className={`w-2 h-2 rounded-full ${sse ? "bg-emerald-500" : "bg-rose-500"}`} />
            {sse ? "متصل" : "..."}
          </span>
        </div>
        {/* system log */}
        <div className="flex flex-col min-h-0 flex-1">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 border-b border-slate-800/50">
            📋 سجل النظام
          </div>
          <ul className="overflow-y-auto p-2 space-y-1 text-xs" style={{ maxHeight: "40vh" }}>
            {state.log.map((l) => (
              <li key={l.id} className="rounded bg-slate-800/50 px-2 py-1.5 text-slate-300 border-r-2 border-amber-500/40">
                <span className="text-slate-500 ml-2">
                  {new Date(l.at).toLocaleTimeString("fr", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
                {l.text}
              </li>
            ))}
          </ul>
        </div>
        {/* live chat */}
        <div className="flex flex-col min-h-0 flex-1 border-t border-slate-800">
          <div className="px-3 py-2 text-xs font-bold text-slate-400">💬 دردشة البث ({state.chat.length})</div>
          <ul className="overflow-y-auto p-2 space-y-1 text-xs flex-1">
            {state.chat.map((c, i) => (
              <li key={i} className="px-1">
                <span className="font-bold" style={{ color: c.color || "#a78bfa" }}>
                  {c.username}
                </span>
                <span className="text-slate-400">: {c.content}</span>
              </li>
            ))}
            {state.chat.length === 0 && (
              <li className="text-slate-600 text-center py-4">في انتظار رسائل الدردشة...</li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function SettingsTab({ state }: { state: PublicState }) {
  const s = state.settings;
  const [kw, setKw] = useState(s.joinKeyword);
  const saveKw = () => {
    const v = kw.trim();
    if (v && v !== s.joinKeyword) send("settings", { settings: { joinKeyword: v } });
    else setKw(s.joinKeyword);
  };
  return (
    <div className="p-4 space-y-5 text-sm overflow-y-auto">
      <div>
        <label className="block mb-2 text-slate-400">كلمة الدخول إلى الغرفة</label>
        <input
          value={kw}
          onChange={(e) => setKw(e.target.value)}
          onBlur={saveKw}
          onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
          maxLength={20}
          className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 outline-none focus:border-amber-500"
        />
        <p className="text-[11px] text-slate-500 mt-1">
          يكتب اللاعبون هذه الكلمة في الدردشة للدخول إلى الغرفة.
        </p>
      </div>
      <div>
        <label className="block mb-2 text-slate-400">طريقة احتساب النقاط</label>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => send("settings", { settings: { scoringMode: "first" } })}
            className={`rounded-lg p-3 text-right border ${s.scoringMode === "first" ? "bg-amber-500/15 border-amber-500" : "bg-slate-800 border-slate-700"}`}
          >
            🏃 أول من يجيب إجابة صحيحة
            <span className="block text-xs text-slate-500">سباق بالسرعة، نقطة واحدة لكل سؤال</span>
          </button>
          <button
            onClick={() => send("settings", { settings: { scoringMode: "all" } })}
            className={`rounded-lg p-3 text-right border ${s.scoringMode === "all" ? "bg-amber-500/15 border-amber-500" : "bg-slate-800 border-slate-700"}`}
          >
            👥 كل من يجيب إجابة صحيحة
            <span className="block text-xs text-slate-500">جميع من أجابوا بشكل صحيح يحصلون على نقطة</span>
          </button>
        </div>
      </div>
      <div>
        <label className="block mb-2 text-slate-400">
          وقت السؤال: <b className="text-amber-300">{s.questionSeconds}s</b>
        </label>
        <input
          type="range" min={5} max={60} step={5} value={s.questionSeconds}
          onChange={(e) => send("settings", { settings: { questionSeconds: Number(e.target.value) } })}
          className="w-full accent-amber-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-slate-400">
          عدد الأسئلة في الجولة: <b className="text-amber-300">{s.perRound}</b>
        </label>
        <input
          type="range" min={5} max={30} step={5} value={s.perRound}
          onChange={(e) => send("settings", { settings: { perRound: Number(e.target.value) } })}
          className="w-full accent-amber-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-slate-400">الانتقال بين الأسئلة</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => send("settings", { settings: { autoAdvance: true } })}
            className={`rounded-lg p-3 border ${s.autoAdvance ? "bg-amber-500/15 border-amber-500 text-amber-300" : "bg-slate-800 border-slate-700"}`}
          >
            ⏩ تلقائي
            <span className="block text-[11px] text-slate-500 mt-0.5">ينتقل وحدو بعد الجواب</span>
          </button>
          <button
            onClick={() => send("settings", { settings: { autoAdvance: false } })}
            className={`rounded-lg p-3 border ${!s.autoAdvance ? "bg-amber-500/15 border-amber-500 text-amber-300" : "bg-slate-800 border-slate-700"}`}
          >
            ✋ يدوي
            <span className="block text-[11px] text-slate-500 mt-0.5">تتحكّم أنت في التالي</span>
          </button>
        </div>
      </div>
      <button
        onClick={() => send("reset")}
        className="w-full rounded-lg bg-slate-700 hover:bg-slate-600 py-2"
      >
        ↺ تصفير النقاط
      </button>
    </div>
  );
}

function PlayersTab({ state }: { state: PublicState }) {
  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div className="px-3 py-2 text-xs text-slate-400 flex items-center justify-between">
        <span>قائمة اللاعبين</span>
        <span>{state.playerCount} / 100</span>
      </div>
      <ul className="overflow-y-auto flex-1 px-2 space-y-1.5 pb-2">
        {state.players.map((p, i) => (
          <li key={p.username} className="flex items-center gap-2 rounded-lg bg-slate-800/70 px-3 py-2">
            <span className="w-5 text-center text-xs text-slate-500">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium flex items-center gap-1">
                {p.username}
                {p.answered && (
                  <span className={p.correct ? "text-emerald-400" : "text-slate-500"}>
                    {p.correct ? "✓" : "•"}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <span className="text-emerald-400 font-bold">K</span> كيك · {p.points} نقطة
              </div>
            </div>
            <button
              onClick={() => send("kick", { username: p.username })}
              className="text-xs rounded bg-rose-600/20 text-rose-300 hover:bg-rose-600/40 px-2 py-1"
            >
              طرد
            </button>
          </li>
        ))}
        {state.players.length === 0 && (
          <li className="text-slate-600 text-center py-6 text-sm">
            لا يوجد أي لاعب بعد. ينضمّ المتابعون عند كتابتهم في الدردشة.
          </li>
        )}
      </ul>
      <div className="p-2 border-t border-slate-800">
        <button
          onClick={() => confirm("إزالة جميع اللاعبين؟") && send("clear")}
          className="w-full rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 text-sm"
        >
          🗑 إزالة جميع اللاعبين
        </button>
      </div>
    </div>
  );
}

function RoomScreen({ state }: { state: PublicState }) {
  const open = state.roomOpen;
  const kw = state.settings.joinKeyword;
  return (
    <div className="w-full max-w-2xl space-y-6 text-center">
      <div className="text-5xl">{state.mode === "prediction" ? "🎯" : "🚪"}</div>
      <h2 className="text-2xl font-extrabold">
        {state.mode === "prediction" ? "غرفة توقّعات الماتش" : "غرفة اللعبة"}
      </h2>

      {open ? (
        <div className="rounded-2xl bg-emerald-600/10 border-2 border-emerald-500/40 p-6 space-y-3">
          <div className="inline-flex items-center gap-2 text-emerald-300 text-sm font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            الغرفة مفتوحة — يمكن للاعبين الدخول
          </div>
          <p className="text-slate-300">للدخول، اكتب في الدردشة:</p>
          <div className="text-3xl font-extrabold text-emerald-300 bg-slate-800 rounded-xl py-4">
            «{kw}»
          </div>
        </div>
      ) : (
        <p className="text-slate-400">
          {state.mode === "prediction"
            ? "افتح الغرفة ليدخل المتابعون من دردشة Kick قبل فتح التوقّعات."
            : "افتح الغرفة ليدخل المتابعون من دردشة Kick قبل بدء الجولة."}
        </p>
      )}

      <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">
        <div className="text-sm text-slate-400 mb-2">
          {state.playerCount} لاعب دخل الغرفة
        </div>
        {state.players.length === 0 ? (
          <p className="text-slate-600 text-sm py-2">لا يوجد أي لاعب بعد...</p>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center max-h-40 overflow-y-auto">
            {state.players.map((p) => (
              <span
                key={p.username}
                className="rounded-full bg-slate-700 px-3 py-1 text-sm flex items-center gap-1"
              >
                <span className="text-emerald-400 font-bold text-xs">K</span>
                {p.username}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        {open ? (
          <button
            onClick={() => send("closeRoom")}
            className="rounded-xl bg-amber-600 hover:bg-amber-500 font-bold py-3 px-6"
          >
            🔒 إغلاق الغرفة
          </button>
        ) : (
          <button
            onClick={() => send("openRoom")}
            className="btn-gold rounded-xl font-bold py-3 px-6"
          >
            🔓 فتح الغرفة
          </button>
        )}
        {state.mode === "trivia" && (
          <button
            onClick={() => send("start")}
            disabled={state.playerCount === 0}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed font-bold py-3 px-8 text-lg"
          >
            ▶ ابدأ الجولة ({state.settings.perRound} سؤال)
          </button>
        )}
      </div>
      {state.playerCount === 0 && (
        <p className="text-xs text-slate-500">
          {state.mode === "prediction"
            ? "يجب أن يدخل لاعب واحد على الأقل لفتح توقّع."
            : "يجب أن يدخل لاعب واحد على الأقل لبدء الجولة."}
        </p>
      )}

      {/* prediction mode: choose what to predict (primary action) */}
      {state.mode === "prediction" && (
        <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30 p-5 mt-2">
          <div className="flex items-center justify-center gap-2 text-orange-300 font-bold mb-1">
            🎯 اختر نوع التوقّع
          </div>
          <p className="text-xs text-slate-400 mb-3">
            افتح توقّعًا قبل الماتش — يكتب اللاعبون توقّعهم في الدردشة ويكسبون نقاطًا حسب الدقّة.
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => send("openPrediction", { kind: "kills" })}
              disabled={state.playerCount === 0}
              className="rounded-xl bg-slate-800 hover:bg-orange-600/30 border border-slate-700 hover:border-orange-500 disabled:opacity-40 disabled:cursor-not-allowed py-4 text-sm font-bold transition"
            >
              🔫
              <span className="block text-xs font-normal mt-1">عدد القتلات</span>
            </button>
            <button
              onClick={() => send("openPrediction", { kind: "placement" })}
              disabled={state.playerCount === 0}
              className="rounded-xl bg-slate-800 hover:bg-orange-600/30 border border-slate-700 hover:border-orange-500 disabled:opacity-40 disabled:cursor-not-allowed py-4 text-sm font-bold transition"
            >
              🏅
              <span className="block text-xs font-normal mt-1">المرتبة</span>
            </button>
            <button
              onClick={() => send("openPrediction", { kind: "win" })}
              disabled={state.playerCount === 0}
              className="rounded-xl bg-slate-800 hover:bg-orange-600/30 border border-slate-700 hover:border-orange-500 disabled:opacity-40 disabled:cursor-not-allowed py-4 text-sm font-bold transition"
            >
              🍗
              <span className="block text-xs font-normal mt-1">Chicken Dinner</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- PUBG Match Prediction ----------------
function PredictionScreen({ state }: { state: PublicState }) {
  const p = state.prediction;
  const [actual, setActual] = useState("");
  const label = PRED_LABELS[p.kind];
  const isWin = p.kind === "win";

  const hint = isWin
    ? 'اكتبوا «نعم» أو «لا» في الدردشة'
    : p.kind === "kills"
    ? "اكتبوا عدد القتلات المتوقّع (رقم) في الدردشة"
    : "اكتبوا المرتبة المتوقّعة (1 = الأولى) في الدردشة";

  const fmtVal = (v: number) =>
    isWin ? (v === 1 ? "نعم 🍗" : "لا") : String(v);

  return (
    <div className="w-full max-w-2xl space-y-5 text-center">
      <div className="text-5xl">🎯</div>
      <h2 className="text-2xl font-extrabold text-orange-300">توقّع الماتش</h2>
      <div className="inline-block rounded-full bg-orange-500/20 text-orange-300 px-4 py-1 font-bold">
        {label}
      </div>

      {/* phase: collecting */}
      {p.open && (
        <div className="rounded-2xl bg-emerald-600/10 border-2 border-emerald-500/40 p-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-emerald-300 text-sm font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            التوقّعات مفتوحة
          </div>
          <p className="text-slate-200">{hint}</p>
          <div className="text-3xl font-extrabold text-emerald-300">
            {p.count} توقّع
          </div>
        </div>
      )}

      {/* phase: closed, awaiting result */}
      {!p.open && !p.resolved && (
        <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-6 space-y-4">
          <p className="text-slate-300">أدخل النتيجة الحقيقية لتوزيع النقاط:</p>
          {isWin ? (
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => send("resolvePrediction", { actual: 1 })}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold py-3 px-6"
              >
                🍗 ربحنا (Chicken Dinner)
              </button>
              <button
                onClick={() => send("resolvePrediction", { actual: 0 })}
                className="rounded-xl bg-rose-600 hover:bg-rose-500 font-bold py-3 px-6"
              >
                ❌ خسرنا
              </button>
            </div>
          ) : (
            <div className="flex gap-2 justify-center">
              <input
                type="number"
                value={actual}
                onChange={(e) => setActual(e.target.value)}
                placeholder={p.kind === "kills" ? "عدد القتلات" : "المرتبة"}
                className="w-40 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-center outline-none focus:border-orange-500"
              />
              <button
                onClick={() =>
                  actual !== "" &&
                  send("resolvePrediction", { actual: Number(actual) })
                }
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold py-2 px-6"
              >
                ✅ احسب النتيجة
              </button>
            </div>
          )}
        </div>
      )}

      {/* phase: resolved */}
      {p.resolved && p.actual !== null && (
        <div className="rounded-2xl bg-orange-600/10 border-2 border-orange-500/40 p-5">
          <div className="text-sm text-slate-400">النتيجة الحقيقية</div>
          <div className="text-3xl font-extrabold text-orange-300 mt-1">
            {fmtVal(p.actual)}
          </div>
        </div>
      )}

      {/* entries / results list */}
      <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4 text-right">
        <div className="text-sm text-slate-400 mb-2 text-center">
          {p.resolved ? "النتائج" : `${p.count} توقّع`}
        </div>
        {p.entries.length === 0 ? (
          <p className="text-slate-600 text-sm py-2 text-center">
            لا توجد توقّعات بعد...
          </p>
        ) : (
          <ul className="space-y-1.5 max-h-56 overflow-y-auto">
            {p.entries.map((e) => (
              <li
                key={e.username}
                className="flex items-center gap-3 rounded-lg bg-slate-900/50 px-3 py-2"
              >
                <span className="flex-1 truncate font-medium">{e.username}</span>
                <span className="text-slate-300">{fmtVal(e.value)}</span>
                {e.points !== null && (
                  <span
                    className={`text-sm font-bold ${
                      e.points > 0 ? "text-emerald-400" : "text-slate-600"
                    }`}
                  >
                    +{e.points}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* controls */}
      <div className="flex gap-3 justify-center flex-wrap">
        {p.open && (
          <button
            onClick={() => send("closePrediction")}
            className="rounded-xl bg-amber-600 hover:bg-amber-500 font-bold py-3 px-6"
          >
            🔒 إغلاق التوقّعات
          </button>
        )}
        <button
          onClick={() => send("cancelPrediction")}
          className="rounded-xl bg-slate-700 hover:bg-slate-600 font-bold py-3 px-6"
        >
          {p.resolved ? "✓ إنهاء" : "✕ إلغاء"}
        </button>
      </div>
    </div>
  );
}

type Player = PublicState["players"][number];

const RANK_META = [
  { badge: "🥇", rowBg: "bg-amber-500/10", rankText: "text-amber-300", border: "border-amber-500/40" },
  { badge: "🥈", rowBg: "bg-slate-400/10", rankText: "text-slate-200", border: "border-slate-400/30" },
  { badge: "🥉", rowBg: "bg-orange-700/15", rankText: "text-orange-300", border: "border-orange-700/30" },
];

function ChampionBanner({ player }: { player: Player }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-l from-amber-500/15 via-amber-500/5 to-transparent p-4 flex items-center gap-4 shadow-[0_0_40px_-12px_rgba(212,175,55,0.5)]">
      <img
        src="/trophy.png"
        alt="الكأس"
        className="w-20 h-24 object-contain gold-glow shrink-0 animate-floaty"
      />
      <div className="flex-1 min-w-0">
        <div className="text-amber-300/80 text-xs font-bold tracking-[0.2em]">🏆 بطل الترتيب</div>
        <div className="text-2xl font-extrabold gold-text truncate leading-tight">{player.username}</div>
        <div className="text-slate-300 text-sm mt-0.5">
          <span className="text-amber-300 font-extrabold text-lg">{player.points}</span> نقطة
        </div>
      </div>
      <div className="text-6xl font-black gold-text opacity-90 select-none">#1</div>
    </div>
  );
}

function Leaderboard({ players }: { players: Player[] }) {
  if (players.length === 0)
    return (
      <p className="text-slate-500 py-10 text-center">لا يوجد أي متسابق بعد.</p>
    );
  return (
    <div className="space-y-4">
      <ChampionBanner player={players[0]} />

      <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
        {/* table header */}
        <div className="grid grid-cols-[3rem_1fr_5rem] items-center px-4 py-2.5 bg-zinc-900/80 text-[11px] font-bold text-slate-400 border-b border-zinc-800">
          <span className="text-center">المركز</span>
          <span>المتسابق</span>
          <span className="text-center">النقاط</span>
        </div>
        <ul>
          {players.map((p, i) => {
            const rank = i + 1;
            const m = RANK_META[i];
            const initial = p.username.charAt(0).toUpperCase();
            return (
              <li
                key={p.username}
                className={`grid grid-cols-[3rem_1fr_5rem] items-center px-4 py-2.5 border-b border-zinc-800/60 last:border-0 transition ${
                  m ? m.rowBg : "hover:bg-zinc-800/40"
                }`}
              >
                <span className={`text-center text-lg font-extrabold ${m ? m.rankText : "text-slate-500"}`}>
                  {m ? m.badge : rank}
                </span>
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className={`grid place-items-center w-8 h-8 rounded-full text-xs font-extrabold shrink-0 ${
                      m ? `bg-zinc-800 ${m.rankText} ring-1 ${m.border}` : "bg-zinc-800 text-slate-300"
                    }`}
                  >
                    {initial}
                  </span>
                  <span className="truncate font-semibold">{p.username}</span>
                  <span className="text-emerald-400 text-[10px] font-bold shrink-0">K</span>
                  {p.answered && (
                    <span className={`text-xs shrink-0 ${p.correct ? "text-emerald-400" : "text-slate-600"}`}>
                      {p.correct ? "✓" : "•"}
                    </span>
                  )}
                </span>
                <span className="text-center font-extrabold text-amber-300 tabular-nums">
                  {p.points}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function StandingsScreen({
  state,
  onClose,
}: {
  state: PublicState;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"session" | "alltime">("session");
  const [hasHistory, setHasHistory] = useState(false);
  const [allTime, setAllTime] = useState<Player[]>([]);

  const loadAllTime = () => {
    fetch(`/api/leaderboard?channel=${encodeURIComponent(state.slug)}`)
      .then((r) => r.json())
      .then((d: { enabled: boolean; players: { username: string; points: number }[] }) => {
        setHasHistory(!!d.enabled);
        setAllTime(
          (d.players || []).map((p) => ({
            username: p.username,
            points: p.points,
            answered: false,
            correct: null,
          }))
        );
      })
      .catch(() => {});
  };

  useEffect(loadAllTime, [state.slug]);

  const players = tab === "alltime" ? allTime : state.players;

  return (
    <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
      <div className="mx-auto max-w-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="YR" className="w-10 h-10 object-contain gold-glow" />
            <div>
              <h1 className="text-2xl font-extrabold gold-text leading-tight">لوحة الترتيب</h1>
              <p className="text-xs text-slate-400">
                {tab === "alltime"
                  ? `كل الأوقات · ${allTime.length} متسابق`
                  : `${state.topicLabel} · ${state.playerCount} متسابق`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2 text-sm"
          >
            ✕ إغلاق
          </button>
        </div>

        {hasHistory && (
          <div className="flex gap-2">
            <button
              onClick={() => setTab("session")}
              className={`flex-1 rounded-lg py-2 text-sm font-bold border ${
                tab === "session"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500"
                  : "bg-zinc-900/60 text-slate-400 border-zinc-800"
              }`}
            >
              🎮 هذه الجولة
            </button>
            <button
              onClick={() => {
                setTab("alltime");
                loadAllTime();
              }}
              className={`flex-1 rounded-lg py-2 text-sm font-bold border ${
                tab === "alltime"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500"
                  : "bg-zinc-900/60 text-slate-400 border-zinc-800"
              }`}
            >
              🏆 كل الأوقات
            </button>
          </div>
        )}

        <Leaderboard players={players} />
      </div>
    </div>
  );
}

function WinnerPopup({ state }: { state: PublicState }) {
  const [show, setShow] = useState<PublicState["lastWinner"]>(null);
  const lastAt = useRef(0);
  const qRef = useRef(state.qIndex);
  useEffect(() => {
    const w = state.lastWinner;
    if (w && w.at > lastAt.current) {
      lastAt.current = w.at;
      // only show the popup during the SAME question the win happened in
      if (state.phase === "question") {
        setShow(w);
        const t = setTimeout(() => setShow(null), 2600);
        return () => clearTimeout(t);
      }
    }
  }, [state.lastWinner, state.phase]);

  // drop any lingering popup the moment we move on (new question / reveal / end)
  useEffect(() => {
    if (state.qIndex !== qRef.current) {
      qRef.current = state.qIndex;
      setShow(null);
    }
  }, [state.qIndex]);
  useEffect(() => {
    if (state.phase !== "question") setShow(null);
  }, [state.phase]);

  if (!show) return null;
  return (
    <div className="absolute inset-0 grid place-items-center pointer-events-none">
      <div className="animate-pop rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 px-10 py-6 text-center shadow-2xl text-zinc-900">
        <div className="text-3xl mb-1">✅</div>
        <div className="text-xl font-extrabold">{show.username} أجاب بشكل صحيح!</div>
        <div className="text-sm opacity-90">نقاطه الآن: {show.points}</div>
      </div>
    </div>
  );
}
