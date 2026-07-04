import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Awards', value: '15+', orbitSize: 130, speed: 20, startAngle: 0 },
  { label: 'Projects', value: '200+', orbitSize: 195, speed: 28, startAngle: 90 },
  { label: 'Clients', value: '50+', orbitSize: 260, speed: 36, startAngle: 180 },
  { label: 'Experts', value: '40+', orbitSize: 325, speed: 44, startAngle: 270 },
];

const orbitRingStyle: React.CSSProperties = { border: '1px solid rgba(0,0,0,0.06)' };

export default function StoryStats() {
  return (
    <section className="section-white py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Orbital System */}
        <div className="relative h-[420px] md:h-[550px] flex items-center justify-center">
          {/* Central Sun */}
          <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-orange-500 z-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-300/40 blur-[20px]" />
            <div className="absolute inset-0 rounded-full bg-orange-400/20 blur-[40px]" />
          </div>
          
          {/* Orbit Rings + Cards */}
          {stats.map((stat, i) => (
            <div key={i} className="absolute" style={{ width: stat.orbitSize * 2, height: stat.orbitSize * 2 }}>
              {/* Ring path */}
              <div 
                className="absolute inset-0 rounded-full"
                style={orbitRingStyle}
              />
              
              {/* Orbiting card container */}
              <div 
                className="absolute inset-0"
                style={{ 
                  animation: `orbit ${stat.speed}s linear infinite`,
                  animationDelay: `${-(stat.startAngle / 360) * stat.speed}s`
                }}
              >
                {/* Card — counter-rotates to stay upright */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 -top-5"
                  style={{ 
                    animation: `orbit-reverse ${stat.speed}s linear infinite`,
                    animationDelay: `${-(stat.startAngle / 360) * stat.speed}s`
                  }}
                >
                  <div className="card-white px-4 py-3 flex flex-col items-center justify-center cursor-default hover:scale-105 transition-transform min-w-[80px]">
                    <span className="text-lg md:text-xl font-bold text-primary">{stat.value}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">{stat.label}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start"
        >
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Our Journey</span>
          
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary tracking-tight leading-tight mb-6">
            Built for teams that{' '}
            <span className="text-gradient-blue">demand precision</span>
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-5">
            Every line of code we write is an investment in your product's longevity. We don't build throwaway prototypes — we engineer systems designed to handle real traffic, real users, and real growth.
          </p>
          
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10">
            Our partnerships last years, not sprints. Because the best software is built by teams that understand your business deeply enough to anticipate what you'll need next.
          </p>
          
          <Link 
            to="/about" 
            className="group flex items-center gap-2.5 text-sm font-semibold text-gray-900 hover:text-accent transition-colors"
          >
            Our Story
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
