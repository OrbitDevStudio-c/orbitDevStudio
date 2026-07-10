import { motion } from 'framer-motion';

const stats = [
  { value: '100%', label: 'Commitment to Excellence' },
  { value: '10+', label: 'Products Launched' },
  { value: '24/7', label: 'Dedicated Support' },
  { value: '15+', label: 'Core Technologies' }
];

export default function AboutStats() {
  return (
    <section className="bg-navy-soft py-20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.03)_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,rgba(255,255,255,.03)_0_1px,transparent_1px_20px)] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-accent blur-[150px] opacity-20 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
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
