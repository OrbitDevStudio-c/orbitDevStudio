import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ServiceParticles from './ServiceParticles';

export default function CareersHero() {
  const scrollToOpenings = () => {
    const element = document.getElementById('open-positions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-navy-deep relative w-full min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <div className="absolute inset-0 opacity-50 light:opacity-100 light:mix-blend-normal mix-blend-screen">
        <ServiceParticles />
      </div>

      {/* Subtle Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 150 220 L 380 160 L 600 260 L 900 180"
          className="stroke-white/10 light:stroke-[#1677ff]/40"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>

      {/* Decorative radial gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/[0.08] via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#7C5CFF]/[0.15] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-white light:text-slate-900 max-w-3xl"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md mb-8"
            style={{
              background: 'var(--rt-pill-bg-2)',
              border: '1px solid rgba(100,116,139,0.28)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--rt-cyan)', boxShadow: '0 0 6px var(--rt-cyan)', animation: 'dot-glow 2.4s ease-in-out infinite' }}
            />
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 light:text-slate-900/90 uppercase">Join Our Orbit</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.1] mb-8">
            Build the <span className="text-gradient">future</span> <br className="hidden sm:block" /> with us.
          </h1>

          <p className="text-base sm:text-[17px] text-[#C7D2E4] leading-relaxed font-light mb-12 max-w-xl mx-auto">
            We are always on the lookout for passionate engineers, creative designers, and visionary thinkers who want to push the boundaries of digital product development.
          </p>

          <button
            onClick={scrollToOpenings}
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-full font-bold text-[14px] px-8 py-4"
          >
            View Open Positions
            <ArrowDown size={18} className="animate-bounce mt-1" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
