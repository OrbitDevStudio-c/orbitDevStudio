// [VERIFY PRICING] Internal guide the AI estimator is anchored to. Not shown to visitors directly.
// All money values are USD. Tune these to match how the business actually prices work.

export const PROJECT_TYPES = {
  website: { label: 'Business website', low: 800, high: 2500, weeks: [2, 4] },
  ecommerce: { label: 'E-commerce store', low: 2500, high: 8000, weeks: [4, 8] },
  webapp: { label: 'Web application / SaaS', low: 6000, high: 25000, weeks: [8, 16] },
  custom: { label: 'Custom software', low: 8000, high: 40000, weeks: [10, 24] },
  uiux: { label: 'UI/UX design only', low: 1000, high: 5000, weeks: [2, 6] },
  redesign: { label: 'Website redesign', low: 1000, high: 4000, weeks: [2, 6] },
};

export const SIZES = {
  small: { label: 'Small (1–5 pages/screens)', price: 1, weeks: 1 },
  medium: { label: 'Medium (6–15 pages/screens)', price: 1.6, weeks: 1.4 },
  large: { label: 'Large (16+ pages/screens)', price: 2.6, weeks: 2 },
};

export const FEATURES = {
  cms: { label: 'Content management (CMS)', low: 300, high: 800 },
  payments: { label: 'Online payments', low: 500, high: 1500 },
  accounts: { label: 'User accounts & login', low: 600, high: 1800 },
  dashboard: { label: 'Admin dashboard', low: 1000, high: 3500 },
  integrations: { label: 'Third-party integrations / APIs', low: 500, high: 2500 },
  ai: { label: 'AI features', low: 1500, high: 6000 },
  multilingual: { label: 'Multiple languages', low: 400, high: 1500 },
  blog: { label: 'Blog', low: 200, high: 600 },
  booking: { label: 'Booking / scheduling', low: 600, high: 2000 },
  seo: { label: 'Advanced SEO setup', low: 300, high: 1000 },
};

export const DESIGNS = {
  template: { label: 'Clean & simple', price: 0.85 },
  custom: { label: 'Custom design', price: 1 },
  premium: { label: 'Premium custom + animations', price: 1.3 },
};

export const TIMELINES = {
  flexible: { label: 'Flexible', price: 0.95, weeks: 1.2 },
  standard: { label: 'Standard', price: 1, weeks: 1 },
  urgent: { label: 'Urgent (rush)', price: 1.25, weeks: 0.75 },
};

// [VERIFY] Approximate conversion rates from USD; update periodically.
export const CURRENCY_RATES = { USD: 1, INR: 88, EUR: 0.92, GBP: 0.79, AUD: 1.52, CAD: 1.37 };

/** Deterministic estimate from the guide; used to anchor the AI and as a fallback when AI is unavailable. */
export function guideEstimate({ projectType, size, features, design, timeline }) {
  const type = PROJECT_TYPES[projectType];
  const s = SIZES[size];
  const d = DESIGNS[design];
  const t = TIMELINES[timeline];

  const build = { low: type.low * s.price * d.price, high: type.high * s.price * d.price };
  const featureItems = features.map((f) => ({ label: FEATURES[f].label, low: FEATURES[f].low, high: FEATURES[f].high }));
  const featureLow = featureItems.reduce((sum, f) => sum + f.low, 0);
  const featureHigh = featureItems.reduce((sum, f) => sum + f.high, 0);

  return {
    low: (build.low + featureLow) * t.price,
    high: (build.high + featureHigh) * t.price,
    timelineWeeks: {
      min: Math.max(1, Math.round(type.weeks[0] * s.weeks * t.weeks)),
      max: Math.max(2, Math.round(type.weeks[1] * s.weeks * t.weeks + features.length * 0.5)),
    },
    breakdown: [{ label: `${type.label}: design & build`, low: build.low * t.price, high: build.high * t.price }, ...featureItems.map((f) => ({
      ...f,
      low: f.low * t.price,
      high: f.high * t.price,
    }))],
  };
}
