/* Coach de communication — logic
 * No build step, no backend. Everything runs in the browser.
 * - Speech-to-text: Web Speech API (Chrome/Edge). Falls back to manual typing.
 * - AI feedback: calls Anthropic's Claude API directly from the browser,
 *   using a key the user pastes into Settings (stored in localStorage only).
 */

const STORAGE = {
  apiKey: "cc_api_key",
  lang: "cc_lang",
  history: "cc_history",
};

const FILLERS_BY_LANG = {
  fr: ["euh", "hum", "genre", "tsé", "bah", "style"],
  en: ["um", "uh", "like", "you know", "so yeah", "kinda"],
};

const state = {
  lang: localStorage.getItem(STORAGE.lang) || "fr",
  currentPrompt: "",
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
};

// ---------- Helpers ----------
function $(id) { return document.getElementById(id); }

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function countWords(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function countFillers(text, lang) {
  const list = FILLERS_BY_LANG[lang] || FILLERS_BY_LANG.fr;
  const lower = text.toLowerCase();
  let total = 0;
  const found = {};
  list.forEach((word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`\\b${escaped}\\b`, "g");
    const matches = lower.match(re);
    if (matches && matches.length) {
      total += matches.length;
      found[word] = matches.length;
    }
  });
  return { total, found };
}

// ---------- i18n / language ----------
function setLang(lang) {
  state.lang = lang;
  localStorage.setItem(STORAGE.lang, lang);
  applyI18n(lang);
  loadNewPrompt();
}

$("langToggle").addEventListener("click", () => {
  setLang(state.lang === "fr" ? "en" : "fr");
});

// ---------- Prompt ----------
function loadNewPrompt() {
  state.currentPrompt = getRandomPrompt(state.lang);
  $("promptText").textContent = state.currentPrompt;
}

$("shufflePrompt").addEventListener("click", loadNewPrompt);

$("useCustomPrompt").addEventListener("click", () => {
  const val = $("customPrompt").value.trim();
  if (!val) return;
  state.currentPrompt = val;
  $("promptText").textContent = val;
  $("customPrompt").value = "";
});

// ---------- Recording + live transcription ----------
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
      const transcriptPiece = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        state.finalTranscript += transcriptPiece + " ";
      } else {
        interim += transcriptPiece;
      }
    }
    state.interimTranscript = interim;
    renderTranscript();
  };

  recognition.onerror = (e) => {
    console.warn("Speech recognition error:", e.error);
  };

  // Chrome/Edge sometimes end recognition on their own after a pause,
  // even while continuous=true. If the user hasn't pressed "stop" yet,
  // just restart it quietly so longer recordings keep transcribing.
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
  const box = $("transcriptBox");
  box.textContent = (state.finalTranscript + state.interimTranscript).trim();
}

function startTimer() {
  state.startTime = Date.now();
  $("timer").textContent = "00:00";
  state.timerHandle = setInterval(() => {
    const elapsed = (Date.now() - state.startTime) / 1000;
    $("timer").textContent = formatTime(elapsed);
  }, 250);
}

function stopTimer() {
  clearInterval(state.timerHandle);
  state.lastDurationSeconds = (Date.now() - state.startTime) / 1000;
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

  state.audioChunks = [];
  state.mediaRecorder = new MediaRecorder(state.mediaStream);
  state.mediaRecorder.ondataavailable = (e) => state.audioChunks.push(e.data);
  state.mediaRecorder.onstop = () => {
    const blob = new Blob(state.audioChunks, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    const playback = $("playback");
    playback.src = url;
    playback.hidden = false;
  };
  state.mediaRecorder.start();

  state.finalTranscript = "";
  state.interimTranscript = "";
  renderTranscript();

  if (SpeechRecognitionAPI) {
    state.recognition = buildRecognition();
    try {
      state.recognition.start();
    } catch (e) { /* already started, ignore */ }
  } else {
    $("micHint").textContent =
      state.lang === "fr"
        ? "Ton navigateur ne supporte pas la transcription automatique — tape ton texte ci-dessous après l'enregistrement (essaie Chrome ou Edge pour la transcription auto)."
        : "Your browser doesn't support live transcription — type your text below after recording (try Chrome or Edge for auto transcription).";
  }

  startTimer();

  const btn = $("recordBtn");
  btn.setAttribute("aria-pressed", "true");
  $("recordLabel").textContent = I18N[state.lang].stopRecording;
  state.recognizing = true;

  $("transcriptCard").hidden = false;
  $("transcriptBox").setAttribute("data-placeholder", state.lang === "fr" ? "En écoute…" : "Listening…");
}

function stopRecording() {
  if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") {
    state.mediaRecorder.stop();
  }
  if (state.mediaStream) {
    state.mediaStream.getTracks().forEach((t) => t.stop());
  }
  if (state.recognition) {
    try { state.recognition.stop(); } catch (e) {}
  }

  stopTimer();

  const btn = $("recordBtn");
  btn.setAttribute("aria-pressed", "false");
  $("recordLabel").textContent = I18N[state.lang].startRecording;
  state.recognizing = false;

  // finalize transcript box as editable final text
  const finalText = (state.finalTranscript + state.interimTranscript).trim();
  $("transcriptBox").textContent = finalText;

  onTranscriptReady();
}

$("recordBtn").addEventListener("click", () => {
  if (state.recognizing) stopRecording();
  else startRecording();
});

