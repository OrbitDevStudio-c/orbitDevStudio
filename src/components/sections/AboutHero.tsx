import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ServiceParticles from './ServiceParticles';
import { Link } from 'react-router-dom';

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-gradient-to-br from-[#152A5A] to-[#132E7B] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <ServiceParticles />
      
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/20 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#B08CFF]/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-white max-w-4xl"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">Who We Are</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.1] mb-8">
            Engineering digital <br className="hidden sm:block" /> futures since 2018.
          </h1>

          <p className="text-base sm:text-[17px] text-white/70 leading-relaxed font-light mb-12 max-w-2xl mx-auto">
            OrbitDevStudio is a premium software engineering agency dedicated to transforming ambitious ideas into scalable, high-performance digital realities. We don't just write code; we build the foundational technology that powers next-generation businesses.
          </p>

          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#4F8CFF] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-blue-500 shadow-[0_0_20px_rgba(79,140,255,0.3)]"
          >
            See Our Work
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Decorative graphic element below text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-5xl h-[200px] mt-16 rounded-t-[3rem] bg-gradient-to-t from-white/10 to-white/5 border-t border-x border-white/10 backdrop-blur-xl relative overflow-hidden flex items-end justify-center pb-8"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#4F8CFF] rounded-full blur-[100px] opacity-30" />
          <div className="relative z-10 flex gap-4 opacity-50">
             {/* Simulating code blocks/servers in a data center */}
             <div className="w-16 h-32 rounded-t-xl bg-white/20 border-t border-x border-white/30 backdrop-blur-md" />
             <div className="w-16 h-40 rounded-t-xl bg-white/30 border-t border-x border-white/40 backdrop-blur-md relative -translate-y-4 shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
             <div className="w-16 h-24 rounded-t-xl bg-white/10 border-t border-x border-white/20 backdrop-blur-md" />
             <div className="w-16 h-36 rounded-t-xl bg-[#4F8CFF]/30 border-t border-x border-[#4F8CFF]/50 backdrop-blur-md shadow-[0_0_30px_rgba(79,140,255,0.3)]" />
             <div className="w-16 h-28 rounded-t-xl bg-white/20 border-t border-x border-white/30 backdrop-blur-md" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
