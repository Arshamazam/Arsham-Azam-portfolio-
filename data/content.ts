/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT
 *  Edit everything on the website from this one file.
 *  Components read from here; you should never need to touch them
 *  to change text, links, projects, or publications.
 * ─────────────────────────────────────────────────────────────
 */

// ── Types ────────────────────────────────────────────────────

export type LinkItem = { label: string; href: string };

export type Publication = {
  title: string;
  authors?: string; // e.g. "Arsham Azam, Co-Author, Co-Author"
  role?: string; // e.g. "First author"
  venue?: string;
  year?: string;
  status: "Published" | "Preprint" | "Under review";
  summary?: string;
  tags: string[];
  doi?: string; // just the DOI, e.g. "10.1007/..." (link is built automatically)
  arxiv?: string; // just the ID, e.g. "2606.21474"
  links?: LinkItem[]; // any extra links (PDF, code, slides…)
};

export type OngoingResearch = {
  title: string;
  description: string;
  collaborators?: string;
  tags: string[];
};

export const sectors = ["Public sector", "Industry", "Non-profit"] as const;
export type Sector = (typeof sectors)[number];

export type Experience = {
  role: string;
  org: string;
  orgDetail?: string;
  sector: Sector; // colours the career timeline on /dashboard
  // "Mon YYYY – Mon YYYY", "Mon YYYY – Present", "YYYY – YYYY" or "YYYY".
  // A period without a start date (e.g. "Ongoing") is left off the timeline.
  period: string;
  current?: boolean;
  points: string[];
  tags?: string[];
};

export const projectCategories = [
  "AI/Research",
  "Government Systems",
  "Client Work",
] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  title: string;
  category: ProjectCategory;
  description: string;
  image: string; // path inside /public — replace the placeholder SVGs with real screenshots
  imageAlt: string;
  tags: string[];
  highlight?: string; // short badge, e.g. "PSF funded"
  links?: LinkItem[];
};

// ── Site & SEO ───────────────────────────────────────────────

export const site = {
  // Change this to your real domain once deployed (used for SEO, sitemap & OG tags).
  url: "https://arshamazam.vercel.app",
  title: "Arsham Azam — AI Researcher & Inference Engineer",
  description:
    "Arsham Azam is an AI researcher, AI specialist and inference engineer from Lahore, Pakistan, working on explainable, privacy-preserving AI for healthcare and on serving and optimizing models, including LLMs, in production.",
  keywords: [
    "Arsham Azam",
    "Explainable AI",
    "Federated Learning",
    "Multimodal AI",
    "Healthcare AI",
    "Mental Health AI",
    "AI Inference Engineer",
    "LLM Serving",
    "Model Optimization",
    "AI Specialist Lahore",
    "AI Researcher Pakistan",
    "Agnific",
  ],
  locale: "en_US",
  lastUpdated: "2026-10-08", // used in the sitemap
};

// ── Person ───────────────────────────────────────────────────

export const person = {
  name: "Arsham Azam",
  shortName: "Arsham",
  initials: "AA",
  role: "AI Researcher & Inference Engineer",
  focus: ["Explainable AI", "Federated Learning", "LLM Inference"],
  location: "Lahore, Pakistan",
  photo: "/profile.jpg",
  photoAlt: "Portrait of Arsham Azam",
  cv: "/cv.pdf",
  email: "arshamrana36@gmail.com",
};

export const socials = {
  github: "https://github.com/Arshamazam",
  linkedin: "https://www.linkedin.com/in/arsham-azam/",
  email: `mailto:${person.email}`,
};

