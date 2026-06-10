import { KickChat } from "./kick";
import { QUESTIONS } from "./questions";
import { addPointsToHistory } from "./supabase";
import {
  CATEGORY_LABELS,
  GameMode,
  Phase,
  PRED_LABELS,
  PredKind,
  PublicState,
  Question,
  ScoringMode,
  Settings,
  Topic,
  TOPIC_LABELS,
} from "./types";

const REVEAL_MS = 3500;

interface PlayerRec {
  username: string; // display
  points: number;
}

interface AnswerRec {
  choice: number; // 0-3, first answer only
  correct: boolean;
}

interface PredictionRec {
  value: number; // numeric guess, or 1/0 for win
  points: number | null; // null until resolved
}

interface PredictionState {
  active: boolean;
  open: boolean;
  kind: PredKind;
  resolved: boolean;
  actual: number | null;
  entries: Map<string, PredictionRec>; // key: lowercase username
}

interface ImageGuessState {
  active: boolean;
  open: boolean;
  imageUrl: string;
  prompt: string;
  answers: string[]; // acceptable answers (normalized matching)
  resolved: boolean;
  winner: string | null;
  guesses: { username: string; text: string; correct: boolean; at: number }[];
}

interface GameState {
  // connection
  kick: KickChat | null;
  // activity mode + topic & settings
  mode: GameMode;
  topic: Topic | null;
  settings: Settings;
  // room
  roomOpen: boolean;
  // pubg match prediction
  prediction: PredictionState;
  // image guess
  imageGuess: ImageGuessState;
  // round
  phase: Phase;
  round: number;
  qIndex: number;
  roundQuestions: Question[];
  phaseEndsAt: number;
  paused: boolean;
  pausedRemaining: number;
  // per-question
  answers: Map<string, AnswerRec>; // key: lowercase username
  winners: string[]; // usernames who scored this question
  // players
  players: Map<string, PlayerRec>; // key: lowercase username
  // feeds
  log: { id: number; text: string; at: number }[];
  chat: { username: string; content: string; color?: string; at: number }[];
  logSeq: number;
  lastWinner: { username: string; points: number; at: number } | null;
  // infra
  listeners: Set<() => void>;
  ticker: ReturnType<typeof setInterval> | null;
}

function createState(): GameState {
  return {
    kick: null,
    mode: "trivia",
    topic: null,
    settings: { scoringMode: "first", questionSeconds: 20, perRound: 20, joinKeyword: "YR1", autoAdvance: true },
    roomOpen: false,
    prediction: {
      active: false,
      open: false,
      kind: "kills",
      resolved: false,
      actual: null,
      entries: new Map(),
    },
    imageGuess: {
      active: false,
      open: false,
      imageUrl: "",
      prompt: "",
      answers: [],
      resolved: false,
      winner: null,
      guesses: [],
    },
    phase: "lobby",
    round: 0,
    qIndex: 0,
    roundQuestions: [],
    phaseEndsAt: 0,
    paused: false,
    pausedRemaining: 0,
    answers: new Map(),
    winners: [],
    players: new Map(),
    log: [],
    chat: [],
    logSeq: 0,
    lastWinner: null,
    listeners: new Set(),
    ticker: null,
  };
}

const g = globalThis as unknown as { __quizGame2?: GameState };
const state: GameState = g.__quizGame2 ?? (g.__quizGame2 = createState());

function notify() {
  for (const fn of state.listeners) {
    try {
      fn();
    } catch {
      /* ignore */
    }
  }
}

function addLog(text: string) {
  state.log.unshift({ id: ++state.logSeq, text, at: Date.now() });
  if (state.log.length > 60) state.log.length = 60;
}

function ensureTicker() {
  if (state.ticker) return;
  state.ticker = setInterval(tick, 250);
}

function stopTicker() {
  if (state.ticker) {
    clearInterval(state.ticker);
    state.ticker = null;
  }
}

function tick() {
  const now = Date.now();
  if (state.paused) return;
  if (state.phase === "question" && now >= state.phaseEndsAt) {
    endQuestion();
    notify();
  } else if (
    state.phase === "reveal" &&
    now >= state.phaseEndsAt &&
    state.settings.autoAdvance
  ) {
    // في الوضع اليدوي: نبقى في الكشف وننتظر "السؤال التالي" من الأدمين
    advance();
    notify();
  }
  if (state.phase === "lobby" || state.phase === "finished") stopTicker();
}

