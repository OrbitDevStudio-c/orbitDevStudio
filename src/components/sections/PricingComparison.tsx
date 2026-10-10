import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { comparisonRows, pricingTiers, type ComparisonValue } from '../../data/pricing';

function Cell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return (
      <>
        <Check size={18} className="text-accent mx-auto" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus size={18} className="text-slate-500 light:text-slate-400 mx-auto" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-[13px] text-[#C7D2E4] light:text-slate-600">{value}</span>;
}

export default function PricingComparison() {
  return (
    <section aria-labelledby="pricing-compare-heading" className="relative py-20 md:py-28 bg-navy-soft">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10 md:mb-12"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">Compare</span>
          <h2 id="pricing-compare-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5 leading-tight">
            Packages side by side
          </h2>
          <p className="text-[15px] text-[#C7D2E4] light:text-slate-600 leading-relaxed">
            A quick overview of what each package typically covers. Exact deliverables are confirmed in your proposal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-[var(--rt-surface-1)] light:border-slate-200 overflow-hidden"
        >
          <div
            className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            tabIndex={0}
            role="region"
            aria-labelledby="pricing-compare-heading"
          >
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Feature comparison of Starter, Professional and Enterprise packages</caption>
              <thead>
                <tr className="border-b border-white/10 light:border-slate-200">
                  <th scope="col" className="sticky left-0 z-10 bg-[var(--rt-surface-1)] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 light:text-slate-500 w-[34%]">
                    Feature
                  </th>
                  {pricingTiers.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className={`px-5 py-4 text-center text-sm font-bold text-white light:text-slate-900 ${tier.highlighted ? 'bg-accent/[0.08] light:bg-accent/[0.05]' : ''}`}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5 last:border-b-0 light:border-slate-100">
                    <th scope="row" className="sticky left-0 z-10 bg-[var(--rt-surface-1)] px-5 py-3.5 text-sm font-medium text-white light:text-slate-900">
                      {row.feature}
                    </th>
                    {pricingTiers.map((tier) => (
                      <td
                        key={tier.id}
                        className={`px-5 py-3.5 text-center align-middle ${tier.highlighted ? 'bg-accent/[0.08] light:bg-accent/[0.05]' : ''}`}
                      >
                        <Cell value={row.values[tier.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        <p className="mt-4 text-xs text-slate-400 light:text-slate-500 md:hidden">Swipe sideways to see all packages.</p>
      </div>
    </section>
  );
}
