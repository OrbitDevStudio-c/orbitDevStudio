import { motion } from 'framer-motion';
import { Award, Rocket, HeartHandshake, Layers } from 'lucide-react';

const stats = [
  { value: '100%', label: 'Commitment to Excellence', icon: Award },
  { value: '10+', label: 'Products Launched', icon: Rocket },
  { value: '24/7', label: 'Dedicated Support', icon: HeartHandshake },
  { value: '15+', label: 'Core Technologies', icon: Layers }
];

export default function AboutStats() {
  return (
    <section className="bg-[#14203A] py-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.02)_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,rgba(255,255,255,.02)_0_1px,transparent_1px_20px)] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-accent blur-[150px] opacity-10 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center bg-white/[0.02] border border-white/5 rounded-3xl py-6 px-4 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_8px_30px_rgba(79,140,255,0.08)] transition-all duration-300 relative group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 group-hover:text-white transition-all duration-300">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs font-bold tracking-[0.15em] text-[#94A3B8] uppercase">
                  {stat.label}
                </p>
                {/* Elegant Separator for Desktop - Only between items, visually simulated by card borders here but we can add a subtle glow line at bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-accent/0 group-hover:bg-accent/40 transition-colors duration-300 rounded-t-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
