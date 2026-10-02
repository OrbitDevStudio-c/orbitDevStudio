import { Smartphone, Monitor, Lightbulb, TerminalSquare, Cpu, LineChart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    id: "web",
    icon: <Monitor size={22} className="services-icon" />,
    title: "Web Application Engineering",
    desc: "Our engineers deliver full-stack web applications — from SaaS dashboards and customer portals to complex e-commerce platforms. Architected for performance, accessibility, and long-term maintainability.",
    className: "md:col-span-2", // Large
    microUI: (
      <div className="flex flex-wrap gap-2 mt-6">
        {[
          { name: 'React', chip: 'chip-amber' },
          { name: 'Next.js', chip: 'chip-blue' },
          { name: 'Node.js', chip: 'chip-green' },
          { name: 'TypeScript', chip: 'chip-purple' },
          { name: 'Tailwind', chip: 'chip-cyan' },
        ].map(tech => (
          <span key={tech.name} className={`${tech.chip} px-3 py-1 text-[11px] font-bold rounded-full shadow-sm`}>
            <span className="chip-dot" />
            {tech.name}
          </span>
        ))}
      </div>
    )
  },
  {
    id: "mobile",
    icon: <Smartphone size={22} className="services-icon" />,
    title: "Mobile Development",
    desc: "We build high-performance native and cross-platform apps that combine pixel-perfect design with blazing-fast performance.",
    className: "md:col-span-1", // Medium
    microUI: (
      <div className="flex items-center gap-3 mt-6">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#101A2D] border-2 border-[#1677ff]/40 text-[#5b9dff] flex items-center justify-center text-[9px] font-bold">iOS</div>
          <div className="w-8 h-8 rounded-full bg-[#101A2D] border-2 border-[#52C854]/40 text-[#52C854] flex items-center justify-center text-[9px] font-bold">And</div>
        </div>
        <span className="chip-cyan px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
          <span className="chip-dot" />
          Native &amp; Hybrid
        </span>
      </div>
    )
  },
  {
    id: "ux",
    icon: <Lightbulb size={22} className="services-icon" />,
    title: "UX/UI & Product Design",
    desc: "We craft intuitive digital experiences through research-backed UX strategy, modern UI design systems, and interactive prototyping.",
    className: "md:col-span-1", // Medium
  },
  {
    id: "custom",
    icon: <TerminalSquare size={22} className="services-icon" />,
    title: "Custom Software Solutions",
    desc: "We develop bespoke software systems precisely aligned with your workflows — from automation engines to enterprise data pipelines. Built to scale, maintained to last.",
    className: "md:col-span-2", // Large
    microUI: (
      <div className="flex gap-6 mt-6 border-t border-white/10 pt-5">
        <div>
          <div className="text-xl font-black text-[#5b9dff] light:text-[#1677ff] mb-1">10+</div>
          <div className="text-[10px] services-metric-label uppercase tracking-[0.1em] font-bold">Systems Shipped</div>
        </div>
        <div className="w-px h-10 bg-white/10"></div>
        <div>
          <div className="text-xl font-black text-[#52C854] light:text-[#16a34a] mb-1">0</div>
          <div className="text-[10px] services-metric-label uppercase tracking-[0.1em] font-bold">Tech Debt</div>
        </div>
      </div>
    )
  },
  {
    id: "ai",
    icon: <Cpu size={22} className="services-icon" />,
    title: "AI & Emerging Tech",
    desc: "From AI-powered resume screening to full RAG knowledge assistants with voice interfaces, we integrate LLMs into products that ship — not demos.",
    className: "md:col-span-1", // Small
    microUI: (
      <div className="flex flex-wrap gap-2 mt-6">
        {[
          { name: 'OpenAI', chip: 'chip-amber' },
          { name: 'OpenRouter AI', chip: 'chip-blue' },
          { name: 'LiveKit', chip: 'chip-purple' },
          { name: 'RAG', chip: 'chip-cyan' },
        ].map(tech => (
          <span key={tech.name} className={`${tech.chip} px-3 py-1 text-[11px] font-bold rounded-full shadow-sm`}>
            <span className="chip-dot" />
            {tech.name}
          </span>
        ))}
      </div>
    )
  },
  {
    id: "growth",
    icon: <LineChart size={22} className="services-icon" />,
    title: "Growth Engineering",
    desc: "Data-driven strategies that increase traffic and accelerate revenue.",
    className: "md:col-span-1", // Small
  },
  {
    id: "qa",
    icon: <ShieldCheck size={22} className="services-icon" />,
    title: "QA & Testing",
    desc: "Rigorous automated and manual validation for flawless releases.",
    className: "md:col-span-1", // Small
    microUI: (
      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg services-reliability-text text-[11px] uppercase tracking-wider font-bold border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        99.9% Reliability
      </div>
    )
  }
];

export default function ServicesGrid() {
  return (
    <section className="bg-[#101A2D] w-full relative z-10 overflow-hidden">
      <div className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full relative z-10">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white light:text-slate-900 mb-4 tracking-tight">
          Capabilities engineered for scale.
        </h2>
        <p className="text-[#C7D2E4] text-[15px] max-w-xl mx-auto leading-relaxed">
          We combine deep technical expertise with world-class design to build products that dominate their markets.
        </p>
      </div>

      {/* Bento Grid Layout */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(220px,auto)]">
  {services.map((service, index) => (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`services-card group p-8 rounded-[24px] flex flex-col relative overflow-hidden ${service.className}`}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-5">
        <div className="services-icon-wrap relative w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
          {service.icon}
        </div>

        <h3 className="services-title text-lg font-bold tracking-tight">
          {service.title}
        </h3>
      </div>

      {/* Description */}
      <p className="services-desc text-[14px] leading-relaxed flex-grow">
        {service.desc}
      </p>

      {/* Micro UI */}
      {service.microUI && (
        <div className="mt-auto pt-4">
          {service.microUI}
        </div>
      )}
    </motion.div>
  ))}
</div>
      
      </div>
    </section>
  );
}
