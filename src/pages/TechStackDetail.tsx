import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, ChevronRight, Scale } from 'lucide-react';
import { SITE_URL } from '../config/site';
import GradientIcon from '../components/ui/GradientIcon';
import { getTechStackPage, techStackPages } from '../data/techStacks';

const TechCTA = lazy(() => import('../components/sections/TechCTA'));
const NotFound = lazy(() => import('./NotFound'));

// Same accent cycle as TechLayers so stack chips read consistently across /tech pages.
const chipColors: Array<'amber' | 'blue' | 'purple' | 'green' | 'cyan'> = ['amber', 'blue', 'purple', 'green', 'cyan'];

const OG_IMAGE = `${SITE_URL}/companylogo-social.webp`;

function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-3xl mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5"
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[#94A3B8] leading-relaxed"
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

export default function TechStackDetail() {
  const { slug } = useParams();
  const page = getTechStackPage(slug);

  if (!page) {
    return (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    );
  }

  const pageUrl = `${SITE_URL}/tech/${page.slug}`;
  const related = techStackPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={page.metaTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Technologies', item: `${SITE_URL}/tech` },
              { '@type': 'ListItem', position: 3, name: page.navLabel, item: pageUrl },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: page.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen bg-navy">
        {/* Hero */}
        <section className="bg-navy-deep relative w-full pt-32 pb-16 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/[0.08] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#7C5CFF]/[0.15] via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-7xl mx-auto px-6"
          >
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-[13px] text-[#94A3B8]">
              <Link to="/tech" className="hover:text-white light:hover:text-slate-900 transition-colors">
                Technology
              </Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="text-white/90 light:text-slate-900" aria-current="page">
                {page.navLabel}
              </span>
            </nav>

            <div className="max-w-3xl">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md mb-8"
                style={{
                  background: 'var(--rt-pill-bg-2)',
                  border: '1px solid rgba(100,116,139,0.28)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--rt-cyan)', boxShadow: '0 0 6px var(--rt-cyan)', animation: 'dot-glow 2.4s ease-in-out infinite' }}
                />
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 light:text-slate-900/90 uppercase">
                  {page.eyebrow}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-6 text-white light:text-slate-900">
                {page.title} <span className="text-gradient">{page.highlight}</span>
              </h1>

              <p className="text-base sm:text-[17px] text-[#C7D2E4] leading-relaxed mb-10 max-w-2xl">{page.intro}</p>

              <ul className="flex flex-wrap gap-2.5 mb-10" aria-label="Core technologies">
                {page.coreTools.map((tool, i) => (
                  <li
                    key={tool}
                    className={`chip-${chipColors[i % chipColors.length]} inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md`}
                  >
                    <span className="chip-dot" />
                    <span className="text-[12px] font-bold tracking-[0.12em] uppercase">{tool}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/hire"
                  data-track="start_project"
                  data-track-location={`tech_${page.slug}`}
                  className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-semibold"
                >
                  Plan My Stack
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3.5 font-semibold text-[#94A3B8] transition-colors hover:bg-white/[0.05] hover:text-white light:hover:text-slate-900"
                >
                  View Work
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Layers */}
        <section className="bg-[#101A2D] py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeading title={page.layersHeading} intro={page.layersIntro} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.layers.map((layer, index) => (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#152037]/80 p-8 md:p-10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="absolute right-0 top-0 h-72 w-72 -translate-y-1/2 translate-x-1/3 rounded-full bg-[#4F8CFF]/10 blur-[90px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <GradientIcon icon={layer.icon} size={24} boxClassName="w-12 h-12 rounded-xl" />
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white light:text-slate-900">{layer.title}</h3>
                    </div>
                    <p className="text-[15px] leading-relaxed text-[#C7D2E4] mb-6">{layer.summary}</p>
                    <ul>
                      {layer.tools.map((tool) => (
                        <li key={tool.name} className="flex flex-col gap-1 border-t border-white/5 py-3.5 sm:flex-row sm:gap-4">
                          <span className="shrink-0 text-[14px] font-semibold text-white light:text-slate-900 sm:w-44">{tool.name}</span>
                          <span className="text-[14px] leading-relaxed text-[#94A3B8]">{tool.role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* When to use each */}
        {page.choices && (
          <section className="bg-navy-deep py-16 md:py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F8CFF]/[0.06] blur-[150px] pointer-events-none rounded-full" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <SectionHeading title={page.choices.heading} intro={page.choices.intro} />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {page.choices.items.map((choice, index) => (
                  <motion.div
                    key={choice.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="flex flex-col rounded-3xl border border-white/5 bg-[#0B1220]/80 p-7 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
                  >
                    <h3 className="text-lg font-bold text-white light:text-slate-900 mb-4">{choice.name}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#94A3B8] mb-3">Pick it when</p>
                    <ul className="space-y-2.5 mb-6 flex-grow">
                      {choice.pickWhen.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[14px] leading-snug text-[#C7D2E4]">
                          <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-3.5 text-[13px] leading-snug text-[#94A3B8]">
                      <Scale size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{choice.tradeoff}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Comparison */}
        {page.comparison && (
          <section className="bg-navy-deep py-16 md:py-24 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 relative z-10">
              <SectionHeading title={page.comparison.heading} intro={page.comparison.intro} />

              <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0B1220]/80 backdrop-blur-xl">
                <table className="w-full min-w-[560px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th scope="col" className="p-5 font-semibold text-[#94A3B8]">
                        <span className="sr-only">Aspect</span>
                      </th>
                      <th scope="col" className="p-5 font-bold text-accent">{page.comparison.columns[0]}</th>
                      <th scope="col" className="p-5 font-semibold text-[#94A3B8]">{page.comparison.columns[1]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.comparison.rows.map((row) => (
                      <tr key={row.label} className="border-b border-white/5 last:border-0">
                        <th scope="row" className="p-5 font-semibold text-white light:text-slate-900">{row.label}</th>
                        <td className="p-5 text-[#C7D2E4]">
                          <span className="inline-flex items-start gap-2">
                            <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                            {row.a}
                          </span>
                        </td>
                        <td className="p-5 text-[#94A3B8]">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Principles */}
        <section className="bg-[#101A2D] py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeading title={page.principlesHeading} />
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {page.principles.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-[#152037]/80 p-7"
                >
                  <span className="block font-mono text-[12px] tracking-wider text-accent mb-4">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-base font-bold text-white light:text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#94A3B8]">{p.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-navy-deep py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <SectionHeading title="Common questions" />
            <div className="space-y-3">
              {page.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 open:bg-white/[0.05]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-white light:text-slate-900 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown size={18} className="shrink-0 text-[#94A3B8] transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#C7D2E4]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related stacks */}
        <section className="bg-[#101A2D] pt-16 md:pt-24 pb-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#94A3B8] mb-6">Explore more of our stack</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/tech/${r.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#152037]/80 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30"
                >
                  <GradientIcon icon={r.icon} size={18} boxClassName="w-11 h-11 rounded-xl" />
                  <span>
                    <span className="flex items-center gap-1.5 text-[15px] font-semibold text-white light:text-slate-900">
                      {r.navLabel}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-[#94A3B8]">{r.navDesc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <TechCTA />
        </Suspense>
      </div>
    </>
  );
}
