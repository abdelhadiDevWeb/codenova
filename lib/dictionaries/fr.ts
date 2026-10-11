import type { Dictionary } from "./types";

// French typography: non-breaking spaces (\u00a0) inside numbers and before "?".
export const fr: Dictionary = {
  meta: {
    title: "CodeNova — Agence de développement digital",
    description:
      "CodeNova crée des solutions digitales sur mesure pour les entreprises modernes : sites web, landing pages, e-commerce, design UI/UX, applications mobiles et logiciels desktop.",
  },
  site: {
    tagline: "Agence de développement digital",
    description:
      "Nous créons des solutions digitales sur mesure pour les entreprises modernes. Des landing pages percutantes aux applications mobiles complexes, nous donnons vie à votre vision.",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Méthode", href: "#process" },
    { label: "Pourquoi CodeNova", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ],
  header: {
    home: "CodeNova — accueil",
    catalogue: "Catalogue",
    downloadCatalogue: "Télécharger le catalogue",
    getQuote: "Demander un devis",
    freeConsultation: "Consultation gratuite",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
  },
  hero: {
    titleStart: "Nous créons des solutions digitales sur mesure pour les",
    titleHighlight: "entreprises modernes",
    titleEnd: ".",
    description:
      "Des landing pages percutantes aux applications mobiles complexes, nous donnons vie à votre vision — avec un code de qualité, un design soigné et des prix clairs.",
    highlights: ["Consultation gratuite", "Tarifs transparents en DA", "De l'idée au marché"],
    secureTitle: "Sécurisé et rapide",
    secureSubtitle: "Code de qualité",
    mobileTitle: "iOS et Android",
    mobileSubtitle: "Applications mobiles",
  },
  services: {
    eyebrow: "Nos services",
    title: "Tout ce dont votre entreprise a besoin pour grandir en ligne",
    description:
      "Solutions web, design, mobile et desktop — chacune pensée autour de vos objectifs et de vos clients.",
    items: [
      {
        icon: "web",
        title: "Développement web",
        description:
          "Des expériences web rapides, responsives et évolutives, adaptées à vos objectifs — d'une simple présence en ligne à une boutique e-commerce robuste.",
        features: [
          { title: "Sites d'entreprise", detail: "Une identité professionnelle." },
          { title: "Sites e-commerce", detail: "Des boutiques en ligne sécurisées et performantes." },
          { title: "Plateformes web sur mesure", detail: "Applications et portails web adaptés." },
          { title: "Landing pages", detail: "Sites d'une page optimisés pour vos campagnes." },
        ],
      },
      {
        icon: "design",
        title: "Design UI/UX",
        description:
          "Un bon logiciel commence par un bon design. Nous créons des interfaces intuitives et des expériences fluides qui captivent votre audience et valorisent votre marque.",
        features: [
          { title: "Design d'interface et identité visuelle" },
          { title: "Conception de l'expérience utilisateur et des mises en page" },
          { title: "Wireframes interactifs et prototypes haute fidélité" },
        ],
      },
      {
        icon: "mobile",
        title: "Développement d'applications mobiles",
        description:
          "Touchez vos clients où qu'ils soient avec des applications puissantes à l'expérience native, conçues pour la performance et la fidélisation.",
        features: [
          { title: "Applications iOS", detail: "Une expérience fluide sur les appareils Apple." },
          { title: "Applications Android", detail: "Une large portée sur l'écosystème Android." },
          { title: "Solutions mobiles sur mesure", detail: "Intégration à vos systèmes et API existants." },
        ],
      },
      {
        icon: "desktop",
        title: "Logiciels desktop sur mesure",
        description:
          "Équipez votre équipe de solutions desktop adaptées. Nous développons des logiciels sécurisés et performants pour vos opérations internes et votre gestion.",
        features: [
          { title: "Systèmes de gestion d'entreprise (ERP/CRM)" },
          { title: "Outils opérationnels internes" },
          { title: "Logiciels avancés de gestion de stock" },
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "Tarifs transparents",
    title: "Des prix clairs, sans surprise",
    description: "Chaque projet reçoit un devis adapté à vos besoins. Voici nos prix de départ.",
    items: [
      {
        title: "Landing page",
        price: "20\u00a0000",
        unit: "DA",
        description: "Un site d'une page optimisé pour votre campagne, produit ou événement.",
      },
      {
        title: "Sites web",
        prefix: "À partir de",
        price: "50\u00a0000",
        unit: "DA",
        description: "Sites d'entreprise, boutiques e-commerce et plateformes web sur mesure.",
      },
      {
        title: "Design UI/UX",
        price: "5\u00a0000",
        unit: "DA / page",
        description: "Design d'interface, mises en page, wireframes et prototypes haute fidélité.",
      },
      {
        title: "Application mobile",
        prefix: "À partir de",
        price: "200\u00a0000",
        unit: "DA",
        description: "Applications iOS et Android à l'expérience native, intégrées à vos systèmes.",
        note: "Le prix final dépend des fonctionnalités demandées et de la complexité technique.",
      },
      {
        title: "Logiciel desktop",
        price: "Sur devis",
        description: "ERP/CRM, outils internes et logiciels de gestion de stock conçus pour vos opérations.",
        note: "Prix déterminé selon les besoins du projet.",
      },
    ],
    ctaTitle: "Besoin d'un devis personnalisé\u00a0?",
    ctaDescription:
      "Parlez-nous de votre projet et nous vous recommanderons la solution et le prix adaptés.",
    ctaCatalogue: "Catalogue complet (PDF)",
  },
  consultation: {
    badge: "100\u00a0% gratuite · Sans engagement",
    eyebrow: "Consultation gratuite",
    title: "Parlons de votre idée — le premier rendez-vous est offert",
    description:
      "Réservez une consultation gratuite avec notre équipe. Nous étudions votre idée avec vous et vous accompagnons de la toute première idée jusqu'à la mise sur le marché de votre produit.",
    book: "Réserver ma consultation gratuite",
    call: "Appeler le",
    stepsTitle: "Ce qui se passe pendant votre consultation",
    steps: [
      {
        icon: "listen",
        title: "Nous écoutons votre idée",
        description: "Vos objectifs, vos clients et votre budget — nous prenons le temps de comprendre votre projet.",
      },
      {
        icon: "showcase",
        title: "Nous présentons nos projets réalisés",
        description:
          "Découvrez des réalisations concrètes, proches de votre idée, pour savoir exactement à quoi vous attendre.",
      },
      {
        icon: "plan",
        title: "Nous recommandons la bonne solution",
        description: "La technologie, les fonctionnalités et le plan adaptés pour mener votre idée jusqu'au marché.",
      },
      {
        icon: "quote",
        title: "Vous recevez un devis clair",
        description: "Un devis personnalisé en DA, sans aucune obligation de continuer.",
      },
    ],
  },
  process: {
    eyebrow: "Notre méthode",
    title: "À vos côtés, de l'idée au marché",
    description:
      "Nous vous accompagnons à chaque étape — de votre première idée jusqu'à ce que votre produit soit entre les mains de vos clients.",
    steps: [
      {
        title: "Consultation gratuite",
        description:
          "Nous discutons de votre idée, vous présentons nos projets réalisés et vous envoyons un devis personnalisé.",
      },
      {
        title: "Design",
        description: "Nous concevons l'expérience, les wireframes et les prototypes pour votre validation.",
      },
      {
        title: "Développement",
        description: "Notre équipe construit votre produit avec un code propre, rapide et évolutif.",
      },
      {
        title: "Lancement sur le marché",
        description: "Nous testons tout avec soin et lançons votre projet, prêt pour vos clients.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Pourquoi CodeNova",
    title: "Un partenaire de développement sur qui compter",
    description:
      "Nous allions design soigné et ingénierie solide, et restons joignables à chaque étape — pour que vous puissiez vous concentrer sur votre activité.",
    call: "Appeler le",
    email: "Nous écrire",
    reasons: [
      {
        icon: "target",
        title: "Adapté à votre entreprise",
        description:
          "Chaque solution est pensée autour de vos objectifs, de vos clients et de votre façon de travailler.",
      },
      {
        icon: "bolt",
        title: "Code de qualité et performance",
        description:
          "Des produits rapides, responsives et évolutifs, conçus pour des performances exceptionnelles.",
      },
      {
        icon: "spark",
        title: "Un design qui engage",
        description: "Des interfaces intuitives et des expériences fluides qui valorisent votre marque.",
      },
      {
        icon: "shield",
        title: "Des prix clairs et honnêtes",
        description: "Des prix de départ publiés en DA et un devis personnalisé avant tout démarrage.",
      },
    ],
  },
  catalogue: {
    badge: "PDF gratuit · 3 pages",
    title: "Téléchargez notre catalogue de services",
    description:
      "Tous nos services et prix de départ dans un seul document — facile à lire, enregistrer et partager avec votre équipe.",
    download: "Télécharger le PDF",
    view: "Voir en ligne",
    languageNote: "Le catalogue est disponible en anglais.",
    coverLabel: "Catalogue de services",
  },
  contact: {
    eyebrow: "Contact",
    title: "Prêt à lancer votre projet\u00a0?",
    description:
      "Contactez CodeNova dès aujourd'hui pour réserver votre consultation gratuite et obtenir un devis personnalisé. Nous serons ravis de répondre à vos questions.",
    emailLabel: "Écrivez-nous",
    phoneLabel: "Appelez-nous",
    catalogueLabel: "Catalogue de services",
    catalogueAction: "Télécharger le PDF",
    form: {
      title: "Parlez-nous de votre projet",
      subtitle: "Nous vous répondrons avec un devis personnalisé.",
      name: "Nom complet",
      namePlaceholder: "Votre nom",
      contact: "Téléphone ou e-mail",
      contactPlaceholder: "Comment vous joindre\u00a0?",
      service: "Service",
      servicePlaceholder: "Choisissez un service",
      services: [
        "Landing page",
        "Site d'entreprise",
        "Site e-commerce",
        "Plateforme web sur mesure",
        "Design UI/UX",
        "Application mobile",
        "Logiciel desktop",
        "Je ne sais pas encore",
      ],
      message: "Détails du projet",
      messagePlaceholder: "Décrivez brièvement votre projet, vos objectifs et vos délais.",
      submit: "Envoyer le message",
      sent: "Votre application e-mail devrait s'ouvrir avec votre message prêt à être envoyé.",
      note: "Cela ouvre votre application e-mail. Vous pouvez aussi écrire à",
      emailSubject: "Demande de projet",
      emailName: "Nom",
      emailContact: "Téléphone / e-mail",
      emailService: "Service",
    },
  },
  footer: {
    services: "Services",
    company: "Entreprise",
    getInTouch: "Nous contacter",
    catalogue: "Catalogue de services (PDF)",
    rights: "Tous droits réservés.",
  },
};
