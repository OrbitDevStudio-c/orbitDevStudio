import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, CircleCheck, TriangleAlert } from 'lucide-react';
import { SITE_URL } from '../config/site';
import { getIndustryBySlug, industries, industryPath } from '../data/industries';
import { caseStudyPath, getProjectBySlug, type Project } from '../data/projects';
import CaseStudyCTA from '../components/case-studies/CaseStudyCTA';
import GradientIcon from '../components/ui/GradientIcon';

const OG_IMAGE = `${SITE_URL}/companylogo-social.webp`;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug);

  if (!industry) return <Navigate to="/industries" replace />;

  const url = `${SITE_URL}${industryPath(industry.slug)}`;
  const related = (industry.related ?? [])
    .map((s) => getProjectBySlug(s))
    .filter((p): p is Project => !!p);
  const others = industries.filter((i) => i.slug !== industry.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: industry.label, item: url },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{industry.metaTitle}</title>
        <meta name="description" content={industry.metaDescription} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={industry.metaTitle} />
        <meta property="og:description" content={industry.metaDescription} />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={industry.metaTitle} />
        <meta name="twitter:description" content={industry.metaDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="relative min-h-screen bg-navy">
        {/* Hero */}
        <header className="bg-navy-deep relative overflow-hidden pt-32 pb-14 md:pb-16">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/[0.08] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#7C5CFF]/[0.12] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-[#94A3B8] light:text-slate-500">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li aria-hidden="true"><ChevronRight size={13} /></li>
                <li><Link to="/industries" className="hover:text-accent transition-colors">Industries</Link></li>
                <li aria-hidden="true"><ChevronRight size={13} /></li>
                <li aria-current="page" className="text-white light:text-slate-900 font-medium">{industry.label}</li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center gap-3">
                <GradientIcon icon={industry.icon} size={20} boxClassName="h-11 w-11 rounded-xl" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-accent uppercase">{industry.label}</span>
              </div>

              <h1 className="max-w-3xl text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-white light:text-slate-900">
                {industry.headline}
              </h1>

              <p className="max-w-2xl text-base sm:text-[17px] leading-relaxed text-[#C7D2E4] light:text-slate-600 mb-8">
                {industry.intro}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/hire"
                  data-track="start_project"
                  data-track-location="industry"
                  className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm"
                >
                  Start Your Project <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  to="/portfolio"
                  data-track="industry_view_work"
                  data-track-location="industry"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 light:border-slate-300 px-7 py-3.5 text-sm font-bold text-white light:text-slate-900 transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
                >
                  See Our Work
                </Link>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="section-white">
          <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
            {/* Problem → solution */}
            <motion.section {...fadeUp} aria-labelledby="challenges-heading">
              <span className="block text-[11px] font-bold tracking-[0.2em] text-accent uppercase mb-2">Problem → Solution</span>
              <h2 id="challenges-heading" className="mb-8 text-2xl md:text-3xl font-bold tracking-tight text-white light:text-slate-900">
                Problems we solve in {industry.label}
              </h2>

              <ol className="space-y-4">
                {industry.challenges.map((c, i) => (
                  <li key={c.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white">
                    <h3 className="flex items-center gap-3 border-b border-white/10 light:border-slate-200 px-5 py-4 text-[15px] font-semibold text-white light:text-slate-900">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-[11px] font-bold text-accent" aria-hidden="true">
                        {i + 1}
                      </span>
                      {c.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-5">
                        <span className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8] light:text-slate-500">
                          <TriangleAlert size={13} aria-hidden="true" /> The problem
                        </span>
                        <p className="text-[14px] leading-relaxed text-[#C7D2E4] light:text-slate-600">{c.problem}</p>
                      </div>
                      <div className="border-t border-white/10 light:border-slate-200 bg-accent/[0.04] p-5 md:border-t-0 md:border-l">
                        <span className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                          <CircleCheck size={13} aria-hidden="true" /> Our solution
                        </span>
                        <p className="text-[14px] leading-relaxed text-white light:text-slate-900">{c.solution}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.section>

            {/* What we build + related work */}
            <motion.section {...fadeUp} aria-labelledby="builds-heading" className={`mt-14 grid grid-cols-1 gap-10 ${related.length ? 'md:grid-cols-2' : ''}`}>
              <div>
                <h2 id="builds-heading" className="mb-4 text-[13px] font-bold uppercase tracking-wider text-[#94A3B8] light:text-slate-500">
                  What we build for {industry.label}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {industry.builds.map((b) => (
                    <li key={b} className="rounded-full border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white px-3.5 py-1.5 text-[13px] font-medium text-white light:text-slate-800">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {related.length > 0 && (
                <div>
                  <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-[#94A3B8] light:text-slate-500">Related work</h2>
                  <ul className="space-y-2">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to={caseStudyPath(p.slug)}
                          data-track="industry_related_case_study"
                          data-track-location="industry"
                          className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white px-4 py-3 transition-colors hover:border-accent/40"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-white light:text-slate-900 group-hover:text-accent transition-colors">{p.title}</span>
                            <span className="block text-[12px] text-[#94A3B8] light:text-slate-500">{p.industry}</span>
                          </span>
                          <ArrowRight size={15} className="shrink-0 text-[#94A3B8] transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.section>

            {/* Other industries */}
            <nav aria-label="Other industries" className="mt-14 border-t border-white/10 light:border-slate-200 pt-8">
              <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-[#94A3B8] light:text-slate-500">Other industries</h2>
              <ul className="flex flex-wrap gap-2">
                {others.map((o) => {
                  const Icon = o.icon;
                  return (
                    <li key={o.slug}>
                      <Link
                        to={industryPath(o.slug)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 light:border-slate-200 px-3.5 py-1.5 text-[13px] font-medium text-[#C7D2E4] light:text-slate-600 transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        <Icon size={14} aria-hidden="true" /> {o.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <CaseStudyCTA
          heading={`Building something for ${industry.label}?`}
          body="Tell us the problem you’re trying to solve. We’ll scope it with you and propose the right stack, team and plan to ship it."
          secondary={{ to: '/industries', label: 'All Industries', track: 'industry_all_industries' }}
          trackLocation="industry"
        />
      </article>
    </>
  );
}
