/* Coach de communication — logique
 * Pas de build, pas de backend. Tout tourne dans le navigateur.
 * - Reconnaissance vocale : Web Speech API (Chrome/Edge), avec repli manuel.
 * - Retour IA : appel direct à l'API Claude avec une clé que l'utilisateur colle
 *   dans les Réglages (stockée uniquement dans localStorage).
 */

const STORAGE = {
  apiKey: "cc_api_key",
  lang: "cc_lang",
  history: "cc_history",
  goal: "cc_goal",
  stats: "cc_stats",
};

const FILLERS_BY_LANG = {
  fr: ["euh", "heu", "hum", "genre", "tsé", "bah", "ben", "style", "en fait", "du coup", "voilà", "comment dire", "je sais pas"],
  en: ["um", "uh", "erm", "like", "you know", "so yeah", "kinda", "sort of", "i mean", "basically"],
};

const DURATIONS = [15, 30, 45, 60];

const state = {
  lang: localStorage.getItem(STORAGE.lang) || "fr",
  screen: "home",
  mode: null,

  // contenu de l'exercice en cours
  currentPrompt: "",
  promptSub: "",
  targetText: "",
  questions: [],
  questionIndex: 0,

  // enregistrement
  recognition: null,
  recognizing: false,
  finalTranscript: "",
  interimTranscript: "",
  mediaStream: null,
  mediaRecorder: null,
  audioChunks: [],
  startTime: null,
  timerHandle: null,
  lastDurationSeconds: 0,

  // minuteries annexes
  prepHandle: null,
  prepRemaining: 0,
  improHandle: null,
  tpFrame: null,

  // séance chronométrée
  session: null,
};

// ---------- Helpers ----------
function $(id) { return document.getElementById(id); }
function T(key, vars) { return t(key, state.lang, vars); }

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const m = Math.floor(safe / 60).toString().padStart(2, "0");
  const s = Math.floor(safe % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function countWords(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function normalizeWords(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function countFillers(text, lang) {
  const list = FILLERS_BY_LANG[lang] || FILLERS_BY_LANG.fr;
  const lower = text.toLowerCase();
  let total = 0;
  const found = {};
  list.forEach((word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Lookbehind / lookahead : sinon « euh euh » ne compterait qu'une fois
    // (la première correspondance mangerait l'espace séparant les deux).
    const re = new RegExp(`(?<![\\p{L}])${escaped}(?![\\p{L}])`, "gu");
    const matches = lower.match(re);
    if (matches && matches.length) {
      total += matches.length;
      found[word] = matches.length;
    }
  });
  return { total, found };
}

// Mots répétés deux fois de suite ("je je pense") = hésitation
function countRepeats(text) {
  const words = normalizeWords(text);
  let repeats = 0;
  for (let i = 1; i < words.length; i++) {
    if (words[i] === words[i - 1] && words[i].length > 1) repeats++;
  }
  return repeats;
}

// Pourcentage des mots du texte cible réellement prononcés, dans l'ordre
// (plus longue sous-séquence commune).
function readingAccuracy(targetText, saidText) {
  const a = normalizeWords(targetText);
  const b = normalizeWords(saidText);
  if (!a.length || !b.length) return 0;
  const prev = new Array(b.length + 1).fill(0);
  let curr = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = 0;
    for (let j = 1; j <= b.length; j++) {
      curr[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], curr[j - 1]);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return Math.round((prev[b.length] / a.length) * 100);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ---------- Stats & série ----------
function loadStats() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE.stats) || "{}");
    return { sessions: raw.sessions || 0, seconds: raw.seconds || 0, days: raw.days || [] };
  } catch (e) {
    return { sessions: 0, seconds: 0, days: [] };
  }
}

function saveStats(stats) {
  localStorage.setItem(STORAGE.stats, JSON.stringify(stats));
}

function recordPracticeInStats(seconds) {
  const stats = loadStats();
  stats.sessions += 1;
  stats.seconds += Math.round(seconds);
  const key = todayKey();
  if (!stats.days.includes(key)) stats.days.push(key);
  stats.days = stats.days.slice(-400);
  saveStats(stats);
  renderStats();
}

