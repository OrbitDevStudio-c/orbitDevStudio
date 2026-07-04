import { HeartPulse, Palette, Building2, ShoppingCart, Plane, Coffee, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    bgImage: "https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=800&auto=format&fit=crop"
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
      
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px] -z-10" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Industries We Build For
          </h2>
          <p className="text-slate-500 text-[16px] leading-relaxed">
            We don't just write code — we engineer handcrafted, interactive solutions tailored to the specific business logic, regulatory requirements, and high aesthetic standards of your sector.
          </p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors group">
          View All Case Studies
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
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
            className={`group relative overflow-hidden rounded-[32px] p-8 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col backdrop-blur-xl ${
              item.isDark ? 'bg-slate-900/90 text-white border-slate-700' : 'bg-white/60 text-slate-900'
            } ${item.className}`}
          >
            {/* Ambient Glass Highlight & Image for Dark Cards */}
            {item.isDark && (
              <>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0" />
                {item.bgImage && (
                  <div className="absolute inset-0 z-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700 mix-blend-overlay">
                    <img src={item.bgImage} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </>
            )}

            <div className="relative z-10 flex flex-col h-full">
              
              {/* Header: Icon & Title */}
              <div className="flex items-start justify-between mb-6 shrink-0">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${item.isDark ? 'bg-white/10 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
                  {item.icon}
                </div>
                {item.stats && (
                  <div className="text-right">
                    <div className="text-2xl font-bold tracking-tight">{item.stats.value}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider ${item.isDark ? 'text-white/50' : 'text-slate-400'}`}>{item.stats.label}</div>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-3 tracking-tight shrink-0">
                {item.title}
              </h3>
              
              <p className={`text-[14px] leading-relaxed mb-8 shrink-0 ${item.isDark ? 'text-white/70' : 'text-slate-500'}`}>
                {item.desc}
              </p>
              
              {/* Optional Inline Image to fill large cards */}
              {item.isDark && item.bgImage && (
                <div className="flex-1 w-full min-h-[120px] rounded-2xl overflow-hidden mb-8 border border-white/10 relative shadow-2xl shrink-0 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-shadow duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                  <img src={item.bgImage} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white/90 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> Live System Preview
                  </div>
                </div>
              )}
              
              {/* Spacer to push footer to bottom if no inline image fills the flex */}
              {!item.isDark && <div className="flex-grow" />}

              {/* Footer: Tech Stack & CTA */}
              <div className="mt-auto flex items-center justify-between border-t border-slate-200/50 pt-5 shrink-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.tech.map(t => (
                    <span key={t} className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide ${item.isDark ? 'bg-white/10 text-white/90' : 'bg-white/80 text-slate-600 border border-slate-200/50'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${item.isDark ? 'bg-white text-slate-900' : 'bg-blue-600 text-white'}`}>
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
