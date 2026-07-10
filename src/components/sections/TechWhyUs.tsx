import { motion } from 'framer-motion';
import { ShieldCheck, Users, Rocket, BarChart, Award, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Security-First Architecture',
    description: 'Every solution is built with OWASP standards, encrypted data handling, and proactive vulnerability management baked in from day one.'
  },
  {
    icon: Users,
    title: 'Expert Engineering Teams',
    description: 'Senior developers and architects form dedicated pods that move fast without accumulating technical debt.'
  },
  {
    icon: Rocket,
    title: 'Faster Time-to-Market',
    description: 'Proven sprint frameworks, reusable component libraries, and CI/CD pipelines that compress your launch timelines significantly.'
  },
  {
    icon: BarChart,
    title: 'Data-Driven Decisions',
    description: 'Built-in analytics, performance dashboards, and KPI tracking keep every engineering decision aligned to your business objectives.'
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description: 'Hundreds of successful product launches across fintech, e-commerce, healthcare, and SaaS — with client satisfaction at the core.'
  },
  {
    icon: MessageSquare,
    title: 'Transparent Collaboration',
    description: "Real-time project visibility, weekly demos, and honest communication so you're always in control of your product's direction."
  }
];

export default function TechWhyUs() {
  return (
    <section className="bg-navy-deep py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="flex flex-col xl:flex-row gap-6 items-stretch">

          {/* Left Side: Dark Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full xl:w-[35%] bg-[linear-gradient(180deg,rgba(25,38,70,0.92),rgba(16,22,38,0.95))] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_30px_rgba(0,0,0,0.25)] rounded-3xl p-10 md:p-12 text-white flex flex-col justify-center"
          >
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-8">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">WHY CHOOSE ORBITDEVSTUDIO</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
                Where senior expertise meets delivery precision.
              </h2>

              <p className="text-[15px] leading-relaxed text-blue-100/80 mb-12">
                We combine deep technical mastery with structured delivery practices to ship products that are secure, scalable, and built to grow with your business.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-white px-6 py-3.5 font-semibold transition-all hover:bg-blue-500 shadow-md hover:shadow-[0_0_20px_rgba(79,140,255,0.3)]"
              >
                Start Your Project
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Grid */}
          <div className="w-full xl:w-[65%]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[linear-gradient(180deg,rgba(25,38,70,0.92),rgba(16,22,38,0.95))] rounded-3xl p-6 border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(79,140,255,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-accent flex items-center justify-center mb-5 shrink-0 group-hover:bg-accent/10 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(79,140,255,0.2)] transition-all duration-300 group-hover:scale-110">
                    <benefit.icon size={20} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-300 flex-grow">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
