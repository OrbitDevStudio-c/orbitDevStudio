import { motion } from 'framer-motion';
import { Check, Cloud, Database, Monitor, Server, type LucideIcon } from 'lucide-react';

type Chip = { name: string; color: 'amber' | 'blue' | 'purple' | 'green' | 'cyan' };

/** The stack, top (closest to the user) to bottom (infrastructure). */
const layers: { icon: LucideIcon; label: string; accent: string; chips: Chip[] }[] = [
  { icon: Monitor, label: 'Front-end', accent: '#1677FF', chips: [{ name: 'React', color: 'cyan' }, { name: 'Next.js', color: 'blue' }] },
  { icon: Server, label: 'Back-end & APIs', accent: '#7C5CFF', chips: [{ name: 'Node.js', color: 'green' }] },
  { icon: Database, label: 'Database', accent: '#00D9FF', chips: [{ name: 'PostgreSQL', color: 'blue' }] },
  { icon: Cloud, label: 'Cloud & DevOps', accent: '#F6B73C', chips: [{ name: 'AWS', color: 'amber' }, { name: 'Docker', color: 'cyan' }] },
];

const chipClass =
  'absolute z-20 rounded-xl border border-white/10 bg-[#101A2D]/90 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md light:border-slate-200 light:bg-white light:shadow-[0_10px_30px_rgba(15,23,42,0.08)]';

/** Technologies hero: the product stack drawn as staggered layers, each with its core tools. */
export default function TechFigure() {
  return (
    <>
      {/* Layers */}
      {layers.map(({ icon: Icon, label, accent, chips }, i) => (
        <div key={label} className="absolute w-[80%]" style={{ left: `${i * 5}%`, top: 58 + i * 62 }}>
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            className={`relative flex h-[54px] items-center gap-2 overflow-hidden rounded-xl border pl-3 pr-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:gap-2.5 sm:pr-3 light:shadow-[0_10px_26px_rgba(15,23,42,0.08)] ${
              i === 0
                ? 'border-[#1677ff]/35 bg-[#13213D]/90 light:border-[#1677ff]/30 light:bg-[#E8F0FE]'
                : 'border-white/10 bg-[#101A2D]/85 light:border-slate-200 light:bg-white'
            }`}
          >
            <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: accent }} />
            <span className="brand-icon-wrap flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
              <Icon size={14} className="brand-icon" />
            </span>
            <span className="min-w-0 truncate text-[11px] font-semibold text-white/90 sm:text-xs light:text-slate-800">{label}</span>
            <span className="ml-auto flex shrink-0 gap-1">
              {chips.map((c) => (
                <span key={c.name} className={`chip-${c.color} rounded-md px-1.5 py-0.5 text-[9px] font-semibold sm:text-[10px]`}>
                  {c.name}
                </span>
              ))}
            </span>
          </motion.div>
        </div>
      ))}

      {/* Floating code snippet */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute right-0 top-0 z-20 rounded-xl border border-white/10 bg-[#0B1220]/95 px-3 py-2 font-mono text-[10px] leading-[1.55] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md light:border-[#1E2A4A] light:bg-[#1E2A4A] light:shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
      >
        <div className="text-white/40">{'// stack.ts'}</div>
        <div>
          <span className="text-[#5B9DFF]">web</span>
          <span className="text-white/60">: </span>
          <span className="text-[#52C854]">'Next.js'</span>
          <span className="text-white/60">,</span>
        </div>
        <div>
          <span className="text-[#5B9DFF]">api</span>
          <span className="text-white/60">: </span>
          <span className="text-[#52C854]">'Node.js'</span>
          <span className="text-white/60">,</span>
        </div>
      </motion.div>

      {/* Pipeline status chip */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`${chipClass} left-0 top-2 flex items-center gap-2 py-1.5 pl-1.5 pr-3`}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#52C854]">
          <Check size={12} strokeWidth={3} className="text-white" />
        </span>
        <span className="text-[11px] font-semibold text-white/90 light:text-slate-800">CI/CD passing</span>
      </motion.div>

      {/* Decorative stars */}
      <div className="absolute bottom-1 left-[2%] text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute left-[46%] top-[6%] text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute bottom-[18%] right-0 text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
