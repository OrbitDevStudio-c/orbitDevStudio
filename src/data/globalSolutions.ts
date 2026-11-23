import type { LucideIcon } from 'lucide-react';
import {
  AppWindow,
  Boxes,
  BrainCircuit,
  Building2,
  Briefcase,
  Cloud,
  Code2,
  FileText,
  Globe,
  HeartPulse,
  Layers,
  LifeBuoy,
  Lock,
  MessageSquare,
  Milestone,
  PenTool,
  Plane,
  Plug,
  RefreshCw,
  Rocket,
  ShoppingCart,
  Smartphone,
  Store,
  TrendingUp,
  UtensilsCrossed,
  Users,
  Workflow,
  Ruler,
  Cpu,
} from 'lucide-react';
import type { FaqAnswerPart } from './faqs';

/**
 * Content for the /global-solutions page.
 *
 * Only supportable claims live here: Orbit Dev Studios is an India-based (Ahmedabad) studio that
 * works with clients remotely. No international offices, client logos, certifications, statistics
 * or testimonials are claimed. Project references come from src/data/projects.ts by slug.
 */

export const INQUIRY_ID = 'global-inquiry';

/* ── Audiences ─────────────────────────────────────────────────────────── */

export type AudienceId = 'startup' | 'smb' | 'growing' | 'enterprise';

export interface Audience {
  id: AudienceId;
  title: string;
  message: string;
  icon: LucideIcon;
  /** Tailwind gradient stops for the card's accent bar and glow. */
  accent: string;
  points: string[];
  /** Matches an option value in the inquiry form's business-type field. */
  businessType: string;
}

export const audiences: Audience[] = [
  {
    id: 'startup',
    title: 'Startups & Entrepreneurs',
    message: 'Turn your idea into a market-ready digital product.',
    icon: Rocket,
    accent: 'from-[#6c2bff] to-[#00d9ff]',
    points: ['MVP development', 'SaaS development', 'Startup websites', 'Product prototyping', 'AI-powered products', 'Technical product development'],
    businessType: 'startup',
  },
  {
    id: 'smb',
    title: 'Small & Medium Businesses',
    message: 'Modernize your business and reach more customers.',
    icon: Store,
    accent: 'from-[#1677ff] to-[#00d9ff]',
    points: ['Business websites', 'E-commerce platforms', 'CRM systems', 'Business management software', 'Workflow automation', 'AI integration'],
    businessType: 'smb',
  },
  {
    id: 'growing',
    title: 'Growing Companies',
    message: 'Build systems that support your next stage of growth.',
    icon: TrendingUp,
    accent: 'from-[#1677ff] to-[#6c2bff]',
    points: ['Custom web applications', 'ERP and business software', 'API integrations', 'Business automation', 'Cloud-ready applications', 'Digital transformation'],
    businessType: 'growing',
  },
  {
    id: 'enterprise',
    title: 'Enterprises',
    message: 'Engineering solutions for complex business requirements.',
    icon: Building2,
    accent: 'from-[#050b2e] to-[#1677ff]',
    points: ['Custom enterprise software', 'AI and machine learning solutions', 'Complex system integrations', 'Scalable application architecture', 'Enterprise web applications', 'Dedicated development support'],
    businessType: 'enterprise',
  },
];

/* ── Markets ───────────────────────────────────────────────────────────── */

export interface Market {
  id: string;
  name: string;
  /** Short label drawn on the map. */
  short: string;
  /** Flag file in /public/flags (Europe = EU flag, Africa = African Union flag). */
  flag: string;
  /** Longitude / latitude of the marker. */
  lon: number;
  lat: number;
}

/** Orbit Dev Studios' real location: Ahmedabad, Gujarat, India. */
export const HOME_BASE = { name: 'Ahmedabad, India', lon: 72.6, lat: 23.0 };

