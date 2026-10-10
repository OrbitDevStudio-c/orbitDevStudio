import { motion } from 'framer-motion';
import { Wrench, Server, Search, Paintbrush, type LucideIcon } from 'lucide-react';
import { pricingAddons } from '../../data/pricing';
import GradientIcon from '../ui/GradientIcon';

const icons: Record<string, LucideIcon> = {
  maintenance: Wrench,
  hosting: Server,
  seo: Search,
  redesign: Paintbrush,
};

export default function PricingAddons() {
  return (
    <section aria-labelledby="pricing-addons-heading" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10 md:mb-12"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">Add-ons &amp; ongoing services</span>
          <h2 id="pricing-addons-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5 leading-tight">
            Support beyond launch
          </h2>
          <p className="text-[15px] text-[#C7D2E4] light:text-slate-600 leading-relaxed">
            Add these to any package, or engage us for them on their own. Each is scoped and quoted to fit what you actually need.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricingAddons.map((addon, i) => {
            const Icon = icons[addon.id] ?? Wrench;
            return (
              <motion.li
                key={addon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 light:border-slate-200 light:bg-white light:hover:border-slate-300"
              >
                <GradientIcon icon={Icon} size={20} boxClassName="w-11 h-11 rounded-xl mb-5" />
                <h3 className="text-lg font-bold tracking-tight text-white light:text-slate-900 mb-2">{addon.title}</h3>
                <p className="text-sm text-[#C7D2E4] light:text-slate-600 leading-relaxed mb-5">{addon.description}</p>
                <p className="mt-auto inline-flex w-fit items-center rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-white light:border-slate-200 light:bg-slate-50 light:text-slate-900">
                  {addon.price}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
