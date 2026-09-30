import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Case {
  id: number;
  industry: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  liveUrl: string;
  image: string;
  isLogo?: boolean;
  reverse: boolean;
}

const cases: Case[] = [
  {
    id: 1,
    industry: "Healthcare",
    title: "PharmaCare Platform",
    problem: "Legacy medical distribution systems caused slow data retrieval and fragmented pharmaceutical supply chain tracking.",
    solution: "Engineered a secure, highly scalable B2B platform with real-time inventory synchronization and a unified distributor dashboard.",
    result: "Streamlined order processing by 60% and achieved 99.99% uptime with full medical compliance.",
    tech: ["React", "Node.js", "Tailwind"],
    liveUrl: "https://pharmaceutical-demo.vercel.app/",
    image: "/projects/pharmacare.png",
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
    image: "/projects/designerss.png",
    reverse: true
  },
  {
    id: 3,
    industry: "Recruitment & HR Tech",
    title: "RecruitIQ",
    problem: "Manually screening every resume against a job's requirements is slow and inconsistent, and a genuinely qualified candidate can easily get buried in the pile — while back-and-forth interview scheduling eats up even more of a recruiter's week.",
    solution: "We engineered an AI recruitment platform that extracts structured requirements straight from the job post, then blends deterministic rule checks (skills, experience, education) with an LLM's semantic read to score and rank every applicant — scrubbing gender and name from anything sent to the model. Shortlisted candidates book their own interview slot instantly, including a fully automated AI voice interview conducted over LiveKit.",
    result: "Recruiters go from an unsorted resume pile to a ranked, filterable shortlist in minutes — with bulk shortlist/reject actions, automatic candidate emails, and race-safe slot booking so two candidates can never double-book the same interview time.",
    tech: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "https://recruitiq-eta.vercel.app/",
    image: "/projects/recruitiq-logo.png",
    isLogo: true,
    reverse: false
  },
  {
    id: 4,
    industry: "Knowledge Management",
    title: "KnowledgeVoice",
    problem: "The answers teams need are buried inside long PDFs, handbooks, and reports that are slow to search and easy to misremember — costing time every single time someone has to dig for one paragraph.",
    solution: "We built a full-stack RAG pipeline that reads, chunks, and embeds every uploaded document into a private, per-user knowledge base, then grounds every chat or spoken answer in the most relevant passages — always citing exactly which document it came from.",
    result: "Anyone can ask a question by typing or speaking and get an accurate, source-cited answer in seconds instead of scrolling through a 40-page document, with every conversation saved and searchable for later.",
    tech: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://w24-knowledge-agent.vercel.app/",
    image: "/projects/knowledgevoice-logo.png",
    isLogo: true,
    reverse: true
  }
];

export default function IndustriesShowcase() {
  return (
    <section className="bg-navy-deep w-full relative z-10 text-white light:text-slate-900 overflow-hidden">
      <div className="py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative">

      <div className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-white light:text-slate-900 mb-6 tracking-tight">
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
              <div className="mockup-frame relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:rotate-y-2 group-hover:rotate-x-2 border border-white/10 bg-[#0B1220]">
                
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
                <div className={`relative h-[350px] md:h-[450px] w-full overflow-hidden ${project.isLogo ? 'bg-white' : 'bg-[#0B1220]'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={project.isLogo
                      ? "absolute inset-0 w-full h-full object-contain p-16"
                      : "absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={400}
                  />
                  {/* Overlay to add subtle shading */}
                  {!project.isLogo && (
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  )}
                  
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
              <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-white/[0.03] light:bg-[rgba(22,119,255,0.06)] text-accent text-[11px] font-bold tracking-wider uppercase mb-6 border border-white/10 light:border-[rgba(22,119,255,0.18)]">
                {project.industry}
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white light:text-slate-900 tracking-tight mb-8">
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
                  <p className="text-white light:text-slate-900 font-semibold text-[15px] leading-relaxed flex items-start gap-2">
                    <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                    {project.result}
                  </p>
                </div>
              </div>

              <Link to="/portfolio" className="self-start group relative px-8 py-3.5 bg-white/[0.03] text-white light:text-slate-900 font-bold text-[14px] rounded-xl border border-white/10 overflow-hidden hover:border-accent hover:text-accent transition-colors shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center gap-2">
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
