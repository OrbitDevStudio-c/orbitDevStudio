import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { pricingFaqs } from '../../data/pricing';

export default function PricingFAQ() {
  const [openId, setOpenId] = useState<string | null>(pricingFaqs[0]?.id ?? null);

  return (
    <section aria-labelledby="pricing-faq-heading" className="relative py-20 md:py-28 bg-navy-soft">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">Pricing FAQ</span>
          <h2 id="pricing-faq-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5 leading-tight">
            Questions about cost
          </h2>
          <p className="text-[15px] text-[#C7D2E4] light:text-slate-600 leading-relaxed">
            Straight answers to the questions we hear most often about budgets, payments and scope.
          </p>
        </motion.div>

        <div className="lg:col-span-8 flex flex-col gap-4">
          {pricingFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            const buttonId = `pricing-faq-${faq.id}-button`;
            const panelId = `pricing-faq-${faq.id}-panel`;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border overflow-hidden transition-colors ${
                  isOpen
                    ? 'border-accent/30 bg-white/[0.04] light:border-accent/30 light:bg-white'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 light:border-slate-200 light:bg-white light:hover:border-slate-300'
                }`}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  >
                    <span className="text-[15px] md:text-base font-semibold text-white light:text-slate-900">{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                        isOpen
                          ? 'bg-accent text-white'
                          : 'bg-white/[0.03] border border-white/10 text-slate-400 light:bg-slate-50 light:border-slate-200 light:text-slate-500'
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mx-5 md:mx-6 border-t border-white/10 light:border-slate-200 py-5 text-[15px] leading-7 text-[#C7D2E4] light:text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
