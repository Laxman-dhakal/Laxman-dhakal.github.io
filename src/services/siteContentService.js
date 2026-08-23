const STORAGE_KEY = 'laxman_portfolio_site_content';
const suspiciousContentPattern = /xina|china|geirako|geriako|giriako|中文|汉字|你好|[\u3400-\u9FFF]/i;

const sanitizeText = (value, fallback) => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  if (suspiciousContentPattern.test(trimmed)) return fallback;
  return trimmed;
};

const sanitizeHero = (hero = {}) => {
  const safeHero = {
    ...defaultSiteContent.hero,
    ...(hero || {})
  };

  safeHero.title = sanitizeText(hero?.title, defaultSiteContent.hero.title);
  safeHero.subtitle = sanitizeText(hero?.subtitle, defaultSiteContent.hero.subtitle);
  safeHero.description = sanitizeText(hero?.description, defaultSiteContent.hero.description);
  safeHero.primaryCta = sanitizeText(hero?.primaryCta, defaultSiteContent.hero.primaryCta);
  safeHero.secondaryCta = sanitizeText(hero?.secondaryCta, defaultSiteContent.hero.secondaryCta);

  safeHero.roles = Array.isArray(hero?.roles) && hero.roles.length
    ? hero.roles
        .filter((role) => typeof role === 'string' && role.trim())
        .map((role) => sanitizeText(role, defaultSiteContent.hero.roles[0]))
        .filter((role) => !!role)
    : defaultSiteContent.hero.roles;

  return safeHero;
};

