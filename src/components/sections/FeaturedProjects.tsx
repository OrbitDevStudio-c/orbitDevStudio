import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiTailwindcss, SiVuedotjs, SiPostgresql } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import type { IconType } from 'react-icons';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: IconType[];
  span: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'The Artisan Roastery',
    category: 'Hospitality',
    description: 'A modern, high-performance website for a boutique cafe featuring online ordering and table reservations.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80',
    tech: [SiReact, SiNodedotjs, SiTailwindcss],
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 2,
    title: 'Lumina Interiors',
    category: 'Architecture',
    description: 'An elegant showcase platform for a luxury home design firm with interactive 3D tours.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80',
    tech: [SiNextdotjs, SiTypescript, FaAws],
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 3,
    title: 'NexGen Workspaces',
    category: 'Corporate',
    description: 'A corporate platform for a leading co-working space provider with a custom booking engine.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    tech: [SiVuedotjs, SiNodedotjs, SiPostgresql],
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 4,
    title: 'Chapter & Verse',
    category: 'E-commerce',
    description: 'A highly scalable e-commerce bookstore featuring AI-driven recommendations and secure checkout.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80',
    tech: [SiNextdotjs, SiReact, FaAws],
    span: 'md:col-span-1 md:row-span-1',
  },
];

export default function FeaturedProjects() {
  return (
    <section className="section-white py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] block mb-3">Selected Work</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">Featured Projects</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/portfolio"
              className="text-gray-600 hover:text-accent flex items-center gap-2 text-sm font-medium transition-colors group"
            >
              View all projects 
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:grid-rows-[300px_300px]">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`group relative overflow-hidden card-white flex flex-col cursor-pointer ${project.span}`}
            >
              {/* Image Container (Top half) */}
              <div className="w-full h-1/2 md:h-[55%] relative overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Content (Bottom half) */}
              <div className="relative z-20 flex-1 p-6 flex flex-col bg-white">
                <span className="text-accent text-[11px] font-bold tracking-wider uppercase mb-1.5">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-primary text-xs font-semibold flex items-center gap-1.5 group-hover:text-accent transition-colors">
                    View case study <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <div className="flex items-center gap-2">
                    {project.tech.map((Icon, i) => (
                      <Icon key={i} size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
