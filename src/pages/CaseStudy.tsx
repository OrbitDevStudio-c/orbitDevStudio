import { useEffect, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, ExternalLink, Quote } from 'lucide-react';
import { SITE_URL } from '../config/site';
import { track } from '../lib/analytics';
import {
  caseStudyPath,
  getAdjacentProjects,
  getPrimaryImage,
  getProjectBySlug,
  projects,
  type Project,
  type ProjectImage,
} from '../data/projects';
import TechChips from '../components/case-studies/TechChips';
import CaseStudyCTA from '../components/case-studies/CaseStudyCTA';
import GradientIcon from '../components/ui/GradientIcon';
import PageHero from '../components/sections/PageHero';
import CaseStudyFigure from '../components/hero-figures/CaseStudyFigure';

const BRAND = 'Orbit Dev Studios';
const INDEX_URL = `${SITE_URL}/portfolio`;
const FALLBACK_OG = `${SITE_URL}/companylogo-social.webp`;

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/** Numbered editorial section: label column on the left, body on the right (stacked on mobile). */
function Section({ id, index, title, children }: { id: string; index: string; title: string; children: ReactNode }) {
  return (
    <motion.section {...fadeUp} aria-labelledby={id} className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-12 py-10 md:py-14 border-t border-white/10 light:border-slate-200 first:border-t-0">
      <div className="lg:col-span-4">
        <span className="block text-[11px] font-bold tracking-[0.2em] text-accent uppercase mb-2">{index}</span>
        <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight text-white light:text-slate-900">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-8 text-[15px] md:text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">{children}</div>
    </motion.section>
  );
}

