import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Code-split the heavy Three.js animation
const ParticlesContainer = lazy(() => import('../three/ParticlesContainer'));

export default function Hero() {
  return (
    <section className="section-dark relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-navy">
      {/* High-Performance R3F Particle System */}
      <Suspense fallback={<div className="absolute inset-0 bg-navy z-0" />}>
        <ParticlesContainer />
      </Suspense>

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px]" />
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link 
            to="/contact" 
            className="px-7 py-3.5 bg-white text-navy font-semibold rounded-xl flex items-center gap-2.5 transition-all hover:bg-gray-100 hover:shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:-translate-y-px active:translate-y-0 group text-sm"
          >
            Start a Project
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link 
            to="/portfolio" 
            className="px-7 py-3.5 text-white font-medium rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/[0.04] transition-all text-sm"
          >
            View Portfolio
          </Link>
        </motion.div>

        {/* Trust Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-white/[0.06] w-full max-w-lg mx-auto"
        >
          <div className="flex -space-x-2.5">
            {[44, 32, 68, 75].map((seed) => (
              <div key={seed} className="w-8 h-8 rounded-full border-2 border-navy overflow-hidden bg-surface">
                <img 
                  src={`https://randomuser.me/api/portraits/${seed % 2 === 0 ? 'women' : 'men'}/${seed}.jpg`} 
                  alt="Client" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex text-amber-400 mb-0.5">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
            <span className="text-[11px] text-gray-400 font-medium">Trusted by 50+ global teams</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
