import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "CodeNova — Digital Development Agency",
    description:
      "CodeNova builds tailored digital solutions for modern businesses: websites, landing pages, e-commerce, UI/UX design, mobile apps and custom desktop software.",
  },
  site: {
    tagline: "Digital Development Agency",
    description:
      "We build tailored digital solutions for modern businesses. From striking landing pages to complex mobile applications, we bring your vision to life.",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "Why CodeNova", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ],
  header: {
    home: "CodeNova — home",
    catalogue: "Catalogue",
    downloadCatalogue: "Download catalogue",
    getQuote: "Get a quote",
    freeConsultation: "Free consultation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    titleStart: "We build tailored digital solutions for",
    titleHighlight: "modern businesses",
    titleEnd: ".",
    description:
      "From striking landing pages to complex mobile applications, we bring your vision to life — with quality code, thoughtful design and clear pricing.",
    highlights: ["Free consultation", "Transparent pricing in DA", "From idea to market"],
    secureTitle: "Secure & fast",
    secureSubtitle: "Quality code",
    mobileTitle: "iOS & Android",
    mobileSubtitle: "Mobile applications",
  },
  services: {
    eyebrow: "Our services",
    title: "Everything your business needs to grow digitally",
    description:
      "Web, design, mobile and desktop solutions — each one built around your goals and your customers.",
    items: [
      {
        icon: "web",
        title: "Web Development",
        description:
          "Fast, responsive and scalable web experiences tailored to your business goals — from a simple online presence to a robust e-commerce engine.",
        features: [
          { title: "Business Websites", detail: "Professional corporate identities." },
          { title: "E-commerce Websites", detail: "Secure, high-converting online stores." },
          { title: "Custom Web Platforms", detail: "Tailored web applications and portals." },
          { title: "Landing Pages", detail: "Optimized single-page sites for campaigns." },
        ],
      },
      {
        icon: "design",
        title: "UI/UX Design",
        description:
          "Great software starts with great design. We craft intuitive interfaces and seamless experiences that engage your audience and elevate your brand.",
        features: [
          { title: "User interface design & visual styling" },
          { title: "User experience planning and page layouts" },
          { title: "Interactive wireframes and high-fidelity prototypes" },
        ],
      },
      {
        icon: "mobile",
        title: "Mobile App Development",
        description:
          "Reach your customers wherever they are with powerful, native-feeling mobile apps designed for performance and user retention.",
        features: [
          { title: "iOS Applications", detail: "Seamless experiences for Apple devices." },
          { title: "Android Applications", detail: "Broad reach across the Android ecosystem." },
          { title: "Custom Mobile Solutions", detail: "Integration with existing systems and APIs." },
        ],
      },
      {
        icon: "desktop",
        title: "Custom Desktop Software",
        description:
          "Empower your team with tailored desktop solutions. We develop secure, high-performance software for internal operations and management.",
        features: [
          { title: "Business management systems (ERP/CRM)" },
          { title: "Internal operational tools" },
          { title: "Advanced inventory management software" },
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "Transparent pricing",
    title: "Clear prices, no surprises",
    description: "Every project gets a quote tailored to your needs. Here is where our services start.",
    items: [
      {
        title: "Landing Page",
        price: "20,000",
        unit: "DA",
        description: "An optimized single-page site for your campaign, product or event.",
      },
      {
        title: "Websites",
        prefix: "From",
        price: "50,000",
        unit: "DA",
        description: "Business websites, e-commerce stores and custom web platforms.",
      },
      {
        title: "UI/UX Design",
        price: "5,000",
        unit: "DA / page",
        description: "Interface design, page layouts, wireframes and high-fidelity prototypes.",
      },
      {
        title: "Mobile Application",
        prefix: "Starting at",
        price: "200,000",
        unit: "DA",
        description: "Native-feeling iOS and Android apps, integrated with your systems.",
        note: "Final price depends on requested features and technical complexity.",
      },
      {
        title: "Desktop Software",
        price: "On quote",
        description: "ERP/CRM, internal tools and inventory software built for your operations.",
        note: "Price determined by project requirements.",
      },
    ],
    ctaTitle: "Need a custom quote?",
    ctaDescription: "Tell us about your project and we'll recommend the right solution and price.",
    ctaCatalogue: "Full catalogue (PDF)",
  },
  consultation: {
    badge: "100% free · No commitment",
    eyebrow: "Free consultation",
    title: "Let's talk about your idea — the first meeting is on us",
    description:
      "Book a free consultation with our team. We'll study your idea with you and stay by your side from the very first idea until your product is live on the market.",
    book: "Book my free consultation",
    call: "Call",
    stepsTitle: "What happens during your consultation",
    steps: [
      {
        icon: "listen",
        title: "We listen to your idea",
        description: "Your goals, your customers and your budget — we take the time to understand your project.",
      },
      {
        icon: "showcase",
        title: "We present projects we've already built",
        description: "See real work we've delivered, close to your idea, so you know exactly what to expect.",
      },
      {
        icon: "plan",
        title: "We recommend the right solution",
        description: "The right technology, features and plan to take your idea all the way to the market.",
      },
      {
        icon: "quote",
        title: "You get a clear quote",
        description: "A customized quote in DA, with no obligation to continue.",
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "With you from idea to market",
    description:
      "We work alongside you at every step — from your first idea until your product is live and in your customers' hands.",
    steps: [
      {
        title: "Free consultation",
        description: "We discuss your idea, show you projects we've already built and send you a customized quote.",
      },
      {
        title: "Design",
        description: "We plan the experience and design wireframes and prototypes for your approval.",
      },
      {
        title: "Development",
        description: "Our team builds your product with clean, fast and scalable code.",
      },
      {
        title: "Launch on the market",
        description: "We test everything carefully and launch your project, ready for your customers.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Why CodeNova",
    title: "A development partner you can rely on",
    description:
      "We combine careful design with solid engineering, and we stay reachable at every step — so you can focus on running your business.",
    call: "Call",
    email: "Email us",
    reasons: [
      {
        icon: "target",
        title: "Tailored to your business",
        description: "Every solution is designed around your goals, your customers and the way you work.",
      },
      {
        icon: "bolt",
        title: "Quality code & performance",
        description: "Fast, responsive and scalable products, engineered for exceptional performance.",
      },
      {
        icon: "spark",
        title: "Design that engages",
        description: "Intuitive interfaces and seamless experiences that elevate your brand.",
      },
      {
        icon: "shield",
        title: "Clear, honest pricing",
        description: "Published starting prices in DA and a customized quote before any work begins.",
      },
    ],
  },
  catalogue: {
    badge: "Free PDF · 3 pages",
    title: "Download our services catalogue",
    description:
      "All our services and starting prices in one document — easy to read, save and share with your team.",
    download: "Download PDF",
    view: "View online",
    coverLabel: "Services Catalogue",
  },
  contact: {
    eyebrow: "Contact",
    title: "Ready to start your project?",
    description:
      "Contact CodeNova today to book your free consultation and get a customized quote. We're happy to answer your questions.",
    emailLabel: "Email us",
    phoneLabel: "Call us",
    catalogueLabel: "Services catalogue",
    catalogueAction: "Download the PDF",
    form: {
      title: "Tell us about your project",
      subtitle: "We'll get back to you with a customized quote.",
      name: "Full name",
      namePlaceholder: "Your name",
      contact: "Phone or email",
      contactPlaceholder: "How can we reach you?",
      service: "Service",
      servicePlaceholder: "Choose a service",
      services: [
        "Landing page",
        "Business website",
        "E-commerce website",
        "Custom web platform",
        "UI/UX design",
        "Mobile application",
        "Desktop software",
        "Not sure yet",
      ],
      message: "Project details",
      messagePlaceholder: "Briefly describe your project, goals and timeline.",
      submit: "Send message",
      sent: "Your email app should open with your message ready to send.",
      note: "This opens your email app. You can also write to",
      emailSubject: "Project inquiry",
      emailName: "Name",
      emailContact: "Phone / email",
      emailService: "Service",
    },
  },
  footer: {
    services: "Services",
    company: "Company",
    getInTouch: "Get in touch",
    catalogue: "Services catalogue (PDF)",
    rights: "All rights reserved.",
  },
};
