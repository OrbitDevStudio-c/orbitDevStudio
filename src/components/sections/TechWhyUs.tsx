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
    <section className="bg-[#101A2D] py-16 md:py-20 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F8CFF]/[0.08] blur-[150px] pointer-events-none rounded-full" />
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        <div className="flex flex-col xl:flex-row gap-6 items-stretch">

          {/* Left Side: Dark Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full xl:w-[35%] bg-gradient-to-br from-[#101A2D] to-[#0B1220] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-3xl p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden"
          >
            {/* Inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F8CFF]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#4F8CFF] uppercase">WHY CHOOSE ORBITDEVSTUDIO</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
                Where senior expertise meets delivery precision.
              </h2>

              <p className="text-[15px] leading-relaxed text-[#C7D2E4] mb-12">
                We combine deep technical mastery with structured delivery practices to ship products that are secure, scalable, and built to grow with your business.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-slate-950 px-6 py-4 font-bold transition-all hover:bg-accent/90 shadow-[0_4px_15px_rgba(79,140,255,0.3)] hover:shadow-[0_6px_25px_rgba(79,140,255,0.5)] hover:-translate-y-0.5"
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
                  className="bg-[#0B1220]/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(79,140,255,0.1)] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 text-[#4F8CFF] flex items-center justify-center mb-6 shrink-0 group-hover:bg-[#4F8CFF]/10 group-hover:border-[#4F8CFF]/50 transition-all duration-300 group-hover:scale-110">
                    <benefit.icon size={20} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-sm md:text-[15px] leading-relaxed text-[#94A3B8] flex-grow">
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
