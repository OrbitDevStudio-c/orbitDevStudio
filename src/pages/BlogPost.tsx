import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronRight, Clock, Link2, Rocket } from 'lucide-react';
import { SITE_URL } from '../config/site';
import { track } from '../lib/analytics';
import {
  categorySlug,
  formatPostDate,
  getPostBySlug,
  getRelatedPosts,
  readingTime,
} from '../data/blog';
import ArticleBody from '../components/blog/ArticleBody';
import BlogCover from '../components/blog/BlogCover';
import PostCard, { CategoryPill } from '../components/blog/PostCard';

const OG_IMAGE = `${SITE_URL}/companylogo-social.webp`;

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

const shareBtn =
  'inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 text-[13px] font-semibold text-white ' +
  'transition-all hover:-translate-y-0.5 hover:text-accent light:border-slate-200 light:bg-white light:text-slate-700 light:hover:text-accent';

function NotFoundState() {
  return (
    <>
      <Helmet>
        <title>Article Not Found | Orbit Dev Studios</title>
        <meta name="description" content="The article you are looking for could not be found on the Orbit Dev Studios blog." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className="bg-navy-deep relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-20">
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[160px]" />
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Blog</span>
          <h1 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-slate-900">
            We couldn&apos;t find that article
          </h1>
          <p className="mb-10 text-[15px] leading-relaxed text-[#C7D2E4] light:text-slate-600">
            It may have moved, or the link may be mistyped. Browse the latest articles on the blog instead.
          </p>
          <Link
            to="/blog"
            className="btn-primary group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to the Blog
          </Link>
        </div>
      </section>
    </>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (post) track('blog_view', { slug: post.slug });
  }, [post]);

  useEffect(() => {
    setCopied(false);
    return () => window.clearTimeout(copiedTimer.current);
  }, [slug]);

  if (!post) return <NotFoundState />;

  const url = `${SITE_URL}/blog/${post.slug}`;
  const catSlug = categorySlug(post.category);
  const categoryHref = `/blog?category=${catSlug}`;
  const modified = post.updatedDate ?? post.publishDate;
  const minutes = readingTime(post);
  const related = getRelatedPosts(post, 3);

  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const xShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`;

  const onCopy = async () => {
    const ok = await copyText(url);
    if (!ok) return;
    track('blog_share', { slug: post.slug, method: 'copy_link' });
    setCopied(true);
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      image: OG_IMAGE,
      datePublished: post.publishDate,
      dateModified: modified,
      articleSection: post.category,
      keywords: post.tags.join(', '),
      inLanguage: 'en',
      author: { '@type': 'Organization', name: 'Orbit Dev Studios', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'Orbit Dev Studios',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/companylogo.webp` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.category, item: `${SITE_URL}${categoryHref}` },
        { '@type': 'ListItem', position: 4, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:site_name" content="Orbit Dev Studios" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:modified_time" content={modified} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="relative min-h-screen bg-navy">
        <article>
          {/* ---------------- Header ---------------- */}
          <header className="bg-navy-deep relative overflow-hidden pt-32 pb-12 md:pb-16">
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute top-0 right-0 h-full w-3/4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/[0.08] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#7C5CFF]/[0.12] via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto max-w-3xl px-6"
            >
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-400">
                  <li>
                    <Link to="/" className="transition-colors hover:text-accent">Home</Link>
                  </li>
                  <li aria-hidden="true"><ChevronRight size={13} /></li>
                  <li>
                    <Link to="/blog" className="transition-colors hover:text-accent">Blog</Link>
                  </li>
                  <li aria-hidden="true"><ChevronRight size={13} /></li>
                  <li>
                    <Link to={categoryHref} className="transition-colors hover:text-accent">{post.category}</Link>
                  </li>
                </ol>
              </nav>

              <CategoryPill category={post.category} as="link" to={categoryHref} />

              <h1 className="mt-5 mb-5 text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-white light:text-slate-900">
                {post.title}
              </h1>

              <p className="mb-8 text-[17px] md:text-lg leading-relaxed text-[#C7D2E4] light:text-slate-600">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-6 light:border-slate-200">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-bold text-white"
                    style={{ backgroundImage: 'var(--gradient-primary)' }}
                  >
                    OD
                  </span>
                  <div className="leading-tight">
                    <p className="text-[14px] font-semibold text-white light:text-slate-900">{post.author.name}</p>
                    <p className="text-[12px] text-slate-400">{post.author.role}</p>
                  </div>
                </div>
                <span aria-hidden="true" className="hidden h-8 w-px bg-white/10 light:bg-slate-200 sm:block" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} aria-hidden="true" />
                    <time dateTime={post.publishDate}>{formatPostDate(post.publishDate)}</time>
                  </span>
                  {post.updatedDate && (
                    <span>
                      Updated <time dateTime={post.updatedDate}>{formatPostDate(post.updatedDate)}</time>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} aria-hidden="true" />
                    {minutes} min read
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto mt-10 max-w-5xl px-6 md:mt-12"
            >
              <BlogCover
                category={post.category}
                seed={post.slug}
                size="lg"
                className="aspect-[16/9] md:aspect-[21/9] rounded-3xl border border-white/10 light:border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.35)] light:shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
              />
            </motion.div>
          </header>

          {/* ---------------- Body ---------------- */}
          <div className="section-white py-14 md:py-20">
            <div className="mx-auto max-w-3xl px-6">
              <ArticleBody blocks={post.blocks} />

              <footer className="mt-14 space-y-8 border-t border-white/10 pt-8 light:border-slate-200">
                <div>
                  <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Tags</h2>
                  <ul className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[12px] font-medium text-[#C7D2E4] light:border-slate-200 light:bg-white light:text-slate-600"
                      >
                        #{tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Share this article</h2>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={linkedInShare}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="blog_share_linkedin"
                      data-track-location="blog"
                      className={shareBtn}
                      aria-label="Share on LinkedIn (opens in a new tab)"
                    >
                      <LinkedInGlyph /> LinkedIn
                    </a>
                    <a
                      href={xShare}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="blog_share_x"
                      data-track-location="blog"
                      className={shareBtn}
                      aria-label="Share on X (opens in a new tab)"
                    >
                      <XGlyph /> Post on X
                    </a>
                    <button type="button" onClick={onCopy} className={shareBtn}>
                      {copied ? <Check size={15} aria-hidden="true" /> : <Link2 size={15} aria-hidden="true" />}
                      {copied ? 'Link copied' : 'Copy link'}
                    </button>
                    <span className="sr-only" aria-live="polite">{copied ? 'Link copied to clipboard' : ''}</span>
                  </div>
                </div>
              </footer>

              {/* ---------------- End CTA ---------------- */}
              <aside
                aria-label="Start your project"
                className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-8 sm:p-10 light:border-slate-200 light:bg-white"
              >
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/[0.14] blur-[90px] light:bg-accent/[0.08]" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="brand-icon-wrap hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:flex">
                      <Rocket size={22} className="brand-icon" />
                    </div>
                    <div>
                      <p className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-white light:text-slate-900">
                        Planning a new website?
                      </p>
                      <p className="max-w-md text-[15px] leading-relaxed text-[#C7D2E4] light:text-slate-600">
                        Tell us what you&apos;re building. We&apos;ll come back with a clear plan, timeline and
                        estimate.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/hire"
                    data-track="blog_start_project"
                    data-track-location="blog"
                    className="btn-primary group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold sm:w-auto"
                  >
                    Start Your Project
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* ---------------- Related ---------------- */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="bg-navy-deep py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Keep reading</span>
                  <h2 id="related-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-white light:text-slate-900">
                    Related posts
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-accent transition-all hover:gap-2.5"
                >
                  View all articles <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
