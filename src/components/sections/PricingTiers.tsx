import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, Sparkles } from 'lucide-react';
import { pricingTiers, PRICING_PRICE_LABEL } from '../../data/pricing';
import GradientIcon from '../ui/GradientIcon';

const PRICING_FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rt-bg)]';

export default function PricingTiers() {
  return (
    <section id="packages" aria-labelledby="pricing-tiers-heading" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">Packages</span>
          <h2 id="pricing-tiers-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5 leading-tight">
            Choose a starting point
          </h2>
          <p className="text-[15px] text-[#C7D2E4] light:text-slate-600 leading-relaxed">
            Three packages that describe typical scope. Every project is priced to its requirements: use the AI estimator for an indicative range, then get an exact quote after a free consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6 items-stretch">
          {pricingTiers.map((tier, i) => (
            <motion.article
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              aria-labelledby={`tier-${tier.id}-name`}
              className={`relative flex flex-col rounded-2xl p-7 md:p-8 transition-all duration-300 ${
                tier.highlighted
                  ? 'border border-accent/50 bg-accent/[0.06] shadow-[0_20px_60px_rgba(22,119,255,0.15)] light:border-accent/40 light:bg-white light:shadow-[0_20px_50px_rgba(22,119,255,0.12)]'
                  : 'border border-white/10 bg-white/[0.03] hover:border-white/20 light:border-slate-200 light:bg-white light:hover:border-slate-300 light:shadow-[0_4px_20px_rgba(15,23,42,0.05)]'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_6px_20px_rgba(22,119,255,0.35)]">
                  <Sparkles size={12} aria-hidden="true" />
                  {tier.badge}
                </div>
              )}

              <h3 id={`tier-${tier.id}-name`} className="text-xl font-bold tracking-tight text-white light:text-slate-900 mb-2">
                {tier.name}
              </h3>
              <p className="text-sm text-[#C7D2E4] light:text-slate-600 leading-relaxed mb-6 min-h-[2.75rem]">{tier.tagline}</p>

              <div className="mb-6">
                <p className="text-2xl md:text-[1.7rem] font-bold tracking-tight leading-tight text-white light:text-slate-900">
                  {PRICING_PRICE_LABEL}
                </p>
                <a
                  href="#estimate"
                  data-track={`pricing_${tier.id}_estimate`}
                  data-track-location="pricing-tiers"
                  aria-label={`Get an AI estimate for the ${tier.name} package`}
                  className={`group mt-2 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-accent hover:text-white light:hover:text-slate-900 transition-colors ${PRICING_FOCUS_RING}`}
                >
                  <Sparkles size={14} aria-hidden="true" />
                  Get an AI estimate
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </a>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 mb-6 light:border-slate-200 light:bg-slate-50">
                <GradientIcon icon={Clock} size={16} box={false} className="shrink-0 mt-0.5" />
                <p className="text-sm text-white light:text-slate-900">
                  <span className="text-slate-400 light:text-slate-500">Timeline: </span>
                  <span className="font-semibold">{tier.timeline}</span>
                </p>
              </div>

              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 light:text-slate-500 mb-3">What's included</p>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check size={18} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-[#C7D2E4] light:text-slate-600 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="border-t border-white/10 light:border-slate-200 pt-5 mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 light:text-slate-500 mb-2">Typical scope</p>
                  <p className="text-sm text-[#C7D2E4] light:text-slate-600 leading-relaxed">{tier.typicalScope}</p>
                </div>

                <Link
                  to="/hire"
                  data-track={`pricing_${tier.id}_discuss`}
                  data-track-location="pricing-tiers"
                  aria-label={`Discuss your project: ${tier.name} package`}
                  className={`group w-full inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm transition-all hover:-translate-y-0.5 ${PRICING_FOCUS_RING} ${
                    tier.highlighted
                      ? 'btn-primary'
                      : 'text-white light:text-slate-900 border border-white/15 hover:border-white/30 hover:bg-white/[0.04] light:border-slate-300 light:hover:border-slate-400 light:hover:bg-slate-50'
                  }`}
                >
                  Discuss Your Project
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
