import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarClock,
  Check,
  CircleAlert,
  CodeXml,
  Globe,
  LayoutDashboard,
  ListChecks,
  PenTool,
  RefreshCw,
  RotateCcw,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { track } from '../../lib/analytics';
import { usePricingScrollTo } from './PricingScroll';
import GradientIcon from '../ui/GradientIcon';

/* ─── Request / response contract for POST /api/estimate ───────────────── */

type ProjectType = 'website' | 'ecommerce' | 'webapp' | 'custom' | 'uiux' | 'redesign';
type ProjectSize = 'small' | 'medium' | 'large';
type Feature = 'cms' | 'payments' | 'accounts' | 'dashboard' | 'integrations' | 'ai' | 'multilingual' | 'blog' | 'booking' | 'seo';
type DesignLevel = 'template' | 'custom' | 'premium';
type Timeline = 'flexible' | 'standard' | 'urgent';
type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'AUD' | 'CAD';

interface EstimateRequest {
  projectType: ProjectType;
  size: ProjectSize;
  features: Feature[];
  design: DesignLevel;
  timeline: Timeline;
  currency: Currency;
  description?: string;
}

interface EstimateResult {
  currency: string;
  low: number;
  high: number;
  timelineWeeks: { min: number; max: number };
  summary: string;
  breakdown: { label: string; low: number; high: number }[];
  assumptions: string[];
  source: 'ai' | 'guide';
}

/* ─── Options ──────────────────────────────────────────────────────────── */

interface Option<T extends string> {
  value: T;
  label: string;
  icon?: LucideIcon;
}

const PROJECT_TYPES: Option<ProjectType>[] = [
  { value: 'website', label: 'Business website', icon: Globe },
  { value: 'ecommerce', label: 'E-commerce store', icon: ShoppingCart },
  { value: 'webapp', label: 'Web application / SaaS', icon: LayoutDashboard },
  { value: 'custom', label: 'Custom software', icon: CodeXml },
  { value: 'uiux', label: 'UI/UX design only', icon: PenTool },
  { value: 'redesign', label: 'Website redesign', icon: RefreshCw },
];

const SIZES: Option<ProjectSize>[] = [
  { value: 'small', label: 'Small (1–5 pages/screens)' },
  { value: 'medium', label: 'Medium (6–15)' },
  { value: 'large', label: 'Large (16+)' },
];

const FEATURES: Option<Feature>[] = [
  { value: 'cms', label: 'Content management (CMS)' },
  { value: 'payments', label: 'Online payments' },
  { value: 'accounts', label: 'User accounts & login' },
  { value: 'dashboard', label: 'Admin dashboard' },
  { value: 'integrations', label: 'Third-party integrations / APIs' },
  { value: 'ai', label: 'AI features' },
  { value: 'multilingual', label: 'Multiple languages' },
  { value: 'blog', label: 'Blog' },
  { value: 'booking', label: 'Booking / scheduling' },
  { value: 'seo', label: 'Advanced SEO setup' },
];

const DESIGNS: Option<DesignLevel>[] = [
  { value: 'template', label: 'Clean & simple' },
  { value: 'custom', label: 'Custom design' },
  { value: 'premium', label: 'Premium custom + animations' },
];

const TIMELINES: Option<Timeline>[] = [
  { value: 'flexible', label: 'Flexible' },
  { value: 'standard', label: 'Standard' },
  { value: 'urgent', label: 'Urgent (rush)' },
];

const CURRENCIES: Option<Currency>[] = [
  { value: 'USD', label: 'USD' },
  { value: 'INR', label: 'INR' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'AUD', label: 'AUD' },
  { value: 'CAD', label: 'CAD' },
];

const DESCRIPTION_MAX = 800;
const GENERIC_ERROR = "We couldn't generate an estimate right now. Please try again or talk to us.";
const RATE_LIMIT_FALLBACK = 'Too many estimate requests. Please wait a moment and try again.';

