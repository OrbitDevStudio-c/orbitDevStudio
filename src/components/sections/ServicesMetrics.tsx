import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const end = value;
      const duration = 2000;

      const animate = (currentTime: number) => {
        if (!startTimestamp) startTimestamp = currentTime;
        const elapsed = currentTime - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuart)
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeProgress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export default function ServicesMetrics() {
  return (
    <section className="bg-[#14203A] py-16 px-6 md:px-12 lg:px-24 w-full relative z-10 overflow-hidden border-t border-b border-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center px-4"
          >
            <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
              <AnimatedCounter value={10} suffix="+" />
            </div>
            <p className="text-[#94A3B8] text-[12px] font-bold tracking-[0.1em] uppercase">Projects Delivered</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center px-4"
          >
            <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
              99.9%
            </div>
            <p className="text-[#94A3B8] text-[12px] font-bold tracking-[0.1em] uppercase">Deployment Success</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center px-4"
          >
            <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
              24/7
            </div>
            <p className="text-[#94A3B8] text-[12px] font-bold tracking-[0.1em] uppercase">Technical Support</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center px-4"
          >
            <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
              <AnimatedCounter value={15} suffix="+" />
            </div>
            <p className="text-[#94A3B8] text-[12px] font-bold tracking-[0.1em] uppercase">Core Technologies</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
