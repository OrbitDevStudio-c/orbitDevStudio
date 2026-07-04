import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const categories = ['All', 'E-commerce', 'Corporate', 'Hospitality', 'Architecture', 'Personal', 'Local Business'];

const projects = [
  {
    id: 1,
    title: 'The Artisan Roastery',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    description: 'A modern, high-performance website for a boutique cafe featuring online ordering and table reservations.',
    size: 'large' // Spans 2 columns or taller
  },
  {
    id: 2,
    title: 'Lumina Interiors',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    description: 'An elegant showcase platform for a luxury home design firm with interactive 3D tours.',
    size: 'normal'
  },
  {
    id: 3,
    title: 'Horizon Architects',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?auto=format&fit=crop&q=80&w=800',
    description: 'A structural portfolio site featuring high-res imagery and project timelines.',
    size: 'normal'
  },
  {
    id: 4,
    title: 'Ever After Memories',
    category: 'Personal',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
    description: 'A bespoke marriage portfolio and digital invitation platform with RSVP management.',
    size: 'large'
  },
  {
    id: 5,
    title: 'NexGen Workspaces',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    description: 'A corporate platform for a leading co-working space provider with a custom booking engine.',
    size: 'normal'
  },
  {
    id: 6,
    title: 'Synergy Consulting',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800',
    description: 'A lead-generating website for a regional plumbing service, complete with emergency call routing.',
    size: 'normal'
  },
  {
    id: 7,
    title: 'FinancePro Dashboard',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=800',
    description: 'A secure, high-performance financial dashboard for wealth management advisors.',
    size: 'large'
  },
  {
    id: 8,
    title: 'Chapter & Verse',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800',
    description: 'A highly scalable e-commerce bookstore featuring AI-driven recommendations and secure checkout.',
    size: 'large'
  }
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="portfolio-grid" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#2E5BE5] uppercase block mb-3">
              SELECTED WORKS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0f172a]">
              Products we've launched.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-[#0f172a] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-[#2E5BE5] hover:text-[#2E5BE5]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 ${
                  project.size === 'large' ? 'md:col-span-2 row-span-2' : 'col-span-1 row-span-1'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1736]/90 via-[#0B1736]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  
                  {/* Category Pill */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/30">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  
                  {/* Description reveals on hover */}
                  <div className="overflow-hidden">
                    <p className="text-sm text-blue-100/90 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-lg">
                      {project.description}
                    </p>
                  </div>

                  {/* Visit Button */}
                  <div className="mt-auto md:mt-4 self-start">
                    <div className="w-10 h-10 rounded-full bg-white text-[#0f172a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 group-hover:scale-110">
                      <ArrowUpRight size={20} strokeWidth={2.5} />
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
