import { motion } from 'framer-motion';
import { Clock, Users, Server, Zap, LayoutTemplate, Activity } from 'lucide-react';

const reasons = [
  { title: '4+ Years Experience', description: 'Deep industry knowledge and proven technical mastery across complex digital domains.', icon: Clock },
  { title: '50+ Happy Clients', description: 'A track record of delivering successful, high-impact projects for global enterprises.', icon: Users },
  { title: 'Scalable Architecture', description: 'Systems designed to seamlessly handle growth, from thousands to millions of users.', icon: Server },
  { title: 'Fast Delivery', description: 'Agile methodologies ensuring rapid time-to-market without compromising quality.', icon: Zap },
  { title: 'Modern UI/UX', description: 'Award-winning designs that captivate users and elevate brand identity.', icon: LayoutTemplate },
  { title: 'Performance Focused', description: 'Highly optimized codebases guaranteeing blazing fast speeds and perfect Lighthouse scores.', icon: Activity },
];

const borderMaskStyle: React.CSSProperties = { maskImage: 'linear-gradient(white, white)', maskComposite: 'exclude', WebkitMaskComposite: 'xor' as string, padding: '1px' };

export default function WhyChooseUs() {
  return (
    <section className="bg-navy-deep py-16 md:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Why <span className="text-accent">OrbitDevStudio</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto font-light"
          >
            We don't just write code; we engineer competitive advantages. Here's why industry leaders trust us with their most critical products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl glass-panel p-8 overflow-hidden"
              >
                {/* Animated Border Effect via Pseudo-element glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-primary/0 group-hover:from-accent/20 group-hover:via-transparent group-hover:to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Animated rotating border */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" style={borderMaskStyle}>
                   <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary w-[200%] h-[200%] animate-[spin_4s_linear_infinite] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"></div>
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{reason.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
