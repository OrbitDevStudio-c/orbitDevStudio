import { HeartPulse, Palette, Building2, ShoppingCart, Plane, Coffee, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const bentoItems = [
  {
    id: "healthcare",
    icon: <HeartPulse size={28} className="text-white" />,
    title: "Healthcare & Medical",
    desc: "Secure, HIPAA-compliant patient portals, telemedicine platforms, and scalable clinical management systems engineered for uncompromising data integrity.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
    tech: ["React", "Node.js", "AWS", "PostgreSQL"],
    stats: { label: "Uptime", value: "99.99%" },
    isDark: true,
    bgImage: "/healthcare.webp"
  },
  {
    id: "ecommerce",
    icon: <ShoppingCart size={24} className="text-accent" />,
    title: "E-Commerce",
    desc: "High-converting, globally scalable storefronts featuring lightning-fast checkouts and headless architecture.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    tech: ["Next.js", "Shopify Plus", "Stripe"],
    isDark: true,
  },
  {
    id: "architecture",
    icon: <Building2 size={24} className="text-slate-300 group-hover:text-white transition-colors" />,
    title: "Architecture",
    desc: "Robust firm websites showcasing high-res blueprints and project timelines.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    tech: ["Three.js", "WebGL"],
    isDark: true,
  },
  {
    id: "interior",
    icon: <Palette size={24} className="text-slate-300 group-hover:text-white transition-colors" />,
    title: "Interior Design",
    desc: "Immersive 3D visualization galleries that close premium clients.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    tech: ["React", "Framer"],
    isDark: true,
  },
  {
    id: "portfolio",
    icon: <Briefcase size={24} className="text-slate-300 group-hover:text-white transition-colors" />,
    title: "Custom Portfolios",
    desc: "Bespoke digital resumes, creative showcases, and interactive wedding portals that tell your unique story beautifully.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    tech: ["Gatsby", "Tailwind"],
    isDark: true,
  },
  {
    id: "travel",
    icon: <Plane size={24} className="text-slate-300 group-hover:text-white transition-colors" />,
    title: "Travel Agencies",
    desc: "Dynamic booking engines and automated ticketing systems.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    tech: ["GraphQL", "Redis"],
    isDark: true,
  },
  {
    id: "cafe",
    icon: <Coffee size={24} className="text-slate-300 group-hover:text-white transition-colors" />,
    title: "Restaurant",
    desc: "QR menu systems and real-time reservations.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    tech: ["React Native"],
    isDark: true,
  }
];

export default function IndustriesGrid() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative z-10">
      
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-[100px] -z-10" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-white mb-6 tracking-tight">
            Industries We Build For
          </h2>
          <p className="text-slate-400 text-[16px] leading-relaxed">
            We don't just write code — we engineer handcrafted, interactive solutions tailored to the specific business logic, regulatory requirements, and high aesthetic standards of your sector.
          </p>
        </div>
        <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-accent font-semibold hover:text-accent/90 transition-colors group">
          View All Case Studies
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[320px] gap-6">
        {bentoItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`group relative overflow-hidden card-dark hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col backdrop-blur-xl ${item.className}`}
          >
            <Link to="/portfolio" className="absolute inset-0 z-20 cursor-pointer" aria-label={`View ${item.title} case studies`} />
            
            {/* Ambient Glass Highlight & Image for Dark Cards */}
            <>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0 pointer-events-none" />
              {item.bgImage && (
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 mix-blend-overlay pointer-events-none">
                  <img src={item.bgImage} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
              )}
            </>

            <div className="relative z-10 flex flex-col h-full pointer-events-none p-8">
              
              {/* Header: Icon & Title */}
              <div className="flex items-start justify-between mb-6 shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 bg-white/5 border border-white/10">
                  {item.icon}
                </div>
                {item.stats && (
                  <div className="text-right">
                    <div className="text-2xl font-bold tracking-tight text-white">{item.stats.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">{item.stats.label}</div>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-3 tracking-tight shrink-0 text-white">
                {item.title}
              </h3>
              
              <p className="text-[14px] leading-relaxed mb-8 shrink-0 text-white/70">
                {item.desc}
              </p>
              
              {/* Optional Inline Image to fill large cards */}
              {item.bgImage && (
                <div className="flex-1 w-full min-h-[120px] rounded-2xl overflow-hidden mb-8 border border-white/10 relative shadow-2xl shrink-0 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-shadow duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                  <img src={item.bgImage} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white/90 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> Live System Preview
                  </div>
                </div>
              )}

              {/* Footer: Tech Stack & CTA */}
              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 shrink-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-white/10 text-white/90">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-white text-slate-900">
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
