import { motion } from 'framer-motion';
import { MessageSquare, Search } from 'lucide-react';

const chip =
  'absolute z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-[#1E2A4A] p-2.5 shadow-xl ' +
  'light:border-slate-200 light:bg-white light:shadow-[0_12px_30px_rgba(15,23,42,0.1)]';

function Question({ children }: { children: string }) {
  return (
    <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-gradient-to-r from-[#1677ff] to-[#3b82f6] px-3.5 py-2 text-[11px] font-semibold leading-snug text-white shadow-[0_6px_18px_rgba(22,119,255,0.3)]">
      {children}
    </div>
  );
}

function Answer({ lines }: { lines: string[] }) {
  return (
    <div className="flex max-w-[78%] items-end gap-2">
      <div className="brand-icon-wrap flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        <MessageSquare size={11} className="brand-icon" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-3.5 py-2.5 light:border-slate-200 light:bg-[#F1F5F9]">
        {lines.map((w, i) => (
          <div key={i} className={`h-1.5 rounded-full bg-white/25 light:bg-slate-300 ${w}`} />
        ))}
      </div>
    </div>
  );
}

/** FAQ hero: a Q&A chat window with a floating search chip and a "?" badge. */
export default function FAQFigure() {
  return (
    <>
      {/* Chat window */}
      <div className="absolute left-1/2 top-1/2 z-10 flex w-[90%] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0F1A30]/95 shadow-2xl backdrop-blur-xl light:border-slate-200 light:bg-white light:shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:left-auto sm:right-4 sm:translate-x-0">
        {/* Header */}
        <div className="flex h-10 items-center gap-2.5 border-b border-white/10 bg-[#1E2A4A] px-4 light:border-slate-200 light:bg-[#F8FAFC]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#52C854] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#52C854]" />
          </span>
          <div className="h-1.5 w-20 rounded-full bg-white/30 light:bg-slate-300" />
          <div className="ml-auto h-1.5 w-8 rounded-full bg-white/15 light:bg-slate-200" />
        </div>

        {/* Conversation */}
        <div className="flex flex-col gap-3 p-4">
          <Question>How long does a website take?</Question>
          <Answer lines={['w-full', 'w-[85%]', 'w-[55%]']} />
          <Question>Do you sign NDAs?</Question>
          <div className="flex items-end gap-2">
            <div className="brand-icon-wrap flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              <MessageSquare size={11} className="brand-icon" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-3.5 py-3 light:border-slate-200 light:bg-[#F1F5F9]">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-white/50 light:bg-slate-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search chip */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`${chip} left-0 top-0 sm:top-4`}
      >
        <Search size={13} className="brand-icon" />
        <span className="text-[11px] font-semibold text-white/80 light:text-slate-600">pricing, SEO, NDA</span>
        <motion.span
          className="h-3 w-px bg-accent"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* "?" badge */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute right-0 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1677ff] to-[#00d9ff] text-xl font-black text-white shadow-[0_10px_30px_rgba(22,119,255,0.45)]"
      >
        ?
      </motion.div>

      {/* Answer-count chip */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className={`${chip} bottom-0 left-2 hidden border-[#52C854]/30 bg-[#132A1C] p-2 light:border-[rgba(82,200,84,0.35)] light:bg-[rgba(82,200,84,0.08)] sm:flex`}
      >
        <div className="flex w-12 flex-col gap-1">
          <div className="h-1.5 w-full rounded-full bg-[#52C854]/40" />
          <div className="h-1 w-2/3 rounded-full bg-[#52C854]/20" />
        </div>
      </motion.div>

      {/* Decorative stars */}
      <div className="absolute bottom-24 left-0 text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute right-6 top-1/2 z-20 text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -bottom-3 right-1/4 text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
