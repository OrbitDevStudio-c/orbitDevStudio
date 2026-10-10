import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, SearchCheck } from 'lucide-react';
import { SITE_URL } from '../config/site';
import type { BlogCategory } from '../data/blog';
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  categoryFromSlug,
  getCategoryCounts,
} from '../data/blog';
import PostCard, { FeaturedPostCard } from '../components/blog/PostCard';
import GradientIcon from '../components/ui/GradientIcon';
import PageHero from '../components/sections/PageHero';
import BlogFigure from '../components/hero-figures/BlogFigure';

const PAGE_TITLE = 'Blog | Orbit Dev Studios';
const PAGE_DESCRIPTION =
  'Practical guides on website design, web development, performance and lead generation from the Orbit Dev Studios team.';
const PAGE_URL = `${SITE_URL}/blog`;
const OG_IMAGE = `${SITE_URL}/companylogo-social.webp`;

type Filter = 'All' | BlogCategory;

export default function Blog() {
  const [searchParams] = useSearchParams();
  // Initial filter can be deep-linked (/blog?category=ui-ux). Later changes stay
  // in local state so the page does not scroll-to-top on every filter click.
  const [active, setActive] = useState<Filter>(() => categoryFromSlug(searchParams.get('category')) ?? 'All');

  const counts = useMemo(() => getCategoryCounts(), []);
  const visibleCategories = BLOG_CATEGORIES.filter((c) => counts[c] > 0);
  const featured = BLOG_POSTS[0];

  const gridPosts = useMemo(
    () =>
      active === 'All'
        ? BLOG_POSTS.filter((p) => p.slug !== featured?.slug)
        : BLOG_POSTS.filter((p) => p.category === active),
    [active, featured],
  );

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Orbit Dev Studios Blog',
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      inLanguage: 'en',
      publisher: {
        '@type': 'Organization',
        name: 'Orbit Dev Studios',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/companylogo.webp` },
      },
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.metaDescription,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.publishDate,
        dateModified: p.updatedDate ?? p.publishDate,
        author: { '@type': 'Organization', name: 'Orbit Dev Studios' },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: PAGE_URL },
      ],
    },
  ];

  const filters: { label: Filter; count: number }[] = [
    { label: 'All', count: BLOG_POSTS.length },
    ...visibleCategories.map((c) => ({ label: c, count: counts[c] })),
  ];

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:site_name" content="Orbit Dev Studios" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="relative min-h-screen bg-navy">
        {/* ---------------- Hero ---------------- */}
        <PageHero
          eyebrow="Insights & Guides"
          title="Practical advice for"
          highlight="better business websites"
          description="Straightforward guides on design, development, performance and lead generation, written by the team that builds websites and web applications for growing businesses every day."
          figure={<BlogFigure />}
        >
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[13px] text-slate-400">
              <li>
                <Link to="/" className="transition-colors hover:text-accent">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white light:text-slate-900">Blog</li>
            </ol>
          </nav>
        </PageHero>

        <div className="section-white">
          <section aria-label="Articles">
          {/* ---------------- Featured ---------------- */}
          {featured && (
            <div className="mx-auto max-w-7xl px-6 pt-14 md:pt-20">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <FeaturedPostCard post={featured} />
              </motion.div>
            </div>
          )}

          {/* ---------------- Filter + Grid ---------------- */}
          <div aria-labelledby="all-articles-heading" role="region" className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Browse</span>
                <h2
                  id="all-articles-heading"
                  className="text-3xl md:text-4xl font-bold tracking-tight text-white light:text-slate-900"
                >
                  {active === 'All' ? 'More articles' : active}
                </h2>
              </div>

              <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
                {filters.map(({ label, count }) => {
                  const isActive = active === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActive(label)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                        isActive
                          ? 'bg-accent text-white shadow-[0_4px_15px_rgba(22,119,255,0.25)]'
                          : 'border border-white/10 bg-white/[0.025] text-[#94A3B8] hover:text-accent light:border-slate-200 light:bg-white light:text-slate-600 light:hover:text-accent'
                      }`}
                    >
                      {label}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-accent/10 text-accent light:bg-blue-50'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              {`Showing ${gridPosts.length} article${gridPosts.length === 1 ? '' : 's'}${active === 'All' ? '' : ` in ${active}`}`}
            </p>

            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {gridPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <p className="rounded-2xl border border-white/10 bg-white/[0.025] p-10 text-center text-[15px] text-[#C7D2E4] light:border-slate-200 light:bg-white light:text-slate-600">
                No articles in this category yet. Check back soon.
              </p>
            )}
          </div>
          </section>

          {/* ---------------- CTA band ---------------- */}
          <section className="relative overflow-hidden bg-[#101A2D] py-24 md:py-28">
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(22,119,255,0.1)_0%,_transparent_70%)]" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
            >
              <GradientIcon icon={SearchCheck} size={30} boxClassName="mb-8 h-16 w-16 rounded-2xl" />
              <h2 className="mb-5 text-3xl md:text-5xl font-black tracking-tight text-white light:text-slate-900">
                Is your website working as hard as you are?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-[16px] md:text-[18px] leading-relaxed text-[#C7D2E4] light:text-slate-600">
                Get a free, no-obligation review of your site&apos;s speed, mobile experience, clarity and conversion
                path, with a plain-language list of what to fix first.
              </p>
              <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
                <Link
                  to="/free-audit"
                  data-track="blog_free_audit"
                  data-track-location="blog"
                  className="btn-primary group flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-bold sm:w-auto"
                >
                  Get My Free Audit
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/services"
                  data-track="blog_view_services"
                  data-track-location="blog"
                  className="flex w-full justify-center rounded-xl border border-white/15 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/[0.04] light:border-slate-300 light:text-slate-900 light:hover:bg-slate-50 sm:w-auto"
                >
                  Explore Our Services
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
}
