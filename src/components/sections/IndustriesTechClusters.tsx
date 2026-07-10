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
  <section className="bg-navy-soft w-full relative z-10 overflow-hidden">
    <div className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative">

  {/* Ambient Background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-32 -left-24 w-80 h-80 bg-blue-500/[0.06] rounded-full blur-[120px]" />
    <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-cyan-400/[0.06] rounded-full blur-[120px]" />
  </div>

  {/* Section Header */}
  <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
      Tech Stack by Industry
    </h2>

    <p className="text-white/70 text-[16px] leading-relaxed">
      We don't force a single technology on every problem. We assemble
      specialized, highly performant technology stacks based on the unique
      demands of your business and industry.
    </p>
  </div>

  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

    {/* Left Side */}
    <div className="lg:col-span-5 flex flex-col gap-3">

      {techClusters.map((cluster) => {
        const isActive = activeTab === cluster.id;

        return (
          <button
            key={cluster.id}
            onClick={() => setActiveTab(cluster.id)}
            className={`text-left p-6 rounded-2xl transition-all duration-300 flex items-center justify-between border backdrop-blur-xl group
              ${
                isActive
                  ? "bg-white/5 border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
                  : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10"
              }
            `}
          >
            <div>
              <h3
                className={`text-xl font-bold transition-colors mb-1 ${
                  isActive
                    ? "text-accent"
                    : "text-white group-hover:text-white"
                }`}
              >
                {cluster.name}
              </h3>

              <p className="text-[13px] text-white/60">
                {cluster.desc}
              </p>
            </div>

            <ChevronRight
              size={20}
              className={`transition-all duration-300 ${
                isActive
                  ? "text-accent translate-x-1 opacity-100"
                  : "text-white/30 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
              }`}
            />
          </button>
        );
      })}

    </div>

    {/* Right Side */}
    <div className="lg:col-span-7 relative h-[420px] rounded-3xl bg-slate-950 border border-white/10 overflow-hidden shadow-2xl">

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

      <AnimatePresence mode="wait">

        <motion.div
          key={activeCluster.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >

          {/* Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">

            <div className="w-28 h-28 rounded-full bg-slate-800 border border-white/10 shadow-[0_0_60px_rgba(79,140,255,0.3)] flex items-center justify-center">

              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm tracking-wide">
                Core
              </div>

            </div>

          </div>

          {/* Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">

            {activeCluster.chips.map((chip, index) => (

              <motion.line
                key={index}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.25 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                }}
                x1="50%"
                y1="50%"
                x2={`${chip.x}%`}
                y2={`${chip.y}%`}
                stroke="#60A5FA"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />

            ))}

          </svg>

          {/* Chips */}
          {activeCluster.chips.map((chip, index) => (

            <motion.div
              key={chip.name}
              initial={{
                opacity: 0,
                x: "50%",
                y: "50%",
                scale: 0,
              }}
              animate={{
                opacity: 1,
                left: `${chip.x}%`,
                top: `${chip.y}%`,
                x: "-50%",
                y: "-50%",
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: index * 0.08,
              }}
              className="absolute z-30 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.35)] text-white text-[13px] font-semibold whitespace-nowrap hover:scale-105 transition-transform"
            >
              {chip.name}
            </motion.div>

          ))}

          {/* Floating Animation */}
          <motion.div
            animate={{
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 pointer-events-none"
          />

        </motion.div>

      </AnimatePresence>

    </div>

  </div>

    </div>
</section>
  );
}
