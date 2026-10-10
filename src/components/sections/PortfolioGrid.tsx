import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects, PORTFOLIO_CATEGORIES as categories, TECH_CHIP_COLORS as chipColors, caseStudyPath } from '../../data/projects';

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="portfolio-grid" className="bg-[#101A2D] py-16 md:py-20 relative overflow-hidden border-t border-white/[0.03]">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4F8CFF] uppercase block mb-3">
              SELECTED WORKS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-4">
              Products we've launched.
            </h2>
            <p className="text-[#94A3B8] text-[15px] leading-relaxed max-w-lg">
              A growing library of shipped products across industries — new case studies land here regularly.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent text-white shadow-[0_4px_15px_rgba(22,119,255,0.2)] scale-105'
                    : 'bg-white/[0.03] border border-white/10 text-[#94A3B8] hover:border-accent/50 hover:text-accent hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-white/[0.05]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Uniform Grid — every card is the same shape, so new projects just slot in */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                className="group relative rounded-2xl overflow-hidden flex flex-col bg-[#0B1220] border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_25px_rgba(22,119,255,0.1)] hover:border-white/10 transition-all duration-300"
              >
                {/* macOS Browser Preview — always renders as a dark "screenshot" regardless of theme */}
                <div className="mockup-frame relative shrink-0">
                  <div className="h-9 bg-[#14203A]/80 backdrop-blur-md flex items-center px-4 border-b border-white/5">
                    <div className="flex gap-1.5 mr-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-[#0B1220]/60 rounded-md px-3 py-1 text-[10px] text-[#94A3B8] font-medium truncate max-w-[200px] border border-white/5">
                        {project.liveUrl.replace('https://', '')}
                      </div>
                    </div>
                  </div>
                  <div className="relative aspect-[16/10] bg-[#0B1220] overflow-hidden">
                    {project.logo ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
                        <img
                          src={project.logo.src}
                          alt={project.logo.alt}
                          width={project.logo.width}
                          height={project.logo.height}
                          className="w-full h-full object-contain"
                          loading={index < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <iframe
                        src={project.liveUrl}
                        title={project.title}
                        className="absolute inset-0 w-full h-full border-none"
                        loading={index < 3 ? 'eager' : 'lazy'}
                        style={{ pointerEvents: 'none' }}
                      />
                    )}
                  </div>
                </div>

                {/* Content — always visible, theme-aware, uniform height via line-clamp */}
                <div className="flex flex-col flex-1 p-6">
                  <span className="inline-block w-fit px-2.5 py-1 bg-white/[0.03] rounded-md text-[9px] font-bold uppercase tracking-wider text-[#94A3B8] border border-white/10 mb-3">
                    {project.industry}
                  </span>

                  <h3 className="text-xl font-bold text-white light:text-slate-900 mb-2 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-[13px] text-[#C7D2E4] leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={tech} className={`chip-${chipColors[i % chipColors.length]} px-2 py-1 rounded text-[10px] font-semibold`}>
                        <span className="chip-dot" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary flex items-center justify-center gap-2 text-xs px-4 py-2.5 rounded-lg w-fit"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                    <Link
                      to={caseStudyPath(project.slug)}
                      data-track="view_case_study"
                      data-track-location="portfolio-grid"
                      aria-label={`View ${project.title} case study`}
                      className="group/cs inline-flex items-center gap-1.5 text-xs font-semibold text-white light:text-slate-900 px-4 py-2.5 min-h-[44px] rounded-lg border border-white/10 bg-white/[0.03] hover:border-accent/50 hover:text-accent transition-colors"
                    >
                      View Case Study <ArrowRight size={14} className="group-hover/cs:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
