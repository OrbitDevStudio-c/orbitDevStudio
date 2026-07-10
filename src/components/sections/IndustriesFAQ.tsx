import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    id: 1,
    question: "Do you specialize in specific technologies for different industries?",
    answer: "Yes. We don't believe in one-size-fits-all. While we often use React and Node.js across the board, a healthcare app might rely heavily on AWS HIPAA-eligible services and PostgreSQL, whereas an e-commerce platform might leverage Next.js, Shopify Plus, and Redis for sub-second global rendering."
  },
  {
    id: 2,
    question: "How do your servers handle a sudden viral spike in user traffic?",
    answer: "We engineer cloud-native, serverless, or auto-scaling containerized architectures (like AWS ECS or Vercel edge networks). This ensures that if your application experiences a massive traffic surge, the infrastructure instantly scales horizontally to handle the load without downtime."
  },
  {
    id: 3,
    question: "How do you protect sensitive data and ensure compliance (e.g. HIPAA, SOC2)?",
    answer: "Security is built into our DNA. We implement zero-trust architectures, end-to-end bank-grade encryption (AES-256), strict role-based access controls (RBAC), and automated vulnerability scanning to ensure you meet all regulatory compliance requirements before launch."
  },
  {
    id: 4,
    question: "Can you build custom telemetry and analytics dashboards?",
    answer: "Absolutely. We often integrate tools like Mixpanel, Datadog, or custom ELK stacks to provide real-time visibility into your specific KPIs—whether that's user conversion rates in e-commerce or API latency in financial systems."
  },
  {
    id: 5,
    question: "How do you reduce latency for real-time applications?",
    answer: "We utilize Edge computing, optimized CDN routing, and WebSocket connections to ensure data is processed as close to the user as possible, keeping latency in the low milliseconds."
  }
];

export default function IndustriesFAQ() {
  const [openId, setOpenId] = useState<number | null>(1); // Open first by default

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative z-10">
      
      {/* Optional faint grid background for FAQ area as seen in screenshot */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iMCIvPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSI0MCIvPjwvZz48L3N2Zz4=')] z-0 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col">
          
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#2E5BE5]/5 text-[#2E5BE5] text-[11px] font-bold tracking-wider uppercase mb-8 border border-[#2E5BE5]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E5BE5]" />
            FAQ
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2b4b] tracking-tight mb-12">
            Frequently Asked Questions
          </h2>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center gap-2 text-[#1a2b4b] font-bold text-[11px] tracking-wider uppercase mb-4">
              <MessageSquare size={16} className="text-[#2E5BE5]" />
              Need a direct answer?
            </div>
            <p className="text-slate-500 text-[14px] leading-relaxed mb-6">
              Need guidance? Our senior engineering experts are ready to guide you.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 text-[#1a2b4b] font-bold text-[14px] hover:text-[#2E5BE5] transition-colors group"
            >
              Talk to our experts
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Right Column - Accordion */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm cursor-pointer overflow-hidden transition-all duration-300 hover:border-slate-200"
              >
                <div className="p-6 flex items-center justify-between gap-6">
                  <h3 className={`text-[15px] font-bold transition-colors duration-300 ${isOpen ? 'text-[#1a2b4b]' : 'text-slate-700'}`}>
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#1a2b4b] text-white' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-500 text-[14px] leading-relaxed border-t border-slate-50 mx-6 mt-2">
                        <div className="pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
