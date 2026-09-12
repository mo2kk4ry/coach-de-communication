# 🎙️ Coach de communication

Une petite app web gratuite et open-source pour pratiquer sa communication orale : choisis un sujet, enregistre-toi, obtiens ta transcription et tes statistiques (débit, mots de remplissage), et — si tu veux — un retour détaillé généré par l'IA Claude.

Projet étudiant, pensé pour être simple à utiliser, gratuit dans sa version de base, et libre d'être copié, modifié ou amélioré par d'autres étudiant·e·s.

**[English version below](#-communication-coach-english)**

## ✨ Fonctionnalités

- Banque de sujets de pratique (FR/EN) ou écris ton propre sujet
- Enregistrement audio + transcription automatique en direct (Chrome / Edge)
- Statistiques instantanées et **100 % gratuites**, sans clé API : durée, mots par minute, mots de remplissage
- Retour détaillé optionnel généré par Claude (IA) — nécessite ta propre clé API Anthropic
- Historique de tes sessions précédentes (sauvegardé uniquement dans ton navigateur)
- Aucune inscription, aucun compte, aucun serveur : tout tourne dans ton navigateur

## 🚀 Utiliser l'app

### Option 1 — en ligne (le plus simple)

Une fois publiée sur GitHub Pages, ouvre simplement le lien fourni par la personne qui héberge le projet.

### Option 2 — sur ton ordinateur

1. Télécharge les fichiers du projet (bouton "Code" → "Download ZIP" sur GitHub, ou clone le dépôt).
2. Ouvre `index.html` dans Chrome ou Edge (double-clic suffit).
3. C'est tout — aucune installation, aucun serveur requis.

> 💡 **Navigateur recommandé : Chrome ou Edge.** La transcription automatique utilise la Web Speech API, qui n'est pas supportée par tous les navigateurs (Firefox et Safari, par exemple, ne la supportent pas bien). Dans les autres navigateurs, tu peux toujours enregistrer ta voix et taper ton texte toi-même — les statistiques et le retour IA fonctionnent quand même.

## 🔑 Le retour IA (optionnel, payant à l'usage)

Les statistiques de base (durée, débit, mots de remplissage) sont **toujours gratuites** et ne nécessitent rien de plus.

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
3. Glisse-dépose les 5 fichiers du projet : `index.html`, `style.css`, `app.js`, `i18n.js`, `prompts.js` (et ce `README.md`, `LICENSE` si tu veux).
4. Clique sur **"Commit changes"**.
5. Va dans **Settings** (du dépôt) → **Pages** (dans le menu de gauche).
6. Sous "Build and deployment", choisis **Source : Deploy from a branch**, puis **Branch : main** et dossier **/ (root)**. Sauvegarde.
7. Après une minute ou deux, ton app sera en ligne à une adresse du type :
   `https://ton-nom-utilisateur.github.io/coach-de-communication/`

## 🤝 Contribuer

Ce projet est fait pour grandir. Quelques idées d'améliorations bienvenues :

- Ajouter plus de sujets de pratique dans `prompts.js`
- Ajouter une nouvelle langue dans `i18n.js`
- Améliorer la détection des mots de remplissage pour d'autres accents/dialectes
- Ajouter un mode "entretien d'embauche" avec des questions de suivi générées par l'IA

N'hésite pas à ouvrir une *issue* ou une *pull request* sur GitHub.

## 🔒 Confidentialité

- Rien n'est envoyé à un serveur, sauf si tu demandes explicitement un retour IA (dans ce cas, seul le texte de ta transcription et le sujet sont envoyés à l'API d'Anthropic — jamais ton audio).
- Ta clé API et ton historique de sessions sont stockés uniquement dans ton navigateur (`localStorage`). Si tu changes de navigateur ou d'appareil, ton historique ne te suit pas.
- L'enregistrement audio reste dans ton navigateur et n'est jamais téléversé nulle part.

## 📄 Licence

Ce projet est sous licence MIT — libre d'utilisation, de modification et de partage. Voir le fichier `LICENSE`.

---

# 🎙️ Communication Coach (English)

A free, open-source web app to practice spoken communication: pick a topic, record yourself, get a transcript and instant stats (pace, filler words), and optionally a detailed AI-generated feedback from Claude.

Student project, built to be simple to use, free at its core, and free for other students to copy, modify, or improve.

## ✨ Features

- Bank of practice prompts (FR/EN), or write your own
- Audio recording + live automatic transcription (Chrome / Edge)
- Instant, **100% free** stats, no API key needed: duration, words per minute, filler words
- Optional detailed AI feedback powered by Claude — requires your own Anthropic API key
- History of past sessions (saved only in your browser)
- No sign-up, no account, no server: everything runs in your browser

## 🚀 Using the app

### Option 1 — online (easiest)

Once published on GitHub Pages, just open the link shared by whoever is hosting the project.

### Option 2 — on your computer

1. Download the project files (GitHub's "Code" → "Download ZIP", or clone the repo).
2. Open `index.html` in Chrome or Edge (double-click works).
3. That's it — no install, no server needed.

> 💡 **Recommended browser: Chrome or Edge.** Live transcription uses the Web Speech API, which isn't well supported in every browser (Firefox and Safari, for example). In other browsers you can still record your voice and type your own text — stats and AI feedback still work.

## 🔑 AI feedback (optional, pay-per-use)

The core stats (duration, pace, filler words) are **always free** and need nothing extra.

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
3. Drag and drop the 5 project files: `index.html`, `style.css`, `app.js`, `i18n.js`, `prompts.js` (plus this `README.md` and `LICENSE` if you like).
4. Click **"Commit changes"**.
5. Go to the repo's **Settings** → **Pages** (left-hand menu).
6. Under "Build and deployment", choose **Source: Deploy from a branch**, then **Branch: main**, folder **/ (root)**. Save.
7. After a minute or two, your app will be live at something like:
   `https://your-username.github.io/communication-coach/`

## 🤝 Contributing

This project is meant to grow. A few welcome ideas:

- Add more practice prompts to `prompts.js`
- Add a new language in `i18n.js`
- Improve filler-word detection for other accents/dialects
- Add a "job interview" mode with AI-generated follow-up questions

Feel free to open an issue or a pull request on GitHub.

## 🔒 Privacy

- Nothing is sent to a server unless you explicitly request AI feedback (in which case only your transcript text and the topic are sent to Anthropic's API — never your audio).
- Your API key and session history are stored only in your browser (`localStorage`). They won't follow you to a different browser or device.
- Audio recordings stay in your browser and are never uploaded anywhere.

## 📄 License

This project is MIT licensed — free to use, modify, and share. See the `LICENSE` file.
