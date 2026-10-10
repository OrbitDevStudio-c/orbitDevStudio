import { motion } from 'framer-motion';
import { Check, Handshake, ListChecks, Scale } from 'lucide-react';
import FigureChip from './FigureChip';

const CLAUSES = [
  ['w-full', 'w-4/5'],
  ['w-11/12', 'w-2/3'],
  ['w-full', 'w-3/5'],
];

/** Terms hero: a signed agreement with a checkmark seal, a scale tile and "clear / fair" chips. */
export default function TermsFigure() {
  return (
    <>
      {/* Agreement document + seal */}
      <div className="absolute right-[14%] top-1/2 z-10 h-[280px] w-[60%] -translate-y-1/2 sm:w-[280px]">
        <div className="flex h-full -rotate-2 flex-col gap-3 overflow-hidden rounded-xl border border-white/20 bg-[#EEF3FC] p-5 shadow-2xl light:border-slate-200 light:bg-white light:shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          {/* Letterhead */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-2.5 w-1/2 rounded-full bg-[#1E2A4A]/70" />
            <div className="h-1.5 w-1/3 rounded-full bg-slate-300" />
          </div>
          <div className="h-px w-full bg-slate-300/70" />

          {/* Numbered clauses */}
          <div className="flex flex-col gap-2.5">
            {CLAUSES.map((lines, i) => (
              <div key={i} className="flex gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent/15 text-[8px] font-bold text-accent">
                  {i + 1}
                </span>
                <div className="flex flex-1 flex-col gap-1.5 pt-1">
                  {lines.map((w) => (
                    <span key={w} className={`h-1.5 rounded-full bg-slate-300 ${w}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-auto flex items-end gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <svg viewBox="0 0 120 36" className="h-8 w-28" fill="none">
                <motion.path
                  d="M4 26 C 12 6, 22 6, 19 22 S 30 34, 38 18 S 52 4, 50 20 S 62 30, 72 16 C 78 8, 86 10, 84 22 C 83 28, 96 20, 116 13"
                  stroke="#1E2A4A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
                />
              </svg>
              <div className="h-px w-full bg-[#1E2A4A]/40" />
              <div className="h-1 w-12 rounded-full bg-slate-300" />
            </div>
            <div className="flex w-1/4 flex-col gap-1">
              <div className="h-px w-full bg-[#1E2A4A]/40" />
              <div className="h-1 w-3/4 rounded-full bg-slate-300" />
            </div>
          </div>
        </div>

        {/* Checkmark seal */}
        <div className="absolute -bottom-4 -right-6 z-20 flex h-16 w-16 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#52C854]/70 light:border-[#16A34A]/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#52C854] to-[#16A34A] shadow-[0_10px_28px_rgba(82,200,84,0.45)]">
            <Check size={24} className="text-white" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Scale tile */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute right-0 top-[4%] z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#16213B] shadow-xl light:bg-white light:shadow-[0_10px_25px_rgba(15,23,42,0.1)]"
      >
        <Scale size={22} className="brand-icon" />
      </motion.div>

      <FigureChip icon={ListChecks} label="Clear terms" className="left-0 top-[18%]" />
      <FigureChip icon={Handshake} label="Fair use" className="bottom-[16%] left-[3%]" distance={10} duration={5} delay={1} />

      {/* Decorative stars */}
      <div className="absolute bottom-[2%] left-[34%] text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute left-[10%] top-[48%] text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -top-2 left-[38%] text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
