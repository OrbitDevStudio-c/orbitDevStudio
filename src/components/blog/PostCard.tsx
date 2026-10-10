import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import type { BlogCategory, BlogPost } from '../../data/blog';
import { formatPostDate, readingTime } from '../../data/blog';
import BlogCover from './BlogCover';
import { categoryVars } from './categoryTheme';

export function CategoryPill({ category, as = 'span', to }: { category: BlogCategory; as?: 'span' | 'link'; to?: string }) {
  const cls =
    'inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ' +
    'border-[var(--cat)]/30 bg-[var(--cat)]/10 text-[var(--cat)] light:border-[var(--cat-l)]/25 light:bg-[var(--cat-l)]/[0.07] light:text-[var(--cat-l)]';
  const dot = <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--cat)] light:bg-[var(--cat-l)]" />;
  if (as === 'link' && to) {
    return (
      <Link to={to} className={`${cls} transition-opacity hover:opacity-80`} style={categoryVars(category)}>
        {dot}
        {category}
      </Link>
    );
  }
  return (
    <span className={cls} style={categoryVars(category)}>
      {dot}
      {category}
    </span>
  );
}

export function PostMeta({ post, className = '' }: { post: BlogPost; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-slate-400 light:text-slate-500 ${className}`}>
      <time dateTime={post.publishDate}>{formatPostDate(post.publishDate)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={13} aria-hidden="true" />
        {readingTime(post)} min read
      </span>
    </div>
  );
}

const cardBase =
  'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] ' +
  'light:border-slate-200 light:bg-white light:shadow-[0_4px_20px_rgba(15,23,42,0.04)] ' +
  'transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_18px_44px_rgba(0,0,0,0.3),0_0_24px_rgba(22,119,255,0.08)] ' +
  'light:hover:shadow-[0_10px_30px_rgba(15,23,42,0.08),0_0_20px_rgba(22,119,255,0.06)]';

// Stretches the title link over the whole card so the card is one click target.
const stretchedLink =
  "after:absolute after:inset-0 after:z-20 after:rounded-3xl after:content-[''] focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent";

export default function PostCard({ post, headingLevel = 'h3' }: { post: BlogPost; headingLevel?: 'h2' | 'h3' }) {
  const href = `/blog/${post.slug}`;
  const Heading = headingLevel;
  return (
    <article className={cardBase}>
      <BlogCover category={post.category} pill className="h-40 border-b border-white/[0.06] light:border-slate-200" />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <PostMeta post={post} className="mb-4" />

        <Heading className="mb-3 line-clamp-2 text-[19px] font-bold leading-snug tracking-tight text-white light:text-slate-900">
          <Link to={href} data-track="blog_read_article" data-track-location="blog-card" className={stretchedLink}>
            {post.title}
          </Link>
        </Heading>

        <p className="mb-8 line-clamp-3 text-[14.5px] leading-relaxed text-[#C7D2E4] light:text-slate-600">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-4 text-[14px] text-slate-400 light:text-slate-500">
          <span>{post.author.name}</span>
          <ArrowUpRight
            size={17}
            aria-hidden="true"
            className="shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      </div>
    </article>
  );
}

export function FeaturedPostCard({ post }: { post: BlogPost }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className={`${cardBase} lg:flex-row`}>
      <Link to={href} tabIndex={-1} aria-hidden="true" className="block lg:w-[55%] shrink-0">
        <BlogCover
          category={post.category}
          size="lg"
          pill
          className="h-56 sm:h-64 lg:h-full lg:min-h-[340px] border-b lg:border-b-0 lg:border-r border-white/[0.06] light:border-slate-200"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
        <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Latest article</span>

        <h2 className="mb-4 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-white light:text-slate-900">
          <Link to={href} className="transition-colors hover:text-accent">
            {post.title}
          </Link>
        </h2>

        <p className="mb-6 text-[15px] leading-relaxed text-[#C7D2E4] light:text-slate-600">{post.excerpt}</p>

        <PostMeta post={post} className="mb-7" />

        <Link
          to={href}
          data-track="blog_read_article"
          data-track-location="blog"
          aria-label={`Read article: ${post.title}`}
          className="btn-primary group/btn inline-flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold"
        >
          Read Article <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
