import { motion } from 'framer-motion';
import {
  Building2,
  HeartPulse,
  Plane,
  Puzzle,
  ShoppingCart,
  SlidersHorizontal,
  Sofa,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

const chipClass =
  'absolute z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-[#101A2D]/90 py-2 pl-2 pr-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md light:border-slate-200 light:bg-white light:shadow-[0_10px_30px_rgba(15,23,42,0.08)]';

/** Tiles on a hexagon around the hub; x/y are percentages of the figure box. */
const industries: { icon: LucideIcon; label: string; x: number; y: number; highlight?: boolean }[] = [
  { icon: HeartPulse, label: 'Healthcare', x: 50, y: 14, highlight: true },
  { icon: ShoppingCart, label: 'E-commerce', x: 80, y: 32 },
  { icon: Building2, label: 'Architecture', x: 80, y: 68 },
  { icon: Sofa, label: 'Interior', x: 50, y: 86 },
  { icon: Plane, label: 'Travel', x: 20, y: 68 },
  { icon: UtensilsCrossed, label: 'Restaurant', x: 20, y: 32 },
];

/** Industries hero: a hub of sector tiles connected to one custom-solution core. */
export default function IndustriesFigure() {
  return (
    <>
      {/* Connections from the hub to every sector */}
      <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {industries.map(({ label, x, y, highlight }) => (
          <motion.line
            key={label}
            x1="50%"
            y1="50%"
            x2={`${x}%`}
            y2={`${y}%`}
            strokeWidth={highlight ? 1.5 : 1}
            strokeDasharray="4 6"
            className={highlight ? 'stroke-[#00D9FF]/70 light:stroke-[#1677ff]/60' : 'stroke-white/20 light:stroke-[#1677ff]/25'}
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: highlight ? 1.2 : 2.4, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {industries.map(({ label, x, y, highlight }) => (
          <circle
            key={label}
            cx={`${(50 + x) / 2}%`}
            cy={`${(50 + y) / 2}%`}
            r={highlight ? 3 : 2}
            className={highlight ? 'fill-[#00D9FF] light:fill-[#1677ff]' : 'fill-white/40 light:fill-[#1677ff]/40'}
          />
        ))}
      </svg>

      {/* Hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute h-[104px] w-[104px] rounded-full border border-dashed border-white/15 light:border-[#1677ff]/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/15 bg-[#101A2D]/80 shadow-[0_0_40px_rgba(22,119,255,0.25)] backdrop-blur-xl light:border-[#1677ff]/20 light:bg-white light:shadow-[0_10px_30px_rgba(22,119,255,0.15)]">
          <span className="brand-icon-wrap flex h-12 w-12 items-center justify-center rounded-full">
            <Puzzle size={22} className="brand-icon" />
          </span>
        </div>
      </div>

      {/* Sector tiles */}
      {industries.map(({ icon: Icon, label, x, y, highlight }) => (
        <div
          key={label}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <div
            className={`relative flex h-[68px] w-[68px] flex-col items-center justify-center gap-1.5 rounded-2xl border sm:h-[76px] sm:w-[76px] ${
              highlight
                ? 'border-white/25 bg-gradient-to-br from-[#1677ff] to-[#00B8E6] shadow-[0_0_30px_rgba(22,119,255,0.45)]'
                : 'border-white/10 bg-[#101A2D]/85 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md light:border-slate-200 light:bg-white light:shadow-[0_10px_24px_rgba(15,23,42,0.07)]'
            }`}
          >
            {highlight && (
              <motion.span
                className="absolute inset-0 rounded-2xl border-2 border-[#00D9FF]"
                animate={{ scale: [1, 1.22], opacity: [0.7, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <Icon size={20} className={highlight ? 'text-white' : 'brand-icon'} />
            <span
              className={`text-[9px] font-semibold tracking-wide sm:text-[10px] ${
                highlight ? 'text-white' : 'text-white/75 light:text-slate-700'
              }`}
            >
              {label}
            </span>
          </div>
        </div>
      ))}

      {/* Floating chips */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`${chipClass} left-0 top-1`}
      >
        <span className="brand-icon-wrap flex h-6 w-6 items-center justify-center rounded-md">
          <SlidersHorizontal size={12} className="brand-icon" />
        </span>
        <span className="text-[11px] font-semibold text-white/90 light:text-slate-800">Sector-specific</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={`${chipClass} bottom-1 right-0`}
      >
        <span className="chip-dot bg-[#52C854] shadow-[0_0_8px_#52C854]" />
        <span className="text-[11px] font-semibold text-white/90 light:text-slate-800">100% custom</span>
      </motion.div>

      {/* Decorative stars */}
      <div className="absolute left-[4%] top-[48%] text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute right-[24%] top-[3%] text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute bottom-[8%] left-[30%] text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