// ---------- Metrics ----------
function onTranscriptReady() {
  $("metricsCard").hidden = false;
  $("aiCard").hidden = false;
  $("newSessionBtn").hidden = false;
  computeAndRenderMetrics();
  refreshApiKeyUi();
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

  $("mDuration").textContent = formatTime(duration);
  $("mWpm").textContent = text ? wpm : "–";
  $("mWords").textContent = words;
  $("mFillers").textContent = fillers.total;

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
      state.lang === "fr"
        ? `Bon rythme (${wpm} mots/min) !`
        : `Good pace (${wpm} wpm)!`;
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
      .map(([w, n]) => `${w} (${n})`)
      .join(", ");
    fillerNote.textContent =
      state.lang === "fr"
        ? `${fillers.total} mot(s) de remplissage : ${topWords}`
        : `${fillers.total} filler word(s): ${topWords}`;
  }
}

// re-compute metrics live if the user edits the transcript by hand
$("transcriptBox").addEventListener("input", computeAndRenderMetrics);

// ---------- Settings / API key ----------
function getApiKey() {
  return localStorage.getItem(STORAGE.apiKey) || "";
}

function refreshApiKeyUi() {
  const hasKey = !!getApiKey();
  $("aiKeyMissing").hidden = hasKey;
  $("getFeedbackBtn").hidden = !hasKey;
}

$("settingsBtn").addEventListener("click", openSettings);
$("openSettingsFromNotice").addEventListener("click", openSettings);
$("closeSettings").addEventListener("click", () => ($("settingsModal").hidden = true));

function openSettings() {
  $("apiKeyInput").value = getApiKey();
  $("settingsModal").hidden = false;
}

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

// ---------- Claude API feedback ----------
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

  const systemPrompt =
    state.lang === "fr"
      ? `Tu es un coach de communication bienveillant mais honnête, qui aide des étudiant·e·s à s'améliorer à l'oral.
On te donne un sujet de pratique et la transcription de ce qu'une personne a dit. Réponds en français, de façon chaleureuse et concrète.
Structure ta réponse en Markdown avec exactement ces 3 sections :
### Points forts
(2 à 3 puces, concrètes, qui citent des éléments précis du texte)
### À améliorer
(2 à 3 puces, concrètes et actionnables — pas vagues)
### Exemple reformulé
(reformule UNE phrase ou un passage du texte pour montrer une version plus claire ou plus percutante)
Reste concis, encourageant, jamais condescendant.`
      : `You are a warm but honest communication coach helping students improve their spoken communication.
You'll get a practice topic and a transcript of what someone said. Reply in English, warmly and concretely.
Structure your reply in Markdown with exactly these 3 sections:
### Strengths
(2-3 concrete bullets referencing specific parts of the text)
### To improve
(2-3 concrete, actionable bullets — not vague)
### Rewritten example
(rewrite ONE sentence or passage from the text to show a clearer or more impactful version)
Keep it concise, encouraging, never condescending.`;

  const userMessage =
    state.lang === "fr"
      ? `Sujet de pratique : "${state.currentPrompt}"\n\nTranscription :\n"""\n${transcript}\n"""`
      : `Practice topic: "${state.currentPrompt}"\n\nTranscript:\n"""\n${transcript}\n"""`;

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
      throw new Error(errBody?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data?.content?.[0]?.text || "";
    renderAiFeedback(text);
    saveToHistory(text);
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

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Very small Markdown-ish renderer: handles ### headings, bullet lists, and line breaks.
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

// ---------- History ----------
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
    topic: state.currentPrompt,
    transcript: currentTranscriptText(),
    feedback: aiFeedbackText || "",
    durationSeconds: Math.round(state.lastDurationSeconds),
  });
  localStorage.setItem(STORAGE.history, JSON.stringify(history.slice(0, 50)));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  const list = $("historyList");
  if (!history.length) {
    list.innerHTML = `<p class="empty-state">${I18N[state.lang].noHistory}</p>`;
    return;
  }
  list.innerHTML = history
    .map((item, idx) => {
      const d = new Date(item.date);
      const dateStr = d.toLocaleDateString(state.lang === "fr" ? "fr-CA" : "en-CA", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      return `<div class="history-item">
        <div class="history-item-main">
          <p class="history-item-topic">${escapeHtml(item.topic)}</p>
          <p class="history-item-meta">${dateStr} · ${formatTime(item.durationSeconds)}${
        item.feedback ? " · 🤖" : ""
      }</p>
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

// ---------- New session ----------
$("newSessionBtn").addEventListener("click", () => {
  state.finalTranscript = "";
  state.interimTranscript = "";
  $("transcriptBox").textContent = "";
  $("transcriptCard").hidden = true;
  $("metricsCard").hidden = true;
  $("aiCard").hidden = true;
  $("aiResult").hidden = true;
  $("newSessionBtn").hidden = true;
  $("playback").hidden = true;
  $("timer").textContent = "00:00";
  loadNewPrompt();
});

// ---------- Init ----------
applyI18n(state.lang);
loadNewPrompt();
renderHistory();
refreshApiKeyUi();

if (!SpeechRecognitionAPI) {
  $("micHint").textContent =
    state.lang === "fr"
      ? "Astuce : pour la transcription automatique, utilise Chrome ou Edge. Sinon, tu pourras taper ton texte toi-même."
      : "Tip: for automatic transcription, use Chrome or Edge. Otherwise you can type your own text.";
}
