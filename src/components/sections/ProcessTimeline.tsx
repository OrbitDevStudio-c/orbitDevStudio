import { motion } from 'framer-motion';
import { Target, Map, PenTool, Code2, TestTube2, Rocket } from 'lucide-react';

const steps = [
  { icon: Target, title: 'Discovery & Strategy', desc: 'Understanding your domain, users, and business goals to build the right foundation.' },
  { icon: Map, title: 'Architecture Planning', desc: 'Scalable architecture decisions, timelines, and precise resource mapping.' },
  { icon: PenTool, title: 'UI/UX Design', desc: 'Creating intuitive wireframes, prototypes, and comprehensive design systems.' },
  { icon: Code2, title: 'Agile Development', desc: 'Sprint-based engineering with continuous delivery and tight feedback loops.' },
  { icon: TestTube2, title: 'HIPAA & GDPR Security', desc: 'Data encryption in transit and at rest, secure access logs, and strict privacy controls.' },
  { icon: Rocket, title: 'Secure DevOps Pipelines', desc: 'Automated vulnerability scanning, configuration management, and audited deployments.' },
];

export default function ProcessTimeline() {
  return (
    <section className="section-grid py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] block mb-3">How We Work</span>
          <h2 className="text-h2 text-white tracking-tight">Our Engineering Process</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="card-dark p-8 flex flex-col items-start group"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 border border-accent/20 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon size={20} className="text-accent" />
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
