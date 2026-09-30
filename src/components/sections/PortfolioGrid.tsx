import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const categories = ['All', 'Architecture', 'Healthcare', 'Corporate', 'E-commerce', 'Personal', 'Industrial', 'AI & SaaS'];

// Cycles the shared `.chip-*` accent colors across each project's tech list
// (same palette as Industries/Technologies) so the badges read as colorful
// stack metadata instead of a flat blue wall of labels.
const chipColors: Array<'amber' | 'blue' | 'purple' | 'green' | 'cyan'> = ['amber', 'blue', 'purple', 'green', 'cyan'];

interface Project {
  id: number;
  title: string;
  industry: string;
  category: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  logo?: string;
}

const projects: Project[] = [
  {
    id: 11,
    title: 'Orbit Food',
    industry: 'Food & Hospitality',
    category: 'E-commerce',
    description: 'A modern food ordering platform built for fast, reliable delivery experiences — from browsing menus to real-time order tracking.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveUrl: 'https://food-z09x.onrender.com',
    logo: '/projects/orbitfood-logo.webp',
  },
  {
    id: 10,
    title: 'RecruitIQ',
    industry: 'AI & Recruitment',
    category: 'AI & SaaS',
    description: 'An AI recruitment platform that parses resumes, scores every applicant against the job requirements, and ranks candidates into a clear shortlist.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'OpenAI'],
    liveUrl: 'https://recruitiq-eta.vercel.app/',
    logo: '/projects/recruitiq-logo.png',
  },
  {
    id: 9,
    title: 'KnowledgeVoice',
    industry: 'AI & Knowledge Management',
    category: 'AI & SaaS',
    description: 'An AI-powered knowledge base assistant with a full-stack RAG pipeline that answers questions grounded in your own uploaded documents.',
    technologies: ['React', 'Node.js', 'MongoDB', 'OpenRouter AI'],
    liveUrl: 'https://w24-knowledge-agent.vercel.app/',
    logo: '/projects/knowledgevoice-logo.png',
  },
  {
    id: 4,
    title: 'Elegant Wedding',
    industry: 'Personal Branding',
    category: 'Personal',
    description: 'A bespoke personal branding and digital invitation platform, engineered around immersive animation and state-driven storytelling.',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://wedding-portfolio-lilac.vercel.app/',
  },
  {
    id: 7,
    title: 'ShivedLife Medicare',
    industry: 'Healthcare',
    category: 'Healthcare',
    description: 'A secure, mobile-first platform for a regional healthcare provider, built for compliant patient navigation under strict performance budgets.',
    technologies: ['React', 'Next.js', 'TypeScript'],
    liveUrl: 'https://shivedlifemedicare.vercel.app/',
  },
  {
    id: 3,
    title: 'PharmaCare Platform',
    industry: 'Healthcare & Pharma',
    category: 'Healthcare',
    description: 'A demonstration platform for pharmaceutical product management, architected to handle complex data tables while staying secure and efficient.',
    technologies: ['React', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://pharmaceutical-demo.vercel.app/',
  },
  {
    id: 1,
    title: 'Aura Design Studio',
    industry: 'Interior Design',
    category: 'Architecture',
    description: 'A highly performant portfolio platform for a premium interior design firm, built for high-resolution media delivery without compromising load times.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://auradesignstudio.netlify.app/',
  },
  {
    id: 2,
    title: 'Designerss Creative',
    industry: 'Architecture & Interior',
    category: 'Architecture',
    description: 'A sophisticated digital catalog for a boutique architectural firm, letting the client manage complex project portfolios through a fast, accessible interface.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://designerss.netlify.app/',
  },
  {
    id: 5,
    title: 'Navnidhi Trading',
    industry: 'Corporate & Industrial',
    category: 'Corporate',
    description: 'A comprehensive, SEO-optimized corporate portal for an industrial trading enterprise, serving as a digital storefront for B2B clients.',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://navnidhitrading.netlify.app/',
  },
  {
    id: 8,
    title: 'BookVerse',
    industry: 'E-Commerce & Education',
    category: 'E-commerce',
    description: 'A scalable e-commerce backend for a digital bookstore, architected as microservices to handle secure auth and transactional workflows.',
    technologies: ['Node.js', 'Express', 'React', 'MongoDB'],
    liveUrl: 'https://online-book-store-backend-psi.vercel.app/',
    logo: '/projects/bookverse-logo.png',
  },
];

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
                          src={project.logo}
                          alt={`${project.title} logo`}
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

                  <div className="mt-auto">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary flex items-center justify-center gap-2 text-xs px-4 py-2.5 rounded-lg w-fit"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
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
