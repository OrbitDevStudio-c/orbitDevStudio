import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { audiences, INQUIRY_ID, type AudienceId } from '../../data/globalSolutions';
import GradientIcon from '../ui/GradientIcon';

export default function GlobalAudiences({ onChoose }: { onChoose: (id: AudienceId) => void }) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Who we work with</span>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-5xl light:text-slate-900">
            Software partner for every <span className="text-gradient">stage of business</span>
          </h2>
          <p className="text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">
            Whether you are validating an idea or running complex operations, we scope the engagement to where you are today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {audiences.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
              className="card-dark group relative flex flex-col overflow-hidden p-7 md:p-8"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.accent}`} aria-hidden="true" />
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${a.accent} opacity-[0.12] blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                aria-hidden="true"
              />
              <div className="relative mb-5 flex items-center gap-4">
                <GradientIcon icon={a.icon} />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">0{i + 1}</span>
                  <h3 className="text-xl font-bold text-white light:text-slate-900">{a.title}</h3>
                </div>
              </div>
              <p className="relative mb-5 text-[15px] font-medium text-[#DCE6F7] light:text-slate-700">{a.message}</p>
              <ul className="relative mb-7 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                {a.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] text-slate-400 light:text-slate-600">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#00d9ff] light:text-[#0891b2]" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                data-track={`global_audience_${a.id}`}
                data-track-location="global_audiences"
                onClick={() => {
                  onChoose(a.id);
                  document.getElementById(INQUIRY_ID)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative mt-auto inline-flex w-fit items-center gap-2 text-[13px] font-bold text-accent transition-colors hover:text-[#00d9ff] light:hover:text-[#0891b2]"
              >
                Discuss Your Idea
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
