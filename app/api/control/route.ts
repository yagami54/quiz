import {
  backToTopics,
  cancelImageGuess,
  cancelPrediction,
  clearPlayers,
  closePrediction,
  closeRoom,
  connectKick,
  disconnectKick,
  injectChat,
  kickPlayer,
  nextQuestion,
  openImageGuess,
  openPrediction,
  openRoom,
  resetScores,
  resolvePrediction,
  revealImageGuess,
  setMode,
  setTopic,
  startRound,
  stopGame,
  togglePause,
  updateSettings,
} from "@/lib/game";
import { GameMode, PredKind, Topic } from "@/lib/types";
import { guard } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;

  const body = await request.json().catch(() => ({}));
  const action = typeof body.action === "string" ? body.action : "";

  switch (action) {
    case "connect":
      await connectKick(String(body.slug || ""));
      break;
    case "disconnect":
      disconnectKick();
      break;
    case "topic":
      setTopic(body.topic as Topic);
      break;
    case "mode":
      setMode((body.mode as GameMode) || "trivia");
      break;
    case "settings":
      updateSettings(body.settings || {});
      break;
    case "openRoom":
      openRoom();
      break;
    case "closeRoom":
      closeRoom();
      break;
    case "openPrediction":
      openPrediction((body.kind as PredKind) || "kills");
      break;
    case "closePrediction":
      closePrediction();
      break;
    case "resolvePrediction":
      resolvePrediction(Number(body.actual) || 0);
      break;
    case "cancelPrediction":
      cancelPrediction();
      break;
    case "openImageGuess":
      openImageGuess(
        String(body.imageUrl || ""),
        String(body.prompt || ""),
        Array.isArray(body.answers)
          ? body.answers.map(String)
          : String(body.answers || "")
              .split(",")
              .map((s) => s.trim()),
      );
      break;
    case "revealImageGuess":
      revealImageGuess();
      break;
    case "cancelImageGuess":
      cancelImageGuess();
      break;
    case "start":
      startRound();
      break;
    case "next":
      nextQuestion();
      break;
    case "pause":
      togglePause();
      break;
    case "stop":
      stopGame();
      break;
    case "reset":
      resetScores();
      break;
    case "kick":
      kickPlayer(String(body.username || ""));
      break;
    case "clear":
      clearPlayers();
      break;
    case "back":
      backToTopics();
      break;
    case "simulate": // testing: inject a fake chat message
      injectChat(String(body.username || "tester"), String(body.content || ""));
      break;
    default:
      return Response.json({ error: "unknown action" }, { status: 400 });
  }
  return Response.json({ ok: true });
}
