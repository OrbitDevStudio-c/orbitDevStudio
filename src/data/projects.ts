/**
 * Single source of truth for Orbit Dev Studios' shipped projects.
 *
 * Consumed by the Portfolio grid, the homepage Featured Projects section and
 * the Case Studies index + detail pages. Every fact here comes from the
 * project data that already existed in the codebase (industry, category,
 * description, tech stack, live URL, screenshots). Case-study copy is written
 * from those facts only. Anything that needs real client data (names,
 * metrics, testimonials) is left `undefined` and rendered as a visible
 * placeholder by the case-study UI, never filled with made-up values.
 */

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface CaseStudyContent {
  /** One-line summary used on cards, hero and meta description. */
  summary: string;
  /** Client name, only when the project title is the client. Otherwise rendered as a [CLIENT NAME] placeholder. */
  client?: string;
  services: string[];
  challenge: string;
  objective: string;
  approach: string[];
  design: string;
  development: string;
  /** Qualitative, factual list of what was shipped. No numbers. */
  delivered: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  industry: string;
  /** Portfolio filter bucket. */
  category: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  /** Brand mark shown on white in the Portfolio grid. */
  logo?: ProjectImage;
  /** Real site screenshot from /public/projects. */
  screenshot?: ProjectImage;
  /** Homepage "Featured Project" presentation (split title + long description). */
  featured?: {
    titleLead: string;
    titleAccent: string;
    description: string;
  };
  caseStudy: CaseStudyContent;
}

/** Shared `.chip-*` accent palette cycled across tech badges. */
export const TECH_CHIP_COLORS = ['amber', 'blue', 'purple', 'green', 'cyan'] as const;
export type TechChipColor = (typeof TECH_CHIP_COLORS)[number];

/** Portfolio grid filter buttons (order is part of the existing UI). */
export const PORTFOLIO_CATEGORIES = ['All', 'Architecture', 'Healthcare', 'Corporate', 'E-commerce', 'Personal', 'Industrial', 'AI & SaaS'];

const logo = (src: string, size: number, title: string): ProjectImage => ({
  src,
  width: size,
  height: size,
  alt: `${title} logo`,
});

