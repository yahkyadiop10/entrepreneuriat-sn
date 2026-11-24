// Table de correspondance unique des adresses FR ↔ EN (brief V1 §3).
// Le sélecteur de langue, le fil d'Ariane, le menu et les balises hreflang lisent tous cette table.

export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr', 'en'];

export const ROUTES = {
  accueil: { fr: '/', en: '/en/' },
  'etre-accompagne': { fr: '/etre-accompagne/', en: '/en/get-support/' },
  orientation: { fr: '/etre-accompagne/orientation/', en: '/en/get-support/find-my-direction/' },
  entreprendre: { fr: '/etre-accompagne/entreprendre/', en: '/en/get-support/start-a-business/' },
  activite: { fr: '/etre-accompagne/developper-mon-activite/', en: '/en/get-support/grow-my-business/' },
  competences: { fr: '/etre-accompagne/developper-mes-competences/', en: '/en/get-support/build-my-skills/' },
  expertises: { fr: '/nos-expertises/', en: '/en/expertise/' },
  organisations: { fr: '/organisations/', en: '/en/organisations/' },
  partenariat: { fr: '/organisations/demande-de-partenariat/', en: '/en/organisations/partnership-request/' },
  ressources: { fr: '/ressources/', en: '/en/resources/' },
  'a-propos': { fr: '/a-propos/', en: '/en/about/' },
  contact: { fr: '/contact/', en: '/en/contact/' },
  mentions: { fr: '/mentions-legales/', en: '/en/legal-notice/' },
  confidentialite: { fr: '/confidentialite/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteId = keyof typeof ROUTES;

/** Fiches pratiques : identifiant → adresse dans chaque langue (02-CONTENUS/fr/10 et en/10). */
export const FICHES = {
  'idees-recues': { fr: 'entreprendre-5-idees-recues', en: 'starting-a-business-5-myths' },
  'trouver-une-idee': { fr: 'trouver-une-idee', en: 'find-an-idea' },
  'mes-clients': { fr: 'qui-sont-mes-clients', en: 'who-are-my-customers' },
  'proposition-de-valeur': { fr: 'proposition-de-valeur', en: 'value-proposition' },
  'separer-argent': { fr: 'separer-argent-activite-maison', en: 'separate-business-and-household-money' },
  'fixer-son-prix': { fr: 'fixer-son-prix', en: 'setting-your-price' },
  'prise-de-parole': { fr: 'prendre-la-parole-en-public', en: 'speaking-in-public' },
  entretien: { fr: 'reussir-sa-presentation-en-entretien', en: 'introducing-yourself-in-an-interview' },
} as const satisfies Record<string, Record<Lang, string>>;

export type FicheId = keyof typeof FICHES;

/** Sous-adresses des parcours (point A du document de structure). */
export const SOUS_PAGES = {
  etape: { fr: 'etape-', en: 'step-' },
  fiche: { fr: 'ma-fiche', en: 'my-sheet' },
} as const;

/** Une « page » du site, identifiée de façon indépendante de la langue. */
export type PageRef =
  | { kind: 'route'; id: RouteId }
  | { kind: 'fiche'; id: FicheId }
  | { kind: 'etape'; parcours: 'orientation' | 'entreprendre' | 'activite' | 'competences'; n: number }
  | { kind: 'ma-fiche'; parcours: 'orientation' | 'entreprendre' | 'activite' | 'competences' }
  | { kind: '404' };

export function url(ref: PageRef, lang: Lang): string {
  switch (ref.kind) {
    case 'route':
      return ROUTES[ref.id][lang];
    case 'fiche':
      return `${ROUTES.ressources[lang]}${FICHES[ref.id][lang]}/`;
    case 'etape':
      return `${ROUTES[ref.parcours][lang]}${SOUS_PAGES.etape[lang]}${ref.n}/`;
    case 'ma-fiche':
      return `${ROUTES[ref.parcours][lang]}${SOUS_PAGES.fiche[lang]}/`;
    case '404':
      return lang === 'fr' ? '/' : '/en/';
  }
}

/** Raccourci pour les pages simples. */
export const r = (id: RouteId, lang: Lang) => ROUTES[id][lang];

/** Entrée du menu à souligner pour une page donnée. */
export function rubrique(ref: PageRef): RouteId | null {
  switch (ref.kind) {
    case 'route':
      if (['orientation', 'entreprendre', 'activite', 'competences'].includes(ref.id)) return 'etre-accompagne';
      if (ref.id === 'partenariat') return 'organisations';
      if (ref.id === 'mentions' || ref.id === 'confidentialite') return null;
      return ref.id;
    case 'fiche':
      return 'ressources';
    case 'etape':
    case 'ma-fiche':
      return 'etre-accompagne';
    default:
      return null;
  }
}