const EMPTY_CHECKLIST = [
  'An estimated price range in your chosen currency',
  'A typical timeline in weeks',
  'A breakdown of where the effort goes',
  'The key assumptions behind the numbers',
];

/* ─── Styling helpers ──────────────────────────────────────────────────── */

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rt-bg)]';

const OPTION_BASE = `border text-left transition-all duration-200 ${FOCUS_RING}`;
const OPTION_ON =
  'border-accent/60 bg-accent/[0.12] text-white shadow-[0_0_0_1px_rgba(22,119,255,0.35)] light:bg-accent/[0.06] light:text-slate-900';
const OPTION_OFF =
  'border-white/10 bg-white/[0.02] text-[#C7D2E4] hover:border-white/25 hover:bg-white/[0.04] light:border-slate-200 light:bg-white light:text-slate-600 light:hover:border-slate-300';

const FIELD_LABEL = 'block text-sm font-semibold text-white light:text-slate-900 mb-3';

/* ─── Formatting ───────────────────────────────────────────────────────── */

function makeFormatter(currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 });
  } catch {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
  }
}

function formatRange(fmt: Intl.NumberFormat, low: number, high: number) {
  return low === high ? fmt.format(low) : `${fmt.format(low)} – ${fmt.format(high)}`;
}

function formatWeeks({ min, max }: { min: number; max: number }) {
  if (min === max) return `${min} ${min === 1 ? 'week' : 'weeks'}`;
  return `${min}–${max} weeks`;
}

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

/** Validates the 200 response and fills safe defaults for optional-looking fields. */
function parseResult(data: unknown, fallbackCurrency: string): EstimateResult | null {
  if (!data || typeof data !== 'object') return null;
  const r = data as Record<string, unknown>;
  const tw = r.timelineWeeks as Record<string, unknown> | undefined;
  if (!isNum(r.low) || !isNum(r.high) || !tw || !isNum(tw.min) || !isNum(tw.max)) return null;

  const breakdown = Array.isArray(r.breakdown)
    ? r.breakdown.filter(
        (b): b is EstimateResult['breakdown'][number] =>
          !!b && typeof b === 'object' && typeof (b as { label?: unknown }).label === 'string' &&
          isNum((b as { low?: unknown }).low) && isNum((b as { high?: unknown }).high),
      )
    : [];
  const assumptions = Array.isArray(r.assumptions) ? r.assumptions.filter((a): a is string => typeof a === 'string') : [];

  return {
    currency: typeof r.currency === 'string' && r.currency ? r.currency : fallbackCurrency,
    low: r.low,
    high: r.high,
    timelineWeeks: { min: tw.min, max: tw.max },
    summary: typeof r.summary === 'string' ? r.summary : '',
    breakdown,
    assumptions,
    source: r.source === 'guide' ? 'guide' : 'ai',
  };
}

/* ─── Single-choice group (WAI-ARIA radio pattern with roving tabindex) ── */

interface RadioGroupProps<T extends string> {
  labelId: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  variant: 'card' | 'pill';
  className?: string;
  firstRef?: (el: HTMLButtonElement | null) => void;
}

