import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import GalaxyParticles from './GalaxyParticles';

const TRUST_POINTS = [
  'Free consultation & estimate',
  'NDA available on request',
  'React, Next.js & Node.js',
  'Post-launch support',
];

export default function Hero() {
  return (
    <section className="section-dark bg-navy-deep relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 2D Milky Way Galaxy Animation */}
      <GalaxyParticles />

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/[0.05] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondaryAccent/[0.04] rounded-full blur-[150px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[conic-gradient(from_90deg_at_50%_0%,rgba(11,18,32,1)_0%,rgba(22,119,255,0.03)_50%,rgba(11,18,32,1)_100%)] light:bg-[conic-gradient(from_90deg_at_50%_0%,rgba(255,255,255,1)_0%,rgba(22,119,255,0.05)_50%,rgba(255,255,255,1)_100%)] opacity-30 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-xs font-medium text-gray-300 light:text-slate-600 tracking-wide">Design · Develop · Launch · Grow</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white light:text-slate-900 tracking-tight leading-[1.1] mb-6"
        >
          Digital experiences{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient">built for growth.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 14 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-gray-400 light:text-slate-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Orbit Dev Studios designs and builds fast, conversion-focused websites, web applications and e-commerce platforms for businesses that want their website to win customers — not just look good.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full"
        >
          <Link
            to="/hire"
            data-track="start_project"
            data-track-location="home-hero"
            className="btn-primary w-full sm:w-auto justify-center px-7 py-3.5 rounded-2xl flex items-center gap-2.5 transition-all hover:-translate-y-px active:translate-y-0 group text-sm"
          >
            Start Your Project
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/portfolio"
            data-track="view_work"
            data-track-location="home-hero"
            className="w-full sm:w-auto text-center px-7 py-3.5 text-white light:text-slate-900 font-medium rounded-xl border border-white/15 light:border-slate-300 hover:border-white/30 hover:bg-white/[0.04] transition-all text-sm"
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-x-6 gap-y-3 pt-8 border-t border-white/[0.06] light:border-slate-200 w-full max-w-3xl mx-auto text-left md:text-center"
        >
          {TRUST_POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2 text-[13px] text-gray-400 light:text-slate-600">
              <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
              {point}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