function computeStreak(days) {
  if (!days.length) return 0;
  const set = new Set(days);
  let streak = 0;
  const cursor = new Date();
  // La série tient si on a pratiqué aujourd'hui OU hier (on ne punit pas
  // quelqu'un qui n'a pas encore pratiqué aujourd'hui).
  const k = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  if (!set.has(k(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (set.has(k(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function renderStats() {
  const stats = loadStats();
  $("statStreak").textContent = computeStreak(stats.days);
  $("statSessions").textContent = stats.sessions;
  $("statMinutes").textContent = Math.round(stats.seconds / 60);
}

// ---------- Objectif ----------
function getGoal() {
  return localStorage.getItem(STORAGE.goal) || "";
}

function renderGoalLine() {
  const goalId = getGoal();
  const goal = GOALS.find((g) => g.id === goalId);
  $("goalLine").textContent = goal
    ? `${T("goalPrefix")} ${goal.icon} ${goal[state.lang]}`
    : T("noGoal");
}

function renderGoalGrid() {
  $("goalGrid").innerHTML = GOALS.map(
    (g) => `<button class="goal-btn${g.id === getGoal() ? " selected" : ""}" type="button" data-goal="${g.id}">
      <span class="goal-icon">${g.icon}</span><span>${escapeHtml(g[state.lang])}</span>
    </button>`
  ).join("");
  $("goalGrid").querySelectorAll("[data-goal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.setItem(STORAGE.goal, btn.getAttribute("data-goal"));
      $("goalCard").hidden = true;
      renderGoalLine();
      renderGoalGrid();
    });
  });
}

$("changeGoal").addEventListener("click", () => {
  $("goalCard").hidden = false;
  renderGoalGrid();
  $("goalCard").scrollIntoView({ behavior: "smooth", block: "start" });
});

// ---------- Accueil : durées + grille d'exercices ----------
let pendingDuration = 0; // 0 = mode libre

function renderDurations() {
  const row = $("durationRow");
  const buttons = DURATIONS.map(
    (d) => `<button class="duration-btn${pendingDuration === d ? " selected" : ""}" type="button" data-duration="${d}">
      <strong>${d}</strong><small>${T("minutesShort")}</small></button>`
  );
  buttons.push(
    `<button class="duration-btn${pendingDuration === 0 ? " selected" : ""}" type="button" data-duration="0">
      <strong>∞</strong><small>${T("freeMode")}</small></button>`
  );
  row.innerHTML = buttons.join("");
  row.querySelectorAll("[data-duration]").forEach((btn) => {
    btn.addEventListener("click", () => {
      pendingDuration = parseInt(btn.getAttribute("data-duration"), 10);
      renderDurations();
    });
  });
}

function renderExerciseGrid() {
  $("exerciseGrid").innerHTML = EXERCISE_MODES.map(
    (m) => `<button class="exercise-card ex-${m.id}" type="button" data-mode="${m.id}">
      <span class="ex-icon">${m.icon}</span>
      <span class="ex-name">${escapeHtml(m[state.lang].name)}</span>
      <span class="ex-desc">${escapeHtml(m[state.lang].desc)}</span>
    </button>`
  ).join("");
  $("exerciseGrid").querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => openExercise(btn.getAttribute("data-mode")));
  });
}

// ---------- Séance chronométrée ----------
function startSessionIfNeeded() {
  if (state.session || !pendingDuration) return;
  state.session = {
    totalSeconds: pendingDuration * 60,
    endsAt: Date.now() + pendingDuration * 60 * 1000,
    exercises: 0,
    words: 0,
    fillers: 0,
    handle: null,
  };
  $("sessionBar").hidden = false;
  tickSession();
  state.session.handle = setInterval(tickSession, 1000);
}

function tickSession() {
  if (!state.session) return;
  const left = Math.round((state.session.endsAt - Date.now()) / 1000);
  $("sessionBarText").textContent = `${T("sessionRunning")} · ${state.session.exercises} ✓`;
  $("sessionBarTime").textContent = `${formatTime(left)} ${T("sessionLeft")}`;
  if (left <= 0) endSession();
}

function endSession() {
  if (!state.session) return;
  const s = state.session;
  clearInterval(s.handle);
  state.session = null;
  $("sessionBar").hidden = true;

  const minutes = Math.max(1, Math.round((s.totalSeconds - Math.max(0, Math.round((s.endsAt - Date.now()) / 1000))) / 60));
  const stats = loadStats();
  const body = s.exercises
    ? `<p>${escapeHtml(T("recapLine", { n: s.exercises, min: minutes }))}</p>
       <p>${escapeHtml(T("recapWords", { words: s.words, fillers: s.fillers }))}</p>
       <p>${escapeHtml(T("recapStreak", { n: computeStreak(stats.days) }))}</p>`
    : `<p>${escapeHtml(T("recapEmpty"))}</p>`;
  $("recapBody").innerHTML = body;
  $("recapModal").hidden = false;
}

$("endSessionBtn").addEventListener("click", endSession);
$("closeRecap").addEventListener("click", () => ($("recapModal").hidden = true));
$("recapDone").addEventListener("click", () => {
  $("recapModal").hidden = true;
  goHome();
});

// ---------- Navigation entre écrans ----------
function goHome() {
  stopEverything();
  state.screen = "home";
  state.mode = null;
  $("homeScreen").hidden = false;
  $("practiceScreen").hidden = true;
  renderStats();
  renderHistory();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openExercise(modeId) {
  stopEverything();
  state.mode = getMode(modeId);
  state.screen = "practice";
  $("homeScreen").hidden = true;
  $("practiceScreen").hidden = false;
  startSessionIfNeeded();
  resetPracticeUi();
  loadExerciseContent();
  renderLesson();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$("backHome").addEventListener("click", goHome);

function resetPracticeUi() {
  state.finalTranscript = "";
  state.interimTranscript = "";
  $("transcriptBox").textContent = "";
  $("transcriptCard").hidden = true;
  $("metricsCard").hidden = true;
  $("aiCard").hidden = true;
  $("aiResult").hidden = true;
  $("aiResult").innerHTML = "";
  $("newSessionBtn").hidden = true;
  $("playback").hidden = true;
  $("playbackHint").hidden = true;
  $("timer").textContent = "00:00";
  $("repeatNote").hidden = true;
  $("paceNote").textContent = "";
  $("fillerNote").textContent = "";
}

// ---------- Chargement du contenu par mode ----------
function loadExerciseContent() {
  const mode = state.mode;
  const lang = state.lang;
  state.targetText = "";
  state.questions = [];
  state.questionIndex = 0;
  state.promptSub = "";

  $("exerciseTitle").textContent = `${mode.icon} ${mode[lang].name}`;
  $("customPromptWrap").hidden = mode.kind !== "topic";
  $("teleprompter").hidden = true;
  $("teleprompterControls").hidden = true;
  $("questionNav").hidden = true;
  $("prepBox").hidden = true;
  $("accuracyBox").hidden = true;
  $("promptSub").hidden = true;
  $("promptText").classList.remove("prompt-word", "prompt-twister");

  if (mode.kind === "topic") {
    state.currentPrompt = getRandomPrompt(lang);
    $("promptText").textContent = state.currentPrompt;
    setSub(T("instrLibre"));
  }

  else if (mode.kind === "word") {
    const entry = pickRandom(WORD_BANK[lang] || WORD_BANK.fr);
    state.currentPrompt = entry.w;
    $("promptText").textContent = entry.w;
    $("promptText").classList.add("prompt-word");
    setSub(`${T("instrMot")} — ${T("wordDefinition")} : ${entry.d}`);
    startPrep(mode.prepSeconds);
  }

  else if (mode.kind === "rapid") {
    state.questions = shuffle(IMPRO_QUESTIONS[lang] || IMPRO_QUESTIONS.fr).slice(0, 8);
    state.currentPrompt = state.questions[0];
    $("promptText").textContent = state.currentPrompt;
    setSub(T("instrImpro"));
    showQuestionNav();
  }

  else if (mode.kind === "debate") {
    const topic = pickRandom(DEBATE_TOPICS[lang] || DEBATE_TOPICS.fr);
    const side = Math.random() < 0.5 ? T("debateFor") : T("debateAgainst");
    state.currentPrompt = `${topic} — ${T("debateSide", { side })}`;
    $("promptText").innerHTML = `${escapeHtml(topic)}<span class="debate-side">${escapeHtml(T("debateSide", { side }))}</span>`;
    setSub(T("instrDebat"));
    startPrep(mode.prepSeconds);
  }

  else if (mode.kind === "interview") {
    const set = pickRandom(INTERVIEW_SETS[lang] || INTERVIEW_SETS.fr);
    state.questions = set.questions.slice();
    state.currentPrompt = state.questions[0];
    $("promptText").textContent = state.currentPrompt;
    setSub(`${set.topic} — ${T("instrInterview")}`);
    showQuestionNav();
  }

  else if (mode.kind === "read" && mode.id === "articulation") {
    const twister = pickRandom(TONGUE_TWISTERS[lang] || TONGUE_TWISTERS.fr);
    state.currentPrompt = twister;
    state.targetText = twister;
    $("promptText").textContent = twister;
    $("promptText").classList.add("prompt-twister");
    setSub(T("instrArticulation"));
  }

  else if (mode.kind === "read" && mode.id === "lecture") {
    const entry = pickRandom(READING_TEXTS[lang] || READING_TEXTS.fr);
    state.currentPrompt = entry.title;
    state.targetText = entry.text;
    $("promptText").textContent = entry.title;
    setSub(T("instrLecture"));
    $("teleprompter").hidden = false;
    $("teleprompterControls").hidden = false;
    $("teleprompterInner").textContent = entry.text;
    resetTeleprompter();
  }
}

function setSub(text) {
  $("promptSub").textContent = text;
  $("promptSub").hidden = !text;
}

function showQuestionNav() {
  $("questionNav").hidden = false;
  updateQuestionCounter();
}

function updateQuestionCounter() {
  $("questionCounter").textContent = T("questionOf", {
    n: state.questionIndex + 1,
    total: state.questions.length,
  });
  const isLast = state.questionIndex >= state.questions.length - 1;
  $("nextQuestion").disabled = isLast;
  $("nextQuestion").textContent = isLast ? T("lastQuestion") : T("nextQuestion");
}

function nextQuestion() {
  if (state.questionIndex >= state.questions.length - 1) return;
  state.questionIndex++;
  state.currentPrompt = state.questions[state.questionIndex];
  const el = $("promptText");
  el.classList.remove("prompt-flash");
  void el.offsetWidth; // relance l'animation
  el.textContent = state.currentPrompt;
  el.classList.add("prompt-flash");
  updateQuestionCounter();
}

$("nextQuestion").addEventListener("click", nextQuestion);
$("shufflePrompt").addEventListener("click", () => {
  stopPrep();
  stopImpro();
  loadExerciseContent();
});

$("useCustomPrompt").addEventListener("click", () => {
  const val = $("customPrompt").value.trim();
  if (!val) return;
  state.currentPrompt = val;
  $("promptText").textContent = val;
  $("customPrompt").value = "";
});

// ---------- Mini-leçon ----------
function renderLesson() {
  const lesson = (LESSONS[state.mode.id] || LESSONS.libre)[state.lang];
  $("lessonTitle").textContent = lesson.title;
  $("lessonList").innerHTML = lesson.rules.map((r) => `<li>${escapeHtml(r)}</li>`).join("");
}

// ---------- Compte à rebours de préparation ----------
function startPrep(seconds) {
  stopPrep();
  state.prepRemaining = seconds || 60;
  $("prepBox").hidden = false;
  $("prepTime").textContent = formatTime(state.prepRemaining);
  state.prepHandle = setInterval(() => {
    state.prepRemaining--;
    $("prepTime").textContent = formatTime(state.prepRemaining);
    if (state.prepRemaining <= 0) {
      stopPrep();
      $("recordBtn").focus();
    }
  }, 1000);
}

function stopPrep() {
  clearInterval(state.prepHandle);
  state.prepHandle = null;
  $("prepBox").hidden = true;
}

$("skipPrep").addEventListener("click", stopPrep);

// ---------- Improvisation : questions qui s'enchaînent ----------
function startImpro() {
  if (!state.mode || state.mode.kind !== "rapid") return;
  stopImpro();
  const every = (state.mode.questionSeconds || 30) * 1000;
  state.improHandle = setInterval(() => {
    if (state.questionIndex >= state.questions.length - 1) {
      stopImpro();
      return;
    }
    nextQuestion();
  }, every);
}

function stopImpro() {
  clearInterval(state.improHandle);
  state.improHandle = null;
}

// ---------- Téléprompteur ----------
function resetTeleprompter() {
  cancelAnimationFrame(state.tpFrame);
  state.tpFrame = null;
  $("teleprompterInner").style.transform = "translateY(0px)";
}

$("tpSpeed").addEventListener("input", () => {
  $("tpSpeedValue").textContent = $("tpSpeed").value;
});

function startTeleprompter() {
  if (!state.mode || !state.mode.teleprompter) return;
  const container = $("teleprompter");
  const inner = $("teleprompterInner");
  resetTeleprompter();

  const wpm = parseInt($("tpSpeed").value, 10) || 140;
  const words = countWords(state.targetText);
  const totalMs = (words / wpm) * 60 * 1000;
  const distance = Math.max(0, inner.scrollHeight - container.clientHeight + 24);
  const leadIn = 1500;
  const started = performance.now();

  function frame(now) {
    const elapsed = now - started - leadIn;
    if (elapsed > 0) {
      const ratio = Math.min(1, elapsed / totalMs);
      inner.style.transform = `translateY(${-distance * ratio}px)`;
      if (ratio >= 1) return;
    }
    state.tpFrame = requestAnimationFrame(frame);
  }
  state.tpFrame = requestAnimationFrame(frame);
}

// ---------- Enregistrement + transcription ----------
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

function buildRecognition() {
  if (!SpeechRecognitionAPI) return null;
  const recognition = new SpeechRecognitionAPI();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = state.lang === "fr" ? "fr-FR" : "en-US";

  recognition.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const piece = event.results[i][0].transcript;
      if (event.results[i].isFinal) state.finalTranscript += piece + " ";
      else interim += piece;
    }
    state.interimTranscript = interim;
    renderTranscript();
  };

  recognition.onerror = (e) => console.warn("Speech recognition error:", e.error);

  // Chrome/Edge coupent parfois la reconnaissance d'eux-mêmes après une pause.
  // Tant que l'utilisateur n'a pas appuyé sur « arrêter », on relance discrètement.
  recognition.onend = () => {
    if (state.recognizing) {
      try {
        state.recognition = buildRecognition();
        state.recognition.start();
      } catch (e) { /* ignore */ }
    }
  };

  return recognition;
}

function renderTranscript() {
  $("transcriptBox").textContent = (state.finalTranscript + state.interimTranscript).trim();
}

function startTimer() {
  state.startTime = Date.now();
  $("timer").textContent = "00:00";
  state.timerHandle = setInterval(() => {
    $("timer").textContent = formatTime((Date.now() - state.startTime) / 1000);
  }, 250);
}

function stopTimer() {
  clearInterval(state.timerHandle);
  state.lastDurationSeconds = state.startTime ? (Date.now() - state.startTime) / 1000 : 0;
}

async function startRecording() {
  try {
    state.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    alert(
      state.lang === "fr"
        ? "Impossible d'accéder au micro. Vérifie les permissions de ton navigateur."
        : "Couldn't access the microphone. Check your browser permissions."
    );
    return;
  }

  stopPrep();

  state.audioChunks = [];
  state.mediaRecorder = new MediaRecorder(state.mediaStream);
  state.mediaRecorder.ondataavailable = (e) => state.audioChunks.push(e.data);
  state.mediaRecorder.onstop = () => {
    const blob = new Blob(state.audioChunks, { type: "audio/webm" });
    const playback = $("playback");
    playback.src = URL.createObjectURL(blob);
    playback.hidden = false;
    $("playbackHint").hidden = false;
  };
  state.mediaRecorder.start();

  state.finalTranscript = "";
  state.interimTranscript = "";
  renderTranscript();

  if (SpeechRecognitionAPI) {
    state.recognition = buildRecognition();
    try { state.recognition.start(); } catch (e) { /* déjà démarré */ }
  } else {
    $("micHint").textContent =
      state.lang === "fr"
        ? "Ton navigateur ne supporte pas la transcription automatique — tape ton texte ci-dessous après l'enregistrement (essaie Chrome ou Edge)."
        : "Your browser doesn't support live transcription — type your text below after recording (try Chrome or Edge).";
  }

  startTimer();
  startImpro();
  startTeleprompter();

  $("recordBtn").setAttribute("aria-pressed", "true");
  $("recordLabel").textContent = T("stopRecording");
  state.recognizing = true;

  $("transcriptCard").hidden = false;
  $("transcriptBox").setAttribute("data-placeholder", state.lang === "fr" ? "En écoute…" : "Listening…");
}

function stopRecording() {
  if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") state.mediaRecorder.stop();
  if (state.mediaStream) state.mediaStream.getTracks().forEach((tr) => tr.stop());
  if (state.recognition) { try { state.recognition.stop(); } catch (e) {} }

  state.recognizing = false;
  stopTimer();
  stopImpro();
  cancelAnimationFrame(state.tpFrame);

  $("recordBtn").setAttribute("aria-pressed", "false");
  $("recordLabel").textContent = T("startRecording");
  $("transcriptBox").textContent = (state.finalTranscript + state.interimTranscript).trim();

  onTranscriptReady();
}

function stopEverything() {
  if (state.recognizing) {
    if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") state.mediaRecorder.stop();
    if (state.mediaStream) state.mediaStream.getTracks().forEach((tr) => tr.stop());
    if (state.recognition) { try { state.recognition.stop(); } catch (e) {} }
    state.recognizing = false;
    $("recordBtn").setAttribute("aria-pressed", "false");
    $("recordLabel").textContent = T("startRecording");
  }
  clearInterval(state.timerHandle);
  stopPrep();
  stopImpro();
  cancelAnimationFrame(state.tpFrame);
}

$("recordBtn").addEventListener("click", () => {
  if (state.recognizing) stopRecording();
  else startRecording();
});

// ---------- Statistiques de l'exercice ----------
function onTranscriptReady() {
  $("metricsCard").hidden = false;
  $("aiCard").hidden = false;
  $("newSessionBtn").hidden = false;
  computeAndRenderMetrics();
  refreshApiKeyUi();

  const text = currentTranscriptText();
  if (text) {
    recordPracticeInStats(state.lastDurationSeconds);
    saveToHistory("");
    if (state.session) {
      state.session.exercises++;
      state.session.words += countWords(text);
      state.session.fillers += countFillers(text, state.lang).total;
      tickSession();
    }
  }
}

function currentTranscriptText() {
  return $("transcriptBox").textContent.trim();
}

function computeAndRenderMetrics() {
  const text = currentTranscriptText();
  const duration = Math.max(state.lastDurationSeconds, 1);
  const words = countWords(text);
  const wpm = Math.round(words / (duration / 60));
  const fillers = countFillers(text, state.lang);
  const repeats = countRepeats(text);

  $("mDuration").textContent = formatTime(duration);
  $("mWpm").textContent = text ? wpm : "–";
  $("mWords").textContent = words;
  $("mFillers").textContent = fillers.total;

  // Précision de lecture (modes articulation / lecture)
  if (state.targetText && text) {
    const accuracy = readingAccuracy(state.targetText, text);
    $("accuracyBox").hidden = false;
    $("accuracyValue").textContent = accuracy + " %";
    $("accuracyFill").style.width = accuracy + "%";
    $("accuracyFill").className = "accuracy-fill" + (accuracy >= 85 ? " good" : accuracy >= 60 ? " mid" : " low");
    $("accuracyNote").textContent =
      accuracy >= 85
        ? state.lang === "fr"
          ? "Excellent — le texte est passé presque mot pour mot."
          : "Excellent — nearly word for word."
        : accuracy >= 60
        ? state.lang === "fr"
          ? "Pas mal. Ralentis un peu et termine tes mots : c'est là que ça se perd."
          : "Not bad. Slow down a little and finish your words: that's where it slips."
        : state.lang === "fr"
        ? "Beaucoup de mots sont passés à la trappe. Reprends plus lentement, en exagérant l'articulation."
        : "A lot of words got lost. Go again more slowly, over-pronouncing everything.";
  } else {
    $("accuracyBox").hidden = true;
  }

  const paceNote = $("paceNote");
  if (!text) {
    paceNote.textContent = "";
  } else if (wpm < 100) {
    paceNote.className = "pace-note warn";
    paceNote.textContent =
      state.lang === "fr"
        ? `Débit plutôt lent (${wpm} mots/min). Un rythme naturel tourne souvent autour de 120–160 mots/min.`
        : `Fairly slow pace (${wpm} wpm). A natural pace is often around 120–160 wpm.`;
  } else if (wpm > 170) {
    paceNote.className = "pace-note warn";
    paceNote.textContent =
      state.lang === "fr"
        ? `Débit assez rapide (${wpm} mots/min). Respire et laisse des pauses pour te faire comprendre.`
        : `Fairly fast pace (${wpm} wpm). Breathe and leave pauses so people can follow.`;
  } else {
    paceNote.className = "pace-note";
    paceNote.textContent =
      state.lang === "fr" ? `Bon rythme (${wpm} mots/min) !` : `Good pace (${wpm} wpm)!`;
  }

  const fillerNote = $("fillerNote");
  if (!text) {
    fillerNote.textContent = "";
  } else if (fillers.total === 0) {
    fillerNote.className = "filler-note";
    fillerNote.textContent =
      state.lang === "fr" ? "Aucun mot de remplissage détecté, bravo !" : "No filler words detected, nice!";
  } else {
    fillerNote.className = "filler-note warn";
    const topWords = Object.entries(fillers.found)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([w, n]) => `${w} (${n})`)
      .join(", ");
    fillerNote.textContent =
      state.lang === "fr"
        ? `${fillers.total} mot(s) de remplissage : ${topWords}`
        : `${fillers.total} filler word(s): ${topWords}`;
  }

  const repeatNote = $("repeatNote");
  if (text && repeats > 0) {
    repeatNote.hidden = false;
    repeatNote.className = "filler-note warn";
    repeatNote.textContent =
      state.lang === "fr"
        ? `${repeats} répétition(s) de mot détectée(s) (« je je… ») — signe d'hésitation.`
        : `${repeats} word repetition(s) detected (“I I…”) — a sign of hesitation.`;
  } else {
    repeatNote.hidden = true;
  }
}

