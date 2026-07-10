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
    <section className="relative w-full min-h-[80vh] bg-gradient-to-br from-[#152A5A] to-[#132E7B] flex items-center pt-24 pb-20 overflow-hidden">
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
          className="flex flex-col items-center text-white max-w-3xl"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">Join Our Orbit</span>
          </div>

          <h1 className="text-display text-white mb-8">
            Build the future <br className="hidden sm:block" /> with us.
          </h1>

          <p className="text-base sm:text-[17px] text-white/70 leading-relaxed font-normal mb-12 max-w-xl mx-auto">
            We are always on the lookout for passionate engineers, creative designers, and visionary thinkers who want to push the boundaries of digital product development.
          </p>

          <button
            onClick={scrollToOpenings}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-8 py-4 font-semibold text-white transition-all hover:bg-white/20 hover:scale-105 shadow-lg backdrop-blur-md"
          >
            View Open Positions
            <ArrowDown size={18} className="animate-bounce mt-1" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
