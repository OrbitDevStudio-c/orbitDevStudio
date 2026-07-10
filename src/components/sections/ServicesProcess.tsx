import { useRef } from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "Discovery & Strategy",
    desc: "We deep-dive into your business goals, user needs, and technical constraints to build a foolproof roadmap.",
    icon: <Search size={24} className="text-white" />,
    x: 20,
    y: 80,
    textTop: true,
  },
  {
    id: 2,
    title: "Design & Prototyping",
    desc: "Our designers translate strategy into wireframes, modern UI systems, and interactive prototypes for early validation.",
    icon: <PenTool size={24} className="text-white" />,
    x: 40,
    y: 220,
    textTop: false,
  },
  {
    id: 3,
    title: "Agile Engineering",
    desc: "Experienced engineers build your product in iterative sprints with robust automated testing and daily deployments.",
    icon: <Code2 size={24} className="text-white" />,
    x: 60,
    y: 80,
    textTop: true,
  },
  {
    id: 4,
    title: "Launch & Growth",
    desc: "We deploy to production with zero-downtime releases, then continuously monitor, maintain, and scale based on data.",
    icon: <Rocket size={24} className="text-white" />,
    x: 80,
    y: 220,
    textTop: false,
  },
];
export default function ServicesProcess() {
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
    <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 w-full relative z-10 overflow-hidden ">
      
      <div className="text-center max-w-3xl mx-auto mb-32">
        <h2 className="text-3xl md:text-5xl font-bold text-[white] tracking-tight mb-6">
          How We Take Your Idea to Production
        </h2>
        <p className="text-slate-500 text-[16px] leading-relaxed max-w-2xl mx-auto">
          Great digital products don't happen by accident. Our four-phase delivery model is designed to minimize risk, maximize alignment, and ship production-ready software seamlessly.
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
              stroke="#2E5BE5" 
              strokeWidth="4"
              strokeOpacity="0.1"
              strokeLinecap="round"
            />
            {/* Animated foreground path */}
            <motion.path 
              style={{ pathLength }}
              d="M -100,150 C 60,150 160,80 240,80 S 360,220 480,220 S 600,80 720,80 S 840,220 960,220 S 1080,150 1300,150" 
              fill="none" 
              stroke="#2E5BE5" 
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Nodes */}
        {steps.map((step, index) => (
          <div key={step.id} className="absolute z-10 w-72 -translate-x-1/2 group h-[300px]" style={{ left: `${step.x}%`, top: 0 }}>
            
            {/* Dotted connecting line */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 border-l-2 border-dashed border-[#2A4B96] -z-10 transition-colors duration-300 group-hover:border-[#2E5BE5]/30"
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
              <div className="text-3xl font-black text-[#2E5BE5]/20 mb-1 tracking-tighter">0{step.id}</div>
              <h3 className="text-[18px] font-bold text-[#1a2b4b] mb-2">{step.title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed px-2">{step.desc}</p>
            </motion.div>

            {/* The Circle Node with floating animation */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 0.5 }}
              className="absolute left-1/2 -translate-x-1/2 w-20 h-20 -translate-y-1/2 rounded-full bg-[#101F45] border-4 border-[#4F8CFF] group-hover:border-[#6EA8FF] group-hover:shadow-[0_0_30px_rgba(79,140,255,0.35)] transition-all duration-300 flex items-center justify-center"
              style={{ top: `${step.y}px` }}
            >
              <div className="w-14 h-14 rounded-full bg-[#2E5BE5]/5 group-hover:bg-[#2E5BE5]/10 flex items-center justify-center transition-colors duration-300">
                {step.icon}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Mobile view fallback (vertical list) */}
      <div className="md:hidden flex flex-col gap-12 mt-12 relative">
        <motion.div 
          style={{ scaleY: scrollYProgress, originY: 0 }}
          className="absolute left-[39px] top-4 bottom-4 w-1 bg-[#2E5BE5] rounded-full z-0" 
        />
        <div className="absolute left-[39px] top-4 bottom-4 w-1 bg-[#2E5BE5]/10 rounded-full z-0" />
        
    {steps.map((step) => (
  <div key={step.id} className="flex gap-6 relative z-10 group">
    <div className="w-20 h-20 shrink-0 rounded-full bg-white border-4 border-slate-100 group-hover:border-[#2E5BE5] shadow-sm flex items-center justify-center transition-colors duration-300">
 <div className="text-3xl font-black text-[#4F8CFF] mb-1 tracking-tighter">
  0{step.id}
</div>
      {step.icon}
    </div>

    <div className="pt-2">
<h3 className="text-[18px] font-bold text-white mb-2">
  {step.title}
</h3>

    <p className="text-[13px] text-slate-300 leading-relaxed px-2">
  {step.desc}
</p>
    </div>
  </div>
))}
      </div>

    </section>
  );
}
