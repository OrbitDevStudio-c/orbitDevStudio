import { HeartPulse, Palette, Building2, ShoppingCart, Plane, Coffee, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const bentoItems = [
  {
    id: "healthcare",
    icon: <HeartPulse size={28} className="text-[#F36B6B]" />,
    title: "Healthcare & Medical",
    desc: "Secure, HIPAA-compliant patient portals, telemedicine platforms, and scalable clinical management systems engineered for uncompromising data integrity.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-[#0a1128] to-[#121f42] text-white border-white/10",
    tech: ["React", "Node.js", "AWS", "PostgreSQL"],
    stats: { label: "Uptime", value: "99.99%" },
    isDark: true,
  },
  {
    id: "ecommerce",
    icon: <ShoppingCart size={24} className="text-[#4F8CFF]" />,
    title: "E-Commerce",
    desc: "High-converting, globally scalable storefronts featuring lightning-fast checkouts and headless architecture.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white border-slate-200",
    tech: ["Next.js", "Shopify Plus", "Stripe"],
    isDark: false,
  },
  {
    id: "architecture",
    icon: <Building2 size={24} className="text-slate-700 group-hover:text-[#2E5BE5] transition-colors" />,
    title: "Architecture",
    desc: "Robust firm websites showcasing high-res blueprints and project timelines.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-slate-50 border-slate-200",
    tech: ["Three.js", "WebGL"],
    isDark: false,
  },
  {
    id: "interior",
    icon: <Palette size={24} className="text-slate-700 group-hover:text-[#F6B73C] transition-colors" />,
    title: "Interior Design",
    desc: "Immersive 3D visualization galleries that close premium clients.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-white border-slate-200",
    tech: ["React", "Framer"],
    isDark: false,
  },
  {
    id: "portfolio",
    icon: <Briefcase size={24} className="text-slate-700 group-hover:text-[#B08CFF] transition-colors" />,
    title: "Custom Portfolios",
    desc: "Bespoke digital resumes, creative showcases, and interactive wedding portals that tell your unique story beautifully.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white border-slate-200",
    tech: ["Gatsby", "Tailwind"],
    isDark: false,
  },
  {
    id: "travel",
    icon: <Plane size={24} className="text-slate-700 group-hover:text-[#52C854] transition-colors" />,
    title: "Travel Agencies",
    desc: "Dynamic booking engines and automated ticketing systems.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-slate-50 border-slate-200",
    tech: ["GraphQL", "Redis"],
    isDark: false,
  },
  {
    id: "cafe",
    icon: <Coffee size={24} className="text-slate-700 group-hover:text-[#F36B6B] transition-colors" />,
    title: "Restaurant",
    desc: "QR menu systems and real-time reservations.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-white border-slate-200",
    tech: ["React Native"],
    isDark: false,
  }
];

export default function IndustriesGrid() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative z-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 tracking-tight">
            Industries We Build For
          </h2>
          <p className="text-slate-500 text-[16px] leading-relaxed">
            We don't just write code — we engineer handcrafted, interactive solutions tailored to the specific business logic, regulatory requirements, and high aesthetic standards of your sector.
          </p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-[#2E5BE5] font-semibold hover:text-[#1B3675] transition-colors group">
          View All Case Studies
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] gap-6">
        {bentoItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`group relative overflow-hidden rounded-[32px] p-8 border hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col ${item.className}`}
          >
            {/* Ambient Glass Highlight for Dark Cards */}
            {item.isDark && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E5BE5] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            )}

            <div className="relative z-10 flex flex-col h-full">
              
              {/* Header: Icon & Title */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${item.isDark ? 'bg-white/10 border border-white/10' : 'bg-white border border-slate-100 shadow-sm'}`}>
                  {item.icon}
                </div>
                {item.stats && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white tracking-tight">{item.stats.value}</div>
                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{item.stats.label}</div>
                  </div>
                )}
              </div>
              
              <h3 className={`text-xl font-bold mb-3 tracking-tight ${item.isDark ? 'text-white' : 'text-[#0f172a]'}`}>
                {item.title}
              </h3>
              
              <p className={`text-[14px] leading-relaxed mb-8 flex-grow ${item.isDark ? 'text-white/70' : 'text-slate-500'}`}>
                {item.desc}
              </p>
              
              {/* Footer: Tech Stack & CTA */}
              <div className="mt-auto flex items-center justify-between border-t border-inherit pt-5 border-opacity-10">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.tech.map(t => (
                    <span key={t} className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide ${item.isDark ? 'bg-white/10 text-white/90' : 'bg-slate-100 text-slate-600'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${item.isDark ? 'bg-white text-[#0a1128]' : 'bg-[#2E5BE5] text-white'}`}>
                  <ArrowRight size={14} />
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
}
