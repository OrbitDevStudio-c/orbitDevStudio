import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const storyStages = [
  {
    id: 1,
    title: "Research",
    desc: "Deep-dive into industry compliance, market competitors, and user expectations.",
  },
  {
    id: 2,
    title: "Planning",
    desc: "Mapping user journeys and defining technical constraints tailored to the sector.",
  },
  {
    id: 3,
    title: "Architecture",
    desc: "Designing secure, scalable infrastructure to handle specific data and traffic loads.",
  },
  {
    id: 4,
    title: "Development",
    desc: "Agile engineering with rigorous automated testing and daily continuous integration.",
  },
  {
    id: 5,
    title: "Launch",
    desc: "Zero-downtime deployment with active monitoring and rollback safeguards.",
  },
  {
    id: 6,
    title: "Growth",
    desc: "Data-driven iteration and scaling based on real-world user analytics.",
  }
];

export default function IndustriesStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 w-full bg-[#050B14] text-white relative z-10 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#2E5BE5] rounded-[100%] blur-[120px] opacity-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="mb-24 md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Why We Understand Your Industry
          </h2>
          <p className="text-white/60 text-[16px] leading-relaxed">
            Our engineering methodology isn't generic. It's a highly refined, stage-by-stage process designed to eliminate risk and ensure your software meets the strict demands of your market.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative pt-12 pb-24">
          
          {/* Base Line */}
          <div className="absolute top-[48px] left-0 right-0 h-px bg-white/10" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute top-[48px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#2E5BE5] to-[#4F8CFF] origin-left shadow-[0_0_15px_rgba(46,91,229,0.5)]"
            style={{ scaleX }}
          />

          <div className="grid grid-cols-6 gap-6">
            {storyStages.map((stage, index) => {
              // Calculate individual opacity based on global scroll
              const opacity = useTransform(
                scrollYProgress,
                [index * 0.15, (index + 1) * 0.15],
                [0.3, 1]
              );
              
              const y = useTransform(
                scrollYProgress,
                [index * 0.15, (index + 1) * 0.15],
                [20, 0]
              );

              return (
                <motion.div key={stage.id} style={{ opacity, y }} className="relative pt-12">
                  
                  {/* Node */}
                  <div className="absolute top-[-54px] left-0 w-3 h-3 rounded-full bg-[#050B14] border-2 border-[#4F8CFF] z-10" />
                  <div className="absolute top-[-58px] left-[-4px] w-5 h-5 rounded-full bg-[#4F8CFF] blur-[8px] opacity-50" />
                  
                  {/* Content */}
                  <div className="text-[10px] font-bold tracking-widest text-[#4F8CFF] uppercase mb-3">
                    0{stage.id}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                    {stage.title}
                  </h3>
                  <p className="text-[13px] text-white/50 leading-relaxed pr-4">
                    {stage.desc}
                  </p>
                  
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden relative pl-6">
          {/* Base Line */}
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-white/10" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute top-0 bottom-0 left-[7px] w-[2px] bg-gradient-to-b from-[#2E5BE5] to-[#4F8CFF] origin-top shadow-[0_0_15px_rgba(46,91,229,0.5)]"
            style={{ scaleY: scaleX }}
          />

          <div className="flex flex-col gap-12">
            {storyStages.map((stage, index) => {
              const opacity = useTransform(
                scrollYProgress,
                [index * 0.15, (index + 1) * 0.15],
                [0.3, 1]
              );
              
              const x = useTransform(
                scrollYProgress,
                [index * 0.15, (index + 1) * 0.15],
                [20, 0]
              );

              return (
                <motion.div key={stage.id} style={{ opacity, x }} className="relative pl-8">
                  {/* Node */}
                  <div className="absolute top-[6px] left-[-11px] w-3 h-3 rounded-full bg-[#050B14] border-2 border-[#4F8CFF] z-10" />
                  
                  {/* Content */}
                  <div className="text-[10px] font-bold tracking-widest text-[#4F8CFF] uppercase mb-2">
                    0{stage.id}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {stage.title}
                  </h3>
                  <p className="text-[14px] text-white/50 leading-relaxed">
                    {stage.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
