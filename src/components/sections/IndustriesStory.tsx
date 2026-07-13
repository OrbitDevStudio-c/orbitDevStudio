import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

const storyStages = [
  {
    id: 1,
    title: 'Research',
    desc: 'Deep-dive into industry compliance, market competitors, and user expectations.',
  },
  {
    id: 2,
    title: 'Planning',
    desc: 'Mapping user journeys and defining technical constraints tailored to the sector.',
  },
  {
    id: 3,
    title: 'Architecture',
    desc: 'Designing secure, scalable infrastructure to handle specific data and traffic loads.',
  },
  {
    id: 4,
    title: 'Development',
    desc: 'Agile engineering with rigorous automated testing and daily continuous integration.',
  },
  {
    id: 5,
    title: 'Launch',
    desc: 'Zero-downtime deployment with active monitoring and rollback safeguards.',
  },
  {
    id: 6,
    title: 'Growth',
    desc: 'Data-driven iteration and scaling based on real-world user analytics.',
  },
];

interface TimelineStageProps {
  stage: typeof storyStages[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  isMobile?: boolean;
}

function TimelineStage({ stage, index, scrollYProgress, isMobile = false }: TimelineStageProps) {
  const opacity = useTransform(
    scrollYProgress,
    [index * 0.15, (index + 1) * 0.15],
    [0.3, 1]
  );

  const translateVal = useTransform(scrollYProgress, [index * 0.15, (index + 1) * 0.15], [20, 0]);

  if (isMobile) {
    return (
      <motion.div style={{ opacity, x: translateVal }} className="relative pl-8">
        {/* Node */}
        <div className="absolute top-[6px] left-[-11px] w-3 h-3 rounded-full bg-slate-900 border-2 border-slate-500 z-10" />

        {/* Content */}
        <div className="text-[10px] font-bold tracking-widest text-[#4F8CFF] uppercase mb-2">
          0{stage.id}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          {stage.title}
        </h3>
        <p className="text-[14px] text-[#C7D2E4] leading-relaxed">{stage.desc}</p>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ opacity, y: translateVal }} className="relative pt-12">
      {/* Node */}
      <div className="absolute top-[-54px] left-0 w-3 h-3 rounded-full bg-slate-900 border-2 border-slate-500 z-10" />
      <div className="absolute top-[-58px] left-[-4px] w-5 h-5 rounded-full bg-accent blur-[8px] opacity-[0.08]" />

      {/* Content */}
      <div className="text-[10px] font-bold tracking-widest text-[#4F8CFF] uppercase mb-3">
        0{stage.id}
      </div>
      <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
        {stage.title}
      </h3>
      <p className="text-[13px] text-[#C7D2E4] leading-relaxed pr-4">{stage.desc}</p>
    </motion.div>
  );
}

export default function IndustriesStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="bg-[#0B1220] py-32 px-6 md:px-12 lg:px-24 w-full text-white relative z-10 overflow-hidden border-t border-white/5"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent rounded-[100%] blur-[120px] opacity-[0.012] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-24 md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Why We Understand Your Industry
          </h2>
          <p className="text-[#94A3B8] text-[16px] leading-relaxed">
            Our engineering methodology isn't generic. It's a highly refined, stage-by-stage process
            designed to eliminate risk and ensure your software meets the strict demands of your
            market.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative pt-12 pb-24">
          {/* Base Line */}
          <div className="absolute top-[48px] left-0 right-0 h-px bg-white/10" />

          {/* Animated Progress Line */}
          <motion.div
            className="absolute top-[48px] left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-blue-400 origin-left shadow-[0_0_15px_rgba(79,140,255,0.3)]"
            style={{ scaleX }}
          />

          <div className="grid grid-cols-6 gap-6">
            {storyStages.map((stage, index) => (
              <TimelineStage
                key={stage.id}
                stage={stage}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden relative pl-6">
          {/* Base Line */}
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-white/10" />

          {/* Animated Progress Line */}
          <motion.div
            className="absolute top-0 bottom-0 left-[7px] w-[2px] bg-gradient-to-b from-accent to-blue-400 origin-top shadow-[0_0_15px_rgba(79,140,255,0.3)]"
            style={{ scaleY: scaleX }}
          />

          <div className="flex flex-col gap-12">
            {storyStages.map((stage, index) => (
              <TimelineStage
                key={stage.id}
                stage={stage}
                index={index}
                scrollYProgress={scrollYProgress}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
