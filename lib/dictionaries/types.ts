export type ServiceIcon = "web" | "design" | "mobile" | "desktop";
export type ReasonIcon = "target" | "bolt" | "spark" | "shield";
export type ConsultationIcon = "listen" | "showcase" | "plan" | "quote";

export type NavLink = { label: string; href: string };

export type HeaderDictionary = {
  home: string;
  catalogue: string;
  downloadCatalogue: string;
  getQuote: string;
  freeConsultation: string;
  openMenu: string;
  closeMenu: string;
  language: string;
};

export type ContactFormDictionary = {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  contact: string;
  contactPlaceholder: string;
  service: string;
  servicePlaceholder: string;
  services: string[];
  message: string;
  messagePlaceholder: string;
  submit: string;
  sent: string;
  note: string;
  emailSubject: string;
  emailName: string;
  emailContact: string;
  emailService: string;
};

export type Dictionary = {
  meta: { title: string; description: string };
  site: { tagline: string; description: string };
  nav: NavLink[];
  header: HeaderDictionary;
  hero: {
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    highlights: string[];
    secureTitle: string;
    secureSubtitle: string;
    mobileTitle: string;
    mobileSubtitle: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      icon: ServiceIcon;
      title: string;
      description: string;
      features: { title: string; detail?: string }[];
    }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      title: string;
      prefix?: string;
      price: string;
      unit?: string;
      description: string;
      note?: string;
    }[];
    ctaTitle: string;
    ctaDescription: string;
    ctaCatalogue: string;
  };
  consultation: {
    badge: string;
    eyebrow: string;
    title: string;
    description: string;
    book: string;
    call: string;
    stepsTitle: string;
    steps: { icon: ConsultationIcon; title: string; description: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    description: string;
    call: string;
    email: string;
    reasons: { icon: ReasonIcon; title: string; description: string }[];
  };
  catalogue: {
    badge: string;
    title: string;
    description: string;
    download: string;
    view: string;
    languageNote?: string;
    coverLabel: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    phoneLabel: string;
    catalogueLabel: string;
    catalogueAction: string;
    form: ContactFormDictionary;
  };
  footer: {
    services: string;
    company: string;
    getInTouch: string;
    catalogue: string;
    rights: string;
  };
};
