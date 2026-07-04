import { motion } from 'framer-motion';

const stats = [
  { value: '150+', label: 'Digital Products Launched' },
  { value: '50+', label: 'Senior Engineers & Experts' },
  { value: '99%', label: 'Client Retention Rate' },
  { value: '12+', label: 'Industries Transformed' }
];

export default function AboutStats() {
  return (
    <section className="py-20 bg-[#1B3675] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.03)_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,rgba(255,255,255,.03)_0_1px,transparent_1px_20px)] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#4F8CFF] blur-[150px] opacity-20 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col items-center text-center ${index !== 0 ? 'pl-8 md:pl-12' : ''}`}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm font-bold tracking-widest text-blue-200 uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
