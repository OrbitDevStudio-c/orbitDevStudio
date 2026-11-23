import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { globalIndustries } from '../../data/globalSolutions';
import { getProjectBySlug, type Project } from '../../data/projects';
import GradientIcon from '../ui/GradientIcon';

export default function GlobalIndustries() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Industries</span>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-5xl light:text-slate-900">
            Industries <span className="text-gradient">we support</span>
          </h2>
          <p className="text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">
            Where we have already shipped work in a sector, the projects are listed so you can look at the real thing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {globalIndustries.map((ind, i) => {
            const projects = ind.projects.map((s) => getProjectBySlug(s)).filter((p): p is Project => !!p);
            return (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                className="card-dark group flex flex-col p-6"
              >
                <GradientIcon icon={ind.icon} boxClassName="mb-5 h-11 w-11 rounded-xl" size={20} />
                <h3 className="mb-2 text-[16px] font-bold text-white light:text-slate-900">{ind.title}</h3>
                <p className="mb-5 text-[13.5px] leading-relaxed text-slate-400 light:text-slate-600">{ind.description}</p>

                {projects.length > 0 && (
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {projects.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/case-studies/${p.slug}`}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-[#9EC3FF] transition-colors hover:border-accent/50 hover:text-white light:border-slate-200 light:bg-slate-50 light:text-[#1659C7] light:hover:text-slate-900"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                )}

                <Link
                  to={ind.to}
                  data-track={`global_industry_${i + 1}`}
                  data-track-location="global_industries"
                  className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-bold text-accent hover:text-[#00d9ff] light:hover:text-[#0891b2]"
                >
                  Explore
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