export const projects: Project[] = [
  {
    id: 12,
    slug: 'probuild-erp',
    title: 'ProBuild ERP',
    industry: 'Construction',
    category: 'Industrial',
    description: 'A construction ERP for contractors in the Philippines that follows materials and money from purchase request to warehouse to project cost.',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'TypeScript'],
    liveUrl: 'https://probuild-erp-seven.vercel.app/',
    logo: logo('/projects/probuild-logo.webp', 1254, 'ProBuild ERP'),
    caseStudy: {
      summary: 'A construction ERP for Philippine contractors that tracks every peso and every bag of cement from purchase request to project cost.',
      services: ['ERP Development', 'Full-Stack Web Development', 'Backend Architecture'],
      challenge:
        'Construction contractors run several sites at once, often from more than one branch. Purchase requests, supplier quotes, deliveries, warehouse stock and site issues usually live in separate spreadsheets, so nobody can say what a project has really spent on materials until long after the money is gone.',
      objective:
        'Put the whole procure-to-site chain in one system, with approvals that scale with the amount and stock and cost records that cannot be quietly edited, so budget, committed and actual cost on every project can be trusted.',
      approach: [
        'Mapped the full chain: purchase request, approval, RFQ and quotation comparison, purchase order, goods receipt with QC, warehouse stock, material request and material issue to the project.',
        'Built amount-based approval routes in PHP, so larger purchase requests, orders and stock adjustments need more sign-offs.',
        'Made stock, project cost, journal and audit ledgers append-only at the database level, with corrections posted as reversing entries.',
        'Set up projects with customers, BOQ, WBS, cost codes and teams so every issued material lands on the right cost bucket.',
        'Added role-based access for project managers, procurement, finance, warehouse and site staff, with Asia/Manila dates and accounting periods that lock once closed.',
      ],
      design:
        'Each menu item is one step of the buying-and-using story, and the dashboard shows what is waiting on the signed-in user today. Project pages split overview, financials, BOQ, WBS, procurement, materials and team into tabs, so budget against actual is a click away.',
      development:
        'A pnpm and Turborepo monorepo with a NestJS API holding all business logic, PostgreSQL through Prisma, shared Zod schemas, and a typed API client generated from the OpenAPI document for the Next.js front end. Demo data is loaded through the real API, so numbering, approvals, stock and project costs behave exactly as in live use.',
      delivered: [
        'Live demo workspace at probuild-erp-seven.vercel.app, with fictional demo data',
        'Purchase requests, RFQs with side-by-side quote comparison, and purchase orders',
        'Goods receipts with QC inspection, batch, expiry and serial-number tracking',
        'Multi-warehouse stock, transfers, adjustments, cycle counts and a full movement ledger',
        'Material requests and issues that post cost to the project',
        'Project budget vs committed vs actual cost, with BOQ, WBS and cost codes',
        'Amount-based multi-step approval workflows and role-based access',
      ],
    },
  },
  {
    id: 11,
    slug: 'orbit-food',
    title: 'Orbit Food',
    industry: 'Food & Hospitality',
    category: 'E-commerce',
    description: 'A modern food ordering platform built for fast, reliable delivery experiences — from browsing menus to real-time order tracking.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveUrl: 'https://food-z09x.onrender.com',
    logo: logo('/projects/orbitfood-logo.webp', 432, 'Orbit Food'),
    caseStudy: {
      summary: 'A food ordering platform that covers the full journey, from browsing menus to tracking an order in real time.',
      services: ['UI/UX Design', 'Full-Stack Web Development', 'E-commerce Development'],
      challenge:
        'Food ordering depends on speed and clarity. Customers expect to browse a menu, build an order and follow its progress without friction. Behind the scenes, the platform has to keep menu, order and status data consistent from the moment an order is placed until it arrives.',
      objective:
        'Deliver a fast, reliable ordering experience that takes a customer from browsing menus to tracking their order in real time, on a stack that is straightforward to extend.',
      approach: [
        'Mapped the core ordering journey: browse, select, order, track.',
        'Defined the data model for menus, orders and order status in MongoDB.',
        'Built the API layer in Node.js and the customer-facing interface in React.',
        'Connected order status updates to a tracking view so customers can follow progress live.',
      ],
      design:
        'The interface follows the ordering journey, so the menu, the order and its status are always one step away. The Orbit Food brand mark anchors a clean layout that keeps attention on the menu.',
      development:
        "A React front end talks to a Node.js API backed by MongoDB. MongoDB's document model suits menus and orders whose shape varies. The same backend tracks order status and feeds the real-time tracking view.",
      delivered: [
        'Live food ordering web app at food-z09x.onrender.com',
        'Menu browsing and order placement flow',
        'Real-time order tracking view',
        'Node.js and MongoDB backend for menus, orders and status',
      ],
    },
  },
  {
    id: 10,
    slug: 'recruitiq',
    title: 'RecruitIQ',
    industry: 'AI & Recruitment',
    category: 'AI & SaaS',
    description: 'An AI recruitment platform that parses resumes, scores every applicant against the job requirements, and ranks candidates into a clear shortlist.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'OpenAI'],
    liveUrl: 'https://recruitiq-eta.vercel.app/',
    logo: logo('/projects/recruitiq-logo.webp', 1254, 'RecruitIQ'),
    caseStudy: {
      summary: 'An AI recruitment platform that scores every applicant against the job and ranks them into a clear, filterable shortlist.',
      services: ['AI Integration', 'Full-Stack Web Development', 'SaaS Product Development'],
      challenge:
        "Screening every resume by hand against a job's requirements is slow and inconsistent, and a qualified candidate can easily get buried in the pile. Back-and-forth interview scheduling then takes up even more of a recruiter's week.",
      objective:
        'Turn an unsorted resume pile into a ranked, explainable shortlist, and let shortlisted candidates book their own interview without recruiter back-and-forth.',
      approach: [
        'Extract structured requirements (skills, experience, education) directly from the job post.',
        "Combine deterministic rule checks with an LLM's semantic read of each resume to score and rank applicants.",
        'Remove gender and name from everything sent to the model.',
        'Add self-serve interview booking, including a fully automated AI voice interview over LiveKit.',
      ],
      design:
        'The recruiter view is built around the shortlist. Candidates are ranked, filterable and actionable in bulk, so shortlisting or rejecting a group is one action, not a page of clicks.',
      development:
        'A React front end and Node.js backend, with PostgreSQL storing applicants, scores and interview slots. Scoring pairs OpenAI with rule-based checks. Slot booking is race-safe so two candidates can never book the same interview time, and candidate emails go out automatically.',
      delivered: [
        'Live platform at recruitiq-eta.vercel.app',
        'Automatic requirement extraction from job posts',
        'Hybrid rule-based and LLM applicant scoring and ranking',
        'Bulk shortlist and reject actions with automatic candidate emails',
        'Self-serve, race-safe interview slot booking',
        'Automated AI voice interviews over LiveKit',
      ],
    },
  },
  {
    id: 9,
    slug: 'knowledgevoice',
    title: 'KnowledgeVoice',
    industry: 'AI & Knowledge Management',
    category: 'AI & SaaS',
    description: 'An AI-powered knowledge base assistant with a full-stack RAG pipeline that answers questions grounded in your own uploaded documents.',
    technologies: ['React', 'Node.js', 'MongoDB', 'OpenRouter AI'],
    liveUrl: 'https://w24-knowledge-agent.vercel.app/',
    logo: logo('/projects/knowledgevoice-logo.webp', 1254, 'KnowledgeVoice'),
    screenshot: {
      src: '/projects/knowledgevoice.webp',
      width: 1440,
      height: 636,
      alt: 'KnowledgeVoice app showing the document-grounded AI assistant interface',
    },
    featured: {
      titleLead: 'Knowledge',
      titleAccent: 'Voice',
      description:
        'An AI-powered knowledge base assistant that turns documents into an assistant that actually knows them. Upload PDFs, Word docs, and text files, then ask questions by typing or speaking, and get accurate answers grounded in your own content — with every answer citing exactly which document it came from.',
    },
    caseStudy: {
      summary: 'An AI knowledge base assistant that answers typed or spoken questions from your own documents, citing the source each time.',
      services: ['AI Integration', 'RAG Pipeline Engineering', 'Full-Stack Web Development'],
      challenge:
        'The answers teams need are buried inside long PDFs, handbooks and reports that are slow to search and easy to misremember. Digging for one paragraph costs time, every time.',
      objective:
        'Give people accurate, source-cited answers from their own documents in seconds, by typing or speaking, instead of scrolling through them.',
      approach: [
        'Accept PDFs, Word documents and text files uploaded by each user.',
        'Read, chunk and embed every document into a private, per-user knowledge base.',
        'Retrieve the most relevant passages for each question and ground the answer in them.',
        'Cite the source document on every answer and save conversations for later.',
      ],
      design:
        'A chat-first interface that takes typed or spoken questions and shows exactly which document each answer came from, so users can check what they read.',
      development:
        'A React front end and Node.js backend, with MongoDB storing users, documents and conversation history. Model calls go through OpenRouter AI, and the full RAG pipeline (parsing, chunking, embedding and retrieval) was built as part of the project.',
      delivered: [
        'Live app at w24-knowledge-agent.vercel.app',
        'Document upload for PDF, Word and text files',
        'Private, per-user knowledge base',
        'Typed and spoken question input',
        'Answers that cite their source document',
        'Saved, searchable conversation history',
      ],
    },
  },
  {
    id: 8,
    slug: 'bookverse',
    title: 'BookVerse',
    industry: 'E-Commerce & Education',
    category: 'E-commerce',
    description: 'A scalable e-commerce backend for a digital bookstore, architected as microservices to handle secure auth and transactional workflows.',
    technologies: ['Node.js', 'Express', 'React', 'MongoDB'],
    liveUrl: 'https://online-book-store-three-tan.vercel.app/',
    logo: logo('/projects/bookverse-logo.webp', 1254, 'BookVerse'),
    caseStudy: {
      summary: 'A microservices e-commerce backend for a digital bookstore, built for secure authentication and transactional workflows.',
      services: ['Backend Architecture', 'API Development', 'E-commerce Development'],
      challenge:
        'A bookstore backend has to handle accounts, catalog data and purchases without one concern slowing down or breaking another. Authentication must be secure, and transactional workflows like placing an order need to stay consistent as features grow.',
      objective:
        'Architect a scalable backend that separates responsibilities into services, secures authentication and keeps transactional workflows reliable.',
      approach: [
        'Split the bookstore domain into independent microservices.',
        'Treated authentication as its own, security-focused concern.',
        'Modelled catalog and order data in MongoDB.',
        'Exposed functionality through Express APIs consumed by a React client.',
      ],
      design:
        'The design work here is mostly architectural: clear service boundaries and predictable API contracts, so the storefront can evolve without reworking the backend.',
      development:
        'Node.js and Express services with MongoDB for persistence, structured as microservices so each part of the store can be scaled and maintained on its own. React is used on the client side.',
      delivered: [
        'Live bookstore at online-book-store-three-tan.vercel.app',
        'Microservices architecture for the bookstore domain',
        'Secure authentication flow',
        'Transactional order workflows',
        'Express APIs for a React client',
      ],
    },
  },
  {
    id: 4,
    slug: 'elegant-wedding',
    title: 'Elegant Wedding',
    industry: 'Personal Branding',
    category: 'Personal',
    description: 'A bespoke personal branding and digital invitation platform, engineered around immersive animation and state-driven storytelling.',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://wedding-portfolio-lilac.vercel.app/',
    screenshot: {
      src: '/projects/wedding.webp',
      width: 1440,
      height: 690,
      alt: 'Elegant Wedding digital invitation site homepage',
    },
    caseStudy: {
      summary: 'A bespoke personal branding and digital invitation site, told through immersive animation.',
      services: ['UI/UX Design', 'Motion Design', 'Frontend Development'],
      challenge:
        'A digital invitation has to feel personal and memorable, not like a template. It needs to tell a story and carry emotion through motion, while still behaving well on whatever device a guest opens it on.',
      objective:
        'Create a bespoke invitation and personal branding experience that tells the story through animation and stays smooth and responsive.',
      approach: [
        'Structured the content as a story, section by section.',
        'Designed motion as part of the narrative rather than decoration.',
        'Drove transitions from application state so the story unfolds in order.',
        'Built responsive layouts with Tailwind CSS.',
      ],
      design:
        'A bespoke, elegant visual direction in which immersive animation guides the visitor through the story.',
      development:
        'Built in React, with Framer Motion handling animation and Tailwind CSS handling styling. State-driven storytelling keeps every scene in sequence.',
      delivered: [
        'Live invitation site at wedding-portfolio-lilac.vercel.app',
        'Bespoke, animation-led storytelling experience',
        'State-driven scene transitions',
        'Responsive layouts across screen sizes',
      ],
    },
  },
  {
    id: 7,
    slug: 'shivedlife-medicare',
    title: 'ShivedLife Medicare',
    industry: 'Healthcare',
    category: 'Healthcare',
    description: 'A secure, mobile-first platform for a regional healthcare provider, built for compliant patient navigation under strict performance budgets.',
    technologies: ['React', 'Next.js', 'TypeScript'],
    liveUrl: 'https://shivedlifemedicare.vercel.app/',
    screenshot: {
      src: '/projects/shivedlife.webp',
      width: 1280,
      height: 800,
      alt: 'ShivedLife Medicare homepage with the online consultation section',
    },
    caseStudy: {
      summary: 'A secure, mobile-first platform for a regional healthcare provider, built to strict performance budgets.',
      client: 'ShivedLife Medicare',
      services: ['UI/UX Design', 'Web Development', 'Performance Optimization'],
      challenge:
        'Patients often reach a healthcare site at a stressful moment, and frequently on mobile. The provider needed patient navigation that is clear, secure and compliant, without heavy pages that slow people down.',
      objective:
        'Deliver a secure, mobile-first site that helps patients find what they need quickly, within strict performance budgets.',
      approach: [
        'Designed for small screens first, then scaled up.',
        'Set performance budgets up front and built within them.',
        'Organized content around patient navigation.',
        'Used TypeScript throughout for safer, more maintainable code.',
      ],
      design:
        'A calm, clean interface that puts patient tasks first, designed for small screens before large ones.',
      development:
        'Built with Next.js and React in TypeScript. Next.js rendering supports the performance budget, and typed code reduces errors in a domain where accuracy matters.',
      delivered: [
        'Live site at shivedlifemedicare.vercel.app',
        'Mobile-first patient navigation',
        'Next.js and TypeScript codebase',
        'Built to strict performance budgets',
      ],
    },
  },
  {
    id: 3,
    slug: 'pharmacare-platform',
    title: 'PharmaCare Platform',
    industry: 'Healthcare & Pharma',
    category: 'Healthcare',
    description: 'A demonstration platform for pharmaceutical product management, architected to handle complex data tables while staying secure and efficient.',
    technologies: ['React', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://pharmaceutical-demo.vercel.app/',
    screenshot: {
      src: '/projects/pharmacare.webp',
      width: 1440,
      height: 666,
      alt: 'PharmaCare Platform product management interface',
    },
    caseStudy: {
      summary: 'A pharmaceutical product management demo, built to keep complex data tables secure and efficient.',
      client: 'Demonstration project',
      services: ['UI/UX Design', 'Full-Stack Web Development', 'Data-Heavy Interfaces'],
      challenge:
        'Pharmaceutical product data is dense: many products, many attributes and tables that quickly become hard to read and slow to work with. Any platform managing that data also has to handle it securely.',
      objective:
        'Demonstrate a product management platform that keeps complex data tables usable, secure and efficient.',
      approach: [
        'Started from the data: products, their attributes and the tables used to manage them.',
        'Designed table views for working with dense records.',
        'Built a Node.js backend to serve and manage product data.',
        'Styled with Tailwind CSS for a consistent, maintainable UI.',
      ],
      design:
        'A clean, utilitarian interface where the data tables lead, with spacing and hierarchy chosen to keep dense information readable.',
      development:
        'A React front end and Node.js backend, styled with Tailwind CSS, and built to handle complex tabular data securely and efficiently.',
      delivered: [
        'Live demo at pharmaceutical-demo.vercel.app',
        'Product management interface built around complex data tables',
        'React and Node.js application',
        'Tailwind CSS component styling',
      ],
    },
  },
  {
    id: 1,
    slug: 'aura-design-studio',
    title: 'Aura Design Studio',
    industry: 'Interior Design',
    category: 'Architecture',
    description: 'A highly performant portfolio platform for a premium interior design firm, built for high-resolution media delivery without compromising load times.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://auradesignstudio.netlify.app/',
    caseStudy: {
      summary: 'A high-performance portfolio for a premium interior design firm, serving high-resolution media without slow load times.',
      client: 'Aura Design Studio',
      services: ['UI/UX Design', 'Frontend Development', 'Performance Optimization'],
      challenge:
        "Interior design is sold visually, so the portfolio has to show the work in high resolution. Large images are also the fastest way to make a site slow, and a slow portfolio undercuts a premium brand.",
      objective:
        "Show the firm's work in high resolution while keeping load times fast.",
      approach: [
        'Planned the site around the portfolio imagery.',
        'Optimized how high-resolution media is delivered.',
        'Used Next.js for performant page rendering.',
        'Added restrained motion with Framer Motion.',
      ],
      design:
        "A premium, image-led layout that gives the firm's work room to breathe, with motion used to guide rather than distract.",
      development:
        'Built with Next.js and React, styled with Tailwind CSS and animated with Framer Motion, with media delivery tuned so high-resolution work does not compromise load times.',
      delivered: [
        'Live portfolio at auradesignstudio.netlify.app',
        'Image-led portfolio for high-resolution work',
        'Optimized media delivery',
        'Subtle motion with Framer Motion',
      ],
    },
  },
  {
    id: 2,
    slug: 'designerss-creative',
    title: 'Designerss Creative',
    industry: 'Architecture & Interior',
    category: 'Architecture',
    description: 'A sophisticated digital catalog for a boutique architectural firm, letting the client manage complex project portfolios through a fast, accessible interface.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://designerss.netlify.app/',
    screenshot: {
      src: '/projects/designerss.webp',
      width: 1440,
      height: 690,
      alt: 'Designerss Creative architectural portfolio catalog homepage',
    },
    caseStudy: {
      summary: 'A digital catalog for a boutique architectural firm that keeps complex project portfolios fast and accessible.',
      client: 'Designerss Creative',
      services: ['UI/UX Design', 'Frontend Development', 'Accessibility'],
      challenge:
        'A boutique architectural firm builds up a complex portfolio of projects. Presenting it clearly, and letting the firm manage it without friction, is hard to do with a generic template.',
      objective:
        'Give the client a fast, accessible catalog for managing and presenting complex project portfolios.',
      approach: [
        "Structured the catalog around the firm's projects.",
        'Made accessibility a priority in the interface.',
        'Built in TypeScript for a maintainable codebase.',
        'Kept the UI fast and lightweight.',
      ],
      design:
        'A sophisticated, restrained catalog design that lets the architecture lead, with an accessible interface for browsing projects.',
      development:
        'React and TypeScript with Tailwind CSS. Typed components keep the catalog consistent as new projects are added.',
      delivered: [
        'Live catalog at designerss.netlify.app',
        "Digital catalog for the firm's project portfolio",
        'Fast, accessible interface',
        'React and TypeScript codebase',
      ],
    },
  },
  {
    id: 5,
    slug: 'navnidhi-trading',
    title: 'Navnidhi Trading',
    industry: 'Corporate & Industrial',
    category: 'Corporate',
    description: 'A comprehensive, SEO-optimized corporate portal for an industrial trading enterprise, serving as a digital storefront for B2B clients.',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://navnidhitrading.netlify.app/',
    screenshot: {
      src: '/projects/navnidhi.webp',
      width: 1022,
      height: 862,
      alt: 'Navnidhi Trading corporate website homepage',
    },
    caseStudy: {
      summary: "An SEO-optimized corporate portal that acts as a digital storefront for an industrial trading enterprise's B2B clients.",
      client: 'Navnidhi Trading',
      services: ['Corporate Website Development', 'SEO', 'UI/UX Design'],
      challenge:
        'B2B buyers research suppliers online before they get in touch. An industrial trading enterprise needs a credible, discoverable web presence that clearly presents what it offers to business clients.',
      objective:
        'Build a comprehensive, SEO-optimized corporate portal that works as a digital storefront for B2B clients.',
      approach: [
        'Organized content around what B2B clients need to evaluate the business.',
        'Built SEO foundations into the site structure from the start.',
        'Used Next.js for search-friendly rendering.',
        'Styled with Tailwind CSS for a consistent corporate look.',
      ],
      design:
        "A professional, corporate presentation that makes the company's offering easy for business visitors to scan.",
      development:
        'Next.js and React with Tailwind CSS. Next.js rendering supports search visibility, which matters for a portal meant to be found by B2B buyers.',
      delivered: [
        'Live portal at navnidhitrading.netlify.app',
        'SEO-optimized corporate website',
        'Digital storefront presenting the business to B2B clients',
        'Next.js and Tailwind CSS codebase',
      ],
    },
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug.toLowerCase());
}

/** Previous / next project in list order, wrapping around. */
export function getAdjacentProjects(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}

/** Best image for previews: real screenshot first, then brand logo. */
export function getPrimaryImage(project: Project): ProjectImage | undefined {
  return project.screenshot ?? project.logo;
}

export const caseStudyPath = (slug: string) => `/case-studies/${slug}`;