// Navigation: "/#id" links scroll to a home-page section; plain paths open a page.
export const nav: LinkItem[] = [
  { label: "About", href: "/#about" },
  { label: "Dashboard", href: "/dashboard/" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Research", href: "/#research" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

// ── Hero ─────────────────────────────────────────────────────

export const hero = {
  greeting: "Hi, I'm",
  headline: "Arsham Azam",
  tagline:
    "AI Researcher · AI Specialist · Inference Engineer | Explainable AI · Federated Learning · LLM Inference · Healthcare AI",
  intro:
    "I research explainable, privacy-preserving AI for healthcare, and I engineer the inference side: serving and optimizing models, including LLMs, so they run fast and reliably in production.",
  ctas: {
    cv: "Download CV",
    research: "View Research",
    contact: "Contact Me",
  },
  // Skills shown on the small floating cards around the photo (names must exist in the skill icon map).
  floatingBadges: ["Python", "LLM Serving", "GPU Inference", "Explainable AI"],
};

// Impact numbers: shown under the hero (they count up) and at the top of the CV.
// Numbers inside `value` animate; text like "Springer" is shown as-is.
// `icon` is one of: publication, villages, grant, experience.
export const highlights = [
  { icon: "publication", value: "Springer", label: "First-author publication" },
  { icon: "villages", value: "2,000", label: "Villages served by systems I build" },
  { icon: "grant", value: "PKR 3.7M", label: "PSF research grant" },
  { icon: "experience", value: "4+ yrs", label: "Building AI & software" },
] as const;

// ── What I do ────────────────────────────────────────────────
// Three pillars. `visual` picks the small animation on each card: attribution, tokens, layers.

export const expertise = [
  {
    visual: "attribution",
    title: "AI Research",
    body: "Explainable, privacy-preserving and multimodal AI for healthcare, published with Springer Nature.",
    points: ["Explainable AI (SHAP, Integrated Gradients)", "Federated learning", "Multimodal fusion for screening"],
  },
  {
    visual: "tokens",
    title: "Inference Engineering",
    body: "Taking models from notebook to production, fast, reliable and cost-efficient.",
    points: ["LLM serving & inference APIs", "Quantization & optimization", "GPU & cloud deployment"],
  },
  {
    visual: "layers",
    title: "AI Products & Systems",
    body: "End-to-end AI products and large-scale platforms for government and clients through Agnific.",
    points: ["Agentic AI & LLM apps", "ERP/MIS & M&E platforms", "Web & mobile apps"],
  },
] as const;

// ── About ────────────────────────────────────────────────────

export const about = {
  paragraphs: [
    "I'm an AI researcher and specialist working on explainable, privacy-preserving AI, with a focus on mental health screening and healthcare. My research combines structured and multimodal data with federated learning, so models can learn from sensitive data without centralising it, and uses SHAP and Integrated Gradients so their decisions can be audited.",
    "As an inference engineer, I take models from notebook to production: serving LLMs and ML models behind inference APIs, optimizing them with quantization, and deploying them on GPU and cloud infrastructure with attention to latency and cost.",
    "I apply this in World Bank-funded public-sector systems in Punjab and at Agnific, my software house. I'm preparing to start a PhD.",
  ],
  interests: [
    "Explainable AI",
    "Federated Learning",
    "Multimodal AI",
    "Healthcare AI",
    "Mental Health AI",
    "Efficient AI Inference",
  ],
  learnMore: { label: "Learn more", href: "/research/" },
  // Quick facts with icons. `icon` is one of: experience, specialty, location, education, research.
  facts: [
    { icon: "specialty", label: "Specialty", value: "XAI research & LLM inference" },
    { icon: "experience", label: "Experience", value: "4+ years" },
    { icon: "education", label: "Education", value: "BS Software Engineering" },
    { icon: "research", label: "Publications", value: "Springer Nature, first author" },
  ] as const,
};

// ── Research ─────────────────────────────────────────────────

export const research = {
  intro:
    "My research asks how AI can be trusted in sensitive settings. That means models that explain their reasoning, learn without exposing private data, and combine signals (surveys, faces, behaviour) the way a clinician would.",
  // Longer statement shown on the /research page. Edit freely.
  statement: [
    "Mental health and developmental conditions are often detected late, especially in low-resource settings. Screening tools exist, but they are rarely trusted, rarely private, and rarely tested on the populations that need them most.",
    "My work tackles this from three directions. First, explainability: I pair predictive models with SHAP and Integrated Gradients so counsellors and clinicians can see why a model flagged someone. Second, privacy: I use federated learning so institutions can collaborate without sharing raw student or patient data. Third, multimodality: I fuse structured questionnaires with signals such as facial-emotion analysis to capture what a single source misses.",
    "In a PhD, I want to push these threads toward agentic, explainable systems that can support early screening at scale and be audited by the people who rely on them.",
  ],
  interestsDetail: [
    {
      title: "Explainable AI",
      body: "Making model decisions inspectable with feature attribution (SHAP, Integrated Gradients) so domain experts can verify them.",
    },
    {
      title: "Federated Learning",
      body: "Training across institutions without centralising sensitive data, for privacy by design.",
    },
    {
      title: "Multimodal AI",
      body: "Fusing structured data with images and facial-emotion signals for richer, more robust predictions.",
    },
    {
      title: "Healthcare & Mental Health AI",
      body: "Early screening for depression, anxiety, autism and Down syndrome, built with practitioners.",
    },
    {
      title: "Efficient Inference",
      body: "Making models fast and affordable to run (quantization, optimized serving, GPU deployment) so research can reach real users.",
    },
  ],
  publications: [
    {
      title:
        "Towards Transparent Mental Health Insights: An Explainable AI Model for Career-Related Depression and Anxiety Among University Students Using Structured and Multimodal Data",
      authors: "Arsham Azam et al.",
      role: "First author",
      venue: "Springer Nature",
      status: "Published",
      summary:
        "Fuses survey data with facial-emotion analysis, trains under federated learning, and explains predictions with SHAP and Integrated Gradients.",
      tags: [
        "Explainable AI",
        "Federated Learning",
        "Multimodal",
        "Mental Health",
        "SHAP",
        "Integrated Gradients",
      ],
      doi: "10.1007/978-3-032-18834-2_26",
      arxiv: "2606.21474",
    },
    {
      title:
        "Unveiling Data Scientist Salaries: Predictive Modeling for Compensation Trends",
      status: "Published",
      summary:
        "Predictive modeling of data scientist compensation to surface the factors that drive salary trends.",
      tags: ["Machine Learning", "Predictive Modeling", "Data Analysis"],
      // TODO: "10.56979" is only the DOI prefix. Replace with the full DOI
      // (e.g. "10.56979/xxx/yyy") so the link resolves.
      doi: "10.56979",
    },
  ] satisfies Publication[],
  ongoing: [
    {
      title: "Explainable AI for early autism detection from facial expressions",
      description:
        "An interpretable facial-expression model to support early autism screening, developed with practitioners.",
      collaborators: "Amin Maktab / The Eisaar Trust",
      tags: ["Explainable AI", "Computer Vision", "Autism", "Healthcare"],
    },
    {
      title:
        "Explainable AI framework for early Down syndrome detection from facial images",
      description:
        "A transparent detection framework that highlights the facial features driving each prediction.",
      tags: ["Explainable AI", "Computer Vision", "Healthcare"],
    },
    {
      title: "NeuroLynk AI",
      description:
        "An explainable agentic AI framework for detecting career-related distress in university students.",
      tags: ["Agentic AI", "Explainable AI", "Mental Health"],
    },
  ] satisfies OngoingResearch[],
};

// ── Experience ───────────────────────────────────────────────

export const experience: Experience[] = [
  {
    role: "Assistant Manager IT",
    org: "Punjab Rural Municipal Services Company (PRMSC)",
    sector: "Public sector",
    orgDetail: "Government of Punjab",
    period: "Sep 2023 – Present",
    current: true,
    points: [
      "Building systems for the World Bank-funded Punjab Rural Sustainable Water Supply & Sanitation Project (PRSWSSP).",
      "ERP/MIS, water quality monitoring, grievance redressal, and water billing for 2,000 villages.",
      "Monitoring & evaluation systems and AI-driven workflow automation.",
    ],
    tags: ["ERP/MIS", "M&E", "World Bank", "Automation"],
  },
  {
    role: "Head of Digital Software Engineer / AI Engineer",
    org: "Globexisimpex",
    sector: "Industry",
    period: "Dec 2025 – Present",
    current: true,
    points: [
      "Leading AI automation and ERP platforms built with Python, Flask and React.",
      "Designing ML/NLP modules integrated into business workflows.",
    ],
    tags: ["Python", "Flask", "React", "NLP"],
  },
  {
    role: "AI Engineer / IT Consultant",
    org: "Punjab Food Authority (PFA)",
    sector: "Public sector",
    period: "Apr 2026 – Sep 2026",
    points: [
      "Introduced AI/ML capabilities at PFA.",
      "Built sample tracking and warehouse chain-of-custody systems.",
    ],
    tags: ["AI/ML", "Traceability"],
  },
  {
    role: "Founder",
    org: "Agnific",
    sector: "Industry",
    orgDetail: "Software house",
    period: "Ongoing",
    current: true,
    points: ["Leading AI projects and client development end to end."],
    tags: ["AI", "Client Delivery"],
  },
  {
    role: "Data Engineer",
    org: "Telelinkz Communications",
    sector: "Industry",
    period: "Aug 2023 – May 2024",
    points: ["Built Python scraping pipelines with Selenium and BeautifulSoup."],
    tags: ["Python", "Selenium", "BeautifulSoup"],
  },
  {
    role: "Software Engineer",
    org: "Digital Frontier",
    sector: "Industry",
    period: "2023",
    points: [],
  },
  {
    role: "Data Analyst Intern",
    org: "PTCL",
    sector: "Industry",
    period: "2023",
    points: [],
  },
  {
    role: "Junior Software Engineer",
    org: "The Eisaar Trust",
    sector: "Non-profit",
    period: "2022 – 2023",
    points: [],
  },
];

// ── Projects ─────────────────────────────────────────────────

export const projects: Project[] = [
  {
    title: "Robo-Litation",
    category: "AI/Research",
    description:
      "AI-powered smart physiotherapy glove for stroke rehabilitation, paired with a mobile app for guided exercises and progress tracking. BS final year project.",
    image: "/projects/robo-litation.svg",
    imageAlt: "Placeholder image for the Robo-Litation smart glove project",
    tags: ["AI", "Wearables", "Mobile App", "Rehabilitation"],
    highlight: "PSF funded · ~PKR 3.7M",
  },
  {
    title: "Autism Early Detection AI",
    category: "AI/Research",
    description:
      "Explainable facial-expression model for early autism screening, adopted by rehabilitation centres in Lahore.",
    image: "/projects/autism-detection.svg",
    imageAlt: "Placeholder image for the autism early detection project",
    tags: ["Explainable AI", "Computer Vision", "Healthcare"],
    highlight: "In use at rehab centres",
  },
  {
    title: "PRSWSSP Daily Progress System",
    category: "Government Systems",
    description:
      "Field reporting app with a live dashboard and automatically emailed progress reports for a World Bank-funded program.",
    image: "/projects/prswssp-progress.svg",
    imageAlt: "Placeholder image for the PRSWSSP daily progress system",
    tags: ["Field App", "Dashboard", "Automated Reports"],
  },
  {
    title: "PRMSC M&E System",
    category: "Government Systems",
    description:
      "Multi-platform monitoring and evaluation system tracking program indicators across rural Punjab.",
    image: "/projects/prmsc-me.svg",
    imageAlt: "Placeholder image for the PRMSC monitoring and evaluation system",
    tags: ["M&E", "Web", "Mobile"],
  },
  {
    title: "PFA Sample Tracking & Warehouse Inventory",
    category: "Government Systems",
    description:
      "Sample tracking and warehouse inventory with full chain-of-custody for the Punjab Food Authority.",
    image: "/projects/pfa-tracking.svg",
    imageAlt: "Placeholder image for the PFA sample tracking system",
    tags: ["Inventory", "Chain of Custody", "Traceability"],
  },
  {
    title: "SPY 0DTE Risk Filter",
    category: "Client Work",
    description:
      "Flutter app that combines OpenAI GPT with Alpaca market data to flag risk on zero-days-to-expiry SPY options trades.",
    image: "/projects/spy-0dte.svg",
    imageAlt: "Placeholder image for the SPY 0DTE risk filter app",
    tags: ["Flutter", "OpenAI GPT", "Alpaca API"],
  },
  {
    title: "BlockOra",
    category: "Client Work",
    description: "Crypto-backed lending and referral platform.",
    image: "/projects/blockora.svg",
    imageAlt: "Placeholder image for the BlockOra lending platform",
    tags: ["Fintech", "Crypto", "Web Platform"],
  },
  {
    title: "LLM Chatbot & Agentic Automation",
    category: "Client Work",
    description:
      "LLM-powered chatbot and agentic workflows that automate multi-step business processes.",
    image: "/projects/llm-agents.svg",
    imageAlt: "Placeholder image for the LLM chatbot and agentic automation project",
    tags: ["LLMs", "Agentic AI", "Automation"],
  },
];

// ── Skills ───────────────────────────────────────────────────

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI Research & ML",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Explainable AI (SHAP, Integrated Gradients)",
      "Federated Learning",
      "NLP",
      "LLM Integration",
      "Agentic AI",
      "Prompt Engineering",
    ],
  },
  {
    group: "AI Inference & Deployment",
    items: [
      "LLM Serving",
      "Quantization & Optimization",
      "GPU Inference",
      "Inference APIs",
      "Latency & Throughput Tuning",
      "Cloud Deployment",
      "Containerization",
    ],
  },
  {
    group: "Languages",
    items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL", "Dart"],
  },
  {
    group: "Web & Mobile",
    items: ["React", "Next.js", "Flask", "Flutter"],
  },
  {
    group: "Data",
    items: ["Data Engineering", "EDA", "Visualization", "Web Scraping"],
  },
];

