import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { globalFaqs, INQUIRY_ID } from '../../data/globalSolutions';

export default function GlobalFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Global FAQ</span>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-4xl light:text-slate-900">
            Questions from <span className="text-gradient">international clients</span>
          </h2>
          <p className="mb-8 text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">
            Can’t find what you are looking for? Ask us directly. There is no obligation.
          </p>
          <a
            href={`#${INQUIRY_ID}`}
            data-track="global_faq_consultation"
            data-track-location="global_faq"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(INQUIRY_ID)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-[14px] font-bold"
          >
            Get a Free Consultation <ArrowRight size={16} />
          </a>
        </div>

        <div className="lg:col-span-8">
          <ul className="space-y-3">
            {globalFaqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.question} className="card-dark !rounded-2xl !transform-none">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`gs-faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[15px] font-semibold text-white light:text-slate-900">{f.question}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        {isOpen ? <Minus size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`gs-faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[14px] leading-relaxed text-slate-400 light:text-slate-600">
                          {f.answer.map((part, j) =>
                            typeof part === 'string' ? (
                              <span key={j}>{part}</span>
                            ) : (
                              <Link key={j} to={part.to} className="font-semibold text-accent underline-offset-2 hover:underline">
                                {part.text}
                              </Link>
                            ),
                          )}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
