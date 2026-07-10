import { motion } from 'framer-motion';
import { HeartPulse, Building2, Store, Plane, Coffee, Briefcase, DraftingCompass } from 'lucide-react';
import ServiceParticles from './ServiceParticles';

export default function IndustriesHero() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#152A5A] to-[#132E7B] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <ServiceParticles />
      
      {/* Decorative radial gradients for the galaxy feel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#244CB3]/30 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1B3675]/40 via-transparent to-transparent" />
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
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">Industries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-6">
            Empowering Industries <br className="hidden sm:block" /> with Custom Solutions
          </h1>

          <p className="text-base sm:text-[15px] text-white/70 leading-relaxed font-light mb-12 max-w-lg">
            From healthcare portals to interactive design portfolios and robust e-commerce platforms — OrbitDevStudio engineers highly specialized digital experiences tailored to the unique regulatory, operational, and aesthetic demands of your sector.
          </p>

          <div className="w-full h-px bg-white/10 mb-8" />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-1">7+</h3>
              <p className="text-[9px] font-bold tracking-wider text-white/50 uppercase">Core Industries</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">100%</h3>
              <p className="text-[9px] font-bold tracking-wider text-white/50 uppercase">Customization</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Scale</h3>
              <p className="text-[9px] font-bold tracking-wider text-white/50 uppercase">Built into DNA</p>
            </div>
          </div>
        </motion.div>

        {/* Right UI Illustration: Floating Industry Network */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end"
        >
          {/* Main glowing behind graphic */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#2E5BE5] rounded-full blur-[80px] opacity-30" />
          
          <div className="relative w-full max-w-[450px] h-[400px] flex items-center justify-center">
            
            {/* Center Core Node */}
            <div className="absolute z-10 w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(46,91,229,0.5)]">
               <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite] overflow-hidden">
                 <img src="/companylogo.webp" alt="Core" width={64} height={64} className="w-full h-full object-cover" loading="lazy" decoding="async" />
               </div>
            </div>

            {/* Orbit Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 450 400">
               <ellipse cx="225" cy="200" rx="140" ry="140" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
               <ellipse cx="225" cy="200" rx="200" ry="200" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Floating Industry Nodes */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-20 origin-center"
            >
              {/* Inner Orbit Nodes (r=140) */}
              <div className="absolute left-1/2 top-1/2 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(0px, -140px)' }}>
                <HeartPulse size={24} className="text-[#F36B6B]" />
              </div>
              
              <div className="absolute left-1/2 top-1/2 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(121.24px, 70px) rotate(120deg)' }}>
                <Store size={24} className="text-[#52C854]" />
              </div>

              <div className="absolute left-1/2 top-1/2 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(-121.24px, 70px) rotate(240deg)' }}>
                <Building2 size={24} className="text-[#F6B73C]" />
              </div>
            </motion.div>

            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-20 origin-center"
            >
              {/* Outer Orbit Nodes (r=200) */}
              <div className="absolute left-1/2 top-1/2 w-12 h-12 rounded-xl bg-[#1B3675]/80 backdrop-blur-sm border border-[#4F8CFF]/30 flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(200px, 0px) rotate(90deg)' }}>
                <Plane size={20} className="text-[#4F8CFF]" />
              </div>

              <div className="absolute left-1/2 top-1/2 w-12 h-12 rounded-xl bg-[#132A1C]/80 backdrop-blur-sm border border-[#52C854]/30 flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(0px, 200px) rotate(180deg)' }}>
                <Coffee size={20} className="text-[#52C854]" />
              </div>

              <div className="absolute left-1/2 top-1/2 w-12 h-12 rounded-xl bg-[#2A153A]/80 backdrop-blur-sm border border-[#B08CFF]/30 flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(-200px, 0px) rotate(270deg)' }}>
                <DraftingCompass size={20} className="text-[#B08CFF]" />
              </div>

              <div className="absolute left-1/2 top-1/2 w-12 h-12 rounded-xl bg-[#3A2415]/80 backdrop-blur-sm border border-[#F6B73C]/30 flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(0px, -200px) rotate(0deg)' }}>
                <Briefcase size={20} className="text-[#F6B73C]" />
              </div>
            </motion.div>

            {/* Decorative Stars */}
            <div className="absolute -left-4 bottom-32 text-[#F6B73C] animate-pulse">✦</div>
            <div className="absolute left-8 top-1/4 text-white/30 text-sm">✦</div>
            <div className="absolute right-12 -bottom-4 text-white/40 text-xl animate-pulse">✦</div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
