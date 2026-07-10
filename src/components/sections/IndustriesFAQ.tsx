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
 <section
  className="bg-navy-soft relative overflow-hidden py-16 md:py-20 px-6 md:px-12 lg:px-24"
  style={{
    background:
      "radial-gradient(circle at 90% 90%, rgba(59,130,246,0.15) 0%, transparent 35%), linear-gradient(135deg,#16233B 0%,#101827 45%,#0A0A0C 100%)",
  }}
>
  {/* Background Pattern */}
  <div
    className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{
      backgroundImage:
        "radial-gradient(circle,#ffffff 1px,transparent 1px)",
      backgroundSize: "28px 28px",
    }}
  />

  {/* Blue Glow */}
  <div className="absolute -bottom-52 -right-40 h-[700px] w-[700px] rounded-full bg-blue-600/20 blur-[180px]" />

  <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

    {/* Left */}
    <div className="lg:col-span-4 flex flex-col">

      <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-[#1B2438] border border-white/10 text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
        <span className="w-2 h-2 rounded-full bg-accent" />
        FAQ
      </div>

      <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">
        Frequently Asked Questions
      </h2>

      <p className="text-slate-400 leading-relaxed mb-10">
        Find answers to the most common questions about our development
        process, pricing, timelines, and long-term support.
      </p>

      <div className="rounded-3xl bg-[#1B2438] border border-[#334155] p-8 shadow-2xl">

        <div className="flex items-center gap-2 text-accent font-semibold uppercase tracking-[0.15em] text-xs mb-5">
          <MessageSquare size={16} />
          Need a direct answer?
        </div>

        <p className="text-slate-300 text-sm leading-7 mb-8">
          Need guidance? Our senior engineering experts are available to
          discuss your project requirements and recommend the right solution.
        </p>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-accent font-semibold hover:text-white transition-all duration-300 group"
        >
          Talk to our experts
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>

      </div>

    </div>

    {/* Right */}
    <div className="lg:col-span-8 flex flex-col gap-5">

      {faqs.map((faq) => {

        const isOpen = openId === faq.id;

        return (

          <div
            key={faq.id}
            onClick={() => setOpenId(isOpen ? null : faq.id)}
            className="bg-[#1B2438] border border-[#334155] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/20 hover:shadow-xl"
          >

            <div className="flex justify-between items-center p-6">

              <h3 className="text-white text-[16px] font-semibold pr-6">
                {faq.question}
              </h3>

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? "bg-accent text-white"
                    : "bg-[#263248] border border-[#3B4A64] text-slate-300"
                }`}
              >
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </div>

            </div>

            <AnimatePresence>

              {isOpen && (

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >

                  <div className="mx-6 border-t border-[#334155]">

                    <div className="py-5 text-slate-400 text-[15px] leading-7">

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
