import { motion } from 'framer-motion';

const skillsRow1 = [
  "React.js", "Node.js", "TypeScript", "Next.js", "Python", "Django", "GraphQL", "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB"
];

const skillsRow2 = [
  "Vue.js", "Angular", "Express.js", "Java", "Spring Boot", ".NET", "C#", "Firebase", "Redis", "Elasticsearch", "Google Cloud", "TailwindCSS"
];

export default function HireSkills() {
  return (
    <section className="py-20 relative bg-[#0A0A0C] border-t border-b border-slate-800 overflow-hidden">
  {/* Background Glow */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-blue-500/[0.06] blur-3xl" />
    <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-emerald-500/[0.06] blur-3xl" />
  </div>

  {/* Side Gradient Fade */}
  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0A0A0C] via-transparent to-[#0A0A0C]" />

  {/* Heading */}
  <div className="max-w-[1400px] mx-auto px-6 mb-12 text-center relative z-20">
    <h3 className="text-xl md:text-2xl font-bold text-white">
      Hire experts across 50+ modern technologies
    </h3>
  </div>

  <div className="flex flex-col gap-6 relative z-20 overflow-hidden">
    {/* Row 1 - Scroll Left */}
    <div className="flex w-[200%]">
      <motion.div
        animate={{ x: [0, -1035] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
        className="flex gap-4 px-2"
      >
        {[...skillsRow1, ...skillsRow1, ...skillsRow1].map((skill, index) => (
          <div
            key={index}
            className="px-6 py-3 rounded-full bg-[#111827] border border-slate-700 shadow-lg whitespace-nowrap text-sm font-semibold text-slate-300 hover:border-white/30 hover:text-accent hover:bg-[#162033] transition-all duration-300 cursor-default"
          >
            {skill}
          </div>
        ))}
      </motion.div>
    </div>

    {/* Row 2 - Scroll Right */}
    <div className="flex w-[200%] justify-end">
      <motion.div
        animate={{ x: [-1035, 0] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
        className="flex gap-4 px-2"
      >
        {[...skillsRow2, ...skillsRow2, ...skillsRow2].map((skill, index) => (
          <div
            key={index}
            className="px-6 py-3 rounded-full bg-[#111827] border border-slate-700 shadow-lg whitespace-nowrap text-sm font-semibold text-slate-300 hover:border-emerald-500 hover:text-emerald-400 hover:bg-[#162033] transition-all duration-300 cursor-default"
          >
            {skill}
          </div>
        ))}
      </motion.div>
    </div>
  </div>
</section>
  );
}
