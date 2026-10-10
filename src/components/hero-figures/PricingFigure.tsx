import { motion } from 'framer-motion';
import { CalendarDays, Check, CreditCard, Palette, ShoppingCart, Sparkles } from 'lucide-react';

const chip =
  'absolute z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-[#1E2A4A] p-2.5 shadow-xl ' +
  'light:border-slate-200 light:bg-white light:shadow-[0_12px_30px_rgba(15,23,42,0.1)]';

const PILLS = [
  { icon: ShoppingCart, label: 'E-commerce' },
  { icon: CreditCard, label: 'Payments' },
  { icon: Palette, label: 'Custom design' },
];

/** Blurred placeholder where an amount would be: the figure never shows real prices. */
function BlurredAmount({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block h-5 rounded-md bg-gradient-to-r from-[#4F8CFF] to-[#00D9FF] opacity-70 blur-[3px] light:opacity-50 ${className}`}
    />
  );
}

/** Pricing hero: an AI estimate card with selected requirements, a range slider and blurred amounts. */
export default function PricingFigure() {
  return (
    <>
      {/* Main estimate card */}
      <div className="absolute left-1/2 top-1/2 z-10 flex w-[90%] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-2xl border border-white/10 bg-[#0F1A30]/95 p-5 shadow-2xl backdrop-blur-xl light:border-slate-200 light:bg-white light:shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:left-auto sm:right-4 sm:translate-x-0">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="brand-icon-wrap flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <Sparkles size={17} className="brand-icon" />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <span className="text-[12px] font-bold text-white light:text-slate-900">Project estimate</span>
            <div className="h-1.5 w-1/2 rounded-full bg-white/15 light:bg-slate-200" />
          </div>
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25 light:bg-slate-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25 light:bg-slate-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25 light:bg-slate-300" />
          </div>
        </div>

        {/* Selected requirements */}
        <div className="flex flex-wrap gap-1.5">
          {PILLS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-[10px] font-semibold text-white light:border-[rgba(22,119,255,0.3)] light:bg-[rgba(22,119,255,0.07)] light:text-slate-900"
            >
              <Icon size={11} className="text-[#4F8CFF] light:text-accent" />
              {label}
              <Check size={10} strokeWidth={3} className="text-[#52C854]" />
            </span>
          ))}
          <span className="inline-flex items-center rounded-full border border-dashed border-white/15 px-2.5 py-1 light:border-slate-300">
            <span className="h-1.5 w-8 rounded-full bg-white/15 light:bg-slate-200" />
          </span>
        </div>

        {/* Range slider */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="h-1.5 w-16 rounded-full bg-white/15 light:bg-slate-200" />
            <div className="h-1.5 w-10 rounded-full bg-white/10 light:bg-slate-200" />
          </div>
          <div className="relative h-1.5 w-full rounded-full bg-white/10 light:bg-slate-200">
            <div className="absolute inset-y-0 left-[22%] right-[30%] rounded-full bg-gradient-to-r from-[#1677ff] to-[#00d9ff]" />
            <span className="absolute left-[22%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#00d9ff] bg-[#0F1A30] shadow-[0_0_10px_rgba(0,217,255,0.6)] light:bg-white" />
            <span className="absolute left-[70%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#00d9ff] bg-[#0F1A30] shadow-[0_0_10px_rgba(0,217,255,0.6)] light:bg-white" />
          </div>
        </div>

        {/* Estimated range, amounts blurred */}
        <div className="flex items-end justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 light:border-slate-200 light:bg-[#F8FAFC]">
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/50 light:text-slate-500">Estimated range</span>
            <div className="flex items-center gap-1.5 text-[15px] font-bold text-white light:text-slate-900">
              $ <BlurredAmount className="w-12 sm:w-14" /> <span className="text-white/40 light:text-slate-400">—</span> $
              <BlurredAmount className="w-12 sm:w-14" />
            </div>
          </div>
          <div className="mb-0.5 h-6 w-14 shrink-0 rounded-md bg-accent opacity-80" />
        </div>
      </div>

      {/* AI estimate chip */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`${chip} left-0 top-2 sm:top-6`}
      >
        <Sparkles size={14} className="text-[#F6B73C] light:text-[#B45309]" />
        <span className="text-[11px] font-bold text-white light:text-slate-900">AI estimate</span>
      </motion.div>

      {/* Timeline chip */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className={`${chip} bottom-0 right-0 bg-[#1A1A3A] light:bg-white sm:bottom-4`}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20 light:bg-[rgba(22,119,255,0.08)]">
          <CalendarDays size={14} className="brand-icon" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold leading-none text-white light:text-slate-900">Timeline</span>
          <div className="h-1 w-12 rounded-full bg-white/25 light:bg-slate-200" />
        </div>
      </motion.div>

      {/* Small scope chip */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={`${chip} right-2 top-0 hidden border-[#52C854]/30 bg-[#132A1C] p-2 light:border-[rgba(82,200,84,0.35)] light:bg-[rgba(82,200,84,0.08)] sm:flex`}
      >
        <Check size={12} strokeWidth={3} className="text-[#52C854]" />
        <div className="flex w-10 flex-col gap-1">
          <div className="h-1.5 w-full rounded-full bg-[#52C854]/40" />
          <div className="h-1 w-2/3 rounded-full bg-[#52C854]/20" />
        </div>
      </motion.div>

      {/* Decorative stars */}
      <div className="absolute bottom-16 left-1 text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute left-10 top-1/3 text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -bottom-2 right-1/3 text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
