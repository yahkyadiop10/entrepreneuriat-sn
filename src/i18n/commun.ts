// Textes communs à toutes les pages, repris de 02-CONTENUS (01-accueil.md / 01-home.md).
// Corriger d'abord dans 02-CONTENUS, puis reporter ici.
import type { Lang, PageRef, RouteId } from './routes';

type Lien = { ref: PageRef; label: string };

export const CONTACT = {
  telAffiche: '+221 77 788 01 82',
  telLien: 'tel:+221777880182',
  whatsapp: '221777880182',
  email: 'contact@entrepreneuriat.sn',
} as const;

const route = (id: RouteId): PageRef => ({ kind: 'route', id });

export const COMMUN = {
  fr: {
    nomLangue: 'Français',
    nav: [
      { ref: route('accueil'), label: 'Accueil' },
      { ref: route('etre-accompagne'), label: 'Être accompagné' },
      { ref: route('expertises'), label: 'Nos expertises' },
      { ref: route('organisations'), label: 'Organisations' },
      { ref: route('ressources'), label: 'Ressources' },
      { ref: route('a-propos'), label: 'À propos' },
      { ref: route('contact'), label: 'Contact' },
    ] as Lien[],
    cta: 'Commencer mon parcours',
    menu: 'Menu',
    fermer: 'Fermer',
    navPrincipale: 'Navigation principale',
    choixLangue: 'Choisir la langue',
    filAriane: "Fil d'Ariane",
    allerAuContenu: 'Aller au contenu',
    whatsappLabel: 'Nous écrire sur WhatsApp',
    whatsappMsg: 'Bonjour Entrepreneuriat Sénégal, je vous contacte depuis votre site.',
    signature: 'Révéler les potentiels. Développer les compétences. Accompagner les initiatives.',
    footCols: [
      {
        titre: 'Être accompagné',
        liens: [
          { ref: route('orientation'), label: 'Je cherche mon orientation' },
          { ref: route('entreprendre'), label: 'Je veux entreprendre' },
          { ref: route('activite'), label: 'Je veux développer mon activité' },
          { ref: route('competences'), label: 'Je veux développer mes compétences' },
          { ref: route('ressources'), label: 'Ressources' },
        ] as Lien[],
      },
      {
        titre: 'Organisations',
        liens: [
          { ref: route('organisations'), label: 'Nos services' },
          { ref: route('expertises'), label: 'Nos expertises' },
          { ref: route('partenariat'), label: 'Demande de partenariat' },
        ] as Lien[],
      },
    ],
    contactTitre: 'Contact',
    ville: 'Thiès, Sénégal',
    copyright: '© 2026 Entrepreneuriat Sénégal',
    legal: [
      { ref: route('mentions'), label: 'Mentions légales' },
      { ref: route('confidentialite'), label: 'Confidentialité' },
    ] as Lien[],
    nf: { titre: 'Page introuvable', accueil: 'Accueil', parcours: 'Être accompagné' },
    photoAVenir: 'Photo à venir',
    illustrationAVenir: 'Illustration à venir',
  },
  en: {
    nomLangue: 'English',
    nav: [
      { ref: route('accueil'), label: 'Home' },
      { ref: route('etre-accompagne'), label: 'Get support' },
      { ref: route('expertises'), label: 'Expertise' },
      { ref: route('organisations'), label: 'Organisations' },
      { ref: route('ressources'), label: 'Resources' },
      { ref: route('a-propos'), label: 'About' },
      { ref: route('contact'), label: 'Contact' },
    ] as Lien[],
    cta: 'Start my pathway',
    menu: 'Menu',
    fermer: 'Close',
    navPrincipale: 'Main navigation',
    choixLangue: 'Choose language',
    filAriane: 'Breadcrumb',
    allerAuContenu: 'Skip to content',
    whatsappLabel: 'Message us on WhatsApp',
    whatsappMsg: "Hello Entrepreneuriat Sénégal, I'm contacting you from your website.",
    signature: 'Reveal potential. Build skills. Support initiatives.',
    footCols: [
      {
        titre: 'Get support',
        liens: [
          { ref: route('orientation'), label: 'Find my direction' },
          { ref: route('entreprendre'), label: 'Start a business' },
          { ref: route('activite'), label: 'Grow my business' },
          { ref: route('competences'), label: 'Build my skills' },
          { ref: route('ressources'), label: 'Resources' },
        ] as Lien[],
      },
      {
        titre: 'Organisations',
        liens: [
          { ref: route('organisations'), label: 'Our services' },
          { ref: route('expertises'), label: 'Expertise' },
          { ref: route('partenariat'), label: 'Partnership request' },
        ] as Lien[],
      },
    ],
    contactTitre: 'Contact',
    ville: 'Thiès, Senegal',
    copyright: '© 2026 Entrepreneuriat Sénégal',
    legal: [
      { ref: route('mentions'), label: 'Legal notice' },
      { ref: route('confidentialite'), label: 'Privacy' },
    ] as Lien[],
    nf: { titre: 'Page not found', accueil: 'Home', parcours: 'Get support' },
    photoAVenir: 'Photo to come',
    illustrationAVenir: 'Illustration to come',
  },
} satisfies Record<Lang, unknown>;
