import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const categories = ['All', 'Architecture', 'Healthcare', 'Corporate', 'E-commerce', 'Personal', 'Industrial'];

const projects = [
  {
    id: 1,
    title: 'Aura Design Studio',
    industry: 'Interior Design',
    category: 'Architecture',
    tagline: 'Modern spaces, beautifully presented.',
    description: 'We engineered a highly performant portfolio platform for a premium interior design firm. The architecture emphasizes high-resolution media delivery without compromising load times, utilizing modern frontend frameworks to craft smooth, hardware-accelerated transitions that mirror the elegance of their physical spaces.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    services: ['Frontend Development', 'UI/UX Design', 'Performance Optimization'],
    liveUrl: 'https://auradesignstudio.netlify.app/',
    screenshot: '/projects/designerss.png',
    gridSpan: 'md:col-span-1 lg:col-span-7',
  },
  {
    id: 2,
    title: 'Designerss Creative',
    industry: 'Architecture & Interior',
    category: 'Architecture',
    tagline: 'Architectural vision meets digital precision.',
    description: 'A sophisticated digital catalog for a boutique architectural firm. Our engineering team developed a robust frontend that allows the client to seamlessly manage complex project portfolios while maintaining a sleek, fast, and accessible user interface.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    services: ['Frontend Development', 'Responsive Design'],
    liveUrl: 'https://designerss.netlify.app/',
    screenshot: '/projects/des.jpeg',
    gridSpan: 'md:col-span-1 lg:col-span-5',
  },
  {
    id: 3,
    title: 'PharmaCare Platform',
    industry: 'Healthcare & Pharma',
    category: 'Healthcare',
    tagline: 'Secure, scalable healthcare technology.',
    description: 'A robust demonstration platform showcasing pharmaceutical product management. We architected a scalable frontend capable of handling complex data tables and state management, ensuring medical professionals can securely and efficiently access critical product documentation.',
    technologies: ['React', 'Node.js', 'Tailwind CSS'],
    services: ['Full-stack Development', 'Data Visualization'],
    liveUrl: 'https://pharmaceutical-demo.vercel.app/',
    screenshot: '/projects/pharmacare.png',
    gridSpan: 'md:col-span-1 lg:col-span-5',
  },
  {
    id: 4,
    title: 'Elegant Wedding',
    industry: 'Personal Branding',
    category: 'Personal',
    tagline: 'A seamless digital celebration.',
    description: 'A bespoke personal branding and digital invitation platform. Our focus was on engineering a deeply personalized, immersive experience utilizing complex CSS animations and state-driven storytelling, wrapped in a lightweight web application.',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    services: ['UI/UX Design', 'Frontend Development'],
    liveUrl: 'https://wedding-portfolio-lilac.vercel.app/',
    screenshot: '/projects/wedding.png',
    gridSpan: 'md:col-span-1 lg:col-span-7',
  },
  {
    id: 5,
    title: 'Navnidhi Trading',
    industry: 'Corporate & Industrial',
    category: 'Corporate',
    tagline: 'Modernizing industrial supply chains.',
    description: 'A comprehensive corporate portal for an industrial trading enterprise. We delivered a highly performant, SEO-optimized platform that serves as a digital storefront for B2B clients, integrating robust product categorization and streamlined inquiry workflows.',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    services: ['Frontend Development', 'SEO Optimization'],
    liveUrl: 'https://navnidhitrading.netlify.app/',
    screenshot: '/projects/navnidhi.png',
    gridSpan: 'md:col-span-1 lg:col-span-7',
  },
  {
    id: 7,
    title: 'ShivedLife Medicare',
    industry: 'Healthcare',
    category: 'Healthcare',
    tagline: 'Connecting patients with care.',
    description: 'A secure, accessible platform designed for a regional healthcare provider. Our team engineered a compliant, mobile-first interface that facilitates seamless patient navigation and critical information retrieval under strict performance budgets.',
    technologies: ['React', 'Next.js', 'TypeScript'],
    services: ['Frontend Development', 'Accessibility'],
    liveUrl: 'https://shivedlifemedicare.vercel.app/',
    screenshot: '/projects/shivedlife.png',
    gridSpan: 'md:col-span-1 lg:col-span-5',
  },
  {
    id: 8,
    title: 'BookVerse',
    industry: 'E-Commerce & Education',
    category: 'E-commerce',
    tagline: 'A scalable marketplace for knowledge.',
    description: 'A robust e-commerce backend and frontend integration for a digital bookstore. We architected a scalable microservices-oriented backend utilizing Node.js and MongoDB to handle secure user authentication and seamless transactional workflows.',
    technologies: ['Node.js', 'Express', 'React', 'MongoDB'],
    services: ['Backend Development', 'API Integration'],
    liveUrl: 'https://online-book-store-backend-psi.vercel.app/',
    screenshot: '/projects/online.png',
    gridSpan: 'md:col-span-2 lg:col-span-12',
  }
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="portfolio-grid" className="py-24 md:py-32 relative overflow-hidden bg-navy border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">
              SELECTED WORKS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Products we've launched.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                  ? 'bg-accent text-white shadow-lg shadow-accent/20 scale-105'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:border-white/30 hover:text-accent hover:shadow-sm hover:bg-white/10'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 auto-rows-[450px] md:auto-rows-[550px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col bg-slate-900 border border-white/10 shadow-sm hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 col-span-1 ${project.gridSpan}`}
              >
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/0 group-hover:bg-blue-500/[0.06] blur-[100px] transition-colors duration-700 pointer-events-none z-0" />

                {/* macOS Browser Wrapper */}
                <div className="w-full h-full flex flex-col relative z-10 transform group-hover:-translate-y-1.5 group-hover:scale-[1.01] transition-transform duration-500 ease-out">

                  {/* Browser Header */}
                  <div className="h-10 bg-[#1e293b] flex items-center px-4 shrink-0 border-b border-slate-700/50 rounded-t-2xl">
                    <div className="flex gap-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-surface/60 rounded-md px-4 py-1 text-[10px] text-slate-400 font-medium truncate max-w-[200px] border border-slate-700/50">
                        {project.liveUrl.replace('https://', '')}
                      </div>
                    </div>
                  </div>

                  {/* Browser Body / Image instead of heavy iframe */}
                  <div className="flex-1 relative bg-slate-950 overflow-hidden rounded-b-2xl">

                    <img
                      src={project.screenshot}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      width={640}
                      height={400}
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                      <div className="transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 ease-out">

                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-md text-[9px] font-bold uppercase tracking-wider text-white border border-white/20">
                            {project.industry}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                          {project.title}
                        </h3>

                        <p className="text-sm text-slate-300 leading-relaxed mb-5 line-clamp-3 font-light">
                          {project.description}
                        </p>

                        {/* Technology Chips */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 4).map(tech => (
                            <span key={tech} className="px-2 py-1 bg-[#1E2A4A]/60 border border-accent/30 rounded text-[10px] font-semibold text-blue-100 backdrop-blur-md">
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
                            className="flex items-center gap-2 text-xs font-semibold text-white bg-accent hover:bg-blue-500 px-4 py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Live Demo <ExternalLink size={14} />
                          </a>
                          <button
                            className="flex items-center gap-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-lg transition-colors border border-white/10"
                            onClick={(e) => { e.stopPropagation(); /* Case study trigger */ }}
                          >
                            Case Study <ArrowRight size={14} />
                          </button>
                        </div>

                      </div>
                    </div>

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