$("transcriptBox").addEventListener("input", computeAndRenderMetrics);

// ---------- Réglages / clé API ----------
function getApiKey() {
  return localStorage.getItem(STORAGE.apiKey) || "";
}

function refreshApiKeyUi() {
  const hasKey = !!getApiKey();
  $("aiKeyMissing").hidden = hasKey;
  $("getFeedbackBtn").hidden = !hasKey;
}

function openSettings() {
  $("apiKeyInput").value = getApiKey();
  $("settingsModal").hidden = false;
}

$("settingsBtn").addEventListener("click", openSettings);
$("openSettingsFromNotice").addEventListener("click", openSettings);
$("closeSettings").addEventListener("click", () => ($("settingsModal").hidden = true));

$("saveApiKey").addEventListener("click", () => {
  const val = $("apiKeyInput").value.trim();
  if (val) localStorage.setItem(STORAGE.apiKey, val);
  $("settingsModal").hidden = true;
  refreshApiKeyUi();
});

$("removeApiKey").addEventListener("click", () => {
  localStorage.removeItem(STORAGE.apiKey);
  $("apiKeyInput").value = "";
  refreshApiKeyUi();
});

// ---------- Retour IA ----------
async function requestAiFeedback() {
  const key = getApiKey();
  if (!key) return;

  const transcript = currentTranscriptText();
  if (!transcript) {
    alert(state.lang === "fr" ? "Il n'y a pas encore de texte à analyser." : "There's no text to analyze yet.");
    return;
  }

  $("getFeedbackBtn").hidden = true;
  $("aiLoading").hidden = false;
  $("aiResult").hidden = true;

  const modeName = state.mode ? state.mode[state.lang].name : "";
  const goal = GOALS.find((g) => g.id === getGoal());
  const goalText = goal ? goal[state.lang] : "";

  const systemPrompt =
    state.lang === "fr"
      ? `Tu es un coach de communication bienveillant mais honnête, qui aide des étudiant·e·s à s'améliorer à l'oral.
On te donne le type d'exercice, la consigne, et la transcription de ce qu'une personne a dit. Réponds en français, de façon chaleureuse et concrète.
Structure ta réponse en Markdown avec exactement ces 3 sections :
### Points forts
(2 à 3 puces, concrètes, qui citent des éléments précis du texte)
### À améliorer
(2 à 3 puces, concrètes et actionnables — pas vagues)
### Exemple reformulé
(reformule UNE phrase ou un passage du texte pour montrer une version plus claire ou plus percutante)
Reste concis, encourageant, jamais condescendant.`
      : `You are a warm but honest communication coach helping students improve their spoken communication.
You'll get the exercise type, the instruction, and a transcript of what someone said. Reply in English, warmly and concretely.
Structure your reply in Markdown with exactly these 3 sections:
### Strengths
(2-3 concrete bullets referencing specific parts of the text)
### To improve
(2-3 concrete, actionable bullets — not vague)
### Rewritten example
(rewrite ONE sentence or passage from the text to show a clearer or more impactful version)
Keep it concise, encouraging, never condescending.`;

  let userMessage =
    state.lang === "fr"
      ? `Type d'exercice : ${modeName}\nConsigne : "${state.currentPrompt}"`
      : `Exercise type: ${modeName}\nInstruction: "${state.currentPrompt}"`;
  if (state.targetText) {
    userMessage +=
      state.lang === "fr"
        ? `\n\nTexte à lire (référence) :\n"""\n${state.targetText}\n"""`
        : `\n\nText to read (reference):\n"""\n${state.targetText}\n"""`;
  }
  if (goalText) {
    userMessage +=
      state.lang === "fr"
        ? `\n\nObjectif personnel de la personne : ${goalText}`
        : `\n\nThe person's personal goal: ${goalText}`;
  }
  userMessage +=
    state.lang === "fr"
      ? `\n\nTranscription :\n"""\n${transcript}\n"""`
      : `\n\nTranscript:\n"""\n${transcript}\n"""`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-latest",
        max_tokens: 700,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error((errBody && errBody.error && errBody.error.message) || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = (data && data.content && data.content[0] && data.content[0].text) || "";
    renderAiFeedback(text);
    attachFeedbackToLastHistory(text);
  } catch (err) {
    $("aiResult").hidden = false;
    $("aiResult").innerHTML = `<p style="color:#b3244c;">${
      state.lang === "fr" ? "Erreur en contactant Claude : " : "Error contacting Claude: "
    }${escapeHtml(err.message)}</p>`;
  } finally {
    $("aiLoading").hidden = true;
    $("getFeedbackBtn").hidden = false;
  }
}

