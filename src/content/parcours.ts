// Les 4 parcours guidés. Les textes viennent de parcours.json, généré depuis 02-CONTENUS
// (fr/03 à 06, en/03 à 06) par scripts/parcours-depuis-md.py : ne pas modifier le JSON à la main.
// Ce fichier ajoute ce que les textes décrivent sans le chiffrer : champs numériques, calculs,
// correspondance entre les réponses et les rubriques de la fiche finale (tableaux « Pré-remplie à partir de »).
import DATA from './parcours.json';
import type { Lang } from '../i18n/routes';

export type ParcoursId = 'entreprendre' | 'activite' | 'orientation' | 'competences';
export const PARCOURS_IDS: ParcoursId[] = ['orientation', 'entreprendre', 'activite', 'competences'];

export type Bloc = { p?: string; ul?: string[]; ol?: string[] };
export type Item =
  | { type: 'texte'; id: string; label: string; hint?: string }
  | { type: 'cases'; id: string; label: string; options: string[]; max: number }
  | { type: 'calcul'; label: string; apres?: boolean }
  | { type: 'consigne'; t: string };
export type Etape = {
  n: number; titre: string; essentiel: Bloc[]; exempleTitre: string; exemple: Bloc[];
  exercice: string; exerciceNote?: string; champs: Item[]; action: string;
};
type Suite = { texte: string; ref?: string; liens?: { label: string; ref: string }[] };
export type Parcours = {
  id: ParcoursId; seoTitre: string; seoDescription: string; titre: string; sousTitre: string;
  texte: string[]; reperes: string[]; persoTitre: string; perso: string; persoNote: string | null;
  commencer: string | null; etapes: Etape[];
  autoDepart?: { titre: string; texte: string; echelle: string; competences: { nom: string; desc: string }[]; message: string; boutons: string[] };
  autoFin?: { titre: string; texte: string };
  fin: { titre: string; texte: string; pied: string; boutons: string[]; suite: Suite[]; rappel: string };
};

export const PARCOURS = DATA as unknown as Record<Lang, Record<ParcoursId, Parcours>>;

/** Clés du stockage local (rien n'est envoyé au serveur, D2). Réponses partagées entre FR et EN. */
export const cle = (id: ParcoursId) => `es-parcours-${id}`;
export const CLE_NOTES = 'es-parcours-competences-notes';

/** Prénom du personnage fil rouge, pour l'illustration et la pastille. */
export const PERSO: Record<ParcoursId, string> = { entreprendre: 'Awa', activite: 'Awa', orientation: 'Ibrahima', competences: 'Khady' };

/** Champs saisis en chiffres (FCFA). */
export const NOMBRES: Partial<Record<ParcoursId, string[]>> = {
  entreprendre: ['s6_3', 's6_4'],
  activite: ['s1_1', 's1_2', 's1_3', 's5_2', 's5_3'],
};

/**
 * Calculs automatiques (« simples additions et soustractions faites à l'écran »).
 * cible = identifiant du résultat. Pour Entreprendre, le champ « Ce qu'il me reste par vente » devient le résultat.
 */
export type Calcul = { cible: string; plus: string[]; moins: string[]; etape: number; libelle: Record<Lang, string> };
export const CALCULS: Partial<Record<ParcoursId, Calcul[]>> = {
  entreprendre: [{ cible: 's6_5', plus: ['s6_3'], moins: ['s6_4'], etape: 6, libelle: { fr: "Ce qu'il me reste par vente", en: 'What I have left per sale' } }],
  activite: [
    { cible: 's1_resultat', plus: ['s1_1'], moins: ['s1_2', 's1_3'], etape: 1, libelle: { fr: 'Résultat du mois', en: 'Result for the month' } },
    { cible: 's5_marge', plus: ['s5_3'], moins: ['s5_2'], etape: 5, libelle: { fr: 'Marge par vente', en: 'Margin per sale' } },
  ],
};

/** Rubriques de la fiche finale (structure du cahier §9), dans l'ordre. */
export const RUBRIQUES = ['objectif', 'situation', 'elements', 'besoins', 'approfondir', 'actions'] as const;
export type RubriqueId = (typeof RUBRIQUES)[number];
export const NOMS_RUBRIQUES: Record<Lang, Record<RubriqueId, string>> = {
  fr: { objectif: 'Mon objectif', situation: 'Ma situation actuelle', elements: 'Les éléments identifiés', besoins: 'Mes besoins', approfondir: 'Mes points à approfondir', actions: 'Mes prochaines actions' },
  en: { objectif: 'My goal', situation: 'My current situation', elements: 'What I have identified', besoins: 'My needs', approfondir: 'Points to explore further', actions: 'My next actions' },
};

/**
 * Contenu de chaque rubrique : identifiants de champs, puis éléments spéciaux.
 * 'libre:<nom>' = champ libre rempli sur la fiche ; 'actions-etapes' = les « Ma prochaine action » des étapes ;
 * 'priorites' et 'notes' = auto-évaluation (Compétences).
 */
