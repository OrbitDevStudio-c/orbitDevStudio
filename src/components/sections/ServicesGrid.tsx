import { Smartphone, Monitor, Lightbulb, TerminalSquare, Cpu, LineChart, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { services } from '../../data/services';

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Monitor,
  Lightbulb,
  TerminalSquare,
  Cpu,
  LineChart,
  ShieldCheck
};

function getMicroUI(id: string) {
  switch (id) {
    case 'web':
      return (
        <div className="flex flex-wrap gap-2 mt-6">
          {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind'].map(tech => (
            <span key={tech} className="px-3 py-1 bg-[#244CB3]/5 text-[#244CB3] text-xs font-semibold rounded-full border border-[#244CB3]/10">
              {tech}
            </span>
          ))}
        </div>
      );
    case 'mobile':
      return (
        <div className="flex items-center gap-3 mt-6">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">iOS</div>
            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">And</div>
          </div>
          <span className="text-xs font-medium text-slate-400">Native & Hybrid</span>
        </div>
      );
    case 'custom':
      return (
        <div className="flex gap-4 mt-6 border-t border-slate-100 pt-4">
          <div>
            <div className="text-xl font-bold text-[#1a2b4b]">150+</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Systems Shipped</div>
          </div>
          <div className="w-px h-8 bg-slate-100"></div>
          <div>
            <div className="text-xl font-bold text-[#1a2b4b]">0</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Tech Debt</div>
          </div>
        </div>
      );
    case 'qa':
      return (
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg text-emerald-600 text-xs font-bold border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          99.9% Reliability
        </div>
      );
    default:
      return null;
  }
}

export default function ServicesGrid() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full relative z-10">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b4b] mb-4 tracking-tight">
          Capabilities engineered for scale.
        </h2>
        <p className="text-slate-500 text-[15px] max-w-xl mx-auto">
          We combine deep technical expertise with world-class design to build products that dominate their markets.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(220px,auto)]">
        {services.map((service, index) => {
          const Icon = iconMap[service.iconName];
          const microUI = getMicroUI(service.id);
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${service.className}`}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="text-[#244CB3] w-12 h-12 rounded-2xl bg-[#244CB3]/5 flex items-center justify-center border border-[#244CB3]/10 group-hover:scale-110 group-hover:bg-[#244CB3] group-hover:text-white transition-all duration-300">
                  {Icon && <Icon size={22} />}
                </div>
                <h3 className="text-lg font-bold text-[#1a2b4b] tracking-tight">{service.title}</h3>
              </div>
              
              <p className="text-slate-500 text-[14px] leading-relaxed flex-grow">
                {service.desc}
              </p>
              
              {/* Render micro-UI if it exists */}
              {microUI && (
                <div className="mt-auto pt-4">
                  {microUI}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
    </section>
  );
}
