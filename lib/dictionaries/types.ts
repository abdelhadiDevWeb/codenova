export type ServiceIcon = "web" | "design" | "mobile" | "desktop" | "ai";
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
  clientType: string;
  individual: string;
  company: string;
  name: string;
  namePlaceholder: string;
  companyName: string;
  companyNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  service: string;
  servicePlaceholder: string;
  services: string[];
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  successTitle: string;
  successMessage: string;
  close: string;
  error: string;
  invalid: string;
  note: string;
  emailSubject: string;
  emailName: string;
  emailClientType: string;
  emailService: string;
};

export type Dictionary = {
  meta: { title: string; description: string; keywords: string[] };
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
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    location: string;
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
