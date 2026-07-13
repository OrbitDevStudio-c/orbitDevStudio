import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Database, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceParticles from './ServiceParticles';

export default function TechHero() {
  return (
    <section className="bg-[#0B1220] relative w-full min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <ServiceParticles />
      
      {/* Decorative radial gradients for the galaxy feel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/[0.08] via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#7C5CFF]/[0.08] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col text-left text-white max-w-xl"
        >
          <div className="inline-flex items-center self-start px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4F8CFF] uppercase">Technologies</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-6">
            Practical tech stacks for <br className="hidden sm:block" /> serious digital products.
          </h1>

          <p className="text-base sm:text-[15px] text-[#C7D2E4] leading-relaxed font-light mb-10 max-w-lg">
            We choose the right languages, frameworks, databases, and cloud tools for each product instead of forcing every idea into one template. Built for speed, scale, and uncompromising security.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-slate-950 transition-colors hover:bg-accent/90 shadow-[0_4px_15px_rgba(79,140,255,0.3)]"
            >
              Plan My Stack
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3.5 font-semibold text-[#94A3B8] transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              View Work
            </Link>
          </div>
        </motion.div>

        {/* Right UI Illustration: Holographic Cloud Core */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end"
        >
          {/* Main glowing behind graphic */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent rounded-full blur-[100px] opacity-[0.08]" />
          
          <div className="relative w-full max-w-[450px] h-[450px] flex items-center justify-center">
            
            {/* Center Server Core */}
            <div className="absolute z-10 w-32 h-32 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_60px_rgba(79,140,255,0.2)]">
               <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0A266A] to-accent flex items-center justify-center border border-white/10">
                 <Cpu size={40} className="text-white opacity-90" />
               </div>
            </div>

            {/* Glowing Rings */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="w-[250px] h-[250px] rounded-full border border-white/5 border-t-[#4F8CFF]/50 animate-[spin_8s_linear_infinite]" />
              <div className="absolute w-[350px] h-[350px] rounded-full border border-white/[0.02] border-b-[#7C5CFF]/30 animate-[spin_12s_linear_infinite_reverse]" />
            </div>

            {/* Floating Tech Modules */}
            {/* Module 1: Database */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-4 top-1/4 z-20 bg-[#101A2D]/80 backdrop-blur-md border border-accent/20 p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Database size={20} className="text-accent" />
              </div>
              <div className="w-8 h-1 rounded-full bg-white/30" />
            </motion.div>

            {/* Module 2: Code/Frontend */}
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-8 top-1/4 z-20 bg-[#101A2D]/80 backdrop-blur-md border border-[#7C5CFF]/20 p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center border border-[#7C5CFF]/20">
                <Code2 size={20} className="text-[#7C5CFF]" />
              </div>
              <div className="w-8 h-1 rounded-full bg-white/30" />
            </motion.div>

            {/* Module 3: Network/Cloud */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute left-1/2 bottom-8 -translate-x-1/2 z-20 bg-[#101A2D]/80 backdrop-blur-md border border-[#0A266A]/30 p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0A266A]/20 flex items-center justify-center border border-[#0A266A]/30">
                <Network size={20} className="text-white/70" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="w-16 h-1.5 rounded-full bg-white/50" />
                <div className="w-10 h-1.5 rounded-full bg-white/20" />
              </div>
            </motion.div>

            {/* Data particles moving toward core */}
            <motion.div 
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute right-1/4 top-1/3 w-2 h-2 bg-accent rounded-full blur-[2px]"
            />
            <motion.div 
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute left-1/4 bottom-1/3 w-2 h-2 bg-[#7C5CFF] rounded-full blur-[2px]"
            />

            {/* Decorative Stars */}
            <div className="absolute -left-4 bottom-32 text-accent animate-pulse">✦</div>
            <div className="absolute right-12 -bottom-4 text-white/40 text-xl animate-pulse">✦</div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
