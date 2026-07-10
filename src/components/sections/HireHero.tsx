import { motion } from 'framer-motion';
import { ArrowRight, UserCheck, Terminal, Layers } from 'lucide-react';
import ServiceParticles from './ServiceParticles';

export default function HireHero() {
  return (
    <section className="bg-navy-soft relative w-full min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <ServiceParticles />
      
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#3B6FE0]/[0.12] via-transparent to-transparent opacity-[0.38]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1E2A4A]/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col text-left text-white max-w-xl"
        >
          <div className="inline-flex items-center self-start px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">Hire Dedicated Talent</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-6">
            Scale your team with <br className="hidden sm:block" /> elite engineering.
          </h1>

          <p className="text-base sm:text-[15px] text-white/70 leading-relaxed font-light mb-10 max-w-lg">
            Augment your capabilities with senior developers, architects, and designers who integrate seamlessly into your workflow. Flexible engagement models designed to accelerate your product roadmap without the hiring overhead.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                document.getElementById('hire-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-blue-500 shadow-[0_0_20px_rgba(79,140,255,0.3)]"
            >
              Hire Developers Now
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Right UI Illustration: Floating Talent Network */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end"
        >
          {/* Main glowing behind graphic */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#1E2A4A] rounded-full blur-[100px] opacity-20" />
          
          <div className="relative w-full max-w-[500px] h-[450px]">
            
            {/* Center Core (Project/Business) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-32 h-32 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_60px_rgba(46,91,229,0.4)]">
               <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-surface to-primary flex items-center justify-center">
                 <Layers size={40} className="text-white opacity-90" />
               </div>
            </div>

            {/* Glowing Connecting Lines */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 500 450">
                <motion.line x1="250" y1="225" x2="380" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" className="animate-[pulse_2s_linear_infinite]" />
                <motion.line x1="250" y1="225" x2="120" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" className="animate-[pulse_3s_linear_infinite]" />
                <motion.line x1="250" y1="225" x2="250" y2="380" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" className="animate-[pulse_2.5s_linear_infinite]" />
              </svg>
            </div>

            {/* Talent Nodes */}
            
            {/* Node 1: Senior Dev */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-4 top-[10%] z-20 bg-[#141416]/80 backdrop-blur-md border border-accent/30 p-4 rounded-2xl shadow-2xl flex items-center gap-3 w-48"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
                <Terminal size={20} className="text-accent" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-white tracking-wide">Senior React Dev</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Available</span>
                </div>
              </div>
            </motion.div>

            {/* Node 2: Architect */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-0 top-[20%] z-20 bg-[#141416]/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3 w-44"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shrink-0">
                <UserCheck size={18} className="text-purple-400" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-white tracking-wide">Cloud Architect</span>
                <span className="text-[10px] text-white/50">AWS & Azure</span>
              </div>
            </motion.div>

            {/* Node 3: UI/UX */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute left-1/2 bottom-[5%] -translate-x-1/2 z-20 bg-[#141416]/90 backdrop-blur-md border border-emerald-500/30 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 w-52"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <Layers size={20} className="text-emerald-400" />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-bold text-white tracking-wide">Product Designer</span>
                   <span className="text-[10px] text-white/50">Figma</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
                  <div className="w-[85%] h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Decorative Stars */}
            <div className="absolute left-10 top-10 text-accent animate-pulse">✦</div>
            <div className="absolute right-20 bottom-20 text-white/40 text-xl animate-pulse">✦</div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
