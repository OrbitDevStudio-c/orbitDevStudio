import { motion } from 'framer-motion';

const skillsRow1 = [
  "React.js", "Node.js", "TypeScript", "Next.js", "Python", "Django", "GraphQL", "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB"
];

const skillsRow2 = [
  "Vue.js", "Angular", "Express.js", "Java", "Spring Boot", ".NET", "C#", "Firebase", "Redis", "Elasticsearch", "Google Cloud", "TailwindCSS"
];

export default function HireSkills() {
  return (
    <section className="py-20 bg-navy relative overflow-hidden border-t border-b border-white/10">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#060B1A] via-transparent to-[#060B1A] w-full" />
      
      <div className="max-w-[1400px] mx-auto px-6 mb-12 text-center relative z-20">
        <h3 className="text-xl md:text-2xl font-bold text-white">Hire experts across 50+ modern technologies</h3>
      </div>

      <div className="flex flex-col gap-6 relative z-0">
        {/* Row 1 - Scroll Left */}
        <div className="flex w-[200%]">
          <motion.div
            animate={{ x: [0, -1035] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex gap-4 px-2"
          >
            {[...skillsRow1, ...skillsRow1, ...skillsRow1].map((skill, index) => (
              <div 
                key={index}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 shadow-sm whitespace-nowrap text-sm font-semibold text-slate-300 hover:border-[#4F8CFF] hover:text-[#4F8CFF] transition-colors cursor-default"
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
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex gap-4 px-2"
          >
            {[...skillsRow2, ...skillsRow2, ...skillsRow2].map((skill, index) => (
              <div 
                key={index}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 shadow-sm whitespace-nowrap text-sm font-semibold text-slate-300 hover:border-emerald-500 hover:text-emerald-500 transition-colors cursor-default"
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
