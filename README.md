# 🎙️ Coach de communication

**➡️ [Essayer l'app en ligne](https://mo2kk4ry.github.io/coach-de-communication/)**

Une app web gratuite et open-source pour pratiquer sa communication orale : choisis un exercice, enregistre-toi, réécoute-toi, obtiens ta transcription et tes statistiques (débit, mots de remplissage, hésitations), et — si tu veux — un retour détaillé généré par l'IA Claude.

Fait par Sanaba, étudiante en analyse de données qui doit améliorer sa communication d'ici la fin de sa session. Pensé pour être simple à utiliser, gratuit dans sa version de base, et libre d'être copié, modifié ou amélioré par d'autres étudiant·e·s.

**[English version below](#-communication-coach-english)**

## 🎲 Les 7 exercices

| Exercice | Ce que tu fais |
|---|---|
| 🎯 **Sujet libre** | Un sujet au hasard (ou le tien), tu parles 1 à 2 minutes. |
| 🔤 **Mot au hasard** | Un mot + sa définition, 60 s de préparation chronométrée, puis tu présentes. |
| ⚡ **Improvisation rapide** | Des questions courtes qui changent toutes seules toutes les 30 secondes. |
| 🥊 **Débat** | Une affirmation, un camp tiré au sort (POUR ou CONTRE), 90 s de préparation. |
| 🎧 **Podcast / Entrevue** | Une série de questions (embauche, technique data, podcast, média, stage). |
| 👄 **Articulation** | Des virelangues à dire sans s'emmêler, avec un score de précision. |
| 📜 **Lecture (téléprompteur)** | Un texte qui défile à la vitesse que tu choisis, tu lis à voix haute. |

Chaque exercice vient avec une **mini-leçon** de 3 règles concrètes (structurer en 3 idées, méthode STAR, articuler, etc.).

## ✨ Fonctionnalités

- 7 types d'exercices, tous bilingues FR/EN
- **Séances chronométrées** de 15, 30, 45 ou 60 minutes (ou mode libre), avec récapitulatif à la fin
- Enregistrement audio + **réécoute de ta propre voix** + transcription automatique en direct (Chrome / Edge)
- Statistiques instantanées et **100 % gratuites**, sans clé API : durée, mots par minute, mots de remplissage, répétitions/hésitations
- **Score de précision de lecture** pour les modes articulation et téléprompteur (comparaison mot à mot avec le texte cible)
- Objectif personnel + **série de jours consécutifs** et minutes parlées cumulées
- Retour détaillé optionnel généré par Claude (IA) — nécessite ta propre clé API Anthropic
- Historique de tes sessions précédentes (sauvegardé uniquement dans ton navigateur)
- Aucune inscription, aucun compte, aucun serveur : tout tourne dans ton navigateur

## 🚀 Utiliser l'app

### Option 1 — en ligne (le plus simple)

Ouvre **https://mo2kk4ry.github.io/coach-de-communication/** — c'est tout.

### Option 2 — sur ton ordinateur

1. Télécharge les fichiers du projet (bouton "Code" → "Download ZIP" sur GitHub, ou clone le dépôt).
2. Ouvre `index.html` dans Chrome ou Edge (double-clic suffit).
3. C'est tout — aucune installation, aucun serveur requis.

> 💡 **Navigateur recommandé : Chrome ou Edge.** La transcription automatique utilise la Web Speech API, qui n'est pas supportée par tous les navigateurs (Firefox et Safari, par exemple, ne la supportent pas bien). Dans les autres navigateurs, tu peux toujours enregistrer ta voix et taper ton texte toi-même — les statistiques et le retour IA fonctionnent quand même.

## 🔑 Le retour IA (optionnel, payant à l'usage)

Les statistiques de base (durée, débit, mots de remplissage, précision de lecture) sont **toujours gratuites** et ne nécessitent rien de plus.

Pour débloquer un retour détaillé et personnalisé généré par Claude :

1. Crée un compte sur [console.anthropic.com](https://console.anthropic.com/settings/keys)
2. Génère une clé API (commence par `sk-ant-...`)
3. Dans l'app, clique sur ⚙️ **Réglages** et colle ta clé
4. Ta clé reste uniquement dans ton navigateur (`localStorage`) — elle n'est jamais envoyée ailleurs qu'à l'API d'Anthropic, et jamais stockée sur un serveur

⚠️ **L'utilisation de l'API Anthropic est payante à l'usage** (pas un abonnement — tu paies seulement ce que tu utilises). Avec le modèle utilisé ici (`claude-3-5-haiku-latest`), une session de pratique coûte généralement une fraction de cent à quelques cents. Anthropic offre parfois un crédit gratuit de départ aux nouveaux comptes — vérifie les tarifs actuels sur [anthropic.com/pricing](https://www.anthropic.com/pricing).

## 🌐 Héberger ta propre version sur GitHub Pages

Pas besoin de ligne de commande — tout se fait depuis le site web de GitHub.

1. Sur GitHub, crée un nouveau dépôt (repository), par exemple `coach-de-communication`. Laisse-le public si tu veux que d'autres puissent l'utiliser et contribuer.
2. Dans ton nouveau dépôt, clique sur **"uploading an existing file"** (ou "Add file" → "Upload files").
3. Glisse-dépose les 6 fichiers du projet : `index.html`, `style.css`, `app.js`, `i18n.js`, `prompts.js`, `exercises.js` (et ce `README.md`, `LICENSE` si tu veux).
4. Clique sur **"Commit changes"**.
5. Va dans **Settings** (du dépôt) → **Pages** (dans le menu de gauche).
6. Sous "Build and deployment", choisis **Source : Deploy from a branch**, puis **Branch : main** et dossier **/ (root)**. Sauvegarde.
7. Après une minute ou deux, ton app sera en ligne à une adresse du type :
   `https://ton-nom-utilisateur.github.io/coach-de-communication/`

## 🤝 Contribuer

Ce projet est fait pour grandir. Quelques idées d'améliorations bienvenues :

- Ajouter des sujets, des mots de vocabulaire, des virelangues ou des textes de lecture dans `exercises.js`
- Ajouter plus de sujets de pratique dans `prompts.js`
- Ajouter une nouvelle langue dans `i18n.js`
- Améliorer la détection des mots de remplissage pour d'autres accents/dialectes
- Créer un nouveau type d'exercice (il suffit d'ajouter une entrée dans `EXERCISE_MODES`)

N'hésite pas à ouvrir une *issue* ou une *pull request* sur GitHub.

## 🔒 Confidentialité

- Rien n'est envoyé à un serveur, sauf si tu demandes explicitement un retour IA (dans ce cas, seul le texte de ta transcription et le sujet sont envoyés à l'API d'Anthropic — jamais ton audio).
- Ta clé API, ton objectif, tes statistiques et ton historique sont stockés uniquement dans ton navigateur (`localStorage`). Si tu changes de navigateur ou d'appareil, ils ne te suivent pas.
- L'enregistrement audio reste dans ton navigateur et n'est jamais téléversé nulle part.

## 📄 Licence

Ce projet est sous licence MIT — libre d'utilisation, de modification et de partage. Voir le fichier `LICENSE`.

---

# 🎙️ Communication Coach (English)

**➡️ [Try the app online](https://mo2kk4ry.github.io/coach-de-communication/)**

A free, open-source web app to practice spoken communication: pick an exercise, record yourself, play yourself back, get a transcript and instant stats (pace, filler words, hesitations), and optionally detailed AI-generated feedback from Claude.

Made by Sanaba, a data analytics student working on her communication before the end of her semester. Built to be simple to use, free at its core, and free for other students to copy, modify, or improve.

## 🎲 The 7 exercises

| Exercise | What you do |
|---|---|
| 🎯 **Free topic** | A random topic (or your own), you speak for 1–2 minutes. |
| 🔤 **Random word** | A word plus its definition, a 60 s timed prep, then you present. |
| ⚡ **Rapid fire** | Short questions that change on their own every 30 seconds. |
| 🥊 **Debate** | A statement and a randomly assigned side (FOR or AGAINST), 90 s of prep. |
| 🎧 **Podcast / Interview** | A set of questions (hiring, data technical, podcast, media, internship). |
| 👄 **Articulation** | Tongue twisters to say without tripping up, with an accuracy score. |
| 📜 **Reading (teleprompter)** | Text scrolling at the speed you choose, you read it out loud. |

Every exercise comes with a **mini-lesson**: 3 concrete rules (structure in 3 ideas, the STAR method, articulation, and so on).

## ✨ Features

- 7 exercise types, all bilingual FR/EN
- **Timed sessions** of 15, 30, 45 or 60 minutes (or free mode), with an end-of-session recap
- Audio recording + **playback of your own voice** + live automatic transcription (Chrome / Edge)
- Instant, **100% free** stats, no API key needed: duration, words per minute, filler words, repetitions/hesitations
- **Reading accuracy score** for the articulation and teleprompter modes (word-by-word comparison with the target text)
- Personal goal + **daily streak** and total minutes spoken
- Optional detailed AI feedback powered by Claude — requires your own Anthropic API key
- History of past sessions (saved only in your browser)
- No sign-up, no account, no server: everything runs in your browser

## 🚀 Using the app

### Option 1 — online (easiest)

Open **https://mo2kk4ry.github.io/coach-de-communication/** — that's it.

### Option 2 — on your computer

1. Download the project files (GitHub's "Code" → "Download ZIP", or clone the repo).
2. Open `index.html` in Chrome or Edge (double-click works).
3. That's it — no install, no server needed.

> 💡 **Recommended browser: Chrome or Edge.** Live transcription uses the Web Speech API, which isn't well supported in every browser (Firefox and Safari, for example). In other browsers you can still record your voice and type your own text — stats and AI feedback still work.

## 🔑 AI feedback (optional, pay-per-use)

The core stats (duration, pace, filler words, reading accuracy) are **always free** and need nothing extra.

To unlock detailed, personalized feedback from Claude:

1. Create an account at [console.anthropic.com](https://console.anthropic.com/settings/keys)
2. Generate an API key (starts with `sk-ant-...`)
3. In the app, click ⚙️ **Settings** and paste your key
4. Your key stays only in your browser (`localStorage`) — it's never sent anywhere except Anthropic's API, and never stored on any server

⚠️ **Anthropic API usage is billed per use** (not a subscription — you only pay for what you use). With the model used here (`claude-3-5-haiku-latest`), one practice session typically costs a fraction of a cent to a few cents. Anthropic sometimes offers free starting credit to new accounts — check current pricing at [anthropic.com/pricing](https://www.anthropic.com/pricing).

## 🌐 Hosting your own copy on GitHub Pages

No command line needed — everything can be done from the GitHub website.

1. On GitHub, create a new repository, e.g. `communication-coach`. Keep it public if you want others to use it and contribute.
2. In your new repo, click **"uploading an existing file"** (or "Add file" → "Upload files").
3. Drag and drop the 6 project files: `index.html`, `style.css`, `app.js`, `i18n.js`, `prompts.js`, `exercises.js` (plus this `README.md` and `LICENSE` if you like).
4. Click **"Commit changes"**.
5. Go to the repo's **Settings** → **Pages** (left-hand menu).
6. Under "Build and deployment", choose **Source: Deploy from a branch**, then **Branch: main**, folder **/ (root)**. Save.
7. After a minute or two, your app will be live at something like:
   `https://your-username.github.io/communication-coach/`

## 🤝 Contributing

This project is meant to grow. A few welcome ideas:

- Add topics, vocabulary words, tongue twisters or reading texts to `exercises.js`
- Add more practice prompts to `prompts.js`
- Add a new language in `i18n.js`
- Improve filler-word detection for other accents/dialects
- Create a new exercise type (just add an entry to `EXERCISE_MODES`)

Feel free to open an issue or a pull request on GitHub.

## 🔒 Privacy

- Nothing is sent to a server unless you explicitly request AI feedback (in which case only your transcript text and the topic are sent to Anthropic's API — never your audio).
- Your API key, goal, stats and history are stored only in your browser (`localStorage`). They won't follow you to a different browser or device.
- Audio recordings stay in your browser and are never uploaded anywhere.

## 📄 License

This project is MIT licensed — free to use, modify, and share. See the `LICENSE` file.