// ── Education ────────────────────────────────────────────────

export const education = [
  {
    degree: "BS Software Engineering",
    institution: "The Superior University, Lahore",
    period: "2019 – 2023",
    details: [
      "CGPA 3.22 / 4.00",
      "Final year project (Robo-Litation) funded by the Pakistan Science Foundation",
    ],
  },
];

// ── Contact ──────────────────────────────────────────────────

export const contact = {
  heading: "Let's Work Together",
  body: "Whether you're a professor with a research opening, or a team that needs AI or software built, I'd like to hear from you.",
  button: "Get in Touch",
  // Create a free form at https://formspree.io and paste its ID here (the part after /f/).
  // Leave empty to fall back to opening the visitor's email app (mailto).
  formspreeId: "",
};

// ── CV (Europass-style, downloaded as /cv.pdf) ───────────────
// The CV reuses everything above (experience, education, publications, skills…).
// These fields are CV-only. Empty values are hidden.
// After editing anything, regenerate the PDF with:  npm run cv

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const cv = {
  phone: "", // e.g. "+92 300 1234567"
  nationality: "", // e.g. "Pakistani"
  languages: {
    motherTongue: [] as string[], // e.g. ["Urdu"]
    // Other languages with CEFR self-assessment levels.
    other: [] as {
      language: string;
      listening: CefrLevel;
      reading: CefrLevel;
      spokenProduction: CefrLevel;
      spokenInteraction: CefrLevel;
      writing: CefrLevel;
    }[],
  },
  awards: [
    {
      title: "Pakistan Science Foundation research funding",
      detail:
        "Approximately PKR 3.7 million awarded to Robo-Litation, my BS final year project: an AI-powered smart physiotherapy glove for stroke rehabilitation.",
    },
  ],
};