// ---------- answer parsing ----------
function parseChoice(content: string): number | null {
  // normalize Arabic-Indic digits → latin
  const s = content
    .trim()
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .trim();
  if (/^[1-6]$/.test(s)) return Number(s) - 1;
  return null;
}

// normalize arabic-indic digits and lowercase
function normalize(content: string): string {
  return content
    .trim()
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .trim()
    .toLowerCase();
}

// parse a prediction value from a chat message. returns null if not a valid guess
function parsePrediction(kind: PredKind, content: string): number | null {
  const s = normalize(content);
  if (kind === "win") {
    if (/^(نعم|اه|ايه|أجل|y|yes|win|wwcd|✅|👍)$/.test(s)) return 1;
    if (/^(لا|no|n|خطأ|خطا|lose|❌|👎)$/.test(s)) return 0;
    return null;
  }
  // numeric kinds
  if (!/^\d{1,3}$/.test(s)) return null;
  const n = Number(s);
  if (kind === "placement" && (n < 1 || n > 100)) return null;
  if (kind === "kills" && n > 100) return null;
  return n;
}

function registerPrediction(username: string, content: string) {
  const key = username.toLowerCase();
  if (!state.players.has(key)) return; // only room players can predict
  const value = parsePrediction(state.prediction.kind, content);
  if (value === null) return;
  // overwrite allowed until predictions close (players may change their mind)
  state.prediction.entries.set(key, { value, points: null });
}

