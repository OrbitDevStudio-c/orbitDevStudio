import { motion } from 'framer-motion';
import { CalendarCheck, Calculator, FileText, Rocket, Send } from 'lucide-react';

const FIELDS = [
  { label: 'Project type', value: 'Web Development', lines: ['w-10', 'w-6'] },
  { label: 'Budget', value: 'To be decided', lines: ['w-8'] },
  { label: 'Timeline', value: 'Flexible', lines: ['w-12', 'w-5'] },
];

/** Fixed-px stops (the column is fixed width and the figure box is 320px tall), so the dotted path lines up exactly. */
const STEPS = [
  { label: 'Discovery call', icon: CalendarCheck, top: 22, left: 0, delay: 0 },
  { label: 'Estimate', icon: Calculator, top: 138, left: 26, delay: 0.8 },
  { label: 'Kick-off', icon: Rocket, top: 254, left: 6, delay: 1.6 },
];

/** Hire hero: a "project brief" form card with a discovery → estimate → kick-off path and a team avatar stack. */
export default function HireFigure() {
  return (
    <>
      {/* Project brief card */}
      <div className="absolute right-0 top-1/2 z-10 flex w-[72%] -translate-y-1/2 flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0F1A30]/90 p-4 shadow-2xl backdrop-blur-xl sm:w-[340px] light:bg-white light:shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
        <div className="flex items-center gap-2.5">
          <div className="brand-icon-wrap flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
            <FileText size={14} className="brand-icon" />
          </div>
          <span className="text-[12px] font-bold tracking-wide text-white light:text-slate-900">Project brief</span>
          <span className="ml-auto rounded-full border border-[#F6B73C]/30 bg-[#F6B73C]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#F6B73C] light:text-[#B45309]">
            Draft
          </span>
        </div>
        <div className="h-px w-full bg-white/[0.07] light:bg-slate-200" />

        <div className="flex flex-col gap-2">
          {FIELDS.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8FA0BC] light:text-slate-500">{f.label}</span>
              <div className="flex h-7 items-center gap-2 rounded-lg border border-white/[0.07] bg-[#0A1326] px-1.5 light:border-slate-200 light:bg-[#F1F5FB]">
                <span className="truncate rounded-md bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-[#7FB2FF] light:bg-[rgba(22,119,255,0.1)] light:text-[#1659C7]">
                  {f.value}
                </span>
                {f.lines.map((w) => (
                  <span key={w} className={`hidden h-1.5 shrink-0 rounded-full bg-white/15 sm:block light:bg-slate-200 ${w}`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-1 flex items-center gap-2">
          <div
            className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[11px] font-bold text-white shadow-[0_6px_18px_rgba(22,119,255,0.35)]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            Send brief <Send size={12} />
          </div>
          <span className="h-1.5 w-12 rounded-full bg-white/15 light:bg-slate-200" />
        </div>
      </div>

      {/* Team avatar stack (initials only) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute bottom-0 right-3 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#16213B] py-1 pl-1 pr-3 shadow-xl light:bg-white"
      >
        <div className="flex -space-x-2">
          {[
            { t: 'PM', c: 'from-[#1677ff] to-[#00d9ff]' },
            { t: 'UX', c: 'from-[#7C5CFF] to-[#B08CFF]' },
            { t: 'FE', c: 'from-[#F6B73C] to-[#F36B6B]' },
          ].map((a) => (
            <span
              key={a.t}
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br text-[8px] font-bold text-white ring-2 ring-[#16213B] light:ring-white ${a.c}`}
            >
              {a.t}
            </span>
          ))}
        </div>
        <span className="text-[10px] font-semibold text-[#C7D2E4] light:text-slate-600">Your team</span>
      </motion.div>

      {/* Discovery → Estimate → Kick-off path */}
      <div className="absolute left-0 top-0 z-20 h-full w-[170px]">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 170 320" fill="none">
          <motion.path
            d="M19 41 C 19 100, 45 98, 45 157 C 45 216, 25 214, 25 273"
            className="stroke-[#7FB2FF]/60 light:stroke-[#1677ff]/45"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 7"
            animate={{ strokeDashoffset: [0, -16] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {STEPS.map(({ label, icon: Icon, top, left, delay }) => (
          <motion.div
            key={label}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + delay / 2, repeat: Infinity, ease: 'easeInOut', delay }}
            style={{ top, left }}
            className="absolute flex h-[38px] items-center gap-2 rounded-xl border border-white/10 bg-[#16213B] py-1.5 pl-2 pr-3 shadow-xl light:bg-white light:shadow-[0_10px_25px_rgba(15,23,42,0.1)]"
          >
            <span className="brand-icon-wrap flex h-[22px] w-[22px] items-center justify-center rounded-full">
              <Icon size={12} className="brand-icon" />
            </span>
            <span className="whitespace-nowrap text-[11px] font-semibold text-white light:text-slate-900">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* Decorative stars */}
      <div className="absolute right-[34%] top-0 text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute left-[21%] top-[29%] text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -top-2 right-1 text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