export const markets: Market[] = [
  { id: 'us', flag: 'us', name: 'United States', short: 'USA', lon: -98, lat: 39 },
  { id: 'uk', flag: 'gb', name: 'United Kingdom', short: 'UK', lon: -2, lat: 53.5 },
  { id: 'ca', flag: 'ca', name: 'Canada', short: 'Canada', lon: -100, lat: 57 },
  { id: 'au', flag: 'au', name: 'Australia', short: 'Australia', lon: 134, lat: -25 },
  { id: 'ae', flag: 'ae', name: 'United Arab Emirates', short: 'UAE', lon: 54.4, lat: 24.3 },
  { id: 'eu', flag: 'eu', name: 'Germany & wider Europe', short: 'Europe', lon: 10.5, lat: 51 },
  { id: 'sg', flag: 'sg', name: 'Singapore', short: 'Singapore', lon: 103.8, lat: 1.35 },
  { id: 'ph', flag: 'ph', name: 'Philippines', short: 'Philippines', lon: 122, lat: 13 },
  { id: 'id', flag: 'id', name: 'Indonesia', short: 'Indonesia', lon: 113, lat: -2 },
  { id: 'ru', flag: 'ru', name: 'Russia', short: 'Russia', lon: 60, lat: 60 },
  { id: 'af', flag: 'af', name: 'Africa', short: 'Africa', lon: 20, lat: 5 },
];

/* ── Services ──────────────────────────────────────────────────────────── */

export interface GlobalService {
  title: string;
  icon: LucideIcon;
  value: string;
  to: string;
}

export const globalServices: GlobalService[] = [
  { title: 'Website Development', icon: Globe, value: 'Fast, search-friendly sites that present your business credibly to customers in any market.', to: '/services' },
  { title: 'Web Application Development', icon: AppWindow, value: 'Browser-based products and portals that replace spreadsheets, manual steps and disconnected tools.', to: '/services' },
  { title: 'Mobile Application Development', icon: Smartphone, value: 'Apps that put your product in customers’ and teams’ hands, planned around real usage.', to: '/services' },
  { title: 'UI/UX Design', icon: PenTool, value: 'Interfaces designed around how people work, so more of them finish what they came to do.', to: '/services' },
  { title: 'E-commerce Development', icon: ShoppingCart, value: 'Stores built around the buying journey, from catalog and cart through to checkout and orders.', to: '/industries/ecommerce-retail' },
  { title: 'Custom Business Software', icon: Boxes, value: 'Software shaped around your own operations instead of forcing your process into an off-the-shelf tool.', to: '/services' },
  { title: 'AI & Machine Learning', icon: BrainCircuit, value: 'Practical AI features, from assistants to document and resume analysis, added where they save real effort.', to: '/portfolio' },
  { title: 'Workflow Automation', icon: Workflow, value: 'Repetitive approvals, notifications and data entry handled by the system, so your team can focus on work only people can do.', to: '/services' },
  { title: 'API Development & Integration', icon: Plug, value: 'Clean APIs and connections that let your systems, vendors and platforms share data reliably.', to: '/tech' },
  { title: 'Maintenance & Technical Support', icon: LifeBuoy, value: 'Updates, fixes and improvements after launch, so what we build keeps working as your business changes.', to: '/pricing' },
];

/* ── Industries ────────────────────────────────────────────────────────── */

export interface GlobalIndustry {
  title: string;
  icon: LucideIcon;
  description: string;
  /** Existing industry page, or the industries index. */
  to: string;
  /** Slugs from src/data/projects.ts that genuinely belong to this industry. */
  projects: string[];
}