export const FICHE: Record<ParcoursId, Record<RubriqueId, string[]>> = {
  entreprendre: {
    objectif: ['s1_2'],
    situation: ['s1_1', 's1_3'],
    elements: ['s2_4', 's3_4', 's4_1', 's4_2', 's5_3', 's5_4', 's6_1', 's6_2', 's6_3', 's6_4', 's6_5'],
    besoins: ['s7_4'],
    approfondir: ['libre:approfondir'],
    actions: ['s7_1', 's7_2', 's7_3'],
  },
  activite: {
    objectif: ['s7_1', 's7_2'],
    situation: ['s1_1', 's1_2', 's1_3', 's1_resultat', 's2_1'],
    elements: ['s3_1', 's3_2', 's3_3', 's4_4', 's5_1', 's5_2', 's5_3', 's5_marge', 's5_6', 's6_2'],
    besoins: ['s7_6'],
    approfondir: ['libre:approfondir'],
    actions: ['s7_3', 's7_4', 's7_5', 'actions-etapes:1-6'],
  },
  orientation: {
    objectif: ['s6_1', 's6_2'],
    situation: ['s4_1', 's4_2', 's4_3', 's4_4'],
    elements: ['s1_1', 's2_1', 's2_3', 's3_2', 's3_3', 's5_1', 's5_2', 's5_3'],
    besoins: ['s6_6'],
    approfondir: ['s5_5', 'libre:approfondir'],
    actions: ['s6_3', 's6_4', 's6_5'],
  },
  competences: {
    objectif: ['priorites', 'libre:ameliorer'],
    situation: ['notes'],
    elements: ['s1_1', 's1_3', 's2_1', 's2_2', 's2_3', 's4_2', 's7_1'],
    besoins: ['s7_4'],
    approfondir: ['s7_2', 'libre:approfondir'],
    actions: ['actions-etapes:suivies'],
  },
};

export const UI = {
  fr: {
    accueil: 'Accueil', etreAccompagne: 'Être accompagné',
    etape: 'Étape', sur: 'sur', etapeN: (n: number) => `Étape ${n}`, progression: (n: number, t: number) => `Étape ${n} sur ${t}`,
    sommaire: 'Les étapes', essentiel: "L'essentiel", exercice: 'Exercice : ', action: 'Ma prochaine action',
    precedent: 'Étape précédente', suivant: 'Étape suivante', terminer: 'Voir ma fiche personnelle',
    enregistre: 'Enregistré sur cet appareil', effacer: 'Effacer mes réponses',
    effacerConfirm: 'Effacer toutes vos réponses à ce parcours sur cet appareil ?',
    fcfa: 'FCFA', aCompleter: 'à compléter', maFiche: 'Ma fiche personnelle', fiche: 'Fiche personnelle',
    leDate: 'Le', parcours: 'Parcours', etMaintenant: 'Et maintenant ?', ameliorer: 'Ce que je veux améliorer', priorites: 'Mes 2 compétences prioritaires',
    approfondirAide: 'Notez ici ce que vous voulez approfondir.', ameliorerAide: 'Notez ici ce que vous voulez améliorer.',
    depart: 'Départ', fin: "Aujourd'hui", note: 'Note', ecart: 'Écart', noteDe: (c: string) => `Votre note pour : ${c}`,
    notesManquantes: "Faites l'auto-évaluation au début du parcours pour voir vos notes ici.",
    illustration: (p: string) => `${p}, personnage fictif`,
  },
  en: {
    accueil: 'Home', etreAccompagne: 'Get support',
    etape: 'Step', sur: 'of', etapeN: (n: number) => `Step ${n}`, progression: (n: number, t: number) => `Step ${n} of ${t}`,
    sommaire: 'The steps', essentiel: 'The essentials', exercice: 'Exercise: ', action: 'My next action',
    precedent: 'Previous step', suivant: 'Next step', terminer: 'See my personal sheet',
    enregistre: 'Saved on this device', effacer: 'Clear my answers',
    effacerConfirm: 'Clear all your answers to this pathway on this device?',
    fcfa: 'CFA francs', aCompleter: 'to be completed', maFiche: 'My personal sheet', fiche: 'Personal sheet',
    leDate: '', parcours: 'Pathway', etMaintenant: 'What next?', ameliorer: 'What I want to improve', priorites: 'My 2 priority skills',
    approfondirAide: 'Note here what you would like to explore further.', ameliorerAide: 'Note here what you would like to improve.',
    depart: 'Start', fin: 'Today', note: 'Rating', ecart: 'Change', noteDe: (c: string) => `Your rating for: ${c}`,
    notesManquantes: 'Take the self-assessment at the start of the pathway to see your ratings here.',
    illustration: (p: string) => `${p}, fictional character`,
  },
};

/** Libellé court d'un identifiant de champ ou de calcul, pour la fiche finale. */
export function libelle(p: Parcours, lang: Lang, id: string): string {
  const calc = CALCULS[p.id]?.find((c) => c.cible === id);
  if (calc) return calc.libelle[lang];
  for (const e of p.etapes) for (const c of e.champs) if ('id' in c && c.id === id) return c.label;
  throw new Error(`Champ inconnu : ${p.id} ${id}`);
}
