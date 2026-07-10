import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const domains = [
  {
    id: "ai",
    label: "AI / ML / IOT DEVELOPMENT",
    services: [
      "AI Development Services",
      "AI/ML Development",
      "AI Agent Development Services",
      "AI Consulting Services",
      "AI Staffing Agency",
      "IoT Development"
    ]
  },
  {
    id: "web",
    label: "WEB & MOBILE APP DEVELOPMENT",
    services: [
      "Custom Web App Development",
      "React & Next.js Solutions",
      "Native iOS & Android Apps",
      "Cross-Platform Mobile Apps",
      "UI/UX & Interactive Design",
      "E-commerce Platforms"
    ]
  },
  {
    id: "digital",
    label: "DIGITAL / IT SERVICES",
    services: [
      "Cloud Architecture & Migration",
      "DevOps & CI/CD Setup",
      "Performance Marketing & SEO",
      "Quality Assurance & Testing",
      "Data Analytics & BI",
      "Legacy Modernization"
    ]
  }
];

export default function ServicesDomains() {
  const [activeTab, setActiveTab] = useState(domains[0].id);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 w-full relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Pill header */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50/50 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[#244CB3] mr-2" />
          <span className="text-[10px] font-bold tracking-[0.1em] text-[#244CB3] uppercase">Service Categories</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-[white] mb-4">
          Explore Solutions by Business Domain
        </h2>
        <p className="text-slate-500 text-[14px] max-w-2xl mx-auto mb-12">
          Browse our specialized service categories — each built around real business challenges — to find the digital solutions that will have the most impact on your growth and operations.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {domains.map((domain) => (
            <button
              key={domain.id}
              onClick={() => setActiveTab(domain.id)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 border
                ${activeTab === domain.id 
                  ? 'bg-[#1a3675] border-[#1a3675] text-white shadow-md' 
                  : 'bg-white border-slate-200 text-[#1a2b4b] hover:border-slate-300'
                }
              `}
            >
              {domain.label}
            </button>
          ))}
        </div>

        {/* Sub-services Grid */}
        <div className="relative min-h-[160px]">
          <AnimatePresence mode="wait">
            {domains.map((domain) => {
              if (domain.id !== activeTab) return null;
              
              return (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {domain.services.map((service) => (
                    <Link
                      key={service}
                      to="/contact"
                      className="group flex items-center justify-between p-5 rounded-2xl bg-[#1a3675] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#4F8CFF]/30 transition-all text-left"
                    >
                      <span className="text-[13px] font-semibold text-[white] group-hover:text-[#4F8CFF] transition-colors">
                        {service}
                      </span>
                      <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#4F8CFF] group-hover:border-[#4F8CFF] group-hover:text-white transition-all">
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