export const globalIndustries: GlobalIndustry[] = [
  { title: 'Healthcare & Medical', icon: HeartPulse, description: 'Clinic, pharmacy and patient-facing platforms where clarity and trust matter.', to: '/industries/healthcare', projects: ['shivedlife-medicare', 'pharmacare-platform'] },
  { title: 'E-commerce & Retail', icon: ShoppingCart, description: 'Online stores and multi-category commerce built around the customer’s buying journey.', to: '/industries/ecommerce-retail', projects: ['ravantra', 'orbit-food', 'bookverse'] },
  { title: 'Architecture & Interior Design', icon: Ruler, description: 'Portfolio-led sites that let the work speak and turn visitors into enquiries.', to: '/industries', projects: ['aura-design-studio', 'designerss-creative'] },
  { title: 'Restaurants & Hospitality', icon: UtensilsCrossed, description: 'Menus, ordering and order tracking designed for speed and reliability.', to: '/industries', projects: ['orbit-food'] },
  { title: 'Professional Services', icon: Briefcase, description: 'Credible, lead-focused websites and client tools for firms that sell expertise.', to: '/industries', projects: ['navnidhi-trading'] },
  { title: 'Travel & Tourism', icon: Plane, description: 'Destination, itinerary and booking experiences for travel businesses.', to: '/industries', projects: [] },
  { title: 'SaaS & Technology', icon: Cloud, description: 'Subscription products and AI-powered platforms, from first release to scale.', to: '/industries/saas', projects: ['hirenova', 'knowledgevoice'] },
  { title: 'Corporate & Enterprise', icon: Building2, description: 'Internal systems, ERPs and corporate platforms for complex operations.', to: '/industries/manufacturing', projects: ['probuild-erp', 'navnidhi-trading'] },
];

/* ── Why Orbit ─────────────────────────────────────────────────────────── */

export const globalReasons: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Direct developer communication', text: 'You talk to the people building your product, not a layer of account managers.', icon: MessageSquare },
  { title: 'Transparent milestones', text: 'Scope is split into agreed milestones, so you always know what is done and what is next.', icon: Milestone },
  { title: 'Remote collaboration', text: 'A remote-first way of working, built around written scope, shared tools and regular updates.', icon: Users },
  { title: 'Modern technology stack', text: 'React, TypeScript, Node.js and cloud-ready tooling, chosen for maintainability.', icon: Code2 },
  { title: 'NDA on request', text: 'Share your idea with confidence. We are happy to sign an NDA before you describe it.', icon: Lock },
  { title: 'Clear source-code ownership', text: 'Ownership terms are written into the project agreement before work begins.', icon: FileText },
  { title: 'Scalable architecture', text: 'Foundations planned for growth, so today’s build does not become tomorrow’s rewrite.', icon: Layers },
  { title: 'Post-launch maintenance options', text: 'Support and improvement plans are available after launch, scoped separately.', icon: RefreshCw },
  { title: 'Flexible engagement models', text: 'Fixed-price, dedicated or hourly: pick what suits the stage and shape of your project.', icon: Cpu },
];

/* ── Process ───────────────────────────────────────────────────────────── */

export const globalProcess: { step: string; title: string; text: string }[] = [
  { step: '01', title: 'Discovery', text: 'Understand the business, requirements and goals.' },
  { step: '02', title: 'Strategy', text: 'Define scope, architecture, technology and milestones.' },
  { step: '03', title: 'Design', text: 'Create UI/UX and approve the product direction.' },
  { step: '04', title: 'Development', text: 'Build through structured development cycles.' },
  { step: '05', title: 'Testing', text: 'Quality assurance, performance and security checks.' },
  { step: '06', title: 'Deployment', text: 'Launch and hand over the completed solution.' },
  { step: '07', title: 'Ongoing Support', text: 'Maintenance, improvements and technical assistance.' },
];

/* ── Engagement models ─────────────────────────────────────────────────── */

export interface EngagementModel {
  id: string;
  title: string;
  bestFor: string;
  /** Option value in the inquiry form. */
  value: string;
}

export const engagementModels: EngagementModel[] = [
  { id: 'fixed', title: 'Fixed-Price Projects', bestFor: 'Best for clearly defined requirements and deliverables.', value: 'fixed' },
  { id: 'dedicated', title: 'Dedicated Development', bestFor: 'Best for ongoing development and long-term product work.', value: 'dedicated' },
  { id: 'hourly', title: 'Hourly / Flexible Engagement', bestFor: 'Best for smaller tasks, improvements and evolving requirements.', value: 'hourly' },
];

