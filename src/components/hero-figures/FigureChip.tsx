import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type FigureChipProps = {
  icon: LucideIcon;
  label: string;
  /** Absolute positioning (and any extra styling) inside the figure box. */
  className?: string;
  style?: CSSProperties;
  /** Bob distance in px (negative = up first). */
  distance?: number;
  duration?: number;
  delay?: number;
};

/** Small floating label chip shared by the page-hero figures: icon tile + label, bobbing gently. */
export default function FigureChip({ icon: Icon, label, className = '', style, distance = -10, duration = 4, delay = 0 }: FigureChipProps) {
  return (
    <motion.div
      animate={{ y: [0, distance, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      style={style}
      className={`absolute z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-[#16213B] py-1.5 pl-1.5 pr-3 shadow-xl light:bg-white light:shadow-[0_10px_25px_rgba(15,23,42,0.1)] ${className}`}
    >
      <span className="brand-icon-wrap flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        <Icon size={13} className="brand-icon" />
      </span>
      <span className="whitespace-nowrap text-[11px] font-semibold text-white light:text-slate-900">{label}</span>
    </motion.div>
  );
}
