/* Coach de communication — banque d'exercices / exercise bank
 * Tout le contenu est bilingue (fr / en) et libre de droits : textes écrits
 * pour ce projet. Ajoute les tiens, c'est fait pour grandir.
 */

// ---------------------------------------------------------------------------
// Les 7 modes d'exercice
// ---------------------------------------------------------------------------
const EXERCISE_MODES = [
  {
    id: "libre",
    icon: "🎯",
    kind: "topic",
    fr: { name: "Sujet libre", desc: "Un sujet au hasard, tu parles. Le classique." },
    en: { name: "Free topic", desc: "A random topic, you speak. The classic one." },
  },
  {
    id: "structure",
    icon: "🧱",
    kind: "structure",
    prepSeconds: 90,
    fr: { name: "Structure guidée", desc: "L'app te guide en direct, section par section." },
    en: { name: "Guided structure", desc: "The app walks you through it, section by section." },
  },
  {
    id: "mot",
    icon: "🔤",
    kind: "word",
    prepSeconds: 60,
    fr: { name: "Mot au hasard", desc: "Un mot, 60 s de préparation, puis tu présentes." },
    en: { name: "Random word", desc: "One word, 60 s to prepare, then you present." },
  },
  {
    id: "impro",
    icon: "⚡",
    kind: "rapid",
    questionSeconds: 30,
    fr: { name: "Improvisation rapide", desc: "Des questions qui s'enchaînent toutes les 30 s." },
    en: { name: "Rapid fire", desc: "Questions coming at you every 30 seconds." },
  },
  {
    id: "debat",
    icon: "🥊",
    kind: "debate",
    prepSeconds: 90,
    fr: { name: "Débat", desc: "Une affirmation, un camp imposé. Défends-le." },
    en: { name: "Debate", desc: "A statement, a side you don't choose. Defend it." },
  },
  {
    id: "interview",
    icon: "🎧",
    kind: "interview",
    fr: { name: "Podcast / Entrevue", desc: "Une série de questions, tu avances à ton rythme." },
    en: { name: "Podcast / Interview", desc: "A set of questions, you move at your own pace." },
  },
  {
    id: "articulation",
    icon: "👄",
    kind: "read",
    fr: { name: "Articulation", desc: "Des virelangues à dire sans t'emmêler." },
    en: { name: "Articulation", desc: "Tongue twisters to say without tripping up." },
  },
  {
    id: "lecture",
    icon: "📜",
    kind: "read",
    teleprompter: true,
    fr: { name: "Lecture (téléprompteur)", desc: "Un texte qui défile, tu lis à voix haute." },
    en: { name: "Reading (teleprompter)", desc: "Scrolling text, you read it out loud." },
  },
];

function getMode(id) {
  return EXERCISE_MODES.find((m) => m.id === id) || EXERCISE_MODES[0];
}

