import { useEffect, useId, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare, Plus, Search, X } from 'lucide-react';
import { SITE_URL } from '../config/site';
import {
  faqAnswerText,
  faqCategories,
  faqs,
  type Faq,
  type FaqAnswerPart,
  type FaqCategoryId,
} from '../data/faqs';
import GradientIcon from '../components/ui/GradientIcon';
import PageHero from '../components/sections/PageHero';
import FAQFigure from '../components/hero-figures/FAQFigure';

const PAGE_URL = `${SITE_URL}/faq`;
const TITLE = 'FAQ | Orbit Dev Studios';
const DESCRIPTION =
  'Answers to common questions about working with Orbit Dev Studios: website pricing and timelines, our development process, technologies, launch, maintenance and more.';
const OG_IMAGE = `${SITE_URL}/companylogo-social.webp`;
const CONTACT_EMAIL = 'orbitdevstudios@gmail.com';

type Filter = 'all' | FaqCategoryId;

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

function AnswerContent({ parts }: { parts: FaqAnswerPart[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <span key={i}>{part}</span>
        ) : (
          <Link
            key={i}
            to={part.to}
            className={`font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent rounded-sm ${focusRing}`}
          >
            {part.text}
          </Link>
        ),
      )}
    </>
  );
}

function FaqItem({
  faq,
  isOpen,
  onToggle,
  reduceMotion,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  const buttonId = `faq-q-${faq.id}`;
  const panelId = `faq-a-${faq.id}`;

  return (
    <div
      id={faq.id}
      className={`scroll-mt-28 rounded-2xl border bg-white/[0.03] light:bg-white transition-colors duration-300 ${
        isOpen
          ? 'border-accent/30 light:border-[rgba(22,119,255,0.3)] shadow-[0_8px_30px_rgba(22,119,255,0.08)]'
          : 'border-white/10 hover:border-white/20 light:border-slate-200 light:hover:border-slate-300'
      }`}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-4 rounded-2xl p-5 sm:p-6 text-left ${focusRing}`}
        >
          <span className="text-[15px] sm:text-[16px] font-semibold text-white light:text-slate-900">
            {faq.question}
          </span>
          <span
            aria-hidden="true"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              isOpen
                ? 'rotate-45 bg-accent text-white'
                : 'border border-white/10 bg-white/[0.02] text-slate-400 light:border-slate-200 light:bg-slate-50 light:text-slate-500'
            }`}
          >
            <Plus size={16} />
          </span>
        </button>
      </h3>

      {/* Panel stays mounted (answers remain in the DOM for crawlers); closed panels are inert. */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
        inert={!isOpen}
        aria-hidden={!isOpen}
      >
        <div className="mx-5 sm:mx-6 border-t border-white/10 light:border-slate-200 py-5 text-[15px] leading-7 text-[#C7D2E4] light:text-slate-600">
          <AnswerContent parts={faq.answer} />
        </div>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const reduceMotion = useReducedMotion() ?? false;
  const location = useLocation();
  const searchId = useId();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([faqs[0].id]));

  // Deep link support: /faq#website-cost opens and scrolls to that question.
  useEffect(() => {
    const hash = decodeURIComponent(location.hash.replace('#', ''));
    if (!hash || !faqs.some((f) => f.id === hash)) return;
    setFilter('all');
    setQuery('');
    setOpenIds((prev) => new Set(prev).add(hash));
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(t);
  }, [location.hash, reduceMotion]);

  const searchable = useMemo(
    () => faqs.map((f) => ({ faq: f, text: `${f.question} ${faqAnswerText(f.answer)}`.toLowerCase() })),
    [],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const visible = useMemo(() => {
    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    return searchable
      .filter(({ faq, text }) => {
        if (filter !== 'all' && faq.category !== filter) return false;
        return terms.every((term) => text.includes(term));
      })
      .map(({ faq }) => faq);
  }, [searchable, filter, normalizedQuery]);

  const groups = useMemo(
    () =>
      faqCategories
        .map((cat) => ({ ...cat, items: visible.filter((f) => f.category === cat.id) }))
        .filter((g) => g.items.length > 0),
    [visible],
  );

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: faqs.length },
    ...faqCategories.map((c) => ({
      id: c.id as Filter,
      label: c.label,
      count: faqs.filter((f) => f.category === c.id).length,
    })),
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: faqAnswerText(f.answer) },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: PAGE_URL },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <div className="relative min-h-screen bg-navy">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <PageHero
          eyebrow="FAQ"
          title="Frequently Asked"
          highlight="Questions"
          description="Straight answers about pricing, timelines, how we work and what happens after launch. Can't find what you're looking for? We're happy to talk it through."
          figure={<FAQFigure />}
        >
          {/* Search */}
          <div className="relative w-full max-w-xl">
            <label htmlFor={searchId} className="sr-only">
              Search frequently asked questions
            </label>
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, e.g. pricing, SEO, NDA"
              autoComplete="off"
              className={`w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-11 text-[15px] text-white placeholder:text-slate-400 light:border-slate-200 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:shadow-sm [&::-webkit-search-cancel-button]:hidden ${focusRing}`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className={`absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white light:hover:bg-slate-100 light:hover:text-slate-900 ${focusRing}`}
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </PageHero>

        {/* ── Questions ───────────────────────────────────────────────── */}
        <section className="section-white relative py-16 md:py-24" aria-label="Questions and answers">
          <div className="max-w-4xl mx-auto px-6">
            {/* Category filters */}
            <div
              role="group"
              aria-label="Filter questions by category"
              className="-mx-6 px-6 mb-10 flex gap-2 overflow-x-auto pb-2 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f.id)}
                    className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${focusRing} ${
                      active
                        ? 'border-accent bg-accent text-white'
                        : 'border-white/10 bg-white/[0.03] text-[#C7D2E4] hover:border-white/25 hover:text-white light:border-slate-200 light:bg-white light:text-slate-600 light:hover:border-slate-300 light:hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                    <span
                      className={`rounded-full px-1.5 text-[11px] ${
                        active ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400 light:bg-slate-100 light:text-slate-500'
                      }`}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="sr-only" aria-live="polite">
              {visible.length === 1 ? '1 question shown' : `${visible.length} questions shown`}
            </p>

            {groups.length > 0 ? (
              <div className="flex flex-col gap-14">
                {groups.map((group) => (
                  <div key={group.id}>
                    <h2 className="mb-6 flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-white light:text-slate-900">
                      <span className="h-[3px] w-6 rounded-full bg-accent" aria-hidden="true" />
                      {group.label}
                    </h2>
                    <div className="flex flex-col gap-4">
                      {group.items.map((faq) => (
                        <FaqItem
                          key={faq.id}
                          faq={faq}
                          isOpen={openIds.has(faq.id)}
                          onToggle={() => toggle(faq.id)}
                          reduceMotion={reduceMotion}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white p-8 sm:p-10 text-center">
                <h2 className="mb-3 text-xl font-bold tracking-tight text-white light:text-slate-900">
                  No matching questions
                </h2>
                <p className="mb-6 text-[15px] leading-7 text-[#C7D2E4] light:text-slate-600">
                  We couldn't find an answer for "{query.trim()}". Try a different word, or ask us directly.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setFilter('all');
                    }}
                    className={`w-full sm:w-auto rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white hover:bg-white/[0.04] light:border-slate-300 light:text-slate-900 light:hover:bg-slate-50 ${focusRing}`}
                  >
                    Show all questions
                  </button>
                  <Link
                    to="/hire"
                    data-track="faq_no_results_contact"
                    data-track-location="faq"
                    className={`btn-primary w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold text-center ${focusRing}`}
                  >
                    Ask Us Directly
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA band ────────────────────────────────────────────────── */}
        <section className="bg-navy-deep relative w-full overflow-hidden py-24 md:py-28">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[radial-gradient(circle,_rgba(22,119,255,0.1)_0%,_transparent_70%)] pointer-events-none"
          />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
          >
            <GradientIcon icon={MessageSquare} size={30} boxClassName="w-16 h-16 rounded-2xl mb-8" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5">
              Still have questions?
            </h2>

            <p className="text-[16px] md:text-[18px] leading-relaxed text-[#C7D2E4] light:text-slate-600 max-w-2xl mb-10">
              Tell us about your project and we'll give you honest advice on scope, timeline and budget,
              with a free consultation and no obligation.
            </p>

            <div className="flex w-full flex-col sm:w-auto sm:flex-row items-center gap-4">
              <Link
                to="/hire"
                data-track="faq_lets_talk"
                data-track-location="faq"
                className={`btn-primary group w-full sm:w-auto rounded-xl px-7 py-3.5 font-bold text-sm flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 ${focusRing}`}
              >
                Let's Talk
                <ArrowRight size={16} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                data-track="faq_email"
                data-track-location="faq"
                className={`w-full sm:w-auto rounded-xl border border-white/15 px-7 py-3.5 text-sm font-bold text-white hover:border-white/30 hover:bg-white/[0.04] light:border-slate-300 light:text-slate-900 light:hover:border-slate-400 light:hover:bg-slate-50 flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 break-all ${focusRing}`}
              >
                <Mail size={16} aria-hidden="true" className="shrink-0" />
                {CONTACT_EMAIL}
              </a>
            </div>

            <p className="mt-8 text-sm text-slate-400">
              Prefer to compare options first?{' '}
              <Link
                to="/pricing"
                data-track="faq_view_pricing"
                data-track-location="faq"
                className={`font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent rounded-sm ${focusRing}`}
              >
                View pricing
              </Link>
            </p>
          </motion.div>
        </section>
      </div>
    </>
  );
}
