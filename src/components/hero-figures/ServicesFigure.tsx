import { motion } from 'framer-motion';

/** Services hero: dashboard window with floating UI chips. */
export default function ServicesFigure() {
  return (
    <>
      {/* The Main Browser/Dashboard Window */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[90%] md:w-[450px] h-[280px] bg-[#E8F0FE] rounded-xl shadow-2xl border border-white/20 overflow-hidden z-10 flex flex-col">
        {/* Toolbar */}
        <div className="h-8 w-full bg-[#1E2A4A] flex items-center px-3 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F36B6B]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F6B73C]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#52C854]" />
        </div>
        {/* Content area */}
        <div className="flex-1 p-5 flex flex-col gap-4">
          <div className="w-3/4 h-2 rounded-full bg-accent/20" />
          <div className="w-1/2 h-2 rounded-full bg-accent/20" />
          <div className="w-full h-px bg-slate-200 my-2" />
          
          <div className="flex gap-4">
            {/* Card 1 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-100 p-3 flex flex-col gap-2">
              <div className="w-1/2 h-1.5 rounded-full bg-[#1E2A4A]/20" />
              <div className="w-full h-1.5 rounded-full bg-slate-100" />
              <div className="w-3/4 h-1.5 rounded-full bg-slate-100" />
              <div className="mt-auto w-12 h-3 rounded bg-accent opacity-80" />
            </div>
            {/* Card 2 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-100 p-3 flex flex-col gap-2">
              <div className="w-1/2 h-1.5 rounded-full bg-[#52C854]/40" />
              <div className="w-full h-1.5 rounded-full bg-slate-100" />
              <div className="w-2/3 h-1.5 rounded-full bg-slate-100" />
              <div className="mt-auto w-12 h-3 rounded bg-[#52C854] opacity-80" />
            </div>
          </div>
          
          <div className="mt-auto flex items-center gap-2">
            <div className="w-16 h-3 rounded bg-[#52C854]/40" />
            <div className="w-8 h-3 rounded bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      {/* Top Left Floating Pill */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-12 z-20 bg-[#1E2A4A] border border-white/20 p-2.5 rounded-xl shadow-xl flex items-center gap-2"
      >
        <div className="w-4 h-4 rounded-full border-2 border-accent flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-accent" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-12 h-1 rounded-full bg-white/40" />
          <div className="w-8 h-1 rounded-full bg-white/20" />
        </div>
      </motion.div>

      {/* Top Right Floating Pill */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-0 top-20 z-20 bg-[#132A1C] light:bg-[rgba(82,200,84,0.08)] border border-[#52C854]/30 light:border-[rgba(82,200,84,0.35)] p-2 rounded-xl shadow-xl flex items-center gap-2"
      >
        <div className="flex flex-col gap-1 w-10">
          <div className="w-full h-1.5 rounded-full bg-[#52C854]/40" />
          <div className="w-2/3 h-1 rounded-full bg-[#52C854]/20" />
        </div>
      </motion.div>

      {/* Bottom Right Floating Pill */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-4 bottom-12 z-20 bg-[#1A1A3A] light:bg-[rgba(22,119,255,0.07)] border border-accent/30 light:border-[rgba(22,119,255,0.28)] p-2.5 rounded-xl shadow-xl flex items-center gap-2"
      >
        <div className="w-4 h-3 rounded bg-accent/50" />
        <div className="flex flex-col gap-1 w-10">
          <div className="w-full h-1 rounded-full bg-white/40" />
          <div className="w-full h-1 rounded-full bg-white/20" />
        </div>
      </motion.div>

      {/* Mouse Cursor */}
      <motion.div 
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-32 bottom-24 z-30 text-white"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="white" stroke="white" />
          <path d="m13 13 6 6" stroke="white" />
        </svg>
      </motion.div>

      {/* Decorative Stars */}
      <div className="absolute -left-4 bottom-32 text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute left-8 top-1/3 text-white/30 light:text-slate-900/30 text-sm">✦</div>
      <div className="absolute right-12 -bottom-4 text-white/40 light:text-slate-900/40 text-xl">✦</div>
    </>
  );
}
