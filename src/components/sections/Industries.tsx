import { motion } from 'framer-motion';
import { HeartPulse, Landmark, ShoppingBag, GraduationCap, Factory, Rocket, Building2 } from 'lucide-react';

const industries = [
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Finance', icon: Landmark },
  { name: 'E-Commerce', icon: ShoppingBag },
  { name: 'Education', icon: GraduationCap },
  { name: 'Manufacturing', icon: Factory },
  { name: 'Startups', icon: Rocket },
  { name: 'Real Estate', icon: Building2 },
];

export default function Industries() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Empowering <span className="text-gradient">Industries</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto font-normal"
          >
            We deliver domain-specific digital transformation that solves complex challenges and drives growth across global sectors.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group w-[160px] md:w-[200px] aspect-square rounded-3xl glass-panel flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-all duration-300 border-white/10 hover:border-accent/50 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(79,140,255,0.15)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 group-hover:text-accent transition-colors text-white relative z-10">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="text-white font-medium text-sm md:text-base relative z-10">{ind.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
