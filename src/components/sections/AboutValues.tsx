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
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">
            OUR CORE VALUES
          </span>
          <h2 className="text-h2 text-white mb-6">
            What drives us forward.
          </h2>
          <div className="w-16 h-1.5 bg-accent mx-auto mb-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-dark p-8 md:p-12 transition-all duration-300 group flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-accent group-hover:scale-110 transition-all duration-500">
                <value.icon size={28} className="text-accent group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
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
