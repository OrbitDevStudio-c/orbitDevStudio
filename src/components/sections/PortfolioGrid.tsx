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
  },
  {
    id: 2,
    title: 'Lumina Interiors',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    description: 'An elegant showcase platform for a luxury home design firm with interactive 3D tours.',
  },
  {
    id: 3,
    title: 'Horizon Architects',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?auto=format&fit=crop&q=80&w=800',
    description: 'A structural portfolio site featuring high-res imagery and project timelines.',
  },
  {
    id: 4,
    title: 'Ever After Memories',
    category: 'Personal',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
    description: 'A bespoke marriage portfolio and digital invitation platform with RSVP management.',
  },
  {
    id: 5,
    title: 'NexGen Workspaces',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    description: 'A corporate platform for a leading co-working space provider with a custom booking engine.',
  },
  {
    id: 6,
    title: 'Synergy Consulting',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800',
    description: 'A lead-generating website for a regional plumbing service, complete with emergency call routing.',
  },
  {
    id: 7,
    title: 'FinancePro Dashboard',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=800',
    description: 'A secure, high-performance financial dashboard for wealth management advisors.',
  },
  {
    id: 8,
    title: 'Chapter & Verse',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800',
    description: 'A highly scalable e-commerce bookstore featuring AI-driven recommendations and secure checkout.',
  }
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="portfolio-grid" className="py-24 md:py-32 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">
              SELECTED WORKS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
              Products we've launched.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-accent hover:text-accent hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 h-[400px] md:h-[450px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gray-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1736] via-[#0B1736]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  
                  {/* Category Pill */}
                  <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {project.title}
                  </h3>
                  
                  {/* Description reveals on hover */}
                  <div className="overflow-hidden h-0 group-hover:h-[80px] transition-all duration-500 ease-in-out delay-100">
                    <p className="text-sm text-blue-100/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 pt-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Visit Button */}
                  <div className="absolute top-8 right-8">
                    <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 group-hover:scale-105 shadow-xl">
                      <ArrowUpRight size={22} strokeWidth={2.5} />
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
