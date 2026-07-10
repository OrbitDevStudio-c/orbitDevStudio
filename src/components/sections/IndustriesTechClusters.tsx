import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const techClusters = [
  {
    id: "healthcare",
    name: "Healthcare",
    desc: "Robust, compliant, and highly available architectures.",
    chips: [
      { name: "React", x: 20, y: 10 },
      { name: "Node.js", x: 60, y: 30 },
      { name: "AWS", x: 10, y: 60 },
      { name: "HIPAA Compliant", x: 50, y: 70 },
      { name: "PostgreSQL", x: 80, y: 15 },
      { name: "HL7/FHIR", x: 30, y: 40 }
    ]
  },
  {
    id: "restaurant",
    name: "Restaurant",
    desc: "High-speed, offline-capable, and transaction-ready.",
    chips: [
      { name: "React Native", x: 25, y: 20 },
      { name: "Stripe", x: 65, y: 15 },
      { name: "Node.js", x: 45, y: 55 },
      { name: "POS Integration", x: 15, y: 70 },
      { name: "Redis", x: 75, y: 65 }
    ]
  },
  {
    id: "architecture",
    name: "Architecture",
    desc: "Immersive graphics, large asset delivery, and 3D web engines.",
    chips: [
      { name: "Three.js", x: 40, y: 30 },
      { name: "WebGL", x: 20, y: 60 },
      { name: "React", x: 70, y: 20 },
      { name: "ImageKit", x: 60, y: 65 },
      { name: "AWS S3", x: 10, y: 20 }
    ]
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    desc: "Sub-second load times and infinite scalability.",
    chips: [
      { name: "Next.js", x: 30, y: 25 },
      { name: "Shopify Plus", x: 60, y: 10 },
      { name: "GraphQL", x: 15, y: 65 },
      { name: "Vercel", x: 50, y: 85 },
      { name: "Tailwind", x: 80, y: 70 }
    ]
  }
];

export default function IndustriesTechClusters() {
  const [activeTab, setActiveTab] = useState(techClusters[0].id);

  const activeCluster = techClusters.find(c => c.id === activeTab) || techClusters[0];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative z-10 bg-surface/50 rounded-3xl mb-32 border border-white/10">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Tech Stack by Industry
        </h2>
        <p className="text-slate-400 text-[16px] leading-relaxed">
          We don't force a single technology on every problem. We assemble specialized, highly performant tech stacks based on the unique demands of your specific sector.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Industry Selector */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          {techClusters.map((cluster) => {
            const isActive = activeTab === cluster.id;
            return (
              <button
                key={cluster.id}
                onClick={() => setActiveTab(cluster.id)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/10' 
                    : 'hover:bg-slate-900/40 border border-transparent'
                }`}
              >
                <div>
                  <h3 className={`text-xl font-bold mb-1 transition-colors ${isActive ? 'text-accent' : 'text-white group-hover:text-accent'}`}>
                    {cluster.name}
                  </h3>
                  <p className="text-[13px] text-slate-400">
                    {cluster.desc}
                  </p>
                </div>
                <ChevronRight 
                  size={20} 
                  className={`transition-all duration-300 ${isActive ? 'text-accent translate-x-1 opacity-100' : 'text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} 
                />
              </button>
            )
          })}
        </div>

        {/* Right Side: Interactive Cluster Canvas */}
        <div className="lg:col-span-7 relative h-[400px] bg-slate-950/40 rounded-3xl border border-white/10 shadow-sm overflow-hidden flex items-center justify-center">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMjUpIi8+PC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-60" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCluster.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Center Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-slate-900 border-2 border-white/10 shadow-xl flex items-center justify-center z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2E5BE5] to-[#4F8CFF] flex items-center justify-center text-white font-bold text-sm tracking-wide">
                  Core
                </div>
              </div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {activeCluster.chips.map((chip, index) => (
                  <motion.line
                    key={`line-${index}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.2 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    x1="50%"
                    y1="50%"
                    x2={`${chip.x}%`}
                    y2={`${chip.y}%`}
                    stroke="#4F8CFF"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                ))}
              </svg>

              {/* Floating Tech Chips */}
              {activeCluster.chips.map((chip, index) => (
                <motion.div
                  key={chip.name}
                  initial={{ opacity: 0, x: "50%", y: "50%", scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    left: `${chip.x}%`, 
                    top: `${chip.y}%`, 
                    scale: 1,
                    x: "-50%",
                    y: "-50%"
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: index * 0.1 
                  }}
                  className="absolute z-20 px-4 py-2 bg-slate-900 border border-white/10 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-[13px] font-bold text-white whitespace-nowrap"
                >
                  {chip.name}
                </motion.div>
              ))}

              {/* Floating Animation Wrapper for the whole group */}
              <motion.div 
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 z-30 pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

    </section>
  );
}
