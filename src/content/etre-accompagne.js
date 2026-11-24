// 02-CONTENUS : 02-etre-accompagne.md (FR) / 02-get-support.md (EN)
export default {
  fr: {
    ariane: ['Accueil', 'Être accompagné'],
    titre: 'Avancez à votre rythme, une étape après l\'autre.',
    texte: ["Que vous cherchiez votre voie, que vous ayez une idée de projet ou une activité à faire grandir, nos parcours vous aident à y voir plus clair et à passer à l'action.", 'Ils sont gratuits, accessibles sans inscription, et pensés pour les réalités du Sénégal.'],
    commentTitre: 'Comment ça marche ?',
    comment: [
      { titre: 'Choisissez votre parcours', texte: "Celui qui correspond le mieux à votre situation aujourd'hui. Vous pourrez toujours en suivre un autre ensuite." },
      { titre: 'Avancez étape par étape', texte: 'Chaque étape propose une explication simple, un exemple concret, un petit exercice et une action à réaliser.' },
      { titre: "Repartez avec votre plan d'action", texte: "À la fin, vous remplissez votre fiche personnelle : votre objectif, vos besoins et vos prochaines actions. Vous pouvez l'imprimer ou l'enregistrer en PDF." }
    ],
    confidentialite: 'Vos réponses restent sur votre téléphone ou votre ordinateur. Elles ne nous sont pas envoyées.',
    parcoursTitre: 'Quel parcours vous ressemble ?',
    pourQui: 'Pour qui ?',
    parcours: [
      { id: 'orientation', icone: 'parcours-orientation', lettre: 'A', titre: 'Je cherche mon orientation', pour: 'Les jeunes, les étudiants, les personnes en recherche d\'emploi ou en reconversion.', intro: 'Vous allez :', liste: ['identifier ce qui vous intéresse et ce qui vous motive ;', 'découvrir vos aptitudes et reconnaître vos compétences ;', 'explorer des métiers et des possibilités professionnelles ;', 'construire un premier plan d\'action.'] },
      { id: 'entreprendre', icone: 'parcours-entreprendre', lettre: 'B', titre: 'Je veux entreprendre', pour: 'Celles et ceux qui ont envie de se lancer, avec ou sans idée précise.', intro: 'Vous allez :', liste: ["comprendre ce qu'entreprendre veut dire, concrètement ;", 'repérer un problème à résoudre autour de vous ;', 'trouver ou clarifier votre idée ;', 'identifier vos futurs clients et étudier votre marché ;', 'définir ce qui rend votre offre utile, et préparer vos premières actions.'] },
      { id: 'activite', icone: 'parcours-developper-activite', lettre: 'C', titre: 'Je veux développer mon activité', pour: 'Les entrepreneurs et responsables de petites activités, déjà lancés.', intro: 'Vous allez :', liste: ['mieux comprendre vos ventes et vos dépenses ;', 'connaître vos clients et améliorer votre relation avec eux ;', 'organiser votre activité et fixer vos prix ;', 'développer votre visibilité et repérer vos pistes de croissance.'] },
      { id: 'competences', icone: 'parcours-competences', lettre: 'D', titre: 'Je veux développer mes compétences', pour: 'Toute personne qui veut progresser, dans sa vie personnelle comme professionnelle.', intro: 'Vous allez travailler :', liste: ['la confiance en soi et la prise de parole ;', "la communication et le travail d'équipe ;", 'le leadership et la gestion du temps ;', 'la résolution de problèmes et la préparation à la vie professionnelle.'] }
    ],
    bouton: 'Commencer ce parcours',
    hesiteTitre: 'Vous hésitez entre plusieurs parcours ?',
    hesite: [
      { avant: 'Vous ne savez pas encore quel métier ou quelle activité vous correspond : commencez par ', lien: 'Je cherche mon orientation', id: 'orientation' },
      { avant: 'Vous avez envie de créer quelque chose, même sans idée précise : choisissez ', lien: 'Je veux entreprendre', id: 'entreprendre' },
      { avant: 'Vous avez déjà une activité, même petite ou informelle : allez vers ', lien: 'Je veux développer mon activité', id: 'activite' },
      { avant: 'Vous voulez surtout gagner en confiance et en efficacité : prenez ', lien: 'Je veux développer mes compétences', id: 'competences' }
    ],
    plusTitre: 'Pour aller plus loin',
    ressTexte: 'Nos fiches pratiques complètent les parcours : une notion, un exemple, un exercice.', ressBouton: 'Voir les ressources',
    contactTexte: 'Une question sur un parcours ou sur votre situation ? Écrivez-nous.', waBouton: 'Nous écrire sur WhatsApp', contactBouton: 'Nous contacter',
    faqTitre: 'Questions fréquentes',
    faq: [
      { q: "C'est vraiment gratuit ?", r: 'Oui. Les parcours, les exercices, les fiches pratiques et votre plan d\'action sont gratuits, sans inscription.' },
      { q: 'Est-ce que je dois créer un compte ?', r: 'Non. Vous pouvez commencer tout de suite. Pensez à imprimer ou à enregistrer votre fiche personnelle à la fin du parcours.' },
      { q: 'Mes réponses sont-elles envoyées quelque part ?', r: 'Non. Ce que vous écrivez dans les exercices et dans votre fiche reste sur votre appareil.' },
      { q: "Est-ce qu'un conseiller va me suivre personnellement ?", r: 'Les parcours sont conçus pour que vous puissiez avancer en autonomie. Si votre situation demande un regard extérieur, vous pouvez nous écrire : nous vous orienterons vers la bonne ressource ou vers une structure compétente.' },
      { q: 'Le parcours garantit-il un financement ou la réussite de mon projet ?', r: 'Non. Les parcours vous aident à clarifier votre projet et à préparer vos actions. Ils ne remplacent ni un financement, ni les démarches officielles.' }
    ]
  },
  en: {
    ariane: ['Home', 'Get support'],
    titre: 'Move forward at your own pace, one step at a time.',
    texte: ['Whether you are looking for your path, have a business idea or want to grow an existing activity, our pathways help you see things more clearly and take action.', 'They are free, require no sign-up, and are designed for life in Senegal.'],
    commentTitre: 'How does it work?',
    comment: [
      { titre: 'Choose your pathway', texte: 'The one that best matches your situation today. You can always follow another one later.' },
      { titre: 'Move forward step by step', texte: 'Each step offers a simple explanation, a real-life example, a short exercise and an action to take.' },
      { titre: 'Leave with your action plan', texte: 'At the end, you fill in your personal sheet: your goal, your needs and your next actions. You can print it or save it as a PDF.' }
    ],
    confidentialite: 'Your answers stay on your phone or computer. They are not sent to us.',
    parcoursTitre: 'Which pathway is right for you?',
    pourQui: 'Who is it for?',
    parcours: [
      { id: 'orientation', icone: 'parcours-orientation', lettre: 'A', titre: 'Find my direction', pour: 'Young people, students, job seekers and people changing careers.', intro: 'You will:', liste: ['identify what interests and motivates you;', 'discover your aptitudes and recognise your skills;', 'explore careers and professional opportunities;', 'build a first action plan.'] },
      { id: 'entreprendre', icone: 'parcours-entreprendre', lettre: 'B', titre: 'Start a business', pour: 'Anyone who wants to get started, with or without a clear idea.', intro: 'You will:', liste: ['understand what being an entrepreneur really means;', 'spot a problem worth solving around you;', 'find or refine your idea;', 'identify your future customers and study your market;', 'define what makes your offer useful, and plan your first actions.'] },
      { id: 'activite', icone: 'parcours-developper-activite', lettre: 'C', titre: 'Grow my business', pour: 'Entrepreneurs and people running small businesses that are already up and running.', intro: 'You will:', liste: ['better understand your sales and costs;', 'know your customers and improve your relationship with them;', 'organise your business and set your prices;', 'become more visible and identify ways to grow.'] },
      { id: 'competences', icone: 'parcours-competences', lettre: 'D', titre: 'Build my skills', pour: 'Anyone who wants to grow, personally and professionally.', intro: 'You will work on:', liste: ['self-confidence and public speaking;', 'communication and teamwork;', 'leadership and time management;', 'problem-solving and readiness for working life.'] }
    ],
    bouton: 'Start this pathway',
    hesiteTitre: 'Torn between several pathways?',
    hesite: [
      { avant: "You don't yet know which job or activity suits you: start with ", lien: 'Find my direction', id: 'orientation' },
      { avant: 'You want to create something, even without a clear idea: choose ', lien: 'Start a business', id: 'entreprendre' },
      { avant: 'You already run an activity, even a small or informal one: go to ', lien: 'Grow my business', id: 'activite' },
      { avant: 'Above all, you want to gain confidence and be more effective: take ', lien: 'Build my skills', id: 'competences' }
    ],
    plusTitre: 'Going further',
    ressTexte: 'Our practical guides complement the pathways: one concept, one example, one exercise.', ressBouton: 'See resources',
    contactTexte: 'A question about a pathway or your situation? Write to us.', waBouton: 'Message us on WhatsApp', contactBouton: 'Contact us',
    faqTitre: 'Frequently asked questions',
    faq: [
      { q: 'Is it really free?', r: 'Yes. The pathways, exercises, practical guides and your action plan are free, with no sign-up.' },
      { q: 'Do I need to create an account?', r: 'No. You can start right away. Remember to print or save your personal sheet at the end of the pathway.' },
      { q: 'Are my answers sent anywhere?', r: 'No. What you write in the exercises and on your sheet stays on your device.' },
      { q: 'Will an adviser follow me personally?', r: 'The pathways are designed so that you can move forward on your own. If your situation needs an outside view, you can write to us: we will point you to the right resource or to a qualified organisation.' },
      { q: 'Does the pathway guarantee funding or the success of my project?', r: 'No. The pathways help you clarify your project and prepare your actions. They do not replace funding or official procedures.' }
    ]
  }
};
