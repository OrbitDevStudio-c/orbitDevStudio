import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'KnowledgeVoice',
    industry: 'AI & Knowledge Management',
    description: 'An AI-powered knowledge base assistant that turns documents into an assistant that actually knows them. Upload PDFs, Word docs, and text files, then ask questions by typing or speaking, and get accurate answers grounded in your own content — with every answer citing exactly which document it came from.',
    technologies: ['React', 'Node.js', 'MongoDB', 'OpenRouter AI'],
    liveUrl: 'https://w24-knowledge-agent.vercel.app/',
    screenshot: '/projects/knowledgevoice.png',
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-[#101A2D] py-16 md:py-20 relative border-t border-white/[0.03]">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold text-[#4F8CFF] uppercase tracking-[0.2em] block mb-3">Selected Work</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Featured Project</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/portfolio"
              className="text-[#94A3B8] hover:text-white light:hover:text-slate-900 flex items-center gap-2 text-sm font-medium transition-colors group bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-full shadow-sm hover:bg-white/[0.05]"
            >
              View all projects
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Project Showcase */}
        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Left: Card / Image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mockup-frame group relative rounded-2xl overflow-hidden bg-[#0B1220] shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/5"
            >
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#4F8CFF]/0 group-hover:bg-[#4F8CFF]/[0.06] blur-[100px] transition-colors duration-700 pointer-events-none z-0" />

              <div className="relative z-10 transform group-hover:scale-[1.01] transition-transform duration-700 ease-out">

                {/* Browser Header */}
                <div className="h-10 bg-[#14203A]/80 backdrop-blur-md flex items-center px-4 shrink-0 border-b border-white/5">
                  <div className="flex gap-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#0B1220]/60 rounded-md px-4 py-1 text-[10px] text-[#94A3B8] font-medium truncate max-w-[220px] border border-white/5 hover:text-white transition-colors"
                    >
                      {project.liveUrl.replace('https://', '')}
                    </a>
                  </div>
                </div>

                {/* Browser Body */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block relative aspect-[16/10] bg-[#0B1220]"
                >
                  <img
                    src={project.screenshot}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                    width={1280}
                    height={800}
                  />
                </a>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="inline-block px-2.5 py-1 bg-white/[0.03] rounded-md text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] border border-white/10 mb-4">
                {project.industry}
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-white light:text-slate-900 mb-4 leading-tight">
                {project.title}
              </h3>

              <p className="text-sm md:text-base text-[#C7D2E4] leading-relaxed mb-6 font-light">
                {project.description}
              </p>

              {/* Technology Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 rounded text-xs font-semibold text-[#4F8CFF]">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-950 bg-accent hover:bg-accent/90 px-5 py-3 rounded-lg transition-colors shadow-[0_4px_15px_rgba(22,119,255,0.3)]"
                >
                  Live Demo <ExternalLink size={15} />
                </a>
                <Link
                  to="/portfolio"
                  className="flex items-center gap-2 text-sm font-semibold text-white light:text-slate-900 bg-white/[0.03] hover:bg-white/[0.05] px-5 py-3 rounded-lg transition-colors border border-white/10"
                >
                  Case Study <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
