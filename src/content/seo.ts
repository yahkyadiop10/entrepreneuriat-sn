// Titres d'onglet et descriptions Google, repris de la rubrique « Référencement » / « SEO » de chaque fichier 02-CONTENUS.
import type { Lang, RouteId } from '../i18n/routes';

type Seo = { titre: string; description: string };

export const SEO: Record<RouteId, Record<Lang, Seo>> = {
  accueil: {
    fr: { titre: 'Entrepreneuriat Sénégal · Accompagnement et formation', description: 'Parcours gratuits pour entreprendre et progresser, et conseil en ingénierie de formation pour les ONG, institutions et écoles au Sénégal.' },
    en: { titre: 'Entrepreneuriat Sénégal · Guidance and Training', description: 'Free pathways to start a business and grow your skills, and training design consultancy for NGOs, institutions and schools in Senegal.' },
  },
  'etre-accompagne': {
    fr: { titre: 'Être accompagné · 4 parcours gratuits | Entrepreneuriat Sénégal', description: "Orientation, création d'activité, développement de votre entreprise ou de vos compétences : choisissez un parcours gratuit, sans inscription, et avancez étape par étape." },
    en: { titre: 'Get support · 4 free pathways | Entrepreneuriat Sénégal', description: 'Career direction, starting a business, growing your business or building your skills: choose a free pathway, no sign-up needed, and move forward step by step.' },
  },
  entreprendre: {
    fr: { titre: 'Je veux entreprendre · Parcours gratuit en 7 étapes | Entrepreneuriat Sénégal', description: 'Vous voulez créer votre activité mais ne savez pas par où commencer ? Un parcours gratuit en 7 étapes pour trouver votre idée, connaître vos clients et préparer vos premières actions.' },
    en: { titre: 'Start a business · Free 7-step pathway | Entrepreneuriat Sénégal', description: "Want to start your own business but don't know where to begin? A free 7-step pathway to find your idea, understand your customers and plan your first actions." },
  },
  activite: {
    fr: { titre: 'Développer mon activité · Parcours gratuit en 7 étapes | Entrepreneuriat Sénégal', description: 'Vous avez déjà une activité ? Suivez vos ventes et dépenses, fidélisez vos clients, fixez vos prix et trouvez vos pistes de croissance, avec un parcours gratuit en 7 étapes.' },
    en: { titre: 'Grow my business · Free 7-step pathway | Entrepreneuriat Sénégal', description: 'Already running a business? Track your sales and expenses, keep your customers, set your prices and find ways to grow, with a free 7-step pathway.' },
  },
  orientation: {
    fr: { titre: 'Je cherche mon orientation · Parcours gratuit en 6 étapes | Entrepreneuriat Sénégal', description: "Vous ne savez pas quel métier ou quelle voie choisir ? Identifiez vos intérêts, vos aptitudes et vos compétences, explorez des pistes et construisez votre premier plan d'action." },
    en: { titre: 'Find my direction · Free 6-step pathway | Entrepreneuriat Sénégal', description: 'Not sure which career or path to choose? Identify your interests, aptitudes and skills, explore options and build your first action plan.' },
  },
  competences: {
    fr: { titre: 'Développer mes compétences · Parcours gratuit | Entrepreneuriat Sénégal', description: "Confiance en soi, prise de parole, travail d'équipe, gestion du temps : évaluez vos soft skills et progressez avec un parcours gratuit en 7 étapes, exercices pratiques inclus." },
    en: { titre: 'Build my skills · Free pathway | Entrepreneuriat Sénégal', description: 'Self-confidence, public speaking, teamwork, time management: assess your soft skills and improve with a free 7-step pathway, practical exercises included.' },
  },
  expertises: {
    fr: { titre: 'Nos expertises · Entrepreneuriat, soft skills, formation | Entrepreneuriat Sénégal', description: "Entrepreneuriat, soft skills, employabilité, ingénierie pédagogique, conseil et évaluation : cinq pôles d'expertise au service des personnes et des organisations au Sénégal." },
    en: { titre: 'Expertise · Entrepreneurship, soft skills, training | Entrepreneuriat Sénégal', description: 'Entrepreneurship, soft skills, employability, learning design, advisory and evaluation: five areas of expertise serving people and organisations in Senegal.' },
  },
  organisations: {
    fr: { titre: 'Organisations · Ingénierie de formation et renforcement des capacités | Entrepreneuriat Sénégal', description: 'ONG, institutions, écoles, programmes de développement : nous concevons, déployons et évaluons vos programmes de formation et de renforcement des capacités au Sénégal.' },
    en: { titre: 'Organisations · Training design and capacity building | Entrepreneuriat Sénégal', description: 'NGOs, institutions, schools, development programmes: we design, deliver and evaluate your training and capacity-building programmes in Senegal.' },
  },
  partenariat: {
    fr: { titre: 'Demande de partenariat | Entrepreneuriat Sénégal', description: "Présentez-nous votre projet de formation, de renforcement des capacités ou d'accompagnement : nous revenons vers vous pour en discuter." },
    en: { titre: 'Partnership request | Entrepreneuriat Sénégal', description: 'Tell us about your training, capacity-building or support project: we will get back to you to discuss it.' },
  },
  ressources: {
    fr: { titre: 'Ressources · Fiches pratiques gratuites | Entrepreneuriat Sénégal', description: 'Fiches pratiques gratuites pour entreprendre, gérer votre activité, prendre la parole et réussir vos entretiens : une explication, un exemple, un exercice et une action.' },
    en: { titre: 'Resources · Free practical guides | Entrepreneuriat Sénégal', description: 'Free practical guides to start a business, manage it, speak in public and succeed in interviews: an explanation, an example, an exercise and an action.' },
  },
  'a-propos': {
    fr: { titre: 'À propos · Qui sommes-nous ? | Entrepreneuriat Sénégal', description: "Entrepreneuriat Sénégal, structure de conseil, d'ingénierie pédagogique et d'accompagnement fondée par Amadou Tidiane LY, expert-consultant en entrepreneuriat et développement des compétences." },
    en: { titre: 'About · Who we are | Entrepreneuriat Sénégal', description: 'Entrepreneuriat Sénégal, an advisory, learning design and support organisation founded by Amadou Tidiane LY, consultant in entrepreneurship and skills development.' },
  },
  contact: {
    fr: { titre: 'Contact | Entrepreneuriat Sénégal', description: "Une question, un besoin d'orientation ou un projet de formation pour votre organisation ? Contactez Entrepreneuriat Sénégal par WhatsApp, téléphone, e-mail ou formulaire." },
    en: { titre: 'Contact | Entrepreneuriat Sénégal', description: 'A question, a need for guidance or a training project for your organisation? Contact Entrepreneuriat Sénégal by WhatsApp, phone, email or form.' },
  },
  mentions: {
    fr: { titre: 'Mentions légales | Entrepreneuriat Sénégal', description: "Informations légales sur l'éditeur et l'hébergeur du site entrepreneuriat.sn." },
    en: { titre: 'Legal notice | Entrepreneuriat Sénégal', description: 'Legal information about the publisher and host of the entrepreneuriat.sn website.' },
  },
  confidentialite: {
    fr: { titre: 'Politique de confidentialité | Entrepreneuriat Sénégal', description: "Quelles données entrepreneuriat.sn collecte, pourquoi, combien de temps et comment exercer vos droits. Vos réponses aux parcours restent sur votre appareil." },
    en: { titre: 'Privacy policy | Entrepreneuriat Sénégal', description: 'What data entrepreneuriat.sn collects, why, for how long and how to exercise your rights. Your pathway answers stay on your device.' },
  },
};
