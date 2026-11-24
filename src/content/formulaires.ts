// Formulaires de contact et de demande de partenariat.
// Textes : 02-CONTENUS fr/12-contact.md et fr/08-organisations.md (partie 2), en/12-contact.md et en/08-organisations.md.
// La valeur envoyée d'une option est toujours son libellé français : l'e-mail interne reste en français
// quelle que soit la langue du formulaire (en/08, en/12), et public/api/envoyer.php vérifie ces mêmes listes.
import type { Lang } from '../i18n/routes';

export type Option = { v: string; fr: string; en: string };
const opts = (fr: string[], en: string[]): Option[] => fr.map((f, i) => ({ v: f, fr: f, en: en[i] }));

export type Champ = {
  id: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'cases' | 'fichier';
  label: Record<Lang, string>;
  req?: boolean;
  max?: number;
  options?: Option[];
  aide?: Record<Lang, string>;
  autocomplete?: string;
};

export const OBJETS_PARTENARIAT = ['Formation ou accompagnement pour une organisation', 'Proposition de partenariat'];

export const CONTACT_CHAMPS: Champ[] = [
  { id: 'nom', type: 'text', req: true, autocomplete: 'name', label: { fr: 'Nom et prénom', en: 'Full name' } },
  { id: 'organisation', type: 'text', autocomplete: 'organization', label: { fr: 'Organisation', en: 'Organisation' } },
  { id: 'email', type: 'email', req: true, autocomplete: 'email', label: { fr: 'Adresse e-mail', en: 'Email address' } },
  { id: 'tel', type: 'tel', autocomplete: 'tel', label: { fr: 'Téléphone (WhatsApp de préférence)', en: 'Phone (WhatsApp preferred)' } },
  {
    id: 'objet', type: 'select', req: true, label: { fr: 'Objet de votre demande', en: 'Subject of your request' },
    options: opts(
      ['Question sur un parcours ou une ressource', "Besoin d'orientation", 'Formation ou accompagnement pour une organisation', 'Proposition de partenariat', 'Autre'],
      ['Question about a pathway or a resource', 'Need for guidance', 'Training or support for an organisation', 'Partnership proposal', 'Other'],
    ),
  },
  { id: 'message', type: 'textarea', req: true, max: 1000, label: { fr: 'Message', en: 'Message' } },
];

export const PARTENARIAT_BLOCS: { titre: Record<Lang, string>; champs: Champ[] }[] = [
  {
    titre: { fr: 'Votre organisation', en: 'Your organisation' },
    champs: [
      { id: 'organisation', type: 'text', req: true, autocomplete: 'organization', label: { fr: "Nom de l'organisation", en: 'Organisation name' } },
      {
        id: 'type_organisation', type: 'select', req: true, label: { fr: "Type d'organisation", en: 'Type of organisation' },
        options: opts(
          ['ONG ou association', 'Organisation internationale', 'Institution publique', 'École, université ou centre de formation', 'Programme ou projet de développement', 'Entreprise', 'Autre'],
          ['NGO or association', 'International organisation', 'Public institution', 'School, university or training centre', 'Development programme or project', 'Company', 'Other'],
        ),
      },
      { id: 'region', type: 'text', label: { fr: 'Région ou pays', en: 'Region or country' } },
    ],
  },
  {
    titre: { fr: 'Vous', en: 'About you' },
    champs: [
      { id: 'nom', type: 'text', req: true, autocomplete: 'name', label: { fr: 'Nom et prénom', en: 'Full name' } },
      { id: 'fonction', type: 'text', autocomplete: 'organization-title', label: { fr: 'Fonction', en: 'Job title' } },
      { id: 'email', type: 'email', req: true, autocomplete: 'email', label: { fr: 'Adresse e-mail', en: 'Email address' } },
      { id: 'tel', type: 'tel', req: true, autocomplete: 'tel', label: { fr: 'Téléphone (WhatsApp de préférence)', en: 'Phone (WhatsApp preferred)' } },
    ],
  },
  {
    titre: { fr: 'Votre besoin', en: 'Your needs' },
    champs: [
      {
        id: 'services', type: 'cases', req: true, label: { fr: 'Services recherchés', en: 'Services you are looking for' },
        options: opts(
          ['Conseil et diagnostic', 'Ingénierie pédagogique', 'Mise en œuvre de formations', 'Formation de formateurs', 'Suivi et évaluation', 'Je ne sais pas encore'],
          ['Advisory and assessment', 'Learning design', 'Delivering training', 'Training of trainers', 'Monitoring and evaluation', "I don't know yet"],
        ),
      },
      {
        id: 'thematiques', type: 'cases', label: { fr: 'Thématiques', en: 'Topics' },
        options: opts(
          ['Entrepreneuriat', 'Soft skills et développement personnel', 'Employabilité', 'Ingénierie pédagogique et formation', 'Conseil, suivi et évaluation', 'Autre'],
          ['Entrepreneurship', 'Soft skills and personal development', 'Employability', 'Learning design and training', 'Advisory, monitoring and evaluation', 'Other'],
        ),
      },
      {
        id: 'publics', type: 'cases', label: { fr: 'Public visé', en: 'Target group' },
        options: opts(
          ['Femmes', 'Jeunes', 'Étudiants et apprenants', 'Porteurs de projets', 'Entrepreneurs', 'Communautés', 'Professionnels et collaborateurs'],
          ['Women', 'Young people', 'Students and learners', 'Project holders', 'Entrepreneurs', 'Communities', 'Professionals and staff'],
        ),
      },
      {
        id: 'beneficiaires', type: 'select', label: { fr: 'Nombre approximatif de bénéficiaires', en: 'Approximate number of beneficiaries' },
        options: opts(
          ['moins de 30', '30 à 100', '100 à 500', 'plus de 500', 'je ne sais pas encore'],
          ['fewer than 30', '30 to 100', '100 to 500', 'more than 500', "I don't know yet"],
        ),
      },
      { id: 'periode', type: 'text', label: { fr: 'Période souhaitée', en: 'Preferred timing' }, aide: { fr: 'ex. « premier trimestre 2027 »', en: 'e.g. "first quarter of 2027"' } },
      { id: 'projet', type: 'textarea', req: true, max: 1500, label: { fr: 'Décrivez votre projet', en: 'Describe your project' } },
      {
        id: 'document', type: 'fichier', label: { fr: 'Document (termes de référence, note de projet…)', en: 'Document (terms of reference, project note…)' },
        aide: { fr: 'PDF ou Word, 5 Mo maximum', en: 'PDF or Word, 5 MB maximum' },
      },
    ],
  },
];

