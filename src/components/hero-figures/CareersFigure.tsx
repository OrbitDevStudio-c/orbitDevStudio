import { motion } from 'framer-motion';
import { CodeXml, Globe, PenTool, Rocket } from 'lucide-react';
import FigureChip from './FigureChip';

/** Syntax-like code lines: [indent, ...[colour, width px]] */
const CODE: { indent: number; tokens: [string, number][] }[] = [
  { indent: 0, tokens: [['bg-[#C792EA]', 34], ['bg-[#82AAFF]', 52], ['bg-[#89DDFF]', 10]] },
  { indent: 1, tokens: [['bg-[#C792EA]', 26], ['bg-[#FFCB6B]', 40], ['bg-[#89DDFF]', 8]] },
  { indent: 1, tokens: [['bg-[#F78C6C]', 30], ['bg-[#C3E88D]', 64]] },
  { indent: 2, tokens: [['bg-[#82AAFF]', 44], ['bg-[#C3E88D]', 36], ['bg-[#89DDFF]', 8]] },
  { indent: 2, tokens: [['bg-[#FFCB6B]', 28], ['bg-[#7FB2FF]', 56]] },
  { indent: 1, tokens: [['bg-[#89DDFF]', 10]] },
  { indent: 1, tokens: [['bg-[#C792EA]', 40], ['bg-[#82AAFF]', 30], ['bg-[#C3E88D]', 46]] },
  { indent: 0, tokens: [['bg-[#89DDFF]', 10]] },
];

const ROLES = [
  { title: 'Frontend Engineer', icon: CodeXml },
  { title: 'UI/UX Designer', icon: PenTool },
];

/** Careers hero: a dark code editor beside a "We're hiring" role card stack. */
export default function CareersFigure() {
  return (
    <>
      {/* Code editor (stays dark in both themes) */}
      <div className="mockup-frame absolute left-0 top-[6%] z-10 flex h-[228px] w-[70%] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0B1220] shadow-2xl sm:w-[330px] light:shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
        <div className="flex h-8 w-full shrink-0 items-center gap-1.5 bg-[#14203A] px-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#F36B6B]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#F6B73C]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#52C854]" />
          <span className="ml-3 rounded-md border border-white/[0.07] bg-[#0B1220] px-2 py-0.5 font-mono text-[9px] text-[#94A3B8]">
            team.tsx
          </span>
        </div>
        <div className="flex flex-1 gap-3 px-3 py-3.5">
          <div className="flex flex-col gap-[9px] pt-px font-mono text-[8px] leading-[6px] text-[#94A3B8]/50">
            {Array.from({ length: CODE.length + 1 }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[9px]">
            {CODE.map((line, i) => (
              <div key={i} className="flex h-1.5 gap-1.5" style={{ paddingLeft: line.indent * 14 }}>
                {line.tokens.map(([c, w], j) => (
                  <span key={j} className={`h-1.5 shrink-0 rounded-full opacity-80 ${c}`} style={{ width: w }} />
                ))}
              </div>
            ))}
            <div className="flex h-1.5 items-center gap-1.5" style={{ paddingLeft: 14 }}>
              <span className="h-1.5 w-8 rounded-full bg-[#C792EA] opacity-80" />
              <motion.span
                className="h-3 w-[2px] rounded-sm bg-[#7FB2FF]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Role card stack */}
      <div className="absolute bottom-[5%] right-0 z-20 w-[54%] sm:w-[230px]">
        <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-3 rounded-2xl border border-white/10 bg-[#121C33] light:bg-[#EEF3FB]" />
        <div className="relative flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-[#16213B] p-3.5 shadow-2xl light:bg-white light:shadow-[0_20px_50px_rgba(15,23,42,0.14)]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#52C854] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#52C854]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#52C854] light:text-[#15803D]">We&apos;re hiring</span>
          </div>
          {ROLES.map(({ title, icon: Icon }) => (
            <div key={title} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-[#0F1A30] p-2 light:border-slate-200 light:bg-[#F6F9FE]">
              <span className="brand-icon-wrap flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                <Icon size={14} className="brand-icon" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="truncate text-[11px] font-semibold text-white light:text-slate-900">{title}</span>
                <div className="flex gap-1.5">
                  <span className="h-1 w-2/5 rounded-full bg-white/15 light:bg-slate-200" />
                  <span className="h-1 w-1/4 rounded-full bg-white/15 light:bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Remote-friendly chip */}
      <FigureChip icon={Globe} label="Remote-friendly" className="right-1 top-[3%]" />

      {/* Rocket chip */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute bottom-[3%] left-[8%] z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#16213B] shadow-xl light:bg-white light:shadow-[0_10px_25px_rgba(15,23,42,0.1)]"
      >
        <Rocket size={22} className="brand-icon" />
      </motion.div>

      {/* Decorative stars */}
      <div className="absolute left-[30%] bottom-[2%] text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute right-[36%] top-0 text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -right-1 top-[40%] text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
