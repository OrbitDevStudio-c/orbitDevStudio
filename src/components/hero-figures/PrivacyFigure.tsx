import { motion } from 'framer-motion';
import { Ban, Lock, ShieldCheck, UserRound } from 'lucide-react';
import FigureChip from './FigureChip';

/** Privacy hero: a policy document with a lock badge on its corner and data-promise chips. */
export default function PrivacyFigure() {
  return (
    <>
      {/* Document + lock badge */}
      <div className="absolute left-[18%] top-1/2 z-10 h-[272px] w-[60%] -translate-y-1/2 sm:w-[290px]">
        {/* Sheet behind */}
        <div className="absolute inset-0 translate-x-3 translate-y-2 rotate-2 rounded-xl bg-[#C9D6EE] opacity-60 light:bg-[#E2E8F0]" />

        <div className="relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-white/20 bg-[#EEF3FC] p-5 shadow-2xl light:border-slate-200 light:bg-white light:shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          {/* Title */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 shrink-0 rounded-md" style={{ background: 'var(--gradient-primary)' }} />
            <div className="h-2.5 w-2/5 rounded-full bg-[#1E2A4A]/70" />
            <div className="ml-auto h-1.5 w-8 rounded-full bg-slate-300" />
          </div>
          <div className="h-px w-full bg-slate-300/70" />

          {/* Paragraph */}
          <div className="flex flex-col gap-1.5">
            <div className="mb-0.5 h-2 w-1/3 rounded-full bg-accent/45" />
            <div className="h-1.5 w-full rounded-full bg-slate-300" />
            <div className="h-1.5 w-11/12 rounded-full bg-slate-300" />
            <div className="h-1.5 w-3/4 rounded-full bg-slate-300" />
          </div>

          {/* Bulleted list */}
          <div className="flex flex-col gap-1.5">
            <div className="mb-0.5 h-2 w-2/5 rounded-full bg-accent/45" />
            {['w-4/5', 'w-2/3', 'w-3/4'].map((w) => (
              <div key={w} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className={`h-1.5 rounded-full bg-slate-300 ${w}`} />
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="mt-auto flex items-center gap-2.5 rounded-lg border border-[rgba(22,119,255,0.25)] bg-[rgba(22,119,255,0.08)] p-2.5">
            <ShieldCheck size={16} className="shrink-0 text-accent" />
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="h-1.5 w-full rounded-full bg-accent/30" />
              <div className="h-1.5 w-1/2 rounded-full bg-accent/30" />
            </div>
          </div>
        </div>

        {/* Lock badge on the corner */}
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-5 -top-5 z-20 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#0B1222] shadow-[0_10px_30px_rgba(22,119,255,0.45)] light:border-white"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Lock size={24} className="text-white" strokeWidth={2.2} />
        </motion.div>
      </div>

      {/* Promise chips */}
      <FigureChip icon={UserRound} label="Your data" className="left-0 top-[14%]" />
      <FigureChip icon={Ban} label="No selling" className="right-0 top-[46%]" distance={10} duration={5} delay={1} />
      <FigureChip icon={ShieldCheck} label="HTTPS" className="bottom-[6%] left-[3%]" distance={-8} duration={4.5} delay={0.5} />

      {/* Decorative stars */}
      <div className="absolute bottom-[10%] right-[8%] text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute left-[6%] top-[42%] text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -top-2 left-[40%] text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