export const clientExperience: { title: string; text: string }[] = [
  { title: 'Initial discovery call', text: 'We learn about your business, users and goals.' },
  { title: 'Written project scope', text: 'What we will build is documented before work begins.' },
  { title: 'Agreed milestones', text: 'Work is divided into milestones you have approved.' },
  { title: 'Regular progress updates', text: 'You see progress as it happens, not only at the end.' },
  { title: 'Direct communication', text: 'Talk to the developers working on your product.' },
  { title: 'Review & feedback cycles', text: 'Your feedback shapes each milestone before the next one starts.' },
  { title: 'Deployment & handover', text: 'We launch the product and hand over what you need to run it.' },
];

/* ── Showcase ──────────────────────────────────────────────────────────── */

/** Real projects from src/data/projects.ts, in display order. */
export const showcaseSlugs = ['ravantra', 'hirenova', 'knowledgevoice', 'orbit-food', 'probuild-erp', 'shivedlife-medicare', 'aura-design-studio', 'bookverse'];

/* ── Inquiry form options ──────────────────────────────────────────────── */

export const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates', 'Germany', 'France', 'Netherlands',
  'Ireland', 'Spain', 'Italy', 'Sweden', 'Switzerland', 'Singapore', 'New Zealand', 'Saudi Arabia', 'Qatar', 'South Africa',
  'India', 'Philippines', 'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Russia', 'Nigeria', 'Kenya', 'Egypt', 'Other',
];

export const BUSINESS_TYPES = [
  { value: 'startup', label: 'Startup / Entrepreneur' },
  { value: 'smb', label: 'Small or medium business' },
  { value: 'growing', label: 'Growing company' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'agency', label: 'Agency / Reseller' },
  { value: 'other', label: 'Other' },
];

export const PROJECT_CATEGORIES = [
  'Website', 'Web application', 'Mobile application', 'UI/UX design', 'E-commerce', 'Custom business software',
  'AI & machine learning', 'Workflow automation', 'API development & integration', 'Maintenance & support', 'Not sure yet',
];

export const ENGAGEMENT_OPTIONS = [
  { value: 'fixed', label: 'Fixed-price project' },
  { value: 'dedicated', label: 'Dedicated development' },
  { value: 'hourly', label: 'Hourly / flexible' },
  { value: 'unsure', label: 'Not sure yet' },
];

export const CONTACT_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'video', label: 'Video call' },
  { value: 'phone', label: 'Phone call' },
  { value: 'chat', label: 'Chat / messaging' },
];

export interface Currency {
  code: string;
  label: string;
  symbol: string;
  /** Budget bands in this currency (lower bounds); the form builds the labels. */
  bands: number[];
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', label: 'US Dollar (USD)', symbol: '$', bands: [3000, 10000, 25000, 50000] },
  { code: 'GBP', label: 'British Pound (GBP)', symbol: '£', bands: [2500, 8000, 20000, 40000] },
  { code: 'EUR', label: 'Euro (EUR)', symbol: '€', bands: [3000, 9000, 23000, 46000] },
  { code: 'CAD', label: 'Canadian Dollar (CAD)', symbol: 'C$', bands: [4000, 13000, 34000, 68000] },
  { code: 'AUD', label: 'Australian Dollar (AUD)', symbol: 'A$', bands: [4500, 15000, 38000, 76000] },
  { code: 'AED', label: 'UAE Dirham (AED)', symbol: 'AED ', bands: [11000, 37000, 92000, 184000] },
  { code: 'INR', label: 'Indian Rupee (INR)', symbol: '₹', bands: [250000, 800000, 2000000, 4000000] },
];

const fmt = (n: number) => n.toLocaleString('en-US');

