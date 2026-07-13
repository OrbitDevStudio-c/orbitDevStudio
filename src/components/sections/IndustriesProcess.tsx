import { useRef } from 'react';
import { Search, Compass, ShieldCheck, Rocket } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "Market & Compliance Discovery",
    desc: "We analyze your specific industry landscape, including regulatory requirements, competitor offerings, and user expectations.",
    icon: <Search size={24} className="text-[#1E2A4A]" />,
    x: 20,
    y: 80,
    textTop: true,
  },
  {
    id: 2,
    title: "Industry-Specific Design",
    desc: "Our UX team architects flows tailored to your audience—whether it's an accessible patient portal or a visually immersive design portfolio.",
    icon: <Compass size={24} className="text-[#1E2A4A]" />,
    x: 40,
    y: 220,
    textTop: false,
  },
  {
    id: 3,
    title: "Tailored Engineering",
    desc: "We build custom infrastructure that supports your unique business logic, integrating with legacy systems and specialized third-party APIs.",
    icon: <ShieldCheck size={24} className="text-[#1E2A4A]" />,
    x: 60,
    y: 80,
    textTop: true,
  },
  {
    id: 4,
    title: "Launch & Iterate",
    desc: "We deploy with zero-downtime and establish analytics specific to your industry's KPIs to ensure continuous, data-driven growth.",
    icon: <Rocket size={24} className="text-[#1E2A4A]" />,
    x: 80,
    y: 220,
    textTop: false,
  }
];

export default function IndustriesProcess() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="bg-[#101A2D] py-32 px-6 md:px-12 lg:px-24 w-full relative z-10 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#4F8CFF]/[0.05] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0A266A]/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="text-center max-w-3xl mx-auto mb-32 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
          An Adaptable Engineering Process
        </h2>
        <p className="text-[#C7D2E4] text-[16px] leading-relaxed max-w-2xl mx-auto">
          We don't believe in one-size-fits-all. Our four-phase delivery model is completely customized to meet the strict demands of your sector.
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative hidden md:block" style={{ height: '400px' }}>
        {/* SVG Wave Line animated by scroll */}
        <div className="absolute inset-0 z-0">
          <svg width="100%" height="300" viewBox="0 0 1200 300" preserveAspectRatio="none">
            {/* Background faint path */}
            <path 
              d="M -100,150 C 60,150 160,80 240,80 S 360,220 480,220 S 600,80 720,80 S 840,220 960,220 S 1080,150 1300,150" 
              fill="none" 
              stroke="url(#timeline-gradient)" 
              strokeWidth="4"
              strokeOpacity="0.1"
              strokeLinecap="round"
            />
            {/* Animated foreground path */}
            <motion.path 
              style={{ pathLength }}
              d="M -100,150 C 60,150 160,80 240,80 S 360,220 480,220 S 600,80 720,80 S 840,220 960,220 S 1080,150 1300,150" 
              fill="none" 
              stroke="url(#timeline-gradient)" 
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F8CFF" />
                <stop offset="100%" stopColor="#7C5CFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Nodes */}
        {steps.map((step, index) => (
          <div key={step.id} className="absolute z-10 w-72 -translate-x-1/2 group h-[300px]" style={{ left: `${step.x}%`, top: 0 }}>
            
            {/* Dotted connecting line */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 border-l-2 border-dashed border-white/20 -z-10 transition-colors duration-300 group-hover:border-[#4F8CFF]/50"
              style={{ 
                height: '40px', 
                top: step.textTop ? `${step.y - 40}px` : `${step.y}px` 
              }}
            />

            {/* The Text Block */}
            <motion.div 
              initial={{ opacity: 0, y: step.textTop ? 20 : -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`absolute left-0 right-0 text-center transition-transform duration-300 group-hover:-translate-y-1`}
              style={{ 
                top: step.textTop ? 'auto' : `${step.y + 55}px`,
                bottom: step.textTop ? `${300 - step.y + 55}px` : 'auto'
              }}
            >
              <div className="text-[40px] font-black text-white/5 mb-1 tracking-tighter transition-colors duration-300 group-hover:text-white/10">0{step.id}</div>
              <h3 className="text-[20px] font-bold text-white mb-3 group-hover:text-[#4F8CFF] transition-colors duration-300">{step.title}</h3>
              <p className="text-[14px] text-[#94A3B8] leading-relaxed px-4">{step.desc}</p>
            </motion.div>

            {/* The Circle Node with floating animation */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 0.5 }}
              className="absolute left-1/2 -translate-x-1/2 w-20 h-20 -translate-y-1/2 rounded-full bg-[#0B1220] border-4 border-[#101A2D] group-hover:border-[#4F8CFF]/30 group-hover:shadow-[0_0_30px_rgba(79,140,255,0.4)] transition-all duration-300 flex items-center justify-center bg-clip-padding cursor-default shadow-lg"
              style={{ top: `${step.y}px` }}
            >
              <div className="w-14 h-14 rounded-full bg-[#4F8CFF]/10 group-hover:bg-[#4F8CFF]/20 flex items-center justify-center transition-colors duration-300 border border-white/5">
                <div className="text-[#4F8CFF]">
                  {step.icon}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Mobile view fallback (vertical list) */}
      <div className="md:hidden flex flex-col gap-12 mt-12 relative">
        <motion.div 
          style={{ scaleY: scrollYProgress, originY: 0 }}
          className="absolute left-[39px] top-4 bottom-4 w-1 bg-gradient-to-b from-[#4F8CFF] to-[#7C5CFF] rounded-full z-0" 
        />
        <div className="absolute left-[39px] top-4 bottom-4 w-1 bg-white/10 rounded-full z-0" />
        
        {steps.map((step) => (
          <div key={step.id} className="flex gap-6 relative z-10 group">
            <div className="w-20 h-20 shrink-0 rounded-full bg-[#0B1220] border-4 border-[#101A2D] group-hover:border-[#4F8CFF]/30 shadow-lg flex items-center justify-center transition-colors duration-300 relative">
              <div className="text-[28px] font-black text-white/5 absolute -top-4 -left-4">0{step.id}</div>
              <div className="w-12 h-12 rounded-full bg-[#4F8CFF]/10 border border-white/5 flex items-center justify-center">
                <div className="text-[#4F8CFF]">{step.icon}</div>
              </div>
            </div>
            <div className="pt-2 bg-white/[0.03] border border-white/5 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex-1">
              <h3 className="text-[18px] font-bold text-white mb-2">{step.title}</h3>
              <p className="text-[14px] text-[#C7D2E4] leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
