import { motion } from 'framer-motion';

const STEPS = [
  { title: 'Discovery', desc: 'We learn your business, customers, competitors and goals, and agree what success looks like.' },
  { title: 'Strategy', desc: 'Scope, sitemap or feature list, tech choices, milestones and a clear estimate, all in writing.' },
  { title: 'UI/UX', desc: 'Wireframes, then high-fidelity designs and prototypes you can click through and give feedback on.' },
  { title: 'Development', desc: 'Sprint-based builds with regular demos, so you see progress early and steer as we go.' },
  { title: 'Testing', desc: 'Cross-device, browser, performance and accessibility checks before anything goes live.' },
  { title: 'Launch', desc: 'Deployment, domain and analytics setup, redirects and a final review together.' },
  { title: 'Support', desc: 'Post-launch fixes, maintenance and ongoing improvements as your business grows.' },
];

export default function AboutProcess() {
  return (
    <section id="process" aria-labelledby="about-process-heading" className="section-white scroll-mt-24 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent mb-4">Our process</p>
          <h2 id="about-process-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5">
            Seven clear steps from idea to launch.
          </h2>
          <p className="text-[#C7D2E4] light:text-slate-600 text-base md:text-lg leading-relaxed">
            A predictable process means fewer surprises, better decisions and a launch date you can plan around.
          </p>
        </motion.div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.06 }}
              className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/30 light:border-slate-200 light:bg-white ${
                i === STEPS.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] font-mono text-sm font-bold text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[17px] font-bold tracking-tight text-white light:text-slate-900 mb-2">{step.title}</h3>
              <p className="text-[14px] leading-relaxed text-[#C7D2E4] light:text-slate-600">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
