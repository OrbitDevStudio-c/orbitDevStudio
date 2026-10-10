import type { BlogCategory } from '../../data/blog';
import { CATEGORY_THEME } from './categoryTheme';

interface BlogCoverProps {
  category: BlogCategory;
  /** Kept for API compatibility; covers no longer vary per post. */
  seed?: string;
  size?: 'sm' | 'lg';
  /** Show the category pill in the top-left corner (used on cards). */
  pill?: boolean;
  className?: string;
}

const dotsDark = 'radial-gradient(rgba(148,163,184,0.18) 1px, transparent 1.4px)';
const dotsLight = 'radial-gradient(rgba(15,23,42,0.13) 1px, transparent 1.4px)';
const dotsFade = 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.55) 60%, transparent 100%)';

/** Generated article cover: soft gradient, faint dot grid, and large cropped category symbols. */
export default function BlogCover({ category, size = 'sm', pill = false, className = '' }: BlogCoverProps) {
  const theme = CATEGORY_THEME[category];
  const Icon = theme.icon;
  const Accent = theme.accentIcon;
  const big = size === 'lg';

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0 light:hidden"
          style={{ background: `radial-gradient(circle at 85% 110%, ${theme.dark}1f 0%, transparent 55%), linear-gradient(160deg, #19233b 0%, #111a2d 55%, #0d1526 100%)` }}
        />
        <div
          className="absolute inset-0 hidden light:block"
          style={{ background: `radial-gradient(circle at 85% 110%, ${theme.light}14 0%, transparent 55%), linear-gradient(160deg, #eef2f7 0%, #f6f8fb 55%, #ffffff 100%)` }}
        />

        <div
          className="absolute inset-0 light:hidden"
          style={{ backgroundImage: dotsDark, backgroundSize: '20px 20px', maskImage: dotsFade, WebkitMaskImage: dotsFade }}
        />
        <div
          className="absolute inset-0 hidden light:block"
          style={{ backgroundImage: dotsLight, backgroundSize: '20px 20px', maskImage: dotsFade, WebkitMaskImage: dotsFade }}
        />

        {/* Large cropped symbol */}
        <Icon
          size={big ? 340 : 150}
          strokeWidth={2.25}
          className="absolute -bottom-[22%] -right-[4%] opacity-[0.28] transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-[0.4] light:opacity-[0.2] light:group-hover:opacity-[0.3]"
          style={{ color: theme.dark }}
        />
        {/* Small secondary symbol */}
        <Accent
          size={big ? 40 : 24}
          strokeWidth={2}
          className="absolute right-[42%] top-[26%] opacity-[0.22] transition-opacity duration-500 group-hover:opacity-[0.34] light:opacity-[0.18]"
          style={{ color: theme.partner }}
        />
      </div>

      {pill && (
        <span className="absolute left-5 top-5 z-10 inline-flex items-center rounded-full border border-white/10 bg-[#0b1222]/70 px-3.5 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md light:border-slate-200 light:bg-white/90 light:text-slate-900">
          {category}
        </span>
      )}
    </div>
  );
}
