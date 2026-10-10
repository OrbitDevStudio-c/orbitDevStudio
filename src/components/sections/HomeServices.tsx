import { motion } from 'framer-motion';
import { ArrowRight, Check, Code2, LayoutDashboard, Palette, RefreshCcw, ShoppingCart, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import GradientIcon from '../ui/GradientIcon';

const SERVICES: { icon: LucideIcon; title: string; desc: string; benefits: string[] }[] = [
  {
    icon: Code2,
    title: 'Website Development',
    desc: 'Fast, responsive marketing websites that explain what you do and turn visitors into enquiries.',
    benefits: ['Mobile-first, accessible builds', 'SEO-ready structure', 'Easy content updates'],
  },
  {
    icon: LayoutDashboard,
    title: 'Web Application Development',
    desc: 'Dashboards, portals and SaaS products engineered to scale with your users and your team.',
    benefits: ['React, Next.js & Node.js', 'Secure authentication & roles', 'Scalable cloud architecture'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Research-led interfaces and design systems that make complex products feel simple.',
    benefits: ['User flows & wireframes', 'Interactive prototypes', 'Reusable design systems'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Development',
    desc: 'Storefronts built for speed and conversion, from product discovery to a frictionless checkout.',
    benefits: ['Fast product & checkout flows', 'Payment & shipping integrations', 'Inventory & order tooling'],
  },
  {
    icon: Workflow,
    title: 'Custom Software',
    desc: 'Internal tools, automations and integrations that remove manual work from your operations.',
    benefits: ['Workflow automation', 'Third-party API integrations', 'AI features where they add value'],
  },
  {
    icon: RefreshCcw,
    title: 'Website Redesign & Optimization',
    desc: 'Modernise an existing site and fix what holds it back: speed, clarity, mobile UX and SEO.',
    benefits: ['Performance & Core Web Vitals', 'Conversion-focused layouts', 'Content & SEO clean-up'],
  },
];

/** Indexes of the cards that span the wide column of the bento grid. */
const WIDE = new Set([0, 5]);

export default function HomeServices() {
  return (
    <section aria-labelledby="home-services-heading" className="section-white relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent mb-4">What we do</p>
          <h2 id="home-services-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-5">
            Everything you need to <span className="text-gradient-blue">launch and grow</span> online.
          </h2>
          <p className="text-[#C7D2E4] light:text-slate-600 text-base md:text-lg leading-relaxed">
            One team for strategy, design, development and support, so your website or product is built right the first time.
          </p>
        </motion.div>

        {/* Bento grid: wide + narrow, three equal, narrow + wide. */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map(({ icon: Icon, title, desc, benefits }, i) => {
            const wide = WIDE.has(i);
            return (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className={`card-dark group relative flex flex-col overflow-hidden p-7 ${
                  wide ? 'sm:col-span-2 lg:col-span-4 md:p-9' : 'lg:col-span-2'
                }`}
              >
                {wide && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl light:bg-accent/10"
                  />
                )}
                <GradientIcon icon={Icon} size={wide ? 26 : 22} boxClassName={`mb-6 rounded-2xl ${wide ? 'h-14 w-14' : 'h-12 w-12'}`} />
                <h3
                  className={`font-bold tracking-tight text-white light:text-slate-900 mb-2.5 ${
                    wide ? 'text-2xl md:text-[28px]' : 'text-lg'
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`leading-relaxed text-[#C7D2E4] light:text-slate-600 mb-5 ${
                    wide ? 'text-base md:text-[17px] max-w-xl' : 'text-[14.5px]'
                  }`}
                >
                  {desc}
                </p>
                <ul className={wide ? 'mb-7 flex flex-wrap gap-x-6 gap-y-2' : 'mb-7 space-y-2'}>
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13.5px] text-slate-300 light:text-slate-600">
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  data-track="explore_service"
                  data-track-location={`home-services-${title}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-white light:hover:text-slate-900"
                >
                  Explore Service
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
