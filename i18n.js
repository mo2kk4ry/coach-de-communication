// Minimal i18n: FR (default) / EN. Add more languages by adding a key here.
const I18N = {
  fr: {
    tagline: "Pratique. Enregistre. Progresse.",

    // Accueil
    goalTitle: "Sur quoi veux-tu travailler ?",
    goalHint: "Ça sert juste à te rappeler pourquoi tu pratiques. Tu pourras le changer quand tu veux.",
    changeGoal: "Changer",
    goalPrefix: "Ton objectif :",
    noGoal: "Aucun objectif choisi pour l'instant.",
    statStreak: "jours d'affilée",
    statSessions: "pratiques",
    statMinutes: "min parlées",
    sessionTitle: "Durée de ta séance",
    sessionHint: "Choisis un temps et enchaîne les exercices jusqu'à ce que le chrono sonne — ou reste en mode libre.",
    freeMode: "Libre",
    minutesShort: "min",
    chooseExercise: "Choisis ton exercice",

    // Bandeau de séance
    endSession: "Terminer",
    sessionRunning: "Séance en cours",
    sessionLeft: "restant",

    // Pratique
    backHome: "← Tous les exercices",
    shuffle: "🎲 Un autre",
    ownTopic: "Écrire mon propre sujet",
    useThis: "Utiliser ce sujet",
    prepLabel: "Préparation — note tes idées, ne parle pas encore",
    skipPrep: "Je suis prêt·e →",
    nextQuestion: "Question suivante →",
    lastQuestion: "Dernière question",
    questionOf: "Question {n} sur {total}",
    tpSpeed: "Vitesse de défilement",
    recordTitle: "Enregistre-toi",
    startRecording: "Commencer",
    stopRecording: "Arrêter",
    micHint: "Le micro reste privé : rien n'est envoyé nulle part sans ton accord, sauf si tu demandes un retour IA.",
    playbackHint: "Réécoute-toi : c'est là qu'on entend ses vrais tics de langage.",
    transcriptTitle: "Ce que tu as dit",
    editHint: "Tu peux corriger le texte si la transcription automatique s'est trompée.",
    metricsTitle: "Aperçu rapide",
    mDurationLabel: "Durée",
    mWpmLabel: "Mots / minute",
    mWordsLabel: "Mots au total",
    mFillersLabel: "Mots de remplissage",
    accuracyLabel: "Précision de lecture",
    lessonBadge: "Mini-leçon",

    // Structuration
    chooseFramework: "Choisis ton moule :",
    nextStep: "Section suivante →",
    lastStep: "Dernière section",
    guideWaiting: "Le guide démarre dès que tu appuies sur « Commencer ».",
    planTitle: "📝 Mon plan (3 idées)",
    planHint: "Écris tes idées en mots-clés, pas en phrases. Elles restent affichées pendant que tu parles.",
    plan1Placeholder: "Idée 1 — ex. « données pas fiables »",
    plan2Placeholder: "Idée 2 — ex. « délai trop court »",
    plan3Placeholder: "Idée 3 — ex. « solution : prioriser »",
    structureLabel: "Structure de ton discours",
    structPlan: "Annoncer ton plan au début",
    structPlanTip: "Commence par « Je vois trois choses : X, Y et Z ». C'est ce qui t'oblige à t'y tenir.",
    structTransitions: "Marquer les transitions",
    structTransitionsTip: "Dis « premièrement », « ensuite », « enfin » à voix haute entre tes idées.",
    structExample: "Donner un exemple concret",
    structExampleTip: "Ajoute « par exemple… » après chaque idée. Sans exemple, une idée reste une opinion.",
    structConclusion: "Conclure clairement",
    structConclusionTip: "Termine par « en résumé… » et reprends tes idées en une phrase, pas par « voilà ».",
    structGreat: "Ton discours a un vrai squelette. C'est exactement ça.",
    structOk: "La base est là, il manque juste quelques panneaux de signalisation.",
    structWeak: "Tes idées sont là, mais rien ne les relie à l'oral. Vise le plan annoncé + les transitions en premier.",

    // Consignes par mode
    instrLibre: "Parle de ce sujet pendant 1 à 2 minutes.",
    instrStructure: "Prépare ton plan, puis laisse-toi guider section par section pendant que tu parles.",
    instrMot: "Prépare-toi, puis parle de ce mot pendant 1 à 2 minutes.",
    instrImpro: "Réponds vite. La question change toute seule au bout de 30 secondes.",
    instrDebat: "Tu dois défendre ce camp, que tu sois d'accord ou non.",
    instrInterview: "Réponds à chaque question, puis passe à la suivante quand tu es prêt·e.",
    instrArticulation: "Dis ce virelangue 3 fois : lentement, puis normalement, puis vite.",
    instrLecture: "Lis ce texte à voix haute en suivant le défilement.",
    debateFor: "POUR",
    debateAgainst: "CONTRE",
    debateSide: "Ton camp : {side}",
    wordDefinition: "Définition",

    // IA
    aiTitle: "Retour détaillé (IA)",
    noKeyNotice: "Ajoute ta clé API Claude dans les Réglages pour débloquer un retour détaillé et personnalisé.",
    openSettings: "Ouvrir les réglages",
    getFeedback: "✨ Obtenir mon retour",
    thinking: "Claude réfléchit à ton retour…",

    // Historique
    historyTitle: "Mes sessions précédentes",
    clearHistory: "Tout effacer",
    noHistory: "Pas encore de session. Ta première pratique apparaîtra ici.",
    newSession: "↻ Refaire un tour",

    // Récapitulatif
    recapTitle: "Séance terminée 🎉",
    recapDone: "Super, merci !",
    recapLine: "Tu as fait {n} exercice(s) en {min} minutes.",
    recapWords: "{words} mots prononcés, {fillers} mot(s) de remplissage.",
    recapStreak: "Série en cours : {n} jour(s) d'affilée.",
    recapEmpty: "Tu n'as pas encore enregistré d'exercice cette séance — reviens quand tu veux.",

    // Pied de page
    credit: "Fait par Sanaba, étudiante en analyse de données qui doit améliorer sa communication d'ici la fin de sa session. 💜",
    footerNote: "Projet open-source — libre d'être copié, modifié et amélioré par n'importe quel·le étudiant·e.",

    // Réglages
    settingsTitle: "Réglages",
    apiKeyLabel: "Clé API Claude (Anthropic)",
    apiKeyHint: "Ta clé reste uniquement dans ton navigateur (jamais envoyée ailleurs qu'à l'API d'Anthropic). Crée-en une sur",
    save: "Enregistrer",
    removeKey: "Retirer ma clé",
  },

  en: {
    tagline: "Practice. Record. Improve.",

    goalTitle: "What do you want to work on?",
    goalHint: "It's just there to remind you why you practice. You can change it any time.",
    changeGoal: "Change",
    goalPrefix: "Your goal:",
    noGoal: "No goal picked yet.",
    statStreak: "day streak",
    statSessions: "practices",
    statMinutes: "min spoken",
    sessionTitle: "How long is your session?",
    sessionHint: "Pick a length and chain exercises until the timer rings — or stay in free mode.",
    freeMode: "Free",
    minutesShort: "min",
    chooseExercise: "Pick your exercise",

    endSession: "End",
    sessionRunning: "Session running",
    sessionLeft: "left",

    backHome: "← All exercises",
    shuffle: "🎲 Another one",
    ownTopic: "Write my own topic",
    useThis: "Use this topic",
    prepLabel: "Prep time — jot down your ideas, don't speak yet",
    skipPrep: "I'm ready →",
    nextQuestion: "Next question →",
    lastQuestion: "Last question",
    questionOf: "Question {n} of {total}",
    tpSpeed: "Scrolling speed",
    recordTitle: "Record yourself",
    startRecording: "Start",
    stopRecording: "Stop",
    micHint: "Your mic stays private: nothing is sent anywhere without your consent, unless you ask for AI feedback.",
    playbackHint: "Play yourself back: that's where you actually hear your own verbal tics.",
    transcriptTitle: "What you said",
    editHint: "You can fix the text if the automatic transcription got something wrong.",
    metricsTitle: "Quick overview",
    mDurationLabel: "Duration",
    mWpmLabel: "Words / minute",
    mWordsLabel: "Total words",
    mFillersLabel: "Filler words",
    accuracyLabel: "Reading accuracy",
    lessonBadge: "Mini-lesson",

    chooseFramework: "Pick your template:",
    nextStep: "Next section →",
    lastStep: "Last section",
    guideWaiting: "The guide starts as soon as you hit “Start”.",
    planTitle: "📝 My plan (3 ideas)",
    planHint: "Write keywords, not sentences. They stay on screen while you speak.",
    plan1Placeholder: "Idea 1 — e.g. “data isn't reliable”",
    plan2Placeholder: "Idea 2 — e.g. “deadline too short”",
    plan3Placeholder: "Idea 3 — e.g. “fix: prioritize”",
    structureLabel: "Structure of your talk",
    structPlan: "Announce your plan up front",
    structPlanTip: "Open with “There are three things here: X, Y and Z.” That's what forces you to stick to it.",
    structTransitions: "Signpost your transitions",
    structTransitionsTip: "Say “first”, “then”, “finally” out loud between your ideas.",
    structExample: "Give a concrete example",
    structExampleTip: "Add “for example…” after each idea. Without an example, an idea stays an opinion.",
    structConclusion: "Close clearly",
    structConclusionTip: "End with “to sum up…” and restate your ideas in one sentence, not with “so… yeah”.",
    structGreat: "Your talk has a real skeleton. That's exactly it.",
    structOk: "The base is there, you're just missing a few signposts.",
    structWeak: "Your ideas are there, but nothing connects them out loud. Aim for the announced plan + transitions first.",

    instrLibre: "Speak about this topic for 1 to 2 minutes.",
    instrStructure: "Prepare your plan, then let the app walk you through section by section as you speak.",
    instrMot: "Prepare, then speak about this word for 1 to 2 minutes.",
    instrImpro: "Answer fast. The question changes on its own after 30 seconds.",
    instrDebat: "You have to defend this side, whether you agree with it or not.",
    instrInterview: "Answer each question, then move to the next one when you're ready.",
    instrArticulation: "Say this tongue twister 3 times: slowly, then normally, then fast.",
    instrLecture: "Read this text out loud, following the scroll.",
    debateFor: "FOR",
    debateAgainst: "AGAINST",
    debateSide: "Your side: {side}",
    wordDefinition: "Definition",

    aiTitle: "Detailed feedback (AI)",
    noKeyNotice: "Add your Claude API key in Settings to unlock detailed, personalized feedback.",
    openSettings: "Open settings",
    getFeedback: "✨ Get my feedback",
    thinking: "Claude is thinking about your feedback…",

    historyTitle: "My past sessions",
    clearHistory: "Clear all",
    noHistory: "No sessions yet. Your first practice will show up here.",
    newSession: "↻ Go again",

    recapTitle: "Session complete 🎉",
    recapDone: "Great, thanks!",
    recapLine: "You did {n} exercise(s) in {min} minutes.",
    recapWords: "{words} words spoken, {fillers} filler word(s).",
    recapStreak: "Current streak: {n} day(s) in a row.",
    recapEmpty: "You haven't recorded an exercise this session yet — come back any time.",

    credit: "Made by Sanaba, a data analytics student working on her communication before the end of her semester. 💜",
    footerNote: "Open-source project — free to copy, modify and improve for any student.",

    settingsTitle: "Settings",
    apiKeyLabel: "Claude API key (Anthropic)",
    apiKeyHint: "Your key stays only in your browser (never sent anywhere except Anthropic's API). Create one at",
    save: "Save",
    removeKey: "Remove my key",
  },
};

function t(key, lang, vars) {
  const dict = I18N[lang] || I18N.fr;
  let str = dict[key] !== undefined ? dict[key] : key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      str = str.split("{" + k + "}").join(vars[k]);
    });
  }
  return str;
}

function applyI18n(lang) {
  const dict = I18N[lang] || I18N.fr;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
}
