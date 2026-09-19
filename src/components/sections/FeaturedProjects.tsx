import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SiReact, SiNodedotjs, SiMongodb, SiOpenrouter, type IconType } from 'react-icons/si';
import { Link } from 'react-router-dom';

const techMeta: Record<string, { icon: IconType; color: string }> = {
  'React': { icon: SiReact, color: '#1677ff' },
  'Node.js': { icon: SiNodedotjs, color: '#34d399' },
  'MongoDB': { icon: SiMongodb, color: '#34d399' },
  'OpenRouter AI': { icon: SiOpenrouter, color: '#6c2bff' },
};

const projects = [
  {
    id: 1,
    title: 'Knowledge',
    titleAccent: 'Voice',
    industry: 'AI & Knowledge Management',
    description: 'An AI-powered knowledge base assistant that turns documents into an assistant that actually knows them. Upload PDFs, Word docs, and text files, then ask questions by typing or speaking, and get accurate answers grounded in your own content — with every answer citing exactly which document it came from.',
    technologies: ['React', 'Node.js', 'MongoDB', 'OpenRouter AI'],
    liveUrl: 'https://w24-knowledge-agent.vercel.app/',
    screenshot: '/projects/knowledgevoice.png',
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-navy-soft py-16 md:py-20 relative overflow-hidden border-t border-white/[0.03] light:border-slate-200">

      {/* ambient blobs — subtle cool-blue atmosphere, consistent with Our Journey */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-[8%] w-[420px] h-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(22,119,255,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-[6%] w-[320px] h-[320px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-14 gap-4">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold text-accent uppercase tracking-[0.2em] flex items-center gap-2"
          >
            <span className="inline-block w-5 h-px bg-accent" />
            Featured Project
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="self-start md:self-auto"
          >
            <Link
              to="/portfolio"
              className="btn-primary group inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full"
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
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-2.5 py-1 bg-white/[0.03] rounded-md text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] border border-white/10 mb-4">
                {project.industry}
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-white light:text-slate-900 mb-4 leading-tight">
                {project.title}<span className="text-gradient">{project.titleAccent}</span>
              </h3>

              <p className="text-sm md:text-base text-[#C7D2E4] leading-relaxed mb-6 max-w-[46ch]">
                {project.description}
              </p>

              {/* Technology Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map(tech => {
                  const meta = techMeta[tech];
                  const Icon = meta?.icon;
                  return (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        background: `${meta?.color}0f`,
                        border: `1px solid ${meta?.color}30`,
                        color: meta?.color,
                      }}
                    >
                      {Icon && <Icon size={13} />}
                      {tech}
                    </span>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary flex items-center gap-2 text-sm px-5 py-3 rounded-xl"
                >
                  Live Demo <ExternalLink size={15} />
                </a>
                <Link
                  to="/portfolio"
                  className="group flex items-center gap-2 text-sm font-semibold text-white light:text-slate-900 bg-white/[0.03] hover:bg-accent/[0.08] px-5 py-3 rounded-xl transition-colors border border-white/10 hover:border-accent/30"
                >
                  Case Study <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Card / Image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mockup-frame group relative rounded-2xl overflow-hidden bg-[#0B1220] shadow-[0_10px_40px_rgba(15,23,42,0.15)] light:shadow-[0_10px_40px_rgba(15,23,42,0.12)] border border-white/5"
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
                  className="block relative bg-[#0B1220] p-2"
                >
                  <img
                    src={project.screenshot}
                    alt={project.title + project.titleAccent}
                    className="w-full h-auto rounded-lg"
                    loading="eager"
                    decoding="async"
                    width={1917}
                    height={847}
                  />
                </a>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
