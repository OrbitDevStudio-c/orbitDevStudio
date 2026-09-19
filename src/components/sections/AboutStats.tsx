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
    <section className="core-stats-band py-10 relative overflow-hidden">
      {/* Shared gradient definition for stat icons */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="stats-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#050b2e" />
            <stop offset="55%" stopColor="#1677ff" />
            <stop offset="100%" stopColor="#00d9ff" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background patterns */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.02)_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,rgba(255,255,255,.02)_0_1px,transparent_1px_20px)] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-accent blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full core-stats-glow hidden light:block pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="core-stat-card flex flex-col items-center text-center rounded-2xl py-5 px-4 hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div className="stats-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300">
                  <Icon size={17} strokeWidth={1.5} className="stats-icon" />
                </div>
                <h3 className="text-2xl md:text-[1.75rem] font-black text-white light:text-slate-900 mb-1.5 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-[11px] font-bold tracking-[0.13em] text-[#94A3B8] uppercase">
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
