import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GalaxyParticles from './GalaxyParticles';

export default function Hero() {
  return (
    <section className="section-dark bg-navy-deep relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 2D Milky Way Galaxy Animation */}
      <GalaxyParticles />

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/[0.05] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondaryAccent/[0.04] rounded-full blur-[150px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[conic-gradient(from_90deg_at_50%_0%,rgba(11,18,32,1)_0%,rgba(79,140,255,0.03)_50%,rgba(11,18,32,1)_100%)] opacity-30 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-xs font-medium text-gray-300 tracking-wide">Premium Software Studio</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white tracking-tight leading-[1.1] mb-6"
        >
          We build software{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient">that ships.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10 font-light leading-relaxed"
        >
          From product strategy to production deployment — OrbitDevStudio engineers performant, scalable platforms for teams that move fast.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full"
        >
          <Link 
            to="/hire" 
            className="w-full sm:w-auto justify-center px-7 py-3.5 bg-white text-navy font-semibold rounded-xl flex items-center gap-2.5 transition-all hover:bg-gray-100 hover:shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:-translate-y-px active:translate-y-0 group text-sm"
          >
            Start a Project
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link 
            to="/portfolio" 
            className="w-full sm:w-auto text-center px-7 py-3.5 text-white font-medium rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/[0.04] transition-all text-sm"
          >
            View Portfolio
          </Link>
        </motion.div>

        {/* Code Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center pt-8 border-t border-white/[0.06] w-full max-w-lg mx-auto"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-xs sm:text-sm">
            <span className="text-gray-500">{'>'}</span>
            <span>
              <span className="text-accent">innovate</span>
              <span className="text-gray-500">.</span>
              <span className="text-emerald-400">elevate</span>
              <span className="text-gray-500">()</span>
            </span>
            <span className="w-[2px] h-4 bg-accent animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
