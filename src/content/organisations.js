// 02-CONTENUS : 08-organisations.md (FR) / 08-organisations.md (EN, à relire D9).
// Mis à jour le 24/11 sur 02-CONTENUS (formats à distance, zones, délai de 5 jours ouvrés).
export default {
  fr: {
    ariane: ['Accueil', 'Organisations'],
    titre: "Votre partenaire pour concevoir et déployer vos programmes d'accompagnement.",
    texte: ["Vous êtes une ONG, une institution, une école, une université ou une organisation engagée dans le développement des compétences ?", "Entrepreneuriat Sénégal vous accompagne dans la conception, la mise en œuvre et l'évaluation de vos programmes de formation et de renforcement des capacités.", "De l'analyse des besoins à l'animation des activités, nous mobilisons des approches pédagogiques adaptées aux réalités des bénéficiaires et aux objectifs de votre organisation."],
    b1: 'Soumettre une demande de partenariat', b2: 'Nous écrire sur WhatsApp',
    servicesTitre: 'Nos services',
    services: [
      { titre: 'Conseil et diagnostic', accroche: 'Comprendre la situation avant d\'agir.', liste: ['Analyse des besoins', 'Identification des compétences à développer', 'Diagnostic des dispositifs existants', 'Recommandations opérationnelles'] },
      { titre: 'Ingénierie pédagogique', accroche: 'Concevoir un dispositif sur mesure.', liste: ['Conception de programmes', 'Élaboration de modules', 'Création de supports pédagogiques', 'Développement de parcours de formation'] },
      { titre: 'Mise en œuvre', accroche: 'Déployer les activités sur le terrain.', liste: ['Animation des formations', "Facilitation d'ateliers", 'Mobilisation de formateurs', 'Coordination des activités', 'Formation de formateurs'] },
      { titre: 'Suivi et évaluation', accroche: 'Mesurer les résultats et améliorer.', liste: ['Évaluation des acquis', 'Suivi des bénéficiaires', 'Mesure des résultats', 'Production de rapports', "Recommandations d'amélioration"] }
    ],
    servicesNote: "Vous pouvez faire appel à nous pour un seul de ces services, ou pour l'ensemble du cycle.",
    publicsTitre: 'Des programmes adaptés à vos bénéficiaires',
    publicsIntro: 'Nous accompagnons les organisations qui interviennent auprès :',
    publics: ['des femmes entrepreneures ;', 'des jeunes ;', 'des étudiants et apprenants ;', 'des porteurs de projets ;', 'des entrepreneurs ;', 'des communautés ;', 'des professionnels et collaborateurs.'],
    publicsNote: 'Nos dispositifs tiennent compte des niveaux d\'instruction, des langues et des réalités socio-économiques des participants.',
    themesTitre: 'Les thématiques que nous couvrons',
    themes: ['Entrepreneuriat', 'Soft skills et développement personnel', 'Employabilité', 'Ingénierie pédagogique et formation', 'Conseil, suivi et évaluation'],
    themesLien: 'Voir le détail de nos expertises',
    approcheTitre: 'Une démarche en 5 étapes',
    approche: [ { t: 'Comprendre', d: 'analyser les besoins, le contexte et les objectifs de votre organisation.' }, { t: 'Concevoir', d: 'construire un dispositif adapté à vos bénéficiaires et à vos moyens.' }, { t: 'Déployer', d: 'mobiliser les formateurs et les ressources, et réaliser les activités.' }, { t: 'Évaluer', d: 'mesurer les acquis et les résultats.' }, { t: 'Améliorer', d: 'formuler des recommandations pour la suite du programme.' } ],
    formatsTitre: 'Des formats adaptés à vos contraintes',
    formats: [ { t: 'Formations et ateliers en présentiel', d: 'dans vos locaux ou sur le terrain' }, { t: 'Formations à distance ou en format mixte', d: 'selon vos besoins et ceux de vos bénéficiaires' }, { t: 'Formation de formateurs', d: "pour démultiplier l'impact de votre programme" }, { t: 'Missions de conseil et de diagnostic', d: 'ponctuelles ou dans la durée' }, { t: "Accompagnement d'un programme complet", d: "de la conception à l'évaluation" }, { t: "Mobilisation d'un réseau de consultants et de formateurs", d: "selon les thématiques et les zones d'intervention" } ],
    zonesTitre: "Zones d'intervention", zones: "Basés à Thiès, nous intervenons dans toutes les régions du Sénégal et, selon les projets, à l'international.",
    plateformeTitre: "Vos bénéficiaires continuent d'apprendre après la formation",
    plateformeTexte: 'Nos parcours en ligne et nos fiches pratiques sont gratuits et accessibles sans inscription. Vos bénéficiaires peuvent les utiliser avant, pendant ou après vos activités pour réviser, s\'exercer et préparer leur plan d\'action.',
    plateformeLien: 'Découvrir les parcours',
    finTitre: 'Vous préparez un programme ou souhaitez renforcer les capacités de vos bénéficiaires ?',
    finTexte: "Parlons de votre projet. Décrivez-nous votre besoin en quelques minutes : nous revenons vers vous sous 5 jours ouvrés pour en discuter et, si cela vous convient, vous proposer une note d'intervention.",
    finBouton: 'Soumettre une demande de partenariat',
    autres: '+221 77 788 01 82 (téléphone et WhatsApp) · contact@entrepreneuriat.sn',
    form: {
      ariane: ['Accueil', 'Organisations', 'Demande de partenariat'],
      titre: 'Parlons de votre projet',
      texte: 'Quelques informations nous suffisent pour comprendre votre besoin. Les champs marqués d\'un astérisque (*) sont obligatoires.',
      blocs: [
        { titre: 'Votre organisation', champs: [
          { id: 'org', label: "Nom de l'organisation", type: 'text', req: true },
          { id: 'type', label: "Type d'organisation", type: 'select', req: true, options: ['ONG ou association', 'Organisation internationale', 'Institution publique', 'École, université ou centre de formation', 'Programme ou projet de développement', 'Entreprise', 'Autre'] },
          { id: 'region', label: 'Région ou pays', type: 'text' } ] },
        { titre: 'Vous', champs: [
          { id: 'nom', label: 'Nom et prénom', type: 'text', req: true },
          { id: 'fonction', label: 'Fonction', type: 'text' },
          { id: 'email', label: 'Adresse e-mail', type: 'email', req: true },
          { id: 'tel', label: 'Téléphone (WhatsApp de préférence)', type: 'tel', req: true } ] },
        { titre: 'Votre besoin', champs: [
          { id: 'services', label: 'Services recherchés', type: 'checks', req: true, options: ['Conseil et diagnostic', 'Ingénierie pédagogique', 'Mise en œuvre de formations', 'Formation de formateurs', 'Suivi et évaluation', 'Je ne sais pas encore'] },
          { id: 'themes', label: 'Thématiques', type: 'checks', options: ['Entrepreneuriat', 'Soft skills et développement personnel', 'Employabilité', 'Ingénierie pédagogique et formation', 'Conseil, suivi et évaluation', 'Autre'] },
          { id: 'public', label: 'Public visé', type: 'checks', options: ['Femmes', 'Jeunes', 'Étudiants et apprenants', 'Porteurs de projets', 'Entrepreneurs', 'Communautés', 'Professionnels et collaborateurs'] },
          { id: 'nombre', label: 'Nombre approximatif de bénéficiaires', type: 'select', options: ['moins de 30', '30 à 100', '100 à 500', 'plus de 500', 'je ne sais pas encore'] },
          { id: 'periode', label: 'Période souhaitée', type: 'text', placeholder: 'ex. « premier trimestre 2027 »' },
          { id: 'projet', label: 'Décrivez votre projet', type: 'textarea', req: true, max: 1500 },
          { id: 'doc', label: 'Document (termes de référence, note de projet…)', type: 'file', aide: 'PDF ou Word, 5 Mo max.' } ] }
      ],
      consentement: "J'accepte que les informations saisies soient utilisées par Entrepreneuriat Sénégal pour traiter ma demande et me recontacter.",
      enSavoirPlus: 'En savoir plus : Politique de confidentialité',
      envoyer: 'Envoyer ma demande',
      choisir: 'Choisir…',
      erreurs: { req: 'Ce champ est obligatoire.', email: 'Vérifiez votre adresse e-mail, par exemple nom@organisation.org.', fichier: 'Le document doit être un PDF ou un fichier Word de 5 Mo maximum.' },
      merciTitre: 'Merci, votre demande a bien été envoyée.',
      merciTexte: 'Nous l\'étudions et revenons vers vous sous 5 jours ouvrés, par e-mail ou par téléphone.',
      retour: "Retour à l'accueil"
    }
  },
  en: {
    ariane: ['Home', 'Organisations'],
    titre: 'Your partner in designing and delivering support programmes.',
    texte: ['Are you an NGO, an institution, a school, a university or an organisation committed to skills development?', 'Entrepreneuriat Sénégal supports you in designing, implementing and evaluating your training and capacity-building programmes.', "From needs assessment to delivering activities, we use teaching approaches suited to the realities of participants and to your organisation's objectives."],
    b1: 'Submit a partnership request', b2: 'Message us on WhatsApp',
    servicesTitre: 'Our services',
    services: [
      { titre: 'Advisory and assessment', accroche: 'Understand the situation before acting.', liste: ['Needs assessment', 'Identifying the skills to develop', 'Review of existing schemes', 'Operational recommendations'] },
      { titre: 'Learning design', accroche: 'Design a tailor-made programme.', liste: ['Programme design', 'Module development', 'Creation of learning materials', 'Development of training pathways'] },
      { titre: 'Implementation', accroche: 'Deliver activities in the field.', liste: ['Delivering training', 'Workshop facilitation', 'Mobilising trainers', 'Coordinating activities', 'Training of trainers'] },
      { titre: 'Monitoring and evaluation', accroche: 'Measure results and improve.', liste: ['Learning assessment', 'Participant follow-up', 'Measuring results', 'Reporting', 'Recommendations for improvement'] }
    ],
    servicesNote: 'You can call on us for just one of these services, or for the whole cycle.',
    publicsTitre: 'Programmes suited to your beneficiaries',
    publicsIntro: 'We support organisations working with:',
    publics: ['women entrepreneurs;', 'young people;', 'students and learners;', 'project holders;', 'entrepreneurs;', 'communities;', 'professionals and staff.'],
    publicsNote: "Our programmes take into account participants' levels of education, languages and socio-economic realities.",
    themesTitre: 'The topics we cover',
    themes: ['Entrepreneurship', 'Soft skills and personal development', 'Employability', 'Learning design and training', 'Advisory, monitoring and evaluation'],
    themesLien: 'See our expertise in detail',
    approcheTitre: 'A 5-step approach',
    approche: [ { t: 'Understand', d: "analyse your organisation's needs, context and objectives." }, { t: 'Design', d: 'build a programme suited to your beneficiaries and your resources.' }, { t: 'Deliver', d: 'mobilise trainers and resources, and carry out the activities.' }, { t: 'Evaluate', d: 'measure learning and results.' }, { t: 'Improve', d: 'make recommendations for the next phase of the programme.' } ],
    formatsTitre: 'Formats that fit your constraints',
    formats: [ { t: 'In-person training and workshops', d: 'at your premises or in the field' }, { t: 'Remote or blended training', d: 'depending on your needs and those of your beneficiaries' }, { t: 'Training of trainers', d: 'to multiply the impact of your programme' }, { t: 'Advisory and assessment assignments', d: 'one-off or long-term' }, { t: 'Support for a complete programme', d: 'from design to evaluation' }, { t: 'Mobilising a network of consultants and trainers', d: 'depending on topics and locations' } ],
    zonesTitre: 'Where we work', zones: 'Based in Thiès, we work in every region of Senegal and, depending on the project, internationally.',
    plateformeTitre: 'Your beneficiaries keep learning after the training',
    plateformeTexte: 'Our online pathways and practical guides are free and available without sign-up. Your beneficiaries can use them before, during or after your activities to revise, practise and prepare their action plan.',
    plateformeLien: 'Discover the pathways',
    finTitre: "Preparing a programme or looking to strengthen your beneficiaries' capacities?",
    finTexte: "Let's talk about your project. Describe your needs in a few minutes: we will get back to you within 5 working days to discuss it and, if you wish, send you a proposal note.",
    finBouton: 'Submit a partnership request',
    autres: '+221 77 788 01 82 (phone and WhatsApp) · contact@entrepreneuriat.sn',
    form: null // lot 5 : formulaire de demande de partenariat (02-CONTENUS/en/08, partie 2)
  }
};