$("getFeedbackBtn").addEventListener("click", requestAiFeedback);

// Petit rendu Markdown : titres ###, listes à puces, paragraphes.
function renderAiFeedback(markdown) {
  const lines = markdown.split("\n");
  let html = "";
  let inList = false;
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("### ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h3>${escapeHtml(trimmed.slice(4))}</h3>`;
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${escapeHtml(trimmed.slice(2))}</li>`;
    } else if (trimmed === "") {
      if (inList) { html += "</ul>"; inList = false; }
    } else {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<p>${escapeHtml(trimmed)}</p>`;
    }
  });
  if (inList) html += "</ul>";
  $("aiResult").hidden = false;
  $("aiResult").innerHTML = html;
}

// ---------- Historique ----------
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.history) || "[]");
  } catch (e) {
    return [];
  }
}

function saveToHistory(aiFeedbackText) {
  const history = loadHistory();
  history.unshift({
    date: new Date().toISOString(),
    mode: state.mode ? state.mode.id : "libre",
    modeIcon: state.mode ? state.mode.icon : "🎯",
    topic: state.currentPrompt,
    transcript: currentTranscriptText(),
    feedback: aiFeedbackText || "",
    durationSeconds: Math.round(state.lastDurationSeconds),
    fillers: countFillers(currentTranscriptText(), state.lang).total,
  });
  localStorage.setItem(STORAGE.history, JSON.stringify(history.slice(0, 60)));
  renderHistory();
}

