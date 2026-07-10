import { motion } from 'framer-motion';
import { ArrowRight, Monitor, Smartphone, LayoutGrid } from 'lucide-react';
import ServiceParticles from './ServiceParticles';

export default function PortfolioHero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-gradient-to-br from-[#152A5A] to-[#132E7B] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <ServiceParticles />
      
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/20 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#B08CFF]/20 via-transparent to-transparent" />
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
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">Our Portfolio</span>
          </div>

          <h1 className="text-display text-white mb-6">
            Digital excellence <br className="hidden sm:block" /> in action.
          </h1>

          <p className="text-base sm:text-[15px] text-white/70 leading-relaxed font-normal mb-10 max-w-lg">
            Explore a curated selection of our most impactful projects. From high-converting e-commerce platforms to sophisticated enterprise architecture, see how we translate complex requirements into beautiful, scalable realities.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                document.getElementById('portfolio-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#4F8CFF] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-blue-500 shadow-[0_0_20px_rgba(79,140,255,0.3)]"
            >
              View Projects
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Right UI Illustration: Floating Showcase */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end"
        >
          {/* Main glowing behind graphic */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500 rounded-full blur-[100px] opacity-20" />
          
          <div className="relative w-full max-w-[500px] h-[450px]">
            
            {/* The Main Browser Window */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 lg:right-4 top-1/4 w-[85%] md:w-[400px] lg:w-[450px] h-[280px] lg:h-[300px] bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden z-20 flex flex-col"
            >
              {/* Toolbar */}
              <div className="h-8 w-full bg-slate-800/80 border-b border-white/10 flex items-center px-3 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F36B6B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F6B73C]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#52C854]" />
                <div className="ml-4 w-1/2 h-3 bg-white/5 rounded-full border border-white/10" />
              </div>
              {/* Image Content (Wireframe representation) */}
              <div className="flex-1 p-4 grid grid-cols-2 gap-4">
                 <div className="w-full h-20 lg:h-24 rounded-lg bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#4F8CFF]/0 to-[#4F8CFF]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Monitor className="text-[#4F8CFF] opacity-50" />
                 </div>
                 <div className="w-full h-20 lg:h-24 rounded-lg bg-[#B08CFF]/10 border border-[#B08CFF]/20 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#B08CFF]/0 to-[#B08CFF]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <LayoutGrid className="text-[#B08CFF] opacity-50" />
                 </div>
                 <div className="col-span-2 w-full h-24 lg:h-32 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.03)_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,rgba(255,255,255,.03)_0_1px,transparent_1px_20px)] opacity-10 mix-blend-overlay" />
                    <span className="text-emerald-400 opacity-60 text-[10px] tracking-widest font-bold uppercase relative z-10">Featured Case Study</span>
                    <div className="w-1/3 h-1.5 bg-emerald-400/30 rounded-full relative z-10" />
                 </div>
              </div>
            </motion.div>

            {/* Mobile Device */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-4 lg:-left-8 bottom-4 lg:bottom-12 w-[120px] md:w-[150px] h-[240px] md:h-[300px] bg-slate-800/90 backdrop-blur-md border border-white/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 flex flex-col items-center p-2"
            >
              <div className="w-12 h-4 bg-black rounded-b-xl absolute top-0 z-40" />
              <div className="w-full h-full rounded-[1.2rem] bg-gradient-to-b from-[#152A5A] to-[#0A1430] overflow-hidden flex flex-col gap-2 p-3 mt-4 relative">
                 {/* Mobile screen content */}
                 <div className="w-full h-24 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 blur-xl rounded-full" />
                 </div>
                 <div className="w-3/4 h-2 bg-white/20 rounded-full mt-1" />
                 <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                 
                 <div className="w-full h-12 bg-indigo-500/20 rounded-xl mt-auto border border-indigo-500/30 flex items-center justify-center">
                   <Smartphone size={16} className="text-indigo-400 opacity-60" />
                 </div>
              </div>
            </motion.div>

            {/* Floating UI Element (Stats/Likes) */}
            <motion.div 
              animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-8 bottom-24 z-40 bg-white/10 backdrop-blur-lg border border-white/20 p-3 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F36B6B] to-[#F6B73C] flex items-center justify-center text-white text-xs font-bold shadow-inner">
                99%
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs font-bold text-white tracking-wide">Client Rating</div>
                <div className="w-12 h-1 rounded-full bg-white/30" />
              </div>
            </motion.div>

            {/* Decorative Stars */}
            <div className="absolute left-10 top-10 text-[#4F8CFF] animate-pulse">✦</div>
            <div className="absolute right-12 top-0 text-white/40 text-xl animate-pulse">✦</div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