export const TEXTES = {
  fr: {
    contact: {
      consentement: "J'accepte que mes informations soient utilisées pour répondre à ma demande.",
      bouton: 'Envoyer',
      merci: 'Merci, votre message a bien été envoyé. Nous vous répondrons dès que possible.',
      email: 'Vérifiez votre adresse e-mail, par exemple nom@exemple.com.',
      echec: "Votre message n'a pas pu être envoyé. Réessayez dans un instant, ou écrivez-nous sur WhatsApp au +221 77 788 01 82.",
      renvoi: 'Pour une demande plus complète, utilisez notre formulaire de partenariat',
    },
    partenariat: {
      ariane: ['Accueil', 'Organisations', 'Demande de partenariat'],
      titre: 'Parlons de votre projet',
      texte: "Quelques informations nous suffisent pour comprendre votre besoin. Les champs marqués d'un astérisque (*) sont obligatoires.",
      consentement: "J'accepte que les informations saisies soient utilisées par Entrepreneuriat Sénégal pour traiter ma demande et me recontacter.",
      enSavoirPlus: 'En savoir plus : ',
      bouton: 'Envoyer ma demande',
      merciTitre: 'Merci, votre demande a bien été envoyée.',
      merci: "Nous l'étudions et revenons vers vous sous 5 jours ouvrés, par e-mail ou par téléphone.",
      retour: "Retour à l'accueil",
      email: 'Vérifiez votre adresse e-mail, par exemple nom@organisation.org.',
      fichier: 'Le document doit être un PDF ou un fichier Word de 5 Mo maximum.',
      echec: "Votre demande n'a pas pu être envoyée. Réessayez dans un instant, ou écrivez-nous à contact@entrepreneuriat.sn ou sur WhatsApp au +221 77 788 01 82.",
    },
    requis: 'Ce champ est obligatoire.',
    politique: 'Politique de confidentialité',
    choisir: 'Choisir…',
    envoi: 'Envoi en cours…',
    caracteres: 'caractères',
    obligatoire: 'obligatoire',
    apercu: "Aperçu : ce formulaire ne s'envoie pas encore. Il sera ouvert après la déclaration à la CDP.",
    apercuEnvoi: "Aperçu : tout est correct, mais rien n'a été envoyé.",
  },
  en: {
    contact: {
      consentement: 'I agree that my information may be used to respond to my request.',
      bouton: 'Send',
      merci: 'Thank you, your message has been sent. We will get back to you as soon as possible.',
      email: 'Please check your email address, for example name@example.com.',
      echec: 'Your message could not be sent. Please try again in a moment, or message us on WhatsApp at +221 77 788 01 82.',
      renvoi: 'For a more complete request, please use our partnership form',
    },
    partenariat: {
      ariane: ['Home', 'Organisations', 'Partnership request'],
      titre: "Let's talk about your project",
      texte: 'A little information is all we need to understand your needs. Fields marked with an asterisk (*) are required.',
      consentement: 'I agree that the information I have entered may be used by Entrepreneuriat Sénégal to process my request and contact me.',
      enSavoirPlus: 'Learn more: ',
      bouton: 'Send my request',
      merciTitre: 'Thank you, your request has been sent.',
      merci: 'We will review it and get back to you within 5 working days, by email or phone.',
      retour: 'Back to home',
      email: 'Please check your email address, for example name@organisation.org.',
      fichier: 'The document must be a PDF or Word file of 5 MB maximum.',
      echec: 'Your request could not be sent. Please try again in a moment, or write to us at contact@entrepreneuriat.sn or on WhatsApp at +221 77 788 01 82.',
    },
    requis: 'This field is required.',
    politique: 'Privacy policy',
    choisir: 'Choose…',
    envoi: 'Sending…',
    caracteres: 'characters',
    obligatoire: 'required',
    apercu: 'Preview: this form does not send anything yet. It will open once the CDP declaration has been made.',
    apercuEnvoi: 'Preview: everything is correct, but nothing has been sent.',
  },
};