// ---------- image guess ----------
// تطبيع نص للمطابقة (يزيل التشكيل ويوحّد الحروف العربية وعلامات الترقيم)
function normalizeText(s: string): string {
  return s
    .replace(/[ً-ٰٟـ]/g, "") // تشكيل + تطويل
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function guessMatches(guess: string, answers: string[]): boolean {
  const g = normalizeText(guess);
  if (g.length < 2) return false;
  for (const a of answers) {
    const na = normalizeText(a);
    if (!na) continue;
    if (g === na) return true; // مطابقة تامة
    if (na.length >= 3 && g.includes(na)) return true; // كتب الجواب وزيادة
    if (g.length >= 4 && na.includes(g)) return true; // كتب جزءًا مميّزًا من الجواب
  }
  return false;
}

function registerImageGuess(username: string, content: string) {
  const ig = state.imageGuess;
  const key = username.toLowerCase();
  if (!state.players.has(key)) return; // only room players can guess
  const text = content.trim().slice(0, 60);
  if (!text) return;
  const correct = guessMatches(text, ig.answers);
  ig.guesses.push({ username, text, correct, at: Date.now() });
  if (ig.guesses.length > 50) ig.guesses.shift();

  if (correct && !ig.winner) {
    ig.winner = username;
    ig.open = false;
    ig.resolved = true;
    const p = state.players.get(key)!;
    p.points += 1;
    state.lastWinner = { username, points: p.points, at: Date.now() };
    void addPointsToHistory(state.kick?.slug ?? "", username, username, 1);
    addLog(`اللاعب ${username} خمّن الصورة صحيحًا! نقاطه الآن: ${p.points}`);
  }
}

// ---------- chat handling ----------
function handleChat(username: string, content: string, color?: string) {
  state.chat.push({ username, content, color, at: Date.now() });
  if (state.chat.length > 50) state.chat.shift();

  // room registration: typing the join keyword while the room is open
  if (state.roomOpen) {
    const kw = state.settings.joinKeyword.trim().toLowerCase();
    if (kw && content.trim().toLowerCase() === kw) {
      joinRoom(username);
    }
  }

  // pubg prediction: collect guesses from chat while open
  if (state.prediction.active && state.prediction.open) {
    registerPrediction(username, content);
  }

  // image guess: match free-text guesses from chat while open
  if (state.imageGuess.active && state.imageGuess.open) {
    registerImageGuess(username, content);
  }

  if (state.phase === "question" && !state.paused) {
    const choice = parseChoice(content);
    if (choice !== null) registerAnswer(username, choice);
  }
  notify();
}

function joinRoom(username: string) {
  const key = username.toLowerCase();
  if (state.players.has(key)) return;
  state.players.set(key, { username, points: 0 });
  addLog(`انضمّ اللاعب ${username} إلى الغرفة`);
}

function registerAnswer(username: string, choice: number) {
  const key = username.toLowerCase();
  if (!state.players.has(key)) return; // only players who joined the room can play
  if (state.answers.has(key)) return; // first answer per user only
  const q = state.roundQuestions[state.qIndex];
  if (!q) return;
  const correct = choice === q.correct;
  state.answers.set(key, { choice, correct });

  if (!correct) return;

  if (state.settings.scoringMode === "first") {
    if (state.winners.length > 0) return; // already won
  }
  // award
  const p = state.players.get(key)!;
  p.points += 1;
  state.winners.push(username);
  state.lastWinner = { username, points: p.points, at: Date.now() };
  void addPointsToHistory(state.kick?.slug ?? "", username, username, 1);
  addLog(`اللاعب ${username} أجاب إجابة صحيحة! نقاطه الآن: ${p.points}`);

  if (state.settings.scoringMode === "first") {
    // lock further scoring; question keeps running until timer
  }
}

// ---------- round flow ----------
const OPTIONS_PER_QUESTION = 6;

function shuffleInPlace<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const norm = (s: string) => s.trim().toLowerCase();

/**
 * يبني سؤالًا بـ6 خيارات: الـ4 الأصلية + خيارين خاطئين مستعارين من نفس الفئة،
 * ثم يخلط الكل عشوائيًا (فالإجابة الصحيحة تتوزّع على المواضع الستة).
 * يتعقّب الصحيحة عبر علم (آمن حتى لو تكرّر نص خيار).
 */
function buildQuestion(q: Question, distractorPool: string[]): Question {
  const seen = new Set(q.options.map(norm));
  const items = q.options.map((text, i) => ({ text, correct: i === q.correct }));

  for (const cand of shuffleInPlace([...distractorPool])) {
    if (items.length >= OPTIONS_PER_QUESTION) break;
    const k = norm(cand);
    if (seen.has(k)) continue;
    seen.add(k);
    items.push({ text: cand, correct: false });
  }

  shuffleInPlace(items);
  return {
    ...q,
    options: items.map((it) => it.text),
    correct: items.findIndex((it) => it.correct),
  };
}

function pickRoundQuestions(): Question[] {
  const pool = QUESTIONS.filter(
    (q) => state.topic === "mixed" || q.category === state.topic
  );
  // مجمع خيارات خاطئة لكل فئة (من كل البنك) — خيارات إضافية ذات صلة بالموضوع
  const byCategory: Record<string, string[]> = {};
  for (const q of QUESTIONS) {
    (byCategory[q.category] ||= []).push(...q.options);
  }
  shuffleInPlace(pool);
  return pool
    .slice(0, Math.min(state.settings.perRound, pool.length))
    .map((q) => buildQuestion(q, byCategory[q.category] || []));
}

function startQuestion() {
  state.answers = new Map();
  state.winners = [];
  state.paused = false;
  state.phase = "question";
  state.phaseEndsAt = Date.now() + state.settings.questionSeconds * 1000;
  const q = state.roundQuestions[state.qIndex];
  const label = state.topic ? TOPIC_LABELS[state.topic] : "";
  if (q) addLog(`السؤال ${state.qIndex + 1}/${state.roundQuestions.length}: ${label}`);
  ensureTicker();
}

function endQuestion() {
  if (state.settings.scoringMode === "first" && state.winners.length === 0) {
    addLog("انتهى الوقت! لم يُجب أحد إجابة صحيحة");
  } else if (state.winners.length === 0) {
    addLog("انتهى الوقت! لم يُجب أحد إجابة صحيحة");
  }
  state.phase = "reveal";
  state.phaseEndsAt = Date.now() + REVEAL_MS;
}

function advance() {
  if (state.qIndex + 1 >= state.roundQuestions.length) {
    state.phase = "finished";
    addLog("انتهت الجولة!");
    stopTicker();
    return;
  }
  state.qIndex += 1;
  startQuestion();
}

// ---------- public actions ----------
export async function connectKick(slug: string) {
  if (!state.kick) {
    state.kick = new KickChat(
      (m) => handleChat(m.username, m.content, m.color),
      () => notify()
    );
  }
  await state.kick.connect(slug);
  notify();
}

export function disconnectKick() {
  state.kick?.disconnect();
  notify();
}

export function setTopic(topic: Topic) {
  state.mode = "trivia";
  state.topic = topic;
  notify();
}

export function setMode(mode: GameMode) {
  state.mode = mode;
  if (mode === "prediction" || mode === "imageguess") state.topic = null;
  notify();
}

export function updateSettings(patch: Partial<Settings>) {
  if (typeof patch.scoringMode === "string")
    state.settings.scoringMode = patch.scoringMode as ScoringMode;
  if (typeof patch.questionSeconds === "number")
    state.settings.questionSeconds = Math.max(5, Math.min(120, patch.questionSeconds));
  if (typeof patch.perRound === "number")
    state.settings.perRound = Math.max(1, Math.min(50, patch.perRound));
  if (typeof patch.joinKeyword === "string") {
    const kw = patch.joinKeyword.trim().slice(0, 20);
    if (kw) state.settings.joinKeyword = kw;
  }
  if (typeof patch.autoAdvance === "boolean")
    state.settings.autoAdvance = patch.autoAdvance;
  notify();
}

export function openRoom() {
  state.roomOpen = true;
  addLog(`فُتحت الغرفة — اكتبوا "${state.settings.joinKeyword}" في الدردشة للانضمام`);
  notify();
}

export function closeRoom() {
  state.roomOpen = false;
  addLog("أُغلقت الغرفة — لم يعد الانضمام متاحًا");
  notify();
}

// ---------- pubg match prediction ----------
function formatActual(kind: PredKind, actual: number): string {
  if (kind === "win") return actual === 1 ? "Chicken Dinner ✅" : "لا ❌";
  return String(actual);
}

export function openPrediction(kind: PredKind) {
  state.prediction = {
    active: true,
    open: true,
    kind,
    resolved: false,
    actual: null,
    entries: new Map(),
  };
  addLog(`فُتحت التوقّعات: ${PRED_LABELS[kind]} — اكتبوا توقّعكم في الدردشة`);
  notify();
}

export function closePrediction() {
  if (!state.prediction.active) return;
  state.prediction.open = false;
  addLog("أُغلقت التوقّعات — في انتظار النتيجة");
  notify();
}

export function resolvePrediction(actual: number) {
  const pr = state.prediction;
  if (!pr.active) return;
  pr.open = false;
  pr.actual = actual;
  pr.resolved = true;
  for (const [key, rec] of pr.entries) {
    const player = state.players.get(key);
    if (!player) {
      rec.points = 0;
      continue;
    }
    let pts = 0;
    if (pr.kind === "win") {
      pts = rec.value === actual ? 2 : 0;
    } else {
      const diff = Math.abs(rec.value - actual);
      pts = diff === 0 ? 3 : diff <= 1 ? 2 : diff <= 3 ? 1 : 0;
    }
    rec.points = pts;
    if (pts > 0) {
      player.points += pts;
      void addPointsToHistory(state.kick?.slug ?? "", player.username, player.username, pts);
    }
  }
  addLog(
    `نتيجة التوقّع (${PRED_LABELS[pr.kind]}): ${formatActual(pr.kind, actual)} — وُزّعت النقاط`
  );
  notify();
}

export function cancelPrediction() {
  state.prediction = {
    active: false,
    open: false,
    kind: state.prediction.kind,
    resolved: false,
    actual: null,
    entries: new Map(),
  };
  notify();
}

// ---------- image guess actions ----------
export function openImageGuess(imageUrl: string, prompt: string, answers: string[]) {
  state.imageGuess = {
    active: true,
    open: true,
    imageUrl: imageUrl.trim(),
    prompt: prompt.trim(),
    answers: answers.map((a) => a.trim()).filter(Boolean),
    resolved: false,
    winner: null,
    guesses: [],
  };
  addLog("فُتحت جولة تخمين الصورة — اكتبوا تخمينكم في الدردشة");
  notify();
}

export function revealImageGuess() {
  if (!state.imageGuess.active) return;
  state.imageGuess.open = false;
  state.imageGuess.resolved = true;
  addLog(`الجواب: ${state.imageGuess.answers[0] ?? "—"}`);
  notify();
}

export function cancelImageGuess() {
  state.imageGuess = {
    active: false,
    open: false,
    imageUrl: "",
    prompt: "",
    answers: [],
    resolved: false,
    winner: null,
    guesses: [],
  };
  notify();
}

export function startRound() {
  if (!state.topic) return;
  state.roomOpen = false; // lock the room when the round starts
  state.round += 1;
  state.qIndex = 0;
  state.roundQuestions = pickRoundQuestions();
  startQuestion();
  notify();
}

export function nextQuestion() {
  if (state.phase === "question") endQuestion();
  else if (state.phase === "reveal") advance();
  notify();
}

export function togglePause() {
  if (state.phase !== "question" && state.phase !== "reveal") return;
  if (state.paused) {
    state.phaseEndsAt = Date.now() + state.pausedRemaining;
    state.paused = false;
  } else {
    state.pausedRemaining = Math.max(0, state.phaseEndsAt - Date.now());
    state.paused = true;
  }
  notify();
}

export function stopGame() {
  state.phase = "lobby";
  state.roundQuestions = [];
  state.qIndex = 0;
  state.paused = false;
  state.winners = [];
  state.answers = new Map();
  stopTicker();
  addLog("أُوقفت اللعبة");
  notify();
}

export function resetScores() {
  for (const p of state.players.values()) p.points = 0;
  addLog("تصفير النقاط");
  notify();
}

export function kickPlayer(username: string) {
  state.players.delete(username.toLowerCase());
  notify();
}

export function clearPlayers() {
  state.players.clear();
  state.answers.clear();
  addLog("تمت إزالة جميع اللاعبين");
  notify();
}

export function backToTopics() {
  stopGame();
  cancelPrediction();
  cancelImageGuess();
  state.mode = "trivia";
  state.topic = null;
  notify();
}

export function subscribe(fn: () => void): () => void {
  state.listeners.add(fn);
  return () => state.listeners.delete(fn);
}

// ---------- serialization ----------
export function getPublicState(): PublicState {
  const q = state.roundQuestions[state.qIndex] ?? null;
  const now = Date.now();
  const msLeft = state.paused
    ? state.pausedRemaining
    : state.phase === "question" || state.phase === "reveal"
    ? Math.max(0, state.phaseEndsAt - now)
    : 0;

  const players = [...state.players.values()]
    .map((p) => {
      const a = state.answers.get(p.username.toLowerCase());
      return {
        username: p.username,
        points: p.points,
        answered: !!a,
        correct: a ? a.correct : null,
      };
    })
    .sort((a, b) => b.points - a.points || a.username.localeCompare(b.username))
    .slice(0, 100);

  return {
    status: state.kick?.status ?? "idle",
    slug: state.kick?.slug ?? "",
    connectError: state.kick?.error ?? "",
    mode: state.mode,
    topic: state.topic,
    topicLabel:
      state.mode === "prediction"
        ? "توقّعات الماتش (PUBG)"
        : state.mode === "imageguess"
        ? "تخمين الصورة"
        : state.topic
        ? TOPIC_LABELS[state.topic]
        : "",
    settings: { ...state.settings },
    roomOpen: state.roomOpen,
    phase: state.phase,
    round: state.round,
    qIndex: state.qIndex,
    perRound: state.roundQuestions.length || state.settings.perRound,
    paused: state.paused,
    question:
      q && (state.phase === "question" || state.phase === "reveal")
        ? {
            id: q.id,
            category: q.category,
            categoryLabel: CATEGORY_LABELS[q.category],
            text: q.text,
            options: [...q.options],
          }
        : null,
    msLeft,
    reveal:
      state.phase === "reveal" && q
        ? { correct: q.correct, winners: [...state.winners] }
        : null,
    prediction: {
      active: state.prediction.active,
      open: state.prediction.open,
      kind: state.prediction.kind,
      resolved: state.prediction.resolved,
      actual: state.prediction.actual,
      count: state.prediction.entries.size,
      entries: [...state.prediction.entries.entries()]
        .map(([key, rec]) => ({
          username: state.players.get(key)?.username ?? key,
          value: rec.value,
          points: rec.points,
        }))
        .sort(
          (a, b) =>
            (b.points ?? -1) - (a.points ?? -1) ||
            a.username.localeCompare(b.username)
        )
        .slice(0, 100),
    },
    imageGuess: {
      active: state.imageGuess.active,
      open: state.imageGuess.open,
      imageUrl: state.imageGuess.imageUrl,
      prompt: state.imageGuess.prompt,
      resolved: state.imageGuess.resolved,
      // الجواب لا يُكشف إلا بعد الحلّ (حتى لا يتسرّب)
      answer: state.imageGuess.resolved ? state.imageGuess.answers[0] ?? "" : "",
      winner: state.imageGuess.winner,
      guessCount: state.imageGuess.guesses.length,
      recentGuesses: state.imageGuess.guesses.slice(-12).map((g) => ({
        username: g.username,
        text: g.text,
        correct: g.correct,
      })),
    },
    players,
    playerCount: state.players.size,
    log: state.log.slice(0, 40),
    chat: state.chat.slice(-40),
    lastWinner: state.lastWinner,
  };
}

// test helper: inject a fake chat message
export function injectChat(username: string, content: string) {
  handleChat(username, content);
}
