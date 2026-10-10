/**
 * FAQ content for the /faq page.
 *
 * Answers are arrays of parts: plain strings, or `{ text, to }` objects that render as
 * internal react-router links. `faqAnswerText()` flattens an answer to plain text for
 * search and for the FAQPage JSON-LD.
 *
 * Timeline figures must stay in sync with the Pricing page (/pricing). No fixed prices are
 * published: cost answers point to the AI estimator (/pricing#estimate).
 */

export type FaqCategoryId = 'pricing' | 'process' | 'design' | 'launch' | 'working';

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
}

export type FaqAnswerPart = string | { text: string; to: string };

export interface Faq {
  /** Stable slug, also used as the URL hash (e.g. /faq#website-cost). */
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: FaqAnswerPart[];
}

export const faqCategories: FaqCategory[] = [
  { id: 'pricing', label: 'Pricing & Timeline' },
  { id: 'process', label: 'Process & Communication' },
  { id: 'design', label: 'Design & Development' },
  { id: 'launch', label: 'Launch & Support' },
  { id: 'working', label: 'Working Together' },
];

export const faqs: Faq[] = [
  // ── Pricing & Timeline ────────────────────────────────────────────────
  {
    id: 'website-cost',
    category: 'pricing',
    question: 'How much does a website cost?',
    answer: [
      'It depends on scope. We do not publish fixed prices, because every project is priced to its requirements: the number of pages or screens, design depth, features and integrations all play a part. For an indicative range, try the ',
      { text: 'AI estimator on our pricing page', to: '/pricing#estimate' },
      '. We then confirm your final quote after a free consultation, once we understand your goals and requirements.',
    ],
  },
  {
    id: 'website-timeline',
    category: 'pricing',
    question: 'How long does a website take?',
    answer: [
      'Starter projects typically take 2–4 weeks and Professional projects 4–10 weeks. Enterprise builds usually run 3+ months and are scheduled per project. Timelines depend on scope and on how quickly content and feedback come through, and we agree on a schedule before work begins. The ',
      { text: 'AI estimator', to: '/pricing#estimate' },
      ' gives an indicative timeline for your project, and we confirm it during a free consultation.',
    ],
  },
  {
    id: 'price-factors',
    category: 'pricing',
    question: 'What affects the final price of a project?',
    answer: [
      'The main factors are the number of pages or screens, custom design work, functionality such as user accounts, payments or dashboards, third-party integrations, and content migration. We scope these together during the free consultation so the quote reflects exactly what you need, with no surprise line items.',
    ],
  },
  {
    id: 'free-audit',
    category: 'pricing',
    question: 'Do you offer a free website audit?',
    answer: [
      'Yes. If you already have a website, we can review it for performance, usability, SEO basics and conversion issues, and give you practical recommendations. ',
      { text: 'Request your free audit', to: '/free-audit' },
      ', with no obligation to work with us afterwards.',
    ],
  },

  // ── Process & Communication ───────────────────────────────────────────
  {
    id: 'development-process',
    category: 'process',
    question: 'How does your development process work?',
    answer: [
      'Every project follows the same clear path: Discovery → Strategy → UI/UX → Development → Testing → Launch → Support. You review and approve the work at key milestones, so there are no surprises at the end. You can read more about how we work on our ',
      { text: 'services page', to: '/services' },
      '.',
    ],
  },
  {
    id: 'communication',
    category: 'process',
    question: 'How do we communicate during the project?',
    answer: [
      'You get a direct point of contact and regular progress updates throughout the build. At kickoff we agree on a communication rhythm that suits you, whether that is email, scheduled video calls or a shared project channel, and you can review work in progress before each milestone is signed off.',
    ],
  },
  {
    id: 'international-clients',
    category: 'process',
    question: 'Do you work with international clients?',
    answer: [
      'Yes. We work remotely, so we can partner with businesses wherever they are based. We plan meetings around overlapping working hours and keep everything documented in writing, so progress stays clear across time zones.',
    ],
  },
  {
    id: 'what-we-need',
    category: 'process',
    question: 'What do you need from me to get started?',
    answer: [
      'A short conversation about your goals, audience and timeline is enough to begin. Helpful extras include your brand assets (logo, colours, fonts), any existing content, examples of sites you like, and access to your current domain or hosting if you have them. If you do not have everything yet, we will help you work out what is needed. ',
      { text: 'Start the conversation', to: '/hire' },
      '.',
    ],
  },

  // ── Design & Development ──────────────────────────────────────────────
  {
    id: 'ui-ux-design',
    category: 'design',
    question: 'Do you provide UI/UX design?',
    answer: [
      'Yes. Design is a core part of our process: we research your users, map out user flows, create wireframes and then produce polished, responsive interface designs for you to review before development starts. We can also work from designs your team already has.',
    ],
  },
  {
    id: 'redesign',
    category: 'design',
    question: 'Can you redesign an existing website?',
    answer: [
      'Absolutely. We start by reviewing what works and what does not on your current site, then modernise the design, structure and performance while protecting the content and search visibility you have already built. A ',
      { text: 'free website audit', to: '/free-audit' },
      ' is a good first step.',
    ],
  },
  {
    id: 'technologies',
    category: 'design',
    question: 'What technologies do you use?',
    answer: [
      'We choose the stack to fit the project. Our core tools include React, Next.js, TypeScript and Tailwind CSS on the front end; Node.js and Python on the back end; PostgreSQL and MongoDB for data; AWS and Docker for infrastructure; and React Native for mobile apps. ',
      { text: 'Explore our services', to: '/services' },
      '.',
    ],
  },
  {
    id: 'third-party-apis',
    category: 'design',
    question: 'Can you integrate third-party APIs?',
    answer: [
      'Yes. We regularly connect websites and apps to external services such as payment gateways, CRMs, email marketing platforms, analytics, maps and other REST or GraphQL APIs. If a service offers an API, we can usually integrate it, and we will flag any limitations during scoping.',
    ],
  },
  {
    id: 'ecommerce',
    category: 'design',
    question: 'Do you build e-commerce stores?',
    answer: [
      'Yes. We build online stores with product catalogues, secure checkout, payment integration, inventory and order management, tailored to how you sell. We will recommend the right platform or a custom build based on your product range and growth plans.',
    ],
  },
  {
    id: 'mobile-apps',
    category: 'design',
    question: 'Do you build mobile apps?',
    answer: [
      'Yes. We build cross-platform mobile apps with React Native, which lets a single codebase serve both iOS and Android. We can also build the web app and backend that power it, so everything works together.',
    ],
  },

  // ── Launch & Support ──────────────────────────────────────────────────
  {
    id: 'hosting-deployment',
    category: 'launch',
    question: 'Do you provide hosting and deployment?',
    answer: [
      'Yes. We handle deployment end to end, including domain and DNS setup, SSL, and production configuration, on reliable platforms such as Vercel or AWS depending on your needs. Hosting accounts can be set up in your name so you always keep control of your infrastructure.',
    ],
  },
  {
    id: 'seo',
    category: 'launch',
    question: 'Do you provide SEO?',
    answer: [
      'Every site we build includes technical SEO foundations: fast load times, clean semantic markup, meta tags, structured data, sitemaps and mobile-friendly layouts. We can also help with on-page optimisation. No one can honestly guarantee rankings, but we make sure your site is set up to compete. Find practical tips on our ',
      { text: 'blog', to: '/blog' },
      '.',
    ],
  },
  {
    id: 'after-launch',
    category: 'launch',
    question: 'What happens after launch?',
    answer: [
      'We monitor the launch closely, fix any issues that come up, and walk you through managing your site or app. From there you can take it over yourself or continue with us for maintenance, improvements and new features as your business grows.',
    ],
  },
  {
    id: 'maintenance',
    category: 'launch',
    question: 'Do you provide maintenance?',
    answer: [
      'Yes. We offer ongoing maintenance covering updates, security patches, backups, performance checks, bug fixes and small content or feature changes. We will tailor the level of support to your project, and you can discuss options during your consultation.',
    ],
  },

  // ── Working Together ──────────────────────────────────────────────────
  {
    id: 'nda',
    category: 'working',
    question: 'Do you sign NDAs?',
    answer: [
      'Yes. NDAs are available on request, and we are happy to sign one before you share any confidential details about your idea or business. Just let us know when you get in touch. You can also read about how we handle data on our ',
      { text: 'security page', to: '/security' },
      '.',
    ],
  },
  {
    id: 'code-ownership',
    category: 'working',
    question: 'Who owns the code?',
    answer: [
      'You do. Once the project is paid for, the code, designs and assets we create for you belong to you, and we hand over repositories and account access. Ownership terms are written into your project agreement so there is no ambiguity.',
    ],
  },
  {
    id: 'security',
    category: 'working',
    question: 'How do you keep my project and data secure?',
    answer: [
      'We follow secure development practices such as encrypted connections, careful access control, safe handling of credentials and keeping dependencies up to date. Access to your systems is limited to the people working on your project. See our ',
      { text: 'security page', to: '/security' },
      ' for details.',
    ],
  },
  {
    id: 'see-work',
    category: 'working',
    question: 'Can I see examples of your work?',
    answer: [
      'Of course. Browse our ',
      { text: 'portfolio', to: '/portfolio' },
      ' for recent projects, or read our ',
      { text: 'case studies', to: '/portfolio' },
      ' to see how we approached specific challenges from brief to launch.',
    ],
  },
];

/** Flatten an answer to plain text (used for search and JSON-LD). */
export function faqAnswerText(answer: FaqAnswerPart[]): string {
  return answer
    .map((part) => (typeof part === 'string' ? part : part.text))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}
