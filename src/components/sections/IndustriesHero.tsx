import { motion } from 'framer-motion';
import { HeartPulse, Building2, Store, Plane, Coffee, Briefcase, DraftingCompass } from 'lucide-react';
import ServiceParticles from './ServiceParticles';

export default function IndustriesHero() {
  return (
    <section className="bg-navy-deep relative w-full min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <div className="absolute inset-0 opacity-50 light:opacity-100 light:mix-blend-normal mix-blend-screen">
        <ServiceParticles />
      </div>

      {/* Subtle Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 120 180 L 320 240 L 480 120 L 780 220"
          className="stroke-white/10 light:stroke-[#1677ff]/40"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>

      {/* Decorative radial gradients for the galaxy feel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/[0.08] via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#7C5CFF]/[0.15] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col text-left text-white light:text-slate-900 max-w-xl"
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
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 light:text-slate-900/90 uppercase">Industries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-6 text-white light:text-slate-900">
            Empowering Industries <br className="hidden sm:block" /> with <span className="text-gradient">Custom Solutions</span>
          </h1>

          <p className="text-base sm:text-[15px] text-[#C7D2E4] leading-relaxed font-light mb-12 max-w-lg">
            From healthcare portals to interactive design portfolios and robust e-commerce platforms — OrbitDevStudio engineers highly specialized digital experiences tailored to the unique regulatory, operational, and aesthetic demands of your sector.
          </p>

          <div className="w-full h-px bg-white/10 light:bg-slate-200 mb-8" />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-4">
            <div>
              <h3 className="svc-kpi-number text-2xl font-bold mb-1.5">7+</h3>
              <p className="text-[9px] font-bold tracking-wider text-white/50 light:text-slate-600 uppercase">Core Industries</p>
            </div>
            <div>
              <h3 className="svc-kpi-number text-2xl font-bold mb-1.5">100%</h3>
              <p className="text-[9px] font-bold tracking-wider text-white/50 light:text-slate-600 uppercase">Customization</p>
            </div>
            <div>
              <h3 className="svc-kpi-number text-2xl font-bold mb-1.5">Scale</h3>
              <p className="text-[9px] font-bold tracking-wider text-white/50 light:text-slate-600 uppercase">Built into DNA</p>
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
          {/* Main glowing behind graphic — controlled multicolor accent (amber -> blue -> purple -> cyan), kept soft/premium via heavy blur rather than a hard rainbow ring */}
          <div
            className="absolute right-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.16] light:opacity-[0.12]"
            style={{ background: 'conic-gradient(from 180deg, #f6b73c, #1677ff, #6c2bff, #00d9ff, #f6b73c)' }}
          />
          
          <div className="relative w-full max-w-[450px] h-[400px] flex items-center justify-center">
            
            {/* Center Core Node */}
             <div className="absolute z-10 w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(22,119,255,0.15)]">
               <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite] overflow-hidden">
                 <img src="/companylogo.webp" alt="Core" width={64} height={64} className="w-full h-full object-cover" loading="lazy" decoding="async" />
               </div>
            </div>

            {/* Orbit Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 450 400">
               <ellipse cx="225" cy="200" rx="140" ry="140" fill="none" className="stroke-white/[0.05] light:stroke-[#1677ff]/[0.1]" strokeWidth="1" strokeDasharray="4 4" />
               <ellipse cx="225" cy="200" rx="200" ry="200" fill="none" className="stroke-white/[0.03] light:stroke-[#1677ff]/[0.07]" strokeWidth="1" strokeDasharray="4 4" />
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
                <Building2 size={24} className="text-[#F6B73C] light:text-[#B45309]" />
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-20 origin-center"
            >
              {/* Outer Orbit Nodes (r=200) */}
              <div className="absolute left-1/2 top-1/2 w-12 h-12 rounded-xl bg-[#1E2A4A]/80 light:bg-[rgba(22,119,255,0.07)] backdrop-blur-sm border border-accent/30 light:border-[rgba(22,119,255,0.28)] flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(200px, 0px) rotate(90deg)' }}>
                <Plane size={20} className="text-accent" />
              </div>

              <div className="absolute left-1/2 top-1/2 w-12 h-12 rounded-xl bg-[#132A1C]/80 light:bg-[rgba(82,200,84,0.1)] backdrop-blur-sm border border-[#52C854]/30 light:border-[rgba(82,200,84,0.35)] flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(0px, 200px) rotate(180deg)' }}>
                <Coffee size={20} className="text-[#52C854]" />
              </div>

              <div className="absolute left-1/2 top-1/2 w-12 h-12 rounded-xl bg-[#2A153A]/80 light:bg-[rgba(108,43,255,0.08)] backdrop-blur-sm border border-[#B08CFF]/30 light:border-[rgba(108,43,255,0.3)] flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(-200px, 0px) rotate(270deg)' }}>
                <DraftingCompass size={20} className="text-[#B08CFF] light:text-[#6c2bff]" />
              </div>

              <div className="absolute left-1/2 top-1/2 w-12 h-12 rounded-xl bg-[#3A2415]/80 light:bg-[rgba(246,183,60,0.12)] backdrop-blur-sm border border-[#F6B73C]/30 light:border-[rgba(246,183,60,0.4)] flex items-center justify-center shadow-lg" style={{ transform: 'translate(-50%, -50%) translate(0px, -200px) rotate(0deg)' }}>
                <Briefcase size={20} className="text-[#F6B73C] light:text-[#B45309]" />
              </div>
            </motion.div>

            {/* Decorative Stars */}
            <div className="absolute -left-4 bottom-32 text-[#F6B73C] light:text-[#B45309] animate-pulse">✦</div>
            <div className="absolute left-8 top-1/4 text-white/30 light:text-slate-900/30 text-sm">✦</div>
            <div className="absolute right-12 -bottom-4 text-white/40 light:text-slate-900/40 text-xl animate-pulse">✦</div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
