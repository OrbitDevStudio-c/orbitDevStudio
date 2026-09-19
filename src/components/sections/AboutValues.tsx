import { motion } from 'framer-motion';
import { Target, ShieldCheck, Lightbulb, Users } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Absolute Transparency',
    description: 'No hidden fees, no opaque processes. We build trust through clear communication and measurable deliverables at every sprint.'
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromising Quality',
    description: 'We don\'t cut corners. From architecture design to final QA, we adhere to strict engineering standards to ensure your product scales flawlessly.'
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description: 'Technology moves fast. We constantly research and integrate the latest frameworks and cloud solutions so your product never feels legacy.'
  },
  {
    icon: Users,
    title: 'True Partnership',
    description: 'We don\'t view ourselves as an outsourced vendor. We act as your strategic technical partner, fully invested in the long-term success of your business.'
  }
];

export default function AboutValues() {
  return (
    <section className="core-values-band py-14 md:py-16 relative overflow-hidden">
      {/* Shared gradient definition for value icons */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="value-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#050b2e" />
            <stop offset="55%" stopColor="#1677ff" />
            <stop offset="100%" stopColor="#00d9ff" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[420px] rounded-full core-values-glow hidden light:block pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">
            OUR CORE VALUES
          </span>
          <h2 className="text-h2 text-white light:text-slate-900 mb-4">
            What drives us forward.
          </h2>
          <div className="w-14 h-1 core-values-accent-line mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="core-value-card p-6 md:p-7 transition-all duration-500 group flex flex-col md:flex-row gap-5 items-start"
            >
              <div className="value-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-500">
                <value.icon size={22} className="value-icon" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-white light:text-slate-900 mb-2 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#94A3B8]">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
