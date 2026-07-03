import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const cases = [
  {
    id: 1,
    industry: "Healthcare",
    title: "MedSync Patient Portal",
    problem: "Legacy on-premise systems caused slow data retrieval and fragmented patient experiences.",
    solution: "Engineered a secure, cloud-native portal with real-time EHR synchronization and a unified patient dashboard.",
    result: "Reduced wait times by 40% and achieved 99.99% uptime with full HIPAA compliance.",
    tech: ["React", "AWS", "Node.js", "HL7/FHIR"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070",
    reverse: false
  },
  {
    id: 2,
    industry: "E-Commerce",
    title: "Aura High-End Retail",
    problem: "Monolithic architecture led to 3.5s page loads, severely impacting mobile conversion rates.",
    solution: "Migrated to a headless commerce architecture using Next.js and Shopify Plus for sub-second rendering.",
    result: "Increased mobile conversion by 65% and handled Black Friday traffic with zero downtime.",
    tech: ["Next.js", "Shopify Plus", "Tailwind"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    reverse: true
  }
];

export default function IndustriesShowcase() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative z-10">
      
      <div className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 tracking-tight">
          Industry Success Stories
        </h2>
        <p className="text-slate-500 text-[16px] leading-relaxed">
          We don't just build software; we engineer measurable business outcomes. Explore how our tailored solutions solve complex, industry-specific challenges.
        </p>
      </div>

      <div className="flex flex-col gap-32">
        {cases.map((project, index) => (
          <div key={project.id} className={`flex flex-col ${project.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
            
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: project.reverse ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group perspective-1000"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:rotate-y-2 group-hover:rotate-x-2 border border-slate-200/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                  {project.tech.map(t => (
                     <span key={t} className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase border border-white/20">
                       {t}
                     </span>
                  ))}
                </div>
              </div>
              
              {/* Decorative Blur */}
              <div className="absolute -inset-4 bg-[#2E5BE5]/20 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-1/2 flex flex-col"
            >
              <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-[#2E5BE5]/10 text-[#2E5BE5] text-[11px] font-bold tracking-wider uppercase mb-6 border border-[#2E5BE5]/20">
                {project.industry}
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-8">
                {project.title}
              </h3>

              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">The Problem</h4>
                  <p className="text-slate-600 text-[15px] leading-relaxed border-l-2 border-slate-200 pl-4">{project.problem}</p>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">The Solution</h4>
                  <p className="text-slate-600 text-[15px] leading-relaxed border-l-2 border-[#2E5BE5] pl-4">{project.solution}</p>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">The Result</h4>
                  <p className="text-slate-800 font-semibold text-[15px] leading-relaxed flex items-start gap-2">
                    <CheckCircle2 size={20} className="text-[#52C854] shrink-0 mt-0.5" />
                    {project.result}
                  </p>
                </div>
              </div>

              <button className="self-start group relative px-8 py-3.5 bg-white text-[#0f172a] font-bold text-[14px] rounded-xl border border-slate-200 overflow-hidden hover:border-[#2E5BE5] transition-colors shadow-sm flex items-center gap-2">
                <span className="relative z-10">View Case Study</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-slate-50 -z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.div>

          </div>
        ))}
      </div>

    </section>
  );
}
