import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Database, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceParticles from './ServiceParticles';

export default function TechHero() {
  return (
    <section className="relative w-full min-h-screen bg-background flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <ServiceParticles />
      
      {/* Decorative radial gradients for the galaxy feel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1E2A4A]/30 via-transparent to-transparent opacity-60" />
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
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">Technologies</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-6">
            Practical tech stacks for <br className="hidden sm:block" /> serious digital products.
          </h1>

          <p className="text-base sm:text-[15px] text-white/70 leading-relaxed font-light mb-10 max-w-lg">
            We choose the right languages, frameworks, databases, and cloud tools for each product instead of forcing every idea into one template. Built for speed, scale, and uncompromising security.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-blue-500 shadow-[0_0_20px_rgba(79,140,255,0.3)]"
            >
              Plan My Stack
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
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
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent rounded-full blur-[100px] opacity-20" />
          
          <div className="relative w-full max-w-[450px] h-[450px] flex items-center justify-center">
            
            {/* Center Server Core */}
            <div className="absolute z-10 w-32 h-32 rounded-3xl bg-white/5 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_60px_rgba(79,140,255,0.4)]">
               <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                 <Cpu size={40} className="text-white opacity-90" />
               </div>
            </div>

            {/* Glowing Rings */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="w-[250px] h-[250px] rounded-full border border-white/10 border-t-[#3B6FE0]/50 animate-[spin_8s_linear_infinite]" />
              <div className="absolute w-[350px] h-[350px] rounded-full border border-white/5 border-b-[#52C854]/30 animate-[spin_12s_linear_infinite_reverse]" />
            </div>

            {/* Floating Tech Modules */}
            {/* Module 1: Database */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-4 top-1/4 z-20 bg-[#1E2A4A]/80 backdrop-blur-md border border-accent/30 p-3.5 rounded-2xl shadow-2xl flex flex-col items-center gap-2"
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
              className="absolute right-8 top-1/4 z-20 bg-[#132A1C]/80 backdrop-blur-md border border-[#52C854]/30 p-3.5 rounded-2xl shadow-2xl flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Code2 size={20} className="text-[#52C854]" />
              </div>
              <div className="w-8 h-1 rounded-full bg-white/30" />
            </motion.div>

            {/* Module 3: Network/Cloud */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute left-1/2 bottom-8 -translate-x-1/2 z-20 bg-[#2A153A]/80 backdrop-blur-md border border-[#B08CFF]/30 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Network size={20} className="text-[#B08CFF]" />
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
              className="absolute left-1/4 bottom-1/3 w-2 h-2 bg-[#52C854] rounded-full blur-[2px]"
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
