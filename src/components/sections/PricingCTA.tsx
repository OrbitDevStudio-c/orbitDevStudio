import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRICING_FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rt-bg)]';

const EMAIL = 'orbitdevstudios@gmail.com';

export default function PricingCTA() {
  return (
    <section aria-labelledby="pricing-cta-heading" className="relative overflow-hidden py-20 md:py-28 bg-navy-deep">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[radial-gradient(circle,_rgba(22,119,255,0.1)_0%,_transparent_70%)] pointer-events-none" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
      >
        <h2 id="pricing-cta-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 mb-6">
          Not sure which package is right for you? <span className="text-gradient">Talk to us.</span>
        </h2>
        <p className="text-[16px] md:text-[18px] text-[#C7D2E4] light:text-slate-600 leading-relaxed max-w-2xl mb-10">
          Tell us what you're planning and we'll recommend the right approach, outline a realistic timeline and send a clear quote. The consultation is free and there's no obligation.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/hire"
            data-track="pricing_lets_talk"
            data-track-location="pricing-cta"
            className={`btn-primary group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 font-bold text-sm transition-all hover:-translate-y-0.5 ${PRICING_FOCUS_RING}`}
          >
            Let's Talk
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
          <a
            href={`mailto:${EMAIL}`}
            data-track="pricing_email"
            data-track-location="pricing-cta"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 font-bold text-sm text-white light:text-slate-900 border border-white/15 hover:border-white/30 hover:bg-white/[0.04] light:border-slate-300 light:hover:border-slate-400 light:hover:bg-slate-50 transition-all hover:-translate-y-0.5 ${PRICING_FOCUS_RING}`}
          >
            <Mail size={16} aria-hidden="true" />
            <span className="break-all sm:break-normal">{EMAIL}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