// ---------------------------------------------------------------------------
// Mini-leçons : 3 règles simples par mode
// ---------------------------------------------------------------------------
const LESSONS = {
  libre: {
    fr: {
      title: "Structurer sa pensée",
      rules: [
        "Annonce 3 idées principales dès le départ : « Je vois trois choses… ». Ton auditoire sait où tu t'en vas.",
        "Une idée = un exemple concret. Sans exemple, une idée reste une opinion.",
        "Termine par une phrase de conclusion claire, pas par « voilà… ».",
      ],
    },
    en: {
      title: "Structuring your thinking",
      rules: [
        "Announce 3 main ideas up front: “There are three things here…”. Your listener knows where you're headed.",
        "One idea = one concrete example. Without an example, an idea stays an opinion.",
        "End on a clear closing sentence, not on “so… yeah”.",
      ],
    },
  },
  structure: {
    fr: {
      title: "Le squelette avant la chair",
      rules: [
        "Choisis ton moule AVANT de parler. Les gens structurés ne réinventent rien : ils réutilisent toujours les 3 ou 4 mêmes.",
        "Annonce ton plan à voix haute dès la première phrase. Ça guide l'auditoire — et surtout, ça t'oblige toi à t'y tenir.",
        "Marque chaque transition à voix haute : « premièrement », « ensuite », « en résumé ». Sans panneaux, même un bon plan sonne décousu.",
      ],
    },
    en: {
      title: "Skeleton before flesh",
      rules: [
        "Pick your template BEFORE speaking. Structured people don't reinvent anything: they reuse the same 3 or 4 every time.",
        "Announce your plan out loud in your first sentence. It guides the listener — and above all, it forces you to stick to it.",
        "Mark every transition out loud: “first”, “then”, “to sum up”. Without signposts, even a good plan sounds messy.",
      ],
    },
  },
  mot: {
    fr: {
      title: "Improviser avec de la matière",
      rules: [
        "Pendant la préparation, note 3 angles : une définition, un exemple vécu, un avis personnel.",
        "Commence par définir le mot avec tes propres mots — jamais par « euh, alors… ».",
        "Mieux vaut 60 secondes solides que 3 minutes qui tournent en rond.",
      ],
    },
    en: {
      title: "Improvising with substance",
      rules: [
        "While preparing, jot down 3 angles: a definition, a lived example, a personal take.",
        "Open by defining the word in your own words — never with “um, so…”.",
        "60 solid seconds beat 3 minutes going in circles.",
      ],
    },
  },
  impro: {
    fr: {
      title: "Répondre vite et bien",
      rules: [
        "Prends une seconde de silence avant de répondre. Le silence est plus pro que « euh ».",
        "Réponds à la question dès la première phrase, développe ensuite.",
        "Une réponse courte et nette vaut mieux qu'une longue réponse floue.",
      ],
    },
    en: {
      title: "Answering fast and well",
      rules: [
        "Take one second of silence before answering. Silence sounds more professional than “um”.",
        "Answer the question in your first sentence, then develop.",
        "A short, sharp answer beats a long, fuzzy one.",
      ],
    },
  },
  debat: {
    fr: {
      title: "Défendre une position",
      rules: [
        "Formule ta position en une phrase, puis donne 2 arguments maximum. Trois, on te perd.",
        "Reconnais le meilleur argument d'en face avant de le contrer : ça te rend crédible.",
        "Appuie chaque argument sur un fait, un chiffre ou un exemple, pas sur « tout le monde sait que ».",
      ],
    },
    en: {
      title: "Defending a position",
      rules: [
        "State your position in one sentence, then give 2 arguments max. Three and you lose people.",
        "Acknowledge the other side's best argument before countering it: it makes you credible.",
        "Back each argument with a fact, a number or an example, not with “everybody knows that”.",
      ],
    },
  },
  interview: {
    fr: {
      title: "Répondre en entrevue",
      rules: [
        "Méthode STAR : Situation, Tâche, Action, Résultat. Surtout, ne saute pas le résultat.",
        "Vise 60 à 90 secondes par réponse. Plus court paraît vide, plus long perd l'attention.",
        "Ramène toujours la réponse à ce que tu as fait, toi — pas à ce que « l'équipe » a fait.",
      ],
    },
    en: {
      title: "Answering in an interview",
      rules: [
        "STAR method: Situation, Task, Action, Result. Above all, don't skip the result.",
        "Aim for 60–90 seconds per answer. Shorter feels empty, longer loses attention.",
        "Always bring the answer back to what you did — not what “the team” did.",
      ],
    },
  },
  articulation: {
    fr: {
      title: "Articuler proprement",
      rules: [
        "Commence lentement et exagère chaque syllabe, puis accélère. La vitesse vient après la netteté.",
        "Ce sont les fins de mots qu'on avale en premier. Termine tes mots.",
        "Ouvre la bouche plus que tu ne le crois nécessaire : c'est ce qui porte la voix.",
      ],
    },
    en: {
      title: "Articulating cleanly",
      rules: [
        "Start slow and over-pronounce every syllable, then speed up. Speed comes after clarity.",
        "Word endings are what we swallow first. Finish your words.",
        "Open your mouth more than feels necessary: that's what carries the voice.",
      ],
    },
  },
  lecture: {
    fr: {
      title: "Lire à voix haute",
      rules: [
        "Lis par groupes de sens, pas mot à mot. Marque une vraie pause à chaque point.",
        "Baisse la voix en fin de phrase : monter à chaque fin de phrase donne un ton hésitant.",
        "Garde un rythme régulier autour de 130–150 mots/minute pour rester compréhensible.",
      ],
    },
    en: {
      title: "Reading out loud",
      rules: [
        "Read in meaning groups, not word by word. Take a real pause at every period.",
        "Drop your pitch at the end of sentences: rising every time sounds hesitant.",
        "Keep a steady pace around 130–150 words per minute to stay understandable.",
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// Mode « mot au hasard » — vocabulaire + définitions
// ---------------------------------------------------------------------------
const WORD_BANK = {
  fr: [
    { w: "Résilience", d: "Capacité à encaisser un choc et à repartir sans s'effondrer." },
    { w: "Ambition", d: "Désir fort d'atteindre quelque chose de plus grand que sa situation actuelle." },
    { w: "Intégrité", d: "Faire la même chose qu'on soit observé ou non." },
    { w: "Curiosité", d: "Besoin de comprendre comment et pourquoi les choses fonctionnent." },
    { w: "Rigueur", d: "Souci du détail et de la méthode, même quand personne ne vérifie." },
    { w: "Autonomie", d: "Capacité à avancer sans qu'on vous dise quoi faire à chaque étape." },
    { w: "Empathie", d: "Comprendre ce que l'autre ressent sans avoir à le vivre soi-même." },
    { w: "Persévérance", d: "Continuer quand le résultat n'arrive pas encore." },
    { w: "Innovation", d: "Résoudre un vieux problème d'une façon que personne n'avait essayée." },
    { w: "Leadership", d: "Amener un groupe quelque part sans avoir besoin de l'y forcer." },
    { w: "Transparence", d: "Dire ce qui se passe vraiment, y compris quand ça dérange." },
    { w: "Adaptabilité", d: "Changer de méthode quand le contexte change, sans paniquer." },
    { w: "Discipline", d: "Faire ce qu'il faut même les jours où l'envie n'y est pas." },
    { w: "Confiance", d: "Croire qu'une personne ou une chose tiendra ce qu'elle promet." },
    { w: "Créativité", d: "Relier deux idées que personne n'avait pensé à mettre ensemble." },
    { w: "Patience", d: "Accepter que certaines choses prennent le temps qu'elles prennent." },
    { w: "Humilité", d: "Savoir exactement ce qu'on ne sait pas encore." },
    { w: "Collaboration", d: "Produire à plusieurs un résultat que personne n'aurait sorti seul." },
    { w: "Échec", d: "Résultat qui n'était pas celui espéré, et qui contient une information utile." },
    { w: "Vulnérabilité", d: "Accepter de montrer ce qui n'est pas encore solide chez soi." },
    { w: "Réseautage", d: "Construire des relations professionnelles avant d'en avoir besoin." },
    { w: "Excellence", d: "Le niveau qu'on atteint en refusant de s'arrêter à « c'est correct »." },
    { w: "Responsabilité", d: "Assumer les conséquences de ce qu'on a décidé ou négligé." },
    { w: "Motivation", d: "L'énergie qui fait commencer ; la discipline est celle qui fait finir." },
  ],
  en: [
    { w: "Resilience", d: "The ability to take a hit and get moving again without falling apart." },
    { w: "Ambition", d: "A strong drive toward something bigger than your current situation." },
    { w: "Integrity", d: "Doing the same thing whether or not anyone is watching." },
    { w: "Curiosity", d: "The need to understand how and why things work." },
    { w: "Rigour", d: "Care for detail and method, even when nobody checks." },
    { w: "Autonomy", d: "Being able to move forward without being told each next step." },
    { w: "Empathy", d: "Understanding what someone feels without having lived it yourself." },
    { w: "Perseverance", d: "Continuing while the result still hasn't shown up." },
    { w: "Innovation", d: "Solving an old problem in a way nobody had tried." },
    { w: "Leadership", d: "Taking a group somewhere without having to force it there." },
    { w: "Transparency", d: "Saying what is actually happening, including when it's inconvenient." },
    { w: "Adaptability", d: "Changing method when the context changes, without panicking." },
    { w: "Discipline", d: "Doing what's needed even on the days you don't feel like it." },
    { w: "Trust", d: "Believing a person or a thing will do what it promised." },
    { w: "Creativity", d: "Connecting two ideas nobody thought to put together." },
    { w: "Patience", d: "Accepting that some things take the time they take." },
    { w: "Humility", d: "Knowing precisely what you don't know yet." },
    { w: "Collaboration", d: "Producing together a result nobody would have reached alone." },
    { w: "Failure", d: "A result that wasn't the one you hoped for, carrying useful information." },
    { w: "Vulnerability", d: "Being willing to show the parts of yourself that aren't solid yet." },
    { w: "Networking", d: "Building professional relationships before you need them." },
    { w: "Excellence", d: "The level you reach by refusing to stop at “good enough”." },
    { w: "Accountability", d: "Owning the consequences of what you decided or overlooked." },
    { w: "Motivation", d: "The energy that makes you start; discipline is what makes you finish." },
  ],
};

// ---------------------------------------------------------------------------
// Mode « improvisation rapide » — questions courtes
// ---------------------------------------------------------------------------
const IMPRO_QUESTIONS = {
  fr: [
    "Quelle est la meilleure décision que tu aies prise cette année ?",
    "Explique ton domaine d'études à un enfant de 8 ans.",
    "Préfères-tu travailler seul ou en équipe, et pourquoi ?",
    "Quel conseil donnerais-tu à quelqu'un qui commence là où tu as commencé ?",
    "Décris ta journée idéale, du réveil au coucher.",
    "Qu'est-ce qui te fait perdre patience, et comment tu gères ça ?",
    "Vends-moi l'objet le plus proche de toi en ce moment.",
    "Quelle compétence aimerais-tu maîtriser d'ici un an ?",
    "Raconte une fois où tu as changé d'avis sur quelque chose d'important.",
    "Quel est le pire conseil que tu aies reçu ?",
    "Si tu avais 5 minutes devant toute ton école, tu dirais quoi ?",
    "Qu'est-ce que les gens comprennent mal à propos de ton domaine ?",
    "Décris quelqu'un que tu admires sans dire son nom.",
    "Quelle habitude a le plus changé ta vie ?",
    "Explique pourquoi ton projet préféré mérite d'être financé.",
    "Qu'est-ce que tu ferais avec une semaine complètement libre ?",
    "Raconte un moment où tu as dû dire non.",
    "Qu'est-ce qui te rend difficile à remplacer dans une équipe ?",
    "Défends une opinion impopulaire que tu assumes.",
    "Comment expliquerais-tu ce qu'est un bon leader ?",
    "Quel est ton plus grand défaut professionnel, honnêtement ?",
    "Raconte la dernière chose que tu as apprise et qui t'a surpris.",
    "Qu'est-ce que tu veux qu'on retienne de toi après un entretien ?",
    "Convaincs-moi d'aller vivre dans ta ville.",
    "Qu'est-ce qui t'empêche d'avancer en ce moment ?",
    "Décris ton travail de rêve sans nommer de titre de poste.",
    "Quelle est la question qu'on devrait te poser plus souvent ?",
    "Explique un échec et ce que tu en as tiré de concret.",
    "Qu'est-ce qui vaut la peine d'être appris lentement ?",
    "Comment reconnais-tu que tu as bien communiqué ?",
  ],
  en: [
    "What's the best decision you made this year?",
    "Explain your field of study to an 8-year-old.",
    "Do you prefer working alone or in a team, and why?",
    "What advice would you give someone starting where you started?",
    "Describe your ideal day, from waking up to going to bed.",
    "What makes you lose patience, and how do you handle it?",
    "Sell me the object closest to you right now.",
    "What skill would you like to master within a year?",
    "Tell me about a time you changed your mind on something important.",
    "What's the worst advice you've ever been given?",
    "If you had 5 minutes in front of your whole school, what would you say?",
    "What do people misunderstand about your field?",
    "Describe someone you admire without naming them.",
    "Which habit changed your life the most?",
    "Explain why your favourite project deserves funding.",
    "What would you do with a completely free week?",
    "Tell me about a time you had to say no.",
    "What makes you hard to replace on a team?",
    "Defend an unpopular opinion you actually hold.",
    "How would you explain what makes a good leader?",
    "What's your biggest professional weakness, honestly?",
    "Tell me the last thing you learned that surprised you.",
    "What do you want people to remember about you after an interview?",
    "Convince me to move to your city.",
    "What's holding you back right now?",
    "Describe your dream job without naming a job title.",
    "What's the question people should ask you more often?",
    "Explain a failure and what concrete thing you took from it.",
    "What's worth learning slowly?",
    "How do you know when you've communicated well?",
  ],
};

// ---------------------------------------------------------------------------
// Mode « débat » — affirmations, camp tiré au sort
// ---------------------------------------------------------------------------
const DEBATE_TOPICS = {
  fr: [
    "Les cours devraient tous être disponibles en ligne, en plus du présentiel.",
    "L'intelligence artificielle rend les étudiants moins compétents.",
    "Les réseaux sociaux font plus de mal que de bien aux jeunes adultes.",
    "Le télétravail devrait être un droit et non une faveur.",
    "Les notes devraient être remplacées par des évaluations sans chiffres.",
    "Un diplôme universitaire vaut encore l'investissement aujourd'hui.",
    "Les employeurs devraient interdire les courriels après 18 h.",
    "Le bénévolat devrait être obligatoire pour obtenir un diplôme.",
    "Les stages non rémunérés devraient être interdits.",
    "Apprendre une deuxième langue devrait être obligatoire jusqu'à la fin du secondaire.",
    "Les téléphones devraient être interdits en classe, sans exception.",
    "Les entreprises devraient publier les salaires dans toutes leurs offres d'emploi.",
    "La semaine de quatre jours devrait devenir la norme.",
    "Les examens à livre ouvert évaluent mieux les vraies compétences.",
    "Les villes devraient rendre le transport en commun gratuit.",
  ],
  en: [
    "Every course should be available online, in addition to in person.",
    "Artificial intelligence makes students less capable.",
    "Social media does more harm than good to young adults.",
    "Remote work should be a right, not a favour.",
    "Grades should be replaced by assessments without numbers.",
    "A university degree is still worth the investment today.",
    "Employers should ban emails after 6 p.m.",
    "Volunteering should be mandatory to graduate.",
    "Unpaid internships should be illegal.",
    "Learning a second language should be mandatory through high school.",
    "Phones should be banned in class, no exceptions.",
    "Companies should publish salaries in every job posting.",
    "The four-day week should become the norm.",
    "Open-book exams measure real skill better.",
    "Cities should make public transit free.",
  ],
};

// ---------------------------------------------------------------------------
// Mode « podcast / entrevue » — séries de questions
// ---------------------------------------------------------------------------
const INTERVIEW_SETS = {
  fr: [
    {
      topic: "Entrevue d'embauche — les classiques",
      questions: [
        "Parlez-moi de vous.",
        "Pourquoi ce poste, et pourquoi chez nous ?",
        "Décrivez une situation difficile que vous avez gérée au travail ou en stage.",
        "Quelle est votre plus grande faiblesse, et que faites-vous avec ?",
        "Où vous voyez-vous dans trois ans ?",
        "Avez-vous des questions pour nous ?",
      ],
    },
    {
      topic: "Entrevue technique — analyse de données",
      questions: [
        "Expliquez un projet de données dont vous êtes fier·ère, du début à la fin.",
        "Comment expliqueriez-vous un résultat statistique à une direction non technique ?",
        "Racontez une fois où vos données contredisaient ce que l'équipe croyait.",
        "Comment vérifiez-vous la qualité d'un jeu de données avant de l'analyser ?",
        "Quel outil maîtrisez-vous le mieux, et pourquoi celui-là ?",
      ],
    },
    {
      topic: "Podcast — parcours personnel",
      questions: [
        "Raconte-nous d'où tu viens et comment tu as atterri dans ton domaine.",
        "Quel a été le moment charnière de ton parcours ?",
        "Qu'est-ce que personne ne t'avait dit et que tu as dû apprendre seul·e ?",
        "Si tu pouvais refaire une décision, laquelle et pourquoi ?",
        "Qu'est-ce que tu construis en ce moment ?",
        "Quel conseil laisses-tu à ceux qui nous écoutent ?",
      ],
    },
    {
      topic: "Entrevue média — présenter un projet",
      questions: [
        "En une phrase, c'est quoi votre projet ?",
        "À qui ça s'adresse concrètement ?",
        "Qu'est-ce qui existe déjà, et en quoi vous êtes différents ?",
        "Quel a été l'obstacle le plus sérieux jusqu'ici ?",
        "C'est quoi la prochaine étape pour vous ?",
      ],
    },
    {
      topic: "Entrevue de stage — étudiant·e",
      questions: [
        "Qu'est-ce que vous espérez apprendre pendant ce stage ?",
        "Comment gérez-vous plusieurs échéances en même temps ?",
        "Donnez un exemple de travail d'équipe qui s'est mal passé.",
        "Qu'est-ce qui vous motive à vous lever le matin ?",
        "Comment réagissez-vous à une critique sur votre travail ?",
      ],
    },
  ],
  en: [
    {
      topic: "Job interview — the classics",
      questions: [
        "Tell me about yourself.",
        "Why this role, and why with us?",
        "Describe a difficult situation you handled at work or on placement.",
        "What's your biggest weakness, and what do you do about it?",
        "Where do you see yourself in three years?",
        "Do you have any questions for us?",
      ],
    },
    {
      topic: "Technical interview — data analysis",
      questions: [
        "Walk me through a data project you're proud of, start to finish.",
        "How would you explain a statistical result to non-technical leadership?",
        "Tell me about a time your data contradicted what the team believed.",
        "How do you check the quality of a dataset before analyzing it?",
        "Which tool do you know best, and why that one?",
      ],
    },
    {
      topic: "Podcast — personal journey",
      questions: [
        "Tell us where you're from and how you landed in your field.",
        "What was the turning point in your path?",
        "What did nobody tell you that you had to learn on your own?",
        "If you could redo one decision, which one and why?",
        "What are you building right now?",
        "What advice do you leave for the people listening?",
      ],
    },
    {
      topic: "Media interview — pitching a project",
      questions: [
        "In one sentence, what is your project?",
        "Who is it concretely for?",
        "What already exists, and how are you different?",
        "What's been the most serious obstacle so far?",
        "What's the next step for you?",
      ],
    },
    {
      topic: "Internship interview — student",
      questions: [
        "What do you hope to learn during this internship?",
        "How do you handle several deadlines at the same time?",
        "Give an example of teamwork that went badly.",
        "What gets you up in the morning?",
        "How do you react to criticism of your work?",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Mode « articulation » — virelangues
// ---------------------------------------------------------------------------
const TONGUE_TWISTERS = {
  fr: [
    "Les chaussettes de l'archiduchesse sont-elles sèches, archi-sèches ?",
    "Un chasseur sachant chasser sait chasser sans son chien.",
    "Ces six saucissons-secs sont si secs qu'on ne sait si c'en sont.",
    "Didon dîna, dit-on, du dos d'un dodu dindon.",
    "Trois tortues trottaient sur un trottoir très étroit.",
    "Je veux et j'exige d'exquises excuses.",
    "Si six scies scient six cyprès, six cent six scies scient six cent six cyprès.",
    "La grosse cloche sonne, la grosse cloche sonne, la grosse cloche sonne.",
    "Piano panier, piano panier, piano panier, piano panier.",
    "Ton thé t'a-t-il ôté ta toux tenace ?",
    "Suis-je bien chez ce cher Serge ?",
    "Natacha n'attacha pas son chat Pacha qui s'échappa.",
    "Que c'est cruel de croire que ce croissant croustillant craque.",
    "Une bien grande grange blanche brûle brusquement.",
    "Fruits frais, fruits frits, fruits cuits, fruits crus.",
  ],
  en: [
    "She sells seashells by the seashore, and the shells she sells are surely seashells.",
    "Peter Piper picked a peck of pickled peppers.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "Red leather, yellow leather, red leather, yellow leather.",
    "The sixth sick sheikh's sixth sheep's sick.",
    "Unique New York, unique New York, you know you need unique New York.",
    "A proper copper coffee pot, a proper copper coffee pot.",
    "Three thin thinkers thinking thick thoughtful thoughts.",
    "Truly rural, truly rural, truly rural, truly rural.",
    "Which wristwatches are Swiss wristwatches?",
    "Betty bought a bit of butter, but the butter Betty bought was bitter.",
    "Good blood, bad blood, good blood, bad blood.",
    "The crisp crust crackles and crumbles completely.",
    "Eleven benevolent elephants elegantly entered the elevator.",
    "Freshly fried flying fish, freshly fried flesh.",
  ],
};

// ---------------------------------------------------------------------------
// Mode « lecture » — textes originaux écrits pour ce projet
// ---------------------------------------------------------------------------
const READING_TEXTS = {
  fr: [
    {
      title: "Le silence est un outil",
      text:
        "La plupart des gens croient que bien parler, c'est parler sans jamais s'arrêter. " +
        "C'est exactement l'inverse. Une pause bien placée donne à ton auditoire le temps de comprendre " +
        "ce que tu viens de dire, et elle te donne le temps de choisir ta prochaine phrase. " +
        "Quand tu remplis chaque silence avec un euh, tu voles ce temps aux deux. " +
        "La prochaine fois que tu sens venir un mot parasite, ferme simplement la bouche pendant une seconde. " +
        "Personne ne remarquera le silence. Tout le monde aurait remarqué le euh.",
    },
    {
      title: "Trois idées, pas dix",
      text:
        "Quand on connaît bien un sujet, la tentation est de tout dire. C'est l'erreur la plus commune. " +
        "Ton auditoire ne retiendra jamais dix idées, peu importe leur qualité. Il en retiendra trois, " +
        "et encore, seulement si tu les annonces clairement au début. Choisis donc tes trois idées avant de commencer, " +
        "écris-les sur une feuille, et accepte de laisser tomber le reste. " +
        "Ce que tu enlèves rend plus fort ce que tu gardes.",
    },
    {
      title: "Parler à une personne",
      text:
        "Devant un groupe, on a tendance à parler au groupe. Essaie plutôt de parler à une seule personne à la fois. " +
        "Regarde quelqu'un, termine ta phrase avec elle, puis passe à quelqu'un d'autre pour la phrase suivante. " +
        "Ton ton devient naturellement plus chaleureux, ton débit ralentit, et chaque personne dans la salle " +
        "a l'impression que tu t'adresses à elle. C'est un truc simple, et il change complètement " +
        "la façon dont une présentation est reçue.",
    },
    {
      title: "L'erreur n'est pas la fin",
      text:
        "Tu vas te tromper en parlant. Tu vas perdre le fil, inverser deux mots, oublier un chiffre. " +
        "Ce qui distingue une bonne oratrice d'une mauvaise, ce n'est pas l'absence d'erreurs : " +
        "c'est ce qu'elle fait dans les trois secondes qui suivent. Corrige calmement, sans t'excuser trois fois, " +
        "et continue. Le public oublie une erreur corrigée en deux secondes. " +
        "Il n'oublie pas quelqu'un qui s'effondre pendant une minute à cause d'un mot.",
    },
    {
      title: "Ce que ta voix raconte",
      text:
        "Avant même de comprendre tes mots, on entend ton rythme, ton volume et ta respiration. " +
        "Une voix qui monte à la fin de chaque phrase donne l'impression que tu demandes la permission. " +
        "Une voix qui reste sur la même note donne l'impression que le sujet t'ennuie. " +
        "Descends légèrement à la fin de tes phrases importantes, et laisse ta respiration se faire entendre. " +
        "Ce n'est pas un détail technique : c'est ce qui décide si on te croit.",
    },
  ],
  en: [
    {
      title: "Silence is a tool",
      text:
        "Most people believe that speaking well means never stopping. It is exactly the opposite. " +
        "A well-placed pause gives your listener time to understand what you just said, " +
        "and gives you time to choose your next sentence. " +
        "When you fill every silence with an um, you steal that time from both of you. " +
        "Next time you feel a filler word coming, simply close your mouth for one second. " +
        "Nobody will notice the silence. Everybody would have noticed the um.",
    },
    {
      title: "Three ideas, not ten",
      text:
        "When you know a subject well, the temptation is to say all of it. That is the most common mistake. " +
        "Your audience will never keep ten ideas, no matter how good they are. They will keep three, " +
        "and only if you announce them clearly at the start. So choose your three ideas before you begin, " +
        "write them on a sheet of paper, and accept dropping the rest. " +
        "What you cut is what makes the rest stronger.",
    },
    {
      title: "Speak to one person",
      text:
        "In front of a group, we tend to speak to the group. Try instead to speak to one single person at a time. " +
        "Look at someone, finish your sentence with them, then move to someone else for the next one. " +
        "Your tone becomes warmer on its own, your pace slows down, and every person in the room " +
        "feels like you are talking to them. It is a simple trick, and it completely changes " +
        "how a presentation lands.",
    },
    {
      title: "A mistake is not the end",
      text:
        "You are going to make mistakes while speaking. You will lose your thread, swap two words, forget a number. " +
        "What separates a good speaker from a bad one is not the absence of mistakes: " +
        "it is what they do in the three seconds that follow. Correct calmly, without apologizing three times, " +
        "and keep going. An audience forgets a corrected mistake in two seconds. " +
        "It does not forget someone who falls apart for a full minute over one word.",
    },
    {
      title: "What your voice says",
      text:
        "Before understanding your words, people hear your rhythm, your volume and your breathing. " +
        "A voice that rises at the end of every sentence sounds like it is asking permission. " +
        "A voice that stays on one note sounds bored by its own subject. " +
        "Drop slightly at the end of your important sentences, and let your breathing be heard. " +
        "This is not a technical detail: it is what decides whether people believe you.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Objectifs proposés au premier lancement
// ---------------------------------------------------------------------------
const GOALS = [
  { id: "entretien", icon: "💼", fr: "Réussir mes entrevues d'embauche", en: "Nail my job interviews" },
  { id: "presentation", icon: "🎤", fr: "Présenter devant un groupe sans stresser", en: "Present to a group without freezing" },
  { id: "fillers", icon: "🔇", fr: "Arrêter de dire « euh » tout le temps", en: "Stop saying “um” all the time" },
  { id: "clarte", icon: "🧠", fr: "Structurer mes idées plus clairement", en: "Structure my ideas more clearly" },
  { id: "confiance", icon: "🔥", fr: "Gagner en confiance à l'oral", en: "Build confidence when speaking" },
  { id: "articulation", icon: "👄", fr: "Mieux articuler et parler moins vite", en: "Articulate better and slow down" },
];

// Modes d'exercice recommandés selon l'objectif choisi (mise en avant, pas de filtrage :
// tous les exercices restent accessibles).
const GOAL_RECOMMENDED_MODES = {
  entretien: ["interview", "structure"],
  presentation: ["structure", "libre"],
  fillers: ["libre", "impro"],
  clarte: ["structure", "debat"],
  confiance: ["impro", "debat"],
  articulation: ["articulation", "lecture"],
};

// ---------------------------------------------------------------------------
// Interlocuteurs proposés : à qui s'adresse la personne pendant l'exercice.
// Le champ "framing" est une phrase ajoutée à la consigne pour adapter le ton
// et le vocabulaire attendus, sans réécrire tout le banc de sujets/questions.
// ---------------------------------------------------------------------------
const AUDIENCES = [
  {
    id: "public",
    icon: "🌍",
    fr: "Grand public",
    en: "General audience",
    framing: {
      fr: "Adresse-toi à un public général : reste clair·e, évite le jargon.",
      en: "Speak to a general audience: stay clear, avoid jargon.",
    },
  },
  {
    id: "collegues",
    icon: "🧑‍💼",
    fr: "Collègues",
    en: "Coworkers",
    framing: {
      fr: "Adresse-toi à des collègues : ton professionnel mais détendu, le jargon du métier est correct.",
      en: "Speak to coworkers: professional but relaxed tone, industry jargon is fine.",
    },
  },
  {
    id: "patron",
    icon: "🧑‍💻",
    fr: "Patron·ne / recruteur·se",
    en: "Boss / recruiter",
    framing: {
      fr: "Adresse-toi à un·e patron·ne ou recruteur·se : reste concis·e et professionnel·le, va droit au but.",
      en: "Speak to a boss or recruiter: stay concise and professional, get to the point.",
    },
  },
  {
    id: "client",
    icon: "🤝",
    fr: "Client·e",
    en: "Client",
    framing: {
      fr: "Adresse-toi à un·e client·e : ton chaleureux et rassurant, explique sans survendre.",
      en: "Speak to a client: warm, reassuring tone, explain without overselling.",
    },
  },
  {
    id: "famille",
    icon: "❤️",
    fr: "Ami·e ou famille",
    en: "Friend or family",
    framing: {
      fr: "Adresse-toi à un·e proche : ton naturel et informel, comme une vraie conversation.",
      en: "Speak to someone close to you: natural, informal tone, like a real conversation.",
    },
  },
  {
    id: "classe",
    icon: "🎓",
    fr: "Camarades de classe",
    en: "Classmates",
    framing: {
      fr: "Adresse-toi à des camarades de classe : ton simple et dynamique, comme un exposé entre pairs.",
      en: "Speak to classmates: simple, energetic tone, like a peer presentation.",
    },
  },
];

// ---------------------------------------------------------------------------
// Les moules de structure (mode « Structure guidée »)
// Chaque étape a une durée : l'app avance toute seule pendant l'enregistrement.
// ---------------------------------------------------------------------------
const FRAMEWORKS = [
  {
    id: "trois",
    fr: {
      name: "3 idées",
      tagline: "Le passe-partout",
      steps: [
        { label: "Annonce ton plan", hint: "« Je vois trois choses : X, Y et Z. » Dis-les, sans les développer.", seconds: 15 },
        { label: "Idée 1 + exemple", hint: "« Premièrement… » Développe, puis donne UN exemple concret.", seconds: 35 },
        { label: "Idée 2 + exemple", hint: "« Ensuite… » Deuxième idée, puis un exemple.", seconds: 35 },
        { label: "Idée 3 + exemple", hint: "« Enfin… » Troisième idée, puis un exemple.", seconds: 35 },
        { label: "Conclusion", hint: "« En résumé… » Reprends tes trois idées en une seule phrase.", seconds: 20 },
      ],
    },
    en: {
      name: "3 ideas",
      tagline: "The all-purpose one",
      steps: [
        { label: "Announce your plan", hint: "“There are three things here: X, Y and Z.” Name them, don't develop yet.", seconds: 15 },
        { label: "Idea 1 + example", hint: "“First…” Develop it, then give ONE concrete example.", seconds: 35 },
        { label: "Idea 2 + example", hint: "“Then…” Second idea, then an example.", seconds: 35 },
        { label: "Idea 3 + example", hint: "“Finally…” Third idea, then an example.", seconds: 35 },
        { label: "Conclusion", hint: "“To sum up…” Restate your three ideas in a single sentence.", seconds: 20 },
      ],
    },
  },
  {
    id: "prep",
    fr: {
      name: "PREP",
      tagline: "Pour donner un avis",
      steps: [
        { label: "Point — ta position", hint: "Ta réponse en UNE phrase, dès le départ. Pas de mise en contexte.", seconds: 15 },
        { label: "Raison", hint: "« Parce que… » Une seule raison, la plus forte.", seconds: 30 },
        { label: "Exemple", hint: "« Par exemple, dans mon cas… » Un fait, un chiffre ou une histoire vécue.", seconds: 40 },
        { label: "Point — on reboucle", hint: "« C'est pour ça que… » Répète ta position, reformulée.", seconds: 15 },
      ],
    },
    en: {
      name: "PREP",
      tagline: "For giving an opinion",
      steps: [
        { label: "Point — your position", hint: "Your answer in ONE sentence, right away. No warm-up.", seconds: 15 },
        { label: "Reason", hint: "“Because…” One single reason, your strongest one.", seconds: 30 },
        { label: "Example", hint: "“For example, in my case…” A fact, a number or a lived story.", seconds: 40 },
        { label: "Point — loop back", hint: "“That's why…” Restate your position, reworded.", seconds: 15 },
      ],
    },
  },
  {
    id: "star",
    fr: {
      name: "STAR",
      tagline: "Pour les entrevues",
      steps: [
        { label: "Situation", hint: "Où, quand, avec qui. Court : deux phrases suffisent.", seconds: 25 },
        { label: "Tâche", hint: "C'était quoi TON rôle, ta responsabilité précise ?", seconds: 20 },
        { label: "Action", hint: "Ce que TU as fait, étape par étape. Dis « j'ai », pas « on a ».", seconds: 45 },
        { label: "Résultat", hint: "L'impact, si possible chiffré. Ne saute JAMAIS cette partie.", seconds: 25 },
      ],
    },
    en: {
      name: "STAR",
      tagline: "For interviews",
      steps: [
        { label: "Situation", hint: "Where, when, with whom. Keep it short: two sentences.", seconds: 25 },
        { label: "Task", hint: "What was YOUR role, your specific responsibility?", seconds: 20 },
        { label: "Action", hint: "What YOU did, step by step. Say “I did”, not “we did”.", seconds: 45 },
        { label: "Result", hint: "The impact, with numbers if you can. NEVER skip this part.", seconds: 25 },
      ],
    },
  },
  {
    id: "probleme",
    fr: {
      name: "Problème → Solution",
      tagline: "Pour convaincre / pitcher",
      steps: [
        { label: "Le contexte", hint: "Plante le décor en deux phrases. À qui ça s'adresse ?", seconds: 20 },
        { label: "Le problème", hint: "Ce qui ne marche pas aujourd'hui, et pourquoi c'est un vrai problème.", seconds: 30 },
        { label: "Ta solution", hint: "Ce que tu proposes, concrètement. Une idée claire, pas trois.", seconds: 35 },
        { label: "Le bénéfice + l'appel", hint: "Ce que ça change, puis ce que tu demandes à ton auditoire de faire.", seconds: 25 },
      ],
    },
    en: {
      name: "Problem → Solution",
      tagline: "For convincing / pitching",
      steps: [
        { label: "Context", hint: "Set the scene in two sentences. Who is this for?", seconds: 20 },
        { label: "The problem", hint: "What isn't working today, and why it's a real problem.", seconds: 30 },
        { label: "Your solution", hint: "What you propose, concretely. One clear idea, not three.", seconds: 35 },
        { label: "Benefit + ask", hint: "What it changes, then what you want your audience to do.", seconds: 25 },
      ],
    },
  },
];

function getFramework(id) {
  return FRAMEWORKS.find((f) => f.id === id) || FRAMEWORKS[0];
}

// ---------------------------------------------------------------------------
// Marqueurs de structure repérés dans la transcription (note de structure)
// ---------------------------------------------------------------------------
const SIGNPOSTS = {
  fr: {
    plan: [
      "trois choses", "trois points", "trois idées", "trois raisons", "trois éléments",
      "deux choses", "deux points", "deux raisons", "quatre points",
      "je vois trois", "il y a trois", "je vais vous parler", "je vais te parler",
      "je vais aborder", "mon plan", "je vais parler de", "on va voir",
    ],
    transition: [
      "premièrement", "deuxièmement", "troisièmement", "d'abord", "tout d'abord",
      "ensuite", "puis", "par la suite", "enfin", "pour finir", "deuxième point",
      "troisième point", "premier point", "dernier point", "deuxième chose",
    ],
    example: [
      "par exemple", "concrètement", "notamment", "comme quand", "dans mon cas",
      "typiquement", "je pense à", "une fois", "j'ai vécu", "prenons",
    ],
    conclusion: [
      "en conclusion", "pour conclure", "en résumé", "pour résumer", "ce que je retiens",
      "voilà pourquoi", "c'est pour ça que", "au final", "pour terminer", "donc en gros",
    ],
  },
  en: {
    plan: [
      "three things", "three points", "three ideas", "three reasons",
      "two things", "two points", "two reasons", "four points",
      "i see three", "there are three", "i'm going to talk about",
      "i will talk about", "my plan", "we'll look at", "i want to cover",
    ],
    transition: [
      "first", "firstly", "second", "secondly", "third", "thirdly",
      "then", "next", "after that", "finally", "lastly", "to begin with",
      "my second point", "my third point", "the last point",
    ],
    example: [
      "for example", "for instance", "concretely", "in my case", "specifically",
      "let's say", "one time", "i remember", "take", "such as",
    ],
    conclusion: [
      "in conclusion", "to conclude", "to sum up", "in summary", "to wrap up",
      "what i take away", "that's why", "in the end", "so overall", "bottom line",
    ],
  },
};

// ---------------------------------------------------------------------------
// Ouverture et clôture attendues selon le moule choisi (mode « Structure guidée »).
// Les transitions et les exemples (SIGNPOSTS.transition / .example) restent
// communs à tous les moules : seule la façon d'ouvrir et de conclure change,
// pour ne plus exiger un « plan annoncé en trois parties » quand ce n'est pas
// le moule utilisé.
// ---------------------------------------------------------------------------
const FRAMEWORK_SIGNPOSTS = {
  prep: {
    fr: {
      opening: [
        "à mon avis", "selon moi", "je pense que", "ma position est", "je crois que",
        "pour moi", "ma réponse est", "je dirais que",
      ],
      closing: [
        "c'est pour ça que", "voilà pourquoi", "je le répète", "ma position reste",
        "donc pour répondre", "en résumé", "au final ma réponse",
      ],
    },
    en: {
      opening: [
        "in my opinion", "i believe", "i think that", "my position is", "for me",
        "my answer is", "i would say",
      ],
      closing: [
        "that's why", "so to answer", "i'll repeat", "my position stands",
        "in short", "so my answer",
      ],
    },
  },
  star: {
    fr: {
      opening: [
        "la situation", "ça s'est passé", "c'était au", "à l'époque", "quand j'étais",
        "il y a", "je travaillais", "dans le cadre de", "c'était pendant",
      ],
      closing: [
        "résultat", "au final", "grâce à ça", "j'ai réussi", "ça a permis",
        "le résultat", "au bout du compte", "ce que ça a changé",
      ],
    },
    en: {
      opening: [
        "the situation", "it happened", "at the time", "back when", "i was working",
        "while i was", "this was during",
      ],
      closing: [
        "as a result", "in the end", "thanks to that", "i managed to",
        "this led to", "the outcome",
      ],
    },
  },
  probleme: {
    fr: {
      opening: [
        "le contexte", "aujourd'hui", "actuellement", "dans notre cas",
        "pour situer", "en ce moment",
      ],
      closing: [
        "ça permettrait", "grâce à ça", "je vous invite à", "je vous demande de",
        "j'aimerais que vous", "passons à l'action", "concrètement, je propose que",
      ],
    },
    en: {
      opening: [
        "the context", "today", "currently", "in our case", "to set the scene",
        "right now",
      ],
      closing: [
        "this would allow", "thanks to this", "i invite you to", "i'm asking you to",
        "let's take action", "so i'd like you to",
      ],
    },
  },
};

// Libellés (clés i18n) affichés pour l'ouverture et la clôture selon le moule.
// Le moule "trois" (et l'absence de moule, en mode libre) utilise les libellés
// génériques structPlan / structConclusion, déjà définis dans i18n.js.
const FRAMEWORK_STRUCT_LABELS = {
  prep: {
    openKey: "structPoint", openTip: "structPointTip",
    closeKey: "structPointBack", closeTip: "structPointBackTip",
  },
  star: {
    openKey: "structSituation", openTip: "structSituationTip",
    closeKey: "structResult", closeTip: "structResultTip",
  },
  probleme: {
    openKey: "structContext", openTip: "structContextTip",
    closeKey: "structBenefit", closeTip: "structBenefitTip",
  },
};

// ---------------------------------------------------------------------------
// Helpers de tirage
// ---------------------------------------------------------------------------
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickDifferent(list, previous) {
  if (list.length <= 1) return list[0];
  let item = pickRandom(list);
  let guard = 0;
  while (item === previous && guard < 12) {
    item = pickRandom(list);
    guard++;
  }
  return item;
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
