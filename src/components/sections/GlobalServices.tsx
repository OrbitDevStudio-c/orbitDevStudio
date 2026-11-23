import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { globalServices } from '../../data/globalSolutions';
import GradientIcon from '../ui/GradientIcon';

export default function GlobalServices() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">What we build</span>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl light:text-slate-900">
              Services for <span className="text-gradient">international clients</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">
            Each service is defined by the business result it supports, not the technology behind it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {globalServices.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link
                to={s.to}
                data-track={`global_service_${i + 1}`}
                data-track-location="global_services"
                className="card-dark group flex h-full flex-col p-6"
              >
                <div className="mb-5 flex items-start justify-between">
                  <GradientIcon icon={s.icon} boxClassName="h-11 w-11 rounded-xl" size={20} />
                  <ArrowUpRight size={18} className="text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-[17px] font-bold text-white light:text-slate-900">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-slate-400 light:text-slate-600">{s.value}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
