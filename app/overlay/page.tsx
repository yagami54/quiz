"use client";

import { useEffect, useRef, useState } from "react";
import { useGameState } from "@/lib/useGameState";
import { PRED_LABELS, PublicState } from "@/lib/types";

const OPTION_COLORS = [
  "bg-rose-500",
  "bg-sky-500",
  "bg-amber-500",
  "bg-emerald-500",
];

type Player = PublicState["players"][number];

/**
 * Read-only broadcast overlay for OBS (Browser Source).
 * Transparent background — add as a browser source over your gameplay.
 * URL: /overlay
 */
export default function Overlay() {
  const { state } = useGameState();

  // view mode via ?view= : full (default) | leaderboard | main
  const [view, setView] = useState<"full" | "leaderboard" | "main">("full");
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("view");
    if (v === "leaderboard" || v === "main") setView(v);
  }, []);

  // make the page transparent for OBS
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.cssText;
    const prevBody = body.style.cssText;
    html.style.background = "transparent";
    body.style.background = "transparent";
    body.style.backgroundImage = "none";
    return () => {
      html.style.cssText = prevHtml;
      body.style.cssText = prevBody;
    };
  }, []);

  if (!state || state.status !== "connected") return null;

  const secs = Math.ceil(state.msLeft / 1000);
  const inQuestion = state.phase === "question" || state.phase === "reveal";

  // dedicated leaderboard-only source
  if (view === "leaderboard") {
    return (
      <div className="fixed inset-0 p-8 flex items-start justify-center pointer-events-none select-none">
        <PersistentBoard state={state} className="w-96" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none select-none">
      <WinnerFlash state={state} />

      {/* persistent leaderboard — always visible (top-left corner) */}
      {view === "full" && state.players.length > 0 && (
        <div className="absolute top-6 left-6 w-72">
          <PersistentBoard state={state} />
        </div>
      )}

      {/* main widget (bottom-center) */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center px-8">
        {inQuestion && state.question && (
          <QuestionWidget state={state} secs={secs} />
        )}

        {state.phase === "lobby" &&
          (state.prediction.active ? (
            <PredictionWidget state={state} />
          ) : (
            <JoinWidget state={state} />
          ))}

        {state.phase === "finished" && <ResultsWidget players={state.players} />}
      </div>
    </div>
  );
}

function PersistentBoard({ state, className = "" }: { state: PublicState; className?: string }) {
  if (state.players.length === 0) return null;
  return (
    <Card className={`p-5 space-y-3 ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <img src="/trophy.png" alt="" className="w-7 h-9 object-contain gold-glow" />
        <span className="gold-text font-extrabold">الترتيب</span>
      </div>
      <TopRows players={state.players.slice(0, 6)} startRank={1} />
    </Card>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl bg-black/75 backdrop-blur-md border border-amber-500/40 shadow-[0_0_50px_-10px_rgba(212,175,55,0.5)] ${className}`}
    >
      {children}
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <img src="/logo.png" alt="YR" className="w-8 h-8 object-contain gold-glow" />
      <span className="gold-text font-extrabold tracking-widest text-sm">YURI4GAMES</span>
    </div>
  );
}

function QuestionWidget({ state, secs }: { state: PublicState; secs: number }) {
  const q = state.question!;
  const danger = secs <= 5 && state.phase === "question";
  return (
    <Card className="w-full max-w-4xl p-7 space-y-5">
      <div className="flex items-center justify-between">
        <Brand />
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-zinc-800/80 px-3 py-1.5 font-bold text-amber-200">
            السؤال {state.qIndex + 1}/{state.perRound}
          </span>
          <span
            className={`grid place-items-center w-14 h-14 rounded-full text-2xl font-black ${
              danger ? "bg-rose-600 text-white animate-pulse" : "bg-amber-500 text-zinc-900"
            }`}
          >
            {secs}
          </span>
        </div>
      </div>

      <p className="text-3xl font-extrabold text-center leading-relaxed text-white">
        {q.text}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = state.phase === "reveal" && state.reveal?.correct === i;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-2xl p-4 text-xl font-bold border-2 transition ${
                isCorrect
                  ? "bg-emerald-600 border-emerald-300 scale-[1.02]"
                  : "bg-zinc-900/80 border-transparent"
              }`}
            >
              <span
                className={`grid place-items-center w-10 h-10 rounded-xl text-zinc-900 font-black ${OPTION_COLORS[i]}`}
              >
                {i + 1}
              </span>
              <span className="text-white">{opt}</span>
              {isCorrect && <span className="mr-auto text-2xl">✅</span>}
            </div>
          );
        })}
      </div>

      <p className="text-center text-amber-200/80 font-bold">
        ✍ اكتب رقم الإجابة (1-4) في الدردشة
      </p>
    </Card>
  );
}

function JoinWidget({ state }: { state: PublicState }) {
  return (
    <Card className="w-full max-w-2xl p-7 text-center space-y-3">
      <Brand />
      {state.roomOpen ? (
        <>
          <p className="text-2xl font-bold text-white">للدخول إلى اللعبة، اكتب في الدردشة:</p>
          <div className="text-5xl font-black gold-text bg-zinc-900/70 rounded-2xl py-5">
            «{state.settings.joinKeyword}»
          </div>
          <p className="text-amber-200/80 font-bold text-lg">
            🎮 {state.playerCount} لاعب انضمّ
          </p>
        </>
      ) : (
        <p className="text-2xl font-bold text-amber-200">الغرفة مغلقة — انتظروا الجولة القادمة</p>
      )}
    </Card>
  );
}

function PredictionWidget({ state }: { state: PublicState }) {
  const p = state.prediction;
  const isWin = p.kind === "win";
  const fmt = (v: number) => (isWin ? (v === 1 ? "نعم 🍗" : "لا") : String(v));
  return (
    <Card className="w-full max-w-3xl p-7 text-center space-y-4">
      <div className="flex items-center justify-between">
        <Brand />
        <span className="rounded-full bg-orange-500/25 text-orange-300 px-4 py-1.5 font-bold">
          🎯 {PRED_LABELS[p.kind]}
        </span>
      </div>
      {p.open ? (
        <>
          <p className="text-2xl font-bold text-white">
            {isWin ? "توقّعوا: نعم أو لا في الدردشة" : "اكتبوا توقّعكم (رقم) في الدردشة"}
          </p>
          <div className="text-5xl font-black text-emerald-400">{p.count} توقّع</div>
        </>
      ) : p.resolved && p.actual !== null ? (
        <>
          <div className="text-amber-200/80 font-bold">النتيجة</div>
          <div className="text-5xl font-black gold-text">{fmt(p.actual)}</div>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {p.entries.filter((e) => (e.points ?? 0) > 0).slice(0, 8).map((e) => (
              <span key={e.username} className="rounded-full bg-emerald-600/30 text-emerald-200 px-3 py-1 font-bold text-sm">
                {e.username} +{e.points}
              </span>
            ))}
          </div>
        </>
      ) : (
        <p className="text-2xl font-bold text-amber-200">التوقّعات مغلقة — في انتظار النتيجة</p>
      )}
    </Card>
  );
}

function ResultsWidget({ players }: { players: Player[] }) {
  if (players.length === 0) return null;
  const champ = players[0];
  return (
    <Card className="w-full max-w-2xl p-7 space-y-4">
      <div className="flex items-center gap-4">
        <img src="/trophy.png" alt="الكأس" className="w-20 h-24 object-contain gold-glow animate-floaty" />
        <div className="flex-1 min-w-0">
          <div className="text-amber-300/80 text-sm font-bold tracking-widest">🏆 بطل الجولة</div>
          <div className="text-3xl font-black gold-text truncate">{champ.username}</div>
          <div className="text-white/80">
            <span className="text-amber-300 font-extrabold text-xl">{champ.points}</span> نقطة
          </div>
        </div>
        <div className="text-6xl font-black gold-text opacity-90">#1</div>
      </div>
      <TopRows players={players.slice(1, 5)} startRank={2} />
    </Card>
  );
}

const MEDALS = ["🥇", "🥈", "🥉"];

function TopRows({ players, startRank }: { players: Player[]; startRank: number }) {
  if (players.length === 0)
    return <p className="text-white/50 text-center text-sm py-2">لا يوجد متسابقون بعد</p>;
  return (
    <ul className="space-y-1.5">
      {players.map((p, i) => {
        const rank = startRank + i;
        const medal = MEDALS[rank - 1];
        return (
          <li
            key={p.username}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
              rank <= 3 ? "bg-amber-500/10" : "bg-zinc-900/60"
            }`}
          >
            <span className="w-7 text-center text-lg font-extrabold text-amber-300">
              {medal ?? rank}
            </span>
            <span className="flex-1 truncate font-bold text-white">{p.username}</span>
            <span className="font-black text-amber-300 tabular-nums">{p.points}</span>
          </li>
        );
      })}
    </ul>
  );
}

function WinnerFlash({ state }: { state: PublicState }) {
  const [show, setShow] = useState<PublicState["lastWinner"]>(null);
  const lastAt = useRef(0);
  useEffect(() => {
    const w = state.lastWinner;
    if (w && w.at > lastAt.current && state.phase === "question") {
      lastAt.current = w.at;
      setShow(w);
      const t = setTimeout(() => setShow(null), 2500);
      return () => clearTimeout(t);
    }
  }, [state.lastWinner, state.phase]);

  if (!show || state.phase !== "question") return null;
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 animate-pop">
      <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-zinc-900 px-8 py-3 font-extrabold text-2xl shadow-2xl flex items-center gap-2">
        ✅ {show.username} أجاب صحيح! <span className="opacity-80 text-lg">+1</span>
      </div>
    </div>
  );
}
