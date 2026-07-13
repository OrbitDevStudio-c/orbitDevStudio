import { motion } from 'framer-motion';
import ServiceParticles from './ServiceParticles';

export default function ServicesHero() {
  return (
    <section className="bg-[#0B1220] relative w-full min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <div className="absolute inset-0 opacity-50 mix-blend-screen">
        <ServiceParticles />
      </div>

      {/* Subtle Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M 100 200 L 300 150 L 500 300 L 800 100" 
          stroke="rgba(255,255,255,0.1)" 
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
          className="flex flex-col text-left text-white max-w-xl"
        >
          <div className="inline-flex items-center self-start px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">Services</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-6 text-white">
            End-to-End Digital Services <br className="hidden sm:block" /> Engineered for Growth
          </h1>

          <p className="text-base sm:text-[15px] text-[#C7D2E4] leading-relaxed font-light mb-12 max-w-lg">
            From custom web and mobile applications to AI integration, cloud
            infrastructure, and performance marketing — OrbitDevStudio delivers full-lifecycle
            digital solutions built with senior engineering talent, rigorous quality standards,
            and a relentless focus on measurable business outcomes.
          </p>

          <div className="w-full h-px bg-white/10 mb-8" />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-1">10+</h3>
              <p className="text-[9px] font-bold tracking-wider text-white/50 uppercase">Products Shipped</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">99.9%</h3>
              <p className="text-[9px] font-bold tracking-wider text-white/50 uppercase">Uptime Guarantee</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">15+</h3>
              <p className="text-[9px] font-bold tracking-wider text-white/50 uppercase">Technologies Mastered</p>
            </div>
          </div>
        </motion.div>

        {/* Right UI Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end"
        >
          {/* Main glowing behind graphic */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent rounded-full blur-[150px] opacity-[0.1]" />
          
          <div className="relative w-full max-w-[500px] h-[320px]">
            {/* The Main Browser/Dashboard Window */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[90%] md:w-[450px] h-[280px] bg-[#E8F0FE] rounded-xl shadow-2xl border border-white/20 overflow-hidden z-10 flex flex-col">
              {/* Toolbar */}
              <div className="h-8 w-full bg-[#1E2A4A] flex items-center px-3 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F36B6B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F6B73C]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#52C854]" />
              </div>
              {/* Content area */}
              <div className="flex-1 p-5 flex flex-col gap-4">
                <div className="w-3/4 h-2 rounded-full bg-accent/20" />
                <div className="w-1/2 h-2 rounded-full bg-accent/20" />
                <div className="w-full h-px bg-slate-200 my-2" />
                
                <div className="flex gap-4">
                  {/* Card 1 */}
                  <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-100 p-3 flex flex-col gap-2">
                    <div className="w-1/2 h-1.5 rounded-full bg-[#1E2A4A]/20" />
                    <div className="w-full h-1.5 rounded-full bg-slate-100" />
                    <div className="w-3/4 h-1.5 rounded-full bg-slate-100" />
                    <div className="mt-auto w-12 h-3 rounded bg-accent opacity-80" />
                  </div>
                  {/* Card 2 */}
                  <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-100 p-3 flex flex-col gap-2">
                    <div className="w-1/2 h-1.5 rounded-full bg-[#52C854]/40" />
                    <div className="w-full h-1.5 rounded-full bg-slate-100" />
                    <div className="w-2/3 h-1.5 rounded-full bg-slate-100" />
                    <div className="mt-auto w-12 h-3 rounded bg-[#52C854] opacity-80" />
                  </div>
                </div>
                
                <div className="mt-auto flex items-center gap-2">
                  <div className="w-16 h-3 rounded bg-[#52C854]/40" />
                  <div className="w-8 h-3 rounded bg-slate-200" />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            {/* Top Left Floating Pill */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-12 z-20 bg-[#1E2A4A] border border-white/20 p-2.5 rounded-xl shadow-xl flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full border-2 border-accent flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-accent" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-12 h-1 rounded-full bg-white/40" />
                <div className="w-8 h-1 rounded-full bg-white/20" />
              </div>
            </motion.div>

            {/* Top Right Floating Pill */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-0 top-20 z-20 bg-[#132A1C] border border-[#52C854]/30 p-2 rounded-xl shadow-xl flex items-center gap-2"
            >
              <div className="flex flex-col gap-1 w-10">
                <div className="w-full h-1.5 rounded-full bg-[#52C854]/40" />
                <div className="w-2/3 h-1 rounded-full bg-[#52C854]/20" />
              </div>
            </motion.div>

            {/* Bottom Right Floating Pill */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-4 bottom-12 z-20 bg-[#1A1A3A] border border-accent/30 p-2.5 rounded-xl shadow-xl flex items-center gap-2"
            >
              <div className="w-4 h-3 rounded bg-accent/50" />
              <div className="flex flex-col gap-1 w-10">
                <div className="w-full h-1 rounded-full bg-white/40" />
                <div className="w-full h-1 rounded-full bg-white/20" />
              </div>
            </motion.div>

            {/* Mouse Cursor */}
            <motion.div 
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-32 bottom-24 z-30 text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
                <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="white" stroke="white" />
                <path d="m13 13 6 6" stroke="white" />
              </svg>
            </motion.div>

            {/* Decorative Stars */}
            <div className="absolute -left-4 bottom-32 text-[#F6B73C]">✦</div>
            <div className="absolute left-8 top-1/3 text-white/30 text-sm">✦</div>
            <div className="absolute right-12 -bottom-4 text-white/40 text-xl">✦</div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
