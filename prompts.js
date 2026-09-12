// Bank of practice prompts, bilingual (FR / EN).
// Feel free to add your own — this is meant to grow with contributions.
const PROMPTS = {
  fr: [
    "Présente-toi en 60 secondes comme si c'était un premier entretien d'embauche.",
    "Explique un projet dont tu es fier·ère à quelqu'un qui n'y connaît rien.",
    "Convaincs un ami sceptique d'essayer quelque chose de nouveau (un cours, un sport, une appli).",
    "Décris ta plus grande force professionnelle et donne un exemple concret.",
    "Raconte un défi que tu as surmonté récemment et ce que tu en as appris.",
    "Fais un pitch de 60 secondes pour une idée de projet ou d'entreprise.",
    "Explique pourquoi on devrait t'embaucher pour un poste que tu vises.",
    "Décris ta semaine typique à quelqu'un qui te rencontre pour la première fois.",
    "Donne ton avis sur un sujet d'actualité, en expliquant clairement ton raisonnement.",
    "Explique un concept que tu as appris à l'école à quelqu'un qui ne connaît pas le domaine.",
    "Présente les points forts de ton CV en 90 secondes.",
    "Explique comment tu gères le stress ou une échéance serrée, avec un exemple.",
  ],
  en: [
    "Introduce yourself in 60 seconds as if it were a first job interview.",
    "Explain a project you're proud of to someone with no background in it.",
    "Convince a skeptical friend to try something new (a class, a sport, an app).",
    "Describe your greatest professional strength and give a concrete example.",
    "Talk about a challenge you recently overcame and what you learned from it.",
    "Give a 60-second pitch for a project or business idea.",
    "Explain why someone should hire you for a role you're aiming for.",
    "Describe your typical week to someone meeting you for the first time.",
    "Share your opinion on a current topic, explaining your reasoning clearly.",
    "Explain something you learned in school to someone outside that field.",
    "Walk through the highlights of your resume in 90 seconds.",
    "Explain how you handle stress or a tight deadline, with an example.",
  ],
};

function getRandomPrompt(lang) {
  const list = PROMPTS[lang] || PROMPTS.fr;
  return list[Math.floor(Math.random() * list.length)];
}
