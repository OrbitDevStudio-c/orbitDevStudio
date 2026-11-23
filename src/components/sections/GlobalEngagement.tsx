import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { clientExperience, engagementModels, INQUIRY_ID } from '../../data/globalSolutions';

export default function GlobalEngagement({ onChoose }: { onChoose: (model: string) => void }) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Engagement models</span>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-5xl light:text-slate-900">
            Three ways to <span className="text-gradient">work with us</span>
          </h2>
          <p className="text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">
            Terms are agreed in writing for your project. Pick the model that fits and we will confirm the details with you.
          </p>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {engagementModels.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-dark flex flex-col p-7"
            >
              <span className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00d9ff] light:text-[#0891b2]">0{i + 1}</span>
              <h3 className="mb-3 text-xl font-bold text-white light:text-slate-900">{m.title}</h3>
              <p className="mb-8 text-[14.5px] leading-relaxed text-slate-400 light:text-slate-600">{m.bestFor}</p>
              <button
                type="button"
                data-track={`global_model_${m.id}`}
                data-track-location="global_engagement"
                onClick={() => {
                  onChoose(m.value);
                  document.getElementById(INQUIRY_ID)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-bold"
              >
                Start Your Project
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Global client experience</span>
            <h3 className="mb-5 text-2xl font-bold tracking-tight text-white md:text-4xl light:text-slate-900">
              How remote collaboration <span className="text-gradient">actually works</span>
            </h3>
            <p className="mb-6 text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">
              You never need to be in the same room, or the same time zone, to build something good together.
            </p>
            <div className="card-dark flex items-start gap-4 p-5">
              <Clock size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h4 className="mb-1 text-[15px] font-bold text-white light:text-slate-900">Time-zone coordination</h4>
                <p className="text-[13.5px] leading-relaxed text-slate-400 light:text-slate-600">
                  We agree communication hours and overlap windows at the start, and keep progress visible through written updates so work moves forward between conversations. We do not promise 24/7 availability.
                </p>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
            {clientExperience.map((c, i) => (
              <motion.li
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-slate-200 light:bg-white"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={13} aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-[14px] font-bold text-white light:text-slate-900">{c.title}</h4>
                  <p className="text-[13px] leading-relaxed text-slate-400 light:text-slate-600">{c.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
