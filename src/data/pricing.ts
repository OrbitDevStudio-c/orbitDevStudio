export type TierId = 'starter' | 'professional' | 'enterprise';

export interface PricingTier {
  id: TierId;
  name: string;
  tagline: string;
  timeline: string;
  typicalScope: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

/** Shown in place of a fixed price on every tier. */
export const PRICING_PRICE_LABEL = 'Priced to your requirements';

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For small businesses and simple websites.',
    timeline: '2–4 weeks',
    typicalScope: 'A focused marketing website of up to around 5–7 pages that presents your business clearly and is easy to keep up to date.',
    features: [
      'Up to ~5–7 page marketing website',
      'Responsive design for mobile, tablet and desktop',
      'Contact form wired to your inbox',
      'Basic on-page SEO',
      'Analytics setup',
      'CMS or easy content editing, if needed',
      'Launch support',
    ],
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For growing businesses requiring custom functionality.',
    timeline: '4–10 weeks',
    typicalScope: 'A larger custom-designed website or online store with integrations into the tools your business already runs on.',
    features: [
      'Custom UI/UX design',
      'Larger websites or e-commerce stores',
      'Integrations: payments, CRM and third-party APIs',
      'Performance optimisation',
      'Advanced SEO setup',
      'Post-launch support window',
    ],
    highlighted: true,
    badge: 'Recommended for growing businesses',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For complex applications and custom software.',
    timeline: 'Typically 3+ months, scoped per project',
    typicalScope: 'Web applications, SaaS platforms and bespoke software planned around your architecture, security and long-term roadmap.',
    features: [
      'Web applications and SaaS platforms',
      'Custom software development',
      'Architecture planning',
      'Dedicated team',
      'Security-focused development practices',
      'SLAs and long-term maintenance options',
    ],
    highlighted: false,
  },
];

/** A cell is either included (true), not included (false), or a short text value. */
export type ComparisonValue = boolean | string;

export interface ComparisonRow {
  feature: string;
  values: Record<TierId, ComparisonValue>;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: 'Typical timeline', values: { starter: '2–4 weeks', professional: '4–10 weeks', enterprise: '3+ months' } },
  { feature: 'Project size', values: { starter: 'Up to ~5–7 pages', professional: 'Larger sites & stores', enterprise: 'Apps & custom software' } },
  { feature: 'Responsive design', values: { starter: true, professional: true, enterprise: true } },
  { feature: 'Design approach', values: { starter: 'Clean, structured layout', professional: 'Custom UI/UX', enterprise: 'Custom UI/UX & product design' } },
  { feature: 'CMS / easy editing', values: { starter: 'If needed', professional: true, enterprise: 'As required' } },
  { feature: 'SEO', values: { starter: 'Basic on-page', professional: 'Advanced setup', enterprise: 'Scoped per project' } },
  { feature: 'Analytics setup', values: { starter: true, professional: true, enterprise: true } },
  { feature: 'E-commerce', values: { starter: false, professional: true, enterprise: true } },
  { feature: 'Payments, CRM & API integrations', values: { starter: false, professional: true, enterprise: true } },
  { feature: 'Performance optimisation', values: { starter: 'Standard best practices', professional: true, enterprise: true } },
  { feature: 'Architecture planning', values: { starter: false, professional: false, enterprise: true } },
  { feature: 'Dedicated team', values: { starter: false, professional: false, enterprise: true } },
  { feature: 'Post-launch support', values: { starter: 'Launch support', professional: 'Support window', enterprise: 'SLAs & maintenance options' } },
];

export interface PricingAddon {
  id: string;
  title: string;
  description: string;
  price: string;
}

export const pricingAddons: PricingAddon[] = [
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: 'Ongoing updates, bug fixes, dependency upgrades and small content changes after launch, so your site or app stays secure and current.',
    price: 'Quoted separately',
  },
  {
    id: 'hosting',
    title: 'Hosting & Deployment Setup',
    description: 'Domain, hosting and deployment configured on a platform suited to your project, with SSL and a clean release workflow.',
    price: 'Quoted separately',
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Technical audits, on-page improvements, structured data and content guidance to help your site be found by the right people.',
    price: 'Quoted separately',
  },
  {
    id: 'redesign',
    title: 'Redesign',
    description: 'A refreshed design and modernised front end for an existing website, keeping what works and improving what does not.',
    price: 'Quoted separately',
  },
];

export interface PricingFaq {
  id: string;
  question: string;
  answer: string;
}

export const pricingFaqs: PricingFaq[] = [
  {
    id: 'cost-factors',
    question: 'What affects the cost of my project?',
    answer:
      'The main factors are the number of pages or screens, how much custom design is involved, the features and integrations you need (such as payments, CRM or third-party APIs), content and data migration, and your timeline. We review all of this in a free consultation and send a clear quote based on your actual scope.',
  },
  {
    id: 'ai-estimate',
    question: 'How accurate is the AI estimate?',
    answer:
      'The estimate is an indicative range generated from the answers you give in the form, so it is a helpful starting point for budgeting rather than a binding price. Your final quote is confirmed after a free consultation, once we understand your goals, content and technical requirements in detail.',
  },
  {
    id: 'payments',
    question: 'How do payments work?',
    answer:
      'Projects are generally split into milestones, typically an upfront deposit to begin, followed by payments tied to agreed stages such as design approval and launch. The exact schedule is set out in your proposal before any work starts.',
  },
  {
    id: 'upgrade',
    question: 'Can I start small and upgrade later?',
    answer:
      'Yes. Many businesses begin with a focused website and add features, pages or integrations as they grow. We build with that in mind so your project can be extended later without starting over.',
  },
  {
    id: 'international',
    question: 'Do you work with international clients?',
    answer:
      'Yes. We work remotely and can collaborate with clients in different countries and time zones, using video calls, email and shared project tools to keep communication clear throughout the project.',
  },
  {
    id: 'not-included',
    question: "What's not included in an estimate or quote?",
    answer:
      'Estimates and quotes cover design and development of the agreed scope. Third-party costs such as domain names, hosting, paid plugins, premium themes, stock assets and subscription software are usually billed separately, as are ongoing services like maintenance or SEO. Anything outside the agreed scope is discussed and quoted before work begins.',
  },
  {
    id: 'which-package',
    question: "What if my project doesn't fit a package?",
    answer:
      'The packages are a starting point, not a fixed menu. If your needs sit between tiers or are entirely custom, we will recommend an approach and quote it based on the scope we agree together.',
  },
];
