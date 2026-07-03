import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "1. Discovery & Strategy",
    desc: "We deep-dive into your business goals, user needs, and technical constraints to build a foolproof roadmap.",
    icon: <Search size={20} className="text-[#1C3E96]" />,
    // For absolute positioning over the SVG
    x: 20, // percentage
    y: 80, // pixels in the viewBox
    textTop: true, // true means text goes below the node (node is higher up)
  },
  {
    id: 2,
    title: "2. Design & Prototyping",
    desc: "Our designers translate strategy into wireframes, UI design, and interactive prototypes for early validation.",
    icon: <PenTool size={20} className="text-[#1C3E96]" />,
    x: 40,
    y: 180,
    textTop: false,
  },
  {
    id: 3,
    title: "3. Agile Engineering",
    desc: "Experienced engineers build your product in iterative two-week sprints with daily deployments.",
    icon: <Code2 size={20} className="text-[#1C3E96]" />,
    x: 60,
    y: 80,
    textTop: true,
  },
  {
    id: 4,
    title: "4. Launch & Continuous Growth",
    desc: "We deploy to production with zero-downtime releases, then monitor, maintain, and iterate based on data.",
    icon: <Rocket size={20} className="text-[#1C3E96]" />,
    x: 80,
    y: 180,
    textTop: false,
  }
];

export default function ServicesProcess() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 w-full relative z-10 overflow-hidden">
      
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-px bg-[#244CB3]" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b4b]">
            How We Take Your Idea to Production
          </h2>
          <div className="w-12 h-px bg-[#244CB3]" />
        </div>
        
        <p className="text-slate-500 text-[14px] leading-relaxed max-w-2xl mx-auto">
          Great digital products don't happen by accident — they follow a deliberate, disciplined process. Our four-phase delivery model is designed to minimize risk, maximize alignment with your goals, and ship production-ready software on time and on budget.
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative hidden md:block" style={{ height: '350px' }}>
        {/* SVG Wave Line */}
        <div className="absolute inset-0 z-0">
          <svg width="100%" height="250" viewBox="0 0 1200 250" preserveAspectRatio="none">
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M -100,130 C 60,130 160,80 240,80 S 360,180 480,180 S 600,80 720,80 S 840,180 960,180 S 1080,130 1300,130" 
              fill="none" 
              stroke="#2E5BE5" 
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Nodes */}
        {steps.map((step, index) => (
          <div key={step.id} className="absolute z-10 flex flex-col items-center w-64 -translate-x-1/2" style={{ left: `${step.x}%`, top: step.textTop ? '80px' : '0px' }}>
            
            {/* The Text Block (Top or Bottom depending on the wave) */}
            <motion.div 
              initial={{ opacity: 0, y: step.textTop ? 20 : -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
              className={`text-center ${step.textTop ? 'mt-[50px]' : 'mb-[15px]'}`}
              style={{ order: step.textTop ? 2 : 0 }}
            >
              <h3 className="text-[15px] font-bold text-[#1a2b4b] mb-2">{step.title}</h3>
              <p className="text-[12px] text-slate-500 leading-relaxed px-4">{step.desc}</p>
            </motion.div>

            {/* Dotted connecting line */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 border-l-2 border-dotted border-slate-300 -z-10"
              style={{ 
                height: '40px', 
                top: step.textTop ? '80px' : '150px' 
              }}
            />

            {/* The Circle Node */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: index * 0.2 }}
              className="w-16 h-16 rounded-full bg-white border-[3px] border-[#2E5BE5] shadow-[0_8px_24px_rgba(46,91,229,0.2)] flex items-center justify-center relative bg-clip-padding"
              style={{ order: 1, marginTop: step.textTop ? '-100px' : '150px' }}
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                {step.icon}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Mobile view fallback (vertical list) */}
      <div className="md:hidden flex flex-col gap-10 mt-12 relative">
        <div className="absolute left-[31px] top-4 bottom-4 w-1 bg-[#2E5BE5]/20 rounded-full" />
        
        {steps.map((step) => (
          <div key={step.id} className="flex gap-6 relative z-10">
            <div className="w-16 h-16 shrink-0 rounded-full bg-white border-[3px] border-[#2E5BE5] shadow-md flex items-center justify-center">
              {step.icon}
            </div>
            <div className="pt-2">
              <h3 className="text-[16px] font-bold text-[#1a2b4b] mb-2">{step.title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
