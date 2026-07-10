import { motion } from 'framer-motion';
import { Clock, CalendarDays, Hourglass, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const models = [
  {
    id: 'full-time',
    title: 'FULL TIME',
    subtitle: 'DEDICATED RESOURCE',
    icon: Clock,
    hours: '8 HRS/DAY',
    minimum: '30 DAYS',
    delay: 0
  },
  {
    id: 'part-time',
    title: 'PART TIME',
    subtitle: 'FLEXIBLE RESOURCE',
    icon: CalendarDays,
    hours: '4 HRS/DAY',
    minimum: '30 DAYS',
    delay: 0.1
  },
  {
    id: 'hourly',
    title: 'HOURLY',
    subtitle: 'PAY AS YOU GO',
    icon: Hourglass,
    hours: 'FLEXIBLE',
    minimum: '100 HOURS',
    delay: 0.2
  }
];

export default function HireModels() {
  return (
<section className="bg-navy-soft py-16 md:py-20 relative overflow-hidden">
  <div className="max-w-[1400px] mx-auto px-6">

    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex-1 lg:max-w-xl"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">
          WHAT WE DO
        </span>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
          Flexible Hiring Models for Your Development Needs
        </h2>

        <div className="w-16 h-1.5 bg-accent mb-8 rounded-full" />

        <p className="text-[15px] text-slate-300 leading-relaxed mb-8">
          At OrbitDevStudio, we provide highly skilled web developers, mobile
          app developers, and software engineers who can join your team and
          accelerate your project development.
        </p>

        <ul className="space-y-4 mb-10">
          <li className="flex gap-3">
            <CheckCircle2
              size={20}
              className="text-accent shrink-0 mt-0.5"
            />
            <span className="text-sm text-slate-300 leading-relaxed">
              Our flexible hiring models allow businesses to scale development
              resources efficiently while maintaining full control over their
              projects.
            </span>
          </li>

          <li className="flex gap-3">
            <CheckCircle2
              size={20}
              className="text-accent shrink-0 mt-0.5"
            />
            <span className="text-sm text-slate-300 leading-relaxed">
              Our agile development teams help transform your ideas into
              scalable digital solutions.
            </span>
          </li>

          <li className="flex gap-3">
            <CheckCircle2
              size={20}
              className="text-accent shrink-0 mt-0.5"
            />
            <span className="text-sm text-slate-300 leading-relaxed">
              Delivering high-performance applications for startups, SMEs,
              and enterprise organizations.
            </span>
          </li>
        </ul>

        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 font-semibold text-white transition-all hover:bg-[#1E2A4A] shadow-lg hover:shadow-blue-500/30"
        >
          Request Quote
        </Link>
      </motion.div>

      {/* Right Cards */}
      <div className="flex-1 w-full space-y-6">
        {models.map((model) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: model.delay }}
            className="bg-[linear-gradient(180deg,rgba(25,38,70,0.92),rgba(16,22,38,0.95))] rounded-3xl p-8 border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_40px_rgba(79,140,255,0.2)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col md:flex-row gap-6 md:gap-12 md:items-center justify-between"
          >
            {/* Decorative background circle */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/5 rounded-l-full translate-x-16 group-hover:bg-accent/10 transition-colors duration-500 z-0 pointer-events-none" />

            {/* Left Part */}
            <div className="flex items-center gap-5 relative z-10 flex-1">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(79,140,255,0.3)] transition-all duration-300">
                <model.icon
                  size={22}
                  className="text-slate-400 group-hover:text-white transition-colors duration-300"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">
                  {model.title}
                </h3>

                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {model.subtitle}
                </p>
              </div>
            </div>

            <div className="w-full md:w-px h-px md:h-12 bg-white/10 relative z-10 shrink-0" />

            {/* Hours */}
            <div className="relative z-10 flex-1 md:text-center">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                HOURS PER DAY
              </p>

              <p className="text-sm font-bold text-white">
                {model.hours}
              </p>
            </div>

            {/* Minimum */}
            <div className="relative z-10 flex-1 md:text-right">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                MINIMUM
              </p>

              <p className="text-sm font-bold text-white">
                {model.minimum}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>

  </div>
</section>
  );
}
