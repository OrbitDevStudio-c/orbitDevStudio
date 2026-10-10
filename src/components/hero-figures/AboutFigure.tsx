import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Target, Users, type LucideIcon } from 'lucide-react';

const chipClass =
  'absolute z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-[#101A2D]/90 py-2 pl-2 pr-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md light:border-slate-200 light:bg-white light:shadow-[0_10px_30px_rgba(15,23,42,0.08)]';

/** The four values from the About page, placed around the orbit. */
const values: { icon: LucideIcon; label: string; className: string; y: number; duration: number; delay: number }[] = [
  { icon: Target, label: 'Transparency', className: 'left-0 top-5 sm:left-4', y: -10, duration: 4, delay: 0 },
  { icon: ShieldCheck, label: 'Quality', className: 'right-0 top-12 sm:right-6', y: 10, duration: 5, delay: 1 },
  { icon: Users, label: 'Partnership', className: 'bottom-10 left-1 sm:left-10', y: -8, duration: 4.5, delay: 0.5 },
  { icon: Lightbulb, label: 'Innovation', className: 'bottom-4 right-1 sm:right-12', y: 9, duration: 5, delay: 1.5 },
];

const spin = (duration: number, reverse = false) => ({
  animate: { rotate: reverse ? -360 : 360 },
  transition: { duration, repeat: Infinity, ease: 'linear' as const },
});

/** About hero: the studio logo at the centre of its orbit, with company values circling it. */
export default function AboutFigure() {
  return (
    <>
      {/* Orbit rings, centred in the box */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer ring */}
        <motion.div
          {...spin(60, true)}
          className="absolute h-[296px] w-[296px] rounded-full border border-white/[0.07] light:border-[#1677ff]/15"
        >
          <span className="absolute -top-1 left-1/2 -ml-1 h-2 w-2 rounded-full bg-[#F6B73C] shadow-[0_0_10px_#F6B73C]" />
          <span className="absolute -bottom-[3px] left-[22%] h-1.5 w-1.5 rounded-full bg-white/50 light:bg-slate-400" />
        </motion.div>

        {/* Middle ring (dashed) */}
        <motion.div
          {...spin(40)}
          className="absolute h-[220px] w-[220px] rounded-full border border-dashed border-white/15 light:border-[#1677ff]/30"
        >
          <span className="absolute -top-[5px] left-1/2 -ml-[5px] h-2.5 w-2.5 rounded-full bg-[#00D9FF] shadow-[0_0_12px_#00D9FF] light:bg-[#00BFE8]" />
          <span className="absolute -bottom-1 left-1/2 -ml-1 h-2 w-2 rounded-full bg-[#7C5CFF] shadow-[0_0_10px_#7C5CFF]" />
        </motion.div>

        {/* Inner ring */}
        <div className="absolute h-[150px] w-[150px] rounded-full border border-[#1677ff]/25 shadow-[0_0_40px_rgba(22,119,255,0.12)_inset] light:border-[#1677ff]/20" />

        {/* Soft pulse behind the logo */}
        <motion.div
          className="absolute h-[124px] w-[124px] rounded-full bg-[#1677ff]/20 blur-xl light:bg-[#1677ff]/15"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Logo core */}
        <div className="relative z-10 flex h-[116px] w-[116px] items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl light:border-[#1677ff]/15 light:bg-white/70">
          <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_10px_30px_rgba(22,119,255,0.3)]">
            <img
              src="/companylogo.webp"
              alt=""
              width={64}
              height={64}
              loading="eager"
              decoding="async"
              className="h-16 w-16 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Value chips */}
      {values.map(({ icon: Icon, label, className, y, duration, delay }) => (
        <motion.div
          key={label}
          animate={{ y: [0, y, 0] }}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
          className={`${chipClass} ${className}`}
        >
          <span className="brand-icon-wrap flex h-7 w-7 items-center justify-center rounded-lg">
            <Icon size={14} className="brand-icon" />
          </span>
          <span className="text-[11px] font-semibold tracking-wide text-white/90 light:text-slate-800">{label}</span>
        </motion.div>
      ))}

      {/* Decorative stars */}
      <div className="absolute left-[18%] top-[44%] text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute right-[16%] top-[2%] text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute bottom-[30%] right-[6%] text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