/** "Under $3,000", "$3,000 – $10,000", ... "$50,000+", plus an undecided option. */
export function budgetOptions(c: Currency): { value: string; label: string }[] {
  const { symbol, bands } = c;
  const out = [{ value: `under-${bands[0]}`, label: `Under ${symbol}${fmt(bands[0])}` }];
  for (let i = 0; i < bands.length - 1; i++) {
    out.push({ value: `${bands[i]}-${bands[i + 1]}`, label: `${symbol}${fmt(bands[i])} – ${symbol}${fmt(bands[i + 1])}` });
  }
  out.push({ value: `${bands[bands.length - 1]}+`, label: `${symbol}${fmt(bands[bands.length - 1])}+` });
  out.push({ value: 'undecided', label: 'Not decided yet' });
  return out;
}

/* ── FAQ ───────────────────────────────────────────────────────────────── */

export interface GlobalFaq {
  question: string;
  answer: FaqAnswerPart[];
}

export const globalFaqs: GlobalFaq[] = [
  {
    question: 'Can OrbitDevStudio work with clients outside India?',
    answer: ['Yes. We are a software development studio based in Ahmedabad, India, and we work with clients remotely. Everything, from the first call to launch, can run online.'],
  },
  {
    question: 'Which countries do you serve?',
    answer: ['We are actively looking to work with businesses in the United States, United Kingdom, Canada, Australia, the United Arab Emirates, Germany and the wider Europe, Singapore, the Philippines, Indonesia and South and Southeast Asia, Russia, and across Africa. Because the work is remote, we are happy to hear from businesses in other countries too.'],
  },
  {
    question: 'Can international businesses hire your developers remotely?',
    answer: ['Yes. You can engage us for a fixed-price project, dedicated development or hourly work. See ', { text: 'how hiring works', to: '/hire' }, ' for the available models.'],
  },
  {
    question: 'How do you manage different time zones?',
    answer: ['We agree on communication hours and overlap windows during discovery, then keep everyone aligned with written scope, milestone updates and recorded decisions, so progress does not depend on being online at the same moment. We do not promise 24/7 availability.'],
  },
  {
    question: 'What currencies can clients use?',
    answer: ['Tell us which currency you plan in. Our ', { text: 'project estimator', to: '/pricing#estimate' }, ' shows indicative ranges in USD, INR, EUR, GBP, AUD and CAD. Invoicing currency and payment terms are confirmed in your written proposal.'],
  },
  {
    question: 'How does project pricing work?',
    answer: ['We do not publish fixed prices because every project is priced to its requirements. After a discovery conversation you receive a written proposal. For a quick, non-binding range, try the ', { text: 'AI project estimator', to: '/pricing#estimate' }, '.'],
  },
  {
    question: 'Who owns the source code?',
    answer: ['Ownership of the source code and deliverables is set out in the project agreement before work begins, so there is no ambiguity about who owns what.'],
  },
  {
    question: 'Can you sign an NDA?',
    answer: ['Yes. An NDA is available on request, and we are happy to sign one before you describe your idea in detail.'],
  },
  {
    question: 'Do you provide post-launch support?',
    answer: ['Yes. Maintenance and support after launch are available and scoped separately from the build. See ', { text: 'our add-on services', to: '/pricing' }, '.'],
  },
  {
    question: 'Can you work with our existing development team?',
    answer: ['Yes. We can extend your team, take ownership of a defined part of a product, or work alongside your developers and designers.'],
  },
  {
    question: 'How do we get started?',
    answer: ['Send us the inquiry form on this page. We review what you share and get in touch by email to arrange a discovery conversation. From there you receive a written scope and proposal. Nothing is binding until you approve it.'],
  },
  {
    question: 'Can you develop a complete product from scratch?',
    answer: ['Yes. We handle research, design, development, testing, deployment and support. Our ', { text: 'portfolio', to: '/portfolio' }, ' includes full platforms such as HireNova, KnowledgeVoice and ProBuild ERP.'],
  },
];

export const faqAnswerText = (parts: FaqAnswerPart[]) => parts.map((p) => (typeof p === 'string' ? p : p.text)).join('');
