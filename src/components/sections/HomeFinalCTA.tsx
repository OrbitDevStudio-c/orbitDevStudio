import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomeFinalCTA({ location = 'home' }: { location?: string }) {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-navy-soft relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(22,119,255,0.12)_0%,_transparent_70%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <h2 id="final-cta-heading" className="text-4xl md:text-6xl font-bold tracking-tight text-white light:text-slate-900 mb-6">
          Let&apos;s build something <span className="text-gradient">great.</span>
        </h2>
        <p className="text-[#C7D2E4] light:text-slate-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Tell us about your business and what you want to achieve. We&apos;ll come back with a clear plan, timeline and estimate, free and with no obligation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/hire"
            data-track="start_project"
            data-track-location={`${location}-final-cta`}
            className="btn-primary group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold"
          >
            Start Your Project
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/free-audit"
            data-track="free_audit"
            data-track-location={`${location}-final-cta`}
            className="w-full sm:w-auto rounded-xl border border-white/15 px-8 py-3.5 text-sm font-bold text-white transition-all hover:border-white/30 hover:bg-white/[0.04] light:border-slate-300 light:text-slate-900 light:hover:bg-slate-50"
          >
            Get a Free Website Audit
          </Link>
        </div>
        <a
          href="mailto:orbitdevstudios@gmail.com"
          data-track-location={`${location}-final-cta`}
          className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white light:hover:text-slate-900"
        >
          <Mail size={15} />
          orbitdevstudios@gmail.com
        </a>
      </motion.div>
    </section>
  );
}
