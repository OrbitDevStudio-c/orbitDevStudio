import type { LucideIcon } from 'lucide-react';
import {
  Layers,
  Smartphone,
  BrainCircuit,
  ShieldCheck,
  Layout,
  Server,
  Database,
  Cloud,
  Code2,
  Apple,
  Bot,
  Cpu,
  Search,
  Rocket,
  Boxes,
  Wrench,
} from 'lucide-react';

export interface StackTool {
  name: string;
  role: string;
}

export interface StackLayer {
  title: string;
  icon: LucideIcon;
  summary: string;
  tools: StackTool[];
}

/** "When to use each" option, used where we pick between alternatives (mobile, AI). */
export interface StackChoice {
  name: string;
  pickWhen: string[];
  tradeoff: string;
}

export interface StackComparison {
  heading: string;
  intro: string;
  columns: [string, string];
  rows: { label: string; a: string; b: string }[];
}

export interface TechStackPage {
  slug: string;
  /** Dropdown / mobile menu label and one-line description. */
  navLabel: string;
  navDesc: string;
  icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  /** Short list shown as chips in the hero. */
  coreTools: string[];
  layersHeading: string;
  layersIntro: string;
  layers: StackLayer[];
  choices?: { heading: string; intro: string; items: StackChoice[] };
  comparison?: StackComparison;
  principlesHeading: string;
  principles: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const techStackPages: TechStackPage[] = [
  {
    slug: 'web-backend',
    navLabel: 'Web & Backend Stack',
    navDesc: 'Next.js, NestJS, TypeScript, PostgreSQL and Prisma.',
    icon: Layers,
    metaTitle: 'Web & Backend Stack | Orbit Dev Studios',
    metaDescription:
      'The web and backend stack we build on: Next.js and React on the front end, NestJS and Node.js APIs, TypeScript end to end, PostgreSQL with Prisma, deployed on Vercel, AWS and Docker.',
    eyebrow: 'Web & Backend',
    title: 'One typed stack,',
    highlight: 'from browser to database.',
    intro:
      'Most of the websites, web apps and SaaS products we ship run on the same proven foundation: Next.js on the front end, NestJS for APIs, PostgreSQL for data and TypeScript everywhere in between. One language and one set of conventions means fewer bugs, faster delivery and code any good developer can pick up later.',
    coreTools: ['Next.js', 'React', 'NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    layersHeading: 'What each layer is built with',
    layersIntro:
      'Every layer has a default choice. We only swap one out when a project has a clear reason to, and we tell you why before we do.',
    layers: [
      {
        title: 'Front end',
        icon: Layout,
        summary: 'Fast, search-friendly pages and app interfaces with a consistent design system.',
        tools: [
          { name: 'Next.js', role: 'Server rendering and static pages for SEO-critical sites and dashboards.' },
          { name: 'React', role: 'Component model for everything interactive.' },
          { name: 'Tailwind CSS', role: 'Utility-first styling that keeps design tokens consistent.' },
          { name: 'Vite', role: 'Lightweight builds for SPAs and internal tools that do not need a server.' },
        ],
      },
      {
        title: 'Backend & APIs',
        icon: Server,
        summary: 'Structured, testable services with clear module boundaries.',
        tools: [
          { name: 'NestJS', role: 'Opinionated Node.js framework for REST and GraphQL APIs with built-in validation and DI.' },
          { name: 'Node.js', role: 'Lightweight services, webhooks and serverless functions.' },
          { name: 'Python', role: 'Data processing, scripting and AI-heavy services where its ecosystem is stronger.' },
          { name: 'Auth', role: 'Established libraries (Auth.js, Clerk or Cognito) instead of hand-rolled login.' },
        ],
      },
      {
        title: 'Data',
        icon: Database,
        summary: 'Relational data you can trust, with typed access and safe migrations.',
        tools: [
          { name: 'PostgreSQL', role: 'Our default database: reliable, relational and well supported by every host.' },
          { name: 'Prisma', role: 'Type-safe queries and versioned schema migrations.' },
          { name: 'Redis', role: 'Caching, rate limiting, queues and sessions.' },
          { name: 'MongoDB', role: 'Used when the data is genuinely document-shaped.' },
        ],
      },
      {
        title: 'Infrastructure',
        icon: Cloud,
        summary: 'Hosting that matches the product, with accounts in your name.',
        tools: [
          { name: 'Vercel', role: 'Zero-config hosting and previews for Next.js front ends.' },
          { name: 'AWS', role: 'Managed databases, storage and compute when you need more control.' },
          { name: 'Docker', role: 'Repeatable environments for APIs and background workers.' },
          { name: 'GitHub Actions', role: 'Automated checks, tests and deploys on every change.' },
        ],
      },
    ],
    principlesHeading: 'How we use it',
    principles: [
      {
        title: 'TypeScript end to end',
        body: 'Shared types between the API and the UI catch mismatched data at build time instead of in production.',
      },
      {
        title: 'Boring where it matters',
        body: 'We pick mature, widely used tools for the core so your product is easy to hire for and maintain.',
      },
      {
        title: 'Performance by default',
        body: 'Server rendering, image optimisation and caching are part of the baseline, not an add-on.',
      },
      {
        title: 'You own everything',
        body: 'Code, repositories and hosting accounts live under your organisation from day one.',
      },
    ],
    faqs: [
      {
        q: 'Why Next.js and not plain React?',
        a: 'Next.js is built on React and adds server rendering, routing and image optimisation. For public, content-led sites where search visibility matters it is usually the better fit. For internal tools and app-only products, plain React with Vite can be simpler, and we will recommend it when it is.',
      },
      {
        q: 'Why NestJS for the backend?',
        a: 'NestJS gives Node.js a clear structure (modules, controllers, services) and built-in validation, which keeps APIs consistent as they grow. For very small backends we may use lightweight Node.js functions instead.',
      },
      {
        q: 'Can you work with our existing stack?',
        a: 'Yes. If you already run on a different framework or database, we can extend it. Our defaults apply to new builds, not to rewrites nobody asked for.',
      },
    ],
  },
  {
    slug: 'mobile',
    navLabel: 'Mobile App Stack',
    navDesc: 'React Native, Flutter, Kotlin and Swift — when to use each.',
    icon: Smartphone,
    metaTitle: 'Mobile App Stack | Orbit Dev Studios',
    metaDescription:
      'How we choose between React Native, Flutter, Kotlin and Swift for iOS and Android apps, and the tools we use for backend, releases and monitoring.',
    eyebrow: 'Mobile Apps',
    title: 'The right mobile stack,',
    highlight: 'not the trendy one.',
    intro:
      'Cross-platform frameworks are the right answer for most apps, but not all of them. We start from what your app actually needs (budget, timeline, device features, performance) and then pick between React Native, Flutter and fully native Kotlin or Swift.',
    coreTools: ['React Native', 'Expo', 'Flutter', 'Kotlin', 'Swift', 'Firebase'],
    layersHeading: 'What sits around the app',
    layersIntro: 'The framework is one decision. These are the pieces we use around it on every mobile project.',
    layers: [
      {
        title: 'Cross-platform',
        icon: Code2,
        summary: 'One codebase for iOS and Android when that is the right trade.',
        tools: [
          { name: 'React Native', role: 'Our default for cross-platform apps; shares TypeScript and logic with our web stack.' },
          { name: 'Expo', role: 'Faster builds, over-the-air updates and simpler native module setup.' },
          { name: 'Flutter', role: 'Pixel-consistent custom UI across platforms.' },
        ],
      },
      {
        title: 'Native',
        icon: Apple,
        summary: 'Platform-first apps when performance or deep OS features come first.',
        tools: [
          { name: 'Swift / SwiftUI', role: 'iOS apps that need the latest Apple APIs and the tightest performance.' },
          { name: 'Kotlin / Jetpack Compose', role: 'Android apps with deep hardware or background-service needs.' },
        ],
      },
      {
        title: 'Backend & data',
        icon: Database,
        summary: 'APIs, sync and push notifications that the app relies on.',
        tools: [
          { name: 'NestJS + PostgreSQL', role: 'The same backend stack we use for web, so one API serves both.' },
          { name: 'Firebase', role: 'Push notifications, analytics and quick real-time features.' },
          { name: 'SQLite / MMKV', role: 'Local storage for offline-first apps.' },
        ],
      },
      {
        title: 'Release & monitoring',
        icon: Rocket,
        summary: 'Getting builds to the stores and keeping them healthy.',
        tools: [
          { name: 'EAS / Fastlane', role: 'Automated builds, signing and store submissions.' },
          { name: 'TestFlight & Play Console', role: 'Beta testing tracks before public release.' },
          { name: 'Sentry', role: 'Crash reporting and performance monitoring in production.' },
        ],
      },
    ],
    choices: {
      heading: 'When to use each',
      intro: 'A quick guide to how we decide. We will walk you through the trade-offs for your app before anything is built.',
      items: [
        {
          name: 'React Native',
          pickWhen: [
            'You need iOS and Android on one budget and timeline',
            'You also have (or plan) a React web app and want to share logic',
            'The app is mostly forms, content, lists and standard device features',
          ],
          tradeoff: 'Very heavy animation or cutting-edge platform APIs may need native modules.',
        },
        {
          name: 'Flutter',
          pickWhen: [
            'Brand-heavy custom UI must look identical on every device',
            'Your team already works in Dart',
            'You want one codebase that may also target desktop',
          ],
          tradeoff: 'Dart does not share code with a TypeScript web stack.',
        },
        {
          name: 'Kotlin (Android)',
          pickWhen: [
            'The app is Android-only or Android-first',
            'You need deep hardware, background services or OEM integrations',
            'Performance on lower-end devices is critical',
          ],
          tradeoff: 'A separate codebase is needed if you later want iOS.',
        },
        {
          name: 'Swift (iOS)',
          pickWhen: [
            'The app is iOS-only or iOS-first',
            'You rely on new Apple APIs (widgets, HealthKit, ARKit, Watch)',
            'You want the most native look and feel on Apple devices',
          ],
          tradeoff: 'A separate codebase is needed if you later want Android.',
        },
      ],
    },
    principlesHeading: 'How we build mobile apps',
    principles: [
      { title: 'Decide early, decide once', body: 'We settle the framework during discovery, so you never pay for a rewrite halfway through.' },
      { title: 'Shared backend', body: 'Mobile and web talk to the same API, so business rules live in one place.' },
      { title: 'Store-ready from sprint one', body: 'Signing, store listings and beta tracks are set up early, not the week before launch.' },
      { title: 'Measured in production', body: 'Crash and performance reporting ship with the first build.' },
    ],
    faqs: [
      {
        q: 'Is a cross-platform app slower than a native one?',
        a: 'For most business apps, users will not notice a difference. Native wins for graphics-heavy apps, complex background work or features that depend on the newest OS APIs, and we will tell you if your app falls into that group.',
      },
      {
        q: 'Can you publish the app to the App Store and Google Play?',
        a: 'Yes. We handle builds, signing, store listings and review submissions, using developer accounts set up in your name.',
      },
      {
        q: 'Can we start cross-platform and go native later?',
        a: 'Yes. React Native in particular lets us drop to native Swift or Kotlin for individual screens or modules without rewriting the whole app.',
      },
    ],
  },
  {
    slug: 'ai',
    navLabel: 'AI Stack',
    navDesc: 'Models, frameworks, vector databases and deployment.',
    icon: BrainCircuit,
    metaTitle: 'AI Stack | Orbit Dev Studios',
    metaDescription:
      'The AI stack we use to build assistants, RAG search and automations: hosted LLMs from OpenAI, Anthropic and Google, open models, vector databases like pgvector, and production deployment.',
    eyebrow: 'AI',
    title: 'AI features that work',
    highlight: 'outside the demo.',
    intro:
      'We build AI assistants, document search, classification and workflow automations into real products. That means choosing the right model for the job, grounding it in your data, measuring its answers and running it with sensible costs and guardrails.',
    coreTools: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'LangChain', 'pgvector', 'Python'],
    layersHeading: 'The layers of an AI product',
    layersIntro: 'A useful AI feature is much more than a model call. These are the layers we put in place.',
    layers: [
      {
        title: 'Models',
        icon: Cpu,
        summary: 'Hosted and open models chosen per task, not per hype cycle.',
        tools: [
          { name: 'OpenAI GPT', role: 'General reasoning, structured output, speech-to-text with Whisper.' },
          { name: 'Anthropic Claude', role: 'Long documents, careful writing and tool use.' },
          { name: 'Google Gemini', role: 'Multimodal input and very long context.' },
          { name: 'Open models (Llama, Mistral)', role: 'Self-hosted when data must stay on your infrastructure.' },
        ],
      },
      {
        title: 'Frameworks',
        icon: Bot,
        summary: 'Orchestration for prompts, tools and multi-step agents.',
        tools: [
          { name: 'Provider SDKs', role: 'Direct, lightweight API access when a framework adds nothing.' },
          { name: 'LangChain / LlamaIndex', role: 'Retrieval pipelines, document loaders and agent tooling.' },
          { name: 'Vercel AI SDK', role: 'Streaming chat interfaces in Next.js and React.' },
        ],
      },
      {
        title: 'Retrieval & vector data',
        icon: Search,
        summary: 'Grounding answers in your documents so the model cites, not guesses.',
        tools: [
          { name: 'pgvector', role: 'Vector search inside PostgreSQL; our default, so there is one less system to run.' },
          { name: 'Pinecone', role: 'Managed vector search at larger scale.' },
          { name: 'Embeddings', role: 'Chunking and embedding pipelines tuned to your content.' },
        ],
      },
      {
        title: 'Deployment & evaluation',
        icon: Cloud,
        summary: 'Running AI in production with visibility into quality and cost.',
        tools: [
          { name: 'Serverless APIs', role: 'Model calls behind your own API, never exposing keys to the browser.' },
          { name: 'Evals & logging', role: 'Test sets and tracing to measure answer quality over time.' },
          { name: 'Guardrails', role: 'Rate limits, input validation, PII handling and fallbacks.' },
        ],
      },
    ],
    choices: {
      heading: 'Which approach fits your use case',
      intro: 'Most projects use more than one of these. We start with the simplest that meets the goal.',
      items: [
        {
          name: 'Prompted hosted model',
          pickWhen: ['Drafting, summarising or classifying text', 'You want results in days, not weeks', 'Data can be sent to a trusted provider'],
          tradeoff: 'Answers are limited to what the model already knows.',
        },
        {
          name: 'RAG (retrieval)',
          pickWhen: ['Answers must come from your documents or database', 'Content changes often', 'You need sources cited in the answer'],
          tradeoff: 'Quality depends on how well documents are chunked and indexed.',
        },
        {
          name: 'Agents & tool use',
          pickWhen: ['The AI must take actions: book, update, look things up', 'Tasks span several steps or systems'],
          tradeoff: 'Needs stricter permissions, logging and human review.',
        },
        {
          name: 'Self-hosted open model',
          pickWhen: ['Data cannot leave your infrastructure', 'High, steady volume makes per-call pricing expensive'],
          tradeoff: 'More setup and hosting cost; usually less capable than top hosted models.',
        },
      ],
    },
    principlesHeading: 'How we build with AI',
    principles: [
      { title: 'Model-agnostic', body: 'We keep the model behind a thin layer so you can switch providers as prices and quality change.' },
      { title: 'Grounded answers', body: 'Where accuracy matters, answers are tied to your data with sources shown.' },
      { title: 'Measured, not vibes', body: 'We test against real questions before launch and keep evaluating after.' },
      { title: 'Private by design', body: 'API keys stay server-side, and we use providers and settings that do not train on your data.' },
    ],
    faqs: [
      {
        q: 'Which AI model will you use?',
        a: 'It depends on the task, budget and data rules. We often prototype with two or three models and pick the one that performs best on your real examples.',
      },
      {
        q: 'Will our data be used to train the AI?',
        a: 'We use business API tiers and settings where providers do not train on your inputs. If data must not leave your infrastructure at all, we can run an open model on your own servers.',
      },
      {
        q: 'How do you stop the AI making things up?',
        a: 'We ground answers in your content with retrieval, ask the model to cite sources, restrict it to the task and test it against known questions. No system is perfect, so we also design for human review where mistakes are costly.',
      },
    ],
  },
  {
    slug: 'why-our-stack',
    navLabel: 'Why Our Tech Stack',
    navDesc: 'The standardized-stack advantage.',
    icon: ShieldCheck,
    metaTitle: 'Why Our Tech Stack | Orbit Dev Studios',
    metaDescription:
      'Why Orbit Dev Studios builds on a standardized, proven tech stack: faster delivery, fewer bugs, easier hiring, simpler handover and lower long-term cost.',
    eyebrow: 'Why Our Stack',
    title: 'The standardized-stack',
    highlight: 'advantage.',
    intro:
      'We could learn a new framework on every project. We choose not to. Building on a small set of proven tools that we know deeply lets us spend your budget on your product, not on rediscovering how to set up authentication or deployments.',
    coreTools: ['TypeScript', 'Next.js', 'NestJS', 'PostgreSQL', 'React Native', 'Docker'],
    layersHeading: 'What standardizing gives you',
    layersIntro: 'The benefits compound over the life of the product, not just at launch.',
    layers: [
      {
        title: 'Faster delivery',
        icon: Rocket,
        summary: 'Reusable starters, patterns and CI pipelines mean we start building features in week one.',
        tools: [
          { name: 'Project starters', role: 'Auth, routing, linting and deploys ready on day one.' },
          { name: 'Shared components', role: 'Tested building blocks instead of rewriting the basics.' },
        ],
      },
      {
        title: 'Fewer surprises',
        icon: ShieldCheck,
        summary: 'Tools we have shipped many times have known edge cases and known fixes.',
        tools: [
          { name: 'Known failure modes', role: 'We have already hit, and solved, the common problems.' },
          { name: 'Security baseline', role: 'Same hardened defaults on every project.' },
        ],
      },
      {
        title: 'Easy to hand over',
        icon: Boxes,
        summary: 'Popular, well-documented tools mean any capable developer can take over.',
        tools: [
          { name: 'Large talent pool', role: 'TypeScript, React and PostgreSQL skills are easy to hire.' },
          { name: 'Clear conventions', role: 'Consistent structure across codebases and documentation.' },
        ],
      },
      {
        title: 'Lower long-term cost',
        icon: Wrench,
        summary: 'Maintenance, upgrades and new features stay predictable.',
        tools: [
          { name: 'Mainstream upgrades', role: 'Well-supported tools get security patches for years.' },
          { name: 'One language', role: 'TypeScript across web, API and mobile reduces context-switching.' },
        ],
      },
    ],
    comparison: {
      heading: 'Standardized vs. one-off stacks',
      intro: 'What changes when your agency builds on a stack it knows deeply.',
      columns: ['Standardized stack', 'New stack every project'],
      rows: [
        { label: 'Project setup', a: 'Days, from tested starters', b: 'Weeks of setup and decisions' },
        { label: 'Bugs & edge cases', a: 'Known and already solved', b: 'Discovered in production' },
        { label: 'Estimates', a: 'Based on real past builds', b: 'Mostly guesswork' },
        { label: 'Hiring & handover', a: 'Large pool of developers', b: 'Niche or scarce skills' },
        { label: 'Maintenance', a: 'Predictable upgrades', b: 'Unclear, often costly' },
      ],
    },
    principlesHeading: 'Standard, not rigid',
    principles: [
      { title: 'Defaults, not dogma', body: 'Every layer has a default, but if your project needs something else we will say so and explain why.' },
      { title: 'Your stack first', body: 'If you already have systems in place, we extend them rather than replacing what works.' },
      { title: 'Reviewed regularly', body: 'We revisit our defaults as tools mature, adopting changes only once they are proven.' },
      { title: 'No lock-in', body: 'Everything is open source or industry standard, hosted in accounts you own.' },
    ],
    faqs: [
      {
        q: 'Does a standard stack mean a template website?',
        a: 'No. The stack is the foundation (languages, frameworks, databases). The design, features and user experience are built specifically for your product.',
      },
      {
        q: 'What if our project needs a different technology?',
        a: 'Then we use it. Our defaults cover most projects, but we will recommend something else when there is a clear technical or business reason.',
      },
    ],
  },
];

export const getTechStackPage = (slug: string | undefined) =>
  techStackPages.find((page) => page.slug === slug);
