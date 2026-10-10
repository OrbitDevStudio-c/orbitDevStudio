import { motion } from 'framer-motion';
import { FileSignature, Fingerprint, HardDriveDownload, Lock, LockKeyhole, ShieldCheck } from 'lucide-react';

const chip =
  'absolute z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-[#1E2A4A] px-2.5 py-2 shadow-xl ' +
  'light:border-slate-200 light:bg-white light:shadow-[0_12px_30px_rgba(15,23,42,0.1)]';

const CHIPS = [
  { icon: Lock, label: 'HTTPS', pos: 'left-0 top-4 sm:left-2 sm:top-8', duration: 4, delay: 0 },
  { icon: Fingerprint, label: 'MFA', pos: 'right-0 top-10 sm:right-4 sm:top-12', duration: 5, delay: 1 },
  { icon: HardDriveDownload, label: 'Backups', pos: 'bottom-6 left-0 sm:bottom-10 sm:left-6', duration: 4.5, delay: 0.5 },
  { icon: FileSignature, label: 'NDA available', pos: 'bottom-0 right-0 sm:bottom-4 sm:right-2', duration: 4.2, delay: 1.5 },
];

/** Security hero: a shield with a lock inside glowing concentric rings, with practice chips around it. */
export default function SecurityFigure() {
  return (
    <>
      {/* Encrypted dotted line */}
      <div className="absolute inset-x-[4%] top-1/2 z-0 -translate-y-1/2">
        <div className="h-0 w-full border-t-2 border-dotted border-[#4F8CFF]/40 light:border-[#1677ff]/35" />
        <motion.span
          className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d9ff] shadow-[0_0_10px_rgba(0,217,255,0.9)]"
          animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
        <span className="absolute right-[6%] top-2 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#4F8CFF]/80 light:text-[#1660d6]/80">
          encrypted
        </span>
      </div>

      {/* Concentric rings */}
      <div className="absolute left-1/2 top-1/2 z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full border border-white/[0.06] light:border-[#1677ff]/10" />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F8CFF] shadow-[0_0_10px_rgba(79,140,255,0.9)]" />
        </motion.div>
        <div className="absolute inset-[40px] rounded-full border border-dashed border-[#4F8CFF]/25 light:border-[#1677ff]/25" />
        <motion.div
          className="absolute inset-[78px] rounded-full border border-[#00d9ff]/30 bg-[#1677ff]/[0.06] shadow-[0_0_40px_rgba(22,119,255,0.25)] light:border-[#1677ff]/25 light:bg-[#1677ff]/[0.05]"
          animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Shield tile */}
        <div className="absolute left-1/2 top-1/2 flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1677ff] to-[#00b8e6] shadow-[0_18px_50px_rgba(22,119,255,0.5)]">
          <div className="absolute inset-[1px] rounded-[23px] bg-gradient-to-b from-white/20 to-transparent" />
          <ShieldCheck size={46} strokeWidth={1.75} className="relative text-white" />
          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-[#1E2A4A] shadow-lg light:border-slate-200 light:bg-white">
            <LockKeyhole size={15} className="brand-icon" />
          </div>
        </div>
      </div>

      {/* Practice chips */}
      {CHIPS.map(({ icon: Icon, label, pos, duration, delay }, i) => (
        <motion.div
          key={label}
          animate={{ y: i % 2 === 0 ? [0, -10, 0] : [0, 8, 0] }}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
          className={`${chip} ${pos}`}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/20 light:bg-[rgba(22,119,255,0.08)]">
            <Icon size={13} className="brand-icon" />
          </div>
          <span className="text-[11px] font-bold text-white light:text-slate-900">{label}</span>
        </motion.div>
      ))}

      {/* Decorative stars */}
      <div className="absolute left-[22%] top-0 text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute bottom-1/4 right-[20%] z-20 text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -bottom-3 left-[38%] text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
