# 🎙️ Coach de communication

**[Ouvrir l'app](https://mo2kk4ry.github.io/coach-de-communication/)** · *[English version below](#-communication-coach-english)*

> Un coach d'expression orale qui te fait pratiquer, t'écoute, et te dit quoi corriger.

On ne devient pas meilleur à l'oral en regardant des vidéos sur la communication. Il faut parler, s'entendre, et recommencer. Le problème, c'est que presque personne ne s'enregistre : c'est inconfortable, et sans retour structuré on ne sait pas quoi corriger.

Cette app existe pour enlever ce frottement. Tu ouvres une page, tu choisis un exercice, tu parles une minute, et tu vois immédiatement ton débit, tes mots de remplissage, tes hésitations et la structure de ce que tu viens de dire.

## 🚧 État du projet

**Version actuelle : v0.4 — en développement actif.**

C'est un produit en construction, pas un projet terminé. Ce qui est listé dans « Ce qui marche aujourd'hui » fonctionne réellement et a été testé. Le reste est dans la roadmap, et la roadmap bouge.

Construit par **Sanaba Kanté**, étudiante en analyse de données, qui apprend à mieux structurer ses idées à l'oral en même temps qu'elle construit l'outil. Le développement est documenté publiquement, bugs compris.

**Limites connues à ce jour :**

- La transcription automatique dépend de la Web Speech API : elle fonctionne bien sur Chrome et Edge, mal ou pas du tout sur Firefox et Safari.
- Tout est stocké dans le navigateur. Changer d'appareil = repartir de zéro.
- Les objectifs personnels sont enregistrés et affichés, mais n'adaptent pas encore le choix des exercices.
- Le retour IA nécessite ta propre clé API Anthropic (payante à l'usage).

## 🎯 La vision

Aujourd'hui, l'app propose des exercices et mesure ce que tu dis.

L'objectif est qu'elle devienne **un coach qui sait ce que tu dois améliorer et te donne le prochain exercice** : qui suit ta progression dans le temps, reconnaît tes points faibles récurrents, et t'entraîne pour des situations réelles — une entrevue, une réunion, un désaccord avec ton gestionnaire — plutôt que pour des exercices abstraits.

## ✅ Ce qui marche aujourd'hui

### Les 8 exercices

| Exercice | Ce que tu fais |
|---|---|
| 🎯 **Sujet libre** | Un sujet au hasard (ou le tien), tu parles 1 à 2 minutes. |
| 🧱 **Structure guidée** | Tu choisis un moule (3 idées, PREP, STAR, Problème→Solution) et l'app te guide en direct, section par section, avec un minuteur par section. |
| 🔤 **Mot au hasard** | Un mot + sa définition, 60 s de préparation chronométrée, puis tu présentes. |
| ⚡ **Improvisation rapide** | Des questions courtes qui changent toutes seules toutes les 30 secondes. |
| 🥊 **Débat** | Une affirmation, un camp tiré au sort (POUR ou CONTRE), 90 s de préparation. |
| 🎧 **Podcast / Entrevue** | Une série de questions : embauche, technique data, podcast, média, stage. |
| 👄 **Articulation** | Des virelangues, avec un score de précision mot à mot. |
| 📜 **Lecture (téléprompteur)** | Un texte qui défile à la vitesse que tu règles, tu lis à voix haute. |

Chaque exercice s'accompagne d'une **mini-leçon** de 3 règles concrètes.

### L'aide à la structuration

C'est la partie la plus travaillée de l'app, parce que c'est le problème le plus courant à l'oral : avoir les idées, mais pas l'ordre.

1. **Les moules guidés** — pendant que tu parles, un bandeau affiche la section en cours (« Annonce ton plan », « Idée 1 + exemple », « Conclusion »), un conseil précis pour chacune, une barre de progression et un minuteur. Ça avance tout seul.
2. **Le plan en 3 idées** — tu écris tes idées en mots-clés pendant la préparation ; elles restent affichées à l'écran pendant l'enregistrement.
3. **La note de structure sur 100** — après chaque prise, l'app relit ta transcription et vérifie quatre choses : plan annoncé, transitions marquées, exemple donné, conclusion claire. Elle montre les mots exacts trouvés, et la phrase à utiliser pour ce qui manque.

### Le reste

- **Enregistrement audio + réécoute** de ta propre voix, et transcription automatique en direct.
- **Statistiques gratuites, sans clé API** : durée, mots par minute, mots de remplissage (avec le détail par mot), répétitions et hésitations.
- **Score de précision de lecture** pour les modes articulation et téléprompteur.
- **Séances chronométrées** de 15, 30, 45 ou 60 minutes, avec récapitulatif de fin.
- **Objectif personnel, série de jours consécutifs et minutes parlées cumulées.**
- **Retour détaillé par IA** (optionnel) qui tient compte de l'exercice, du moule suivi et du plan que tu avais écrit.
- **Bilingue FR / EN** de bout en bout : sujets, leçons, virelangues, textes, interface.
- **Aucune inscription, aucun compte, aucun serveur.**

## 🗺️ Roadmap

### Phase 1 — Assainir les bases ✅

- [x] Corriger les bugs audio (lecture impossible après un enregistrement, audio mort après « Refaire un tour »)
- [x] Libérer proprement le micro, les flux et les URL d'objets entre deux prises
- [x] Tester les 8 exercices
- [x] Réécrire ce README

### Phase 2 — Faire de l'app un vrai suivi

- [ ] **Score de communication global** agrégeant clarté, débit, mots de remplissage, hésitations, structure, articulation et concision — avec l'évolution dans le temps (« cette semaine : 72 → aujourd'hui : 78 »)
- [ ] **Comparer deux enregistrements** à des dates différentes et dire ce qui a changé en une phrase
- [ ] **Objectifs qui adaptent réellement les exercices** proposés
- [ ] **Parcours par niveaux** : parler clairement → organiser ses idées → parler spontanément → convaincre → communication professionnelle

### Phase 3 — Devenir un coach

- [ ] **Simulations réalistes** : entrevue d'embauche, réseautage, réunion, conversation difficile, présentation de 60 secondes
- [ ] **Mode 30 secondes** : une question, réponse immédiate, note instantanée
- [ ] **Storytelling** analysé sur la trame Situation → Problème → Action → Résultat
- [ ] **Mode bilingue FR → EN** : question en français, réponse en anglais (penser dans une langue, parler dans l'autre)
- [ ] **Coach IA** qui nomme la faiblesse principale du jour et recommande le prochain exercice
- [ ] **Bibliothèque de grands communicateurs** : extrait, technique utilisée, explication, puis exercice inspiré de cette technique

## 🚀 Utiliser l'app

### En ligne (recommandé)

**https://mo2kk4ry.github.io/coach-de-communication/** — rien à installer.

> 💡 **Utilise Chrome ou Edge.** La transcription automatique repose sur la Web Speech API, qui n'est pas correctement supportée par Firefox et Safari. Dans les autres navigateurs, tu peux quand même enregistrer ta voix et taper ton texte à la main : les statistiques et le retour IA fonctionnent normalement.

### En local (pour développer)

Le micro ne fonctionne **pas** si tu ouvres `index.html` par un double-clic : les navigateurs bloquent l'accès au micro sur les adresses `file://`. Il faut un petit serveur local :

```bash
git clone https://github.com/mo2kk4ry/coach-de-communication.git
cd coach-de-communication
python -m http.server 8000
```

Puis ouvre `http://localhost:8000`.

## 🔑 Le retour IA (optionnel)

Toutes les statistiques — durée, débit, mots de remplissage, hésitations, structure, précision de lecture — sont **gratuites et ne demandent aucune clé**.

Le retour rédigé par Claude est un supplément :

1. Crée un compte sur [console.anthropic.com](https://console.anthropic.com/settings/keys) et génère une clé API (`sk-ant-...`).
2. Dans l'app, ⚙️ **Réglages** → colle ta clé.
3. Elle reste dans ton navigateur (`localStorage`) et n'est envoyée qu'à l'API d'Anthropic.

⚠️ L'API Anthropic est facturée à l'usage. Avec le modèle utilisé (`claude-3-5-haiku-latest`), une session coûte typiquement une fraction de cent à quelques cents. Tarifs à jour sur [anthropic.com/pricing](https://www.anthropic.com/pricing).

## 🔒 Confidentialité

- **Ton audio ne quitte jamais ton navigateur.** Il n'est envoyé nulle part, jamais — y compris quand tu demandes un retour IA.
- Le retour IA n'envoie que le texte de ta transcription et la consigne de l'exercice à l'API d'Anthropic.
- Clé API, objectif, statistiques et historique vivent uniquement dans le `localStorage` de ton navigateur. Ils ne te suivent pas d'un appareil à l'autre, et personne d'autre n'y a accès.

## 🛠️ Sous le capot

Aucun build, aucune dépendance, aucun backend : six fichiers statiques qu'un navigateur sait lire tels quels.

| Fichier | Rôle |
|---|---|
| `index.html` | Structure des deux écrans (accueil / pratique) |
| `style.css` | Tout le visuel |
| `app.js` | Logique : enregistrement, minuteurs, mesures, analyse, stockage local |
| `exercises.js` | Contenu : modes, moules de structure, vocabulaire, virelangues, textes, marqueurs |
| `i18n.js` | Traductions FR / EN |
| `prompts.js` | Banque de sujets de pratique |

Web Speech API pour la transcription, MediaRecorder pour l'audio, `localStorage` pour la mémoire, appel direct à l'API Anthropic pour le retour IA.

## 🤝 Contribuer

Le code est visible publiquement, mais ce n'est pas (encore) un projet ouvert aux contributions externes : le développement reste géré par Sanaba.

Tu as repéré un bug ou tu as une idée ? Ouvre une *issue* — c'est toujours bienvenu.

## 📄 Licence

Tous droits réservés — voir le fichier `LICENSE`. Le code est publié à titre de démonstration ; il n'est pas libre de droits, et sa copie, sa modification ou sa réutilisation ne sont pas autorisées sans permission.

---

# 🎙️ Communication Coach (English)

**[Open the app](https://mo2kk4ry.github.io/coach-de-communication/)**

> A speaking coach that makes you practise, listens to you, and tells you what to fix.

You don't get better at speaking by watching videos about communication. You have to speak, hear yourself back, and go again. The problem is that almost nobody records themselves: it's uncomfortable, and without structured feedback you don't know what to fix.

This app exists to remove that friction. You open a page, pick an exercise, speak for a minute, and immediately see your pace, your filler words, your hesitations and the structure of what you just said.

## 🚧 Project status

**Current version: v0.4 — actively in development.**

This is a product being built, not a finished project. Everything listed under "What works today" actually works and has been tested. The rest is on the roadmap, and the roadmap moves.

Built by **Sanaba Kanté**, a data analytics student learning to structure her ideas out loud while building the tool. The process is documented publicly, bugs included.

**Known limitations today:**

- Live transcription relies on the Web Speech API: it works well in Chrome and Edge, poorly or not at all in Firefox and Safari.
- Everything is stored in the browser. Switch devices and you start from scratch.
- Personal goals are saved and displayed, but don't yet adapt which exercises you're given.
- AI feedback requires your own Anthropic API key (pay-per-use).

## 🎯 The vision

Today the app offers exercises and measures what you say.

The goal is for it to become **a coach that knows what you need to improve and hands you the next exercise**: one that tracks your progress over time, recognizes your recurring weaknesses, and trains you for real situations — an interview, a meeting, a disagreement with your manager — rather than abstract exercises.

## ✅ What works today

### The 8 exercises

| Exercise | What you do |
|---|---|
| 🎯 **Free topic** | A random topic (or your own), you speak for 1–2 minutes. |
| 🧱 **Guided structure** | Pick a template (3 ideas, PREP, STAR, Problem→Solution) and the app walks you through live, section by section, with a timer per section. |
| 🔤 **Random word** | A word plus its definition, a 60 s timed prep, then you present. |
| ⚡ **Rapid fire** | Short questions that change on their own every 30 seconds. |
| 🥊 **Debate** | A statement and a randomly assigned side (FOR or AGAINST), 90 s of prep. |
| 🎧 **Podcast / Interview** | A set of questions: hiring, data technical, podcast, media, internship. |
| 👄 **Articulation** | Tongue twisters, with a word-by-word accuracy score. |
| 📜 **Reading (teleprompter)** | Text scrolling at the speed you set, you read it out loud. |

Every exercise comes with a **mini-lesson**: 3 concrete rules.

### The structuring aids

This is the most developed part of the app, because it's the most common problem when speaking: having the ideas, but not the order.

1. **Guided templates** — while you speak, a panel shows the current section ("Announce your plan", "Idea 1 + example", "Conclusion"), a specific tip for each, a progress bar and a timer. It advances on its own.
2. **The 3-idea plan** — you write your ideas as keywords during prep; they stay on screen while you record.
3. **The structure score out of 100** — after each take, the app reads your transcript and checks four things: plan announced, transitions signposted, example given, clear close. It shows the exact words it found, and the sentence to use for whatever is missing.

### Everything else

- **Audio recording + playback** of your own voice, and live automatic transcription.
- **Free stats, no API key**: duration, words per minute, filler words (broken down per word), repetitions and hesitations.
- **Reading accuracy score** for the articulation and teleprompter modes.
- **Timed sessions** of 15, 30, 45 or 60 minutes, with an end-of-session recap.
- **Personal goal, daily streak and total minutes spoken.**
- **Detailed AI feedback** (optional) that accounts for the exercise, the template followed and the plan you wrote.
- **Fully bilingual FR / EN**: topics, lessons, tongue twisters, texts, interface.
- **No sign-up, no account, no server.**

## 🗺️ Roadmap

### Phase 1 — Clean up the foundations ✅

- [x] Fix the audio bugs (playback failing after a recording, dead audio after "Go again")
- [x] Properly release the mic, streams and object URLs between takes
- [x] Test all 8 exercises
- [x] Rewrite this README

### Phase 2 — Turn the app into real tracking

- [ ] **Overall communication score** aggregating clarity, pace, filler words, hesitations, structure, articulation and concision — with change over time ("this week: 72 → today: 78")
- [ ] **Compare two recordings** from different dates and say what changed in one sentence
- [ ] **Goals that actually adapt** which exercises you're given
- [ ] **Levelled paths**: speak clearly → organize your ideas → speak spontaneously → persuade → professional communication

### Phase 3 — Become a coach

- [ ] **Realistic simulations**: job interview, networking, meeting, difficult conversation, 60-second pitch
- [ ] **30-second mode**: one question, immediate answer, instant score
- [ ] **Storytelling** analyzed against Situation → Problem → Action → Result
- [ ] **Bilingual FR → EN mode**: question in French, answer in English (think in one language, speak in the other)
- [ ] **AI coach** that names your main weakness of the day and recommends the next exercise
- [ ] **Library of great communicators**: clip, technique used, explanation, then an exercise inspired by that technique

## 🚀 Using the app

### Online (recommended)

**https://mo2kk4ry.github.io/coach-de-communication/** — nothing to install.

> 💡 **Use Chrome or Edge.** Live transcription relies on the Web Speech API, which isn't properly supported in Firefox or Safari. In other browsers you can still record your voice and type your text by hand: stats and AI feedback work normally.

### Locally (for development)

The microphone will **not** work if you open `index.html` by double-clicking it: browsers block microphone access on `file://` addresses. You need a small local server:

```bash
git clone https://github.com/mo2kk4ry/coach-de-communication.git
cd coach-de-communication
python -m http.server 8000
```

Then open `http://localhost:8000`.

## 🔑 AI feedback (optional)

All the stats — duration, pace, filler words, hesitations, structure, reading accuracy — are **free and require no key**.

Claude-written feedback is an extra:

1. Create an account at [console.anthropic.com](https://console.anthropic.com/settings/keys) and generate an API key (`sk-ant-...`).
2. In the app, ⚙️ **Settings** → paste your key.
3. It stays in your browser (`localStorage`) and is only ever sent to Anthropic's API.

⚠️ The Anthropic API is billed per use. With the model used here (`claude-3-5-haiku-latest`), a session typically costs a fraction of a cent to a few cents. Current pricing at [anthropic.com/pricing](https://www.anthropic.com/pricing).

## 🔒 Privacy

- **Your audio never leaves your browser.** It is never sent anywhere — including when you request AI feedback.
- AI feedback only sends your transcript text and the exercise instruction to Anthropic's API.
- API key, goal, stats and history live only in your browser's `localStorage`. They don't follow you across devices, and nobody else can access them.

## 🛠️ Under the hood

No build step, no dependencies, no backend: six static files a browser reads as-is.

| File | Role |
|---|---|
| `index.html` | Structure of the two screens (home / practice) |
| `style.css` | All the visuals |
| `app.js` | Logic: recording, timers, measurement, analysis, local storage |
| `exercises.js` | Content: modes, structure templates, vocabulary, tongue twisters, texts, markers |
| `i18n.js` | FR / EN translations |
| `prompts.js` | Bank of practice topics |

Web Speech API for transcription, MediaRecorder for audio, `localStorage` for memory, a direct call to the Anthropic API for AI feedback.

## 🤝 Contributing

The code is publicly visible, but this isn't (yet) a project open to outside contributions — development stays with Sanaba.

Spotted a bug or have an idea? Open an issue — always welcome.

## 📄 License

All rights reserved — see the `LICENSE` file. This code is published for demonstration purposes; it isn't free to copy, modify, or reuse without permission.
