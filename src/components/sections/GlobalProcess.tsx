import { motion, useReducedMotion } from 'framer-motion';
import { globalProcess } from '../../data/globalSolutions';

/** Vertical timeline: a single line on mobile, alternating sides from md up. The line draws as it scrolls into view. */
export default function GlobalProcess() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Global collaboration process</span>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-5xl light:text-slate-900">
            From first call to <span className="text-gradient">ongoing support</span>
          </h2>
          <p className="text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">
            The same seven steps for every client, whatever the time zone.
          </p>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2 light:bg-slate-200" aria-hidden="true" />
          <motion.div
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-[#1677ff] to-[#00d9ff] md:left-1/2 md:-translate-x-1/2"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          <ol className="relative space-y-8 md:space-y-10">
            {globalProcess.map((p, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={p.step}
                  initial={{ opacity: 0, x: right ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55 }}
                  className="relative grid grid-cols-[40px_1fr] items-start gap-4 md:grid-cols-2 md:gap-14"
                >
                  <span
                    className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 bg-[#0B1222] text-[12px] font-bold text-[#7FB2FF] shadow-[0_0_18px_rgba(22,119,255,0.35)] md:absolute md:left-1/2 md:top-3 md:-translate-x-1/2 light:bg-white light:text-[#1659C7]"
                    aria-hidden="true"
                  >
                    {p.step}
                  </span>
                  <div className={`card-dark p-5 md:p-6 ${right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}`}>
                    <h3 className="mb-1.5 text-lg font-bold text-white light:text-slate-900">
                      <span className="sr-only">Step {p.step}: </span>
                      {p.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-slate-400 light:text-slate-600">{p.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
