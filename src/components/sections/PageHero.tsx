import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import ServiceParticles from './ServiceParticles';

export type HeroStat = { value: string; label: string };

type PageHeroProps = {
  /** Small uppercase label in the pill above the heading. */
  eyebrow: string;
  /** Heading text in the main colour. */
  title: ReactNode;
  /** Optional second line rendered with the brand text gradient. */
  highlight?: ReactNode;
  description: ReactNode;
  /** Optional KPI row under a divider (only use verifiable facts). */
  stats?: HeroStat[];
  /** Optional buttons/links under the description. */
  actions?: ReactNode;
  /** Extra content under the description, e.g. a breadcrumb or meta row. */
  children?: ReactNode;
  /** The page's unique illustration, shown on the right (below the text on mobile). */
  figure: ReactNode;
  /** Shorter hero for text-heavy pages (legal pages, detail pages). */
  compact?: boolean;
};

/**
 * Shared hero used by every page except Home and blog articles: identical starfield + glow
 * background, heading on the left, a page-specific figure on the right.
 */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  stats,
  actions,
  children,
  figure,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`bg-navy-deep relative w-full flex items-center overflow-hidden pt-28 pb-16 md:pb-20 ${
        compact ? 'lg:min-h-[78vh]' : 'lg:min-h-screen'
      }`}
    >
      {/* Particle starfield */}
      <div className="absolute inset-0 opacity-50 light:opacity-100 light:mix-blend-normal mix-blend-screen" aria-hidden="true">
        <ServiceParticles />
      </div>

      {/* Constellation line */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <motion.path
          d="M 100 200 L 300 150 L 500 300 L 800 100"
          className="stroke-white/10 light:stroke-[#1677ff]/40"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
      </svg>

      {/* Galaxy glows (visible in both themes) */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 h-full w-3/4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/[0.12] via-transparent to-transparent light:from-[#4F8CFF]/[0.14]" />
        <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#7C5CFF]/[0.15] via-transparent to-transparent light:from-[#7C5CFF]/[0.1]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex max-w-xl flex-col text-left text-white light:text-slate-900"
        >
          <div
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 backdrop-blur-md"
            style={{
              background: 'var(--rt-pill-bg-2)',
              border: '1px solid rgba(100,116,139,0.28)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--rt-cyan)', boxShadow: '0 0 6px var(--rt-cyan)', animation: 'dot-glow 2.4s ease-in-out infinite' }}
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 light:text-slate-900/90">{eyebrow}</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-[3.4rem] light:text-slate-900">
            {title}
            {highlight && (
              <>
                {' '}
                <br className="hidden sm:block" />
                <span className="text-gradient">{highlight}</span>
              </>
            )}
          </h1>

          <div className="mb-10 max-w-lg text-base font-light leading-relaxed text-[#C7D2E4] sm:text-[15px] light:text-slate-600">
            {description}
          </div>

          {children}

          {actions && <div className="flex flex-col gap-4 sm:flex-row">{actions}</div>}

          {stats && stats.length > 0 && (
            <>
              <div className="mb-8 mt-2 h-px w-full bg-white/10 light:bg-slate-200" />
              <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="svc-kpi-number mb-1.5 text-2xl font-bold">{s.value}</dd>
                    <dd aria-hidden="true" className="text-[9px] font-bold uppercase tracking-wider text-white/50 light:text-slate-600">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </motion.div>

        {/* Figure */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex h-[340px] w-full items-center justify-center sm:h-[400px] lg:h-[500px] lg:justify-end"
          aria-hidden="true"
        >
          {/* Pulsing glow behind the figure */}
          <motion.div
            className="absolute right-1/2 top-1/2 h-[420px] w-[420px] -translate-y-1/2 translate-x-1/2 rounded-full blur-[140px] lg:right-10 lg:h-[500px] lg:w-[500px] lg:translate-x-0"
            style={{ background: 'conic-gradient(from 180deg, #f6b73c, #1677ff, #6c2bff, #00d9ff, #f6b73c)' }}
            animate={{ opacity: [0.14, 0.26, 0.14], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative h-[320px] w-full max-w-[500px]">{figure}</div>
        </motion.div>
      </div>
    </section>
  );
}
