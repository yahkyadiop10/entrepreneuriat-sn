// 02-CONTENUS : 12-contact.md (FR) / 12-contact.md (EN, à relire D9).
export default {
  "fr": {
    "ariane": [
      "Accueil",
      "Contact"
    ],
    "titre": "Parlons de votre projet.",
    "texte": "Vous souhaitez être orienté, découvrir nos ressources, organiser une formation ou solliciter un accompagnement pour votre organisation ? Notre équipe est à votre écoute.",
    "partTitre": "Vous êtes un particulier",
    "partIntro": "Pour avancer tout de suite, sans attendre :",
    "partListe": [
      {
        "b": "Suivre un parcours",
        "d": " guidé et gratuit",
        "id": "etre-accompagne"
      },
      {
        "b": "Consulter les fiches pratiques",
        "d": "",
        "id": "ressources"
      },
      {
        "b": "Nous poser une question",
        "d": " sur WhatsApp ou par le formulaire ci-dessous",
        "id": "form"
      }
    ],
    "partNote": "Nous répondons à toutes les questions, mais nous ne pouvons pas assurer un suivi individuel régulier et gratuit. Nos parcours sont conçus pour vous permettre d'avancer en autonomie.",
    "orgTitre": "Vous représentez une organisation",
    "orgListe": [
      "Demander une proposition technique",
      "Solliciter un diagnostic",
      "Présenter un projet",
      "Demander une intervention"
    ],
    "orgBouton": "Soumettre une demande de partenariat",
    "orgNote": "Réponse sous 5 jours ouvrés.",
    "coordTitre": "Nos coordonnées",
    "coord": [
      {
        "k": "WhatsApp et téléphone",
        "v": "+221 77 788 01 82",
        "icone": "ui-telephone"
      },
      {
        "k": "E-mail",
        "v": "contact@entrepreneuriat.sn",
        "icone": "ui-email"
      },
      {
        "k": "Adresse",
        "v": "Thiès, Sénégal",
        "icone": "ui-lieu"
      },
      {
        "k": "Horaires",
        "v": "du lundi au vendredi, de 9 h à 18 h",
        "icone": "etape-5-mesurer"
      }
    ],
    "waBouton": "Nous écrire sur WhatsApp",
    "formTitre": "Écrivez-nous",
    "champs": [
      {
        "id": "nom",
        "label": "Nom et prénom",
        "type": "text",
        "req": true
      },
      {
        "id": "org",
        "label": "Organisation",
        "type": "text"
      },
      {
        "id": "email",
        "label": "Adresse e-mail",
        "type": "email",
        "req": true
      },
      {
        "id": "tel",
        "label": "Téléphone (WhatsApp de préférence)",
        "type": "tel"
      },
      {
        "id": "objet",
        "label": "Objet de votre demande",
        "type": "select",
        "req": true,
        "options": [
          "Question sur un parcours ou une ressource",
          "Besoin d'orientation",
          "Formation ou accompagnement pour une organisation",
          "Proposition de partenariat",
          "Autre"
        ]
      },
      {
        "id": "message",
        "label": "Message",
        "type": "textarea",
        "req": true,
        "max": 1000
      }
    ],
    "renvoi": "Pour une demande plus complète, utilisez notre formulaire de partenariat",
    "consentement": "J'accepte que mes informations soient utilisées pour répondre à ma demande.",
    "politique": "Politique de confidentialité",
    "envoyer": "Envoyer",
    "choisir": "Choisir…",
    "erreurs": {
      "req": "Ce champ est obligatoire.",
      "email": "Vérifiez votre adresse e-mail, par exemple nom@exemple.com."
    },
    "merci": "Merci, votre message a bien été envoyé. Nous vous répondrons dès que possible."
  },
  "en": null
};
