import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const cases = [
  {
    id: 1,
    industry: "Healthcare",
    title: "PharmaCare Platform",
    problem: "Legacy medical distribution systems caused slow data retrieval and fragmented pharmaceutical supply chain tracking.",
    solution: "Engineered a secure, highly scalable B2B platform with real-time inventory synchronization and a unified distributor dashboard.",
    result: "Streamlined order processing by 60% and achieved 99.99% uptime with full medical compliance.",
    tech: ["React", "Node.js", "Tailwind"],
    liveUrl: "https://pharmaceutical-demo.vercel.app/",
    reverse: false
  },
  {
    id: 2,
    industry: "Interior Design",
    title: "Aura Design Studio",
    problem: "A generic template website failed to capture the studio's premium aesthetic, leading to low engagement from high-end clients.",
    solution: "Developed a bespoke, high-performance visual portfolio featuring immersive interactions and smooth page transitions.",
    result: "Increased average session duration by 140% and doubled premium consultation inquiries.",
    tech: ["Next.js", "Framer", "React"],
    liveUrl: "https://auradesignstudio.netlify.app/",
    reverse: true
  }
];

export default function IndustriesShowcase() {
  return (
    <section className="bg-[#0E1728] w-full relative z-10 text-white overflow-hidden">
      <div className="py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative">
      
      <div className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Industry Success Stories
        </h2>
        <p className="text-[#C7D2E4] text-[16px] leading-relaxed">
          We don't just build software; we engineer measurable business outcomes. Explore how our tailored solutions solve complex, industry-specific challenges.
        </p>
      </div>

      <div className="flex flex-col gap-32">
        {cases.map((project) => (
          <div key={project.id} className={`flex flex-col ${project.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
            
            {/* Browser Mockup Side */}
            <motion.div 
              initial={{ opacity: 0, x: project.reverse ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group perspective-1000"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:rotate-y-2 group-hover:rotate-x-2 border border-white/10 bg-slate-900">
                
                {/* macOS Browser Header */}
                <div className="bg-[#101A2D] border-b border-white/5 px-4 py-3 flex items-center gap-4 relative z-20">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm border border-black/10" />
                  </div>
                  <div className="flex-1 bg-[#0B1220] rounded-md py-1.5 px-3 text-[10px] text-[#94A3B8] text-center font-mono truncate shadow-sm border border-white/5">
                    {project.liveUrl}
                  </div>
                </div>

                {/* Image Preview instead of heavy iframe */}
                <div className="relative h-[350px] md:h-[450px] w-full bg-[#0B1220] overflow-hidden">
                  <img 
                    src={project.id === 1 ? "/projects/pharmacare.png" : "/projects/designerss.png"}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={400}
                  />
                  {/* Overlay to add subtle shading */}
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  
                  {/* Tech Stack Pills */}
                  <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                    {project.tech.map(t => (
                       <span key={t} className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase border border-white/20 shadow-lg">
                         {t}
                       </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative Blur */}
              <div className="absolute -inset-4 bg-[#1E2A4A]/[0.06] blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>

            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-1/2 flex flex-col"
            >
              <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-white/[0.03] text-[#94A3B8] text-[11px] font-bold tracking-wider uppercase mb-6 border border-white/10">
                {project.industry}
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
                {project.title}
              </h3>

              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">The Problem</h4>
                  <p className="text-[#C7D2E4] text-[15px] leading-relaxed border-l-2 border-white/10 pl-4">{project.problem}</p>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">The Solution</h4>
                  <p className="text-[#C7D2E4] text-[15px] leading-relaxed border-l-2 border-accent/50 pl-4">{project.solution}</p>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">The Result</h4>
                  <p className="text-white font-semibold text-[15px] leading-relaxed flex items-start gap-2">
                    <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                    {project.result}
                  </p>
                </div>
              </div>

              <Link to="/portfolio" className="self-start group relative px-8 py-3.5 bg-white/[0.03] text-white font-bold text-[14px] rounded-xl border border-white/10 overflow-hidden hover:border-accent hover:text-accent transition-colors shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center gap-2">
                <span className="relative z-10">View Case Study</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-accent/10 -z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </motion.div>

          </div>
        ))}
      </div>

      </div>
    </section>
  );
}
