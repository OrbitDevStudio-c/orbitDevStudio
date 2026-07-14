import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Globe, Layers, Code2, ArrowRight, Database, Server, Braces, Terminal } from 'lucide-react';

const techData = {
  Frameworks: [
    { name: "React & Next.js", icon: <Globe size={16} className="text-[#3b82f6]" /> },
    { name: "Angular", icon: <Layers size={16} className="text-[#ef4444]" /> },
    { name: "Vue.js / Nuxt", icon: <Code2 size={16} className="text-[#10b981]" /> },
  ],
  Languages: [
    { name: "TypeScript & JS", icon: <Braces size={16} className="text-[#eab308]" /> },
    { name: "Python & Go", icon: <Terminal size={16} className="text-[#3b82f6]" /> },
    { name: "Java & C#", icon: <Server size={16} className="text-[#8b5cf6]" /> },
  ],
  Databases: [
    { name: "PostgreSQL & MySQL", icon: <Database size={16} className="text-[#3b82f6]" /> },
    { name: "MongoDB & Redis", icon: <Database size={16} className="text-[#10b981]" /> },
    { name: "AWS DynamoDB", icon: <Server size={16} className="text-[#f59e0b]" /> },
  ]
};

type TabType = keyof typeof techData;

export default function ServicesTechnologies() {
  const [activeTab, setActiveTab] = useState<TabType>("Frameworks");

  return (
    <section className="bg-[#101A2D] py-16 md:py-20 px-6 md:px-12 lg:px-24 w-full relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-stretch relative z-10">
        
        {/* Left Card: Global Reach Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          animate={{ y: [-5, 5, -5] }}
          className="flex-[3] relative rounded-[2rem] overflow-hidden min-h-[400px] flex items-end p-10 lg:p-12 shadow-xl group hover:shadow-[0_8px_30px_rgba(79,140,255,0.15)] transition-shadow duration-500"
          style={{ transition: 'animation 4s ease-in-out infinite' }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/services-tech.webp" 
              alt="Global Network" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width={700}
              height={500}
            />
            {/* Dark Blue Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] via-[#0b1221]/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Built for Global Reach
            </h2>
            <p className="text-[#C7D2E4] text-[15px] leading-relaxed">
              We engineer products that scale across geographies, devices, and user bases — with localization, accessibility, and performance built in from day one.
            </p>
          </div>
        </motion.div>

        {/* Right Card: Tech Stack Navigator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-dark flex-[2] rounded-[2rem] p-8 lg:p-10 flex flex-col hover:shadow-[0_8px_30px_rgba(79,140,255,0.15)] transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Cpu size={24} className="text-[#3b82f6]" />
            <h3 className="text-xl font-bold text-white tracking-tight">Tech Stack Navigator</h3>
          </div>

          {/* Tabs Container */}
          <div className="flex p-1 bg-white/[0.02] rounded-xl mb-8 border border-white/5 backdrop-blur-sm overflow-x-auto hide-scrollbar">
            {(["Frameworks", "Languages", "Databases"] as TabType[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex-1 min-w-[110px] sm:min-w-0 py-2.5 px-2 text-[13px] font-semibold rounded-lg transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="techTab"
                      className="absolute inset-0 bg-accent rounded-lg shadow-[0_0_15px_rgba(79,140,255,0.4)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>

          {/* List Content */}
          <div className="flex flex-col gap-3 flex-grow relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 absolute inset-0"
              >
                {techData[activeTab].map((tech, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 hover:shadow-[0_4px_20px_rgba(79,140,255,0.08)] transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-accent/30 group-hover:bg-accent/10 transition-colors">
                        {tech.icon}
                      </div>
                      <span className="text-[14px] font-bold text-white tracking-tight">{tech.name}</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
