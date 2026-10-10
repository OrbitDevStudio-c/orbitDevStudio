import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, FileCheck2, Gauge, Palette, ScanSearch, Search, Smartphone } from 'lucide-react';

const chip =
  'absolute z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-[#1E2A4A] p-2.5 shadow-xl ' +
  'light:border-slate-200 light:bg-white light:shadow-[0_12px_30px_rgba(15,23,42,0.1)]';

const CHECKS = [
  { icon: Palette, label: 'UI/UX', width: '82%', ok: true },
  { icon: Smartphone, label: 'Mobile', width: '90%', ok: true },
  { icon: Gauge, label: 'Performance', width: '54%', ok: false },
  { icon: Search, label: 'SEO', width: '74%', ok: true },
];

/** Free Audit hero: an audit report window with four check rows, a "Report ready" chip and a magnifier. */
export default function AuditFigure() {
  return (
    <>
      {/* Report window */}
      <div className="absolute left-1/2 top-1/2 z-10 flex w-[90%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-white/20 bg-[#E8F0FE] shadow-2xl light:border-slate-200 light:shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:left-auto sm:right-4 sm:translate-x-0">
        {/* Toolbar */}
        <div className="flex h-8 w-full items-center gap-1.5 bg-[#1E2A4A] px-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#F36B6B]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#F6B73C]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#52C854]" />
          <div className="ml-3 h-3.5 flex-1 max-w-[160px] rounded-md bg-white/10" />
        </div>

        {/* Body */}
        <div className="relative flex flex-col gap-2.5 p-4">
          {/* Scan line */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-[#1677ff]/10 to-transparent"
            animate={{ y: [0, 200, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="mb-0.5 flex items-center justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-bold text-[#1E2A4A]">Website audit</span>
              <div className="h-1.5 w-24 rounded-full bg-accent/20" />
            </div>
            <div className="h-5 w-14 rounded-md bg-accent opacity-80" />
          </div>

          {CHECKS.map(({ icon: Icon, label, width, ok }, i) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-3 py-1.5 shadow-sm">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[rgba(22,119,255,0.08)]">
                <Icon size={13} className="brand-icon" />
              </div>
              <span className="w-[72px] shrink-0 text-[11px] font-semibold text-[#1E2A4A]">{label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className={`h-full rounded-full ${ok ? 'bg-gradient-to-r from-[#1677ff] to-[#00d9ff]' : 'bg-gradient-to-r from-[#F6B73C] to-[#f97316]'}`}
                  initial={{ width: 0 }}
                  animate={{ width }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
                />
              </div>
              {ok ? (
                <CheckCircle2 size={15} className="shrink-0 text-[#2EA043]" />
              ) : (
                <AlertTriangle size={15} className="shrink-0 text-[#D97706]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Report ready chip */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className={`${chip} bottom-0 left-0 border-[#52C854]/30 bg-[#132A1C] light:border-[rgba(82,200,84,0.35)] light:bg-[#F0FBF1] sm:bottom-4`}
      >
        <FileCheck2 size={15} className="text-[#52C854] light:text-[#2EA043]" />
        <span className="text-[11px] font-bold text-white light:text-slate-900">Report ready</span>
      </motion.div>

      {/* Magnifier chip */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`${chip} left-0 top-0 p-2.5 sm:top-6`}
      >
        <div className="brand-icon-wrap flex h-8 w-8 items-center justify-center rounded-lg">
          <ScanSearch size={17} className="brand-icon" />
        </div>
      </motion.div>

      {/* Small pill */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={`${chip} right-0 top-0 hidden border-accent/30 bg-[#1A1A3A] p-2 light:border-[rgba(22,119,255,0.28)] light:bg-[rgba(22,119,255,0.07)] sm:flex`}
      >
        <div className="h-3 w-4 rounded bg-accent/50" />
        <div className="flex w-10 flex-col gap-1">
          <div className="h-1 w-full rounded-full bg-white/40 light:bg-slate-400/60" />
          <div className="h-1 w-full rounded-full bg-white/20 light:bg-slate-300/60" />
        </div>
      </motion.div>

      {/* Decorative stars */}
      <div className="absolute bottom-28 left-0 text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute left-10 top-1/3 z-20 text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -bottom-3 right-12 text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