const defaultProjects = [
  {
    id: 1,
    title: 'Modern Studio Website',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
    description: 'A polished design system for a creative studio with animated sections and modern branding.',
    fullDescription: 'A polished design system for a creative studio with animated sections and modern branding. Built to present services clearly and convert visitors into qualified leads.',
    technologies: ['React', 'CSS', 'Animations'],
    features: ['Responsive layout', 'Service showcase', 'Smooth micro-interactions'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2026'
  },
  {
    id: 2,
    title: 'SaaS Landing Page',
    category: 'React',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    description: 'A premium product landing page built for conversion and trust with modern UI details.',
    fullDescription: 'A premium product landing page built for conversion and trust with modern UI details. The layout balances strong calls to action, social proof, and clean product storytelling.',
    technologies: ['React', 'Framer Motion', 'Responsive'],
    features: ['Animated feature grid', 'Call to action sections', 'Trust indicators'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2025'
  },
  {
    id: 3,
    title: 'Finance Dashboard',
    category: 'Application',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    description: 'A clean dashboard interface focused on data clarity and responsive interactions.',
    fullDescription: 'A clean dashboard interface focused on data clarity and responsive interactions. It was designed to make complex metrics readable and easy to act on.',
    technologies: ['React', 'Charts', 'UX Design'],
    features: ['Modular cards', 'Dark mode ready', 'Performance focused'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2024'
  }
];

const defaultServicesCatalog = [
  { id: 1, title: 'Web Development', description: 'Build modern, scalable websites with clean code and fast performance.', icon: 'FaCode' },
  { id: 2, title: 'React Development', description: 'Create interactive React experiences with reusable components and strong UX.', icon: 'FaReact' },
  { id: 3, title: 'UI/UX Design', description: 'Design polished interfaces that balance aesthetics and usability.', icon: 'FaPalette' },
  { id: 4, title: 'Responsive Design', description: 'Ensure every screen feels native with responsive layouts and clear hierarchy.', icon: 'FaMobileAlt' },
  { id: 5, title: 'Website Maintenance', description: 'Keep websites updated, secure, and optimized for long-term growth.', icon: 'FaShieldAlt' },
  { id: 6, title: 'Technical Consultation', description: 'Advise on architecture, deployment, and product strategy for digital projects.', icon: 'FaLightbulb' }
];

const defaultTestimonials = [
  {
    id: 1,
    name: 'Alex Morgan',
    role: 'Product Manager',
    company: 'Creative Agency',
    quote: 'Laxman delivered a thoughtful web experience with polished details and excellent communication.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Startup Founder',
    company: 'Tech Venture',
    quote: 'The portfolio and prototype work felt premium and strategic, exactly what we needed.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Samir Gupta',
    role: 'Design Lead',
    company: 'Growth Studio',
    quote: 'A modern implementation with strong attention to motion, typography and responsive polish.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

const defaultFaqs = [
  { id: 1, category: 'General', question: 'What services do you offer?', answer: 'I provide modern web development, React solutions, UI/UX design, responsive builds, and technical consultation.' },
  { id: 2, category: 'Projects', question: 'How can I see your previous work?', answer: 'Visit the Portfolio page to see featured projects, categories, and detailed case studies.' },
  { id: 3, category: 'Services', question: 'Do you build custom applications?', answer: 'Yes, I build custom web apps, dashboards, and interactive experiences tailored to business needs.' },
  { id: 4, category: 'Technology', question: 'Which technologies do you use?', answer: 'I work with React, JavaScript, Node.js, Express, MongoDB, MySQL, Git, and Figma for design handoff.' }
];

const defaultSiteContent = {
  hero: {
    title: "Hi, I'm Er.Laxman Dhakal",
    subtitle: 'Web Developer',
    roles: ['Web Developer', 'React Developer', 'UI/UX Enthusiast', 'IT Professional'],
    description: 'I design and build premium, responsive web experiences that look sharp, feel smooth, and convert visitors into customers.',
    primaryCta: 'View My Work',
    secondaryCta: "Let's Talk",
    image: new URL('../../image/cover home.png', import.meta.url).href
  },
  about: {
    title: 'About Me',
    intro: 'I am an IT professional and web developer with a background in computer science, software development and practical technical coordination.',
    text: 'My experience combines responsive web development, programming fundamentals, problem solving, project coordination and technical support. I enjoy building clear, useful digital experiences while continuously growing through real-world projects and professional learning.',
    stats: [
      { value: '50+', label: 'Projects' },
      { value: '3+', label: 'Years Experience' },
      { value: '30+', label: 'Happy Clients' },
      { value: '10+', label: 'Technologies' }
    ],
    image: new URL('../../image/video_thumb_video-item-37503.png', import.meta.url).href
  },
  services: {
    title: 'Services',
    subtitle: 'Professional digital solutions designed to solve real-world problems.'
  },
  portfolio: {
    title: 'Selected Work',
    subtitle: 'A collection of projects, applications and digital experiences.'
  },
  contact: {
    title: "Let's Build Something Exceptional",
    description: 'Need a premium digital presence, a polished product interface, or a conversion-focused web experience? Let’s shape your next idea into something memorable and measurable.',
    email: 'laxmandhakal000@gmail.com',
    phone: '+977-9768458058',
    location: 'Nepalgunj, Banke, Nepal'
  },
  projects: defaultProjects,
  servicesCatalog: defaultServicesCatalog,
  testimonialsList: defaultTestimonials,
  faqList: defaultFaqs,
  media: [
    {
      id: 1,
      title: 'Hero cover image',
      type: 'image',
      url: new URL('../../image/cover home.png', import.meta.url).href,
      category: 'home',
      active: true
    },
    {
      id: 2,
      title: 'About portrait',
      type: 'image',
      url: new URL('../../image/video_thumb_video-item-37503.png', import.meta.url).href,
      category: 'about',
      active: true
    },
    {
      id: 3,
      title: 'Intro video',
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      category: 'promo',
      active: true
    }
  ],
  pages: {
    home: { title: 'Home', slug: '/', published: true },
    about: { title: 'About', slug: '/about', published: true },
    services: { title: 'Services', slug: '/services', published: true },
    portfolio: { title: 'Portfolio', slug: '/portfolio', published: true },
    faq: { title: 'FAQ', slug: '/faq', published: true },
    contact: { title: 'Contact', slug: '/contact', published: true }
  }
};

const readStoredContent = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteContent));
      return { ...defaultSiteContent };
    }

    const parsed = JSON.parse(stored);
    return {
      ...defaultSiteContent,
      ...parsed,
      hero: sanitizeHero(parsed.hero),
      about: { ...defaultSiteContent.about, ...(parsed.about || {}) },
      services: { ...defaultSiteContent.services, ...(parsed.services || {}) },
      portfolio: { ...defaultSiteContent.portfolio, ...(parsed.portfolio || {}) },
      contact: { ...defaultSiteContent.contact, ...(parsed.contact || {}) },
      projects: Array.isArray(parsed.projects) ? parsed.projects : defaultProjects,
      servicesCatalog: Array.isArray(parsed.servicesCatalog) ? parsed.servicesCatalog : defaultServicesCatalog,
      testimonialsList: Array.isArray(parsed.testimonialsList) ? parsed.testimonialsList : defaultTestimonials,
      faqList: Array.isArray(parsed.faqList) ? parsed.faqList : defaultFaqs,
      media: Array.isArray(parsed.media) ? parsed.media : defaultSiteContent.media,
      pages: { ...defaultSiteContent.pages, ...(parsed.pages || {}) }
    };
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteContent));
    return { ...defaultSiteContent };
  }
};

export const getSiteContent = () => readStoredContent();

export const saveSiteContent = (content) => {
  const safeContent = {
    ...defaultSiteContent,
    ...content,
    hero: sanitizeHero(content.hero),
    about: { ...defaultSiteContent.about, ...(content.about || {}) },
    services: { ...defaultSiteContent.services, ...(content.services || {}) },
    portfolio: { ...defaultSiteContent.portfolio, ...(content.portfolio || {}) },
    contact: { ...defaultSiteContent.contact, ...(content.contact || {}) },
    projects: Array.isArray(content.projects) ? content.projects : defaultProjects,
    servicesCatalog: Array.isArray(content.servicesCatalog) ? content.servicesCatalog : defaultServicesCatalog,
    testimonialsList: Array.isArray(content.testimonialsList) ? content.testimonialsList : defaultTestimonials,
    faqList: Array.isArray(content.faqList) ? content.faqList : defaultFaqs,
    media: Array.isArray(content.media) ? content.media : defaultSiteContent.media,
    pages: { ...defaultSiteContent.pages, ...(content.pages || {}) }
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(safeContent));
  return safeContent;
};

export default defaultSiteContent;
