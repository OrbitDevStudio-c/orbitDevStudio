import { motion } from 'framer-motion';
import { Compass, Telescope } from 'lucide-react';
import GradientIcon from '../ui/GradientIcon';

const BLOCKS = [
  {
    icon: Compass,
    label: 'Our mission',
    text: 'To help businesses grow with websites and software that are fast, clear and genuinely useful to the people who use them, built by a team that treats every project like its own.',
  },
  {
    icon: Telescope,
    label: 'Our vision',
    text: 'To be the digital partner growing businesses trust for the long term: the team they call first when an idea needs to become a product, and that stays to keep improving it.',
  },
];

export default function AboutMission() {
  return (
    <section aria-label="Mission and vision" className="bg-navy-deep py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 grid gap-5 md:grid-cols-2">
        {BLOCKS.map(({ icon: Icon, label, text }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel group relative overflow-hidden p-8 md:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/[0.07] blur-3xl" />
            <GradientIcon icon={Icon} size={22} boxClassName="mb-6 h-12 w-12 rounded-2xl" />
            <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent mb-4">{label}</h2>
            <p className="text-xl md:text-2xl font-semibold leading-snug tracking-tight text-white light:text-slate-900">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
