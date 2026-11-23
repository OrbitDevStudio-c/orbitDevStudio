import { motion } from 'framer-motion';
import { globalReasons } from '../../data/globalSolutions';
import GradientIcon from '../ui/GradientIcon';

export default function GlobalWhy() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Why OrbitDevStudio</span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-4xl light:text-slate-900">
              A partner you can <span className="text-gradient">work with from anywhere</span>
            </h2>
            <p className="text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">
              Working across borders works best when communication is direct, scope is written down and ownership is clear. That is how we run every project.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {globalReasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.07 }}
                className={`card-dark group flex items-start gap-4 p-5 ${i === globalReasons.length - 1 ? 'sm:col-span-2' : ''}`}
              >
                <GradientIcon icon={r.icon} boxClassName="h-11 w-11 rounded-xl" size={20} />
                <div>
                  <h3 className="mb-1 text-[15px] font-bold text-white light:text-slate-900">{r.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-slate-400 light:text-slate-600">{r.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
