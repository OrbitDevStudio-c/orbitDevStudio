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
    <section className="bg-[#0B1220] relative w-full min-h-[80vh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <ServiceParticles />
      
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
          className="flex flex-col items-center text-white max-w-3xl"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">Join Our Orbit</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.1] mb-8">
            Build the future <br className="hidden sm:block" /> with us.
          </h1>

          <p className="text-base sm:text-[17px] text-[#C7D2E4] leading-relaxed font-light mb-12 max-w-xl mx-auto">
            We are always on the lookout for passionate engineers, creative designers, and visionary thinkers who want to push the boundaries of digital product development.
          </p>

          <button
            onClick={scrollToOpenings}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-bold text-[14px] px-8 py-4 transition-all hover:bg-blue-600 shadow-[0_4px_15px_rgba(79,140,255,0.3)] hover:shadow-[0_6px_25px_rgba(79,140,255,0.5)] hover:-translate-y-0.5"
          >
            View Open Positions
            <ArrowDown size={18} className="animate-bounce mt-1" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