function NotFoundState({ slug }: { slug?: string }) {
  return (
    <>
      <Helmet>
        <title>{`Case Study Not Found | ${BRAND}`}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="bg-navy-deep min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-4">Case Studies</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-4">Case study not found</h1>
          <p className="max-w-xl text-[#C7D2E4] light:text-slate-600 leading-relaxed mb-8">
            {slug ? <>We couldn’t find a case study for “{slug}”. </> : null}
            It may have moved. Browse all of our case studies or pick one below.
          </p>
          <Link
            to="/portfolio"
            data-track="case_study_not_found_back"
            data-track-location="case-study"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm mb-12"
          >
            <ArrowLeft size={16} aria-hidden="true" /> View All Work
          </Link>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  to={caseStudyPath(p.slug)}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white px-4 py-3 text-sm font-semibold text-white light:text-slate-900 hover:text-accent transition-colors"
                >
                  <span>{p.title}</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function Gallery({ project, images }: { project: Project; images: ProjectImage[] }) {
  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 light:border-slate-300 p-6 md:p-8">
        <p className="mb-4">The best way to see this project is to try it.</p>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="case_study_live_site"
          data-track-location="case-study"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
        >
          See it live at {host(project.liveUrl)} <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${images.length > 1 ? 'md:grid-cols-2' : ''}`}>
      {images.map((img) => {
        const isLogo = img === project.logo;
        return (
          <figure key={img.src} className="overflow-hidden rounded-2xl border border-white/10 light:border-slate-200">
            <div className={isLogo ? 'flex items-center justify-center bg-white p-10 md:p-14' : 'mockup-frame bg-[#0B1220]'}>
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className={isLogo ? 'h-auto w-full max-w-[280px] object-contain' : 'block h-auto w-full'}
              />
            </div>
            <figcaption className="px-4 py-3 text-[13px] text-[#94A3B8] light:text-slate-500 bg-white/[0.03] light:bg-white">
              {isLogo ? `${project.title} brand mark` : `${project.title} website`}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (project) track('case_study_view', { slug: project.slug });
  }, [project]);

  if (!project) return <NotFoundState slug={slug} />;

  const cs = project.caseStudy;
  const url = `${SITE_URL}${caseStudyPath(project.slug)}`;
  const title = `${project.title} Case Study | ${BRAND}`;
  const description = cs.summary;
  const heroImage = getPrimaryImage(project);
  const ogImage = heroImage ? `${SITE_URL}${heroImage.src}` : FALLBACK_OG;
  const galleryImages = [project.screenshot, project.logo].filter(
    (img): img is ProjectImage => !!img && img !== heroImage,
  );
  const { prev, next } = getAdjacentProjects(project.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#creativework`,
        name: project.title,
        headline: `${project.title} Case Study`,
        description,
        url,
        image: ogImage,
        genre: project.industry,
        keywords: project.technologies.join(', '),
        about: cs.services,
        creator: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: BRAND, url: `${SITE_URL}/` },
        isPartOf: { '@type': 'CollectionPage', '@id': `${INDEX_URL}#collection`, url: INDEX_URL },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Work', item: INDEX_URL },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
    ],
  };

  const facts: { label: string; value: ReactNode }[] = [
    ...(cs.client ? [{ label: 'Client', value: cs.client }] : []),
    { label: 'Industry', value: project.industry },
    { label: 'Services', value: cs.services.join(' · ') },
    { label: 'Technologies', value: project.technologies.join(' · ') },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        {heroImage && <meta property="og:image:alt" content={heroImage.alt} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="relative min-h-screen bg-navy">
        <PageHero
          compact
          eyebrow={project.industry}
          title={project.title}
          highlight="Case Study"
          description={cs.summary}
          figure={<CaseStudyFigure project={project} />}
          actions={
            <>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="case_study_live_site"
                data-track-location="case-study"
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm"
              >
                Visit Live Site <ExternalLink size={15} aria-hidden="true" />
                <span className="sr-only">(opens {host(project.liveUrl)} in a new tab)</span>
              </a>
              <Link
                to="/hire"
                data-track="start_project"
                data-track-location="case-study"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-bold text-white light:text-slate-900 transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
              >
                Start Your Project <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </>
          }
        >
          <nav aria-label="Breadcrumb" className="-mt-4 mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-[#94A3B8] light:text-slate-500">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={13} /></li>
              <li><Link to="/portfolio" className="hover:text-accent transition-colors">Work</Link></li>
              <li aria-hidden="true"><ChevronRight size={13} /></li>
              <li aria-current="page" className="text-white light:text-slate-900 font-medium">{project.title}</li>
            </ol>
          </nav>
        </PageHero>

        {/* Story */}
        <div className="section-white">
          {/* Facts strip */}
          <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16">
            <dl className={`grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] light:border-slate-200 light:bg-slate-200 sm:grid-cols-2 ${facts.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {facts.map((f) => (
                <div key={f.label} className="bg-[#0E1728] light:bg-white p-5 md:p-6">
                  <dt className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8] light:text-slate-500">{f.label}</dt>
                  <dd className="text-[14px] font-semibold leading-snug text-white light:text-slate-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
            <Section id="challenge" index="01" title="The Challenge">
              <p>{cs.challenge}</p>
            </Section>

            <Section id="objective" index="02" title="The Objective">
              <p className="text-lg md:text-xl font-semibold leading-relaxed text-white light:text-slate-900 border-l-2 border-accent/60 pl-5">
                {cs.objective}
              </p>
            </Section>

            <Section id="approach" index="03" title="Our Approach">
              <ol className="space-y-4">
                {cs.approach.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-xs font-bold text-accent" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="design" index="04" title="Design">
              <p>{cs.design}</p>
            </Section>

            <Section id="development" index="05" title="Development">
              <p>{cs.development}</p>
            </Section>

            <Section id="technologies" index="06" title="Technologies">
              <TechChips technologies={project.technologies} size="md" />
            </Section>

            <Section id="outcome" index="07" title="The Outcome">
              <h3 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-[#94A3B8] light:text-slate-500">What we delivered</h3>
              <ul className="space-y-3">
                {cs.delivered.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-white light:text-slate-900">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="gallery" index="08" title="Screens">
              <Gallery project={project} images={galleryImages} />
            </Section>

            {cs.testimonial && (
              <Section id="testimonial" index="09" title="Client Feedback">
                <figure className="card-dark p-6 md:p-8">
                  <GradientIcon icon={Quote} size={28} box={false} className="mb-4" />
                  <blockquote className="mb-5 text-lg leading-relaxed text-white light:text-slate-900">
                    “{cs.testimonial.quote}”
                  </blockquote>
                  <figcaption className="text-sm text-[#94A3B8] light:text-slate-500">
                    <span className="font-semibold text-white light:text-slate-900">{cs.testimonial.author}</span>
                    {cs.testimonial.role && <>, {cs.testimonial.role}</>}
                  </figcaption>
                </figure>
              </Section>
            )}
          </div>

          {/* Prev / next */}
          <nav aria-label="More case studies" className="max-w-7xl mx-auto px-6 pb-20">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { p: prev, dir: 'Previous', track: 'case_study_prev' },
                { p: next, dir: 'Next', track: 'case_study_next' },
              ].map(({ p, dir, track: label }) => (
                <li key={dir}>
                  <Link
                    to={caseStudyPath(p.slug)}
                    data-track={label}
                    data-track-location="case-study"
                    className={`group flex h-full flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white p-5 md:p-6 transition-colors hover:border-accent/40 ${dir === 'Next' ? 'sm:items-end sm:text-right' : ''}`}
                  >
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#94A3B8] light:text-slate-500">
                      {dir === 'Previous' && <ArrowLeft size={13} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />}
                      {dir} case study
                      {dir === 'Next' && <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />}
                    </span>
                    <span className="text-lg font-bold tracking-tight text-white light:text-slate-900 group-hover:text-accent transition-colors">{p.title}</span>
                    <span className="text-[13px] text-[#94A3B8] light:text-slate-500">{p.industry}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <CaseStudyCTA
          heading="Start Your Project"
          body={`Planning a product like ${project.title}? Tell us what you need and we'll scope the stack, team and plan with you.`}
          secondary={{ to: '/portfolio', label: 'View All Work', track: 'view_all_work' }}
        />
      </article>
    </>
  );
}
