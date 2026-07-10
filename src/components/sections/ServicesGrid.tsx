import { Smartphone, Monitor, Lightbulb, TerminalSquare, Cpu, LineChart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    id: "web",
    icon: <Monitor size={22} />,
    title: "Web Application Engineering",
    desc: "Our engineers deliver full-stack web applications — from SaaS dashboards and customer portals to complex e-commerce platforms. Architected for performance, accessibility, and long-term maintainability.",
    className: "md:col-span-2", // Large
    microUI: (
      <div className="flex flex-wrap gap-2 mt-6">
        {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind'].map(tech => (
          <span key={tech} className="px-3 py-1 bg-[#1E2A4A]/5 text-[white] text-xs font-semibold rounded-full border border-[#1E2A4A]/10">
            {tech}
          </span>
        ))}
      </div>
    )
  },
  {
    id: "mobile",
    icon: <Smartphone size={22} />,
    title: "Mobile Development",
    desc: "We build high-performance native and cross-platform apps that combine pixel-perfect design with blazing-fast performance.",
    className: "md:col-span-1", // Medium
    microUI: (
      <div className="flex items-center gap-3 mt-6">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-navy-deep border-2 border-white/20 flex items-center justify-center text-[10px] font-bold text-white/70">iOS</div>
          <div className="w-8 h-8 rounded-full bg-navy-deep border-2 border-white/20 flex items-center justify-center text-[10px] font-bold text-white/70">And</div>
        </div>
        <span className="text-xs font-medium text-white/60">Native & Hybrid</span>
      </div>
    )
  },
  {
    id: "ux",
    icon: <Lightbulb size={22} />,
    title: "UX/UI & Product Design",
    desc: "We craft intuitive digital experiences through research-backed UX strategy, modern UI design systems, and interactive prototyping.",
    className: "md:col-span-1", // Medium
  },
  {
    id: "custom",
    icon: <TerminalSquare size={22} />,
    title: "Custom Software Solutions",
    desc: "We develop bespoke software systems precisely aligned with your workflows — from automation engines to enterprise data pipelines. Built to scale, maintained to last.",
    className: "md:col-span-2", // Large
    microUI: (
      <div className="flex gap-4 mt-6 border-t border-white/10 pt-4">
        <div>
          <div className="text-xl font-bold text-white">10+</div>
          <div className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">Systems Shipped</div>
        </div>
        <div className="w-px h-8 bg-white/10"></div>
        <div>
          <div className="text-xl font-bold text-white">0</div>
          <div className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">Tech Debt</div>
        </div>
      </div>
    )
  },
  {
    id: "ai",
    icon: <Cpu size={22} />,
    title: "AI & Emerging Tech",
    desc: "Integrate intelligent automation and LLM capabilities into your products.",
    className: "md:col-span-1", // Small
  },
  {
    id: "growth",
    icon: <LineChart size={22} />,
    title: "Growth Engineering",
    desc: "Data-driven strategies that increase traffic and accelerate revenue.",
    className: "md:col-span-1", // Small
  },
  {
    id: "qa",
    icon: <ShieldCheck size={22} />,
    title: "QA & Testing",
    desc: "Rigorous automated and manual validation for flawless releases.",
    className: "md:col-span-1", // Small
    microUI: (
      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 text-xs font-bold border border-emerald-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        99.9% Reliability
      </div>
    )
  }
];

export default function ServicesGrid() {
  return (
    <section className="bg-navy-deep w-full relative z-10 overflow-hidden">
      <div className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full relative">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Capabilities engineered for scale.
        </h2>
        <p className="text-white/70 text-[15px] max-w-xl mx-auto">
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
      className={`group bg-[linear-gradient(180deg,rgba(25,38,70,0.92),rgba(16,22,38,0.95))] rounded-[24px] p-8 border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(79,140,255,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden ${service.className}`}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-accent group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(79,140,255,0.15)] group-hover:shadow-[0_0_25px_rgba(79,140,255,0.3)]">
          {service.icon}
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight">
          {service.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-white/70 text-[14px] leading-relaxed flex-grow">
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
