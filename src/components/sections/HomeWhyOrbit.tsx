import { motion } from 'framer-motion';
import { Briefcase, Gauge, Layers, LifeBuoy, MessagesSquare, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import GradientIcon from '../ui/GradientIcon';

const REASONS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Briefcase,
    title: 'Business first',
    desc: 'We start with your goals, customers and offer, then design the site or product around what moves your business.',
  },
  {
    icon: Sparkles,
    title: 'Modern design',
    desc: 'Clean, current interfaces that build trust in seconds and stay consistent across every page and device.',
  },
  {
    icon: Gauge,
    title: 'Performance focused',
    desc: 'Lean code, optimised images and smart loading, because a slow page costs you visitors before they read a word.',
  },
  {
    icon: Layers,
    title: 'Scalable development',
    desc: 'Typed, well-structured codebases on proven stacks, so adding features later is straightforward rather than a rebuild.',
  },
  {
    icon: MessagesSquare,
    title: 'Transparent communication',
    desc: 'Clear scope, agreed milestones and regular updates. You always know what is done, what is next and why.',
  },
  {
    icon: LifeBuoy,
    title: 'Long-term support',
    desc: 'Launch is the start. We stay on for fixes, improvements and new features as your business grows.',
  },
];

export default function HomeWhyOrbit() {
  return (
    <section aria-labelledby="why-orbit-heading" className="bg-navy-deep relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-accent/[0.05] blur-[140px]" />
      <div className="relative max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-32 self-start"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent mb-4">Why Orbit</p>
          <h2 id="why-orbit-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5">
            A partner that cares how your website <span className="text-gradient-blue">performs</span>, not just how it looks.
          </h2>
          <p className="text-[#C7D2E4] light:text-slate-600 text-base md:text-lg leading-relaxed">
            We combine design, engineering and business thinking in one small, focused team, so nothing gets lost between hand-offs.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 light:border-slate-200 light:bg-slate-200">
          {REASONS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-[#0B1222] p-7 md:p-8 transition-colors hover:bg-[#0E1729] light:bg-white light:hover:bg-slate-50"
            >
              <GradientIcon icon={Icon} size={22} box={false} className="mb-5" />
              <h3 className="text-[17px] font-bold tracking-tight text-white light:text-slate-900 mb-2">{title}</h3>
              <p className="text-[14px] leading-relaxed text-[#C7D2E4] light:text-slate-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