function RadioGroup<T extends string>({ labelId, options, value, onChange, variant, className = '', firstRef }: RadioGroupProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = options.length;
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-labelledby={labelId} className={className}>
      {options.map((opt, i) => {
        const checked = opt.value === value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[i] = el;
              if (checked) firstRef?.(el);
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`${OPTION_BASE} ${checked ? OPTION_ON : OPTION_OFF} ${
              variant === 'card'
                ? 'flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium'
                : 'inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-medium'
            }`}
          >
            {Icon && (
              <span
                aria-hidden="true"
                className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center transition-colors ${
                  checked ? 'bg-accent text-white' : 'bg-white/[0.04] text-accent light:bg-slate-100'
                }`}
              >
                <Icon size={16} />
              </span>
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Component ────────────────────────────────────────────────────────── */

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; result: EstimateResult }
  | { kind: 'error'; message: string; showContact: boolean };

export default function PricingEstimator() {
  const uid = useId();
  const ids = {
    type: `${uid}-type`,
    size: `${uid}-size`,
    features: `${uid}-features`,
    design: `${uid}-design`,
    timeline: `${uid}-timeline`,
    currency: `${uid}-currency`,
    description: `${uid}-description`,
    descriptionHint: `${uid}-description-hint`,
  };

  const [projectType, setProjectType] = useState<ProjectType>('website');
  const [size, setSize] = useState<ProjectSize>('small');
  const [features, setFeatures] = useState<Feature[]>([]);
  const [design, setDesign] = useState<DesignLevel>('custom');
  const [timeline, setTimeline] = useState<Timeline>('standard');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const abortRef = useRef<AbortController | null>(null);
  const firstFieldRef = useRef<HTMLButtonElement | null>(null);
  const scrollTo = usePricingScrollTo();

  useEffect(() => () => abortRef.current?.abort(), []);

  const toggleFeature = (f: Feature) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const isSmallScreen = () => window.matchMedia?.('(max-width: 1023px)').matches ?? false;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === 'loading') return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const trimmed = description.trim().slice(0, DESCRIPTION_MAX);
    const body: EstimateRequest = {
      projectType,
      size,
      features,
      design,
      timeline,
      currency,
      ...(trimmed ? { description: trimmed } : {}),
    };

    track('estimate_request', { projectType, size, currency });
    setStatus({ kind: 'loading' });
    if (isSmallScreen()) scrollTo('estimate-result');

    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        if (res.status === 429) {
          const msg = data && typeof (data as { error?: unknown }).error === 'string' ? (data as { error: string }).error : '';
          setStatus({ kind: 'error', message: msg || RATE_LIMIT_FALLBACK, showContact: false });
        } else {
          setStatus({ kind: 'error', message: GENERIC_ERROR, showContact: true });
        }
        return;
      }

      const result = parseResult(data, currency);
      if (!result) {
        setStatus({ kind: 'error', message: GENERIC_ERROR, showContact: true });
        return;
      }

      track('estimate_result', { source: result.source, currency: result.currency });
      setStatus({ kind: 'success', result });
    } catch (err) {
      if (controller.signal.aborted || (err instanceof DOMException && err.name === 'AbortError')) return;
      setStatus({ kind: 'error', message: GENERIC_ERROR, showContact: true });
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  };

  const onRecalculate = () => {
    scrollTo('estimate');
    firstFieldRef.current?.focus({ preventScroll: true });
  };

  const loading = status.kind === 'loading';

  return (
    <section id="estimate" aria-labelledby="estimate-heading" className="relative scroll-mt-24 py-20 md:py-28 bg-navy-soft overflow-hidden">
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[160px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] light:border-slate-200 light:bg-white mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" aria-hidden="true" />
            <span className="text-xs font-medium text-gray-300 light:text-slate-700 tracking-wide">AI Project Estimator</span>
          </div>
          <h2 id="estimate-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5 leading-tight">
            Estimate your project <span className="text-gradient">in a few clicks</span>
          </h2>
          <p className="text-[15px] text-[#C7D2E4] light:text-slate-600 leading-relaxed">
            Every project is priced to its requirements. Tell us what you're planning and get an indicative price range and timeline,
            then confirm the details with us in a free consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ── Form ── */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            onSubmit={onSubmit}
            noValidate
            aria-label="Project estimate form"
            className="glass-panel lg:col-span-7 p-6 md:p-8 flex flex-col gap-8"
          >
            <div>
              <span id={ids.type} className={FIELD_LABEL}>What are you building?</span>
              <RadioGroup
                labelId={ids.type}
                options={PROJECT_TYPES}
                value={projectType}
                onChange={setProjectType}
                variant="card"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
                firstRef={(el) => {
                  firstFieldRef.current = el;
                }}
              />
            </div>

            <div>
              <span id={ids.size} className={FIELD_LABEL}>Project size</span>
              <RadioGroup labelId={ids.size} options={SIZES} value={size} onChange={setSize} variant="pill" className="flex flex-wrap gap-2.5" />
            </div>

            <div>
              <span id={ids.features} className={FIELD_LABEL}>
                Features <span className="font-normal text-slate-400 light:text-slate-500">(select any that apply)</span>
              </span>
              <div role="group" aria-labelledby={ids.features} className="flex flex-wrap gap-2.5">
                {FEATURES.map((f) => {
                  const on = features.includes(f.value);
                  return (
                    <button
                      key={f.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleFeature(f.value)}
                      className={`${OPTION_BASE} ${on ? OPTION_ON : OPTION_OFF} inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium`}
                    >
                      {on && <Check size={14} className="text-accent" aria-hidden="true" />}
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span id={ids.design} className={FIELD_LABEL}>Design level</span>
                <RadioGroup labelId={ids.design} options={DESIGNS} value={design} onChange={setDesign} variant="pill" className="flex flex-wrap gap-2.5" />
              </div>
              <div>
                <span id={ids.timeline} className={FIELD_LABEL}>Timeline</span>
                <RadioGroup labelId={ids.timeline} options={TIMELINES} value={timeline} onChange={setTimeline} variant="pill" className="flex flex-wrap gap-2.5" />
              </div>
            </div>

            <div>
              <span id={ids.currency} className={FIELD_LABEL}>Currency</span>
              <RadioGroup labelId={ids.currency} options={CURRENCIES} value={currency} onChange={setCurrency} variant="pill" className="flex flex-wrap gap-2.5" />
            </div>

            <div>
              <label htmlFor={ids.description} className={FIELD_LABEL}>
                Tell us about your project <span className="font-normal text-slate-400 light:text-slate-500">(optional)</span>
              </label>
              <textarea
                id={ids.description}
                value={description}
                maxLength={DESCRIPTION_MAX}
                onChange={(e) => setDescription(e.target.value.slice(0, DESCRIPTION_MAX))}
                rows={4}
                aria-describedby={ids.descriptionHint}
                placeholder="Goals, audience, must-have features, existing systems…"
                data-lenis-prevent
                className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 light:border-slate-200 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:hover:border-slate-300"
              />
              <div id={ids.descriptionHint} className="mt-2 flex items-start justify-between gap-4 text-xs text-slate-400 light:text-slate-500">
                <span>Please don't include personal or confidential information.</span>
                <span className="shrink-0 tabular-nums">
                  {description.length}/{DESCRIPTION_MAX}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              className={`btn-primary group w-full sm:w-auto sm:self-start inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${FOCUS_RING}`}
            >
              <Sparkles size={16} className={loading ? 'motion-safe:animate-pulse' : ''} aria-hidden="true" />
              Get My AI Estimate
            </button>
          </motion.form>

          {/* ── Result panel ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div
              id="estimate-result"
              aria-live="polite"
              aria-busy={loading}
              className="glass-panel scroll-mt-24 p-6 md:p-8"
            >
              {status.kind === 'idle' && (
                <div>
                  <GradientIcon icon={ListChecks} size={20} boxClassName="w-11 h-11 rounded-xl mb-5" />
                  <h3 className="text-xl font-bold tracking-tight text-white light:text-slate-900 mb-3">Your estimate will appear here</h3>
                  <p className="text-sm text-[#C7D2E4] light:text-slate-600 leading-relaxed mb-6">
                    Choose the options that best describe your project and select "Get My AI Estimate". No sign-up needed.
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 light:text-slate-500 mb-3">Your estimate includes</p>
                  <ul className="space-y-3">
                    {EMPTY_CHECKLIST.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Check size={18} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-sm text-[#C7D2E4] light:text-slate-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {status.kind === 'loading' && (
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-white light:text-slate-900 mb-6">
                    <Sparkles size={16} className="text-accent motion-safe:animate-pulse" aria-hidden="true" />
                    Analysing your requirements…
                  </p>
                  <div className="space-y-4 motion-safe:animate-pulse" aria-hidden="true">
                    <div className="h-10 w-4/5 rounded-lg bg-white/[0.08] light:bg-slate-200" />
                    <div className="h-4 w-1/2 rounded bg-white/[0.06] light:bg-slate-200" />
                    <div className="h-px w-full bg-white/10 light:bg-slate-200 my-2" />
                    <div className="h-3 w-full rounded bg-white/[0.06] light:bg-slate-200" />
                    <div className="h-3 w-11/12 rounded bg-white/[0.06] light:bg-slate-200" />
                    <div className="h-3 w-3/4 rounded bg-white/[0.06] light:bg-slate-200" />
                  </div>
                </div>
              )}

              {status.kind === 'error' && (
                <div className="flex gap-3">
                  <CircleAlert size={20} className="text-amber-400 light:text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-white light:text-slate-900 leading-relaxed">{status.message}</p>
                    {status.showContact && (
                      <Link
                        to="/hire"
                        data-track="estimate_error_contact"
                        data-track-location="pricing-estimator"
                        className={`group mt-4 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-accent hover:text-white light:hover:text-slate-900 transition-colors ${FOCUS_RING}`}
                      >
                        Talk to us
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {status.kind === 'success' && <EstimateView result={status.result} onRecalculate={onRecalculate} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EstimateView({ result, onRecalculate }: { result: EstimateResult; onRecalculate: () => void }) {
  const fmt = makeFormatter(result.currency);
  const sourceLabel =
    result.source === 'guide' ? 'Estimate based on our pricing guide and your answers' : 'AI-generated estimate based on your answers';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 light:text-slate-500 mb-2">Estimated investment</h3>
      <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900 leading-tight break-words">
        {formatRange(fmt, result.low, result.high)}
      </p>
      <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#C7D2E4] light:text-slate-600">
        <GradientIcon icon={CalendarClock} size={16} box={false} className="shrink-0" />
        Estimated timeline: <span className="font-semibold text-white light:text-slate-900">{formatWeeks(result.timelineWeeks)}</span>
      </p>

      {result.summary && <p className="mt-5 text-sm text-[#C7D2E4] light:text-slate-600 leading-relaxed">{result.summary}</p>}

      {result.breakdown.length > 0 && (
        <div className="mt-6">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 light:text-slate-500 mb-3">Breakdown</h4>
          <ul className="divide-y divide-white/10 light:divide-slate-200 rounded-xl border border-white/10 light:border-slate-200">
            {result.breakdown.map((b, i) => (
              <li key={`${b.label}-${i}`} className="flex items-start justify-between gap-4 px-4 py-3 text-sm">
                <span className="text-[#C7D2E4] light:text-slate-600">{b.label}</span>
                <span className="shrink-0 text-right font-semibold text-white light:text-slate-900 tabular-nums">{formatRange(fmt, b.low, b.high)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.assumptions.length > 0 && (
        <div className="mt-6">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 light:text-slate-500 mb-2">Assumptions</h4>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400 light:text-slate-500 leading-relaxed">
            {result.assumptions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-[#C7D2E4] light:border-slate-200 light:bg-slate-50 light:text-slate-600 leading-relaxed">
        {sourceLabel}. It's indicative only. Your final quote is confirmed after a free consultation.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
        <Link
          to="/hire"
          data-track="estimate_get_quote"
          data-track-location="pricing-estimator"
          className={`btn-primary group flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm transition-all hover:-translate-y-0.5 ${FOCUS_RING}`}
        >
          Get an Exact Quote
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={onRecalculate}
          data-track="estimate_recalculate"
          data-track-location="pricing-estimator"
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm text-white light:text-slate-900 border border-white/15 hover:border-white/30 hover:bg-white/[0.04] light:border-slate-300 light:hover:border-slate-400 light:hover:bg-slate-50 transition-all ${FOCUS_RING}`}
        >
          <RotateCcw size={16} aria-hidden="true" />
          Recalculate
        </button>
      </div>
    </motion.div>
  );
}
