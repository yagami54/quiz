export type Category =
  | "general"
  | "history"
  | "geography"
  | "science"
  | "religion"
  | "sports"
  | "art"
  | "gaming";

export const CATEGORY_LABELS: Record<Category, string> = {
  general: "ثقافة عامة",
  history: "تاريخ",
  geography: "جغرافيا",
  science: "علوم",
  religion: "أسئلة دينية",
  sports: "رياضة",
  art: "فن وأدب",
  gaming: "ألعاب (Gaming)",
};

export type Topic = Category | "mixed";

export const TOPIC_LABELS: Record<Topic, string> = {
  ...CATEGORY_LABELS,
  mixed: "منوّع (الكل)",
};

export interface Question {
  id: number;
  category: Category;
  text: string;
  /** نص الخيارات (4 في المصدر، تُوسَّع إلى 6 وقت العرض) */
  options: string[];
  /** فهرس الإجابة الصحيحة */
  correct: number;
}

export type Phase = "lobby" | "question" | "reveal" | "finished";
export type ScoringMode = "first" | "all";
export type KickStatus = "idle" | "connecting" | "connected" | "error";
// top-level activity: trivia, PUBG prediction, or image-guess segment
export type GameMode = "trivia" | "prediction" | "imageguess";

// ---- PUBG match prediction ----
export type PredKind = "kills" | "placement" | "win";

export const PRED_LABELS: Record<PredKind, string> = {
  kills: "عدد القتلات (Kills)",
  placement: "المرتبة النهائية",
  win: "Chicken Dinner؟",
};

export interface PublicPrediction {
  active: boolean;
  open: boolean; // still accepting entries from chat
  kind: PredKind;
  resolved: boolean;
  actual: number | null;
  count: number;
  entries: { username: string; value: number; points: number | null }[];
}

// ---- Image guess (تخمين الصورة) ----
export interface PublicImageGuess {
  active: boolean;
  open: boolean; // accepting guesses from chat
  imageUrl: string;
  prompt: string;
  resolved: boolean;
  answer: string; // shown only after reveal
  winner: string | null;
  guessCount: number;
  recentGuesses: { username: string; text: string; correct: boolean }[];
}

export interface Settings {
  scoringMode: ScoringMode;
  questionSeconds: number;
  perRound: number;
  joinKeyword: string;
  /** true = ينتقل تلقائيًا بعد كشف الجواب · false = يتوقّف وينتظر "السؤال التالي" يدويًا */
  autoAdvance: boolean;
}

export interface PublicState {
  // connection
  status: KickStatus;
  slug: string;
  connectError: string;
  // activity mode + topic & settings
  mode: GameMode;
  topic: Topic | null;
  topicLabel: string;
  settings: Settings;
  // room
  roomOpen: boolean;
  // round
  phase: Phase;
  round: number;
  qIndex: number;
  perRound: number;
  paused: boolean;
  question: {
    id: number;
    category: Category;
    categoryLabel: string;
    text: string;
    options: string[];
  } | null;
  msLeft: number;
  reveal: { correct: number; winners: string[] } | null;
  // pubg match prediction
  prediction: PublicPrediction;
  // image guess
  imageGuess: PublicImageGuess;
  // players
  players: {
    username: string;
    points: number;
    answered: boolean;
    correct: boolean | null;
  }[];
  playerCount: number;
  // feeds
  log: { id: number; text: string; at: number }[];
  chat: { username: string; content: string; color?: string; at: number }[];
  lastWinner: { username: string; points: number; at: number } | null;
}
