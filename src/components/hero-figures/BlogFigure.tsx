import { motion } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import type { BlogCategory } from '../../data/blog';
import { CATEGORY_THEME } from '../blog/categoryTheme';

const dotsDark = 'radial-gradient(rgba(148,163,184,0.2) 1px, transparent 1.4px)';
const dotsLight = 'radial-gradient(rgba(15,23,42,0.14) 1px, transparent 1.4px)';
const dotsFade = 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.55) 60%, transparent 100%)';

const chip =
  'absolute z-30 flex items-center gap-2 rounded-xl border border-white/15 bg-[#1E2A4A] p-2.5 shadow-xl ' +
  'light:border-slate-200 light:bg-white light:shadow-[0_12px_30px_rgba(15,23,42,0.1)]';

/** Miniature of the blog cards: dotted cover, category pill, big faint symbol, title and line skeletons. */
function MiniCard({ category, className, front = false }: { category: BlogCategory; className: string; front?: boolean }) {
  const theme = CATEGORY_THEME[category];
  const Icon = theme.icon;
  return (
    <div
      className={`absolute flex h-[236px] w-[56%] max-w-[240px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111A2D] shadow-2xl light:border-slate-200 light:bg-white light:shadow-[0_20px_50px_rgba(15,23,42,0.12)] ${className}`}
    >
      {/* Cover */}
      <div className="relative h-[42%] shrink-0 overflow-hidden border-b border-white/[0.06] light:border-slate-200">
        <div
          className="absolute inset-0 light:hidden"
          style={{ background: `radial-gradient(circle at 85% 110%, ${theme.dark}2a 0%, transparent 60%), linear-gradient(160deg, #19233b 0%, #111a2d 55%, #0d1526 100%)` }}
        />
        <div
          className="absolute inset-0 hidden light:block"
          style={{ background: `radial-gradient(circle at 85% 110%, ${theme.light}1a 0%, transparent 60%), linear-gradient(160deg, #eef2f7 0%, #f6f8fb 55%, #ffffff 100%)` }}
        />
        <div
          className="absolute inset-0 light:hidden"
          style={{ backgroundImage: dotsDark, backgroundSize: '14px 14px', maskImage: dotsFade, WebkitMaskImage: dotsFade }}
        />
        <div
          className="absolute inset-0 hidden light:block"
          style={{ backgroundImage: dotsLight, backgroundSize: '14px 14px', maskImage: dotsFade, WebkitMaskImage: dotsFade }}
        />
        <Icon
          size={92}
          strokeWidth={2.25}
          className="absolute -bottom-[30%] -right-[4%] opacity-[0.3] light:opacity-[0.22]"
          style={{ color: theme.dark }}
        />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-white/10 bg-[#0b1222]/70 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md light:border-slate-200 light:bg-white/90 light:text-slate-900">
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-8 rounded-full bg-white/20 light:bg-slate-200" />
          <div className="h-1 w-1 rounded-full bg-white/20 light:bg-slate-300" />
          <div className="h-1 w-10 rounded-full bg-white/20 light:bg-slate-200" />
        </div>
        <div className={`mt-1 h-2 w-[88%] rounded-full ${front ? 'bg-white/60 light:bg-slate-700/70' : 'bg-white/35 light:bg-slate-300'}`} />
        <div className={`h-2 w-[62%] rounded-full ${front ? 'bg-white/60 light:bg-slate-700/70' : 'bg-white/35 light:bg-slate-300'}`} />
        <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10 light:bg-slate-100" />
        <div className="h-1.5 w-[80%] rounded-full bg-white/10 light:bg-slate-100" />
        <div className="mt-auto flex items-center justify-between">
          <div className="h-1.5 w-14 rounded-full bg-white/15 light:bg-slate-200" />
          <div className="h-3 w-3 rounded-sm border-r-2 border-t-2 border-accent/70" />
        </div>
      </div>
    </div>
  );
}

/** Blog hero: a fanned stack of three article cards with floating meta chips. */
export default function BlogFigure() {
  return (
    <>
      {/* Back card */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute inset-0 z-0"
      >
        <MiniCard category="UI/UX" className="left-[3%] top-[16%] -rotate-[10deg] opacity-80" />
      </motion.div>

      {/* Middle card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute inset-0 z-10"
      >
        <MiniCard category="Web Development" className="left-[21%] top-[9%] -rotate-[2deg] opacity-95" />
      </motion.div>

      {/* Front card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 z-20"
      >
        <MiniCard category="Website Optimization" front className="left-[40%] top-[13%] rotate-[5deg]" />
      </motion.div>

      {/* Reading-time chip */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={`${chip} right-0 top-0`}
      >
        <Clock size={13} className="brand-icon" />
        <span className="text-[11px] font-bold text-white light:text-slate-900">6 min read</span>
      </motion.div>

      {/* Category chip */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className={`${chip} bottom-1 left-0 border-[#a78bfa]/30 bg-[#1A1A3A] py-2 light:border-[#6c2bff]/25 light:bg-white`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa] light:bg-[#6c2bff]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#a78bfa] light:text-[#6c2bff]">UI/UX</span>
      </motion.div>

      {/* Guide icon chip */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
        className={`${chip} bottom-6 right-2 hidden p-2 sm:flex`}
      >
        <BookOpen size={15} className="brand-icon" />
        <div className="flex w-10 flex-col gap-1">
          <div className="h-1 w-full rounded-full bg-white/40 light:bg-slate-300" />
          <div className="h-1 w-2/3 rounded-full bg-white/20 light:bg-slate-200" />
        </div>
      </motion.div>

      {/* Decorative stars */}
      <div className="absolute left-2 top-6 text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute right-[18%] top-1/3 z-30 text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -bottom-3 left-1/3 text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