function attachFeedbackToLastHistory(text) {
  const history = loadHistory();
  if (!history.length) return;
  history[0].feedback = text || "";
  localStorage.setItem(STORAGE.history, JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  const list = $("historyList");
  if (!history.length) {
    list.innerHTML = `<p class="empty-state">${escapeHtml(T("noHistory"))}</p>`;
    return;
  }
  list.innerHTML = history
    .slice(0, 15)
    .map((item) => {
      const d = new Date(item.date);
      const dateStr = d.toLocaleDateString(state.lang === "fr" ? "fr-CA" : "en-CA", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      const meta = `${dateStr} · ${formatTime(item.durationSeconds)}${
        item.fillers ? ` · 🔁 ${item.fillers}` : ""
      }${item.feedback ? " · 🤖" : ""}`;
      return `<div class="history-item">
        <span class="history-icon">${item.modeIcon || "🎯"}</span>
        <div class="history-item-main">
          <p class="history-item-topic">${escapeHtml(item.topic || "")}</p>
          <p class="history-item-meta">${escapeHtml(meta)}</p>
        </div>
      </div>`;
    })
    .join("");
}

$("clearHistory").addEventListener("click", () => {
  if (confirm(state.lang === "fr" ? "Effacer tout l'historique ?" : "Clear all history?")) {
    localStorage.removeItem(STORAGE.history);
    renderHistory();
  }
});

// ---------- Refaire un tour ----------
$("newSessionBtn").addEventListener("click", () => {
  resetPracticeUi();
  loadExerciseContent();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Langue ----------
function setLang(lang) {
  state.lang = lang;
  localStorage.setItem(STORAGE.lang, lang);
  applyI18n(lang);
  renderDurations();
  renderExerciseGrid();
  renderGoalLine();
  renderGoalGrid();
  renderHistory();
  if (state.screen === "practice" && state.mode) {
    resetPracticeUi();
    loadExerciseContent();
    renderLesson();
  }
}

$("langToggle").addEventListener("click", () => setLang(state.lang === "fr" ? "en" : "fr"));

// ---------- Init ----------
applyI18n(state.lang);
renderDurations();
renderExerciseGrid();
renderStats();
renderGoalLine();
renderGoalGrid();
renderHistory();
refreshApiKeyUi();

if (!getGoal()) $("goalCard").hidden = false;

if (!SpeechRecognitionAPI) {
  $("micHint").textContent =
    state.lang === "fr"
      ? "Astuce : pour la transcription automatique, utilise Chrome ou Edge. Sinon, tu pourras taper ton texte toi-même."
      : "Tip: for automatic transcription, use Chrome or Edge. Otherwise you can type your own text.";
}
